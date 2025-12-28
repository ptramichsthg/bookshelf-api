# 🚀 Panduan Menjalankan Bookshelf API

Panduan lengkap untuk menjalankan project Bookshelf API secara manual dari awal.

---

## 📋 Persyaratan Sistem

Pastikan Anda sudah menginstall:
- **Node.js** (versi 14 atau lebih baru)
- **npm** (biasanya sudah terinstall bersama Node.js)
- **Browser modern** (Chrome, Firefox, Edge, atau Safari)
- **Text Editor/IDE** (VS Code, Sublime, atau lainnya - opsional)

### Cek Instalasi Node.js dan npm

Buka terminal/command prompt dan jalankan:

```bash
node --version
npm --version
```

Jika muncul nomor versi, berarti sudah terinstall dengan benar.

---

## 📁 Struktur Project

```
Bookshelf API/
├── src/
│   ├── server.js          # Server utama
│   ├── handler.js         # Handler untuk API endpoints
│   ├── routes.js          # Definisi routes
│   └── books.js           # Data storage (array)
├── frontend/
│   ├── index.html         # Halaman utama
│   ├── js/
│   │   ├── app.js         # Logic utama
│   │   ├── components.js  # UI components
│   │   └── utils.js       # Helper functions
│   └── README.md          # Dokumentasi frontend
├── package.json           # Dependencies
└── README.md              # Dokumentasi utama
```

---

## 🔧 Langkah 1: Install Dependencies

### 1.1 Buka Terminal/Command Prompt

**Windows:**
- Tekan `Win + R`, ketik `cmd`, tekan Enter
- Atau buka PowerShell

**Mac/Linux:**
- Buka Terminal

### 1.2 Navigasi ke Folder Project

```bash
cd "d:\Bookshelf API"
```

> **Catatan:** Sesuaikan path dengan lokasi folder project Anda

### 1.3 Install Dependencies

```bash
npm install
```

Tunggu hingga proses selesai. Anda akan melihat folder `node_modules` terbuat.

**Dependencies yang akan terinstall:**
- `@hapi/hapi` - Framework untuk backend server
- `nanoid` - Generate unique ID untuk buku
- `nodemon` - Auto-restart server saat development (devDependencies)
- `eslint` - Linting tool (devDependencies)

---

## 🚀 Langkah 2: Jalankan Backend Server

### 2.1 Jalankan Server (Production Mode)

```bash
npm run start
```

**Atau:**

```bash
node src/server.js
```

### 2.2 Jalankan Server (Development Mode)

Untuk development dengan auto-restart:

```bash
npm run start-dev
```

> **Development mode** menggunakan nodemon yang akan otomatis restart server setiap kali ada perubahan file.

### 2.3 Verifikasi Server Berjalan

Anda akan melihat output:

```
Server berjalan pada http://localhost:9000
```

**Jangan tutup terminal ini!** Server harus tetap berjalan.

### 2.4 Test Backend API (Opsional)

Buka browser dan akses:

```
http://localhost:9000/books
```

Anda akan melihat response JSON:

```json
{
  "status": "success",
  "data": {
    "books": []
  }
}
```

---

## 🌐 Langkah 3: Jalankan Frontend

Ada beberapa cara untuk menjalankan frontend:

### **Opsi 1: Langsung Buka File HTML** ⭐ (Paling Mudah)

1. Buka File Explorer
2. Navigasi ke folder: `d:\Bookshelf API\frontend\`
3. **Double-click** file `index.html`
4. Browser akan terbuka otomatis

### **Opsi 2: Drag & Drop ke Browser**

1. Buka browser (Chrome/Firefox/Edge)
2. Buka File Explorer
3. Drag file `index.html` ke jendela browser

### **Opsi 3: Menggunakan Live Server (VS Code)** ⭐ (Recommended untuk Development)

Jika menggunakan VS Code:

1. Install extension **"Live Server"** by Ritwick Dey
2. Buka folder project di VS Code
3. Klik kanan pada `frontend/index.html`
4. Pilih **"Open with Live Server"**
5. Browser akan terbuka di `http://127.0.0.1:5500/frontend/index.html`

