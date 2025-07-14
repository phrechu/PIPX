export default defineBackground(() => {
  const createContextMenu = () => {
    browser.contextMenus.create({
      id: 'toggleNotifications',
      title: 'Show/Hide Notifications',
      type: 'checkbox',
      checked: true,
      contexts: ['action'],
    })
  }

  const handleContextMenuClick = async (info: chrome.contextMenus.OnClickData) => {
    if (info.menuItemId === 'toggleNotifications') {
      await browser.storage.sync.set({ enableNotifications: info.checked })
    }
  }

  // @ts-ignore
  const handleActionClick = (tab: Tab) => {
    if (tab.id) {
      browser.tabs.sendMessage(tab.id, { action: 'togglePiP' })
    }
  }

  createContextMenu()
  browser.contextMenus.onClicked.addListener(handleContextMenuClick)
  browser.action.onClicked.addListener(handleActionClick)
})
