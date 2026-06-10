@echo off
echo === Dependency check (npm audit) ===
npm audit --json > ..\reports\security\npm_audit.json
npm outdated --json > ..\reports\security\npm_outdated.json
echo JSON reports saved.
