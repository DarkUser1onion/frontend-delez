@echo off
echo Available backups:
dir ..\backups /b
set /p BACKUP_NAME="Enter backup folder name: "
if exist "%APPDATA%\tech.delez.app" rmdir /S /Q "%APPDATA%\tech.delez.app"
xcopy /E /I "..\backups\%BACKUP_NAME%" "%APPDATA%\tech.delez.app" >> ..\reports\security\backup_restore_result.txt
echo Restore completed. Restart the app.
