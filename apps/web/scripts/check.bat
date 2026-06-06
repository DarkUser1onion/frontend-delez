@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo  Running linter (ESLint)
echo ========================================
call npm run lint
echo.
echo ========================================
echo  Running Prettier check
echo ========================================
call npm run format:check
echo.
echo If lint or format check fails, run 'scripts\format.bat' to auto-fix.
