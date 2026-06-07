#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
RELEASE_BINARY="$PROJECT_DIR/src-tauri/target/release/delez"
INSTALL_DIR="/opt/delez"
ICON_SRC="$PROJECT_DIR/src-tauri/icons/128x128.png"
DESKTOP_FILE="/usr/share/applications/delez.desktop"
WHISPER_SRC="$PROJECT_DIR/src-tauri/DelezApp/usr/bin/whisper-cli"

echo "=== Production-установка Delёz ==="

if [ ! -f "$RELEASE_BINARY" ]; then
    echo "Release-бинарник не найден, собираем..."
    npm run tauri build -- --no-bundle
fi

sudo mkdir -p "$INSTALL_DIR"
sudo cp "$RELEASE_BINARY" "$INSTALL_DIR/delez"
sudo chmod +x "$INSTALL_DIR/delez"

if [ -f "$WHISPER_SRC" ]; then
    sudo cp "$WHISPER_SRC" "$INSTALL_DIR/whisper-cli"
    sudo chmod +x "$INSTALL_DIR/whisper-cli"
    echo "whisper-cli скопирован"
fi

if [ -f "$ICON_SRC" ]; then
    sudo mkdir -p /usr/share/icons/hicolor/128x128/apps
    sudo cp "$ICON_SRC" "/usr/share/icons/hicolor/128x128/apps/delez.png"
fi

sudo tee "$INSTALL_DIR/run-delez.sh" > /dev/null << 'EOF'
#!/bin/bash
export WHISPER_CLI_PATH=/opt/delez/whisper-cli
export WHISPER_MODEL_PATH=$HOME/.cache/delez/whisper/ggml-small.bin
exec /opt/delez/delez
EOF
sudo chmod +x "$INSTALL_DIR/run-delez.sh"

sudo tee "$DESKTOP_FILE" > /dev/null << EOF
[Desktop Entry]
Type=Application
Name=Delёz
Comment=AI-дневник саморефлексии
Exec=$INSTALL_DIR/run-delez.sh
Icon=delez
Categories=Utility;
Terminal=false
EOF

MODEL_DIR="$HOME/.cache/delez/whisper"
MODEL_FILE="$MODEL_DIR/ggml-small.bin"
if [ ! -f "$MODEL_FILE" ]; then
    echo "Скачиваем модель whisper..."
    mkdir -p "$MODEL_DIR"
    curl -# -L -o "$MODEL_FILE" "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.bin"
fi

echo ""
echo "Production-установка завершена."
