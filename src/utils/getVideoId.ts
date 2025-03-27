export function getVideoId(
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
