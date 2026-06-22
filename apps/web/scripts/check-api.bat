@echo off
where curl >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: curl not found. Please install curl.
    exit /b 1
)
curl -s -f https://api.delez-repo.ru/v1/health > nul
if %errorlevel% neq 0 (
    echo ERROR: API health check failed
    exit /b 1
)
echo API health OK
