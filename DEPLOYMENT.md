# 🚀 Panduan Deployment ke Hosting

## Masalah Umum: Error 503 Service Unavailable

Error 503 berarti server tidak berjalan atau tidak bisa mengakses database.

---

## ✅ Checklist Deployment

### 1. Upload Files ke Hosting

Upload file-file berikut ke folder hosting Anda (misal: `/public_html` atau `/var/www/stevialmj`):

```
standalone/
├── dist/
│   └── index.js          # Server bundle
├── dist/public/          # Static files (harus ada!)
├── sqlite.db             # Database (jika sudah ada data)
├── package.json
├── .env                  # Environment variables (BUAT FILE INI!)
└── README.md
```

### 2. Buat File `.env` di Hosting

**INI PENTING!** Buat file `.env` di folder root hosting dengan isi:

```env
PORT=3000
DATABASE_URL=file:./sqlite.db
OPENROUTER_API_KEY=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
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
NODE_ENV=production
```

> ⚠️ **PENTING**: `DATABASE_URL` harus menggunakan format `file:./sqlite.db` (dengan `file:` prefix)

### 3. Install Dependencies

SSH ke hosting dan jalankan:

```bash
cd /path/to/hosting/folder
npm install --production
```

### 4. Cek Database Path

Pastikan file `sqlite.db` ada di folder yang sama dengan `dist/index.js`.

Jika database ada di folder lain, update `.env`:

```env
DATABASE_URL=file:/full/path/to/sqlite.db
```

### 5. Jalankan Server

**Opsi A: Manual (untuk testing)**

```bash
node dist/index.js
```

Lalu buka `http://your-domain.com:3000` untuk test.

**Opsi B: Dengan PM2 (RECOMMENDED untuk production)**

```bash
# Install PM2 global
npm install -g pm2

# Start server dengan PM2
pm2 start dist/index.js --name stevia-lmj

# Auto-start on server reboot
pm2 startup
pm2 save
```

**Opsi C: Dengan systemd (alternatif PM2)**

Buat file `/etc/systemd/system/stevia-lmj.service`:

```ini
[Unit]
Description=Stevia LMJ Standalone Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/hosting/folder
ExecStart=/usr/bin/node dist/index.js
Restart=always
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=DATABASE_URL=file:./sqlite.db

[Install]
WantedBy=multi-user.target
```

Kemudian:

```bash
sudo systemctl daemon-reload
sudo systemctl enable stevia-lmj
sudo systemctl start stevia-lmj
sudo systemctl status stevia-lmj
```

---

## 🔧 Troubleshooting

### Error 503 - Service Unavailable

**Penyebab:**
1. Server tidak berjalan
2. Port tidak terbuka
3. Reverse proxy (nginx/apache) tidak configured

**Solusi:**

```bash
# 1. Cek apakah server berjalan
ps aux | grep node
# atau jika pakai PM2
pm2 status

# 2. Cek port
netstat -tulpn | grep 3000

# 3. Cek log
tail -f /path/to/hosting/folder/logs/error.log
# atau jika pakai PM2
pm2 logs stevia-lmj
```

### Error: Database not available

**Penyebab:**
1. File `sqlite.db` tidak ada
2. Path database salah
3. Permission denied

**Solusi:**

```bash
# 1. Cek file database
ls -la sqlite.db

# 2. Set permission yang benar
chmod 644 sqlite.db
chown www-data:www-data sqlite.db

# 3. Cek path di .env
cat .env | grep DATABASE_URL
```

### Error: Cannot find module

**Penyebab:** Dependencies belum di-install

**Solusi:**

```bash
npm install --production
```

### Server berjalan tapi tidak bisa diakses

**Penyebab:** Firewall atau reverse proxy

**Solusi:**

**Untuk nginx:**

Buat file `/etc/nginx/sites-available/stevialmj`:

```nginx
server {
    listen 80;
    server_name stevialmj.my.id;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Kemudian:

```bash
sudo ln -s /etc/nginx/sites-available/stevialmj /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Untuk Apache:**

Enable modules:

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel
```

Buat file `/etc/apache2/sites-available/stevialmj.conf`:

```apache
<VirtualHost *:80>
    ServerName stevialmj.my.id

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

Kemudian:

```bash
sudo a2ensite stevialmj
sudo systemctl reload apache2
```

---

## 📝 Quick Deploy Command

Jika Anda sudah punya file `deploy-*.tar.gz`, jalankan:

```bash
# Extract
tar -xzf deploy-*.tar.gz
cd deploy-*/

# Install
npm install --production

# Create .env if not exists
cat > .env << EOF
PORT=3000
DATABASE_URL=file:./sqlite.db
OPENROUTER_API_KEY=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
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
NODE_ENV=production
EOF

# Start with PM2
pm2 start dist/index.js --name stevia-lmj
pm2 save
```

---

## 🔍 Verifikasi Deployment

Setelah deploy, test dengan:

```bash
# Test health endpoint
curl http://localhost:3000/api/trpc/health?timestamp=1234567890

# Test articles endpoint
curl http://localhost:3000/api/trpc/articles.list

# Test homepage
curl http://localhost:3000/
```

Semua harus return response (bukan error 503).

---

## 🆘 Butuh Bantuan?

Jika masih ada masalah, kirimkan:

1. Output dari `pm2 logs stevia-lmj` atau `tail -f logs/error.log`
2. Isi file `.env` (sensor API key)
3. Struktur folder hosting (`ls -la`)
4. Web server yang digunakan (nginx/apache)
