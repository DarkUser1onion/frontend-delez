@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo  Installing dependencies
echo ========================================
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed
    exit /b %errorlevel%
)
echo Dependencies installed successfully.
