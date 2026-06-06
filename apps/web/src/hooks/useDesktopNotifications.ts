import { useCallback } from "react";
import { isTauri } from "@/utils/tauri";
import {
  sendNotification,
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/plugin-notification";

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  sound?: boolean;
  duration?: number;
}

export function useDesktopNotifications() {
  const showNotification = useCallback(async (options: NotificationOptions) => {
    const { title, body, icon } = options;

    if (isTauri()) {
      try {
        let granted = await isPermissionGranted();
        if (!granted) {
          const permission = await requestPermission();
          granted = permission === "granted";
        }
        if (granted) {
          await sendNotification({
            title,
            body,
            icon: icon || undefined,
          });
        } else {
          console.warn("Notification permission denied");
        }
      } catch (error) {
        console.error("Failed to show Tauri notification:", error);
        // Fallback to Web Notifications API
        showWebNotification(options);
      }
    } else {
      showWebNotification(options);
    }
  }, []);

  const showWebNotification = useCallback((options: NotificationOptions) => {
    const { title, body, icon } = options;
    if (!("Notification" in window)) {
      console.warn("This browser does not support desktop notifications");
      return;
    }
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body, icon: icon || "/favicon.ico" });
        }
      });
    } else if (Notification.permission === "granted") {
      new Notification(title, { body, icon: icon || "/favicon.ico" });
    }
  }, []);

  const showNewEntryNotification = useCallback(() => {
    showNotification({
      title: "Новая запись",
      body: "Готово создать новую запись в дневнике?",
      icon: "/favicon.ico",
    });
  }, [showNotification]);

  const showReminderNotification = useCallback(
    (message: string) => {
      showNotification({
        title: "Напоминание от Delёz",
        body: message,
        icon: "/favicon.ico",
      });
    },
    [showNotification],
  );

  const showErrorNotification = useCallback(
    (error: string) => {
      showNotification({
        title: "Ошибка",
        body: error,
        icon: "/favicon.ico",
      });
    },
    [showNotification],
  );

  return {
    showNotification,
    showNewEntryNotification,
    showReminderNotification,
    showErrorNotification,
    isTauri: isTauri(),
  };
}

export default useDesktopNotifications;
