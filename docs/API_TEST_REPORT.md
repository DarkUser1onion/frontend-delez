# API\_TEST\_REPORT.md – Delёз v0.1.0

## Базовый URL
`https://api.delez-repo.ru`

## Документация API (Swagger UI)
Открыта по адресу: https://api.delez-repo.ru/api/docs

## Инструменты тестирования
- cURL (встроен в Windows 10/11, Linux, macOS)
- Postman (коллекция не прилагается, но можно импортировать OpenAPI)

## Результаты проверок

| ID | Метод | Эндпоинт | Условие | Ожидаемый статус | Фактический статус | Тело ответа (пример) | Результат |
|----|-------|----------|---------|------------------|--------------------|----------------------|-----------|
| API-01 | GET | `/v1/health` | Без авторизации | 200 | 200 | `{"status":"ok"}` | PASS |
| API-02 | POST | `/auth/sign-in/email` | Верные учётные данные | 200 | 200 | `{"access_token":"...", "token_type":"bearer"}` | PASS |
| API-03 | POST | `/auth/sign-in/email` | Неверный пароль | 401 | 401 | `{"detail":"Incorrect email or password"}` | PASS |
| API-04 | GET | `/v1/entries` | С токеном авторизации | 200 | 200 | `[{"id":1,"title":"Мой день","content":"..."}]` | PASS |
| API-05 | GET | `/v1/entries` | Без токена | 401 | 401 | `{"detail":"Not authenticated"}` | PASS |
| API-06 | GET | `/v1/graph/rhizome` | С токеном авторизации | 200 | 200 | `{"nodes":[...],"links":[...]}` | PASS |
| API-07 | POST | `/auth/sign-up/email` | Email уже существует | 400 | 400 | `{"detail":"Email already registered"}` | PASS |
| API-08 | GET | `/v1/entries/999999` | Несуществующая запись | 404 | 404 | `{"detail":"Entry not found"}` | PASS |

## Примеры cURL-команд

### Успешный GET health
```bash
curl -X GET "https://api.delez-repo.ru/v1/health"
```

### Авторизация (успех)
```bash
curl -X POST "https://api.delez-repo.ru/auth/sign-in/email" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"correct_password"}'
```

### Авторизация (ошибка)
```bash
curl -X POST "https://api.delez-repo.ru/auth/sign-in/email" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"wrong"}'
```

### Получение записей дневника (с токеном)
```bash
curl -X GET "https://api.delez-repo.ru/v1/entries" \
  -H "Authorization: Bearer <token>"
```

### Несуществующая запись
```bash
curl -X GET "https://api.delez-repo.ru/v1/entries/999999" \
  -H "Authorization: Bearer <token>"
```

## Вывод
API полностью работоспособно, соответствует OpenAPI спецификации. Все проверенные эндпоинты возвращают корректные HTTP статусы и понятные сообщения об ошибках. Авторизация работает, защищённые ресурсы недоступны без токена. Документация Swagger доступна и актуальна.
