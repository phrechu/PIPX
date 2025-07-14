import { querySelectorAll } from 'kagekiri'
import { getVideoId } from '../utils/getVideoId'
import { showNotification } from '../utils/showNotification'

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    let notificationsEnabled = true

    const loadUserPref = async () => {
      const { enableNotifications } = await browser.storage.sync.get('enableNotifications')
      notificationsEnabled = enableNotifications ?? true
    }

    browser.storage.onChanged.addListener(changes => {
      if (changes.enableNotifications) {
        notificationsEnabled = changes.enableNotifications.newValue ?? true
      }
    })

    browser.runtime.onMessage.addListener(() => {
      togglePiP()
    })

    type TriggerSource = 'mediaSession' | 'userActivation' | undefined
    let triggerSource: TriggerSource = 'userActivation'

    document.addEventListener('visibilitychange', async () => {
      // @ts-ignore
      const videoList = querySelectorAll('video') as NodeListOf<HTMLVideoElement>
      const videoId = getVideoId(videoList)
      await loadUserPref()

      if (videoId === undefined) return

      const video = videoList[videoId]
      const pipActive = !!document.pictureInPictureElement
      const userInteracted = navigator.userActivation?.isActive
      const isReturning = document.visibilityState === 'visible'
      const isLeaving = document.visibilityState === 'hidden'

      if (triggerSource !== 'mediaSession' && 'mediaSession' in navigator) {
        try {
          // @ts-ignore
          navigator.mediaSession.setActionHandler('enterpictureinpicture', async () => {
            await video.requestPictureInPicture()
            triggerSource = 'mediaSession'
          })
        } catch (err) {
          console.warn('PIPX:', err)
        }
      }

      if (isReturning && !video.paused) {
        if (triggerSource === 'mediaSession') {
          triggerSource = 'userActivation'
        }

        if (pipActive) {
          await document.exitPictureInPicture()
        }

        if (!userInteracted && !pipActive && triggerSource === undefined) {
          showNotification('User Interaction Required', 'warning', notificationsEnabled)
        }

        if (triggerSource === 'userActivation') {
          triggerSource = undefined
        }

        return
      }

      if (isLeaving && !video.paused) {
        if (userInteracted && !pipActive) {
          await video.requestPictureInPicture()
          triggerSource = 'userActivation'
        }
      }
    })

    const togglePiP = async (): Promise<void> => {
      await loadUserPref()
      // @ts-ignore
      const videoList = querySelectorAll('video') as NodeListOf<HTMLVideoElement>
      const videoId = getVideoId(videoList)

      if (videoId === undefined) return

      const video = videoList[videoId]

      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
        showNotification('Exited PiP mode', 'exitPiP', notificationsEnabled)
      } else {
        await video.requestPictureInPicture()
        showNotification('Entered PiP mode', 'enterPiP', notificationsEnabled)
      }
    }
  },
})
