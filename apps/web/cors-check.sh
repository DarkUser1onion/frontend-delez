#!/bin/bash
curl -s -I https://api.delez-repo.ru/v1/health | grep -i "access-control-allow-origin" > reports/security/cors_check.txt
