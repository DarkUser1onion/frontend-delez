.PHONY: help setup run check format docker-build docker-up docker-down logs clean appimage install uninstall

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
