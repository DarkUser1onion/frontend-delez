#!/bin/bash

SOURCE_DIR="src-tauri/gen/android"
BACKUP_DIR="android-configs"

if [ ! -d "$BACKUP_DIR" ]; then
    echo "❌ Папка $BACKUP_DIR не найдена. Сначала выполни save-android-configs.sh"
    exit 1
fi

if [ -f "$BACKUP_DIR/AndroidManifest.xml" ]; then
    mkdir -p "$SOURCE_DIR/app/src/main/"
    cp "$BACKUP_DIR/AndroidManifest.xml" "$SOURCE_DIR/app/src/main/AndroidManifest.xml"
    echo "Восстановлен AndroidManifest.xml"
else
    echo "AndroidManifest.xml не найден в бэкапе"
fi

if [ -f "$BACKUP_DIR/MainActivity.kt" ]; then
    mkdir -p "$SOURCE_DIR/app/src/main/java/tech/delez/app/"
    cp "$BACKUP_DIR/MainActivity.kt" "$SOURCE_DIR/app/src/main/java/tech/delez/app/MainActivity.kt"
    echo "Восстановлен MainActivity.kt"
else
    echo "MainActivity.kt не найден в бэкапе"
fi

# if [ -f "$BACKUP_DIR/themes.xml" ]; then
#     mkdir -p "$SOURCE_DIR/app/src/main/res/values/"
#     cp "$BACKUP_DIR/themes.xml" "$SOURCE_DIR/app/src/main/res/values/themes.xml"
#     echo "Восстановлен themes.xml"
# fi

echo "Все конфиги восстановлены из $BACKUP_DIR"
