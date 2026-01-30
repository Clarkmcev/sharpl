#!/bin/bash

echo "🔄 Generating TypeScript API client from OpenAPI spec..."

cd "$(dirname "$0")"

# Remove old generated files (if exists and writable)
if [ -d "src/generated" ] && [ -w "src/generated" ]; then
  rm -rf src/generated
fi

# Generate TypeScript API client using openapi-generator via docker
docker run --rm \
  -v "${PWD}/../:/local" \
  openapitools/openapi-generator-cli generate \
  -i /local/openapi.yaml \
  -g typescript-fetch \
  -o /local/frontend/src/generated \
  --additional-properties=supportsES6=true,npmVersion=10.0.0,typescriptThreePlus=true,withInterfaces=true

echo "✅ TypeScript API client generated in src/generated/"
