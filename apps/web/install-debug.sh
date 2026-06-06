#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEBUG_BINARY="$PROJECT_DIR/src-tauri/target/debug/delez"
INSTALL_DIR="/opt/delez"
ICON_SRC="$PROJECT_DIR/src-tauri/icons/128x128.png"
DESKTOP_FILE="/usr/share/applications/delez.desktop"
WHISPER_SRC="$PROJECT_DIR/src-tauri/DelezApp/usr/bin/whisper-cli"

echo "=== Установка Delёz ==="

# 1. Проверяем бинарник
if [ ! -f "$DEBUG_BINARY" ]; then
    echo "Debug-бинарник не найден. Сначала запустите 'npm run tauri dev' для его сборки."
    exit 1
fi

# 2. Копируем бинарник и whisper-cli
sudo mkdir -p "$INSTALL_DIR"
sudo cp "$DEBUG_BINARY" "$INSTALL_DIR/delez"
sudo chmod +x "$INSTALL_DIR/delez"

if [ -f "$WHISPER_SRC" ]; then
    sudo cp "$WHISPER_SRC" "$INSTALL_DIR/whisper-cli"
    sudo chmod +x "$INSTALL_DIR/whisper-cli"
    echo "whisper-cli скопирован"
else
    echo "whisper-cli не найден в проекте, голосовой ввод не будет работать"
fi

echo "Бинарник установлен в $INSTALL_DIR/delez"

# 3. Иконка
if [ -f "$ICON_SRC" ]; then
    sudo mkdir -p /usr/share/icons/hicolor/128x128/apps
    sudo cp "$ICON_SRC" "/usr/share/icons/hicolor/128x128/apps/delez.png"
    echo "Иконка установлена"
else
    echo "Иконка не найдена"
fi

# 4. Скрипт запуска (с экспортом WHISPER_CLI_PATH)
sudo tee "$INSTALL_DIR/run-delez.sh" > /dev/null << RUNEOF
#!/bin/bash
cd "$PROJECT_DIR"

export WHISPER_CLI_PATH="$INSTALL_DIR/whisper-cli"

echo "Запуск Vite..."
npx vite --port 3000 --host 127.0.0.1 &
VITE_PID=\$!

echo "Ожидание Vite..."
until curl -s http://127.0.0.1:3000 > /dev/null 2>&1; do
    sleep 0.5
done

echo "Запуск Delёz..."
"$INSTALL_DIR/delez"

kill \$VITE_PID 2>/dev/null
wait \$VITE_PID 2>/dev/null
RUNEOF
sudo chmod +x "$INSTALL_DIR/run-delez.sh"

# 5. .desktop файл
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

# 6. Модель whisper (если ещё не загружена) — оставляем small
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
