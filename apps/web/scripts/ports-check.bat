@echo off
echo === Open ports and services ===
netstat -ano | findstr LISTENING > ..\reports\security\ports_check.txt
docker ps >> ..\reports\security\ports_check.txt 2>nul
type ..\reports\security\ports_check.txt
