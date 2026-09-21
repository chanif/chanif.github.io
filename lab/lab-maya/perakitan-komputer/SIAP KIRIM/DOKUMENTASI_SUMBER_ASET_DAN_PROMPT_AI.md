# DOKUMENTASI SUMBER ASET, LISENSI, DAN PROMPTING KECERDASAN ARTIFISIAL (AI)
**Festival Biru Putih Tahun 2026 — Direktorat SMP, Kemendikdasmen**  
**Kategori Sayembara:** Lab Maya (Bab V Juknis)  
**Judul Karya:** Lab Maya Sistem Komputer: Perakitan PC & Logika Digital  
**Pengembang:** Ach. Chanifuddin Fanani, S.Pd. (SMP Negeri 2 Lamongan)  

---

## 1. Landasan Kepatuhan Terhadap Panduan Juknis

Dokumen ini disusun sebagai wujud transparansi dan kepatuhan terhadap ketentuan **Petunjuk Teknis Festival Biru Putih 2026**, khususnya:
1. **Bab II Halaman 6 Poin 3e:**  
   > *"Karya dapat memanfaatkan kecerdasan buatan (Artificial Intelligence). Jika dibuat oleh AI perlu dituliskan keterangan serta wajib menyertakan dokumen desain (prompting)."*
2. **Bab V Halaman 21 Ketentuan Media Lab Maya:**  
   > *"Semua aset yang digunakan oleh webpage tersebut tidak diperkenankan mencantumkan aset / URL eksternal dan aplikasi harus berupa Single Page Application (SPA)."*

Seluruh aset yang digunakan dalam media ini bersifat legal, bebas royalti (Royalty-Free / Open Font License), mandiri tanpa ketergantungan CDN eksternal, dan didokumentasikan dengan rinci berikut ini.

---

## 2. Dokumentasi Aset Grafis & Prompt Kecerdasan Artifisial (AI)

| No | Nama Berkas / Aset | Jenis & Format | Metode Pembuatan / Sumber | Dokumentasi Prompting / Keterangan Teknis | Lisensi / Hak Cipta |
|---|---|---|---|---|---|
| 1 | `welcome-bg.jpg` | Background Splash Art (JPG 1920x1080) | AI Generated via Midjourney v6 | **Prompt:** `isometric cybernetic motherboard schematic, glowing blue and cyan neon circuits, clean futuristic high-tech educational laboratory background, dark tech aesthetic, soft depth of field, 8k resolution, photorealistic, minimal visual clutter --ar 16:9 --v 6.0` | Lisensi Komersial & Karya Pengembang (Prompting Asli) |
| 2 | `motherboard-atx.svg` | Main Canvas Perakitan (Vektor SVG) | Pembuatan Vektor Presisi Mandiri (Inkscape & Raw SVG XML) | Diagram motherboard ATX modern lengkap dengan LGA 1700 CPU Socket, 2x DDR4 DIMM Slots (dual-channel), 1x M.2 NVMe slot (PCIe 4.0), 1x PCIe x16 GPU Slot, 24-Pin ATX Main Power connector, dan 4-Phase Diagnostic LED System (CPU, DRAM, VGA, BOOT). | Karya Orisinal Pengembang (Custom Scalable Vector Graphics) |
| 3 | `cpu.svg` | Komponen Hardware Target (Vektor SVG) | Pembuatan Vektor Presisi Mandiri | Prosesor Intel Alder Lake LGA 1700 (bentuk persegi panjang 37.5 x 45 mm, Integrated Heat Spreader perak, logo embos, indikator pin-1 segitiga emas di sudut kiri bawah). | Karya Orisinal Pengembang |
| 4 | `ram.svg` | Komponen Hardware Target (Vektor SVG) | Pembuatan Vektor Presisi Mandiri | Modul RAM DDR4 16GB dengan Heatsink Aluminium Hitam, 288-pin edge connector dengan posisi notch pemisah asimetris standar JEDEC DDR4. | Karya Orisinal Pengembang |
| 5 | `ssd.svg` | Komponen Hardware Target (Vektor SVG) | Pembuatan Vektor Presisi Mandiri | SSD NVMe M.2 Form Factor 2280 dengan stiker spesifikasi PCIe Gen4 x4, NAND Flash chip controller, pin M-Key, dan lubang baut standoff. | Karya Orisinal Pengembang |
| 6 | `gpu.svg` | Komponen Hardware Target (Vektor SVG) | Pembuatan Vektor Presisi Mandiri | Kartu Grafis / GPU Dual Fan Cooler shroud, konektor PCIe x16 gold-plated fingers, bracket logam I/O port belakang (DisplayPort & HDMI). | Karya Orisinal Pengembang |
| 7 | `psu.svg` | Komponen Hardware Target (Vektor SVG) | Pembuatan Vektor Presisi Mandiri | Blok konektor 24-Pin ATX Main Power Supply dengan klip pengait plastik mekanik (latch) dan kabel pita sleeved hitam. | Karya Orisinal Pengembang |
| 8 | `ram_distractor.svg` | Komponen Distraktor (Jebakan Masalah) | Pembuatan Vektor Presisi Mandiri | Modul RAM DDR2 1GB (Legacy). Memiliki 240-pin dan posisi notch tengah yang tidak kompatibel dengan soket DDR4 untuk menguji daya nalar kritis siswa. | Karya Orisinal Pengembang |
| 9 | `hdd_distractor.svg` | Komponen Distraktor (Jebakan Masalah) | Pembuatan Vektor Presisi Mandiri | Harddisk IDE 3.5 inci kuno dengan 40-pin ribbon cable header & molex connector untuk membandingkan teknologi storage modern vs lawas. | Karya Orisinal Pengembang |
| 10 | `cooler_distractor.svg`| Komponen Distraktor (Jebakan Masalah) | Pembuatan Vektor Presisi Mandiri | Heatsink Fan bulat model AM3 (Legacy) dengan bracket pengait klip yang tidak cocok dengan lubang baut soket Intel LGA 1700. | Karya Orisinal Pengembang |

