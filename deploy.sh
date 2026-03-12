#!/bin/bash
# Script untuk prepare deployment package

echo "📦 Preparing deployment package..."

# Build dulu
./build.sh

# Create deployment folder
DEPLOY_DIR="deploy-$(date +%Y%m%d_%H%M%S)"
mkdir -p $DEPLOY_DIR

# Copy files
cp -r dist $DEPLOY_DIR/
cp package.json $DEPLOY_DIR/
cp ecosystem.config.js $DEPLOY_DIR/
cp .env.example $DEPLOY_DIR/.env.example
cp README.md $DEPLOY_DIR/
cp DEPLOYMENT.md $DEPLOY_DIR/

# Copy database if exists
if [ -f "../sqlite.db" ]; then
    cp ../sqlite.db $DEPLOY_DIR/
    echo "✅ Database copied"
fi

# Create .env template with placeholder
cat > $DEPLOY_DIR/.env << 'EOF'
PORT=3000
DATABASE_URL=file:./sqlite.db
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
NODE_ENV=production
EOF

# Create tarball
tar -czf ${DEPLOY_DIR}.tar.gz $DEPLOY_DIR

echo ""
echo "✅ Deployment package ready!"
echo "📂 File: ${DEPLOY_DIR}.tar.gz"
echo ""
echo "📤 Upload ke hosting:"
echo "   1. Upload ${DEPLOY_DIR}.tar.gz"
echo "   2. Extract: tar -xzf ${DEPLOY_DIR}.tar.gz"
echo "   3. cd $DEPLOY_DIR"
echo "   4. npm install --production"
echo "   5. Edit .env dan isi API key Anda"
echo "   6. pm2 start ecosystem.config.js"
echo "   7. pm2 save"
