@echo off
echo === Checking app logs for errors ===
findstr /i "panic fatal error 500" logs.txt > ..\reports\security\logs_security.txt 2>nul
if %errorlevel%==1 echo No critical errors found >> ..\reports\security\logs_security.txt
type ..\reports\security\logs_security.txt
