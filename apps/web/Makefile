.PHONY: setup run check format docker-build docker-up docker-down logs clean

setup:
	@echo "Installing dependencies..."
	npm install

run:
	@echo "Starting Delёz in development mode..."
	npm run tauri:dev

check:
	@echo "Running linter and format check..."
	npm run lint
	npm run format:check

format:
	@echo "Formatting code..."
	npm run format

docker-build:
	docker compose build

docker-up:
	docker compose up --build

docker-down:
	docker compose down

logs:
	docker compose logs -f

clean:
	@echo "Cleaning build artifacts..."
	rm -rf node_modules/.vite
	cargo clean --manifest-path src-tauri/Cargo.toml
