# Sistem Komputer

## Deskripsi
Modul yang memberikan pemahaman mendalam tentang bagaimana komputer bekerja, mulai dari perangkat keras (hardware), perangkat lunak (software), hingga cara komputer merepresentasikan data dalam bentuk digital (biner).

## Capaian Pembelajaran (CP)
- Mengidentifikasi dan menjelaskan fungsi komponen utama komputer (CPU, RAM, storage, I/O)
- Memahami peran sistem operasi sebagai pengelola sumber daya komputer
- Menjelaskan cara komputer merepresentasikan data (teks, gambar, suara) dalam bentuk biner
- Melakukan konversi antar sistem bilangan (desimal, biner, oktal, heksadesimal)
- Memahami konsep antarmuka pengguna (UI) dan interaksi manusia-komputer

---

## Daftar Sub-Materi

### 01. Perangkat Keras (Hardware)
- **Tujuan Pembelajaran**: Siswa mengenali komponen fisik komputer dan memahami fungsi masing-masing.
- **Materi Pokok**:
  - Arsitektur Von Neumann: input → proses → output → storage
  - Komponen utama:
    - CPU (Central Processing Unit): otak komputer, clock speed, core
    - RAM (Random Access Memory): memori sementara, kapasitas
    - Storage: HDD vs SSD, kapasitas, kecepatan
    - Motherboard: papan utama yang menghubungkan semua komponen
    - GPU (Graphics Processing Unit): untuk grafis dan AI
    - PSU (Power Supply Unit): sumber daya listrik
  - Perangkat input: keyboard, mouse, scanner, microphone, webcam, touchscreen
  - Perangkat output: monitor, printer, speaker, projector
  - Perangkat input/output: touchscreen, modem, flash drive
  - Brainware: manusia sebagai pengguna dan pengembang
  - Spesifikasi komputer: cara membaca dan membandingkan spek
- **Aktivitas**:
  - [ ] Unplugged: "Bongkar PC" — identifikasi komponen dari foto PC yang dibuka casingnya
  - [ ] Plugged: Kunjungi website benchmark (UserBenchmark) — bandingkan spek 3 laptop/PC
  - [ ] Unplugged: Buat diagram arsitektur Von Neumann dari kertas berwarna
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi komponen dari gambar (15 soal drag & drop)
  - [ ] Quiz: Cocokkan komponen dengan fungsinya
  - [ ] Latihan: Rakit "PC impian" dengan budget Rp 8 juta (riset harga online)
- **Game Interaktif**:
  - [ ] PC Builder simulator: Drag & drop komponen ke motherboard
  - [ ] Quiz visual: Tebak komponen dari foto close-up
- **Referensi & Link**:
  - Video MPI: Komponen Komputer Interaktif
  - Video YouTube: "What's Inside a Computer?"

### 02. Perangkat Lunak & Sistem Operasi
- **Tujuan Pembelajaran**: Siswa memahami perbedaan jenis perangkat lunak dan peran sistem operasi.
- **Materi Pokok**:
  - Jenis perangkat lunak:
    - System software: OS, driver, utility
    - Application software: office, browser, game
    - Programming software: IDE, compiler, interpreter
  - Sistem operasi populer:
    - Windows: fitur utama, versi
    - macOS: ekosistem Apple
    - Linux: open source, distro (Ubuntu, Mint)
    - Android & iOS: mobile OS
    - ChromeOS: cloud-based
  - Fungsi sistem operasi:
    - Manajemen proses (task manager)
    - Manajemen memori
    - Manajemen file (file system: NTFS, ext4, FAT32)
    - Manajemen perangkat (driver)
    - Antarmuka pengguna (GUI vs CLI)
  - Open source vs proprietary (closed source)
  - Lisensi software: freeware, shareware, open source, commercial
- **Aktivitas**:
  - [ ] Plugged: Eksplorasi Task Manager (Windows) — identifikasi proses, penggunaan CPU/RAM
  - [ ] Plugged: Coba Linux via live USB atau virtual machine (VirtualBox)
  - [ ] Plugged: Gunakan Command Prompt/Terminal untuk operasi file dasar (dir, cd, mkdir, copy)
- **Evaluasi / Quiz**:
  - [ ] Quiz: Klasifikasi perangkat lunak (system/application/programming) — 10 soal
  - [ ] Quiz: Fungsi sistem operasi (8 soal)
  - [ ] Praktik: Navigasi file system menggunakan CLI

