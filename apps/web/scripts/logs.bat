@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo  Showing Docker logs (tail -f)
echo ========================================
docker compose logs -f
