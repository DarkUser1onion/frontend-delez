@echo off
chcp 65001 >nul
cd /d "%~dp0.."

echo === Delёz Smoke Test ===
echo [1/2] Checking npm install...
call npm install
if %errorlevel% neq 0 (echo FAIL: npm install failed & exit /b %errorlevel%)

echo [2/2] Checking build (Vite)...
call npm run build
if %errorlevel% neq 0 (echo FAIL: build failed & exit /b %errorlevel%)

echo All smoke tests passed.
