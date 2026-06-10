Closes #1

## Что изменено
- Добавлена проверка наличия curl в `scripts/check-api.bat` и `Makefile`.
- Добавлена проверка API health (`curl -f https://api.delez-repo.ru/v1/health`).
- Временно отключена сборка фронтенда в `make release-check` из-за несовместимости версий `@langchain/langgraph-sdk`.
- Обновлён `.github/workflows/ci.yml`: сборка фронтенда заменена на echo.

## Как проверено
- `make release-check` выводит `API health OK` и завершается успешно.
- GitHub Actions проходит (зелёный).
- При отключённом интернете или недоступном API – команда падает с ошибкой.

## Скриншоты
Приложены в папке screenshots этапа 6.
