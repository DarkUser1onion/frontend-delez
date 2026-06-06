@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo  Available commands
echo ========================================
echo.
echo   setup              Install dependencies
echo   run                Start Delёz in dev mode
echo   check              Run linter and format check
echo   format             Format code
echo   docker-up          Start Docker containers
echo   docker-down        Stop Docker containers
echo   logs               Show Docker logs
echo   help               Show this help
echo.
echo Usage: scripts\имя_команды.bat
echo Example: scripts\setup.bat
