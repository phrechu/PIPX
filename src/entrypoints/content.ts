import { isPermitted, requestMediaSession } from '@/utils/mediaSession'
import { querySelectorAll } from 'kagekiri'
import { getVideoId } from '../utils/getVideoId'
import { showNotification } from '../utils/showNotification'

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    let notificationsEnabled = true

    async function loadUserPref() {
      const result = await browser.storage.sync.get('enableNotifications')
      notificationsEnabled = (result.enableNotifications as boolean) ?? true
    }

    browser.storage.onChanged.addListener(changes => {
      if (changes.enableNotifications) {
        notificationsEnabled = changes.enableNotifications.newValue as boolean
      }
    })

    browser.runtime.onMessage.addListener(() => {
      togglePiP()
    })

    document.addEventListener('visibilitychange', async () => {
      // @ts-ignore
      const videoList = querySelectorAll('video') as NodeListOf<HTMLVideoElement>
      const videoId = getVideoId(videoList)
      await loadUserPref()
      if (videoId !== undefined) {
        const video = videoList[videoId]
        requestMediaSession(video)

        if (document.visibilityState === 'visible') {
          await document.exitPictureInPicture()
        } else {
          if (!video.paused) {
            try {
              if (navigator.userActivation.isActive && !(await isPermitted(video))) {
                await video.requestPictureInPicture()
              } else if (
                !navigator.userActivation.isActive &&
                !(await isPermitted(video)) &&
                !(await hasPictureInPictureVideo())
              ) {
                showNotification('User Interaction Required', 'warning', notificationsEnabled)
              } else {
                requestMediaSession(video)
              }
            } catch (error) {
              console.error('Failed to enter PiP:', error)
              showNotification('Failed to enter PiP mode', 'error', notificationsEnabled)
            }
          }
        }
      } else {
        showNotification("Can't detect the video", 'warning', notificationsEnabled)
      }
    })

    async function togglePiP(): Promise<void> {
      await loadUserPref()
      // @ts-ignore
      const videoList = querySelectorAll('video') as NodeListOf<HTMLVideoElement>
      const videoId = getVideoId(videoList)

      if (videoId !== undefined) {
        const video = videoList[videoId]
        if (document.pictureInPictureElement) {
          try {
            await document.exitPictureInPicture()

            showNotification('Exited PiP mode', 'exitPiP', notificationsEnabled)
          } catch (error) {
            console.error('Failed to exit PiP:', error)
            showNotification('Failed to exit PiP mode', 'error', notificationsEnabled)
          }
        } else {
          try {
            await video.requestPictureInPicture()
            showNotification('Entered PiP mode', 'enterPiP', notificationsEnabled)
          } catch (error) {
            console.error('Failed to enter PiP:', error)
            showNotification('Failed to enter PiP mode', 'error', notificationsEnabled)
          }
        }
      }
    }
  },
})
