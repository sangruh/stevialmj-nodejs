#!/bin/bash
# Script untuk run standalone version tanpa install dependencies

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules not found!"
    echo ""
    echo "Please copy node_modules from main project:"
    echo "  cp -r /path/to/main/project/node_modules ./standalone/"
    echo ""
    echo "Or install with npm:"
    echo "  npm install"
    echo ""
    exit 1
fi

# Load environment variables
if [ -f ".env" ]; then
    export $(cat .env | grep -v '^#' | xargs)
    echo "✅ Loaded .env"
else
    echo "⚠️  .env not found, using defaults"
fi

# Set defaults
export PORT=${PORT:-3000}
export DATABASE_URL=${DATABASE_URL:-./sqlite.db}

echo "🚀 Starting Stevia LMJ Standalone..."
echo "   Port: $PORT"
echo "   Database: $DATABASE_URL"
echo ""

# Run server
node dist/index.js
