# SECURITY_CHECKLIST – Delёz

| Проверка | Статус | Доказательство | Что исправлено / комментарий |
|----------|--------|----------------|------------------------------|
| .gitignore настроен (исключает .env, node_modules, dist, target, backups, logs) | выполнено | `git_security_status.txt` | Добавлены строки для .env, backups, *.log |
| .env.example не содержит реальных секретов | выполнено | `env_examples_check.txt` | Все значения заменены на `change_me` |
| Ручной поиск секретов в коде (git grep) | выполнено | `secret_scan.txt` | Найдены только фальшивые токены и примеры |
| Зависимости проверены (npm audit, outdated) | выполнено | `npm_audit.json`, `npm_outdated.json` | 8 уязвимостей (7 moderate, 1 high) – зафиксированы, запланировано обновление |
| Проверка ролей (доступ к своим данным) | выполнено | `roles_access_check.txt` | Пользователь видит только свои записи |
| Проверка доступа к чужим данным | выполнено | `roles_access_check.txt` | Запрос чужой записи вернул 404/403 |
| CORS и security config | выполнено | `cors_check.txt` | На сервере CORS не настроен, обходится через плагин Tauri `@tauri-apps/plugin-http` |
| Backup создан (конфиги приложения) | выполнено | `backup_restore_result.txt`, папка `backups/` | Создана резервная копия `~/.config/tech.delez.app` (или `/home/user/tech.delez.app`) |
| Restore проверен | выполнено | `backup_restore_result.txt` | Восстановление выполнено, приложение запускается с теми же настройками |
| Открытые порты проверены | выполнено | `ports_check.txt` | Лишних портов нет (только необходимые) |
| Логи без критических ошибок | выполнено | `logs_security.txt`, `logs.txt` | Отсутствуют panic, fatal, 500 |
