function requestMediaSession(video: HTMLVideoElement) {
  if ('mediaSession' in navigator) {
    // @ts-ignore
    navigator.mediaSession.setActionHandler('enterpictureinpicture', async () => {
      try {
        await video.requestPictureInPicture()
      } catch (e) {
        console.warn('MediaSession PiP request failed', e)
      }
    })
  } else {
    console.warn('PIPX: MediaSession not supported.')
  }
}

function isPermitted(video: HTMLVideoElement): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(document.pictureInPictureElement === video)
    }, 100)
  })
}

function hasPictureInPictureVideo(): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(document.pictureInPictureElement !== null)
    }, 100)
  })
}

export { hasPictureInPictureVideo, isPermitted, requestMediaSession }
