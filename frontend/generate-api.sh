#!/bin/bash

echo "🔄 Generating TypeScript types from OpenAPI spec..."

cd "$(dirname "$0")"

# Create generated directory if it doesn't exist
mkdir -p src/generated

# Generate TypeScript types
npx openapi-typescript ../openapi.yaml -o src/generated/api-types.ts

echo "✅ TypeScript types generated in src/generated/api-types.ts"
