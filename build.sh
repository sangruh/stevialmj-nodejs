#!/bin/bash
# Script untuk build standalone version

echo "🔨 Building standalone version..."

# Create dist directory
mkdir -p dist

# Build server dengan esbuild
echo "📦 Bundling server..."
npx esbuild server/_core/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outfile=dist/index.js \
  --minify

# Copy public files
echo "📁 Copying public files..."
mkdir -p dist/public
cp -r client/public/* dist/public/ 2>/dev/null || true

echo "✅ Build complete!"
echo ""
echo "📂 Files created:"
echo "   - dist/index.js (bundled server)"
echo "   - dist/public/ (static files)"
echo ""
echo "🚀 To deploy:"
echo "   1. Copy 'dist' folder to hosting"
echo "   2. Copy 'package.json' to hosting"
echo "   3. Copy 'sqlite.db' to hosting (if exists)"
echo "   4. Create .env file on hosting"
echo "   5. Run: npm install && npm start"
