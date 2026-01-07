#!/bin/bash

echo "🔄 Generating API code for frontend and backend..."

# Generate frontend types
echo "📦 Frontend:"
cd frontend && ./generate-api.sh
cd ..

# Generate backend types  
echo "📦 Backend:"
cd backend && ./generate-api.sh
cd ..

echo ""
echo "✅ All API code generated successfully!"
echo ""
echo "Generated files:"
echo "  - frontend/src/generated/api-types.ts"
echo "  - backend/generated/types.go"
echo "  - backend/generated/server.go"
