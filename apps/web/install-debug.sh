#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
INSTALL_DIR="/opt/delez"
DESKTOP_FILE="/usr/share/applications/delez.desktop"
ICON_SRC="$PROJECT_DIR/src-tauri/icons/128x128.png"
WHISPER_SRC="$PROJECT_DIR/src-tauri/DelezApp/usr/bin/whisper-cli"

echo "=== Автономная сборка и установка Delёz (Linux mode)==="

if [ ! -d "node_modules" ]; then
    echo "Установка зависимостей..."
    npm install
fi

if [ ! -f "src-tauri/target/debug/delez" ]; then
    echo "Сборка debug-бинарника..."
    npx tauri build --debug --no-bundle
fi

sudo rm -rf "$INSTALL_DIR"
sudo mkdir -p "$INSTALL_DIR"
echo "Копирование проекта в $INSTALL_DIR..."
rsync -av --exclude='node_modules' --exclude='.git' --exclude='target' "$PROJECT_DIR/" "$INSTALL_DIR/"
sudo chown -R "$USER:$USER" "$INSTALL_DIR"

mkdir -p "$INSTALL_DIR/src-tauri/target/debug"
cp "src-tauri/target/debug/delez" "$INSTALL_DIR/src-tauri/target/debug/delez"

cd "$INSTALL_DIR"
echo "Установка зависимостей в /opt/delez..."
npm install

if [ -f "$WHISPER_SRC" ]; then
    cp "$WHISPER_SRC" "$INSTALL_DIR/whisper-cli"
    chmod +x "$INSTALL_DIR/whisper-cli"
    echo "whisper-cli скопирован"
fi

if [ -f "$ICON_SRC" ]; then
    sudo mkdir -p /usr/share/icons/hicolor/128x128/apps
    sudo cp "$ICON_SRC" "/usr/share/icons/hicolor/128x128/apps/delez.png"
    echo "Иконка установлена"
fi

sudo tee "$INSTALL_DIR/run-delez.sh" > /dev/null << 'EOF'
#!/bin/bash
cd /opt/delez

export WHISPER_CLI_PATH=/opt/delez/whisper-cli
export WHISPER_MODEL_PATH="$HOME/.cache/delez/whisper/ggml-small.bin"

echo "Запуск Vite..."
npx vite --port 3000 --host 127.0.0.1 &
VITE_PID=$!

echo "Ожидание Vite..."
until curl -s http://127.0.0.1:3000 > /dev/null 2>&1; do
    sleep 0.5
done

echo "Запуск Delёz..."
/opt/delez/src-tauri/target/debug/delez

kill $VITE_PID 2>/dev/null
wait $VITE_PID 2>/dev/null
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
else
    echo "Модель whisper уже в кэше"
fi

echo ""
echo "Установка завершена."
