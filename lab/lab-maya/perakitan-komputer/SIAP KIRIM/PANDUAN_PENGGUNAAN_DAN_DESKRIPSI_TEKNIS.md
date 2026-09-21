# PANDUAN PENGGUNAAN & DESKRIPSI TEKNIS (USER GUIDE)
**Festival Biru Putih Tahun 2026 — Direktorat SMP, Kemendikdasmen**  
**Kategori Sayembara:** Lab Maya (Bab V Juknis)  
**Judul Karya:** Lab Maya Sistem Komputer: Perakitan PC & Logika Digital  
**Pengembang:** Ach. Chanifuddin Fanani, S.Pd. (SMP Negeri 2 Lamongan)  
**Sasaran Peserta Didik:** Kelas VII, VIII, atau IX SMP (Fase D) — Elemen Sistem Komputer (SK)  

---

## 1. Identitas Karya & Rasional Inovasi

### 1.1 Latar Belakang Masalah
Pembelajaran Informatika pada elemen **Sistem Komputer (SK)** di jenjang SMP seringkali dihadapkan pada keterbatasan sarana laboratorium komputer fisik. Unit PC yang berfungsi sering tidak diizinkan untuk dibongkar-pasang oleh peserta didik karena tingginya risiko kerusakan fisik komponen elektro-mekanik yang mahal (seperti pin soket LGA bengkok, kerusakan statis ESD pada RAM/GPU, atau konsleting daya). Akibatnya, pembelajaran hardware sering kali bergeser menjadi ceramah teoritis atau sekadar melihat gambar pasif pada buku teks.

### 1.2 Solusi Inovasi Melalui Lab Maya
Karya ini hadir sebagai media laboratorium virtual interaktif berbasis web (*Single Page Application*) yang memungkinkan siswa melakukan simulasi perakitan komputer, diagnosa kegagalan hardware (*troubleshooting*), pengujian proses booting BIOS secara real-time, serta eksperimen logika digital (biner, pencampuran warna monitor RGB, dan gerbang logika) secara mandiri, aman, dan tanpa biaya.

---

## 2. Pemetaan Kurikulum & Tujuan Pembelajaran

Karya ini dirancang mengacu pada Keputusan Kepala BSKAP Kemendikbudristek No. **032/H/KR/2024** tentang Capaian Pembelajaran pada Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah:

### 2.1 Capaian Pembelajaran (Fase D — Elemen Sistem Komputer / SK)
> *"Pada akhir fase D, peserta didik mampu mendeskripsikan komponen, fungsi, dan cara kerja komputer yang membentuk sebuah sistem komputasi, serta menjelaskan proses dan penggunaan kodifikasi data (biner, warna RGB) dalam sistem komputer."*

### 2.2 Tujuan Pembelajaran (TP)
1. **TP-01 (Komponen Hardware):** Peserta didik mampu mengidentifikasi komponen utama motherboard modern (CPU LGA, RAM DDR4, SSD M.2, GPU PCIe, PSU ATX) beserta fungsi vitalnya dalam sistem komputer.
2. **TP-02 (Prosedur & Keselamatan Perakitan):** Peserta didik mampu menyimulasikan langkah-langkah perakitan komputer secara runtut, presisi, dan aman sesuai standar teknis.
3. **TP-03 (Analisis & Troubleshooting):** Peserta didik mampu menganalisis ketidakcocokan hardware (distraktor RAM DDR2, HDD IDE kuno) dan menginterpretasikan indikator diagnostik LED POST BIOS.
4. **TP-04 (Kodifikasi Data & Logika Digital):** Peserta didik mampu mengeksplorasi hubungan antara nilai bit biner 8-bit, pencampuran warna 24-bit RGB monitor, dan cara kerja gerbang logika dasar.

---

## 3. Fitur Utama & Panduan Penggunaan Langkah demi Langkah

### 3.1 Layar Utama (Welcome Screen)
- Menampilkan judul karya, pemetaan kurikulum Fase D, identitas instansi SMPN 2 Lamongan, dan logo resmi.
- Klik tombol **▶ MASUK LAB** untuk memulai sesi laboratorium interaktif.

