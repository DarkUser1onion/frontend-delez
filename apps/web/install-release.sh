#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
INSTALL_DIR="/opt/delez"
ICON_SRC="$SCRIPT_DIR/src-tauri/icons/128x128.png"
DESKTOP_FILE="/usr/share/applications/delez.desktop"

echo "=== Установка Delёz (ПОЛНОЕ КОПИРОВАНИЕ) ==="

# 1. Удаляем старую установку
sudo rm -rf "$INSTALL_DIR" 2>/dev/null || true
sudo rm -f "$DESKTOP_FILE" 2>/dev/null || true
sudo rm -f /usr/share/icons/hicolor/128x128/apps/delez.png 2>/dev/null || true

# 2. КОПИРУЕМ ВСЮ ПАПКУ ПРОЕКТА
sudo mkdir -p "$INSTALL_DIR"
echo "Копирование проекта..."
sudo cp -a "$SCRIPT_DIR" "$INSTALL_DIR/web"
echo "Проект скопирован в $INSTALL_DIR/web"

# 3. Копируем debug-бинарник
DEBUG_BINARY="$SCRIPT_DIR/src-tauri/target/debug/delez"
if [ -f "$DEBUG_BINARY" ]; then
    sudo cp "$DEBUG_BINARY" "$INSTALL_DIR/delez"
    sudo chmod +x "$INSTALL_DIR/delez"
    echo "Debug-бинарник скопирован"
else
    echo "Debug-бинарник не найден. Запустите 'npm run tauri dev' для его сборки."
    exit 1
fi

# 4. Скрипт запуска
sudo tee "$INSTALL_DIR/run-delez.sh" > /dev/null << 'EOF'
#!/bin/bash
cd /opt/delez/web

echo "Запуск Vite..."
npx vite --port 3000 --host 127.0.0.1 &
VITE_PID=$!

echo "Ожидание Vite..."
until curl -s http://127.0.0.1:3000 > /dev/null 2>&1; do
    sleep 0.5
done

echo "Запуск Delёz..."
/opt/delez/delez

kill $VITE_PID 2>/dev/null
wait $VITE_PID 2>/dev/null
EOF
sudo chmod +x "$INSTALL_DIR/run-delez.sh"

# 5. Иконка и ярлык
echo "Установка иконки и ярлыка..."
sudo mkdir -p /usr/share/icons/hicolor/128x128/apps
sudo cp "$ICON_SRC" /usr/share/icons/hicolor/128x128/apps/delez.png
sudo tee "$DESKTOP_FILE" > /dev/null << DESKEOF
[Desktop Entry]
Type=Application
Name=Delёz
Comment=AI-дневник саморефлексии
Exec=$INSTALL_DIR/run-delez.sh
Icon=delez
Categories=Utility;
Terminal=false
DESKEOF

# 6. Модель whisper
MODEL_DIR="$HOME/.cache/delez/whisper"
MODEL_FILE="$MODEL_DIR/ggml-medium.bin"
if [ ! -f "$MODEL_FILE" ]; then
    echo "Скачиваем модель whisper..."
    mkdir -p "$MODEL_DIR"
    curl -# -L -o "$MODEL_FILE" "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-medium.bin"
else
    echo "Модель whisper уже в кэше"
fi

echo ""
echo "Установка завершена!"
echo "   Запустите Delёz из меню приложений или командой: $INSTALL_DIR/run-delez.sh"
echo "   Для удаления: sudo rm -rf $INSTALL_DIR $DESKTOP_FILE /usr/share/icons/hicolor/128x128/apps/delez.png"
