export function showNotification(
  message: string,
  type: 'success' | 'error' | 'warning' | 'enterPiP' | 'exitPiP' = 'success',
  notificationsEnabled: boolean
): void {
  if (!notificationsEnabled) return
  const notificationEl = document.querySelector('#pipx-notification')
  if (notificationEl !== null) {
    notificationEl.remove()
  }
  const notification = document.createElement('div')
  const icon = document.createElement('div')
  const text = document.createElement('div')
  const learnMore = document.createElement('a')
  learnMore.style.cssText = `
    color:#32477e;
    font-weight: bold;
  `
  learnMore.setAttribute('href', 'https://pipx.netlify.app/#faq')
  learnMore.setAttribute('target', '_blank')
  learnMore.textContent = 'learn why'

  notification.setAttribute('id', 'pipx-notification')
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding:16px 20px;
        border-radius: 50px;
        background: ${type === 'error' ? 'rgba(255, 143, 115)' : type === 'warning' ? 'rgba(255, 227, 128)' : 'rgba(121, 242, 192)'};
        color: #1d2125;
        z-index: 999999;
        font-size:12px;
        font-family: system-ui, -apple-system, sans-serif;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
      `

  icon.style.cssText = `padding-top:4px;`

  icon.innerHTML =
    type === 'error'
      ? notificationIcons.error
      : type === 'warning'
        ? notificationIcons.warning
        : type === 'enterPiP'
          ? notificationIcons.enterPiP
          : type === 'exitPiP'
            ? notificationIcons.exitPiP
            : notificationIcons.enterPiP

  text.textContent = message

  notification.appendChild(icon)
  notification.appendChild(text)
  if (type === 'warning') {
    notification.appendChild(learnMore)
  }
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transition = 'opacity 0.3s'
    notification.style.opacity = '0'
    setTimeout(() => notification.remove(), 3000)
  }, 3000)
}

const notificationIcons = {
  error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" style="fill: currentColor">
    <path d="M435.2,51.2H76.8C34.4,51.2,0,85.6,0,128v256c0,42.4,34.4,76.8,76.8,76.8h358.4c42.4,0,76.8-34.4,76.8-76.8V128  C512,85.6,477.6,51.2,435.2,51.2z M460.8,384c0,14.1-11.5,25.6-25.6,25.6H76.8c-14.1,0-25.6-11.5-25.6-25.6V128  c0-14.1,11.5-25.6,25.6-25.6h358.4c14.1,0,25.6,11.5,25.6,25.6V384z"/>
    <path d="M186.7,222.9l102.4,102.4c10,10,26.2,10,36.2,0c10-10,10-26.2,0-36.2L222.9,186.7c-10-10-26.2-10-36.2,0  S176.7,212.9,186.7,222.9"/>
    <path d="M222.9,325.3l102.4-102.4c10-10,10-26.2,0-36.2c-10-10-26.2-10-36.2,0L186.7,289.1c-10,10-10,26.2,0,36.2  C196.7,335.3,212.9,335.3,222.9,325.3"/>
  </svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" style="fill: currentColor">
    <path d="m435.2,51.2H76.8C34.37,51.22.02,85.57,0,128v256c.02,42.43,34.37,76.78,76.8,76.8h358.4c42.43-.02,76.78-34.37,76.8-76.8V128c-.02-42.43-34.37-76.78-76.8-76.8Zm25.6,332.8c-.03,14.13-11.47,25.57-25.6,25.6H76.8c-14.13-.03-25.57-11.47-25.6-25.6V128c.03-14.13,11.47-25.57,25.6-25.6h358.4c14.13.03,25.57,11.47,25.6,25.6v256Z"/>
    <g>
      <path d="m281.6,295.47v-144.82c0-14.14-11.46-25.6-25.6-25.6-14.14,0-25.6,11.46-25.6,25.6v144.82c0,14.14,11.46,25.6,25.6,25.6,14.14,0,25.6-11.46,25.6-25.6"/>
      <circle cx="256" cy="361.34" r="25.6"/>
    </g>
  </svg>`,
  enterPiP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" style="fill: currentColor">
    <g>
      <path d="M230.4,409.6H76.8c-14.13-0.03-25.57-11.47-25.6-25.6V128c0.03-14.13,11.47-25.57,25.6-25.6h358.4   c14.13,0.03,25.57,11.47,25.6,25.6v102.4c0,14.14,11.46,25.6,25.6,25.6c14.14,0,25.6-11.46,25.6-25.6l0-102.4   c-0.02-42.43-34.37-76.78-76.8-76.8H76.8C34.37,51.22,0.02,85.57,0,128v256c0.02,42.43,34.37,76.78,76.8,76.8h153.6   c14.14,0,25.6-11.46,25.6-25.6S244.54,409.6,230.4,409.6L230.4,409.6z"/>
      <path d="M307.2,332.8h25.6v0h128v0v76.8h-128l0,0v-76.8H307.2h-25.6v76.8c0.02,28.29,22.91,51.18,51.2,51.2h128   c28.29-0.02,51.18-22.91,51.2-51.2v-76.8c-0.02-28.29-22.91-51.18-51.2-51.2h-128c-28.29,0.02-51.18,22.91-51.2,51.2H307.2z"/>
      <path d="M109.9,197.3l102.4,102.4c10,10,26.21,10,36.2,0c10-10,10-26.21,0-36.2L146.1,161.1c-10-10-26.21-10-36.2,0   S99.9,187.3,109.9,197.3"/>
      <path d="M153.6,307.2h76.8c6.74,0,13.34-2.73,18.1-7.5c4.77-4.77,7.5-11.36,7.5-18.1v-76.8c0-14.14-11.46-25.6-25.6-25.6   s-25.6,11.46-25.6,25.6l0,51.2l-51.2,0c-14.14,0-25.6,11.46-25.6,25.6S139.46,307.2,153.6,307.2L153.6,307.2z"/>
    </g>
  </svg>`,
  exitPiP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" style="fill: currentColor">
    <g>
      <path d="M230.4,409.6H76.8c-14.13-0.03-25.57-11.47-25.6-25.6V128c0.03-14.13,11.47-25.57,25.6-25.6h358.4   c14.13,0.03,25.57,11.47,25.6,25.6v102.4c0,14.14,11.46,25.6,25.6,25.6c14.14,0,25.6-11.46,25.6-25.6l0-102.4   c-0.02-42.43-34.37-76.78-76.8-76.8H76.8C34.37,51.22,0.02,85.57,0,128v256c0.02,42.43,34.37,76.78,76.8,76.8h153.6   c14.14,0,25.6-11.46,25.6-25.6S244.54,409.6,230.4,409.6L230.4,409.6z"/>
      <path d="M307.2,332.8h25.6v0h128v0v76.8h-128l0,0v-76.8H307.2h-25.6v76.8c0.02,28.29,22.91,51.18,51.2,51.2h128   c28.29-0.02,51.18-22.91,51.2-51.2v-76.8c-0.02-28.29-22.91-51.18-51.2-51.2h-128c-28.29,0.02-51.18,22.91-51.2,51.2H307.2z"/>
      <path d="M109.9,197.3l102.4,102.4c10,10,26.21,10,36.2,0c10-10,10-26.21,0-36.2L146.1,161.1c-10-10-26.21-10-36.2,0   S99.9,187.3,109.9,197.3"/>
      <path d="M153.6,256v-51.2l51.2,0c14.14,0,25.6-11.46,25.6-25.6s-11.46-25.6-25.6-25.6l-76.8,0c-6.74,0-13.34,2.73-18.1,7.5   c-4.77,4.77-7.5,11.36-7.5,18.1V256c0,14.14,11.46,25.6,25.6,25.6C142.14,281.6,153.6,270.14,153.6,256L153.6,256z"/>
    </g>
  </svg>`,
}
