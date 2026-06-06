@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo  Starting Delёz in development mode
echo ========================================
call npm run tauri:dev
if %errorlevel% neq 0 (
    echo ERROR: Failed to start Tauri dev server
    exit /b %errorlevel%
)
