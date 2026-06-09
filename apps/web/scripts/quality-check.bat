@echo off
chcp 65001 >nul
cd /d "%~dp0.."

echo ========================================
echo Quality Check for Delёz
echo ========================================
call scripts\test.bat
if %errorlevel% neq 0 exit /b %errorlevel%
call scripts\api-test.bat
if %errorlevel% neq 0 exit /b %errorlevel%
call scripts\logs-check.bat
if %errorlevel% neq 0 exit /b %errorlevel%
echo ========================================
echo Quality check completed successfully
echo ========================================
