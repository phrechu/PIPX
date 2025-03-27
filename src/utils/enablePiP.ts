export function enablePiP(
  videos: NodeListOf<HTMLVideoElement>,
  videoId: number
): void {
  videos[videoId].disablePictureInPicture = false;
}
