#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
BINARY="$PROJECT_DIR/src-tauri/target/release/delez"
DESKTOP_FILE="delez.desktop"
ICON_NAME="delez.png"

echo "=== Установка Delёz ==="

# 1. Бинарник
if [ ! -f "$BINARY" ]; then
    echo "Бинарник не найден. Сначала соберите: npm run tauri build -- --no-bundle"
    exit 1
fi
sudo cp "$BINARY" /usr/local/bin/delez
sudo chmod +x /usr/local/bin/delez
echo "Бинарник установлен в /usr/local/bin/delez"

# 2. Иконка
if [ -f "$PROJECT_DIR/src-tauri/icons/128x128.png" ]; then
    sudo mkdir -p /usr/share/icons/hicolor/128x128/apps
    sudo cp "$PROJECT_DIR/src-tauri/icons/128x128.png" "/usr/share/icons/hicolor/128x128/apps/$ICON_NAME"
    echo "Иконка установлена"
else
    echo "Иконка не найдена, используется значок по умолчанию"
fi

# 3. .desktop файл
cat > /tmp/delez.desktop << EOF
[Desktop Entry]
Type=Application
Name=Delёz
Comment=AI-дневник саморефлексии
Exec=/usr/local/bin/delez
Icon=$ICON_NAME
Categories=Utility;
Terminal=false
EOF
sudo mv /tmp/delez.desktop /usr/share/applications/
echo "Ярлык добавлен в меню приложений"

# 4. Модель whisper (если ещё не загружена)
MODEL_DIR="$HOME/.cache/delez/whisper"
MODEL_FILE="$MODEL_DIR/ggml-medium.bin"
if [ ! -f "$MODEL_FILE" ]; then
    echo "Скачиваем модель whisper..."
    mkdir -p "$MODEL_DIR"
    curl -# -L -o "$MODEL_FILE" "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-medium.bin"
fi

echo ""
echo "Установка завершена. Запустите Delёz из меню приложений или командой 'delez'."
