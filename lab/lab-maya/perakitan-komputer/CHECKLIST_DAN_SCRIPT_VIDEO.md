# 📋 Checklist Pengumpulan & Naskah Video Demonstrasi (3 Menit)
**Festival Biru Putih 2026 — Direktorat SMP, Kemendikdasmen**  
**Karya:** Lab Maya Sistem Komputer: Perakitan PC & Logika Digital  
**Peserta:** Ach. Chanifuddin Fanani, S.Pd. — SMP Negeri 2 Lamongan  
**Kategori:** Lab Maya (Bab V Juknis)

---

# BAGIAN 1: CHECKLIST PERSIAPAN & PENGUMPULAN

Gunakan checklist ini untuk memastikan tidak ada syarat administratif maupun teknis yang terlewat sebelum mengunggah karya ke portal festival.

### A. Persyaratan Peserta (Bab II Hal. 5)
- [ ] **Status Kepegawaian:** Guru atau Tenaga Kependidikan aktif di jenjang Sekolah Menengah Pertama (SMP).
- [ ] **NUPTK Aktif:** Memiliki Nomor Unik Pendidik dan Tenaga Kependidikan (NUPTK) yang masih aktif dan valid.
- [ ] **Akun Pendaftaran:** Terdaftar pada portal resmi pendaftaran Festival Biru Putih 2026.

---

### B. Dokumen Administrasi & Legalitas
- [ ] **Surat Pernyataan dan Integritas (Lampiran 1 Hal. 33):**
  - [ ] Diisi lengkap sesuai data diri (Nama, NIK, NUPTK, Unit Kerja, Kontak).
  - [ ] Mencantumkan Judul Karya: `Lab Maya Sistem Komputer: Perakitan PC & Logika Digital`.
  - [ ] Mencantumkan Kategori Sayembara: `Lab Maya`.
  - [ ] Ditempeli **Meterai Rp 10.000** fisik atau e-Meterai.
  - [ ] Ditandatangani asli, lalu dipindai (scan) menjadi format **PDF**.
- [ ] **Bebas Plagiasi & Komersialisasi:** Karya orisinal, belum pernah dipublikasikan komersial, dan belum pernah memenangkan kompetisi sejenis sebelumnya.
- [ ] **Bebas SARA & Iklan:** Tidak memuat unsur SARA, pornografi, kekerasan, ujaran kebencian, dan bebas dari iklan/product placement komersial.
- [ ] **Logo Resmi Kemendikdasmen:** Hanya menggunakan logo resmi instansi sekolah dan logo resmi Kemendikdasmen / Sobat SMP (tanpa logo sponsor luar).

---

### C. Berkas Paket Aplikasi Digital (.ZIP) (Bab V Hal. 21 & 24)
- [ ] **Single Page Application (SPA):** Aplikasi berjalan penuh di satu halaman tanpa redirect ke file HTML lain.
- [ ] **Struktur File Root:** File utama bernama **`index.html`** dan diletakkan tepat di root ZIP (bukan di dalam sub-folder).
- [ ] **100% Offline / Bebas URL Eksternal:**
  - [ ] Tidak memanggil CDN luar (semua font lokal di `assets/fonts/`).
  - [ ] Seluruh aset visual disimpan di `assets/images/`.
  - [ ] Efek suara menggunakan Web Audio API internal (tanpa link audio streaming).
- [ ] **Rasio Layar 16:9 Landscape:** Teruji proporsional pada resolusi laptop/PC dan memiliki pesan rotasi layar otomatis untuk gawai ponsel.
- [ ] **Bebas Bug & Responsif:** Seluruh tombol navigasi, drag & drop komponen, uji BIOS, sakelar biner, slider RGB, dan simulator gerbang logika berfungsi mulus dengan waktu respons < 2 detik.
- [ ] **Ukuran File ZIP:** Ukuran total file ZIP aplikasi sangat hemat (< 5 MB), jauh di bawah batas maksimal 150 MB (rekomendasi juknis < 25 MB).

---

### D. Berkas Panduan Penggunaan / User Guide (PDF) (Bab V Hal. 24 Poin E.4)
- [ ] **Dokumen User Guide Format PDF:**
  - [ ] Memuat identitas karya, sasaran Fase D, dan nama sekolah.
  - [ ] Memuat pemetaan Capaian Pembelajaran (CP BSKAP 032/H/KR/2024) dan 4 Tujuan Pembelajaran (TP).
  - [ ] Memuat panduan langkah demi langkah cara mengoperasikan Lab Maya.
  - [ ] Memuat deskripsi teknis arsitektur SPA dan transparansi prompt AI (`welcome-bg.jpg`).
  *(Catatan: Anda dapat mencetak file `panduan-resmi.html` ke PDF melalui menu Print browser).*

