# Panduan Penggunaan & Deskripsi Teknis Laboratorium Maya
**Festival Biru Putih 2026 — Direktorat SMP, Kemendikdasmen**

---

### Identitas Karya & Peserta
- **Judul Karya:** Lab Maya Sistem Komputer: Perakitan PC & Logika Digital
- **Kategori Sayembara:** Lab Maya (Bab V Juknis Festival Biru Putih 2026)
- **Nama Pengembang:** Ach. Chanifuddin Fanani, S.Pd.
- **Unit Kerja:** SMP Negeri 2 Lamongan, Jawa Timur
- **Sasaran:** Informatika Jenjang SMP — Fase D (Kelas VII / VIII / IX)
- **Format:** Single Page Application (SPA), HTML5, CSS3, JavaScript Murni (Zero-Dependency)
- **URL Akses Online:** `https://fanani.my.id/lab/lab-maya/perakitan-komputer/`

---

## 1. Deskripsi & Latar Belakang Inovasi
Praktikum perangkat keras (hardware) komputer di sekolah seringkali terkendala oleh mahalnya biaya pengadaan unit komputer khusus praktikum serta risiko kerusakan komponen motherboard dan sengatan arus listrik bagi peserta didik SMP. 

**Lab Maya Sistem Komputer** memberikan pengalaman laboratorium virtual yang realistis, aman, dan tanpa biaya (zero-cost). Melalui media ini, siswa dapat:
1. Merakit komponen PC modern secara taktil (*drag & drop*) ke motherboard ATX.
2. Mengamati lampu diagnostik POST LED dan terminal BIOS saat proses *power on*.
3. Menguji nalar kritis melalui skenario pemecahan masalah (*troubleshooting*) dan komponen tidak kompatibel.
4. Menyelami konsep abstrak representasi data biner (8-bit), pencampuran warna monitor (24-bit RGB), dan tabel kebenaran 6 gerbang logika dasar.

---

## 2. Keselarasan Kurikulum (Capaian & Tujuan Pembelajaran)
*Rujukan: Keputusan Kepala BSKAP Kemendikbudristek No. 032/H/KR/2024.*

- **Capaian Pembelajaran (CP) Elemen Sistem Komputer (SK) Fase D:**
  > *"Peserta didik mampu mendeskripsikan komponen, fungsi, dan cara kerja komputer yang membentuk sebuah sistem komputasi, serta memahami mekanisme internal penyimpanan dan representasi data pada sistem komputer."*

- **Tujuan Pembelajaran (TP):**
  1. **TP-1:** Mengidentifikasi dan mengkategorikan 5 komponen utama perangkat keras (CPU, RAM, SSD NVMe, GPU, dan PSU) serta peran fungsinya pada motherboard ATX.
  2. **TP-2:** Mensimulasikan prosedur perakitan komputer secara virtual dengan alur logis dan mendiagnosis hasil *Power-On Self-Test* (POST) pada sistem BIOS.
  3. **TP-3:** Menganalisis representasi data biner (basis-2) dan pencampuran warna 24-bit RGB sebagai prinsip kerja internal pemrosesan komputer.
  4. **TP-4:** Menganalisis operasi logika dasar (AND, OR, NOT, XOR, NAND, NOR) yang menyusun sirkuit terpadu mikroprosesor.

---

## 3. Fitur Utama & Standar Teknis Lab Maya (Kepatuhan Juknis Bab V)

| Kriteria Juknis Bab V | Fitur pada Karya | Keterangan Kepatuhan |
| :--- | :--- | :--- |
| **Arsitektur SPA** | Single Page Application (SPA) | Tidak ada *redirect* ke file HTML lain. Navigasi tab instan berbasis JS. |
| **Zero External URL** | 100% Offline / Standalone | Tidak ada panggilan CDN eksternal, font tersimpan lokal, audio disintesis via Web Audio API. |
| **Rasio Layar 16:9** | Landscape 16:9 Fixed Ratio | Container 16:9 dengan *viewport responsive scaling* dan *rotate warning overlay* di smartphone. |
| **Indikator Progres Langkah** | Stepper "Langkah 1 dari 5" | Panduan langkah dinamis di rak komponen dan motherboard sesuai Juknis Hal. 21 poin (g). |
| **Eksplorasi Skenario Berbeda** | Standar vs Uji Masalah | Skenario normal dan skenario *troubleshooting* (komponen pengecoh DDR2/IDE) sesuai Juknis Hal. 21 poin (h). |
| **Asesmen Terintegrasi** | LKPD & Kuis Formatif | Evaluasi pemahaman mandiri dengan umpan balik instan, skor otomatis, dan cetak rekapan. |

