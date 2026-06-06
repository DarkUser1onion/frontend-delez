// Скрипт для тестирования Tauri API в консоли браузера
console.log("=== Tauri API Test ===");

// Проверяем наличие Tauri объектов
console.log("window.__TAURI_INTERNALS__:", window.__TAURI_INTERNALS__);
console.log("window.__TAURI__:", window.__TAURI__);
console.log("window.__TAURI_IPC__:", window.__TAURI_IPC__);

// Если есть __TAURI_INTERNALS__, проверяем его структуру
if (window.__TAURI_INTERNALS__) {
  const internals = window.__TAURI_INTERNALS__;
  console.log("__TAURI_INTERNALS__ keys:", Object.keys(internals));

  if (internals.window) {
    console.log("window API methods:", Object.keys(internals.window));
  }

  if (internals.event) {
    console.log("event API methods:", Object.keys(internals.event));
  }

  if (internals.app) {
    console.log("app API methods:", Object.keys(internals.app));
  }
}

// Функции для тестирования
window.testTauriMinimize = async function () {
  console.log("Testing minimize...");
  try {
    if (window.__TAURI_INTERNALS__?.window?.minimize) {
      await window.__TAURI_INTERNALS__.window.minimize();
      console.log("Minimize successful");
    } else {
      console.log("Minimize method not found");
    }
  } catch (error) {
    console.error("Minimize error:", error);
  }
};

window.testTauriClose = async function () {
  console.log("Testing close...");
  try {
    if (window.__TAURI_INTERNALS__?.window?.close) {
      await window.__TAURI_INTERNALS__.window.close();
      console.log("Close successful");
    } else {
      console.log("Close method not found");
    }
  } catch (error) {
    console.error("Close error:", error);
  }
};

window.testTauriEmit = async function (eventName, payload = {}) {
  console.log(`Testing emit event: ${eventName}`, payload);
  try {
    if (window.__TAURI_INTERNALS__?.event?.emit) {
      await window.__TAURI_INTERNALS__.event.emit(eventName, payload);
      console.log("Emit successful");
    } else {
      console.log("Emit method not found");
    }
  } catch (error) {
    console.error("Emit error:", error);
  }
};

console.log("Test functions available:");
console.log("- testTauriMinimize()");
console.log("- testTauriClose()");
console.log('- testTauriEmit("event-name", {data: "test"})');
