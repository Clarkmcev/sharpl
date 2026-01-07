# Sharpl - Full Stack Application

A containerized full-stack application with React (Vite + Tailwind CSS), Go (Gin), and PostgreSQL.
**Features OpenAPI/Swagger for type-safe API communication.**

## Architecture

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Go + Gin Framework + GORM
- **Database**: PostgreSQL 16
- **API Contract**: OpenAPI 3.0 (Swagger)
- **Containerization**: Docker + Docker Compose

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Ports 3000, 8080, and 5432 available

### Run with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (fresh start)
docker-compose down -v
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Database**: localhost:5432

## Development

### Generate API Types

After modifying `openapi.yaml`:

```bash
# Generate both frontend and backend types
./generate-all.sh

# Or individually
cd frontend && npm run generate:api
cd backend && ./generate-api.sh
```

See [API_CODEGEN.md](./API_CODEGEN.md) for details.

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173

### Backend Development
```bash
cd backend
go run main.go
```
Runs on http://localhost:8080

### Database Access
```bash
docker-compose exec db psql -U sharpl_user -d sharpl_db
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/logout` - User logout

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID

## Environment Variables

### Backend
- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_USER` - Database user (default: sharpl_user)
- `DB_PASSWORD` - Database password (default: sharpl_password)
- `DB_NAME` - Database name (default: sharpl_db)
- `GIN_MODE` - Gin mode (default: debug, production: release)

## Project Structure

```
sharpl/
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── Login.tsx
│   │   ├── Home.tsx
│   │   └── Dashboard.tsx
│   ├── Dockerfile
│   └── nginx.conf
├── backend/
│   ├── main.go
│   ├── Dockerfile
│   └── init.sql
└── docker-compose.yml
```

## Building for Production

```bash
# Build all images
docker-compose build

# Run in production mode
docker-compose up -d
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs [service-name]

# Restart specific service
docker-compose restart [service-name]
```

### Database connection issues
```bash
# Ensure database is healthy
docker-compose ps

# Check database logs
docker-compose logs db
```

### Reset everything
```bash
docker-compose down -v
docker-compose up -d --build
```
