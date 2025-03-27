export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    PiP();

    async function PiP(): Promise<void> {
      let videoList: NodeListOf<HTMLVideoElement> =
        document.querySelectorAll("video");
      let videoId: number | undefined = getVideoId(videoList);
      // If we're becoming visible and there's a PiP element, exit PiP
      if (document.pictureInPictureElement) {
        try {
          await document.exitPictureInPicture();
          // await videoList[videoId].pause();
          console.log("Exited PiP mode");
        } catch (error) {
          console.error("Failed to exit PiP:", error);
        }
      } else {
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
    }
  },
});
