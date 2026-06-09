@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo             Restarting Delёz 
echo ========================================
call docker compose restart
if %errorlevel% neq 0 (
    echo ERROR: Failed to restart! 
    exit /b %errorlevel%
)
