# 🚀 DEPLOY MYSQL DI PLESK - PANDUAN LENGKAP

## ✅ File yang Harus Diupload ke Plesk

Upload file-file berikut ke `/httpdocs/` di Plesk:

```
✅ server-mysql.js          ← Server baru untuk MySQL
✅ dist/public/             ← Folder static files (WAJIB!)
✅ node_modules/            ← Zip dulu, upload, extract di Plesk
✅ package.json             ← Updated dengan mysql2
✅ ecosystem.config.js      ← Updated untuk MySQL
✅ .env                     ← Updated dengan MySQL credentials
✅ schema.sql               ← Script untuk create tabel
✅ MYSQL-DEPLOY.md          ← File ini
```

---

## 📋 LANGKAH-LANGKAH DEPLOY

### 1️⃣ Buat Database di Plesk

1. Login ke **Plesk Panel**
2. Buka **Databases**
3. Klik **Add Database**
4. Isi:
   - **Database name:** `triwirat_stevia`
   - **Database type:** `MySQL`
   - **Database user:** `stevialmj`
   - **Password:** `stevia1117!!`
5. Klik **OK**

---

### 2️⃣ Import Database Schema

1. Buka **phpMyAdmin** (dari Plesk Databases)
2. Pilih database `triwirat_stevia`
3. Klik tab **SQL**
4. Copy-paste isi file `schema.sql`
5. Klik **Go**

**Atau upload file:**

1. Tab **Import**
2. Upload file `schema.sql`
3. Klik **Go**

**Verifikasi:**
- Pastikan ada 2 tabel: `users` dan `articles`

---

### 3️⃣ Upload Files ke Plesk

**Di Plesk File Manager:**

1. Buka `/httpdocs/`
2. Upload file-file berikut:
   - `server-mysql.js`
   - `package.json`
   - `ecosystem.config.js`
   - `.env`
   - `dist/public/` (folder)
   - `node_modules.zip` (upload, lalu extract)

**Cara upload node_modules:**

1. Di komputer lokal, zip: `zip -r node_modules.zip node_modules/`
2. Upload `node_modules.zip` ke Plesk
3. Di Plesk, klik kanan `node_modules.zip` → **Extract**
4. Delete file zip setelah extract

---

### 4️⃣ Setup Node.js di Plesk

1. Buka **Node.js** di Plesk
2. Klik **Enable Node.js**
3. Konfigurasi:
   - **Node.js version:** 18.x atau 20.x
   - **Application root:** `/`
   - **Application startup file:** `server-mysql.js` ⚠️ BUKAN dist/index.js
   - **Application environment:** `production`

---

### 5️⃣ Environment Variables

Di panel **Node.js**, tambahkan variables:

| Variable | Value |
|----------|-------|
| `PORT` | `3000` |
| `DATABASE_URL` | `mysql://stevialmj:stevia1117!!@localhost/triwirat_stevia` |
| `DB_HOST` | `localhost` |
| `DB_USER` | `stevialmj` |
| `DB_PASSWORD` | `stevia1117!!` |
| `DB_NAME` | `triwirat_stevia` |
| `OPENROUTER_API_KEY` | `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` |
| `OPENROUTER_MODEL` | `google/gemini-2.5-flash-lite` |
| `NODE_ENV` | `production` |

---

### 6️⃣ Install Dependencies

Jika ada **SSH access**:

```bash
cd /path/to/httpdocs
npm install --production
```

**Jika tidak ada SSH:**

Upload `node_modules` yang sudah di-zip dari lokal (sudah include mysql2).

Atau install manual via Plesk **PHP/Node.js selector** atau **Terminal**.

---

### 7️⃣ Restart Aplikasi

1. Di panel **Node.js**, klik **Restart Application**
2. Tunggu status jadi 🟢 **Running**

---

### 8️⃣ Test

Buka browser:

```
https://stevialmj.my.id/api/trpc/articles.list
```

