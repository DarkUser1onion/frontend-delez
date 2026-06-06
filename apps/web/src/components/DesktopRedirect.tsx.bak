import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

/**
 * Компонент для редиректа в Desktop-приложении.
 * Если запущено в Tauri, перенаправляет на главную (/navigation).
 */
export function DesktopRedirect() {
  const [isTauri, setIsTauri] = useState<boolean | null>(null);

  useEffect(() => {
    // Проверяем наличие Tauri API через window.__TAURI__
    const hasTauri = typeof window !== 'undefined' &&
      (window as any).__TAURI__ !== undefined;
    console.log("[DesktopRedirect] Tauri detected:", hasTauri);
    setIsTauri(hasTauri);
  }, []);

  // Пока проверяем Tauri, показываем загрузку
  if (isTauri === null) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#000019"
      }}>
        <div style={{ color: "rgba(255,255,255,0.7)" }}>Загрузка...</div>
      </div>
    );
  }

  // Если Tauri — редирект на главную
  if (isTauri) {
    return <Navigate to="/navigation" replace />;
  }

  // Иначе — показываем лендинг
  return null;
}

export default DesktopRedirect;
