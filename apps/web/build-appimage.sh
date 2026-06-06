#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${1:-.}"
OUTPUT_NAME="${OUTPUT_NAME:-Delez}"
APPIMAGE_NAME="${OUTPUT_NAME}.AppImage"
BINARY_NAME="delez"

cd "$PROJECT_DIR"

# 1. Сборка бинарника
if [ ! -f "src-tauri/target/release/$BINARY_NAME" ]; then
    echo "Собираем бинарник..."
    npm run tauri build -- --no-bundle
fi

# 2. Создаём структуру AppDir
WORKDIR="DelezApp"
rm -rf "$WORKDIR"
mkdir -p "$WORKDIR/usr/bin"
mkdir -p "$WORKDIR/usr/share/applications"
mkdir -p "$WORKDIR/usr/share/icons/hicolor/256x256/apps"
mkdir -p "$WORKDIR/usr/share/ca-certificates"
mkdir -p "$WORKDIR/usr/lib/delez"

cp "src-tauri/target/release/$BINARY_NAME" "$WORKDIR/usr/bin/"

# 3. Копируем whisper-cli (должен лежать в src-tauri/DelezApp/usr/bin/whisper-cli)
if [ -f "src-tauri/DelezApp/usr/bin/whisper-cli" ]; then
    cp "src-tauri/DelezApp/usr/bin/whisper-cli" "$WORKDIR/usr/bin/whisper-cli"
    chmod +x "$WORKDIR/usr/bin/whisper-cli"
    echo "whisper-cli встроен в AppImage"
else
    echo "whisper-cli не найден – голосовой ввод будет недоступен."
fi

# 4. Копируем скрипт загрузки модели
if [ -f "src-tauri/whisper-runtime/setup-model.sh" ]; then
    cp src-tauri/whisper-runtime/setup-model.sh "$WORKDIR/usr/lib/delez/setup-model.sh"
    chmod +x "$WORKDIR/usr/lib/delez/setup-model.sh"
else
    echo "setup-model.sh не найден – модель whisper не будет загружена автоматически."
fi

# 5. .desktop
cat > "$WORKDIR/usr/share/applications/delez.desktop" << 'EOF'
[Desktop Entry]
Type=Application
Name=Delёz
Comment=AI-дневник саморефлексии
Exec=delez
Icon=delez
Categories=Utility;
Terminal=false
EOF
cp "$WORKDIR/usr/share/applications/delez.desktop" "$WORKDIR/"

# 6. Иконка
if [ -f "src-tauri/icons/128x128.png" ]; then
    cp "src-tauri/icons/128x128.png" "$WORKDIR/delez.png"
    cp "src-tauri/icons/128x128.png" "$WORKDIR/usr/share/icons/hicolor/256x256/apps/delez.png"
else
    touch "$WORKDIR/delez.png"
fi

# 7. SSL-сертификаты (решаем проблему Load failed)
CERT_FILE="$WORKDIR/usr/share/ca-certificates/ca-certificates.crt"
if [ -f /etc/ssl/certs/ca-certificates.crt ]; then
    cp /etc/ssl/certs/ca-certificates.crt "$CERT_FILE"
elif [ -f /etc/ssl/cert.pem ]; then
    cp /etc/ssl/cert.pem "$CERT_FILE"
else
    echo "Системные сертификаты не найдены, скачиваем..."
    curl -# -L -o "$CERT_FILE" "https://curl.se/ca/cacert.pem"
fi

if [ ! -s "$CERT_FILE" ]; then
    echo "Файл сертификатов пуст!"
    exit 1
fi

# 8. AppRun (с отключением проверки SSL и диагностикой)
cat > "$WORKDIR/AppRun" << 'APPRUNEOF'
#!/bin/bash
HERE="$(dirname "$(readlink -f "${0}")")"
export PATH="$HERE/usr/bin:$PATH"
export SSL_CERT_FILE="$HERE/usr/share/ca-certificates/ca-certificates.crt"

# Логирование в файл
exec > /tmp/delez.log 2>&1
echo "=== Delez AppImage started at $(date) ==="

# Загружаем модель whisper при необходимости
if [ -f "$HERE/usr/lib/delez/setup-model.sh" ]; then
    /bin/bash "$HERE/usr/lib/delez/setup-model.sh"
fi

export WHISPER_CLI_PATH="$HERE/usr/bin/whisper-cli"
export WHISPER_MODEL_PATH="$HOME/.cache/delez/whisper/ggml-medium.bin"

# Отключаем строгую проверку SSL (чтобы авторизация работала)
export WEBKIT_IGNORE_SSL_ERRORS=1
export NODE_TLS_REJECT_UNAUTHORIZED=0

echo "Starting delez..."
exec "$HERE/usr/bin/delez"
APPRUNEOF
chmod +x "$WORKDIR/AppRun"

# 9. Упаковка AppImage (без FUSE)
APPIMAGETOOL_URL="https://github.com/AppImage/appimagetool/releases/download/continuous/appimagetool-x86_64.AppImage"
APPIMAGETOOL_DIR="/tmp/appimagetool_extracted"

if [ ! -f "$APPIMAGETOOL_DIR/AppRun" ]; then
    echo "Скачиваем и распаковываем appimagetool..."
    mkdir -p "$APPIMAGETOOL_DIR"
    wget -q -O "$APPIMAGETOOL_DIR/appimagetool" "$APPIMAGETOOL_URL"
    chmod +x "$APPIMAGETOOL_DIR/appimagetool"
    cd "$APPIMAGETOOL_DIR"
    ./appimagetool --appimage-extract >/dev/null 2>&1
    cd -
fi

echo "Упаковываем $APPIMAGE_NAME..."
"$APPIMAGETOOL_DIR/squashfs-root/AppRun" "$WORKDIR" "$APPIMAGE_NAME"

rm -rf "$WORKDIR"
echo "Готово: $APPIMAGE_NAME"
