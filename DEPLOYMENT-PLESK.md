# 🚀 Panduan Deploy di Plesk (Tanpa SSH)

## Langkah-langkah Deploy di Plesk

### 1️⃣ Upload Files

Login ke Plesk → **File Manager** → Upload file-file berikut ke folder domain Anda (biasanya `/httpdocs` atau `/subdomains/your-domain/httpdocs`):

```
✅ dist/ (folder beserta isinya)
✅ dist/public/ (harus ada!)
✅ node_modules/ (upload folder ini juga!)
✅ sqlite.db
✅ package.json
✅ ecosystem.config.js
✅ .env (buat file baru)
```

> **PENTING:** Karena tidak ada SSH, Anda harus upload `node_modules` dari komputer lokal ke hosting.
> 
> **Cara:** Di lokal, zip folder `node_modules`, upload ke Plesk, lalu extract di File Manager.

---

### 2️⃣ Buat File `.env`

Buat file baru bernama `.env` di File Manager Plesk dengan isi:

```env
PORT=3000
DATABASE_URL=file:./sqlite.db
OPENROUTER_API_KEY=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
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
NODE_ENV=production
```

---

### 3️⃣ Setup Node.js di Plesk

1. Buka **Plesk Panel**
2. Pilih domain Anda: `stevialmj.my.id`
3. Klik **Node.js** (di bagian "Websites & Domains")
4. Klik **Enable Node.js**
5. Konfigurasi:
   - **Node.js version:** 18.x atau 20.x
   - **Application root:** `/` (atau folder tempat Anda upload files)
   - **Application startup file:** `dist/index.js`
   - **Application environment:** `production`

6. Di bagian **Environment Variables**, tambahkan:

| Variable | Value |
|----------|-------|
| `PORT` | `3000` |
| `DATABASE_URL` | `file:./sqlite.db` |
| `OPENROUTER_API_KEY` | `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` |
| `OPENROUTER_MODEL` | `google/gemini-2.5-flash-lite` |
| `NODE_ENV` | `production` |

7. Klik **OK** atau **Apply**

---

### 4️⃣ Restart Aplikasi

Setelah setup selesai:

1. Di halaman Node.js, klik **Restart Application**
2. Tunggu beberapa detik
3. Status harus berubah menjadi **Running** (titik hijau)

---

### 5️⃣ Test

Buka browser:
- Homepage: `https://stevialmj.my.id/`
- API Test: `https://stevialmj.my.id/api/trpc/articles.list`

Jika API return JSON data, berarti berhasil! ✅

---

## 🔧 Troubleshooting di Plesk

### Error 503 - Service Unavailable

**Penyebab:** Aplikasi Node.js tidak berjalan

**Solusi:**
1. Buka **Node.js** di Plesk
2. Klik **Restart Application**
3. Cek **Logs** → klik "Open Log" untuk lihat error detail

### Error: Cannot find module

**Penyebab:** `node_modules` belum ter-upload atau tidak lengkap

**Solusi:**
1. Di lokal, buat zip: `zip -r node_modules.zip node_modules/`
2. Upload `node_modules.zip` ke Plesk
3. Extract di File Manager Plesk
4. Restart aplikasi di Node.js panel

### Error: Database not available

**Penyebab:** File `sqlite.db` tidak ada atau path salah

**Solusi:**
1. Pastikan file `sqlite.db` ter-upload ke folder yang sama dengan `dist/index.js`
2. Cek environment variable `DATABASE_URL` = `file:./sqlite.db`

### Error: Permission denied

**Penyebab:** File tidak punya permission yang benar

**Solusi di Plesk:**
1. Di File Manager, select semua file/folder
2. Klik **Change Permissions**
3. Set:
   - Files: `644` (Read-Write for owner, Read for group/others)
   - Folders: `755` (Read-Write-Execute for owner, Read-Execute for group/others)
4. Untuk `sqlite.db`: permission `666` (biar bisa write)

---

## 📝 Checklist Upload ke Plesk

Upload file-file ini ke `/httpdocs` atau folder domain Anda:

- [ ] `dist/index.js`
- [ ] `dist/public/` (folder beserta isi)
- [ ] `node_modules/` (zip dulu, upload, extract di Plesk)
- [ ] `sqlite.db`
- [ ] `package.json`
- [ ] `ecosystem.config.js`
- [ ] `.env` (buat manual di Plesk)

---

## ⚙️ Konfigurasi di Plesk Node.js Panel

```
✅ Node.js version: 18.x atau 20.x
✅ Application root: /
✅ Application startup file: dist/index.js
✅ Application environment: production
```

**Environment Variables:**
```
PORT=3000
DATABASE_URL=file:./sqlite.db
OPENROUTER_API_KEY=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
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
NODE_ENV=production
```

---

## 🆘 Jika Masih Error 503

1. **Cek Logs di Plesk:**
   - Buka **Node.js** panel
   - Klik **Open Log** atau **View Logs**
   - Lihat error message yang muncul

2. **Cek File Structure:**
   Pastikan struktur folder di hosting seperti ini:
   ```
   /httpdocs/
   ├── dist/
   │   ├── index.js
   │   └── public/
   ├── node_modules/
   ├── sqlite.db
   ├── package.json
   └── .env
   ```

3. **Restart Aplikasi:**
   - Buka **Node.js** panel
   - Klik **Restart Application**

4. **Test API Langsung:**
   Buka: `https://stevialmj.my.id/api/trpc/articles.list`
   
   Jika return JSON = ✅ Berhasil
   Jika error 503 = ❌ Lihat logs untuk detail error

---

## 📤 Cara Upload node_modules ke Plesk

Karena `node_modules` banyak file kecil, lebih baik di-zip dulu:

**Di Komputer Lokal:**

Windows (PowerShell):
```powershell
Compress-Archive -Path node_modules -DestinationPath node_modules.zip
```

Mac/Linux:
```bash
zip -r node_modules.zip node_modules/
```

**Di Plesk:**
1. Upload `node_modules.zip` ke File Manager
2. Klik kanan file → **Extract**
3. Tunggu proses extract selesai
4. Delete file zip untuk hemat space

---

## 🎯 Quick Start untuk Plesk

1. **Upload semua files** (termasuk `node_modules.zip`)
2. **Extract** `node_modules.zip` di Plesk
3. **Buat file `.env`** manual di Plesk
4. **Buka Node.js panel** → Enable Node.js
5. **Set startup file:** `dist/index.js`
6. **Add environment variables** (lihat tabel di atas)
7. **Restart Application**
8. **Test:** `https://stevialmj.my.id`

Selesai! 🎉
