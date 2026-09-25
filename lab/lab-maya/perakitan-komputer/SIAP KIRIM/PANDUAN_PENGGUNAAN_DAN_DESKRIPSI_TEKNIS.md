# BUKU PANDUAN PENGGUNAAN & DESKRIPSI TEKNIS (USER GUIDE)
**KATEGORI SAYEMBARA: LAB MAYA (BAB V PETUNJUK TEKNIS FESTIVAL BIRU PUTIH 2026)**  
**DIREKTORAT SEKOLAH MENENGAH PERTAMA — KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH**  

---

### Judul Karya
**LABORATORIUM MAYA SISTEM KOMPUTER: SIMULASI PERAKITAN PC, DIAGNOSTIK HARDWARE & LOGIKA DIGITAL**

### Identitas Pengembang & Karya
| Parameter | Informasi Resmi Pengembang |
| :--- | :--- |
| **Nama Lengkap** | Ach. Chanifuddin Fanani, S.Pd. |
| **NIP** | 199108262020121007 |
| **NUPTK** | 9158769670130183 |
| **NIK** | 3524162608910001 |
| **Instansi / Unit Kerja** | SMP Negeri 2 Lamongan |
| **Kabupaten / Provinsi** | Kabupaten Lamongan, Jawa Timur |
| **No. Telepon / WhatsApp** | 08158885508 |
| **Alamat Surel (Email)** | chanifuddin@gmail.com |
| **Portofolio Web** | [https://fanani.my.id](https://fanani.my.id) |
| **Kategori Karya** | Lab Maya (Bab V Petunjuk Teknis Festival Biru Putih 2026) |
| **Sasaran Pengguna** | Peserta Didik SMP Fase D (Kelas VII/VIII/IX) & Pendidik Informatika |

---

## BAB I. LATAR BELAKANG & RASIONAL INOVASI

### 1.1 Latar Belakang Masalah
Pembelajaran Informatika pada jenjang Sekolah Menengah Pertama (SMP), khususnya pada elemen Sistem Komputer (SK), sering kali dihadapkan pada kendala mendasar terkait ketersediaan dan keamanan sarana praktikum. Perangkat keras komputer fisik (*hardware*) merupakan aset laboratorium yang bernilai tinggi dan sangat rentan terhadap kerusakan fisik elektro-mekanik. Komponen sensitif seperti pin soket prosesor LGA, kepingan memori RAM DDR4 yang rentan terhadap lucutan elektrostatik (*Electrostatic Discharge* / ESD), serta risiko hubungan arus pendek daya (*short circuit*) menyebabkan guru enggan atau tidak mengizinkan peserta didik untuk membongkar-pasang unit komputer fisik yang berfungsi di laboratorium sekolah.

Dampaknya, pembelajaran materi perakitan komputer dan arsitektur sistem kerap tereduksi menjadi sekadar ceramah teoritis satu arah atau penayangan video pasif. Peserta didik kehilangan kesempatan emas untuk merasakan pengalaman langsung (*hands-on experience*), mengasah keterampilan pemecahan masalah (*troubleshooting*), serta membangun intuisi logis mengenai kompatibilitas perangkat keras dan sistem booting komputer.

### 1.2 Solusi Inovasi Berbasis Lab Maya
Menjawab tantangan tersebut, dikembangkan karya inovasi **"Lab Maya Sistem Komputer: Perakitan PC, Diagnostik Hardware & Logika Digital"**. Media ini dirancang sebagai laboratorium virtual berbasis peramban (*Single Page Application*) yang menyediakan representasi interaktif, presisi, dan aman dari arsitektur komputer modern. Peserta didik dapat bereksperimen membongkar dan merakit PC secara virtual, menguji skenario inkompatibilitas komponen tanpa risiko kerusakan fisik, menyaksikan proses booting BIOS dan *Power-On Self-Test* (POST) secara visual-auditori, hingga menjelajahi logika digital abstrak (bit biner, pencampuran warna RGB 24-bit, dan gerbang logika).

> **📌 Visi Pembelajaran Inklusif:**  
> Lab Maya ini hadir sebagai wujud nyata pemerataan mutu pendidikan digital, memungkinkan setiap sekolah di seluruh pelosok Indonesia menyelenggarakan praktikum perakitan komputer standar industri secara gratis, aman, ramah anak, dan 100% luring (*offline*) tanpa perlu sambungan internet.

---

## BAB II. PEMETAAN KURIKULUM & CAPAIAN PEMBELAJARAN

Karya ini dikembangkan dengan rujukan ketat pada **Keputusan Kepala BSKAP Kemendikbudristek No. 032/H/KR/2024** tentang Capaian Pembelajaran pada Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah.

### 2.1 Capaian Pembelajaran (Fase D — Elemen Sistem Komputer)
> *"Pada akhir fase D, peserta didik mampu mendeskripsikan komponen, fungsi, dan cara kerja komputer yang membentuk sebuah sistem komputasi, serta menjelaskan proses dan penggunaan kodifikasi data (biner, warna RGB) dalam sistem komputer."*

### 2.2 Tujuan Pembelajaran (TP) & Indikator Ketercapaian
- **TP-01 (Identifikasi Hardware):** Peserta didik mampu mengidentifikasi dan membedakan komponen penyusun unit pemrosesan komputer (CPU LGA 1700, Motherboard ATX, RAM DDR4, SSD NVMe M.2, GPU PCIe, PSU ATX 24-Pin) beserta karakteristik dan spesifikasi fisiknya.
- **TP-02 (Prosedur Perakitan):** Peserta didik mampu menyimulasikan prosedur perakitan komputer secara runtut, presisi, dan sesuai standar keselamatan kerja perakitan (K3 elektronika antistatis).
- **TP-03 (Diagnostik & Troubleshooting):** Peserta didik mampu menganalisis kegagalan perakitan, mendeteksi inkompatibilitas komponen (distraktor soket/arsitektur seperti RAM DDR2 dan HDD IDE), serta membaca kode diagnostik 4-Phase LED POST BIOS.
- **TP-04 (Logika Digital & Kodifikasi):** Peserta didik mampu membuktikan secara empiris konsep representasi data biner 8-bit (konversi ke desimal), pencampuran warna piksel monitor 24-bit RGB (HEX code), serta operasi tabel kebenaran gerbang logika dasar.

### 2.3 Penguatan Profil Pelajar Pancasila
- **Bernalar Kritis:** Mengidentifikasi kesalahan pemasangan komponen, menganalisis gejala kegagalan boot, dan memecahkan teka-teki logika digital secara ilmiah.
- **Mandiri:** Melakukan eksplorasi mandiri di laboratorium virtual dengan tempo belajar yang disesuaikan dengan ritme kebutuhan individu peserta didik.
- **Kreatif:** Mengombinasikan komposisi warna RGB dan merancang alur logika input pada gerbang logika digital.

---

## BAB III. PERSYARATAN SISTEM & PETUNJUK OPERASIONAL

### 3.1 Persyaratan Perangkat Keras & Lunak
- **Perangkat Keras (Hardware):** PC / Laptop dengan prosesor dual-core (minimal 1.5 GHz), RAM 2 GB, monitor resolusi 1280x720 (atau rasio 16:9 lainnya), mouse / touchpad, dan speaker / headphone aktif.
- **Perangkat Lunak (Software):** Sistem Operasi Windows 7/8/10/11, macOS, Linux, atau ChromeOS. Peramban web modern (Google Chrome, Microsoft Edge, Mozilla Firefox, atau Opera) dengan dukungan HTML5 Canvas dan Web Audio API.
- **Konektivitas Jaringan:** Aplikasi bersifat **100% mandiri (*stand-alone*) luring**. Tidak memerlukan sambungan internet, instalasi server lokal (XAMPP/Node.js), maupun plugin tambahan.

### 3.2 Langkah Cepat Menjalankan Media
1. **Langkah 1:** Ekstrak folder arsip `Lab Maya - Perakitan Komputer - Fanani.zip`.
2. **Langkah 2:** Buka folder hasil ekstraksi dan temukan berkas utama bernama `index.html`.
3. **Langkah 3:** Klik ganda berkas `index.html` atau klik kanan lalu pilih *Open with Google Chrome / Microsoft Edge*.
4. **Langkah 4:** Aplikasi Lab Maya akan langsung terbuka seketika dalam waktu kurang dari 1 detik dan siap digunakan untuk pembelajaran.

---

## BAB IV. STRUKTUR MENU & 7 TAB SKENARIO TERPADU

Aplikasi Lab Maya dirancang menggunakan arsitektur Single Page Application (SPA) modular dengan **7 tab navigasi skenario interaktif** yang dapat diakses melalui bilah menu atas:
1. **Tab Teori:** Memuat materi ensiklopedia komponen hardware, fungsi 5 organ utama komputer, dan bagan alur Input-Proses-Output (IPO).
2. **Tab Prosedur:** Pedoman standar operasional prosedur perakitan PC, panduan K3 elektronika (gelang antistatis, grounding), dan tips keselamatan kerja teknisi.
3. **Tab Perakitan PC:** Meja kerja simulasi drag-and-drop komponen ke soket motherboard ATX, stepper panduan adaptif 5 langkah, tombol uji booting Power-On, dan sakelar mode uji masalah.
4. **Tab Eksplorasi Digital:** Tiga modul eksplorasi kodifikasi data sains: sakelar biner 8-bit ke desimal, simulator percampuran warna sub-piksel RGB 24-bit, dan laboratorium gerbang logika.
5. **Tab LKPD Digital:** Lembar Kerja Peserta Didik digital mandiri: 5 soal Pilihan Ganda, 5 soal Benar/Salah, 5 pasang Menjodohkan beranimasi kabel, dan fitur cetak/simpan PDF ber-KOP resmi.
6. **Tab Pengembang:** Profil lengkap pengembang (Ach. Chanifuddin Fanani, S.Pd., SMP Negeri 2 Lamongan), NIP, kontak surel, dan tautan portofolio edukasi.
7. **Tab Referensi:** Transparansi sumber rujukan kurikulum BSKAP, buku referensi Hennessy & Patterson, inventaris aset AI/vektor SVG, font lokal SIL OFL, dan audio prosedural.

---

## BAB V. PANDUAN PENGGUNAAN FITUR & TANGKAPAN LAYAR

Berikut merupakan panduan operasional komprehensif untuk setiap antarmuka Lab Maya yang dilengkapi tangkapan layar berpenanda serta rincian fungsi tombol interaksi pengguna:

### 1. Layar Pembuka (Welcome Screen)
![Gambar 1](screenshots/1_welcome_screen.png)  
*Gambar 1: Layar Pembuka (Welcome Screen) Lab Maya Perakitan Komputer*

| Penanda / Bagian UI | Deskripsi Fungsi & Interaksi Pengguna |
| :--- | :--- |
| **1. Header & Logo Kemendikdasmen** | Menampilkan identitas kementerian, logo Tut Wuri Handayani, dan judul aplikasi dengan tipografi modern bernuansa ruang lab sains. |
| **2. Badge Fase D & Elemen SK** | Penanda resmi kurikulum Informatika Fase D SMP (Sistem Komputer) untuk memudahkan orientasi guru dan murid. |
| **3. Tombol ▶ MASUK LAB MAYA** | Memicu transisi animasi membuka ruang meja kerja simulasi perakitan PC dan menginisialisasi Web Audio API peramban. |
| **4. Tombol 📖 BACA PANDUAN** | Membuka jendela modal petunjuk ringkas keselamatan kerja, pengenalan alat lab, dan navigasi praktikum virtual. |

---

### 2. Modul Teori Interaktif & Ensiklopedia Komponen
![Gambar 2](screenshots/2_teori_komponen.png)  
*Gambar 2: Modul Teori Interaktif & Ensiklopedia Komponen Hardware*

| Penanda / Bagian UI | Deskripsi Fungsi & Interaksi Pengguna |
| :--- | :--- |
| **1. Tab Navigasi Skenario** | Bilah navigasi horizontal responsif untuk berpindah seketika di antara 7 modul tanpa reload halaman. |
| **2. Kartu Komponen Hardware** | Kartu visual interaktif menampilkan foto/ilustrasi detail setiap komponen, fungsi sirkuit, spesifikasi soket, dan perannya dalam alur komputasi. |
| **3. Tooltips Edukatif & Bagan IPO** | Arahkan kursor mouse ke setiap kartu komponen untuk membuka penjelasan mendalam mengenai kecepatan bus, memori cache, dan jalur data motherboard. |

---

### 3. Modul Prosedur Standar & K3 Perakitan Komputer
![Gambar 3](screenshots/3_prosedur_k3.png)  
*Gambar 3: Modul Prosedur Standar & K3 Perakitan Komputer*

| Penanda / Bagian UI | Deskripsi Fungsi & Interaksi Pengguna |
| :--- | :--- |
| **1. Infografis K3 Elektronika** | Pedoman penggunaan tali pergelangan antistatis (anti-static wrist strap), pelepasan muatan tubuh sebelum menyentuh sirkuit, dan pemakaian obeng magnetik. |
| **2. Runtutan SOP 5 Tahap Standar** | Alur perakitan bertahap: (1) Pemasangan Processor CPU, (2) Memasang RAM Dual-Channel, (3) Pemasangan Storage NVMe, (4) Pemasangan Kartu Grafis VGA, dan (5) Pemasangan Kabel Daya PSU. |
| **3. Peringatan Keselamatan Teknisi** | Penekanan visual terhadap tindakan berbahaya seperti menyentuh pin emas soket LGA, memaksakan komponen terbalik, atau bekerja saat arus listrik masih terhubung. |

---

### 4. Meja Kerja Perakitan PC Interaktif (Simulasi Inti)
![Gambar 4](screenshots/4_meja_rakit_pc.png)  
*Gambar 4: Meja Kerja Perakitan PC Interaktif (Simulasi Inti)*

| Penanda / Bagian UI | Deskripsi Fungsi & Interaksi Pengguna |
| :--- | :--- |
| **1. Stepper Panduan Dinamis** | Indikator langkah adaptif (Langkah 1 dari 5) yang memandu peserta didik mengenai komponen target yang harus dipasang secara berurutan. |
| **2. Rak Komponen Interaktif** | Laci inventaris komponen PC yang dapat diseret (drag-and-drop) secara presisi ke soket target pada motherboard. |
| **3. Sakelar Mode Skenario** | Pilihan antara '🟢 Skenario Standar' (komponen kompatibel) dan '🔍 Uji Masalah' (komponen inkompatibel/distraktor untuk melatih nalar kritis). |
| **4. Kanvas Motherboard ATX** | Papan induk interaktif dengan drop-zone menyala (glowing highlight) saat komponen yang sesuai diarahkan mendekati slot. |
| **5. Panel Diagnostik & Tombol Boot** | Tombol '⚡ POWER ON / UJI BOOT' dan 4 lampu LED diagnostik (CPU, DRAM, VGA, BOOT) yang menyimulasikan proses POST BIOS secara visual dan audio beep. |

---

### 5. Wahana Eksplorasi Digital
![Gambar 5](screenshots/5_eksplorasi_digital.png)  
*Gambar 5: Wahana Eksplorasi Digital (Biner, RGB 24-Bit & Gerbang Logika)*

| Penanda / Bagian UI | Deskripsi Fungsi & Interaksi Pengguna |
| :--- | :--- |
| **1. Sakelar Biner 8-Bit Interaktif** | 8 toggle switch mewakili bit biner (pangkat 2: 128 s.d. 1) dengan kalkulasi otomatis desimal langsung dan kuis tantangan tebak angka biner. |
| **2. Simulator Warna RGB 24-Bit** | Tiga slider intensitas cahaya Red (0-255), Green (0-255), dan Blue (0-255) yang menghasilkan visualisasi warna layar monitor dan kode HEX (#RRGGBB). |
| **3. Laboratorium Gerbang Logika** | Papan pengujian 6 gerbang logika digital dasar (AND, OR, NOT, XOR, NAND, NOR) dengan sakelar input A/B, lampu indikator output, dan tabel kebenaran dinamis. |

---

### 6. Modul LKPD Digital & Kuis Evaluasi Formatif
![Gambar 6](screenshots/6_lkpd_evaluasi.png)  
*Gambar 6: Modul LKPD Digital & Kuis Evaluasi Formatif*

| Penanda / Bagian UI | Deskripsi Fungsi & Interaksi Pengguna |
| :--- | :--- |
| **1. Lembar Kerja Peserta Didik Digital** | Penugasan terpadu mencakup identifikasi komponen, evaluasi studi kasus, dan pengerjaan soal bernalar kritis. |
| **2. Kuis Formatif 3 Bagian** | Terdiri dari Bagian A (Pilihan Ganda HOTS), Bagian B (Benar/Salah), dan Bagian C (Menjodohkan Beranimasi Kabel) dengan pembahasan ilmiah seketika. |
| **3. Fitur Ekspor Cetak Nilai PDF** | Tombol '🖨️ Cetak' yang menyusun hasil evaluasi murid menjadi dokumen PDF siap cetak ber-KOP sekolah resmi, lengkap dengan kotak skor nilai dan kolom tanda tangan guru. |

---

## BAB VI. BANK SOAL EVALUASI LKPD, RUBRIK & KUNCI JAWABAN ILMIAH

Modul LKPD pada Lab Maya terdiri atas **3 bagian terpadu dengan bobot total nilai 100 poin**:

### 6.1 Bagian A: Pilihan Ganda (5 Soal — Bobot 30 Poin)

#### Soal 1 (Otak Komputer)
Komponen komputer yang berfungsi sebagai 'otak' untuk memproses semua instruksi adalah...  
- **Pilihan:** A. RAM | B. CPU | C. SSD | D. GPU  
- **Jawaban Benar:** **B (CPU)**  
- **Pembahasan Ilmiah:** CPU (*Central Processing Unit*) adalah unit pemrosesan pusat yang mengeksekusi instruksi program melalui Control Unit dan ALU. RAM hanya menyimpan data sementara, SSD menyimpan data permanen, dan GPU khusus mengolah grafis.

#### Soal 2 (Kegagalan Tanpa RAM)
Apa yang terjadi jika komputer dinyalakan tanpa RAM terpasang?  
- **Pilihan:** A. Komputer berjalan normal | B. Layar gelap tapi komputer hidup | C. Komputer tidak bisa boot dan mengeluarkan bunyi beep | D. Komputer berjalan lambat saja  
- **Jawaban Benar:** **C (Komputer tidak bisa boot dan mengeluarkan bunyi beep)**  
- **Pembahasan Ilmiah:** Tanpa RAM, komputer tidak memiliki memori kerja utama untuk memuat instruksi awal firmware BIOS. POST BIOS mendeteksi ketiadaan RAM dan memicu kode error berupa bunyi beep berulang.

#### Soal 3 (Memori Non-Volatil)
Manakah yang termasuk memori non-volatil (data tidak hilang saat komputer dimatikan)?  
- **Pilihan:** A. RAM | B. Cache CPU | C. SSD | D. Register  
- **Jawaban Benar:** **C (SSD)**  
- **Pembahasan Ilmiah:** SSD (*Solid State Drive*) dan HDD menggunakan teknologi non-volatil sehingga data tetap tersimpan saat aliran listrik padam. RAM, Cache, dan Register bersifat volatil.

#### Soal 4 (Konversi Biner 8-Bit)
Berapa angka desimal dari bilangan biner `00101010`?  
- **Pilihan:** A. 22 | B. 42 | C. 52 | D. 84  
- **Jawaban Benar:** **B (42)**  
- **Pembahasan Ilmiah:** Bobot biner: $(0 \times 128) + (0 \times 64) + (1 \times 32) + (0 \times 16) + (1 \times 8) + (0 \times 4) + (1 \times 2) + (0 \times 1) = 32 + 8 + 2 = 42$ desimal.

#### Soal 5 (Model Warna RGB Aditif)
Warna kuning di layar komputer dihasilkan dari campuran warna cahaya...  
- **Pilihan:** A. Merah + Biru | B. Merah + Hijau | C. Hijau + Biru | D. Merah + Hijau + Biru  
- **Jawaban Benar:** **B (Merah + Hijau)**  
- **Pembahasan Ilmiah:** Dalam model pencampuran warna cahaya aditif (RGB) pada monitor, sub-piksel Red (255) dipadukan dengan Green (255) menghasilkan warna Kuning (`#FFFF00`).

---

### 6.2 Bagian B: Benar atau Salah (5 Soal — Bobot 30 Poin)
- **Pernyataan 1:** *"CPU adalah komponen yang menyimpan data secara permanen."*  
  👉 **Kunci: SALAH** — *Pembahasan: CPU bertugas memproses instruksi, bukan menyimpan data arsip. Penyimpanan permanen dilakukan oleh SSD/HDD.*
- **Pernyataan 2:** *"RAM adalah memori volatil — datanya hilang saat komputer dimatikan."*  
  👉 **Kunci: BENAR** — *Pembahasan: Sifat dasar memori semikonduktor DRAM pada RAM membutuhkan pasokan daya listrik dinamis agar kapasitornya mempertahankan status bit.*
- **Pernyataan 3:** *"GPU hanya dibutuhkan untuk bermain game."*  
  👉 **Kunci: SALAH** — *Pembahasan: GPU (Graphics Processing Unit) bertugas merender seluruh antarmuka grafis sistem operasi, rendering video 3D, browser hardware acceleration, dan komputasi paralel.*
- **Pernyataan 4:** *"Bilangan biner 11111111 sama dengan angka desimal 255."*  
  👉 **Kunci: BENAR** — *Pembahasan: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255. Ini adalah angka desimal maksimum yang dapat ditampung oleh 1 byte (8 bit).*
- **Pernyataan 5:** *"Motherboard adalah komponen yang memasok daya listrik ke komputer."*  
  👉 **Kunci: SALAH** — *Pembahasan: Pemasok daya utama adalah PSU (Power Supply Unit). Motherboard hanya mendistribusikan daya dan menghubungkan bus sinyal data.*

---

### 6.3 Bagian C: Menjodohkan Komponen & Fungsinya (5 Pasang — Bobot 40 Poin)
Siswa menghubungkan kartu komponen di kolom kiri dengan definisi fungsinya di kolom kanan melalui interaksi klik dua titik beranimasi kabel:
1. **CPU** ➔ Otak pemroses instruksi utama komputer (ALU + Control Unit).
2. **RAM** ➔ Memori kerja sementara berkecepatan tinggi tempat instruksi aktif dimuat.
3. **SSD** ➔ Menyimpan data, program aplikasi, dan berkas sistem operasi secara permanen.
4. **GPU** ➔ Mengolah kalkulasi piksel dan menampilkan visual pada layar monitor.
5. **PSU** ➔ Memasok dan mengonversi arus daya listrik AC ke DC bagi seluruh komponen.

---

## BAB VII. FITUR PEDAGOGIS KHUSUS & DIFERENSIASI

### 7.1 Scaffolding Pembelajaran Bertahap
Lab Maya menerapkan teknik scaffolding kognitif melalui panduan stepper adaptif (*Langkah 1 dari 5*). Peserta didik yang baru pertama kali merakit komputer tidak akan merasa bingung karena sistem secara cerdas memberikan highlight soket sasaran, tooltip instruksi, dan konfirmasi visual seketika.

### 7.2 Umpan Balik Instan Multi-Indera (*Immediate Feedback*)
- **Pemasangan Benar:** Komponen mengunci sempurna pada soket motherboard disertai efek nada mekanis D5-A5 dan badge konfirmasi hijau.
- **Pemasangan Salah:** Komponen terpantul kembali ke rak disertai animasi getaran (*shake*), nada disonansi 150 Hz, serta dialog peringatan keselamatan yang menerangkan alasan inkompatibilitas.

### 7.3 Fitur Ekspor Cetak LKPD Ber-KOP Resmi
Satu-satunya di kelasnya, Lab Maya ini menyediakan tombol **'🖨️ Cetak'** yang secara otomatis mengonversi hasil lembar kerja siswa menjadi dokumen cetak PDF ber-KOP resmi, lengkap dengan kotak skor nilai (0-100), predikat kelulusan (Sangat Baik / Baik / Cukup), dan kolom tanda tangan pengesahan guru pamong.

---

## BAB VIII. ARSITEKTUR TEKNIS & KEPATUHAN JUKNIS

1. **Arsitektur SPA Mandiri:** Seluruh antarmuka dikemas dalam arsitektur *Single Page Application* (SPA) murni berbasis HTML5, CSS3, dan JavaScript standar tanpa framework luar.
2. **Zero External CDN:** Aplikasi beroperasi 100% secara offline. Seluruh jenis huruf lokal (Fredoka, Nunito, Poppins) disimpan di direktori internal `assets/fonts/`.
3. **Web Audio Synthesis:** Tidak mengandalkan rekaman audio MP3 eksternal, melainkan memanfaatkan *native Web Audio API* untuk menghasilkan frekuensi gelombang suara sintetis.
4. **Efisiensi Ukuran Berkas:** Total ukuran direktori karya hanya berkisar 4,5 MB (sangat jauh di bawah ambang batas 150 MB pada Juknis), sehingga sangat ringan untuk didistribusikan ke sekolah.
5. **Rasio Layar 16:9 Adaptif:** Menjaga rasio aspek tetap optimal pada resolusi proyektor kelas (1280x720) hingga monitor Full HD (1920x1080).
