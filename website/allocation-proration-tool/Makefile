FRONTEND_DIR=./frontend
BACKEND_DIR=./backend

all:
	concurrently "make start-backend" "make start-frontend"

start-backend:
	cd "${BACKEND_DIR}" && npm install && npm run dev

start-frontend:
	cd "${FRONTEND_DIR}" && npm install && npm run dev

stop:
	pkill -f "npm run dev"