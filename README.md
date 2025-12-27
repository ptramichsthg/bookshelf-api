# Bookshelf API

API sederhana untuk mengelola data buku. Dibuat menggunakan Hapi framework untuk submission Dicoding.

## Cara Menjalankan

Install dependencies:
```bash
npm install
```

Jalankan server:
```bash
npm run start
```

Untuk development (auto-restart):
```bash
npm run start-dev
```

Server akan berjalan di `http://localhost:9000`

## Endpoints

- `POST /books` - Menambah buku baru
- `GET /books` - Mendapatkan semua buku
- `GET /books/{bookId}` - Mendapatkan detail buku
- `PUT /books/{bookId}` - Mengubah data buku
- `DELETE /books/{bookId}` - Menghapus buku
