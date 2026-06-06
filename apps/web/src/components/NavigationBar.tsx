import React from "react";
import {
  Minus,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Home,
  Maximize2,
  Plus,
  Settings,
} from "lucide-react";
import { useTitleBarNavigation } from "@/hooks/useTitleBarNavigation";
import { minimizeWindow, toggleMaximizeWindow, emitEvent } from "@/utils/tauri";
import { useNavigate } from "react-router-dom";
import { isTauri } from "@/utils/tauri";
import { invoke } from "@tauri-apps/api/core";

export function NavigationBar() {
  const { canGoBack, canGoForward, goBack, goForward, goHome, refresh } =
    useTitleBarNavigation();
  const navigate = useNavigate();

  const handleMinimize = () => minimizeWindow();
  const handleToggleMaximize = () => toggleMaximizeWindow();
  const handleClose = () => invoke("hide_window").catch(console.error);
  const handleNewEntry = () => {
    emitEvent("new-entry", {});
    navigate("/records");
  };
  const handleOpenSettings = () => {
    emitEvent("open-settings", {});
    navigate("/profile");
  };

  if (!isTauri()) return null;

  return (
    <div
      data-tauri-drag-region
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "30px",
        background: "transparent",
        paddingLeft: "6px",
        paddingRight: "6px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <IconButton onClick={goBack} disabled={!canGoBack} title="Назад">
          <ChevronLeft size={15} />
        </IconButton>
        <IconButton onClick={goForward} disabled={!canGoForward} title="Вперёд">
          <ChevronRight size={15} />
        </IconButton>
        <IconButton onClick={refresh} title="Обновить">
          <RotateCcw size={13} />
        </IconButton>
        <IconButton onClick={goHome} title="Главная">
          <Home size={13} />
        </IconButton>
        <div
          style={{
            width: 1,
            height: 16,
            background: "rgba(255,255,255,0.15)",
            margin: "0 4px",
          }}
        />
        <IconButton onClick={handleNewEntry} title="Новая запись (Ctrl+N)">
          <Plus size={13} />
        </IconButton>
        <IconButton onClick={handleOpenSettings} title="Настройки (Ctrl+,)">
          <Settings size={13} />
        </IconButton>
        <div
          style={{
            width: 1,
            height: 16,
            background: "rgba(255,255,255,0.15)",
            margin: "0 4px",
          }}
        />
        <IconButton onClick={handleMinimize} title="Свернуть" isWindowControl>
          <Minus size={12} />
        </IconButton>
        <IconButton
          onClick={handleToggleMaximize}
          title="Развернуть/Восстановить"
          isWindowControl
        >
          <Maximize2 size={12} />
        </IconButton>
        <IconButton
          onClick={handleClose}
          title="Закрыть"
          isWindowControl
          isClose
        >
          <X size={12} />
        </IconButton>
      </div>
    </div>
  );
}

function IconButton({
  onClick,
  disabled,
  title,
  children,
  isWindowControl,
  isClose,
}: {
  onClick?: () => void;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
  isWindowControl?: boolean;
  isClose?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: isWindowControl ? "38px" : "28px",
        height: "100%",
        border: "none",
        background: "transparent",
        color: isWindowControl ? "#c6d4df" : "#a3b8cc",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.3 : 1,
        transition: "all 0.12s",
        outline: "none",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = isClose
            ? "#e81123"
            : "rgba(90,120,170,0.4)";
          e.currentTarget.style.color = "#fff";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = isWindowControl ? "#c6d4df" : "#a3b8cc";
      }}
    >
      {children}
    </button>
  );
}