### 3.2 Ruang 1: Rakit Komputer (Motherboard ATX Assembly)
- **Stepper Panduan Dinamis:** Di bagian atas kanvas motherboard, terdapat badge panduan interaktif yang memandu langkah perakitan:
  - *Langkah 1:* Pasang CPU Intel Alder Lake ke soket LGA 1700 di bagian tengah.
  - *Langkah 2:* Pasang RAM DDR4 ke slot memori DIMM (perhatikan orientasi notch).
  - *Langkah 3:* Pasang SSD NVMe M.2 Form Factor 2280 ke slot M.2 berkecepatan tinggi.
  - *Langkah 4:* Pasang Kartu Grafis (GPU) Dual-Fan ke slot ekspansi PCIe x16.
  - *Langkah 5:* Hubungkan kabel daya 24-Pin ATX Power dari PSU ke motherboard.
- **Interaksi Drag & Drop Presisi:** Klik dan tahan komponen dari rak komponen di sebelah kanan, seret ke atas area soket target pada motherboard, lalu lepas. Jika benar, komponen akan terkunci otomatis dengan efek suara klik dan feedback edukatif.
- **Mode Skenario & Uji Masalah:**
  - Tombol **Normal:** Menampilkan komponen yang kompatibel sesuai spesifikasi.
  - Tombol **🔍 Uji Masalah:** Menampilkan komponen distraktor/jebakan (RAM DDR2 lama, HDD IDE pita, Cooler AM3). Cobalah memasangnya untuk melihat sistem diagnosa penolakan dan penjelasan penyebab inkompatibilitas.

### 3.3 Uji Booting BIOS & Diagnostic LED System
- Setelah seluruh 5 komponen terpasang lengkap, tombol **⚡ POWER ON / UJI BOOT** akan aktif.
- Klik tombol tersebut untuk menyimulasikan Power-On Self-Test (POST):
  1. Lampu **LED CPU** menyala hijau (inisialisasi prosesor sukses).
  2. Lampu **LED DRAM** menyala hijau (memori utama siap).
  3. Lampu **LED VGA** menyala hijau (kartu display aktif).
  4. Lampu **LED BOOT** menyala hijau (storage drive terbaca).
  5. Bunyi Beep BIOS sukses berbunyi.
  6. Terminal diagnostik visual memaparkan siklus Von Neumann (*Fetch-Decode-Execute*) secara gamblang.

### 3.4 Ruang 2: Eksplorasi Digital
Tab ini memberikan wahana laboratorium untuk konsep komputasi yang abstrak:
1. **Sakelar Biner 8-Bit:** Klik sakelar untuk mengubah bit (0 atau 1). Amati perubahan nilai bobot bit (128, 64, 32, 16, 8, 4, 2, 1) dan total angka desimal secara real-time. Tersedia pula kuis tebak angka biner.
2. **Pencampur Warna Monitor RGB 24-Bit:** Geser slider Red (0-255), Green (0-255), dan Blue (0-255) untuk melihat representasi biner 24-bit, kode Hexadesimal (`#RRGGBB`), dan warna piksel yang dihasilkan pada layar monitor virtual.
3. **Simulator Gerbang Logika Dasar:** Eksplorasi 6 gerbang logika (AND, OR, NOT, XOR, NAND, NOR) dengan mengubah sakelar input A dan B serta melihat tabel kebenaran (*Truth Table*) dinamis.

### 3.5 Ruang 3: LKPD & Kuis Formatif Interaktif
- Berisi kuis pemahaman konsep, studi kasus kerusakan perangkat keras, dan latihan penalaran digital.
- Dilengkapi penilaian skor otomatis dan pembahasan mendalam pada setiap butir soal.

---

## 4. Spesifikasi Teknis & Kepatuhan Juknis

1. **Arsitektur Single Page Application (SPA):** Seluruh antarmuka dikendalikan dalam satu file `index.html` terpadu dengan manipulasi DOM modern berbasis `style.css` dan `script.js`.
2. **100% Offline (Zero External Dependencies):** Tidak ada koneksi internet yang dibutuhkan saat aplikasi dijalankan. Seluruh jenis huruf (Fredoka, Nunito, Poppins) disimpan secara lokal di `assets/fonts/`.
3. **Web Audio API Engine:** Efek suara klik mekanis, nada frekuensi Beep BIOS, dan nada peringatan dibangun menggunakan osilator audio sintetis bawaan peramban tanpa file audio eksternal.
4. **Respon Cepat & Ringan:** Waktu render instan (< 1 detik), ukuran berkas keseluruhan di bawah 5 MB (sangat jauh di bawah batas maksimal 150 MB pada Juknis).
5. **Standar Rasio Layar 16:9:** Dioptimalkan untuk layar monitor komputer/laptop sekolah dengan responsivitas adaptif terhadap berbagai resolusi (Full HD 1080p, HD 720p).
