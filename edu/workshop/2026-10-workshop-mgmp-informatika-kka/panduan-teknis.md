# 🚀 PANDUAN TEKNIS: PENGEMBANGAN PERSONAL WEBSITE GURU & MEDIA PEMBELAJARAN INTERAKTIF TERINTEGRASI CLOUDFLARE WORKERS
### Bimbingan Teknis MGMP Informatika & KKA Kabupaten Lamongan — Oktober 2026
**Narasumber / Fasilitator:** Ach. Chanifuddin Fanani, S.Pd.  
**Ekosistem:** Antigravity IDE (Standalone) + Cloudflare Workers (Hosting & API) + Cloudflare D1 SQL Database

---

## 📌 Konsep Ekosistem & Arsitektur Sistem

- **Tujuan Pengembangan**: Setiap pendidik menghasilkan sebuah **Personal Website resmi** yang berfungsi sebagai representasi profesional guru sekaligus menjadi portal yang memuat minimal **1 Media Pembelajaran Interaktif (MPI)** yang terhubung langsung ke basis data nilai siswa secara terpusat (*scalable multi-MPI*).
- **Cloudflare Workers**: Platform komputasi awan *serverless* terdistribusi global yang melayani hosting aset antarmuka website (*static assets*) dengan latensi rendah (&lt; 30ms) dan enkripsi SSL/HTTPS otomatis, sekaligus menangani backend endpoint API untuk memproses data evaluasi siswa.
- **Cloudflare D1 SQL Database**: Layanan basis data relasional berbasis SQLite yang terdistribusi secara global. Dilengkapi antarmuka visual penampil tabel bawaan di dashboard (tab *Explore/Data* yang memiliki fungsionalitas mirip phpMyAdmin).

---

## 📥 Tahap 1: Unduh Antigravity IDE (Standalone) & Siapkan Folder Kerja

