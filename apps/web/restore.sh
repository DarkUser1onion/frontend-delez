#!/bin/bash
mkdir -p reports/security

BACKUP_DIR="backups"
TARGET_DIR="$HOME/.config/tech.delez.app"

echo "Available backups:"
ls -1 "$BACKUP_DIR" | grep "config_backup_"

read -p "Enter backup folder name to restore (e.g., config_backup_20260610_025843): " BACKUP_NAME

if [ -z "$BACKUP_NAME" ]; then
    echo "No backup name entered. Abort."
    exit 1
fi

if [ ! -d "$BACKUP_DIR/$BACKUP_NAME" ]; then
    echo "Backup folder $BACKUP_DIR/$BACKUP_NAME not found!"
    exit 1
fi

if [ -d "$TARGET_DIR" ]; then
    rm -rf "$TARGET_DIR"
fi

cp -r "$BACKUP_DIR/$BACKUP_NAME" "$TARGET_DIR"

echo "Restore completed. Configuration restored to $TARGET_DIR"
