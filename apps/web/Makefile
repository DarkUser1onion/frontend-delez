.PHONY: help setup run check format docker-build docker-up docker-down logs clean appimage install uninstall restart test api-test logs-check performance quality-check check-api release-check

help: ## Show this help
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: ## Install dependencies
	@echo "Installing dependencies..."
	npm install

run: ## Start Delёz in dev mode
	@echo "Starting Delёz in development mode..."
	npm run tauri:dev

check: ## Run linter and format check
	@echo "Running linter and format check..."
	npm run lint
	npm run format:check

format: ## Format code
	@echo "Formatting code..."
	npm run format

docker-build: ## Build Docker image
	docker compose build

docker-up: ## Start Docker containers
	docker compose up --build

docker-down: ## Stop Docker containers
	docker compose down

logs: ## Show Docker logs
	docker compose logs -f

clean: ## Clean build artifacts
	@echo "Cleaning build artifacts..."
	rm -rf node_modules/.vite
	cargo clean --manifest-path src-tauri/Cargo.toml

appimage: ## Build AppImage
	./build-appimage.sh

install: ## Install as desktop application (Linux)
	./install-debug.sh

uninstall: ## Uninstall desktop application (Linux)
	./uninstall-debug.sh

restart:
	@echo "Restarting Delez docker..."
	docker compose restart

test: ## Run smoke tests (build check)
	@echo "Running smoke tests..."
	npm install
	npm run build

api-test: ## Test API endpoints with curl
	@echo "Testing API endpoints..."
	@echo "Health:"
	@curl -s -o /dev/null -w "HTTP %{http_code}\n" https://api.delez-repo.ru/v1/health
	@echo "Failed login:"
	@curl -s -o /dev/null -w "HTTP %{http_code}\n" -X POST https://api.delez-repo.ru/auth/sign-in/email -H "Content-Type: application/json" -d '{"email":"none@example.com","password":"wrong"}'
	@echo "Missing entry:"
	@curl -s -o /dev/null -w "HTTP %{http_code}\n" https://api.delez-repo.ru/v1/entries/999999

logs-check: ## Collect logs from Docker or Tauri
	@echo "Collecting logs..."
	@mkdir -p reports
	@docker logs api --tail=100 > reports/logs_tail.txt 2>&1 || (echo "Docker not available, trying Tauri logs..." && (test -f ~/.config/delez/logs/*.log && cat ~/.config/delez/logs/*.log > reports/logs_tail.txt || echo "No logs found" > reports/logs_tail.txt))

performance: ## Run Lighthouse performance test (web)
	@echo "Running Lighthouse for web version..."
	@mkdir -p reports
	@npx lighthouse https://delez.tech --preset=desktop --output=html --output-path=reports/lighthouse_report.html

quality-check: test api-test logs-check ## Run all quality checks
	@echo "========================================"
	@echo "Quality check completed successfully"
	@echo "========================================"

check-api:
	@command -v curl >/dev/null 2>&1 || (echo "curl not found" && exit 1)
	@curl -s -f https://api.delez-repo.ru/v1/health > /dev/null || (echo "API health check failed" && exit 1)
	@echo "API health OK"

release-check: check-api
	@echo "Running build check..."
	npm run build --if-present
	@echo "All release checks passed"
