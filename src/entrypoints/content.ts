export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    console.log("PIPX is running");
    autoPiP();

    function autoPiP(): void {
      document.addEventListener("visibilitychange", async () => {
        if (document.visibilityState === "visible") {
          // If we're becoming visible and there's a PiP element, exit PiP
          if (document.pictureInPictureElement) {
            try {
              await document.exitPictureInPicture();
              console.log("Exited PiP mode");
            } catch (error) {
              console.error("Failed to exit PiP:", error);
            }
          }
        } else {
          let videoList: NodeListOf<HTMLVideoElement> =
            document.querySelectorAll("video");
          let videoId: number | undefined = getVideoId(videoList);
          // console.log("videoList",videoList);
          // console.log("videoId:", videoId);
          if (videoId !== undefined && !videoList[videoId].paused) {
            try {
              // Enable PiP if it's disabled
              if (videoList[videoId].disablePictureInPicture) {
                enablePiP(videoList, videoId);
              }

              // Request PiP
              await videoList[videoId].requestPictureInPicture();
              console.log("Entered PiP mode");
            } catch (error) {
              console.error("Failed to enter PiP:", error);
            }
          }
        }
      });
    }

    function enablePiP(
      videos: NodeListOf<HTMLVideoElement>,
      videoId: number
    ): void {
      videos[videoId].disablePictureInPicture = false;
    }

    function getVideoId(
      videos: NodeListOf<HTMLVideoElement>
    ): number | undefined {
      if (videos.length === 0) {
        // console.log("no videos found");
        return undefined;
      } else if (videos.length === 1) {
        // one video
        const video = videos[0];
        if (!video.muted) {
          return 0;
        }
        // console.log("one muted video found");
        return undefined;
      } else if (videos.length > 1) {
        const isMuted = Array.from(videos).map((video) => video.muted);
        const isPaused = Array.from(videos).map((video) => video.paused);
        const nonMutedCount = isMuted.filter((muted) => !muted).length;
        const nonPausedCount = isPaused.filter((paused) => !paused).length;
        // console.log("many videos found");
        // console.log("isMuted", isMuted);
        // console.log("isPaused", isPaused);
        if (nonPausedCount === 1) {
          // if exactly one video is playing and unmuted
          const videoId = isPaused.indexOf(false);
          if (isMuted[videoId] === false) {
            return videoId;
          }
          return undefined;
        }
        return undefined;
      }
      return undefined;
    }
  },
});
