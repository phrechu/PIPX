export default defineBackground(() => {
  browser.contextMenus.create({
    id: 'toggleNotifications',
    title: 'Show/Hide Notifications',
    type: 'checkbox',
    checked: true,
    contexts: ['action'],
  })

  browser.contextMenus.onClicked.addListener(info => {
    if (info.menuItemId === 'toggleNotifications') {
      browser.storage.sync.set({ enableNotifications: info.checked })
    }
  })

  browser.action.onClicked.addListener(tab => {
    if (tab.id) {
      browser.tabs.sendMessage(tab.id, { action: 'togglePiP' })
    }
  })
})
