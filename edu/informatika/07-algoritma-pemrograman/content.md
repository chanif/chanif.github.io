# Algoritma dan Pemrograman

## Deskripsi
Modul inti yang mengajarkan siswa berpikir seperti programmer: merancang algoritma, menulis kode, dan membangun program yang bekerja. Dimulai dari pemrograman visual (Scratch) lalu bertransisi ke pemrograman teks (Python).

## Capaian Pembelajaran (CP)
- Merancang algoritma menggunakan flowchart dan pseudocode
- Membuat program menggunakan pemrograman blok (Scratch)
- Memahami konsep variabel, tipe data, operator
- Menerapkan struktur kontrol: sekuensial, percabangan (if-else), perulangan (loop)
- Menulis program sederhana menggunakan Python
- Menerapkan fungsi dan modularitas dalam program
- Melaksanakan proyek pemrograman dari ide sampai produk

---

## Daftar Sub-Materi

### 01. Konsep Algoritma
- **Tujuan Pembelajaran**: Siswa memahami konsep algoritma secara mendalam dan mampu menuliskan flowchart serta pseudocode.
- **Materi Pokok**:
  - Review: Apa itu algoritma? (dari modul BK)
  - Notasi algoritma:
    - Bahasa natural (deskriptif)
    - Flowchart: simbol standar ISO
    - Pseudocode: notasi semi-formal
  - Flowchart detail:
    - Simbol: terminator, proses, decision, I/O, connector, predefined process
    - Aturan penggambaran: atas → bawah, kiri → kanan
    - Multi-decision (if-elif-else)
    - Loop dalam flowchart
  - Pseudocode conventions:
    - MULAI, BACA, TULIS, JIKA-MAKA-JIKA_TIDAK, SELAMA, UNTUK, SELESAI
  - Tracing algoritma: menjalankan algoritma secara manual (dry run)
  - Contoh kasus: menentukan bilangan prima, mengurutkan 3 bilangan, menghitung faktorial
- **Aktivitas**:
  - [ ] Unplugged: Buat flowchart untuk menentukan apakah sebuah tahun adalah tahun kabisat
  - [ ] Unplugged: Tulis pseudocode untuk menghitung diskon belanja
  - [ ] Plugged: Gunakan Flowgorithm — buat dan jalankan flowchart digital
- **Evaluasi / Quiz**:
  - [ ] Quiz: Tracing algoritma — tentukan output dari flowchart yang diberikan (10 soal)
  - [ ] Latihan: Buat flowchart dan pseudocode untuk 3 kasus berbeda
- **Game Interaktif**:
  - [ ] Flowchart puzzle: Susun blok flowchart dalam urutan yang benar
- **Referensi & Link**:
  - Halaman interaktif: `01-konsep-algoritma/index.html` (sudah ada)

### 02. Pemrograman Blok (Scratch)
- **Tujuan Pembelajaran**: Siswa mampu membuat program interaktif menggunakan pemrograman visual Scratch.
- **Materi Pokok**:
  - Pengenalan Scratch (scratch.mit.edu):
    - Antarmuka: stage, sprite, block palette, script area
    - Kategori blok: motion, looks, sound, events, control, sensing, operators, variables
  - Proyek pertama: membuat karakter bergerak
  - Sprite dan kostum:
    - Menambah/mengganti sprite
    - Animasi: ganti kostum secara bergantian
  - Event-driven programming:
    - When flag clicked, when key pressed, when sprite clicked
    - Broadcasting messages antar sprite
  - Suara dan efek visual
  - Membuat cerita interaktif (storytelling)
  - Membuat animasi sederhana
- **Aktivitas**:
  - [ ] Plugged: Tutorial guided — buat program "Kucing mengejar tikus"
  - [ ] Plugged: Buat animasi cerita pendek (3 scene, 2+ karakter)
  - [ ] Plugged: Remix proyek Scratch orang lain — tambahkan fitur baru
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi fungsi blok Scratch (10 soal visual)
  - [ ] Proyek: Buat cerita interaktif dengan minimal 3 sprite dan 2 scene
- **Referensi & Link**:
  - Halaman interaktif: `02-pemrograman-blok-scratch/index.html` (sudah ada)
  - Link: scratch.mit.edu

### 03. Variabel dan Tipe Data
- **Tujuan Pembelajaran**: Siswa memahami konsep variabel sebagai wadah penyimpanan data dalam program.
- **Materi Pokok**:
  - Apa itu variabel? Analogi: kotak berlabel yang menyimpan benda
  - Tipe data:
    - Integer (bilangan bulat): 42, -7, 0
    - Float (bilangan desimal): 3.14, -2.5
    - String (teks): "Halo", "Informatika"
    - Boolean (benar/salah): True, False
  - Variabel di Scratch:
    - Membuat variabel: "Make a Variable"
    - Set dan change
    - Menampilkan variabel di stage
  - Variabel di Python:
    - Deklarasi: `nama = "Andi"`, `umur = 14`
    - Aturan penamaan: huruf kecil, underscore, deskriptif
    - Dynamic typing (Python otomatis menentukan tipe)
  - Operator:
    - Aritmatika: +, -, *, /, //, %, **
    - Perbandingan: ==, !=, <, >, <=, >=
    - Logika: and, or, not
  - Input dan output:
    - Scratch: ask and wait, say
    - Python: input(), print()
  - Konversi tipe: int(), float(), str()
