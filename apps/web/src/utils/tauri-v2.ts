/**
 * Tauri v2 API utilities with proper access patterns
 * Based on Tauri v2 documentation
 */

// Типы для Tauri API
interface TauriWindow {
  minimize: () => Promise<void>;
  toggleMaximize: () => Promise<void>;
  close: () => Promise<void>;
  isMaximized: () => Promise<boolean>;
  show: () => Promise<void>;
  hide: () => Promise<void>;
  setFocus: () => Promise<void>;
}

interface TauriEvent {
  emit: (event: string, payload?: any) => Promise<void>;
  listen: (
    event: string,
    handler: (payload: any) => void,
  ) => Promise<() => void>;
}

interface TauriApp {
  exit: (code?: number) => Promise<void>;
}

// Глобальные переменные для кэширования API
let tauriWindow: TauriWindow | null = null;
let tauriEvent: TauriEvent | null = null;
let tauriApp: TauriApp | null = null;

/**
 * Initialize Tauri API - must be called before using other functions
 */
export async function initTauriApi(): Promise<boolean> {
  try {
    // В Tauri v2 API доступен через window.__TAURI_INTERNALS__
    const internals = (window as any).__TAURI_INTERNALS__;

    if (!internals) {
      console.warn("Tauri internals not found");
      return false;
    }

    // Получаем API объекты
    // В Tauri v2 window API может быть доступен через internals.window
    // или через internals.metadata.windows
    if (internals.window) {
      tauriWindow = internals.window;
    } else if (internals.metadata?.windows) {
      // Альтернативный путь доступа
      tauriWindow = internals.metadata.windows.main;
    }

    if (internals.event) {
      tauriEvent = internals.event;
    }

    if (internals.app) {
      tauriApp = internals.app;
    }

    console.log("Tauri API initialized:", {
      window: !!tauriWindow,
      event: !!tauriEvent,
      app: !!tauriApp,
    });

    return !!(tauriWindow && tauriEvent);
  } catch (error) {
    console.error("Failed to initialize Tauri API:", error);
    return false;
  }
}

/**
 * Check if running in Tauri
 */
export function isTauri(): boolean {
  return !!(window as any).__TAURI_INTERNALS__;
}

/**
 * Get Tauri window API
 */
export function getWindow(): TauriWindow | null {
  return tauriWindow;
}

/**
 * Get Tauri event API
 */
export function getEvent(): TauriEvent | null {
  return tauriEvent;
}

/**
 * Get Tauri app API
 */
export function getApp(): TauriApp | null {
  return tauriApp;
}

/**
 * Window control functions
 */
export async function minimizeWindow(): Promise<void> {
  if (!tauriWindow) {
    await initTauriApi();
  }

  if (tauriWindow?.minimize) {
    await tauriWindow.minimize();
  } else {
    console.warn("Window minimize not available");
  }
}

export async function toggleMaximizeWindow(): Promise<void> {
  if (!tauriWindow) {
    await initTauriApi();
  }

  if (tauriWindow?.toggleMaximize) {
    await tauriWindow.toggleMaximize();
  } else {
    console.warn("Window toggleMaximize not available");
  }
}

export async function closeWindow(): Promise<void> {
  if (!tauriWindow) {
    await initTauriApi();
  }

  if (tauriWindow?.close) {
    await tauriWindow.close();
  } else {
    console.warn("Window close not available");
  }
}

export async function isWindowMaximized(): Promise<boolean> {
  if (!tauriWindow) {
    await initTauriApi();
  }

  if (tauriWindow?.isMaximized) {
    return await tauriWindow.isMaximized();
  }

  console.warn("Window isMaximized not available");
  return false;
}

/**
 * Event handling functions
 */
export async function emitEvent(event: string, payload?: any): Promise<void> {
  if (!tauriEvent) {
    await initTauriApi();
  }

  if (tauriEvent?.emit) {
    await tauriEvent.emit(event, payload);
  } else {
    console.warn("Event emit not available");
  }
}

export async function listenEvent(
  event: string,
  handler: (payload: any) => void,
): Promise<() => void> {
  if (!tauriEvent) {
    await initTauriApi();
  }

  if (tauriEvent?.listen) {
    return await tauriEvent.listen(event, handler);
  }

  console.warn("Event listen not available");
  return () => {};
}

/**
 * App control functions
 */
export async function exitApp(code: number = 0): Promise<void> {
  if (!tauriApp) {
    await initTauriApi();
  }

  if (tauriApp?.exit) {
    await tauriApp.exit(code);
  } else {
    console.warn("App exit not available");
  }
}

/**
 * Check if Tauri API is available
 */
export function isApiAvailable(): boolean {
  return !!(tauriWindow && tauriEvent);
}

/**
 * Direct access to Tauri internals for debugging
 */
export function getInternals(): any {
  return (window as any).__TAURI_INTERNALS__;
}

// Инициализируем API при загрузке
if (typeof window !== "undefined" && (window as any).__TAURI_INTERNALS__) {
  initTauriApi().then((initialized) => {
    console.log("Tauri API auto-initialized:", initialized);
  });
}

export default {
  initTauriApi,
  isTauri,
  getWindow,
  getEvent,
  getApp,
  minimizeWindow,
  toggleMaximizeWindow,
  closeWindow,
  isWindowMaximized,
  emitEvent,
  listenEvent,
  exitApp,
  isApiAvailable,
  getInternals,
};
