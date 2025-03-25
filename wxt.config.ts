import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
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
    permissions: ["activeTab", "scripting"],
    host_permissions: ["<all_urls>"],
    manifest_version: 3,
  },
  srcDir: "src",
  extensionApi: "chrome",
});
