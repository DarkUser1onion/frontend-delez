import { useState, useEffect } from "react";
import { Cpu, HardDrive, Wifi, Battery, Clock } from "lucide-react";

interface SystemInfo {
  platform: string;
  arch: string;
  version: string;
  memory: {
    total: number;
    used: number;
    free: number;
  } | null;
  battery: {
    level: number;
    charging: boolean;
  } | null;
  network: {
    online: boolean;
    type: string;
  };
}

/**
 * Компонент для отображения статус-бара с системной информацией (как в Steam).
 * Показывает информацию о системе, сети, батарее и т.д.
 */
export function DesktopStatusBar() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    platform: "Unknown",
    arch: "Unknown",
    version: "Unknown",
    memory: null,
    battery: null,
    network: {
      online: navigator.onLine,
      type: "Unknown",
    },
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTauri, setIsTauri] = useState(false);

  useEffect(() => {
    // Проверяем наличие Tauri
    const hasTauri =
      typeof window !== "undefined" && (window as any).__TAURI__ !== undefined;
    setIsTauri(hasTauri);

    // Обновляем время каждую секунду
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Получаем информацию о системе
    const fetchSystemInfo = async () => {
      if (hasTauri) {
        try {
          const tauriOs = (window as any).__TAURI__.os;
          const platform = await tauriOs.platform();
          const arch = await tauriOs.arch();
          const version = await tauriOs.version();

          setSystemInfo((prev) => ({
            ...prev,
            platform,
            arch,
            version,
          }));
        } catch (error) {
          console.error("Failed to get system info:", error);
        }
      } else {
        // Браузерная версия
        setSystemInfo((prev) => ({
          ...prev,
          platform: navigator.platform,
          version: navigator.userAgent,
        }));
      }

      // Получаем информацию о памяти (только в Tauri)
      if (hasTauri) {
        try {
          const tauriOs = (window as any).__TAURI__.os;
          const memory = await tauriOs.memoryInfo();
          setSystemInfo((prev) => ({
            ...prev,
            memory: {
              total: memory.total,
              used: memory.used,
              free: memory.free,
            },
          }));
        } catch (error) {
          console.error("Failed to get memory info:", error);
        }
      }

      // Получаем информацию о батарее
      if ("getBattery" in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          setSystemInfo((prev) => ({
            ...prev,
            battery: {
              level: battery.level * 100,
              charging: battery.charging,
            },
          }));

          // Слушаем изменения батареи
          battery.addEventListener("levelchange", () => {
            setSystemInfo((prev) => ({
              ...prev,
              battery: {
                level: battery.level * 100,
                charging: battery.charging,
              },
            }));
          });

          battery.addEventListener("chargingchange", () => {
            setSystemInfo((prev) => ({
              ...prev,
              battery: {
                level: battery.level * 100,
                charging: battery.charging,
              },
            }));
          });
        });
      }

      // Получаем информацию о сети
      if ("connection" in navigator) {
        const connection = (navigator as any).connection;
        setSystemInfo((prev) => ({
          ...prev,
          network: {
            online: navigator.onLine,
            type: connection.effectiveType || "Unknown",
          },
        }));

        // Слушаем изменения сети
        window.addEventListener("online", () => {
          setSystemInfo((prev) => ({
            ...prev,
            network: {
              ...prev.network,
              online: true,
            },
          }));
        });

        window.addEventListener("offline", () => {
          setSystemInfo((prev) => ({
            ...prev,
            network: {
              ...prev.network,
              online: false,
            },
          }));
        });
      }
    };

    fetchSystemInfo();

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const formatMemory = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)} GB`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (!isTauri) {
    return null; // Не показываем в браузере
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "28px",
        background: "rgba(23, 26, 33, 0.9)",
        borderTop: "1px solid rgba(66, 78, 99, 0.3)",
        padding: "0 12px",
        fontSize: "11px",
        color: "#8f98a0",
        fontFamily: "'Motiva Sans', 'Segoe UI', sans-serif",
        userSelect: "none",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      {/* Left: System info */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Cpu size={10} />
          <span>
            {systemInfo.platform} {systemInfo.arch}
          </span>
        </div>

        {systemInfo.memory && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <HardDrive size={10} />
            <span>
              RAM: {formatMemory(systemInfo.memory.used)} /{" "}
              {formatMemory(systemInfo.memory.total)}
            </span>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Wifi
            size={10}
            color={systemInfo.network.online ? "#66c0f4" : "#8f98a0"}
          />
          <span>
            {systemInfo.network.online ? systemInfo.network.type : "Offline"}
          </span>
        </div>
      </div>

      {/* Right: Battery and time */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {systemInfo.battery && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Battery
              size={10}
              color={systemInfo.battery.charging ? "#66c0f4" : "#8f98a0"}
              fill={systemInfo.battery.charging ? "#66c0f4" : "transparent"}
            />
            <span>
              {systemInfo.battery.level.toFixed(0)}%
              {systemInfo.battery.charging && " ⚡"}
            </span>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Clock size={10} />
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
}

export default DesktopStatusBar;