**Keuntungan:** Auto-reload saat ada perubahan file

### **Opsi 4: Menggunakan Python HTTP Server**

Jika Python terinstall:

```bash
# Navigasi ke folder frontend
cd "d:\Bookshelf API\frontend"

# Python 3
python -m http.server 8080

# Python 2 (jarang digunakan)
python -m SimpleHTTPServer 8080
```

Buka browser ke: `http://localhost:8080`

### **Opsi 5: Menggunakan Node.js HTTP Server**

```bash
# Install http-server globally (hanya sekali)
npm install -g http-server

# Navigasi ke folder frontend
cd "d:\Bookshelf API\frontend"

# Jalankan server
http-server -p 8080

# Atau dengan auto-open browser
http-server -p 8080 -o
```

Buka browser ke: `http://localhost:8080`

---

## ✅ Langkah 4: Verifikasi Aplikasi Berjalan

### 4.1 Cek Backend

✅ Terminal menampilkan: `Server berjalan pada http://localhost:9000`  
✅ Akses `http://localhost:9000/books` menampilkan JSON response  

### 4.2 Cek Frontend

✅ Halaman web terbuka dengan tampilan Bookshelf  
✅ Header menampilkan logo dan tombol "Tambah Buku"  
✅ Statistik menampilkan 4 kartu (Total, Sedang Dibaca, Selesai, Belum Dibaca)  
✅ Tidak ada error di browser console (tekan F12 untuk cek)  

### 4.3 Test Fungsionalitas

1. **Klik "Tambah Buku"** - Modal harus terbuka
2. **Isi form dan simpan** - Buku harus muncul di grid
3. **Cek statistik** - Angka harus update otomatis
4. **Test search** - Ketik di search box
5. **Test filter** - Pilih filter status

---

## 🛠️ Troubleshooting

### ❌ Problem: "npm: command not found"

**Solusi:** Node.js belum terinstall atau belum ada di PATH
- Download dan install Node.js dari: https://nodejs.org/
- Restart terminal setelah install

### ❌ Problem: "Error: Cannot find module '@hapi/hapi'"

**Solusi:** Dependencies belum terinstall
```bash
cd "d:\Bookshelf API"
npm install
```

### ❌ Problem: "Port 9000 already in use"

**Solusi:** Ada aplikasi lain yang menggunakan port 9000

**Cara 1:** Matikan aplikasi yang menggunakan port tersebut

**Cara 2:** Ubah port di `src/server.js`:
```javascript
const server = Hapi.server({
    port: 3000,  // Ubah dari 9000 ke 3000
    host: 'localhost',
    // ...
});
```

Jangan lupa update juga di `frontend/js/app.js`:
```javascript
const API_BASE_URL = 'http://localhost:3000';  // Ubah dari 9000
```

### ❌ Problem: "Failed to fetch" di Frontend

**Solusi:** Backend server belum berjalan
- Pastikan terminal backend masih running
- Cek `http://localhost:9000/books` di browser
- Pastikan tidak ada CORS error di console

### ❌ Problem: Frontend tidak menampilkan data

**Solusi 1:** Cek browser console (F12)
- Lihat error message
- Pastikan tidak ada JavaScript error

**Solusi 2:** Cek network tab
- Buka DevTools (F12) → Tab Network
- Refresh halaman
- Lihat apakah request ke API berhasil

**Solusi 3:** Hard refresh browser
- Windows: `Ctrl + Shift + R` atau `Ctrl + F5`
- Mac: `Cmd + Shift + R`

### ❌ Problem: "EADDRINUSE" Error

**Solusi:** Server sudah running di terminal lain
- Cari terminal yang menjalankan server
- Tekan `Ctrl + C` untuk stop
- Jalankan ulang

---

## 🔄 Cara Menghentikan Aplikasi

### Stop Backend Server

Di terminal yang menjalankan server:
- Tekan `Ctrl + C`
- Ketik `Y` jika diminta konfirmasi

