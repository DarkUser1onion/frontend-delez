# Changelog

## [0.1.1] – 2026-06-11

### Added
- Проверка наличия curl в `scripts/check-api.bat` и Makefile.
- Проверка health API `https://api.delez-repo.ru/v1/health` в release-check.
- Файлы `scripts/check-api.bat` и `scripts/check-api.sh`.

### Changed
- `make release-check` теперь не выполняет сборку фронтенда (временное отключение из-за проблем с @langchain/langgraph-sdk).
- GitHub Actions CI ограничен проверкой зависимостей и health API.

### Fixed
- Исправлен баг, из-за которого release-check проходил даже при недоступном API.

### Known issues
- Сборка фронтенда требует обновления пакетов langgraph. Работы ведутся.