- **Aktivitas**:
  - [ ] Plugged Scratch: Buat kalkulator sederhana (input 2 angka, pilih operasi, tampilkan hasil)
  - [ ] Plugged Python: Buat program yang menghitung luas berbagai bangun datar
  - [ ] Plugged Python: Buat program konversi suhu (Celsius → Fahrenheit → Kelvin)
- **Evaluasi / Quiz**:
  - [ ] Quiz: Tentukan tipe data dari nilai yang diberikan (10 soal)
  - [ ] Quiz: Hitung hasil operasi aritmatika dan logika (10 soal)
  - [ ] Latihan: Buat program kalkulator BMI (Body Mass Index)

### 04. Percabangan (If-Else)
- **Tujuan Pembelajaran**: Siswa mampu membuat program yang mengambil keputusan berdasarkan kondisi.
- **Materi Pokok**:
  - Konsep percabangan: program memilih jalur berdasarkan kondisi
  - Percabangan di Scratch:
    - if-then
    - if-then-else
    - Nested if (if di dalam if)
  - Percabangan di Python:
    - `if kondisi:`
    - `if-else`
    - `if-elif-else` (multiple conditions)
    - Nested if
  - Operator perbandingan dalam kondisi
  - Operator logika: and, or, not
    - Tabel kebenaran
  - Contoh kasus:
    - Menentukan kelulusan (nilai >= 75)
    - Menentukan grade (A/B/C/D/E)
    - Menentukan bilangan positif/negatif/nol
    - Kalkulator diskon berdasarkan total belanja
- **Aktivitas**:
  - [ ] Plugged Scratch: Buat game kuis — benar mendapat poin, salah dikurangi
  - [ ] Plugged Python: Buat program penentuan grade nilai
  - [ ] Plugged Python: Buat program "Apakah kamu bisa masuk wahana?" (cek tinggi dan umur)
- **Evaluasi / Quiz**:
  - [ ] Quiz: Tracing — tentukan output dari kode if-else (10 soal)
  - [ ] Latihan: Buat program rekomendasi pakaian berdasarkan cuaca dan acara

### 05. Perulangan (Loop)
- **Tujuan Pembelajaran**: Siswa mampu membuat program yang melakukan tindakan berulang secara efisien.
- **Materi Pokok**:
  - Mengapa perlu loop? Menghindari repetisi kode
  - Loop di Scratch:
    - repeat (N) — ulang N kali
    - forever — ulang selamanya
    - repeat until (kondisi) — ulang sampai kondisi terpenuhi
  - Loop di Python:
    - `for` loop: iterasi dengan range(), list
    - `while` loop: ulang selama kondisi True
    - `break`: keluar dari loop
    - `continue`: skip iterasi saat ini
  - Nested loop (loop bersarang):
    - Contoh: mencetak pola bintang segitiga
    - Contoh: tabel perkalian
  - Akumulator pattern: menjumlahkan/menghitung di dalam loop
  - Infinite loop: apa yang terjadi dan bagaimana menghindarinya
  - Contoh kasus:
    - Mencetak bilangan 1-100
    - Menghitung jumlah bilangan genap dari 1-N
    - Menampilkan tabel perkalian
    - Permainan tebak angka (while loop)
- **Aktivitas**:
  - [ ] Plugged Scratch: Buat animasi menggunakan loop (sprite berputar, bergerak bolak-balik)
  - [ ] Plugged Python: Buat program mencetak pola bintang (segitiga, piramida)
  - [ ] Plugged Python: Buat game "Tebak Angka" — komputer pilih angka random, user menebak
- **Evaluasi / Quiz**:
  - [ ] Quiz: Tracing loop — tentukan output (10 soal)
  - [ ] Quiz: Identifikasi jenis loop yang tepat untuk situasi tertentu
  - [ ] Latihan: Buat program FizzBuzz (1-100)
- **Referensi & Link**:
  - Halaman interaktif: `05-perulangan-loop/index.html` (sudah ada)

