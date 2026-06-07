@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

set INSTALL_DIR=%ProgramFiles%\Delez
set BINARY_SRC=src-tauri\target\debug\delez.exe
set ICON_SRC=src-tauri\icons\128x128.png
set DESKTOP_DIR=%USERPROFILE%\Desktop
set START_MENU_DIR=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Delez

echo ========================================
echo  Установка Delёz (Windows)
echo ========================================

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js не найден. Установите Node.js 20 LTS и повторите установку.
    exit /b 1
)

if not exist "node_modules\" (
    echo Устанавливаем зависимости...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: не удалось установить зависимости.
        exit /b 1
    )
)

if not exist "%BINARY_SRC%" (
    echo ERROR: Debug-бинарник не найден. Сначала запустите "run.bat" для его сборки.
    exit /b 1
)

echo Копирование проекта в %INSTALL_DIR%...
xcopy /E /I /Q "%CD%" "%INSTALL_DIR%"

powershell -Command ^
    "$WshShell = New-Object -ComObject WScript.Shell; " ^
    "$Shortcut = $WshShell.CreateShortcut('%DESKTOP_DIR%\Delёz.lnk'); " ^
    "$Shortcut.TargetPath = 'cmd.exe'; " ^
    "$Shortcut.Arguments = '/c cd /d \"%INSTALL_DIR%\" && start \"\" /B npx vite --port 3000 --host 127.0.0.1 && timeout /t 4 /nobreak > nul && start \"\" \"%INSTALL_DIR%\src-tauri\target\debug\delez.exe\"'; " ^
    "$Shortcut.WorkingDirectory = '%INSTALL_DIR%'; " ^
    "$Shortcut.IconLocation = '%INSTALL_DIR%\src-tauri\icons\128x128.png'; " ^
    "$Shortcut.Save()"

mkdir "%START_MENU_DIR%" 2>nul
powershell -Command ^
    "$WshShell = New-Object -ComObject WScript.Shell; " ^
    "$Shortcut = $WshShell.CreateShortcut('%START_MENU_DIR%\Delёz.lnk'); " ^
    "$Shortcut.TargetPath = 'cmd.exe'; " ^
    "$Shortcut.Arguments = '/c cd /d \"%INSTALL_DIR%\" && start \"\" /B npx vite --port 3000 --host 127.0.0.1 && timeout /t 4 /nobreak > nul && start \"\" \"%INSTALL_DIR%\src-tauri\target\debug\delez.exe\"'; " ^
    "$Shortcut.WorkingDirectory = '%INSTALL_DIR%'; " ^
    "$Shortcut.IconLocation = '%INSTALL_DIR%\src-tauri\icons\128x128.png'; " ^
    "$Shortcut.Save()"

echo.
echo ========================================
echo  Установка завершена!
echo  Ярлык создан на рабочем столе и в меню Пуск.
echo ========================================
pause
