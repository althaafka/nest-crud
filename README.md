# NestJS CRUD dengan Autentikasi JWT

Proyek ini adalah implementasi aplikasi **CRUD (Create, Read, Update, Delete)** menggunakan **NestJS** dengan dukungan **JWT (JSON Web Token)** untuk autentikasi. Aplikasi ini memungkinkan user untuk mendaftar, login, dan membuat post. Setiap user hanya bisa mengedit atau menghapus post miliknya sendiri.

---

## **Fitur**
1. **CRUD User**:
   - Register user baru
   - Login user dengan **JWT Token**
   - Lihat semua user
   - Lihat user berdasarkan id
   - Update bio (oleh user sendiri)
   - Delete user (oleh user sendiri)

2. **CRUD Post**:
   - Buat post baru
   - Lihat semua post
   - Lihat post berdasarkan id
   - Update post (hanya oleh pemilik post)
   - Hapus post (hanya oleh pemilik post)

3. **Proteksi Route**:
   - Endpoint CRUD post dilindungi oleh **JWT Authentication**

---

## **Teknologi yang Digunakan**
- **NestJS** - Framework backend berbasis TypeScript
- **TypeORM** - ORM untuk interaksi dengan database MySQL
- **MySQL** - Database untuk menyimpan data user dan post
- **JWT** - Untuk autentikasi berbasis token
- **Bcrypt** - Untuk hashing dan verifikasi password

---

## **Instalasi**

1. **Clone Repository**:
   ``` 
   git clone <repository-url>
   cd nestjs-crud
2. **Install Dependencies**:
   ``` 
   npm install
3. **Konfigurasi Environment**:
   ``` 
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=username
   DB_PASSWORD=password
   DB_NAME=nestjs_crud
   JWT_SECRET=yourSecretKey
4. **Jalankan Aplikasi**:
   ``` 
   npm run start
---

## **API Endpoint**
Buka dokumentasi Postman online melalui link berikut:  
   [Postman Documentation](https://api.postman.com/collections/29126938-782d7713-cda1-4fda-a9e4-c02e3d9be982?access_key=PMAT-01JA036XAM6V4KZFW2XG5KH5TJ)
- POST /auth/login
- POST /user/register
- GET /user
- GET /user/:id 
- PATCH /user/:id (butuh autentikasi)
- DELETE /user/:id (butuh autentikasi)
- POST /post (butuh autentikasi)
- GET /post
- GET /post/:id
- PATCH /post/:id (butuh autentikasi)
- DELETE /post/:id (butuh autentikasi)
Autentikasi dengan menambahkan header Authorization berikut:
   ``` 
   Authorization: Bearer <your jwt token from login>
---

## **Testing**
Proyek ini dilengkap dengan End-to-End Testing untuk autentikasi. Untuk menjalankan E2E test:
```npm run test:e2e```

---

## **Pattern Project**
Proyek ini menggunakan Modular Monolith Structure, di mana setiap fitur seperti **auth**, **post**, dan **user** disimpan dalam folder terpisah. Setiap folder berisi komponen seperti:

- **Controller**: Mengelola request dan response.
- **Service**: Berisi logika bisnis.
- **Module**: Menggabungkan semua komponen yang dibutuhkan untuk fitur tersebut.
- **Entities**: Representasi tabel database untuk ORM.

Pattern ini dipilih karena memberikan seperation of concerns yang jelas, di mana setiap fitur (seperti auth, post, user) memiliki foldernya sendiri. Hal ini membuat kode lebih mudah dipelihara, dibaca, dan dikelola. Selain itu, struktur modular memungkinkan setiap modul berfungsi secara independen, sehingga kode menjadi lebih terorganisir, terstruktur, dan mudah dikembangkan.
