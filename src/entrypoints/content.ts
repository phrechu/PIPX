import { getVideoId } from "../utils/getVideoId";
import { enablePiP } from "../utils/enablePiP";
import { showNotification } from "../utils/showNotification";
import { querySelectorAll } from "kagekiri";

export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    let notificationsEnabled = true;

    // Load initial preference
    async function loadUserPref(): Promise<void> {
      const result = await browser.storage.sync.get("enableNotifications");
      notificationsEnabled = (result.enableNotifications as boolean) ?? true;
    }

    // Listen for storage changes
    browser.storage.onChanged.addListener((changes) => {
      if (changes.enableNotifications) {
        notificationsEnabled = changes.enableNotifications.newValue as boolean;
      }
    });

    // Load initial preference
    loadUserPref();

    // Handle messages from background script
    browser.runtime.onMessage.addListener(() => {
      togglePiP();
    });

    // Handle visibility changes for auto PiP
    document.addEventListener("visibilitychange", async () => {
      // @ts-ignore
      const videoList = querySelectorAll(
        "video"
      ) as NodeListOf<HTMLVideoElement>;
      const videoId = getVideoId(videoList);
      loadUserPref();

      if (document.visibilityState === "visible") {
        if (document.pictureInPictureElement) {
          try {
            await document.exitPictureInPicture();
            showNotification("Exited PiP mode", "exitPiP", false);
          } catch (error) {
            console.error("Failed to exit PiP:", error);
            showNotification(
              "Failed to exit PiP mode",
              "error",
              notificationsEnabled
            );
          }
        }
      } else {
        if (videoId !== undefined && !videoList[videoId].paused) {
          try {
            if (videoList[videoId].disablePictureInPicture) {
              enablePiP(videoList, videoId);
            }

            if (navigator.userActivation.isActive) {
              await videoList[videoId].requestPictureInPicture();
              showNotification("Entered PiP mode", "enterPiP", false);
            } else {
              showNotification(
                "PiP requires user interaction",
                "warning",
                notificationsEnabled
              );
            }
          } catch (error) {
            console.error("Failed to enter PiP:", error);
            showNotification(
              "Failed to enter PiP mode",
              "error",
              notificationsEnabled
            );
          }
        }
      }
    });

    async function togglePiP(): Promise<void> {
      loadUserPref();
      // @ts-ignore
      const videoList = querySelectorAll(
        "video"
      ) as NodeListOf<HTMLVideoElement>;
      const videoId = getVideoId(videoList);

      if (document.pictureInPictureElement) {
        try {
          await document.exitPictureInPicture();
          showNotification("Exited PiP mode", "exitPiP", notificationsEnabled);
        } catch (error) {
          console.error("Failed to exit PiP:", error);
          showNotification(
            "Failed to exit PiP mode",
            "error",
            notificationsEnabled
          );
        }
      } else {
        if (videoId !== undefined && !videoList[videoId].paused) {
          try {
            if (videoList[videoId].disablePictureInPicture) {
              enablePiP(videoList, videoId);
            }

            await videoList[videoId].requestPictureInPicture();
            showNotification(
              "Entered PiP mode",
              "enterPiP",
              notificationsEnabled
            );
          } catch (error) {
            console.error("Failed to enter PiP:", error);
            showNotification(
              "Failed to enter PiP mode",
              "error",
              notificationsEnabled
            );
          }
        } else {
          showNotification(
            "Can not enter PiP mode",
            "warning",
            notificationsEnabled
          );
        }
      }
    }
  },
});
