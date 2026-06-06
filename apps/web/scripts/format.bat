@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo  Formatting code with Prettier
echo ========================================
call npm run format
echo Done.
