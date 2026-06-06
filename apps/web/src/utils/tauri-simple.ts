/**
 * Simple Tauri v2 API implementation
 * Uses direct access to window.__TAURI_INTERNALS__
 */

/**
 * Check if running in Tauri
 */
export function isTauri(): boolean {
  return typeof window !== "undefined" && !!(window as any).__TAURI_INTERNALS__;
}

/**
 * Get Tauri internals object
 */
export function getInternals(): any {
  return (window as any).__TAURI_INTERNALS__;
}

/**
 * Initialize Tauri API
 */
export async function initTauriApi(): Promise<boolean> {
  return isTauri();
}

/**
 * Window control functions using direct access
 */
export async function minimizeWindow(): Promise<void> {
  try {
    const internals = getInternals();
    if (internals?.window?.minimize) {
      await internals.window.minimize();
    } else {
      console.warn("minimize method not found");
    }
  } catch (error) {
    console.error("minimizeWindow error:", error);
  }
}

export async function toggleMaximizeWindow(): Promise<void> {
  try {
    const internals = getInternals();
    if (internals?.window?.toggleMaximize) {
      await internals.window.toggleMaximize();
    } else {
      console.warn("toggleMaximize method not found");
    }
  } catch (error) {
    console.error("toggleMaximizeWindow error:", error);
  }
}

export async function closeWindow(): Promise<void> {
  try {
    const internals = getInternals();
    if (internals?.window?.close) {
      await internals.window.close();
    } else {
      console.warn("close method not found");
    }
  } catch (error) {
    console.error("closeWindow error:", error);
  }
}

export async function isWindowMaximized(): Promise<boolean> {
  try {
    const internals = getInternals();
    if (internals?.window?.isMaximized) {
      return await internals.window.isMaximized();
    } else {
      console.warn("isMaximized method not found");
      return false;
    }
  } catch (error) {
    console.error("isWindowMaximized error:", error);
    return false;
  }
}

/**
 * Event handling functions
 */
export async function emitEvent(event: string, payload?: any): Promise<void> {
  try {
    const internals = getInternals();
    if (internals?.event?.emit) {
      await internals.event.emit(event, payload);
    } else {
      console.warn("emit method not found");
    }
  } catch (error) {
    console.error("emitEvent error:", error);
  }
}

export async function listenEvent(
  event: string,
  handler: (payload: any) => void,
): Promise<() => void> {
  try {
    const internals = getInternals();
    if (internals?.event?.listen) {
      return await internals.event.listen(event, handler);
    } else {
      console.warn("listen method not found");
      return () => {};
    }
  } catch (error) {
    console.error("listenEvent error:", error);
    return () => {};
  }
}

/**
 * App control functions
 */
export async function exitApp(code: number = 0): Promise<void> {
  try {
    const internals = getInternals();
    if (internals?.app?.exit) {
      await internals.app.exit(code);
    } else {
      console.warn("exit method not found");
    }
  } catch (error) {
    console.error("exitApp error:", error);
  }
}

/**
 * Check if Tauri API is available
 */
export function isApiAvailable(): boolean {
  const internals = getInternals();
  return !!(internals?.window && internals?.event);
}

/**
 * Direct method access for debugging
 */
export const tauriDirect = {
  minimize: () => getInternals()?.window?.minimize?.(),
  close: () => getInternals()?.window?.close?.(),
  toggleMaximize: () => getInternals()?.window?.toggleMaximize?.(),
  isMaximized: () => getInternals()?.window?.isMaximized?.(),
  emit: (event: string, payload?: any) =>
    getInternals()?.event?.emit?.(event, payload),
  listen: (event: string, handler: (payload: any) => void) =>
    getInternals()?.event?.listen?.(event, handler),
};

export default {
  isTauri,
  getInternals,
  initTauriApi,
  minimizeWindow,
  toggleMaximizeWindow,
  closeWindow,
  isWindowMaximized,
  emitEvent,
  listenEvent,
  exitApp,
  isApiAvailable,
  tauriDirect,
};
