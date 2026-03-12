#!/bin/bash
# Script untuk copy node_modules dari project utama

echo "📦 Copying node_modules from main project..."

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
MAIN_PROJECT="$(dirname "$SCRIPT_DIR")"

# Check if main project node_modules exists
if [ ! -d "$MAIN_PROJECT/node_modules/.pnpm/node_modules" ]; then
    echo "❌ node_modules not found in main project!"
    echo "Please run 'pnpm install' in the main project first."
    exit 1
fi

# Create node_modules directory
mkdir -p "$SCRIPT_DIR/node_modules"

# Copy node_modules from pnpm
cp -r "$MAIN_PROJECT/node_modules/.pnpm/node_modules/"* "$SCRIPT_DIR/node_modules/"

echo "✅ node_modules copied successfully!"
echo ""
echo "📂 Size: $(du -sh "$SCRIPT_DIR/node_modules" | cut -f1)"
echo ""
echo "🚀 You can now run:"
echo "   ./run.sh"
echo "   or"
echo "   node dist/index.js"
