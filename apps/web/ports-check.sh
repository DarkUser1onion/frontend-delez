#!/bin/bash
echo "=== Open ports and services ==="
netstat -tulpn | grep LISTEN > reports/security/ports_check.txt
docker ps >> reports/security/ports_check.txt 2>/dev/null
cat reports/security/ports_check.txt
