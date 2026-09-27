# SPESIFIKASI PENGEMBANGAN PERSONAL WEBSITE GURU & MEDIA PEMBELAJARAN INTERAKTIF
### Lingkungan Pengembangan: Antigravity IDE (Standalone) & Cloudflare Workers

Dokumen ini merupakan acuan spesifikasi teknis untuk agen AI dalam merancang dan menyusun personal website guru yang memuat minimal 1 media pembelajaran interaktif (MPI) terintegrasi Cloudflare Workers dan database SQL Cloudflare D1.

---

## 1. IDENTITAS PENDIDIK & SEKOLAH
- **Nama Pendidik & Gelar** : [Nama Pendidik, Gelar Lengkap]
- **Satuan Pendidikan**     : [Nama Satuan Pendidikan]
- **Mata Pelajaran**        : Informatika / Koding & Kecerdasan Artifisial (KKA)
- **Fase / Jenjang**        : Fase D — SMP / MTs
- **Foto Profil Pendidik**  : Berkas lokal `foto-guru.jpg` (tampilkan dalam avatar lingkaran berbingkai rapi pada hero section profil guru).
- **Logo Sekolah**          : Berkas lokal `logo-sekolah.png` (opsional, tampilkan pada bilah navigasi jika tersedia).

---

## 2. ARSITEKTUR APLIKASI UNTUK CLOUDFLARE WORKERS
1. **Target Deployment**: Ekosistem Cloudflare Workers (mendukung static assets frontend dan integrasi serverless endpoint).
2. **Framework & Tampilan**:
   - Struktur semantik HTML5 dalam 1 file `index.html` (atau terbagi modular jika diperlukan).
   - Tailwind CSS via CDN (`https://cdn.tailwindcss.com`).
   - Google Fonts: Quicksand (heading) dan Inter (teks konten).
   - Tata letak responsif penuh (desktop, tablet, dan smartphone).

---

## 3. STRUKTUR PERSONAL WEBSITE GURU
Halaman utama memuat komponen berikut secara terstruktur:
1. **Bilah Navigasi (Header)**: Logo sekolah, nama personal website pendidik, dan tautan navigasi ke bagian media belajar.
2. **Profil & Rekam Jejak Pendidik (Hero Section)**: Sambutan resmi guru, identitas pengampu mata pelajaran Informatika & KKA, serta visi pembelajaran komputasi di era digital.
3. **Showcase Media Pembelajaran Interaktif**:
   - Bagian utama yang menampilkan media pembelajaran aktif.
   - Dirancang siap mendukung banyak media pembelajaran di masa mendatang (*scalable multi-MPI*).
   - Modul perdana: **Berpikir Komputasional (BK) — 4 Pilar Pemecahan Masalah Digital**.

---

## 4. KONTEN MEDIA PEMBELAJARAN INTERAKTIF PERDANA (BERPIKIR KOMPUTASIONAL)
1. **Identitas Modul**:
   - ID Media / Kode Materi: `bk-01`
   - Judul Modul: Berpikir Komputasional: 4 Pilar Problem Solving
   - Capaian Pembelajaran: Peserta didik mampu menganalisis persoalan menggunakan dekomposisi, pengenalan pola, abstraksi, dan algoritma.
2. **Kartu Materi Interaktif**:
   - 4 pilar disajikan dengan penjelasan lugas dan contoh kontekstual nyata.
3. **Mini-Simulasi Logika Interaktif**:
   - Komponen simulasi berbasis JavaScript langsung pada halaman (misal: simulator logika pengurutan langkah algoritma) yang dapat dimainkan siswa tanpa memuat ulang (*reload*) halaman.

---

## 5. INSTRUMEN EVALUASI & INTEGRASI DATABASE CLOUDFLARE D1
1. **Formulir Peserta Didik**:
   - Input: Nama Lengkap Siswa (wajib diisi).
   - Input: Kelas & Nomor Presensi (wajib diisi).
2. **Instrumen Kuis**:
   - 5 butir soal pilihan ganda berpikir komputasional berkualitas tinggi.
   - Pilihan jawaban interaktif dengan kalkulasi skor otomatis rentang **0 hingga 100**.
3. **Integrasi Pengiriman ke Cloudflare Workers & D1**:
   - Gunakan endpoint lokal serverless `/api/evaluasi` (berjalan langsung pada domain proyek Cloudflare masing-masing tanpa bergantung pada server pihak ketiga).
   - Format data kiriman (*payload*) mengantisipasi banyak media pembelajaran (*multi-MPI*):
     ```javascript
     const payload = {
         media_id: "bk-01",
         judul_materi: "Berpikir Komputasional",
         nama_siswa: namaSiswa,
         kelas: kelasSiswa,
         skor: skorAkhir
     };

     fetch('/api/evaluasi', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(payload)
     });
     ```
   - Tampilkan notifikasi visual konfirmasi pengiriman yang elegan bagi siswa setelah nilai berhasil tersimpan di sistem guru.