---

## 4. Panduan Penggunaan Langkah demi Langkah (User Guide)

### A. Perakitan Motherboard ATX (Simulasi Utama)
1. Buka `index.html` dan klik **▶ MASUK LAB**.
2. Pilih tab **Rakit Komputer**.
3. Perhatikan indikator langkah pada sisi kiri atas:
   - **Langkah 1 dari 5:** Tarik CPU (Prosesor) ke soket LGA 1700 di tengah motherboard.
   - **Langkah 2 dari 5:** Pasang RAM DDR4 ke slot memori DIMM sebelah kanan CPU.
   - **Langkah 3 dari 5:** Pasang SSD NVMe M.2 ke slot penyimpanan di motherboard.
   - **Langkah 4 dari 5:** Pasang Kartu Grafis (GPU) ke slot ekspansi PCIe x16.
   - **Langkah 5 dari 5:** Hubungkan Catu Daya (PSU) ke header daya 24-Pin ATX.
4. Klik **⚡ POWER ON / UJI BOOT**. Amati lampu LED diagnostik motherboard dan teks terminal BIOS yang menampilkan alur siklus *Fetch-Decode-Execute*.

### B. Eksplorasi Digital Lanjutan
1. **Sakelar Biner (8-Bit):** Klik sakelar bit untuk mengubah nilai 0/1 dan amati konversinya ke angka desimal (0 s.d. 255). Siswa dapat mencoba mode permainan *Tantangan Tebak Biner*.
2. **Pencampur Warna RGB:** Geser slider R, G, B untuk melihat percampuran spektrum warna cahaya dan nilai heksadesimalnya.
3. **Gerbang Logika:** Uji tabel kebenaran gerbang AND, OR, NOT, XOR, NAND, dan NOR dengan sakelar input interaktif.

---

## 5. Transparansi Aset & Dokumentasi Prompt AI (Juknis Bab II Hal. 6 Poin 3e)
- **Aset Latar Belakang Cover (`welcome-bg.jpg`):**
  - Keterangan: *"Gambar latar belakang ini dibuat dengan bantuan AI Image Generator."*
  - Prompt Desain: `Isometric 3D clean futuristic computer hardware workshop, glowing motherboard blueprint, floating electronic components, soft ambient cyber lighting, high detailed digital art, 16:9 aspect ratio --no text --no watermark`
- **Aset Vektor Motherboard & Komponen:** Seluruh sirkuit motherboard dan komponen digambar manual dalam format SVG matematis murni tanpa hak cipta pihak ketiga.
- **Logo Resmi:** Hanya menggunakan logo resmi Kemendikdasmen dan Sobat SMP.

---

## 6. Storyline Video Demonstrasi (Format MP4, Maksimal 3 Menit)
- **00:00 - 00:30 (Pembuka):** Tampilan cover lab maya, perkenalan diri dari SMPN 2 Lamongan, dan urgensi praktikum perakitan PC virtual.
- **00:30 - 01:40 (Simulasi Inti):** Demonstrasi perakitan 5 komponen berpanduan langkah, demonstrasi penolakan komponen tak cocok (DDR2), dan proses uji booting BIOS.
- **01:40 - 02:25 (Eksplorasi):** Menunjukkan interaktivitas sakelar biner, pencampuran warna RGB, dan simulator gerbang logika.
- **02:25 - 03:00 (Penutup):** Menampilkan evaluasi formatif LKPD dan manfaat nyata bagi digitalisasi pembelajaran SMP.
