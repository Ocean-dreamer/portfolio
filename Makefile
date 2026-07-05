# // Makefile for managing frontend and backend development and production tasks

# Directories
FRONTEND_DIR=frontend
BACKEND_DIR=backend

# Default target
.PHONY: dev
dev: start

# ----------------------
# Development
# ----------------------

# Run backend in dev mode
.PHONY: backend
backend:
	cd $(BACKEND_DIR) && npm install && npm run dev

# Run frontend in dev mode
.PHONY: frontend
frontend:
	cd $(FRONTEND_DIR) && npm install && npm run dev

# Run both backend & frontend in dev mode
.PHONY: start
start:
	@echo "🚀 Starting backend & frontend in dev mode..."
	cd $(BACKEND_DIR) && npm run dev &
	cd $(FRONTEND_DIR) && npm run dev

# ----------------------
# Production
# ----------------------

# Build backend & frontend
.PHONY: build
build:
	@echo "📦 Building backend..."
	cd $(BACKEND_DIR) && npm install && npm run build
	@echo "📦 Building frontend..."
	cd $(FRONTEND_DIR) && npm install && npm run build

# Run backend & frontend in production mode
.PHONY: start-prod
start-prod:
	@echo "🚀 Starting backend & frontend in production mode..."
	# Run backend compiled JS
	cd $(BACKEND_DIR) && npm start &
	# Serve frontend build
	cd $(FRONTEND_DIR) && npx vite preview

# ----------------------
# Clean
# ----------------------
.PHONY: clean
clean:
	@echo "🧹 Cleaning backend & frontend..."
	rm -rf $(BACKEND_DIR)/node_modules $(BACKEND_DIR)/dist
	rm -rf $(FRONTEND_DIR)/node_modules $(FRONTEND_DIR)/dist
