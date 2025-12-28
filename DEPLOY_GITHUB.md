# 🚀 Deploy ke GitHub - Panduan Cepat

Ikuti langkah-langkah berikut untuk deploy project ke GitHub:

## 📝 Langkah 1: Add & Commit Changes

```bash
# Add semua perubahan
git add .

# Commit dengan message yang jelas
git commit -m "feat: add modern frontend with TailwindCSS and screenshots

- Add professional frontend with TailwindCSS
- Replace emoji icons with Heroicons SVG
- Add comprehensive documentation
- Add screenshots for README
- Update README with images and features"
```

## 🔗 Langkah 2: Push ke GitHub

### Jika repository sudah ada di GitHub:

```bash
# Push ke branch main
git push origin main
```

### Jika repository belum ada di GitHub:

**1. Buat repository baru di GitHub:**
- Buka https://github.com/new
- Nama repository: `bookshelf-api`
- Jangan centang "Initialize with README" (karena sudah ada)
- Klik "Create repository"

**2. Connect dan push:**

```bash
# Add remote repository (ganti USERNAME dengan username GitHub Anda)
git remote add origin https://github.com/USERNAME/bookshelf-api.git

# Push ke GitHub
git push -u origin main
```

## ✅ Verifikasi

Setelah push berhasil:
1. Buka repository di GitHub
2. README.md akan otomatis ditampilkan dengan screenshot
3. Pastikan semua file ter-upload termasuk folder `screenshots/`

---

## 🎯 Quick Commands (Copy-Paste)

```bash
# 1. Add all changes
git add .

# 2. Commit
git commit -m "feat: add modern frontend with TailwindCSS and screenshots"

# 3. Push (jika sudah ada remote)
git push origin main

# ATAU Push (jika belum ada remote - ganti USERNAME)
git remote add origin https://github.com/USERNAME/bookshelf-api.git
git push -u origin main
```

---

## 🔧 Troubleshooting

### ❌ "fatal: remote origin already exists"

**Solusi:** Remote sudah ada, langsung push saja
```bash
git push origin main
```

### ❌ "error: failed to push some refs"

**Solusi:** Pull dulu, lalu push
```bash
git pull origin main --rebase
git push origin main
```

### ❌ "Permission denied (publickey)"

**Solusi:** Setup SSH key atau gunakan HTTPS dengan token
```bash
# Gunakan HTTPS dengan Personal Access Token
git remote set-url origin https://github.com/USERNAME/bookshelf-api.git
```

---

## 📸 Screenshot yang Akan Ter-upload

✅ `screenshots/homepage.png` - Homepage overview  
✅ `screenshots/add-book-modal.png` - Add book modal  
✅ `screenshots/book-cards.png` - Book cards detail  
✅ `screenshots/search-feature.png` - Search functionality  

Semua screenshot akan otomatis muncul di README GitHub! 🎉
