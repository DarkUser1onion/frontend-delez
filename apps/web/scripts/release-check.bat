@echo off
call scripts\check-api.bat || exit /b
echo Build check...
npm run build --if-present
