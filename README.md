<p align="center">
 <img src="./.github/assets/512.png" height="128" alt="Logo">
 <h1 align="center">PIPX</h1>
 <p  align="center">Better Picture-in-Picture experience</p>
</p>

## Description

A simple Chrome Extension that automatically opens [Picture-in-Picture](https://wicg.github.io/picture-in-picture/) when switching tabs or by using the (`Alt+P`) shortcut.

> [!important]
> User Interaction Required for PiP on Tab Switch
>
> For security reasons, the browser's Picture-in-Picture API requires explicit user interaction (like a click) with the video element before Automatic PiP can be activated.

## Download

_will be soon in chrome web store._

## Features

- Automatic PiP on tab switch.
- Toast notifications to provide visual feedback to users.
- Enable PiP using the (`Alt+P`) shortcut or by clicking the extension icon.

> [!TIP]
>
> 1. The (`Alt+P`) shortcut can be changed on the Chrome Extension Shortcuts settings page: [chrome://extensions/shortcuts](chrome://extensions/shortcuts).
> 2. To disable toast notifications (enabled by default) click right on the extension icon then click on show notifications.

## Notifications guide

#### 1. Entered/Exited PiP mode

This notification is shown when the PiP is successfully enabled/disabled.

It is only shown when using the (`Alt+P`) shortcut or by clicking the extension icon.

#### 2. Can not enter PiP mode

This notification is shown when :

- The video is paused or muted.
  > to enable PiP make sure the video is playing and is not muted.
- Many videos are playing and not mute at the same time.
- No videos were found.

#### 3. Failed to enter PiP mode

This notification is shown when entering PiP mode encountered an error, check your console for more info and do not hesitate to [file an issue](https://github.com/phrechu/PIPX/issues).

## Roadmap

- [ ] `v0.0.1`
  - [x] Feat: autoPiP on tab switch.
  - [x] Feat: Enable PiP by clicking the PIPX icon or using Alt-P shortcut.
  - [x] Feat: Toast notifications for visual feedback.
  - [ ] Publish to Chrome Web Store.
- [ ] `v0.0.2`
  - [ ] Improve the notifications UI and messages.
  - [ ] Add video detection for nested browsing contexts (e.g iframe elements / reddit player).
  - [ ] Automate Publishing new versions.

## Development

You must use [pnpm](https://pnpm.io/) with this repo.

Install dependencies:

```sh
pnpm i
```

### Scripts

This extension is bundled via [WXT](https://wxt.dev).

- `pnpm dev`: To Launch Chrome with the dev version of the extension installed.
- `pnpm build`: To build the extension for production. Outputs to the `dist` directory.
- `pnpm zip`: To zip up the `dist` directory into an installable ZIP file.

### Install Locally

```sh
pnpm build
```

- Go to [chrome://extensions/](chrome://extensions/).
- Turn on developer mode.
- Click "load unpacked" button.
- Choose the `.output/chrome-mv3/` folder.
- Then you will be able to see extension icon in Chrome extension bar.