---

## 3. Dokumentasi Tipografi (Font Lokal Offline)

Sesuai ketentuan Juknis yang melarang aset eksternal/CDN, seluruh jenis huruf diunduh dan disimpan secara lokal pada folder `assets/fonts/` dengan definisi CSS `@font-face`:

| Nama Font | Gaya / Varian | Sumber / Author | Format Berkas Lokal | Jenis Lisensi |
|---|---|---|---|---|
| **Fredoka** | Regular (400), SemiBold (600), Bold (700) | Gilbert Bonfim (Google Fonts) | WOFF2 / TTF | SIL Open Font License (OFL) v1.1 |
| **Nunito** | Regular (400), Medium (500), Bold (700) | Vernon Adams (Google Fonts) | WOFF2 / TTF | SIL Open Font License (OFL) v1.1 |
| **Poppins** | Regular (400), Medium (500), SemiBold (600) | Indian Type Foundry (Google Fonts) | WOFF2 / TTF | SIL Open Font License (OFL) v1.1 |

*Catatan: Seluruh font diizinkan untuk digunakan, dimodifikasi, dan didistribusikan secara bebas tanpa royalti menurut ketentuan SIL OFL.*

---

## 4. Dokumentasi Tata Suara (Sintesis Audio 100% Prosedural)

Untuk menjaga ukuran berkas aplikasi tetap sangat ringkas (< 5 MB) dan menjamin kemandirian tanpa file audio eksternal, seluruh tata suara diproduksi secara dinamis menggunakan teknologi **Web Audio API** berbasis browser:

1. **Efek Suara Klik Mekanik & Drop Berhasil (`playDropSound`):**
   - Frekuensi: 587.33 Hz (Nada D5) transisi cepat ke 880 Hz (A5).
   - Tipe Gelombang: Sine Wave dengan envelope gain meluruh (*exponential decay* 0.15 detik).
2. **Efek Peringatan Komponen Salah / Distraktor (`playErrorSound`):**
   - Frekuensi: 150 Hz nada rendah disonansi ganda (Square Wave) selama 0.25 detik.
3. **Efek Suara BIOS Beep Berhasil (`playBeepSound`):**
   - Frekuensi: 950 Hz (Sine Wave jernih) durasi 0.1 detik, menyimulasikan nada standar AMI/Award BIOS saat hardware dinyatakan normal.
4. **Efek Sakelar Biner & Slider RGB (`playToggleSound`):**
   - Frekuensi: 1.200 Hz nada pendek micro-click (Triangle Wave) durasi 0.04 detik.

---

## 5. Pernyataan Bebas Hak Cipta Pihak Ketiga

Dengan ini saya menyatakan bahwa:
1. Seluruh aset grafis vektor (`.svg`) adalah karya digital orisinal yang digambar sendiri oleh pengembang secara terukur dan proporsional.
2. Gambar latar splash (`welcome-bg.jpg`) dihasilkan dari instruksi prompt asli pengembang pada platform generator kecerdasan artifisial berlisensi komersial.
3. Media ini tidak mengambil, menyadur, atau meniru karya berhak cipta milik pihak lain tanpa izin.
4. Media ini bebas dari unsur komersial, promosi merek tertentu, maupun materi berbayar.
