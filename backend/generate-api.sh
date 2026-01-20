#!/bin/bash

echo "🔄 Generating Go server code from OpenAPI spec using go-swagger..."

cd "$(dirname "$0")"

# Remove old generated files (may need sudo if previous run created root-owned files)
if [ -d "generated" ]; then
  if [ -w "generated" ]; then
    rm -rf generated
  else
    echo "⚠️  Need sudo to remove old generated files (owned by root from Docker)"
    sudo rm -rf generated
  fi
fi

# Create the output directory
mkdir -p generated

# Generate Go server code using go-swagger
# Mount the entire Go installation so formatting works
docker run --rm \
  -u "$(id -u):$(id -g)" \
  -v "${PWD}/..:/local" \
  -v "/usr/local/go:/usr/local/go:ro" \
  -e GOROOT=/usr/local/go \
  -e PATH=/usr/local/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
  quay.io/goswagger/swagger:latest generate server \
  -f /local/openapi.yaml \
  -t /local/backend/generated \
  --exclude-main \
  --skip-validation

docker run --rm \
  -u "$(id -u):$(id -g)" \
  -v "${PWD}/..:/local" \
  -v "/usr/local/go:/usr/local/go:ro" \
  -e GOROOT=/usr/local/go \
  -e PATH=/usr/local/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
  quay.io/goswagger/swagger:latest generate client \
  -f /local/openapi.yaml \
  -t /local/backend/generated \
  --skip-validation

sudo chmod -R 777 generated

echo "✅ Go server code generated in generated/"