import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function useTitleBarNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [history, setHistory] = useState<string[]>([location.pathname]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Добавляем новый путь в историю только если это не "назад" / "вперёд"
  useEffect(() => {
    const currentPath = location.pathname;
    setHistory((prev) => {
      const last = prev[prev.length - 1];
      if (last === currentPath) return prev; // путь не изменился
      // Если новый путь совпадает со следующим в стеке — это "вперёд"
      if (prev[currentIndex + 1] === currentPath) {
        setCurrentIndex((i) => i + 1);
        return prev;
      }
      // Иначе — обычный переход, обрезаем будущее
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push(currentPath);
      setCurrentIndex(newHistory.length - 1);
      return newHistory;
    });
  }, [location.pathname]);

  // Слушаем браузерные переходы (popstate) — обновляем индекс
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setHistory((prev) => {
        const idx = prev.indexOf(path);
        if (idx !== -1) setCurrentIndex(idx);
        return prev;
      });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  const goBack = useCallback(() => {
    if (canGoBack) {
      navigate(-1); // браузерный переход, popstate обновит индекс
    }
  }, [canGoBack, navigate]);

  const goForward = useCallback(() => {
    if (canGoForward) {
      navigate(1);
    }
  }, [canGoForward, navigate]);

  const goHome = useCallback(() => {
    navigate("/navigation");
  }, [navigate]);

  const refresh = useCallback(() => {
    navigate(0);
  }, [navigate]);

  return {
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    goHome,
    refresh,
  };
}
