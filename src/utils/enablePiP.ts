/**
 * Enables Picture-in-Picture for a specific video element
 * @param videos - NodeList of HTMLVideoElement containing the target video
 * @param videoId - Index of the video to enable PiP for
 */
export function enablePiP(
  videos: NodeListOf<HTMLVideoElement>,
  videoId: number
): void {
  if (videoId >= 0 && videoId < videos.length) {
    videos[videoId].disablePictureInPicture = false;
  }
}