---

## 6. BACKEND API CLOUDFLARE WORKERS (functions/api/evaluasi.js)
Buatkan 1 berkas serverless function pada jalur `functions/api/evaluasi.js` (Cloudflare Pages Functions) agar endpoint `/api/evaluasi` otomatis terintegrasi langsung dengan database Cloudflare D1 milik pendidik (`env.DB`):
1. **Method POST (`onRequestPost`)**:
   - Menerima payload JSON: `{ media_id, judul_materi, nama_siswa, kelas, skor }`.
   - Menyimpan data ke tabel `nilai_evaluasi` di basis data D1:
     ```sql
     INSERT INTO nilai_evaluasi (media_id, judul_materi, nama_siswa, kelas, skor)
     VALUES (?, ?, ?, ?, ?)
     ```
   - Mengembalikan respon status sukses berformat JSON.
2. **Method GET (`onRequestGet`)**:
   - Mengambil seluruh data nilai dari basis data D1:
     ```sql
     SELECT * FROM nilai_evaluasi ORDER BY waktu DESC
     ```
   - Mengembalikan daftar data nilai siswa dalam format JSON array.

---

## 7. HALAMAN DASHBOARD REKAPITULASI NILAI PUBLIK (rekap.html)
Halaman ini bersifat **PUBLIK** (terbuka secara langsung tanpa login, tanpa password, dan tanpa autentikasi apapun sehingga mudah dipantau langsung oleh pendidik maupun ditampilkan di proyektor kelas):
1. **Navigasi & Tata Letak**:
   - Header memuat judul: *"Dashboard Rekapitulasi Nilai Evaluasi Siswa"*, identitas sekolah, dan tombol navigasi *"← Kembali ke Beranda"* yang mengarah ke `index.html`.
   - Desain modern bernuansa profesional menggunakan Tailwind CSS via CDN, font Quicksand & Inter.
2. **Ringkasan Statistik (KPI Cards)**:
   - 3 kartu ringkasan visual di bagian atas: **Total Siswa Mengerjakan**, **Rata-Rata Nilai**, dan **Nilai Tertinggi**.
3. **Fitur Filter & Pencarian**:
   - Kolom pencarian instan berdasarkan Nama Siswa.
   - Pilihan filter berdasarkan Modul Pembelajaran / Media ID (`bk-01`, dll.) dan Kelas.
4. **Tabel Data Real-Time**:
   - Mengambil data dari endpoint lokal serverless secara asinkron (*fetch GET*):
     ```javascript
     fetch('/api/evaluasi')
         .then(res => res.json())
         .then(data => renderTabel(data));
     ```
   - Menampilkan kolom: No, Nama Siswa, Kelas, Materi, Skor (dengan lencana/badge warna sesuai kriteria ketuntasan), dan Waktu Pengerjaan.
   - Tombol *"Refresh Data"* untuk memperbarui tabel secara instan tanpa memuat ulang peramban.

---

## 8. PROMPT PERINTAH UNTUK ANTIGRAVITY IDE (STANDALONE)

### A. Prompt Terpadu (Menghasilkan `index.html`, `rekap.html`, dan `functions/api/evaluasi.js` Sekaligus):
```text
Buatkan personal website guru (index.html), modul media pembelajaran interaktif Berpikir Komputasional, halaman dashboard rekapitulasi nilai publik (rekap.html), dan backend API Cloudflare Workers (functions/api/evaluasi.js) sesuai panduan specification.md, foto-guru.jpg, dan logo-sekolah.png yang ada di folder ini.
```

### B. Prompt Khusus Halaman Rekapitulasi Publik (`rekap.html`):
```text
Buatkan halaman dashboard rekapitulasi nilai evaluasi siswa publik (rekap.html) tanpa login atau autentikasi. Ambil data nilai siswa secara asinkron dari endpoint GET /api/evaluasi. Tampilkan kartu KPI ringkasan statistik (Total Siswa, Rata-Rata Kelas, Nilai Tertinggi), tabel data interaktif dengan fitur pencarian nama siswa, filter materi pembelajaran (media_id), dan tombol Refresh Data. Terapkan Tailwind CSS dan Google Fonts yang selaras dengan spesifikasi pada specification.md.
```

