# 🔧 FIX: Error 503 - Node.js Application Tidak Running di Plesk

## ❌ Error yang Terjadi:
```
Connection reset by peer
No such file or directory
Max retries has been reached, 503
```

**Penyebab:** Node.js application tidak start atau crash.

---

## ✅ SOLUSI STEP-BY-STEP

### 1️⃣ Cek Node.js Status di Plesk

1. Login ke **Plesk Panel**
2. Buka **Node.js** untuk domain `stevialmj.my.id`
3. Lihat status:
   - Jika **Not Enabled** → Klik **Enable Node.js**
   - Jika **Stopped** → Klik **Start**
   - Jika **Running** tapi error 503 → Klik **Restart**

---

### 2️⃣ Verifikasi Konfigurasi Node.js

Di panel **Node.js**, pastikan settingan seperti ini:

```
✅ Node.js version:     18.x atau 20.x
✅ Application root:    /
✅ Application startup file: server-mysql.cjs
✅ Application environment: production
```

**⚠️ PENTING:** 
- Startup file HARUS: `server-mysql.cjs` (BUKAN `dist/index.js`)
- Application root: `/` (bukan `/httpdocs`)

---

### 3️⃣ Verifikasi Environment Variables

Di panel Node.js, klik **Environment Variables** dan pastikan ada 9 variables:

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

### 4️⃣ Cek File Structure di File Manager

Buka **File Manager** → `/httpdocs/` atau `/` (tergantung application root):

Pastikan ada file-file ini:
```
✅ server-mysql.cjs        (7.1 KB)
✅ package.json            (567 bytes)
✅ .env                    (304 bytes)
✅ schema.sql              (1.6 KB)
✅ mysql2.zip              (561 KB) - atau folder node_modules/mysql2/
✅ public/                 (folder dengan isi)
```

**Jika tidak ada:**
1. Upload file `plesk-mysql-upload.zip`
2. Extract di tempat
3. Extract juga `mysql2.zip` → harus jadi `node_modules/mysql2/`

---

### 5️⃣ Cek Logs untuk Detail Error

Di panel **Node.js**, klik **Open Log** atau **View Logs**.

**Error yang mungkin muncul:**

#### A. `Cannot find module 'mysql2'`
**Solusi:**
```bash
# Via SSH/Terminal
cd /path/to/hosting
npm install mysql2
```

**Atau manual:**
1. Extract `mysql2.zip` di Plesk File Manager
2. Pastikan jadi folder `node_modules/mysql2/`

#### B. `ER_ACCESS_DENIED_ERROR`
**Solusi:**
1. Cek username/password di Plesk → Databases
2. Update di `.env` dan Environment Variables
3. Restart aplikasi

#### C. `ER_BAD_DB_ERROR`
**Solusi:**
1. Buat database di Plesk → Databases → Add Database
2. Nama: `triwirat_stevia`
3. Restart aplikasi

#### D. `ER_NO_SUCH_TABLE`
**Solusi:**
1. Buka phpMyAdmin
2. Import file `schema.sql`
3. Verify tabel `users` dan `articles` ada
4. Restart aplikasi

---

### 6️⃣ Restart Application

Di panel **Node.js**:
1. Klik **Stop Application**
2. Tunggu 5 detik
3. Klik **Start Application** atau **Restart Application**
4. Tunggu status jadi 🟢 **Running**

---

### 7️⃣ Test API Endpoint

Buka browser:
```
https://stevialmj.my.id/api/trpc/articles.list
```

✅ **Jika return JSON** = Berhasil!

❌ **Jika masih 503** = Lihat logs lagi (step 5)

---

## 🆘 Jika Masih Error

### Opsi A: Via Plesk Panel

1. **Node.js** → **Open Log**
2. Screenshot error message
3. Kirim ke support atau developer

### Opsi B: Via SSH (jika ada access)

```bash
# Cek apakah Node.js running
ps aux | grep node

# Cek logs
tail -f /var/www/vhosts/triwiratama.com/stevialmj.my.id/logs/nodejs.log

# Test manual
cd /var/www/vhosts/triwiratama.com/stevialmj.my.id
node server-mysql.cjs
```

---

## 📋 Checklist Lengkap

- [ ] Database `triwirat_stevia` dibuat di Plesk
- [ ] Schema `schema.sql` di-import ke phpMyAdmin
- [ ] File `server-mysql.cjs` ada di `/httpdocs/`
- [ ] File `package.json` ada
- [ ] File `.env` ada
- [ ] Folder `public/` ada
- [ ] `mysql2` ter-install (atau `mysql2.zip` di-extract)
- [ ] Node.js enabled di Plesk
- [ ] Startup file: `server-mysql.cjs`
- [ ] 9 environment variables ter-set
- [ ] Application di-restart
- [ ] Status: Running (titik hijau)
- [ ] Test API berhasil return JSON

---

## 🎯 Quick Fix Commands (Via SSH)

```bash
# Navigate to hosting directory
cd /var/www/vhosts/triwiratama.com/stevialmj.my.id

# Install mysql2
npm install mysql2

# Test manual
node server-mysql.cjs

# Jika berhasil, restart di Plesk panel
```

---

## 📞 Butuh Bantuan Lebih?

Kirim informasi ini:
1. Screenshot panel **Node.js** (status & configuration)
2. Screenshot **Logs** (error message lengkap)
3. Screenshot **File Manager** (struktur folder)
4. Screenshot **Databases** (database list)

Semoga berhasil! 🚀