---

### E. Berkas Video Demonstrasi (MP4) (Bab V Hal. 24 Poin E.5)
- [ ] **Format Video:** MP4 (Codec H.264, audio stereo AAC).
- [ ] **Durasi Maksimal:** **Maksimal 3 menit (03:00)** — *Jangan melebihi 3 menit agar tidak terkena penalti nilai!*
- [ ] **Rasio & Resolusi:** 16:9 Landscape, resolusi **1080p Full HD (1920x1080)** atau minimal **720p HD (1280x720)**.
- [ ] **Kualitas Audio:** Suara narasi jernih dan terdengar jelas; volume musik latar (backsound) lembut (maksimal 20% dari volume narasi); bebas noise.
- [ ] **Konten Video:** Memuat pembuka, perakitan motherboard berpanduan langkah, skenario uji masalah, uji boot BIOS POST, eksplorasi biner/RGB/logika, asesmen LKPD, dan penutup.

---

# BAGIAN 2: NASKAH / SCRIPT REKAMAN VIDEO DEMO (3 MENIT)

**Target Durasi:** Tepat 2 menit 50 detik (memberi toleransi 10 detik di bawah batas maksimal 3 menit).  
**Alat Rekam yang Disarankan:** OBS Studio, Clipchamp, Bandicam, atau Screen Recorder Windows (Win + Alt + R).  
**Resolusi Rekam:** 1920 x 1080 (1080p, 30 fps atau 60 fps).  
**Pengaturan Audio:** Mikrofon headset / clip-on USB, volume mic 85%, backsound instrumental santai volume 15%.

---

### TABEL STORYLINE & SCRIPT KATA-DEMI-KATA

