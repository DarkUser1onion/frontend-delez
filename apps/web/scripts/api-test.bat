@echo off
chcp 65001 >nul
cd /d "%~dp0.."

echo === Delёz API Tests ===
echo 1. Health check (expect 200)
curl -s -o nul -w "HTTP %%{http_code}\n" https://api.delez-repo.ru/v1/health
echo.

echo 2. Failed login (expect 401)
curl -s -o nul -w "HTTP %%{http_code}\n" -X POST https://api.delez-repo.ru/auth/sign-in/email -H "Content-Type: application/json" -d "{\"email\":\"none@example.com\",\"password\":\"wrong\"}"
echo.

echo 3. Non-existent entry (expect 404)
curl -s -o nul -w "HTTP %%{http_code}\n" https://api.delez-repo.ru/v1/entries/999999
echo.

echo 4. Health via /api (legacy, expect 200)
curl -s -o nul -w "HTTP %%{http_code}\n" https://api.delez-repo.ru/api/health
echo.

echo API tests completed.
