FRONTEND_DIR=./frontend
BACKEND_DIR=./backend

all: install-concurrently
	@concurrently "make start-backend" "make start-frontend"

install-concurrently:
	@if ! npm list -g concurrently > /dev/null 2>&1; then \
		echo "Installing concurrently"; \
		npm install -g concurrently; \
	else \
		echo "Concurrently is already installed"; \
	fi

start-backend:
	cd "${BACKEND_DIR}" && npm install && npm run dev

start-frontend:
	cd "${FRONTEND_DIR}" && npm install && npm run dev

stop:
	pkill -f "npm run dev"