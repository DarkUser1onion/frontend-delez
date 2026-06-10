@echo off
echo === Security check: searching secrets in code ===
git grep -n -i -E "password|secret|token|api_key|jwt|smtp|private_key" -- :!*.log :!*.db :!node_modules :!dist :!target :!*.md > ..\reports\security\secret_scan.txt
echo Results saved to reports\security\secret_scan.txt
type ..\reports\security\secret_scan.txt
