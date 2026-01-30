# Frontend Dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

# Copy openapi spec from root
COPY openapi.yaml /openapi.yaml

# Copy frontend package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend source
COPY frontend/ .

# # Generate API types from OpenAPI spec
# RUN npx openapi-typescript /openapi.yaml -o src/generated/api-types.ts

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