### 03. Representasi Data Digital
- **Tujuan Pembelajaran**: Siswa memahami bagaimana komputer menyimpan dan memproses berbagai jenis data.
- **Materi Pokok**:
  - Bit dan Byte: unit terkecil data digital
    - 1 bit = 0 atau 1
    - 1 Byte = 8 bit
    - KB, MB, GB, TB, PB
  - Representasi teks:
    - ASCII: 128 karakter (A=65, a=97, 0=48)
    - Unicode: mendukung semua bahasa dunia (emoji!)
    - UTF-8: encoding paling umum di web
  - Representasi gambar:
    - Pixel: titik terkecil pada layar
    - RGB: Red-Green-Blue (0-255 per channel)
    - Resolusi: jumlah pixel (1920×1080 = Full HD)
    - Bitmap vs Vector
  - Representasi suara:
    - Gelombang suara → digital: sampling rate (44.1 kHz)
    - Bit depth: kehalusan suara (16-bit, 24-bit)
    - Format: WAV, MP3, FLAC
  - Representasi video:
    - Frame per second (FPS): 24, 30, 60
    - Codec dan container: H.264, MP4, AVI
- **Aktivitas**:
  - [ ] Unplugged: "Pesan Rahasia Biner" — encode nama dalam ASCII biner, tukarkan dengan teman untuk di-decode
  - [ ] Plugged: Gunakan color picker online — eksperimen dengan nilai RGB
  - [ ] Plugged: Buka file gambar di hex editor — lihat data mentahnya
- **Evaluasi / Quiz**:
  - [ ] Quiz: Konversi karakter ke ASCII dan sebaliknya (10 soal)
  - [ ] Quiz: Hitung ukuran file gambar berdasarkan resolusi dan kedalaman warna
  - [ ] Latihan: Encode dan decode pesan dalam biner

### 04. Sistem Bilangan
- **Tujuan Pembelajaran**: Siswa mampu melakukan konversi antar sistem bilangan yang digunakan dalam komputer.
- **Materi Pokok**:
  - Sistem bilangan desimal (basis 10): yang kita gunakan sehari-hari
  - Sistem bilangan biner (basis 2): bahasa komputer
    - Konversi desimal → biner (pembagian berulang)
    - Konversi biner → desimal (penjumlahan pangkat 2)
  - Sistem bilangan oktal (basis 8)
    - Konversi: desimal ↔ oktal
    - Hubungan biner ↔ oktal (kelompok 3 bit)
  - Sistem bilangan heksadesimal (basis 16)
    - Digit: 0-9, A-F
    - Konversi: desimal ↔ heksadesimal
    - Hubungan biner ↔ heksadesimal (kelompok 4 bit)
    - Penggunaan: kode warna (#FF5733), alamat memori
  - Operasi aritmatika biner: penjumlahan, pengurangan
- **Aktivitas**:
  - [ ] Unplugged: "Kartu Biner" — 5 kartu dengan titik (1, 2, 4, 8, 16) untuk membuat bilangan
  - [ ] Unplugged: Konversi umur, nomor rumah, dan nomor HP ke biner
  - [ ] Plugged: Gunakan kalkulator programmer (Windows Calculator → Programmer mode)
  - [ ] Plugged: Eksperimen kode warna hex di CSS
- **Evaluasi / Quiz**:
  - [ ] Quiz konversi: 15 soal campuran (desimal↔biner↔oktal↔hex)
  - [ ] Speed challenge: konversi secepat mungkin (timer)
  - [ ] Latihan: Gunakan hex color codes untuk mendesain palet warna
- **Game Interaktif**:
  - [ ] Binary counting game: Nyalakan/matikan bit untuk membuat angka target
  - [ ] Hex color challenge: Tebak warna dari kode hex
- **Referensi & Link**:
  - Video MPI: Sistem Bilangan Interaktif
  - Halaman interaktif: `02-sistem-bilangan/index.html` (sudah dibuat)

### 05. Interaksi Manusia-Komputer (IMK)
- **Tujuan Pembelajaran**: Siswa memahami prinsip-prinsip desain antarmuka dan bagaimana manusia berinteraksi dengan komputer.
- **Materi Pokok**:
  - Apa itu HCI (Human-Computer Interaction)?
  - Evolusi antarmuka:
    - CLI (Command Line Interface): perintah teks
    - GUI (Graphical User Interface): klik dan drag
    - NUI (Natural User Interface): sentuh, gestur, suara
    - Masa depan: VR, AR, brain-computer interface
  - Prinsip desain UI:
    - Konsistensi: elemen serupa terlihat dan berfungsi sama
    - Feedback: sistem memberi respons atas aksi pengguna
    - Visibility: semua opsi terlihat jelas
    - Simplicity: sesederhana mungkin
  - Aksesibilitas:
    - Desain untuk semua orang (termasuk disabilitas)
    - Screen reader, kontras warna, ukuran teks
  - Usability testing: mengukur kemudahan penggunaan
- **Aktivitas**:
  - [ ] Plugged: Evaluasi 3 website/aplikasi — nilai berdasarkan prinsip desain UI
  - [ ] Plugged: Desain wireframe aplikasi sederhana (kertas atau Figma)
  - [ ] Unplugged: "UI Paper Prototype" — gambar tampilan aplikasi di kertas, uji dengan teman
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi pelanggaran prinsip desain UI dalam screenshot (10 soal)
  - [ ] Proyek: Desain ulang tampilan aplikasi yang buruk menjadi lebih baik
