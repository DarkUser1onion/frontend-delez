#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${1:-.}"
OUTPUT_NAME="${OUTPUT_NAME:-Delez}"
APPIMAGE_NAME="${OUTPUT_NAME}.AppImage"
BINARY_NAME="delez"

cd "$PROJECT_DIR"

if [ ! -f "src-tauri/target/release/$BINARY_NAME" ]; then
    echo "Собираем бинарник..."
    npm run tauri build -- --no-bundle
fi

WORKDIR="DelezApp"
rm -rf "$WORKDIR"
mkdir -p "$WORKDIR/usr/bin"
mkdir -p "$WORKDIR/usr/share/applications"
mkdir -p "$WORKDIR/usr/share/icons/hicolor/256x256/apps"
mkdir -p "$WORKDIR/usr/share/ca-certificates"
mkdir -p "$WORKDIR/usr/lib/delez"
mkdir -p "$WORKDIR/opt/delez"

echo "Копирование проекта в AppDir..."
rsync -av --exclude='node_modules' --exclude='.git' --exclude='target' --exclude='DelezApp' --exclude='*.AppImage' . "$WORKDIR/opt/delez/"

cp "src-tauri/target/release/$BINARY_NAME" "$WORKDIR/usr/bin/"

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

if [ -f "src-tauri/icons/128x128.png" ]; then
    cp "src-tauri/icons/128x128.png" "$WORKDIR/delez.png"
    cp "src-tauri/icons/128x128.png" "$WORKDIR/usr/share/icons/hicolor/256x256/apps/delez.png"
else
    touch "$WORKDIR/delez.png"
fi

CERT_FILE="$WORKDIR/usr/share/ca-certificates/ca-certificates.crt"
if [ -f /etc/ssl/certs/ca-certificates.crt ]; then
    cp /etc/ssl/certs/ca-certificates.crt "$CERT_FILE"
elif [ -f /etc/ssl/cert.pem ]; then
    cp /etc/ssl/cert.pem "$CERT_FILE"
else
    echo "Системные сертификаты не найдены, HTTPS может не работать."
fi

cat > "$WORKDIR/AppRun" << 'APPRUNEOF'
#!/bin/bash
HERE="$(dirname "$(readlink -f "${0}")")"
export PATH="$HERE/usr/bin:$PATH"
export SSL_CERT_FILE="$HERE/usr/share/ca-certificates/ca-certificates.crt"
export WHISPER_CLI_PATH="$HERE/usr/bin/whisper-cli"
export WHISPER_MODEL_PATH="$HOME/.cache/delez/whisper/ggml-small.bin"

PROJECT_DIR="$HOME/.cache/delez/vite-project"

if [ ! -d "$PROJECT_DIR" ]; then
    echo "Подготовка проекта..."
    cp -r "$HERE/opt/delez" "$PROJECT_DIR"
fi

cd "$PROJECT_DIR"

if [ ! -d "node_modules" ]; then
    echo "Установка зависимостей..."
    npm install
fi

echo "Запуск Vite..."
npx vite --port 3000 --host 127.0.0.1 &
VITE_PID=$!

echo "Ожидание Vite..."
until curl -s http://127.0.0.1:3000 > /dev/null 2>&1; do
    sleep 0.5
done

echo "Запуск Delёz..."
export TAURI_DEV_URL=http://127.0.0.1:3000
"$HERE/usr/bin/delez" --open http://127.0.0.1:3000

kill $VITE_PID 2>/dev/null
wait $VITE_PID 2>/dev/null
APPRUNEOF
chmod +x "$WORKDIR/AppRun"

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
