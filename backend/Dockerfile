# Backend Dockerfile
FROM golang:1.24-alpine AS builder

WORKDIR /app

# Install oapi-codegen
RUN go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest

# Copy openapi spec from root
COPY openapi.yaml /openapi.yaml

# Copy backend files
COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ .

# # Generate API types from OpenAPI spec
# RUN mkdir -p generated && \
#     oapi-codegen -generate types -package generated -o generated/types.go /openapi.yaml && \
#     oapi-codegen -generate chi-server -package generated -o generated/server.go /openapi.yaml

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Production stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]
