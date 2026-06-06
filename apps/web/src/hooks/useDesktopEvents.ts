import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDesktopNotifications from "./useDesktopNotifications";

/**
 * Хук для обработки событий от Tauri desktop-приложения.
 * Слушает события от системного трея и горячих клавиш.
 */
export function useDesktopEvents() {
  const navigate = useNavigate();
  const { showNewEntryNotification } = useDesktopNotifications();

  useEffect(() => {
    // Проверяем, запущено ли в Tauri
    const isTauri = typeof window !== 'undefined' && !!(window as any).__TAURI_INTERNALS__;
    
    console.log("[useDesktopEvents] Tauri detected:", isTauri);

    // Подписываемся на события Tauri если API доступен
    const setupEventListeners = () => {
      try {
        const win = window as any;
        if (win.__TAURI_INTERNALS__?.event?.listen) {
          // Событие: новая запись (Ctrl+N или из трея)
          win.__TAURI_INTERNALS__.event.listen("new-entry", () => {
            console.log("[DesktopEvent] New entry requested");
            showNewEntryNotification();
            navigate("/records");
          }).catch(console.error);

          // Событие: открыть настройки (Ctrl+,)
          win.__TAURI_INTERNALS__.event.listen("open-settings", () => {
            console.log("[DesktopEvent] Open settings requested");
            navigate("/profile");
          }).catch(console.error);

          // Событие: показать/скрыть окно (из трея)
          win.__TAURI_INTERNALS__.event.listen("show-window", () => {
            console.log("[DesktopEvent] Show window requested");
            if (win.__TAURI_INTERNALS__?.window) {
              win.__TAURI_INTERNALS__.window.show().catch(console.error);
              win.__TAURI_INTERNALS__.window.setFocus().catch(console.error);
            }
          }).catch(console.error);
        } else {
          console.log("[useDesktopEvents] Tauri event API not available");
        }
      } catch (error) {
        console.error("[useDesktopEvents] Failed to setup event listeners:", error);
      }
    };

    if (isTauri) {
      setupEventListeners();
    }

    // Горячие клавиши на фронтенде (работают в браузере и Tauri)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+N - новая запись
      if (e.ctrlKey && e.key === "n") {
        e.preventDefault();
        showNewEntryNotification();
        navigate("/records");
        console.log("Hotkey: Ctrl+N - New entry");
      }
      
      // Ctrl+, - настройки
      if (e.ctrlKey && e.key === ",") {
        e.preventDefault();
        navigate("/profile");
        console.log("Hotkey: Ctrl+, - Open settings");
      }
      
      // Ctrl+Q - выход (только в Tauri)
      if (e.ctrlKey && e.key === "q" && isTauri) {
        e.preventDefault();
        console.log("Hotkey: Ctrl+Q - Quit");
        // Пробуем закрыть окно через Tauri API
        const win = window as any;
        if (win.__TAURI_INTERNALS__?.window?.close) {
          win.__TAURI_INTERNALS__.window.close().catch(console.error);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate, showNewEntryNotification]);
}

export default useDesktopEvents;
