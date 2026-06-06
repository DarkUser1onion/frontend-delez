/**
 * Tauri v2 API utilities – официальный пакет @tauri-apps/api
 * Безопасно работает внутри и вне Tauri окружения.
 */
import { getCurrentWindow } from "@tauri-apps/api/window";
import { emit, listen } from "@tauri-apps/api/event";

// ---------- проверка окружения ----------
export function isTauri(): boolean {
  try {
    // В Tauri v2 глобальный объект window.__TAURI__ доступен всегда,
    // когда запущено внутри Tauri.
    return !!(window as any).__TAURI__;
  } catch {
    return false;
  }
}

// ---------- window API (безопасные обёртки) ----------
let _window: ReturnType<typeof getCurrentWindow> | null = null;
function windowApi() {
  if (!_window && isTauri()) {
    try {
      _window = getCurrentWindow();
    } catch (e) {
      console.warn("Tauri window API недоступно:", e);
    }
  }
  return _window;
}

export async function minimizeWindow(): Promise<void> {
  const win = windowApi();
  if (win) await win.minimize();
}
export async function toggleMaximizeWindow(): Promise<void> {
  const win = windowApi();
  if (win) await win.toggleMaximize();
}
export async function closeWindow(): Promise<void> {
  const win = windowApi();
  if (win) {
    try {
      await win.hide();
    } catch (e) {
      console.error("closeWindow (hide) error:", e);
    }
  }
}
export async function isWindowMaximized(): Promise<boolean> {
  const win = windowApi();
  return win ? win.isMaximized() : false;
}

// ---------- event API ----------
export async function emitEvent(
  event: string,
  payload?: unknown,
): Promise<void> {
  if (!isTauri()) return;
  await emit(event, payload);
}
export async function listenEvent(
  event: string,
  handler: (payload: any) => void,
): Promise<() => void> {
  if (!isTauri()) return () => {};
  const unlisten = await listen(event, (e) => handler(e.payload));
  return unlisten;
}

// ---------- app API ----------
export async function exitApp(code: number = 0): Promise<void> {
  const win = windowApi();
  if (win) {
    await win.close();
  } else if (typeof window !== "undefined") {
    window.close();
  }
}

// ---------- вспомогательные функции ----------
export function isApiAvailable(): boolean {
  return isTauri() && windowApi() !== null;
}
export function getInternals(): any {
  return (window as any).__TAURI__ || null;
}
export async function initTauriApi(): Promise<boolean> {
  return isTauri();
}

// для обратной совместимости – оставляем старые имена
export const getTauriWindow = windowApi;
export const getTauriEvent = () => (isTauri() ? { emit, listen } : null);
export const getTauriApp = () => null;
export const getTauriInternals = getInternals;
export const isTauriApiAvailable = isApiAvailable;
export const getWindowApi = windowApi;
export const getEventApi = getTauriEvent;
export const getAppApi = getTauriApp;

export default {
  isTauri,
  windowApi,
  getEventApi,
  getAppApi,
  minimizeWindow,
  toggleMaximizeWindow,
  closeWindow,
  isWindowMaximized,
  emitEvent,
  listenEvent,
  exitApp,
  isApiAvailable,
  getInternals,
  initTauriApi,
  getTauriWindow,
  getTauriEvent,
  getTauriApp,
  getTauriInternals,
  isTauriApiAvailable,
};
