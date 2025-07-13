export function getVideoId(videos: NodeListOf<HTMLVideoElement>): number | undefined {
  if (videos.length === 0) {
    return undefined
  } else if (videos.length === 1) {
    const video = videos[0]
    if (!video.muted && video.videoHeight !== 0) {
      return 0
    }
    return undefined
  } else if (videos.length > 1) {
    const videoStates = Array.from(videos).map(video => ({
      isMuted: video.muted,
      isPaused: video.paused,
      videoHeight: video.videoHeight,
    }))

    const playingVideos = videoStates.filter(state => !state.isPaused)

    if (playingVideos.length === 1) {
      const videoId = videoStates.findIndex(state => !state.isPaused)
      return !videoStates[videoId].isMuted && videoStates[videoId].videoHeight !== 0
        ? videoId
        : undefined
    }
    return undefined
  }
  return undefined
}
