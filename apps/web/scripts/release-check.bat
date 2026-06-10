@echo off
call scripts\check-api.bat
if %errorlevel% neq 0 exit /b %errorlevel%
echo Build would go here (skipped for demo)
