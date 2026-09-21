# 📋 CHECKLIST LENGKAP & PANDUAN PENGUMPULAN SAYEMBARA LAB MAYA
**FESTIVAL BIRU PUTIH TAHUN 2026 — DIREKTORAT SEKOLAH MENENGAH PERTAMA (DIREKTORAT SMP)**  
**KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH (KEMENDIKDASMEN)**  

- **Kategori Sayembara:** Laboratorium Maya (Lab Maya) — Bab V Juknis  
- **Judul Karya:** *Lab Maya Sistem Komputer: Perakitan PC & Logika Digital*  
- **Pengembang:** Ach. Chanifuddin Fanani, S.Pd.  
- **Unit Kerja:** SMP Negeri 2 Lamongan, Jawa Timur  
- **Sasaran:** Mata Pelajaran Informatika Jenjang SMP — Fase D (Elemen Sistem Komputer)  
- **Tautan Demo Online:** [https://fanani.my.id/lab/lab-maya/perakitan-komputer/index.html](https://fanani.my.id/lab/lab-maya/perakitan-komputer/index.html)  

---

# BAGIAN 1: CHECKLIST EVALUASI KEPATUHAN JUKNIS

Gunakan daftar centang (checklist) ini untuk memverifikasi seluruh komponen persyaratan administratif, substansi materi kurikulum, kualitas media, hingga kelengkapan berkas fisik sebelum mengunggah ke portal resmi lomba.

---

### A. Persyaratan Peserta & Legalitas Administratif (Bab II Hal. 5–6 & Lampiran 1)

| No | Butir Verifikasi | Indikator Kepatuhan | Status |
|:---:|:---|:---|:---:|
| 1 | **Status Kepegawaian Peserta** | Pendidik (Guru) atau Tenaga Kependidikan aktif di jenjang SMP pada satuan pendidikan terdaftar Dapodik. | [ ] |
| 2 | **Kepemilikan NUPTK** | Memiliki NUPTK aktif yang terdata di sistem kementerian. | [ ] |
| 3 | **Surat Pernyataan & Integritas (Lampiran 1)** | Mengisi formulir Pakta Integritas resmi, ditandatangani di atas **Meterai Rp 10.000** (fisik atau e-Meterai), dan dipindai ke format **PDF**. | [ ] |
| 4 | **Orisinalitas & Bebas Plagiasi** | Karya orisinal ciptaan sendiri, belum pernah dipublikasikan secara komersial, dan belum pernah memenangkan sayembara/lomba tingkat nasional serupa. | [ ] |
| 5 | **Transparansi Kecerdasan Artifisial (AI)** | Pemanfaatan AI (pada gambar background `welcome-bg.jpg`) dinyatakan secara jujur dan melampirkan dokumen desain prompting lengkap (`DOKUMENTASI_SUMBER_ASET_DAN_PROMPT_AI.docx`). *(Sesuai Bab II Hal. 6 poin 3e)*. | [ ] |
| 6 | **Bebas SARA, Pornografi, & Unsur Iklan** | Karya bebas dari materi kekerasan, pornografi, ujaran kebencian, suku, ras, agama, serta bersih dari tautan iklan komersial berbayar. | [ ] |
| 7 | **Standar Logo Resmi** | Hanya menyertakan logo resmi Kementerian Pendidikan Dasar dan Menengah / Sobat SMP dan logo instansi sekolah SMP Negeri 2 Lamongan. | [ ] |

---

### B. Substansi Materi Kurikulum Informatika Fase D (Bobot Penilaian 60%)

| No | Butir Kriteria | Pembuktian dalam Karya Lab Maya | Status |
|:---:|:---|:---|:---:|
| 8 | **Kesesuaian Capaian Pembelajaran (CP)** | Selaras dengan Keputusan BSKAP No. 032/H/KR/2024 Elemen Sistem Komputer (SK): mendeskripsikan komponen, fungsi, cara kerja sistem komputer, dan kodifikasi data biner/RGB. | [ ] |
| 9 | **Kebenaran Konsep Keilmuan Hardware** | Urutan perakitan, jenis soket CPU LGA 1700, notch slot RAM DDR4, antarmuka M.2 PCIe Gen4 NVMe, slot ekspansi PCIe x16, dan konektor daya 24-Pin ATX sesuai spesifikasi industri nyata. | [ ] |
| 10 | **Prosedur Perakitan Berpanduan (Scaffolding)** | Fitur Stepper Panduan dinamis memandu siswa tahap demi tahap (*Langkah 1 dari 5* hingga *5 dari 5*) sehingga pembelajaran terstruktur dan tidak membingungkan murid. | [ ] |
| 11 | **Simulasi Power-On Self-Test (POST) BIOS** | Menggambarkan proses diagnosa inisialisasi hardware saat tombol Power diaktifkan, lampu LED diagnosa (CPU, DRAM, VGA, BOOT) menyala runtut, disusul suara beep BIOS. | [ ] |
| 12 | **Visualisasi Alur Kerja Mesin Von Neumann** | Menampilkan siklus komputasi nyata (*Fetch-Decode-Execute*) di terminal diagnostik, menjembatani pemahaman siswa dari komponen fisik ke cara kerja pemrosesan data. | [ ] |
| 13 | **Integrasi Konsep Abstrak Kodifikasi Data** | Ruang Eksplorasi Digital menyediakan laboratorium interaktif untuk: <br>• Konversi bit biner 8-bit ke desimal (dan sebaliknya) secara visual.<br>• Pencampuran warna monitor 24-bit RGB dengan kode Hexadesimal.<br>• Uji tabel kebenaran 6 gerbang logika dasar (AND, OR, NOT, XOR, NAND, NOR). | [ ] |
| 14 | **Evaluasi & Asesmen Formatif (LKPD)** | Tersedia instrumen kuis studi kasus kerusakan perangkat keras dengan sistem umpan balik otomatis dan rekapitulasi capaian belajar. | [ ] |

---

### C. Kualitas Media & Interaktivitas Pengguna (Bobot Penilaian 25%)

| No | Butir Kriteria | Pembuktian dalam Karya Lab Maya | Status |
|:---:|:---|:---|:---:|
| 15 | **Arsitektur Single Page Application (SPA)** | Seluruh navigasi, modul perakitan, dan simulator logika berjalan di satu halaman tanpa muat ulang (*no reload*) ataupun tautan eksternal ke website lain. *(Sesuai Bab V Hal. 21)*. | [ ] |
| 16 | **Kemandirian 100% Luring (Offline First)** | Tidak memanggil resource dari Content Delivery Network (CDN) internet. Seluruh jenis huruf (Fredoka, Nunito, Poppins) disimpan secara lokal di `assets/fonts/`. | [ ] |
| 17 | **Sintesis Audio Berbasis Web Audio API** | Efek suara klik perakitan, bunyi peringatan salah pasang, nada sakelar biner, dan nada beep BIOS dihasilkan secara dinamis melalui browser tanpa file MP3/WAV besar. | [ ] |
| 18 | **Responsivitas & Rasio Layar 16:9** | Tampilan teruji proporsional pada rasio standar laptop/PC 16:9 (1920x1080 & 1280x720) dengan responsivitas antarmuka tinggi (< 1 detik). | [ ] |
| 19 | **Interaksi Drag & Drop Presisi** | Mekanisme seret-dan-lepas komponen memiliki target area (*snap-to-target*) yang presisi dengan deteksi kesalahan otomatis jika komponen salah sasaran. | [ ] |
| 20 | **Efisiensi Ukuran Berkas** | Ukuran keseluruhan paket aplikasi di bawah 5 MB (sangat hemat dari batas toleransi maksimal 150 MB pada juknis). | [ ] |

---

### D. Inovasi & Nilai Tambah (Bobot Penilaian 15%)

| No | Butir Kriteria | Pembuktian dalam Karya Lab Maya | Status |
|:---:|:---|:---|:---:|
| 21 | **Fitur Komponen Distraktor (Uji Masalah)** | Fitur unik yang menghadirkan komponen usang/tidak cocok (RAM DDR2, HDD IDE pita, Cooler AM3) untuk menguji ketelitian analitis dan kemampuan penalaran kritis siswa. | [ ] |
| 22 | **Sistem Smart Feedback & Safety Lab** | Memberikan penjelasan logis mengapa suatu komponen ditolak (misalnya: perbedaan lekukan notch dan voltase daya), memberikan pengalaman praktikum aman tanpa risiko merusak alat fisik berharga mahal. | [ ] |
| 23 | **Pendekatan Gamifikasi Edukatif** | Dilengkapi skor perakitan, feedback suara imersif, dan tantangan tebak nilai biner yang meningkatkan motivasi belajar mandiri murid. | [ ] |

---

### E. Berkas yang Harus Disiapkan & Dikumpulkan (Lampiran Pengumpulan)

| No | Jenis Berkas | Format | Lokasi Berkas / Sumber | Keterangan |
|:---:|:---|:---|:---|:---|
| 1 | **Paket Aplikasi Lab Maya** | `.zip` | Folder `perakitan-komputer/` (tanpa folder SIAP KIRIM di dalamnya) | File utama `index.html` harus berada di root file ZIP. Ukuran file < 5 MB. |
| 2 | **BACA_SAYA.txt** | `.txt` | `SIAP KIRIM/BACA_SAYA.txt` | Disertakan di dalam ZIP atau dilampirkan terpisah sesuai isian portal lomba. |
| 3 | **Dokumen Sumber Aset & Prompt AI** | `.docx` & `.pdf` | `SIAP KIRIM/DOKUMENTASI_SUMBER_ASET_DAN_PROMPT_AI.docx` | Memenuhi ketentuan Bab II Hal. 6 poin 3e mengenai dokumentasi prompting AI. |
| 4 | **Panduan Penggunaan (User Guide) & Deskripsi Teknis** | `.docx` & `.pdf` | `SIAP KIRIM/PANDUAN_PENGGUNAAN_DAN_DESKRIPSI_TEKNIS.docx` | Memenuhi ketentuan Bab V Hal. 24 poin E.4 mengenai Buku Petunjuk Penggunaan. |
| 5 | **Surat Pernyataan & Pakta Integritas** | `.pdf` (Hasil Scan) | `SIAP KIRIM/SURAT_PERNYATAAN_DAN_INTEGRITAS_PESERTA.docx` | Cetak formulir ini, tempeli meterai Rp 10.000, tanda tangani, lalu scan menjadi file PDF. |
| 6 | **Video Demonstrasi Karya (Maks 3 Menit)** | `.mp4` / Link Video | Hasil rekaman screen recorder (lihat naskah di Bagian 2) | Resolusi 1080p / 720p, durasi maksimal 3 menit (jangan lebih!). |

---

# BAGIAN 2: NASKAH LENGKAP (SCRIPT) REKAMAN VIDEO DEMO (3 MENIT)

> [!IMPORTANT]
> **Durasi Maksimal Juknis: Tepat 3 Menit (180 Detik).**  
> Melebihi 3 menit berisiko diskualifikasi atau pemotongan nilai substansi. Naskah di bawah ini dirancang dengan durasi bersih **2 menit 50 detik (170 detik)** sehingga Anda memiliki waktu jeda aman 10 detik.

### Spesifikasi Teknis Perekaman Video:
- **Aplikasi Rekam Layar:** OBS Studio (Disarankan), Bandicam, Camtasia, atau Microsoft Clipchamp.
- **Resolusi Kanvas:** 1920 x 1080 (1080p Full HD) pada rasio 16:9, framerate 30 atau 60 FPS.
- **Audio:** Gunakan mikrofon eksternal (clip-on / headset) agar suara narasi jernih dan bebas gaung. Musik latar (instrumental) disetel maksimal 15% dari volume narasi.
- **Tata Letak:** Tampilkan kamera wajah presenter (webcam) di sudut kanan bawah atau sudut kiri bawah selama intro dan penutup.

---

### TABEL STORYBOARD & NASKAH KATA-DEMI-KATA (SCENE BY SCENE)

| Durasi & Waktu | Nama Scene | Panduan Visual Layar (Screen Capture) | Naskah Narasi Suara (Voice Over) |
|:---|:---|:---|:---|
| **00:00 - 00:25**<br>*(25 detik)* | **Scene 1:**<br>Pembuka, Identitas, &amp; Latar Belakang Inovasi | • Tampilkan layar awal (**Welcome Screen**).<br>• Perlihatkan logo Kemendikdasmen, judul Lab Maya, dan nama instansi SMPN 2 Lamongan.<br>• Kamera webcam presenter aktif di pojok bawah. | *"Halo Bapak Ibu Dewan Juri Festival Biru Putih 2026 yang terhormat. Saya Ach. Chanifuddin Fanani dari SMP Negeri 2 Lamongan.<br><br>Praktikum perangkat keras komputer di jenjang SMP sering terkendala mahalnya unit PC dan risiko kerusakan fatal komponen fisik. Untuk mengatasi hal tersebut, saya mengembangkan inovasi: **Lab Maya Sistem Komputer: Perakitan PC & Logika Digital** — sebuah laboratorium virtual berbasis web, 100% luring, aman, dan tanpa biaya."* |
| **00:25 - 01:10**<br>*(45 detik)* | **Scene 2:**<br>Simulasi Rakit Motherboard ATX &amp; Stepper Panduan | • Klik tombol **▶ MASUK LAB** &rarr; masuk ke tab **Rakit Komputer**.<br>• Sorot badge **Langkah 1 dari 5** di bagian atas.<br>• Lakukan drag &amp; drop secara bertahap:<br>  1. Tarik CPU ke soket LGA 1700 di tengah.<br>  2. Tarik RAM DDR4 ke slot DIMM.<br>  3. Tarik SSD NVMe M.2 ke soket M.2.<br>  4. Tarik GPU ke slot ekspansi PCIe x16.<br>  5. Tarik kabel PSU 24-Pin ke header ATX.<br>• Seluruh 5 slot terisi dan berbunyi klik. | *"Karya ini dirancang dengan rasio standar 16:9 berbasis arsitektur Single Page Application.<br><br>Di ruang Rakit Komputer, murid dipandu secara terstruktur melalui indikator langkah dinamis. Pertama, kita pasang prosesor ke soket LGA 1700. Sistem otomatis beralih ke Langkah 2: memasang modul RAM DDR4 ke slot memori. Kita lanjutkan memasang SSD NVMe M.2 berkecepatan tinggi, kartu grafis GPU ke slot PCIe x16, dan terakhir menghubungkan catu daya PSU 24-Pin. Seluruh komponen terpasang presisi dengan status 5 dari 5."* |
| **01:10 - 01:40**<br>*(30 detik)* | **Scene 3:**<br>Fitur Uji Masalah (Troubleshooting) &amp; Distraktor | • Klik tombol **🔍 Uji Masalah**.<br>• Tarik **RAM DDR2 1GB (Legacy)** ke slot motherboard.<br>• Muncul popup peringatan inkompatibilitas hardware.<br>• Tarik **HDD IDE Kuno** ke soket M.2/SATA. | *"Sesuai rubrik Juknis untuk membandingkan skenario berbeda, tersedia mode **Uji Masalah**. Murid diajak bernalar kritis: bagaimana jika memasang RAM DDR2 lama ke motherboard modern? Sistem cerdas langsung menolak dan menampilkan penjelasan edukatif mengenai perbedaan notch pin dan voltase. Ini melatih keterampilan pemecahan masalah tanpa risiko merusak alat fisik."* |
| **01:40 - 02:10**<br>*(30 detik)* | **Scene 4:**<br>Uji Booting BIOS &amp; Siklus Von Neumann | • Klik tombol **⚡ POWER ON / UJI BOOT**.<br>• Sorot 4 lampu LED diagnosa (CPU, DRAM, VGA, BOOT menyala hijau berurutan).<br>• Terdengar suara nada Beep BIOS.<br>• Sorot teks log terminal BIOS yang memaparkan alur *Fetch-Decode-Execute*. | *"Setelah perakitan lengkap, murid menekan tombol **POWER ON / UJI BOOT**. Lab Maya ini menyimulasikan Power-On Self-Test (POST) secara nyata! Lampu LED diagnostik menyala bertahap, disusul suara beep BIOS sukses, dan terminal diagnostik memperagakan siklus Von Neumann — bagaimana CPU mengambil instruksi dari RAM dan mengeksekusinya secara visual."* |
| **02:10 - 02:35**<br>*(25 detik)* | **Scene 5:**<br>Ruang Eksplorasi Digital &amp; LKPD Formatif | • Klik tab **Eksplorasi Digital**.<br>  - Klik sakelar biner 8-bit, tunjukkan desimal berganti.<br>  - Geser slider RGB dan tunjukkan warna piksel.<br>  - Klik sakelar gerbang logika AND/OR.<br>• Klik tab **✍️ LKPD & Kuis**. | *"Tidak hanya perangkat fisik, Lab Maya ini mengintegrasikan pemahaman konsep abstrak melalui tab **Eksplorasi Digital**: simulasi sakelar bilangan biner 8-bit, pencampuran warna monitor 24-bit RGB, dan simulator gerbang logika.<br><br>Seluruh capaian belajar dievaluasi melalui instrumen **LKPD & Kuis Interaktif** dengan umpan balik penilaian otomatis."* |
| **02:35 - 02:50**<br>*(15 detik)* | **Scene 6:**<br>Penutup &amp; Komitmen Pendidikan | • Tampilkan kembali wajah presenter / layar penutup.<br>• Tampilkan logo sekolah dan ucapan terima kasih. | *"Lab Maya Sistem Komputer hadir untuk mewujudkan digitalisasi pembelajaran Informatika yang bermakna, interaktif, dan berpusat pada murid.<br><br>Terima kasih kepada Direktorat SMP Kemendikdasmen. Salam hangat dari SMP Negeri 2 Lamongan!"* |

---

# BAGIAN 3: PANDUAN LANGKAH PEMBUATAN PAKET ZIP BERSIH

Sebelum mengunggah karya ke portal pendaftaran, ikuti langkah berikut untuk menghasilkan file ZIP yang bersih dari file kerja internal:

1. **Pastikan File Utama Berada di Root:**
   File `index.html`, `style.css`, `script.js`, `config.js`, dan folder `assets/` harus berada langsung di tingkat teratas ZIP (tidak boleh dibungkus dalam folder induk ganda).
2. **Jangan Masukkan File Dokumentasi Internal ke Dalam ZIP Aplikasi:**
   Folder `SIAP KIRIM/`, file `.py`, dan file `.md` tidak perlu masuk ke dalam ZIP aplikasi perakitan komputer agar ukuran ZIP tetap sangat kecil (< 3 MB).
3. **Struktur Isi Berkas ZIP yang Benar:**
   ```text
   Lab_Maya_Sistem_Komputer_Ach_Chanifuddin_Fanani.zip
   ├── index.html
   ├── style.css
   ├── script.js
   ├── config.js
   ├── panduan-resmi.html
   └── assets/
       ├── fonts/
       │   ├── Fredoka-Bold.ttf / .woff2
       │   ├── Nunito-Regular.ttf / .woff2
       │   └── Poppins-SemiBold.ttf / .woff2
       └── images/
           ├── welcome-bg.jpg
           ├── motherboard-atx.svg
           ├── cpu.svg
           ├── ram.svg
           ├── ssd.svg
           ├── gpu.svg
           ├── psu.svg
           ├── ram_distractor.svg
           ├── hdd_distractor.svg
           └── cooler_distractor.svg
   ```
4. **Unggah Berkas Pendukung Sesuai Kolom Formulir Portal:**
   - Kolom Karya / URL: Isikan file ZIP dan cantumkan URL Online [https://fanani.my.id/lab/lab-maya/perakitan-komputer/index.html](https://fanani.my.id/lab/lab-maya/perakitan-komputer/index.html)
   - Kolom Buku Petunjuk: Unggah `PANDUAN_PENGGUNAAN_DAN_DESKRIPSI_TEKNIS.docx` (atau konversi ke `.pdf`).
   - Kolom Surat Keaslian: Unggah hasil scan PDF dari `SURAT_PERNYATAAN_DAN_INTEGRITAS_PESERTA.docx` yang sudah bermeterai Rp 10.000.
   - Kolom Transparansi AI: Unggah `DOKUMENTASI_SUMBER_ASET_DAN_PROMPT_AI.docx` (atau `.pdf`).
   - Kolom Video: Tautkan link YouTube (Setel sebagai *Unlisted* atau *Public*) atau link Google Drive yang dapat diakses publik.
