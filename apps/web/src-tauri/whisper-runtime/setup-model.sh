#!/usr/bin/env bash
set -euo pipefail

CACHE_DIR="$HOME/.cache/delez/whisper"
MODEL_NAME="ggml-medium.bin"
MODEL_PATH="$CACHE_DIR/$MODEL_NAME"

if command -v wget &>/dev/null; then
    DOWNLOADER="wget -q --show-progress -O"
elif command -v curl &>/dev/null; then
    DOWNLOADER="curl -# -L -o"
else
    echo "Ошибка: нужен wget или curl для загрузки модели."
    exit 1
fi

mkdir -p "$CACHE_DIR"

if [ ! -f "$MODEL_PATH" ] || [ ! -s "$MODEL_PATH" ]; then
    rm -f "$MODEL_PATH"
    echo "Скачиваем модель whisper ($MODEL_NAME)..."
    $DOWNLOADER "$MODEL_PATH" "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/$MODEL_NAME"
fi

echo "Модель whisper готова: $MODEL_PATH"
