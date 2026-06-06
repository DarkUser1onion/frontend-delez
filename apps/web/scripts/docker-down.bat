@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo  Stopping Docker containers
echo ========================================
docker compose down
