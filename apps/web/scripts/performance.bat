@echo off
chcp 65001 >nul
cd /d "%~dp0.."

echo === Delёz Performance Check ===
echo Running Lighthouse for web version (https://delez.tech)
where npx >nul 2>nul
if %errorlevel% neq 0 (
    echo npx not found, skipping Lighthouse.
    exit /b 0
)

npx lighthouse https://delez.tech --view --preset=desktop --output=html --output-path=reports/lighthouse_report.html
echo Lighthouse report saved to reports/lighthouse_report.html
