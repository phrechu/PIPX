# Privacy Policy

No data or personal information is collected by PIPX.

> If you have any questions or suggestions regarding this privacy policy, do not hesitate to [file an issue](https://github.com/phrechu/PIPX/issues).

## Permissions needed

### Scripting

The extension needs scripting permission to detect video elements on web pages and control their Picture-in-Picture functionality. This permission allows the content script to find active videos, handle visibility changes, and toggle PiP mode when users switch tabs or click the extension icon.

### Storage

Storage permission is required to save user preferences, specifically whether notifications should be displayed. The extension uses browser.storage.sync to store and retrieve this setting, allowing the user's preference to persist across browser sessions.

### ContextMenus

The extension creates a context menu item that allows users to toggle notification visibility. This menu appears when users right-click the extension icon in the toolbar, providing a convenient way to customize the extension's behavior without opening a separate options page.

### Host Permission

The extension needs to run on all websites where videos might be played (<all_urls>) because the Picture-in-Picture functionality must work across any site with video content. This broad permission is necessary to ensure the extension can detect and control video playback when users switch between tabs on any website.
