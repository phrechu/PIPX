import { getVideoId } from "../utils/getVideoId";
import { enablePiP } from "../utils/enablePiP";
import { NOTIFICATION_ICONS } from "../utils/notificationIcons";

export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    let showNotifications = true;

    // Load initial preference
    async function loadUserPref(): Promise<void> {
      const result = await browser.storage.sync.get("showNotifications");
      showNotifications = result.showNotifications ?? true;
    }

    // Listen for storage changes
    browser.storage.onChanged.addListener((changes) => {
      if (changes.showNotifications) {
        showNotifications = changes.showNotifications.newValue;
      }
    });

    // Load initial preference
    loadUserPref();

    // Handle messages from background script
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      togglePiP();
    });

    // Handle visibility changes for auto PiP
    document.addEventListener("visibilitychange", async () => {
      const videoList = document.querySelectorAll("video");
      const videoId = getVideoId(videoList);
      loadUserPref();

      if (document.visibilityState === "visible") {
        if (document.pictureInPictureElement) {
          try {
            await document.exitPictureInPicture();
            // showNotification("Exited PiP mode", "exitPiP");
          } catch (error) {
            console.error("Failed to exit PiP:", error);
            showNotification("Failed to exit PiP mode", "error");
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
              // showNotification("Entered PiP mode", "enterPiP");
            } else {
              showNotification("PiP requires user interaction", "warning");
            }
          } catch (error) {
            console.error("Failed to enter PiP:", error);
            showNotification("Failed to enter PiP mode", "error");
          }
        }
      }
    });

    async function togglePiP(): Promise<void> {
      const videoList = document.querySelectorAll("video");
      const videoId = getVideoId(videoList);

      if (document.pictureInPictureElement) {
        try {
          await document.exitPictureInPicture();
          showNotification("Exited PiP mode", "exitPiP");
        } catch (error) {
          console.error("Failed to exit PiP:", error);
          showNotification("Failed to exit PiP mode", "error");
        }
      } else {
        if (videoId !== undefined && !videoList[videoId].paused) {
          try {
            if (videoList[videoId].disablePictureInPicture) {
              enablePiP(videoList, videoId);
            }

            await videoList[videoId].requestPictureInPicture();
            showNotification("Entered PiP mode", "enterPiP");
          } catch (error) {
            console.error("Failed to enter PiP:", error);
            showNotification("Failed to enter PiP mode", "error");
          }
        } else {
          showNotification("No playing video found", "warning");
        }
      }
    }

    function showNotification(
      message: string,
      type: "success" | "error" | "warning" | "enterPiP" | "exitPiP" = "success"
    ): void {
      if (!showNotifications) return;

      const notification = document.createElement("div");
      const icon = document.createElement("div");
      const text = document.createElement("div");

      notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding:16px 20px;
        border-radius: 50px;
        background: ${
          type === "error"
            ? "#ff8f73"
            : type === "warning"
            ? "#ffe380"
            : "#79f2c0"
        };
        color: #1d2125;
        z-index: 999999;
        font-size:12px;
        font-family: system-ui, -apple-system, sans-serif;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
      `;

      icon.style.cssText = `padding-top:4px;`;

      icon.innerHTML =
        type === "error"
          ? NOTIFICATION_ICONS.error
          : type === "warning"
          ? NOTIFICATION_ICONS.warning
          : type === "enterPiP"
          ? NOTIFICATION_ICONS.enterPiP
          : type === "exitPiP"
          ? NOTIFICATION_ICONS.exitPiP
          : NOTIFICATION_ICONS.enterPiP;

      text.textContent = message;

      notification.appendChild(icon);
      notification.appendChild(text);
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.transition = "opacity 0.3s";
        notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 3000);
      }, 3000);
    }
  },
});
