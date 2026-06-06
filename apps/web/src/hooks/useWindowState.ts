import { useState, useEffect, useCallback } from "react";

interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
  isMaximized: boolean;
}

/**
 * Хук для сохранения и восстановления состояния окна.
 * Сохраняет позицию, размер и состояние (развернуто/не развернуто) окна.
 */
export function useWindowState() {
  const [windowState, setWindowState] = useState<WindowState>({
    x: 0,
    y: 0,
    width: 1280,
    height: 800,
    isMaximized: false
  });

  const [isTauri, setIsTauri] = useState(false);

  useEffect(() => {
    // Проверяем наличие Tauri
    const hasTauri = typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined;
    setIsTauri(hasTauri);

    if (!hasTauri) {
      return;
    }

    // Загружаем сохраненное состояние из localStorage
    const savedState = localStorage.getItem('delez_window_state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setWindowState(parsedState);
        
        // Восстанавливаем позицию и размер окна
        const tauriWindow = (window as any).__TAURI__.window;
        
        // Если окно было развернуто, развернем его
        if (parsedState.isMaximized) {
          tauriWindow.maximize().catch(console.error);
        } else {
          // Устанавливаем позицию и размер
          tauriWindow.setPosition(parsedState.x, parsedState.y).catch(console.error);
          tauriWindow.setSize(parsedState.width, parsedState.height).catch(console.error);
        }
      } catch (e) {
        console.error("Failed to parse saved window state:", e);
      }
    }

    // Слушаем изменения размера и позиции окна
    const tauriWindow = (window as any).__TAURI__.window;
    
    const saveWindowState = async () => {
      try {
        const position = await tauriWindow.innerPosition();
        const size = await tauriWindow.innerSize();
        const isMaximized = await tauriWindow.isMaximized();
        
        const newState: WindowState = {
          x: position.x,
          y: position.y,
          width: size.width,
          height: size.height,
          isMaximized
        };
        
        setWindowState(newState);
        localStorage.setItem('delez_window_state', JSON.stringify(newState));
      } catch (e) {
        console.error("Failed to save window state:", e);
      }
    };

    // Сохраняем состояние при изменении размера окна
    const resizeUnlisten = tauriWindow.onResized(saveWindowState);
    const moveUnlisten = tauriWindow.onMoved(saveWindowState);

    // Также сохраняем при разворачивании/сворачивании
    const maximizeUnlisten = tauriWindow.onMaximized(() => {
      saveWindowState();
    });
    
    const unmaximizeUnlisten = tauriWindow.onUnmaximized(() => {
      saveWindowState();
    });

    // Сохраняем состояние при закрытии окна
    window.addEventListener('beforeunload', saveWindowState);

    return () => {
      if (resizeUnlisten) resizeUnlisten();
      if (moveUnlisten) moveUnlisten();
      if (maximizeUnlisten) maximizeUnlisten();
      if (unmaximizeUnlisten) unmaximizeUnlisten();
      window.removeEventListener('beforeunload', saveWindowState);
    };
  }, []);

  const saveState = useCallback((state: Partial<WindowState>) => {
    const newState = { ...windowState, ...state };
    setWindowState(newState);
    localStorage.setItem('delez_window_state', JSON.stringify(newState));
  }, [windowState]);

  return {
    windowState,
    saveState,
    isTauri
  };
}

export default useWindowState;