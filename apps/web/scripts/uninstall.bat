@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

set INSTALL_DIR=%ProgramFiles%\Delez
set DESKTOP_DIR=%USERPROFILE%\Desktop
set START_MENU_DIR=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Delez

echo ========================================
echo  Удаление Delёz
echo ========================================

if exist "%INSTALL_DIR%" (
    echo Удаление %INSTALL_DIR%...
    rmdir /S /Q "%INSTALL_DIR%"
) else (
    echo Папка установки не найдена.
)

if exist "%DESKTOP_DIR%\Delёz.lnk" del /Q "%DESKTOP_DIR%\Delёz.lnk"
if exist "%START_MENU_DIR%\Delёz.lnk" del /Q "%START_MENU_DIR%\Delёz.lnk"
rmdir "%START_MENU_DIR%" 2>nul


echo.
echo Удаление завершено.
pause