### 06. Python Dasar
- **Tujuan Pembelajaran**: Siswa mampu menulis program Python dari nol, termasuk menggunakan library dasar.
- **Materi Pokok**:
  - Setup Python: instalasi, IDLE, VS Code, Google Colab
  - Python Turtle:
    - Menggambar bentuk geometri: persegi, segitiga, lingkaran
    - Perintah: forward(), backward(), left(), right(), penup(), pendown()
    - Warna dan fill
    - Membuat pola kompleks dengan loop
  - String manipulation:
    - Slicing: `nama[0:3]`
    - Methods: upper(), lower(), strip(), replace(), split(), join()
    - f-string formatting: `f"Halo {nama}"`
    - String length: len()
  - List (array):
    - Membuat list: `buah = ["apel", "jeruk", "mangga"]`
    - Akses elemen: index, slicing
    - Methods: append(), remove(), sort(), reverse()
    - List comprehension (dasar)
    - Iterasi list dengan for loop
  - Dictionary (dasar):
    - Key-value pairs: `siswa = {"nama": "Andi", "umur": 14}`
    - Akses, tambah, hapus data
  - Error handling dasar:
    - try-except
    - Jenis error: SyntaxError, TypeError, ValueError, IndexError
- **Aktivitas**:
  - [ ] Plugged: Buat seni Turtle — gambar rumah, bunga, atau mandala
  - [ ] Plugged: Buat program "To-Do List" dengan list Python
  - [ ] Plugged: Buat program biodata siswa menggunakan dictionary
- **Evaluasi / Quiz**:
  - [ ] Quiz: Output dari kode Python (12 soal)
  - [ ] Latihan: Buat program manipulasi string (palindrome checker, word counter)
  - [ ] Latihan: Buat program manajemen kontak sederhana (CRUD) menggunakan list/dict
- **Referensi & Link**:
  - Halaman interaktif: `06-python-dasar/index.html` (sudah ada)

### 07. Fungsi dan Modularitas
- **Tujuan Pembelajaran**: Siswa mampu membuat dan menggunakan fungsi untuk membuat kode yang modular dan reusable.
- **Materi Pokok**:
  - Apa itu fungsi? Blok kode yang dapat dipanggil berulang kali
  - Fungsi di Scratch: "Make a Block" (custom block)
  - Fungsi di Python:
    - Mendefinisikan fungsi: `def nama_fungsi():`
    - Parameter dan argumen
    - Return value: `return hasil`
    - Default parameter: `def sapa(nama="Dunia"):`
    - Multiple return values
  - Scope variabel: local vs global
  - DRY principle: Don't Repeat Yourself
  - Modularitas: memecah program besar jadi fungsi-fungsi kecil
  - Built-in functions vs user-defined functions
  - Import module: math, random, datetime
  - Contoh kasus:
    - Fungsi menghitung luas berbagai bangun datar
    - Fungsi validasi password (panjang, huruf besar, angka)
    - Fungsi konversi mata uang
- **Aktivitas**:
  - [ ] Plugged: Refactor kode sebelumnya — ubah kode repetitif menjadi fungsi
  - [ ] Plugged: Buat library fungsi matematika sendiri (luas, keliling, volume)
  - [ ] Plugged: Buat program dengan import random — game dadu atau kartu
- **Evaluasi / Quiz**:
  - [ ] Quiz: Tracing fungsi — tentukan output (10 soal)
  - [ ] Quiz: Identifikasi parameter, argumen, dan return value
  - [ ] Latihan: Buat program kalkulator ilmiah menggunakan fungsi

### 08. Proyek Pemrograman
- **Tujuan Pembelajaran**: Siswa mengaplikasikan semua konsep pemrograman dalam proyek nyata.
- **Materi Pokok**:
  - Siklus pengembangan software:
    1. Ideation: brainstorming ide
    2. Planning: desain algoritma dan antarmuka
    3. Coding: implementasi
    4. Testing: uji coba dan debug
    5. Deployment: membagikan hasil
    6. Iteration: perbaikan berdasarkan feedback
  - Contoh topik proyek Scratch:
    - Game platformer sederhana
    - Kuis interaktif multi-level
    - Cerita interaktif bercabang
    - Simulasi sains (tata surya, ekosistem)
  - Contoh topik proyek Python:
    - Text-based adventure game
    - Program keuangan pribadi (catat pemasukan/pengeluaran)
    - Quiz app dengan scoring dan leaderboard
    - Password generator dan strength checker
  - Debugging tips: print debugging, reading error messages
  - Dokumentasi kode: komentar yang baik
  - Rubrik penilaian proyek
- **Aktivitas**:
  - [ ] Proyek individu/kelompok (3-4 minggu)
  - [ ] Milestone: proposal → prototype → testing → presentasi
  - [ ] Code review: siswa me-review kode teman
- **Evaluasi / Quiz**:
  - [ ] Penilaian proyek berdasarkan rubrik (fungsionalitas: 30%, kreativitas: 20%, kode: 25%, presentasi: 15%, dokumentasi: 10%)
  - [ ] Demo day: presentasi proyek di depan kelas
