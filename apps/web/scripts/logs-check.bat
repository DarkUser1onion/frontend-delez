@echo off
chcp 65001 >nul
cd /d "%~dp0.."

echo === Delёz Logs Check ===
echo Collecting logs from Docker (if running)...
docker logs api --tail=100 > reports/logs_tail.txt 2>&1
if %errorlevel% neq 0 (
    echo Docker not running or no 'api' container. Trying Tauri logs...
    if exist "%APPDATA%\delez\logs\*.log" (
        type "%APPDATA%\delez\logs\*.log" > reports/logs_tail.txt
    ) else (
        echo No logs found. Creating empty log file.
        echo Logs unavailable > reports/logs_tail.txt
    )
)
echo Logs saved to reports/logs_tail.txt
type reports/logs_tail.txt
