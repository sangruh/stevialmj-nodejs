# Stevia Lumajang - Standalone Version

Versi standalone yang bisa langsung dijalankan tanpa pnpm.

## 🚀 Cara Menjalankan

### Metode 1: Copy node_modules dari Project Utama (PALING MUDAH)

```bash
# Di folder standalone
cp -r ../node_modules/.pnpm/node_modules/* ./node_modules/

# Jalankan
./run.sh
# atau
node dist/index.js
```

### Metode 2: Install dengan npm (Jika tidak ada node_modules)

```bash
# Install dependencies
npm install --production

# Jalankan
npm start
# atau
node dist/index.js
```

### Metode 3: Upload ke Hosting (Tanpa pnpm)

```bash
# Di lokal, jalankan script deploy
./deploy.sh

# Akan dibuat file: deploy-YYYYMMDD_HHMMSS.tar.gz

# Upload file tar.gz tersebut ke hosting
# Di hosting:
tar -xzf deploy-*.tar.gz
cd deploy-*/
npm install --production
npm start
```

## Struktur File

```
standalone/
├── dist/
│   └── index.js          # Server yang sudah di-build
├── public/
│   └── images/           # Static files (copy dari client/public)
├── sqlite.db             # Database (akan dibuat otomatis)
├── .env                  # Environment variables
├── package.json
└── README.md
```

## Environment Variables

Edit file `.env`:

```env
PORT=3000
DATABASE_URL=./sqlite.db
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
```

## Database

Database SQLite akan dibuat otomatis di `sqlite.db`.

Untuk import data dari CSV, jalankan di project utama:
```bash
pnpm tsx scripts/import-articles.ts
```

Lalu copy `sqlite.db` ke folder standalone ini.

## API Endpoints

- `GET /` - Homepage
- `GET /artikel` - Articles page
- `GET /api/trpc/articles.list` - Get all articles (tRPC)
- `POST /api/trpc/articles.create` - Create article
- `POST /api/trpc/articles.update` - Update article
- `POST /api/trpc/articles.delete` - Delete article
- `POST /api/trpc/articles.generate` - Generate article with AI

## Login Credentials

- Email: `sangruhdev@gmail.com`
- Password: `Firedra08!!`

## Dashboard

Setelah login, akses `/dashboard` untuk:
- CRUD Artikel
- Generate Artikel dengan AI

## Troubleshooting

### Error: Cannot find module
Pastikan `node_modules` sudah ter-copy atau sudah `npm install`.

### Error: Database not available
Pastikan `sqlite.db` ada di folder yang sama atau set `DATABASE_URL` di `.env`.

### Error: OPENROUTER_API_KEY not configured
Isi `OPENROUTER_API_KEY` di file `.env` untuk fitur generate artikel.
