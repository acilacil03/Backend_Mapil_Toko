# 🚀 Backend REST API - Toko Baju Cloth Store (CRUD MAPIL)

Backend REST API berbasis **Express.js** dan **MySQL** untuk menghubungkan katalog baju dan autentikasi user ke frontend Next.js.

---

## 🛠️ Tech Stack
- **Runtime**: Node.js (ES Module `type: module`)
- **Framework**: Express.js
- **Database**: MySQL (Aiven Cloud / Local MySQL) via `mysql2/promise`
- **Middleware**: `cors`, `dotenv`, `express.json()`

---

## 📂 Struktur Folder
```text
backend_project_mapil_crud/
├── controllers/
│   ├── authController.js       # Logika login & registrasi user
│   └── productController.js    # Logika CRUD produk katalog baju
├── routes/
│   ├── authRoutes.js           # Endpoint autentikasi
│   └── productRoutes.js        # Endpoint CRUD produk
├── lib/
│   └── db.js                   # Konfigurasi koneksi MySQL Pool & SSL
├── .env                        # Variabel lingkungan (port & kredensial DB)
├── .env.example                # Template konfigurasi .env
├── package.json                # Dependensi dan script NPM
├── schema.sql                  # Skema database MySQL
├── server.js                   # File utama server Express
├── test-api.js                 # Script verifikasi koneksi database
├── test-endpoints.js           # Script pengujian otomatis seluruh endpoint
└── test-runner.js              # Runner otomatis pengujian server
```

---

## 🚀 Cara Menjalankan Backend

### 1. Install Dependensi
Buka terminal di folder backend dan jalankan:
```bash
npm install
```

### 2. Konfigurasi Environment (`.env`)
File `.env` sudah otomatis dikonfigurasikan:
```env
PORT=5000
DB_HOST=mysql-2ebfaad-project-mapil.l.aivencloud.com
DB_USER=avnadmin
DB_PASSWORD=AVNS_PSlz9WCNVG6HpCVQrNR
DB_NAME=defaultdb
DB_PORT=23649
```

### 3. Uji Koneksi Database (Opsional)
```bash
node test-api.js
```

### 4. Jalankan Server
- **Mode Development (Auto-Reload saat ada perubahan kode)**:
  ```bash
  npm run dev
  ```
- **Mode Production**:
  ```bash
  npm start
  ```

Server akan aktif di: **`http://localhost:5000`**

---

## 📑 Dokumentasi Endpoint REST API

### 🔐 1. Autentikasi
| Method | Endpoint | Body | Deskripsi |
|---|---|---|---|
| `POST` | `/api/login` | `{ email, password }` | Login akun user |
| `POST` | `/api/register` | `{ name, email, password }` | Registrasi akun baru |

**Contoh Response Login Berhasil (200 OK):**
```json
{
  "message": "Login berhasil!",
  "user": {
    "id": 3,
    "name": "Raka",
    "email": "rakaraka48246@gmail.com"
  }
}
```

---

### 👕 2. CRUD Produk (Katalog Baju)
| Method | Endpoint | Parameter / Body | Deskripsi |
|---|---|---|---|
| `GET` | `/api/product` | Query: `?search=...&category=...` | Ambil semua produk katalog |
| `GET` | `/api/product/:id` | Param: `id` | Ambil detail satu produk |
| `POST` | `/api/product` | `{ name, category, price, stock, size, description, image_url }` | Tambah baju baru ke katalog |
| `PUT` | `/api/product/:id` *(atau `/api/product`)* | `{ id, name, category, price, stock, size, description, image_url }` | Perbarui data produk |
| `DELETE` | `/api/product/:id` *(atau `?id=...`)* | Param/Query `id` | Hapus produk dari database |

---

## 🔗 Hubungan dengan Frontend Next.js
Frontend di `project_mapil_crud` sudah dihubungkan secara otomatis melalui environment variable:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
Seluruh aksi pada frontend (Login, Register, Lihat Produk, Tambah Baju, Edit Baju, Hapus Baju) akan langsung memanggil endpoint di backend Express ini secara realtime!
