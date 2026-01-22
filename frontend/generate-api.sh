#!/bin/bash

echo "🔄 Generating TypeScript API client from OpenAPI spec..."

cd "$(dirname "$0")"

# Remove old generated files (may need sudo if previous run created root-owned files)
if [ -d "generated" ]; then
  if [ -w "generated" ]; then
    rm -rf ./src/generated
  else
    echo "⚠️ Need sudo to remove old generated files (owned by root from Docker)"
    sudo rm -rf ./src/generated
  fi
fi

# Create the 
rm -rf src/generated

# Generate TypeScript API client using openapi-generator via docker
docker run --rm \
  -v "${PWD}/../:/local" \
  openapitools/openapi-generator-cli generate \
  -i /local/openapi.yaml \
  -g typescript-fetch \
  -o /local/frontend/src/generated \
  --additional-properties=supportsES6=true,npmVersion=10.0.0,typescriptThreePlus=true,withInterfaces=true

sudo chmod -R 777 src/generated

echo "✅ TypeScript API client generated in src/generated/"
