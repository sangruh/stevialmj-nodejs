#!/bin/bash
# Deploy script untuk Plesk dengan logging

echo "📦 Building deployment package for Plesk..."

# Create deployment folder
DEPLOY_DIR="plesk-deploy"
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR/logs

# Copy essential files
cp server-mysql.cjs $DEPLOY_DIR/
cp package.json $DEPLOY_DIR/
cp package-lock.json $DEPLOY_DIR/
cp ecosystem.config.js $DEPLOY_DIR/
cp schema.sql $DEPLOY_DIR/
cp README.md $DEPLOY_DIR/
cp DEPLOYMENT-PLESK.md $DEPLOY_DIR/
cp .env.example $DEPLOY_DIR/.env.example

# Copy public folder
cp -r public $DEPLOY_DIR/

# Create .env template
cat > $DEPLOY_DIR/.env << 'EOF'
PORT=3000
DATABASE_URL=mysql://stevialmj:stevia1117!!@localhost/triwirat_stevia
DB_HOST=localhost
DB_USER=stevialmj
DB_PASSWORD=stevia1117!!
DB_NAME=triwirat_stevia
OPENROUTER_API_KEY=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
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
NODE_ENV=production
EOF

# Create zip
zip -r ${DEPLOY_DIR}.zip $DEPLOY_DIR

echo ""
echo "✅ Deployment package ready!"
echo "📂 File: ${DEPLOY_DIR}.zip"
echo ""
echo "📤 Upload ke Plesk:"
echo "   1. Upload ${DEPLOY_DIR}.zip ke domain Anda"
echo "   2. Extract di File Manager Plesk"
echo "   3. Upload node_modules.zip (jika belum ada)"
echo "   4. Extract node_modules.zip"
echo "   5. Di Plesk → Node.js:"
echo "      - Startup file: server-mysql.cjs"
echo "      - Application root: /"
echo "   6. Set environment variables di panel Node.js"
echo "   7. Restart Application"
echo ""
echo "📝 Logs akan muncul di:"
echo "   - /logs/error.log (stderr)"
echo "   - /logs/out.log (stdout)"
echo "   - Plesk → Node.js → Logs"
