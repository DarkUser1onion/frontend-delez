import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "@/components/NavigationBar";
import { useDesktopEvents } from "@/hooks/useDesktopEvents";
import { useDesktopNotifications } from "@/hooks/useDesktopNotifications";
import { isTauri, listenEvent } from "@/utils/tauri";
import { invoke } from "@tauri-apps/api/core";

interface DesktopAppProps {
  children: React.ReactNode;
}

export function DesktopApp({ children }: DesktopAppProps) {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(false);
  const { showNewEntryNotification } = useDesktopNotifications();
  const notificationShown = useRef(false);

  useEffect(() => {
    const checkTauri = () => {
      const tauriDetected = isTauri();
      setIsDesktop(tauriDetected);
      if (tauriDetected && !notificationShown.current) {
        notificationShown.current = true;
        setTimeout(() => showNewEntryNotification(), 2000);
      }
    };
    checkTauri();
    const timeoutId = setTimeout(checkTauri, 1000);
    return () => clearTimeout(timeoutId);
  }, [showNewEntryNotification]);

  useDesktopEvents();

  useEffect(() => {
    if (!isDesktop) return;
    let unlistenNewEntry: (() => void) | undefined;
    let unlistenOpenSettings: (() => void) | undefined;

    listenEvent("new-entry", () => navigate("/records")).then((fn) => {
      unlistenNewEntry = fn;
    });
    listenEvent("open-settings", () => navigate("/profile")).then((fn) => {
      unlistenOpenSettings = fn;
    });

    return () => {
      if (unlistenNewEntry) unlistenNewEntry();
      if (unlistenOpenSettings) unlistenOpenSettings();
    };
  }, [isDesktop, navigate]);

  // Горячие клавиши (работают на любой раскладке)
  useEffect(() => {
    if (!isDesktop) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'KeyN') {
        e.preventDefault();
        navigate('/records');
      }
      if (e.ctrlKey && e.code === 'Comma') {
        e.preventDefault();
        navigate('/profile');
      }
      if (e.ctrlKey && e.code === 'KeyQ') {
        e.preventDefault();
        invoke('hide_window').catch(console.error);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDesktop, navigate]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#000019" }}>
      {isDesktop && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000 }}>
          <NavigationBar />
        </div>
      )}
      <div style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}>
        {children}
      </div>
    </div>
  );
}

export default DesktopApp;
