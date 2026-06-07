@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo  Building Delёz Release for Windows
echo ========================================

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found. Install Node.js 20 LTS.
    exit /b 1
)

if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    if %errorlevel% neq 0 exit /b 1
)

echo Building MSI installer...
call npm run tauri build -- --bundles msi
if %errorlevel% neq 0 (
    echo ERROR: Build failed.
    exit /b 1
)

set RELEASE_DIR=release\windows
mkdir "%RELEASE_DIR%" 2>nul
copy /Y "src-tauri\target\release\bundle\msi\*.msi" "%RELEASE_DIR%\" >nul
copy /Y "demo_readme.txt" "%RELEASE_DIR%\" >nul
copy /Y "demo_accounts.txt" "%RELEASE_DIR%\" >nul

echo.
echo ========================================
echo  Release build complete!
echo ========================================
pause
