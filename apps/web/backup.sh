#!/bin/bash
BACKUP_DIR="backups"
mkdir -p "$BACKUP_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
cp -r ~/.config/tech.delez.app "$BACKUP_DIR/config_backup_$TIMESTAMP"
echo "Backup saved to $BACKUP_DIR/config_backup_$TIMESTAMP" > reports/security/backup_restore_result.txt
