# Sharpl - Reach your goals

**A training management platform for endurance athletes** who want to track, analyze, and optimize their performance across running, cycling, swimming, and triathlon disciplines.

Sharpl helps athletes stay sharp by providing tools to:
- 📊 Track workouts and training plans with precision
- 📈 Analyze performance metrics and trends over time
- 🎯 Set and monitor progress toward race goals
- 💪 Balance training load to prevent overtraining and injury
- 🔍 Gain insights from your training data to train smarter, not just harder

Whether you're preparing for your first 5K or your next Ironman, Sharpl gives you the clarity and structure to reach peak performance.

---

## Technical Stack

A containerized full-stack application with React (Vite + Tailwind CSS), Go (Gin), and PostgreSQL.
**Features OpenAPI/Swagger for type-safe API communication.**

## Architecture

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Go + GORM
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
