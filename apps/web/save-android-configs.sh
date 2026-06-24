#!/bin/bash

SOURCE_DIR="src-tauri/gen/android"
BACKUP_DIR="android-configs"

mkdir -p "$BACKUP_DIR"

if [ -f "$SOURCE_DIR/app/src/main/AndroidManifest.xml" ]; then
    cp "$SOURCE_DIR/app/src/main/AndroidManifest.xml" "$BACKUP_DIR/AndroidManifest.xml"
    echo "Сохранён AndroidManifest.xml"
else
    echo "AndroidManifest.xml не найден"
fi

# Сохраняем MainActivity.kt
if [ -f "$SOURCE_DIR/app/src/main/java/tech/delez/app/MainActivity.kt" ]; then
    cp "$SOURCE_DIR/app/src/main/java/tech/delez/app/MainActivity.kt" "$BACKUP_DIR/MainActivity.kt"
    echo "Сохранён MainActivity.kt"
else
    echo "MainActivity.kt не найден"
fi

# if [ -f "$SOURCE_DIR/app/src/main/res/values/themes.xml" ]; then
#     cp "$SOURCE_DIR/app/src/main/res/values/themes.xml" "$BACKUP_DIR/themes.xml"
# fi

echo "Все конфиги сохранены в $BACKUP_DIR"
