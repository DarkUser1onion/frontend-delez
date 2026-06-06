@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo  Starting Docker containers
echo ========================================
docker compose up --build
