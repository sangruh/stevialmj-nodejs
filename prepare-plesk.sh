#!/bin/bash
# Script untuk prepare files upload ke Plesk (MySQL version)

echo "📦 Preparing files for Plesk upload (MySQL version)..."
echo ""

# Create upload folder
UPLOAD_DIR="plesk-mysql-upload"
rm -rf $UPLOAD_DIR
mkdir -p $UPLOAD_DIR

# Copy files
echo "Copying files..."
cp server-mysql.js $UPLOAD_DIR/
cp -r dist/public $UPLOAD_DIR/public/
cp package.json $UPLOAD_DIR/
cp ecosystem.config.js $UPLOAD_DIR/
cp .env $UPLOAD_DIR/
cp schema.sql $UPLOAD_DIR/

# Copy database driver if exists
if [ -d "node_modules/mysql2" ]; then
    echo "📦 Zipping mysql2 module..."
    zip -r $UPLOAD_DIR/mysql2.zip node_modules/mysql2 -x "*.git*" > /dev/null 2>&1
    echo "✅ mysql2.zip created"
fi

# Create .env (already copied, but ensure it has MySQL config)
cat > $UPLOAD_DIR/.env << 'EOF'
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
echo "✅ .env created with MySQL config"

# Create README for upload
cat > $UPLOAD_DIR/UPLOAD-README.txt << 'EOF'
=====================================
PANDUAN UPLOAD KE PLESK - MYSQL VERSION
=====================================

PENTING: Startup file adalah server-mysql.js (BUKAN dist/index.js)

1. Upload SEMUA file di folder ini ke hosting Plesk Anda:
   - server-mysql.js       ← STARTUP FILE
   - public/               ← Static files (dari dist/public)
   - mysql2.zip            ← MySQL driver (extract di Plesk)
   - sqlite.db             ← Database
   - package.json
   - ecosystem.config.js
   - .env
   - schema.sql            ← Import ini ke phpMyAdmin

2. DI PLESK DATABASES:
   - Buat database: triwirat_stevia
   - User: stevialmj
   - Password: stevia1117!!
   - Import schema.sql ke phpMyAdmin

3. DI PLESK FILE MANAGER:
   - Extract mysql2.zip ke node_modules/mysql2
   - Pastikan struktur folder seperti ini:
     /httpdocs/
     ├── server-mysql.js    ← STARTUP FILE
     ├── public/
     ├── node_modules/
     │   └── mysql2/
     ├── package.json
     └── .env

4. DI PLESK NODE.JS PANEL:
   - Enable Node.js
   - Set:
     * Node.js version: 18.x atau 20.x
     * Application root: /
     * Application startup file: server-mysql.js  ← PENTING!
     * Application environment: production

5. ENVIRONMENT VARIABLES:
   PORT=3000
   DATABASE_URL=mysql://stevialmj:stevia1117!!@localhost/triwirat_stevia
   DB_HOST=localhost
   DB_USER=stevialmj
   DB_PASSWORD=stevia1117!!
   DB_NAME=triwirat_stevia
   OPENROUTER_API_KEY=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
   OPENROUTER_MODEL=google/gemini-2.5-flash-lite
   NODE_ENV=production

6. Restart Application

7. Test: https://stevialmj.my.id/api/trpc/articles.list

=====================================
LIHAT FILE: MYSQL-DEPLOY.md
=====================================
EOF

# Copy deployment guide
cp MYSQL-DEPLOY.md $UPLOAD_DIR/

echo ""
echo "✅ All files ready in folder: $UPLOAD_DIR/"
echo ""
echo "📤 Upload ke Plesk:"
echo "   1. Zip folder: zip -r ${UPLOAD_DIR}.zip $UPLOAD_DIR/"
echo "   2. Upload ${UPLOAD_DIR}.zip ke Plesk File Manager"
echo "   3. Extract di Plesk"
echo "   4. Ikuti panduan di UPLOAD-README.txt"
echo ""

# Create zip
zip -r ${UPLOAD_DIR}.zip $UPLOAD_DIR/ > /dev/null 2>&1
echo "📦 Zip file created: ${UPLOAD_DIR}.zip"
