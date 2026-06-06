// Скрипт для тестирования Tauri API в консоли браузера
// Откройте консоль (F12) и выполните эти команды

console.log('=== Tauri API Test Commands ===');

// 1. Проверить наличие Tauri объектов
console.log('1. Проверка объектов Tauri:');
console.log('   window.__TAURI_INTERNALS__:', window.__TAURI_INTERNALS__ ? '✓ Найден' : '✗ Не найден');
console.log('   window.__TAURI__:', window.__TAURI__ ? '✓ Найден' : '✗ Не найден');
console.log('   window.__TAURI_IPC__:', window.__TAURI_IPC__ ? '✓ Найден' : '✗ Не найден');

// 2. Если есть __TAURI_INTERNALS__, проверить его структуру
if (window.__TAURI_INTERNALS__) {
  const internals = window.__TAURI_INTERNALS__;
  console.log('2. Структура __TAURI_INTERNALS__:');
  console.log('   Ключи:', Object.keys(internals));
  
  if (internals.window) {
    console.log('   window методы:', Object.keys(internals.window));
  }
  
  if (internals.event) {
    console.log('   event методы:', Object.keys(internals.event));
  }
  
  if (internals.app) {
    console.log('   app методы:', Object.keys(internals.app));
  }
}

// 3. Функции для тестирования
window.testTauriMinimize = async function() {
  console.log('Тестирование minimize...');
  try {
    if (window.__TAURI_INTERNALS__?.window?.minimize) {
      await window.__TAURI_INTERNALS__.window.minimize();
      console.log('✓ Успешно');
    } else {
      console.log('✗ Метод minimize не найден');
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

window.testTauriClose = async function() {
  console.log('Тестирование close...');
  try {
    if (window.__TAURI_INTERNALS__?.window?.close) {
      await window.__TAURI_INTERNALS__.window.close();
      console.log('✓ Команда отправлена');
    } else {
      console.log('✗ Метод close не найден');
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

window.testTauriEmit = async function(eventName, payload = {}) {
  console.log(`Тестирование emit: ${eventName}`, payload);
  try {
    if (window.__TAURI_INTERNALS__?.event?.emit) {
      await window.__TAURI_INTERNALS__.event.emit(eventName, payload);
      console.log(`✓ Событие "${eventName}" отправлено`);
    } else {
      console.log('✗ Метод emit не найден');
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

window.testTauriAll = async function() {
  console.log('=== Полное тестирование Tauri API ===');
  await window.testTauriMinimize();
  await window.testTauriEmit('test-event', { timestamp: Date.now() });
  await window.testTauriEmit('new-entry', {});
  await window.testTauriEmit('open-settings', {});
};

// 4. Вывести доступные команды
console.log('3. Доступные команды тестирования:');
console.log('   - testTauriMinimize() - свернуть окно');
console.log('   - testTauriClose() - закрыть окно');
console.log('   - testTauriEmit("event-name", {data: "test"}) - отправить событие');
console.log('   - testTauriAll() - выполнить все тесты');

console.log('=== Конец инструкций ===');