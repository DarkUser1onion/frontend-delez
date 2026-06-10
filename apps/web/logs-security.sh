#!/bin/bash
echo "=== Checking app logs for errors ==="
grep -i "panic\|fatal\|error\|500" logs.txt > reports/security/logs_security.txt 2>/dev/null || echo "No critical errors found" > reports/security/logs_security.txt
cat reports/security/logs_security.txt
