#!/bin/bash

echo "🔄 Generating Go server types from OpenAPI spec..."

cd "$(dirname "$0")"

# Create generated directory if it doesn't exist
mkdir -p generated

# Generate Go types and server interface
~/go/bin/oapi-codegen -generate types -package generated -o generated/types.go ../openapi.yaml
~/go/bin/oapi-codegen -generate chi-server -package generated -o generated/server.go ../openapi.yaml

echo "✅ Go types and server generated in generated/"
