/**
 * Gets the ID of the currently playing video element from a list of videos
 * @param videos - NodeList of HTMLVideoElement to search through
 * @returns The index of the playing video or undefined if no suitable video is found
 */
export function getVideoId(
  videos: NodeListOf<HTMLVideoElement>
): number | undefined {
  if (videos.length === 0) {
    // console.log("no videos found");
    return undefined;
  } else if (videos.length === 1) {
    // one video
    const video = videos[0];
    if (!video.muted && video.videoHeight !== 0) {
      return 0;
    }
    // console.log("one muted video found");
    return undefined;
  } else if (videos.length > 1) {
    const videoStates = Array.from(videos).map((video) => ({
      isMuted: video.muted,
      isPaused: video.paused,
      videoHeight: video.videoHeight,
    }));

    const playingVideos = videoStates.filter((state) => !state.isPaused);

    if (playingVideos.length === 1) {
      const videoId = videoStates.findIndex((state) => !state.isPaused);
      return !videoStates[videoId].isMuted &&
        videoStates[videoId].videoHeight !== 0
        ? videoId
        : undefined;
    }
    return undefined;
  }
  return undefined;
}
