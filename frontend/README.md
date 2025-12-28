# Bookshelf Frontend

Aplikasi web modern untuk mengelola koleksi buku pribadi. Dibangun dengan Vanilla JavaScript, HTML5, dan CSS3.

## Fitur

✨ **Manajemen Buku Lengkap**
- Tambah buku baru dengan form yang lengkap
- Edit data buku yang sudah ada
- Hapus buku dengan konfirmasi
- Lihat detail dan progress membaca

📊 **Dashboard Statistik**
- Total koleksi buku
- Buku yang sedang dibaca
- Buku yang sudah selesai dibaca
- Buku yang belum dibaca

🔍 **Pencarian & Filter**
- Cari buku berdasarkan judul (real-time)
- Filter berdasarkan status membaca
- Filter berdasarkan status selesai
- Kombinasi multiple filter

🎨 **Desain Modern**
- Gradient colors yang menarik
- Animasi smooth dan micro-interactions
- Glassmorphism effects
- Responsive design (mobile-friendly)
- Toast notifications

## Cara Menjalankan

### 1. Jalankan Backend Server

Pastikan backend API sudah berjalan di `http://localhost:9000`:

```bash
cd ..
npm run start
```

### 2. Buka Frontend

Buka file `index.html` di browser Anda. Anda bisa:

**Opsi 1: Langsung buka file**
- Double-click file `index.html`
- Atau drag & drop ke browser

**Opsi 2: Menggunakan Live Server (Recommended)**

Jika menggunakan VS Code:
1. Install extension "Live Server"
2. Right-click pada `index.html`
3. Pilih "Open with Live Server"

**Opsi 3: Menggunakan Python HTTP Server**

```bash
# Python 3
python -m http.server 8080

# Buka browser ke http://localhost:8080
```

**Opsi 4: Menggunakan Node.js HTTP Server**

```bash
# Install http-server globally
npm install -g http-server

# Jalankan server
http-server -p 8080

# Buka browser ke http://localhost:8080
```

## Struktur File

```
frontend/
├── index.html          # Halaman utama
├── css/
│   └── styles.css      # Semua styling
├── js/
│   ├── app.js          # Logic utama & API integration
│   ├── components.js   # UI components
│   └── utils.js        # Helper functions
└── README.md           # Dokumentasi ini
```

## Teknologi

- **HTML5** - Semantic markup
- **CSS3** - Modern styling dengan variables, gradients, animations
- **Vanilla JavaScript (ES6+)** - No framework, pure JavaScript
- **Fetch API** - Komunikasi dengan backend
- **Google Fonts** - Inter & Outfit

## Browser Support

- Chrome (recommended)
- Firefox
- Edge
- Safari
- Opera

## Screenshot

Frontend ini menampilkan:
- Header dengan logo dan tombol tambah buku
- Dashboard statistik dengan 4 kartu (Total, Sedang Dibaca, Selesai, Belum Dibaca)
- Search bar dan filter dropdown
- Grid buku dengan kartu yang menarik
- Modal form untuk tambah/edit buku
- Toast notifications untuk feedback

## API Endpoints

Frontend berkomunikasi dengan endpoints berikut:

- `GET /books` - Ambil semua buku (dengan query params untuk filter)
- `GET /books/{id}` - Ambil detail buku
- `POST /books` - Tambah buku baru
- `PUT /books/{id}` - Update buku
- `DELETE /books/{id}` - Hapus buku

## Catatan

- Pastikan backend server berjalan sebelum membuka frontend
- CORS sudah dikonfigurasi di backend untuk mengizinkan akses dari frontend
- Data disimpan di memory (akan hilang saat server restart)

## Troubleshooting

**Problem: "Failed to fetch" error**
- Pastikan backend server berjalan di `http://localhost:9000`
- Cek console browser untuk error detail

**Problem: CORS error**
- Pastikan backend sudah dikonfigurasi dengan CORS
- File `server.js` sudah include CORS configuration

**Problem: Styling tidak muncul**
- Pastikan file CSS di folder `css/styles.css`
- Cek path di `index.html`

**Problem: JavaScript error**
- Buka Developer Console (F12)
- Lihat error message untuk debugging
