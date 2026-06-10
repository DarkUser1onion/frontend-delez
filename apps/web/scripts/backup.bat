@echo off
set BACKUP_DIR=..\backups
if not exist %BACKUP_DIR% mkdir %BACKUP_DIR%
set TIMESTAMP=%date:~6,4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
xcopy /E /I "%APPDATA%\tech.delez.app" "%BACKUP_DIR%\config_backup_%TIMESTAMP%" > ..\reports\security\backup_restore_result.txt
echo Backup created >> ..\reports\security\backup_restore_result.txt