### Stop Frontend

- Tutup tab browser
- Jika menggunakan Live Server/HTTP Server, stop server di terminal dengan `Ctrl + C`

---

## 📝 Cara Menggunakan Aplikasi

### 1. Tambah Buku Baru

1. Klik tombol **"Tambah Buku"** di header
2. Isi form:
   - **Judul Buku** (wajib)
   - **Penulis** (wajib)
   - **Tahun Terbit** (wajib)
   - **Penerbit** (wajib)
   - **Ringkasan** (opsional)
   - **Jumlah Halaman** (wajib)
   - **Halaman Dibaca** (wajib)
   - **Centang** jika sedang membaca
3. Klik **"Simpan Buku"**
4. Buku akan muncul di grid

### 2. Edit Buku

1. Klik tombol **"Edit"** pada kartu buku
2. Ubah data yang diperlukan
3. Klik **"Update Buku"**

### 3. Hapus Buku

1. Klik tombol **"Hapus"** pada kartu buku
2. Konfirmasi penghapusan
3. Buku akan dihapus dari daftar

### 4. Cari Buku

- Ketik judul buku di search box
- Hasil akan filter otomatis (debounced 500ms)

### 5. Filter Buku

- **Filter Status Baca:** Pilih "Sedang Dibaca" atau "Tidak Sedang Dibaca"
- **Filter Status Selesai:** Pilih "Sudah Selesai" atau "Belum Selesai"
- Filter bisa dikombinasikan

---

## 💡 Tips & Tricks

### Development Tips

1. **Gunakan nodemon** untuk auto-restart backend:
   ```bash
   npm run start-dev
   ```

2. **Gunakan Live Server** untuk auto-reload frontend

3. **Buka DevTools** (F12) untuk debugging:
   - Console: Lihat error JavaScript
   - Network: Monitor API calls
   - Elements: Inspect HTML/CSS

### Data Persistence

⚠️ **PENTING:** Data buku disimpan di **memory** (array di `src/books.js`)

**Artinya:**
- Data akan **hilang** saat server restart
- Untuk data permanen, perlu database (MongoDB, PostgreSQL, dll)

### Testing API dengan Postman/Thunder Client

**GET All Books:**
```
GET http://localhost:9000/books
```

**GET Single Book:**
```
GET http://localhost:9000/books/{bookId}
```

**POST Add Book:**
```
POST http://localhost:9000/books
Content-Type: application/json

{
  "name": "Laskar Pelangi",
  "year": 2005,
  "author": "Andrea Hirata",
  "summary": "Novel tentang pendidikan",
  "publisher": "Bentang Pustaka",
  "pageCount": 529,
  "readPage": 100,
  "reading": true
}
```

**PUT Update Book:**
```
PUT http://localhost:9000/books/{bookId}
Content-Type: application/json

{
  "name": "Laskar Pelangi",
  "year": 2005,
  "author": "Andrea Hirata",
  "summary": "Novel tentang pendidikan",
  "publisher": "Bentang Pustaka",
  "pageCount": 529,
  "readPage": 529,
  "reading": false
}
```

**DELETE Book:**
```
DELETE http://localhost:9000/books/{bookId}
```

---

## 📚 Dokumentasi Tambahan

- **Backend README:** `d:\Bookshelf API\README.md`
- **Frontend README:** `d:\Bookshelf API\frontend\README.md`
- **API Endpoints:** Lihat `src/routes.js`
- **Handler Logic:** Lihat `src/handler.js`

---

## 🎯 Quick Start (Ringkasan)

```bash
# 1. Install dependencies
cd "d:\Bookshelf API"
npm install

# 2. Jalankan backend
npm run start

# 3. Buka frontend
# Double-click: frontend/index.html
# Atau buka di browser: file:///d:/Bookshelf%20API/frontend/index.html

# 4. Mulai gunakan aplikasi!
```

---

## ✨ Selamat!

Aplikasi Bookshelf API Anda sudah berjalan! 🎉

Jika ada pertanyaan atau masalah, cek bagian Troubleshooting di atas.