| Waktu (Durasi) | Bagian / Scene | Visual di Layar (Screen Action) | Naskah Narasi Suara (Voice Over) |
| :--- | :--- | :--- | :--- |
| **00:00 - 00:25**<br>*(25 detik)* | **Scene 1:**<br>Pembuka &amp; Latar Belakang Masalah | **Layar Cover Lab Maya.**<br>Tampilkan judul *Lab Perakitan Komputer*, logo Kemendikdasmen, dan identitas SMPN 2 Lamongan.<br>Kamera webcam presenter di pojok bawah (opsional tapi disarankan). | *"Halo Bapak Ibu Dewan Juri Festival Biru Putih 2026. Saya Ach. Chanifuddin Fanani dari SMP Negeri 2 Lamongan.<br><br>Praktikum perangkat keras komputer di SMP sering terkendala mahalnya biaya unit PC dan risiko kerusakan komponen. Untuk itu, saya mempersembahkan inovasi: **Lab Maya Sistem Komputer: Perakitan PC & Logika Digital** — sebuah laboratorium virtual interaktif berbasis web, 100% luring, aman, dan tanpa biaya."* |
| **00:25 - 01:10**<br>*(45 detik)* | **Scene 2:**<br>Simulasi Rakit PC &amp; Stepper Panduan | Klik **▶ MASUK LAB** &rarr; masuk ke tab **Rakit Komputer**.<br>Arahkan kursor ke badge `Langkah 1 dari 5` dan kartu panduan.<br>Lakukan *drag and drop* komponen satu per satu ke motherboard: CPU &rarr; RAM DDR4 &rarr; SSD M.2 &rarr; GPU PCIe &rarr; PSU. | *"Lab Maya ini dirancang dengan rasio standar 16:9 dan arsitektur Single Page Application.<br><br>Di ruang Rakit Komputer, siswa dipandu secara bertahap melalui indikator langkah dinamis. Pertama, kita pasang CPU ke soket LGA 1700 di tengah motherboard. Indikator langsung berganti ke Langkah 2: memasang RAM DDR4 ke slot DIMM. Kita lanjutkan memasang SSD NVMe M.2, Kartu Grafis GPU pada slot PCIe, dan terakhir menghubungkan catu daya PSU. Seluruh komponen terpasang presisi dengan status 5 dari 5."* |
| **01:10 - 01:40**<br>*(30 detik)* | **Scene 3:**<br>Skenario Eksplorasi Masalah (*Troubleshooting*) | Klik tombol **🔍 Uji Masalah** di bilah skenario.<br>Ambil **RAM DDR2 1GB (Legacy)** lalu coba tarik ke slot RAM.<br>Muncul modal peringatan inkompatibilitas hardware.<br>Lakukan hal serupa dengan HDD IDE pita kuno. | *"Sesuai standar Juknis untuk membandingkan skenario berbeda, tersedia mode **Uji Masalah**. Siswa diajak bernalar kritis: bagaimana jika kita memasang RAM DDR2 lama ke motherboard modern? Sistem langsung menolak dan memberikan umpan balik edukatif mengenai perbedaan notch pin dan voltase. Ini melatih keterampilan pemecahan masalah tanpa risiko merusak alat fisik."* |
| **01:40 - 02:10**<br>*(30 detik)* | **Scene 4:**<br>Uji Booting BIOS &amp; POST Diagnostic LED | Klik tombol **⚡ POWER ON / UJI BOOT**.<br>Sorot lampu LED diagnostik (CPU, DRAM, VGA, BOOT bergantian hijau).<br>Sorot log terminal BIOS yang memuat alur siklus *Fetch-Decode-Execute*. | *"Setelah perakitan selesai, siswa menekan tombol **POWER ON / UJI BOOT**. Di sinilah keunggulan Lab Maya ini: sistem menjalankan simulasi Power-On Self-Test (POST) nyata! Lampu LED diagnostik menyala bertahap, disusul suara beep BIOS, dan terminal diagnostik menampilkan siklus Von Neumann — bagaimana CPU mengambil instruksi dari RAM dan mengeksekusinya secara visual."* |
| **02:10 - 02:40**<br>*(30 detik)* | **Scene 5:**<br>Eksplorasi Digital &amp; LKPD Evaluasi | Klik tab **Eksplorasi Digital**.<br>- Klik sakelar biner (0/1) dan tunjukkan angka desimalnya berganti.<br>- Geser slider RGB dan tunjukkan warna monitor.<br>- Klik sakelar gerbang logika AND/OR.<br>Klik tab **✍️ LKPD & Kuis**. | *"Tidak hanya hardware fisik, Lab Maya ini mengintegrasikan pemahaman konsep abstrak melalui tab **Eksplorasi Digital**: simulasi sakelar bilangan biner 8-bit, pencampuran warna 24-bit RGB monitor, dan simulator 6 gerbang logika dasar.<br><br>Seluruh pemahaman dievaluasi melalui tab **LKPD & Kuis Interaktif** yang menyediakan umpan balik otomatis dan rekapan penilaian belajar mandiri."* |
| **02:40 - 02:55**<br>*(15 detik)* | **Scene 6:**<br>Penutup &amp; Pernyataan Komitmen | Kembali ke tampilan utama / webcam presenter.<br>Tampilkan pesan penutup dan salam hormat. | *"Lab Maya Sistem Komputer hadir untuk mewujudkan digitalisasi pembelajaran yang bermakna, menyenangkan, dan berdaya guna bagi seluruh siswa di Indonesia.<br><br>Mari wujudkan pendidikan bermutu untuk semua. Terima kasih, salam hangat dari SMP Negeri 2 Lamongan!"* |

---

### TIPS TEKNIS AGAR MENDAPAT NILAI MAKSIMAL DARI JURI

1. **Patuhi Batas Waktu 3 Menit (Mutlak!):**
   - Juri festival sangat disiplin terhadap durasi. Jika video 03:01 (3 menit 1 detik), beberapa juri dapat mendiskualifikasi atau memotong nilai aspek fungsionalitas. Pastikan video selesai di kisaran **02:45 s.d. 02:55**.
2. **Kualitas Audio Adalah Kunci (Bobot Media 25%):**
   - Gunakan ruangan yang sunyi tanpa gaung/echo.
   - Bicara dengan artikulasi jelas, tempo stabil (jangan terlalu terburu-buru), dan nada suara penuh semangat.
   - Bila memakai musik latar, pastikan volumenya sangat pelan (background music hanya sebagai pemanis suasana).
3. **Posisikan Kursor dengan Halus:**
   - Gerakkan kursor tetikus (mouse) dengan tenang dan terarah saat mendemonstrasikan drag and drop komponen, agar juri nyaman melihatnya.
4. **Rendering Video:**
   - Ekspor video dengan format **MP4 (H.264)**, resolusi **1080p (1920x1080)**, bitrate sekitar 4.000–6.000 kbps agar kualitas tajam namun ukuran file tetap ringan (< 100 MB).