✅ Jika return JSON data = **BERHASIL!**

❌ Jika error 503 = Lihat troubleshooting di bawah

---

## 🔧 TROUBLESHOOTING

### Error 503 - Service Unavailable

**Penyebab:** Aplikasi tidak berjalan

**Solusi:**
1. Buka **Node.js** panel
2. Klik **Restart Application**
3. Cek **Logs** untuk detail error

---

### Error: ER_ACCESS_DENIED_ERROR

**Penyebab:** Username/password salah

**Solusi:**
1. Cek credentials di Plesk → Databases
2. Update di `.env` dan Node.js environment variables
3. Restart aplikasi

---

### Error: ER_BAD_DB_ERROR

**Penyebab:** Database belum ada

**Solusi:**
1. Buat database di Plesk → Databases → Add Database
2. Nama: `triwirat_stevia`
3. Restart aplikasi

---

### Error: ER_NO_SUCH_TABLE

**Penyebab:** Tabel belum di-create

**Solusi:**
1. Buka phpMyAdmin
2. Import file `schema.sql`
3. Verify tabel `users` dan `articles` ada
4. Restart aplikasi

---

### Error: Cannot find module 'mysql2'

**Penyebab:** mysql2 belum ter-install

**Solusi:**
1. Upload `node_modules` yang sudah include mysql2
2. Atau install via SSH: `npm install mysql2`
3. Restart aplikasi

---

### Error: Connection refused

**Penyebab:** MySQL tidak berjalan atau host salah

**Solusi:**
1. Cek database status di Plesk → Databases (harus aktif)
2. Coba ganti `DB_HOST` jadi `127.0.0.1`
3. Restart aplikasi

---

## 📊 Verifikasi Database

Di **phpMyAdmin**:

```sql
-- Cek tabel
SHOW TABLES;

-- Cek articles
SELECT id, title, category FROM articles LIMIT 5;

-- Cek users
SELECT id, name, email, role FROM users LIMIT 5;
```

---

## 📝 Checklist Deploy

- [ ] Database `triwirat_stevia` dibuat
- [ ] User `stevialmj` dengan password `stevia1117!!` dibuat
- [ ] File `schema.sql` di-import (tabel users & articles ada)
- [ ] Upload `server-mysql.js` ke `/httpdocs/`
- [ ] Upload `dist/public/` folder
- [ ] Upload `node_modules` (include mysql2)
- [ ] Upload `package.json`, `ecosystem.config.js`, `.env`
- [ ] Node.js enabled di Plesk
- [ ] Startup file: `server-mysql.js`
- [ ] 9 environment variables ter-set
- [ ] Aplikasi di-restart
- [ ] Status: Running (titik hijau)
- [ ] Test API endpoint berhasil

---

## 🎯 Quick Test Commands

**Test koneksi (jika ada SSH):**

```bash
mysql -u stevialmj -p -h localhost triwirat_stevia
# Password: stevia1117!!
```

**Test API:**

```bash
curl https://stevialmj.my.id/api/trpc/articles.list
```

**Cek logs di Plesk:**

Buka **Node.js** → **Open Log**

---

## 🆘 Jika Masih Error

Kirim informasi ini:

1. **Screenshot Node.js panel** (status & environment variables)
2. **Error logs** dari Node.js panel
3. **Screenshot database** di Plesk (Databases list)
4. **Screenshot File Manager** (struktur folder /httpdocs/)

---

## ⚠️ PENTING

**Startup file HARUS:** `server-mysql.js` (BUKAN `dist/index.js`)

File `server-mysql.js` sudah include:
- ✅ MySQL connection
- ✅ tRPC routes untuk articles
- ✅ Static file serving
- ✅ Error handling

---

## 📞 Support

Jika ada masalah, screenshot:
1. Error di browser
2. Logs di Node.js panel
3. Database di Plesk
4. File structure di File Manager

Semoga berhasil! 🚀
