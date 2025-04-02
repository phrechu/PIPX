export default defineBackground(() => {
  // Create context menu on install
  browser.contextMenus.create({
    id: "toggleNotifications",
    title: "Show Notifications",
    type: "checkbox",
    checked: true,
    contexts: ["action"],
  });

  // Handle context menu clicks
  browser.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "toggleNotifications") {
      browser.storage.sync.set({ showNotifications: info.checked });
    }
  });

  // Handle browser action clicks
  browser.action.onClicked.addListener((tab) => {
    if (tab.id) {
      browser.tabs.sendMessage(tab.id, { action: "togglePiP" });
    }
  });
});
