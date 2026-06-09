# DEPLOYMENT.md

## 1. Где развернут проект
Вариант D – Release build / portable demo. Готовые установщики для всех платформ доступны в GitHub Releases.

## 2. Требования
- Linux: Node.js 20+, Rust
- Windows: Node.js 20+, Rust
- macOS: Node.js 20+, Rust

## 3. Команды развертывания

### Linux (.deb/.rpm)
```bash
sudo dpkg -i Delez_*.deb
delez
```

### Linux (AppImage)
```bash
chmod +x Delez*.AppImage
./Delez*.AppImage
```

### Windows
Запустите Delez_*.msi и следуйте инструкциям установщика.

### macOS
Откройте Delez_*.dmg и перетащите приложение в /Applications. При первом запуске:
```bash
sudo xattr -rd com.apple.quarantine /Applications/Delez.app
```

### Android
Установите app-release-signed.apk (подписанный отладочный APK).

### Docker (статический фронтенд)
```bash
docker compose up --build -d
# Открыть http://localhost:8080
```

## 4. Проверка
- Linux: приложение в меню или команда `delez`.
- Windows: ярлык на рабочем столе.
- macOS: приложение в /Applications.

## 5. Остановка и перезапуск
- Закрыть окно и открыть снова.
- Docker: `docker compose down && docker compose up --build -d` или `make docker-down && make docker-up`
