import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "PIPX - better PiP experience",
    version: "0.0.1",
    description: "Automatic PiP when switching tabs",
    permissions: ["scripting", "storage", "contextMenus"],
    action: {
      default_icon: {
        "16": "icon/16.png",
        "32": "icon/32.png",
        "48": "icon/48.png",
        "96": "icon/96.png",
        "128": "icon/128.png",
      },
    },
    commands: {
      _execute_action: {
        suggested_key: {
          windows: "Alt+P",
          mac: "Alt+P",
          chromeos: "Alt+P",
          linux: "Alt+P",
        },
      },
    },
  },
  manifestVersion: 3,
  srcDir: "src",
  extensionApi: "chrome",
});
