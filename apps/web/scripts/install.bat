@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

set INSTALL_DIR=%ProgramFiles%\Delez
set BINARY_SRC=src-tauri\target\debug\delez.exe
set ICON_SRC=src-tauri\icons\128x128.png
set ICON_DIR=%ProgramData%\Microsoft\Windows\Start Menu\Programs\Delez
set DESKTOP_DIR=%USERPROFILE%\Desktop
set START_MENU_DIR=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Delez

echo ========================================
echo  Установка Delёz (Windows)
echo ========================================

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js не найден. Установите Node.js 20 LTS и повторите установку.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo Установка зависимостей...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: не удалось установить зависимости.
        pause
        exit /b 1
    )
)

if not exist "%BINARY_SRC%" (
    echo Debug-бинарник не найден. Запуск компиляции проекта...
    call npx tauri build --debug --no-bundle
    if %errorlevel% neq 0 (
        echo ERROR: Сборка не удалась.
        pause
        exit /b 1
    )
)

echo Копирование проекта в %INSTALL_DIR%...
robocopy "%CD%" "%INSTALL_DIR%" /E /XD node_modules .git target /NFL /NDL /NJH /NJS
if %errorlevel% geq 8 (
    echo ERROR: Ошибка копирования.
    pause
    exit /b 1
)

echo Копирование бинарника...
mkdir "%INSTALL_DIR%\src-tauri\target\debug" 2>nul
copy /Y "%BINARY_SRC%" "%INSTALL_DIR%\src-tauri\target\debug\delez.exe" >nul

echo Установка иконки...
mkdir "%ICON_DIR%" 2>nul
copy /Y "%ICON_SRC%" "%ICON_DIR%\delez.png" >nul

cd /d "%INSTALL_DIR%"
echo Установка зависимостей в %INSTALL_DIR%...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: не удалось установить зависимости.
    pause
    exit /b 1
)

(
echo Set WshShell = CreateObject^("WScript.Shell"^)
echo WshShell.CurrentDirectory = "%INSTALL_DIR%"
echo WshShell.Run "cmd /c npm run tauri dev", 0, False
) > "%INSTALL_DIR%\launch.vbs"

powershell -Command ^
    "$WshShell = New-Object -ComObject WScript.Shell; " ^
    "$Shortcut = $WshShell.CreateShortcut('%DESKTOP_DIR%\Delёz.lnk'); " ^
    "$Shortcut.TargetPath = 'wscript.exe'; " ^
    "$Shortcut.Arguments = '\"%INSTALL_DIR%\launch.vbs\"'; " ^
    "$Shortcut.WorkingDirectory = '%INSTALL_DIR%'; " ^
    "$Shortcut.IconLocation = '%ICON_DIR%\delez.png,0'; " ^
    "$Shortcut.Save()"

mkdir "%START_MENU_DIR%" 2>nul
powershell -Command ^
    "$WshShell = New-Object -ComObject WScript.Shell; " ^
    "$Shortcut = $WshShell.CreateShortcut('%START_MENU_DIR%\Delёz.lnk'); " ^
    "$Shortcut.TargetPath = 'wscript.exe'; " ^
    "$Shortcut.Arguments = '\"%INSTALL_DIR%\launch.vbs\"'; " ^
    "$Shortcut.WorkingDirectory = '%INSTALL_DIR%'; " ^
    "$Shortcut.IconLocation = '%ICON_DIR%\delez.png,0'; " ^
    "$Shortcut.Save()"

echo.
echo ========================================
echo  Установка завершена!
echo ========================================
pause
