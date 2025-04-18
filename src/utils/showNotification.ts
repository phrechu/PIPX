import { NOTIFICATION_ICONS } from "../utils/notificationIcons";

export function showNotification(
  message: string,
  type: "success" | "error" | "warning" | "enterPiP" | "exitPiP" = "success",
  notificationsEnabled: boolean
): void {
  if (!notificationsEnabled) return;

  const notification = document.createElement("div");
  const icon = document.createElement("div");
  const text = document.createElement("div");

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding:16px 20px;
        border-radius: 50px;
        background: ${
          type === "error"
            ? "#ff8f73"
            : type === "warning"
            ? "#ffe380"
            : "#79f2c0"
        };
        color: #1d2125;
        z-index: 999999;
        font-size:12px;
        font-family: system-ui, -apple-system, sans-serif;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
      `;

  icon.style.cssText = `padding-top:4px;`;

  icon.innerHTML =
    type === "error"
      ? NOTIFICATION_ICONS.error
      : type === "warning"
      ? NOTIFICATION_ICONS.warning
      : type === "enterPiP"
      ? NOTIFICATION_ICONS.enterPiP
      : type === "exitPiP"
      ? NOTIFICATION_ICONS.exitPiP
      : NOTIFICATION_ICONS.enterPiP;

  text.textContent = message;

  notification.appendChild(icon);
  notification.appendChild(text);
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transition = "opacity 0.3s";
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 3000);
  }, 3000);
}
