#!/usr/bin/env bash
set -euo pipefail

echo "=== Удаление Delёz (debug-версия) ==="

# 1. Удаляем папку с бинарником и скриптом запуска
sudo rm -rf /opt/delez

# 2. Удаляем ярлык из меню приложений
sudo rm -f /usr/share/applications/delez.desktop

# 3. Удаляем иконку
sudo rm -f /usr/share/icons/hicolor/128x128/apps/delez.png

# 4. (Опционально) Удаляем модель whisper из кэша
read -p "Удалить модель whisper из кэша (~/.cache/delez/whisper)? [y/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf ~/.cache/delez/whisper
    echo "Модель whisper удалена."
else
    echo "Модель whisper оставлена в кэше."
fi

echo ""
echo "Удаление завершено."