1. Unduh installer resmi **Antigravity IDE (Standalone)**: [https://antigravity.google/download](https://antigravity.google/download)
   *(Pastikan memilih varian Standalone agar seluruh dependensi eksekusi AI dan integrasi lingkungan kerja lokal langsung siap digunakan).*
2. **Sambil menunggu proses instalasi**, siapkan satu direktori kerja baru di komputer:
   ```text
   📁 Web_Guru_Informatika/
   ├── functions/
   │   └── api/
   │       └── evaluasi.js      ← Backend Cloudflare Worker (dihasilkan oleh AI di Tahap 3)
   ├── specification.md         ← Berkas acuan spesifikasi teknis untuk AI (unduh dari web workshop)
   ├── foto-guru.jpg            ← Foto profil resmi pendidik (gunakan foto Anda sendiri dari komputer)
   ├── logo-sekolah.png         ← Logo resmi sekolah (format PNG transparan, opsional)
   ├── index.html               ← Berkas personal website & media belajar (dihasilkan oleh AI di Tahap 3)
   └── rekap.html               ← Berkas dashboard rekapitulasi nilai publik (dihasilkan oleh AI di Tahap 3)
   ```
3. Buka direktori `Web_Guru_Informatika` di Antigravity IDE (**File → Open Folder**).

---

## 🗄️ Tahap 2: Inisialisasi Basis Data Cloudflare D1 & Skema Multi-MPI

1. Masuk ke dashboard Cloudflare: [dash.cloudflare.com](https://dash.cloudflare.com).
2. Di bilah menu kiri: **Storage & Databases ➔ D1 SQL Database ➔ Create database**.
3. Tentukan nama database Anda (bebas, misalnya: `mgmp`, `db_sekolah`, atau `portofolio_guru`) ➔ Klik **Create**.
4. Masuk ke database tersebut ➔ Buka tab **Console** (atau *Query*), lalu jalankan kueri SQL pembuatan tabel berikut:

```sql
CREATE TABLE IF NOT EXISTS nilai_evaluasi (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    media_id TEXT NOT NULL,
    judul_materi TEXT NOT NULL,
    nama_siswa TEXT NOT NULL,
    kelas TEXT NOT NULL,
    skor INTEGER NOT NULL,
    waktu DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

*(Catatan: Kolom `media_id` dan `judul_materi` memastikan basis data yang sama siap menampung hasil kuis dari modul-modul media pembelajaran berikutnya tanpa perlu membuat tabel baru).*

---

## 💬 Tahap 3: Generasi Personal Website, Dashboard Rekapitulasi, & Backend API via AI (Antigravity IDE)

Buka panel AI Agent di Antigravity IDE, lalu cukup ketikkan satu perintah langsung:

```text
Buatkan personal website guru (index.html), modul media pembelajaran interaktif Berpikir Komputasional, halaman dashboard rekapitulasi nilai publik (rekap.html), dan backend API Cloudflare Workers (functions/api/evaluasi.js) sesuai panduan specification.md, foto-guru.jpg, dan logo-sekolah.png yang ada di folder ini.
```

- AI Agent membaca dokumen `specification.md` dan secara otomatis menyusun tiga berkas utama:
  1. `index.html`: Personal website profil pendidik, showcase media pembelajaran (*multi-MPI ready*), modul Berpikir Komputasional (4 pilar kontekstual), simulator logika interaktif, serta kuis evaluasi 5 soal formatif dengan kalkulasi otomatis dan pengiriman data ke endpoint serverless lokal `/api/evaluasi`.
  2. `rekap.html`: Halaman dashboard rekapitulasi nilai evaluasi publik (tanpa login/autentikasi) yang mengambil data nilai siswa secara langsung dari `/api/evaluasi`, dilengkapi kartu ringkasan KPI (total siswa, rata-rata kelas, nilai tertinggi), fitur pencarian nama siswa, filter modul materi (`media_id`), dan tombol refresh data.
  3. `functions/api/evaluasi.js`: Serverless backend API Worker (Cloudflare Pages Functions) yang langsung menangani kueri SQL insert (`POST`) dan select (`GET`) ke basis data D1 (`env.DB`).
- **Uji Coba Pratinjau Lokal**: Buka tab *Integrated Browser Preview* di Antigravity IDE (atau klik ganda `index.html` dan `rekap.html` di File Explorer) untuk memvalidasi tampilan dan fungsi interaktif sebelum diunggah ke internet.

---

## 🚀 Tahap 4: Publikasi Aset Web ke Cloudflare Workers (Direct Upload)

1. Buka dashboard Cloudflare ➔ **Workers & Pages ➔ Create application ➔ Tab Pages**.
2. Pilih opsi **"Upload assets"** (Direct Upload) ➔ Masukkan nama proyek (misal: `guru-informatika-smpn2`) ➔ Klik **Create project**.
3. Seret (*drag & drop*) folder kerja `Web_Guru_Informatika` ke area upload browser.
4. Klik **Deploy site**. Dalam hitungan detik, situs resmi Anda telah terbit secara daring dengan domain resmi aktif bertautan SSL HTTPS:
   `https://guru-informatika-smpn2.pages.dev`
5. **Hubungkan Binding Database D1**: Buka proyek Pages di dashboard Cloudflare ➔ **Settings ➔ Functions ➔ D1 database bindings ➔ Add binding**. Isi Variable name: `DB`, pilih database D1 Anda (misal: `mgmp`), lalu klik **Save**.

---

## 📊 Tahap 5: Pengujian Alur Data & Pemantauan Rekapitulasi Nilai Siswa

1. **Uji Pengiriman Nilai Siswa**: Akses tautan website aktif Anda (`https://[nama-proyek].pages.dev`), isi data identitas siswa pada formulir evaluasi, selesaikan butir kuis, lalu klik **"Periksa & Kirim Nilai ke Database Guru"**.
2. **Pemantauan via Dashboard Publik (`rekap.html`)**: Buka tautan publik `https://[nama-proyek].pages.dev/rekap.html`. Nilai siswa yang baru saja dikirimkan akan langsung muncul pada tabel rekapitulasi dan memperbarui kartu statistik (rata-rata dan skor tertinggi) secara otomatis tanpa perlu membuka database.
3. **Pemantauan via Cloudflare D1 Dashboard**: Pendidik juga dapat memeriksa data mentah langsung di Cloudflare:
   **Storage & Databases ➔ D1 SQL Database ➔ [nama database Anda] ➔ Tab Explore / Data**. Seluruh transaksi data tercatat rapi dalam tabel visual yang siap ditelaah atau disalin ke spreadsheet.
