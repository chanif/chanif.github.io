# Informatika Lanjut (SMA — Fase E/F)

## Deskripsi
Modul ekstensi untuk siswa yang ingin memperdalam informatika ke level SMA. Materi ini bersifat opsional dan ditujukan untuk siswa yang memiliki minat lebih di bidang informatika dan ingin mempersiapkan diri untuk jenjang pendidikan tinggi atau karier di bidang IT.

## Capaian Pembelajaran (CP)
- Memahami dan menerapkan struktur data dasar (array, stack, queue)
- Menulis program Python berorientasi objek (OOP)
- Merancang dan menggunakan basis data relasional dengan SQL
- Membangun aplikasi web interaktif dengan HTML, CSS, dan JavaScript
- Memahami konsep keamanan siber dan kriptografi dasar

---

## Daftar Sub-Materi

### 01. Struktur Data
- **Tujuan Pembelajaran**: Siswa memahami cara data diorganisasi dan dikelola dalam program.
- **Materi Pokok**:
  - Mengapa perlu struktur data? Efisiensi penyimpanan dan akses
  - Array / List:
    - Deklarasi dan akses elemen
    - Operasi: insert, delete, search, sort
    - Multi-dimensional array (matriks)
  - Stack (tumpukan):
    - Konsep LIFO (Last In, First Out)
    - Operasi: push, pop, peek
    - Contoh: undo/redo, browser history, validasi kurung
  - Queue (antrian):
    - Konsep FIFO (First In, First Out)
    - Operasi: enqueue, dequeue
    - Contoh: printer queue, antrian pasien
  - Linked list (konsep dasar)
  - Implementasi di Python menggunakan list dan deque
- **Aktivitas**:
  - [ ] Plugged: Implementasi stack dan queue di Python
  - [ ] Plugged: Buat program validasi kurung () [] {} menggunakan stack
  - [ ] Plugged: Simulasi antrian kasir menggunakan queue
- **Evaluasi / Quiz**:
  - [ ] Quiz: Konsep stack dan queue (10 soal)
  - [ ] Latihan: Implementasi operasi CRUD pada berbagai struktur data

### 02. OOP — Python Lanjutan
- **Tujuan Pembelajaran**: Siswa memahami konsep Object-Oriented Programming.
- **Materi Pokok**:
  - Paradigma pemrograman: prosedural vs OOP
  - Class dan Object: blueprint vs instance
  - Atribut dan method
  - Constructor: `__init__`
  - Self parameter
  - Encapsulation: private dan public
  - Inheritance: class anak mewarisi class induk
  - Polymorphism: satu method, banyak bentuk
  - Contoh kasus: sistem perpustakaan, game karakter, manajemen siswa
- **Aktivitas**:
  - [ ] Plugged: Buat class `Siswa` dengan atribut dan method
  - [ ] Plugged: Buat sistem perpustakaan sederhana (class Buku, Peminjam, Perpustakaan)
  - [ ] Plugged: Buat game RPG sederhana berbasis text (class Karakter, Monster, Item)
- **Evaluasi / Quiz**:
  - [ ] Quiz: Konsep OOP (12 soal)
  - [ ] Proyek: Buat program OOP untuk memecahkan masalah nyata

### 03. Basis Data dan SQL
- **Tujuan Pembelajaran**: Siswa mampu merancang dan menggunakan basis data relasional.
- **Materi Pokok**:
  - Apa itu basis data? Mengapa perlu basis data?
  - Basis data relasional: tabel, baris, kolom
  - DBMS: MySQL, PostgreSQL, SQLite
  - Merancang database: ERD (Entity-Relationship Diagram)
  - SQL dasar:
    - CREATE TABLE, ALTER TABLE, DROP TABLE
    - INSERT INTO
    - SELECT, WHERE, ORDER BY, LIMIT
    - UPDATE, DELETE
    - JOIN: INNER, LEFT, RIGHT
    - GROUP BY, HAVING
    - Aggregate functions: COUNT, SUM, AVG, MIN, MAX
  - Normalisasi database (1NF, 2NF, 3NF — konsep dasar)
  - Python + SQLite: akses database dari program
- **Aktivitas**:
  - [ ] Plugged: Desain database untuk sistem perpustakaan sekolah (ERD)
  - [ ] Plugged: Latihan query SQL di SQLite atau DB Fiddle (online)
  - [ ] Plugged: Buat program Python yang CRUD ke database SQLite
- **Evaluasi / Quiz**:
  - [ ] Quiz: Tulis query SQL untuk skenario tertentu (12 soal)
  - [ ] Proyek: Buat aplikasi manajemen data dengan Python + SQLite

### 04. Pemrograman Web: JavaScript
- **Tujuan Pembelajaran**: Siswa mampu menambahkan interaktivitas ke halaman web menggunakan JavaScript.
- **Materi Pokok**:
  - Apa itu JavaScript? Bahasa pemrograman untuk web
  - Penempatan JS: inline, internal, external
  - Variabel: let, const, var
  - Tipe data: string, number, boolean, array, object
  - Operator dan ekspresi
  - Struktur kontrol: if-else, switch, for, while
  - Fungsi: declaration, expression, arrow function
  - DOM manipulation:
    - getElementById, querySelector
    - innerHTML, textContent, style
    - addEventListener
    - createElement, appendChild
  - Events: click, submit, input, keydown, mouseover
  - Proyek: membuat halaman web interaktif
    - Kalkulator
    - To-do list
    - Quiz app
    - Form validation
- **Aktivitas**:
  - [ ] Plugged: Buat tombol yang mengubah warna background halaman
  - [ ] Plugged: Buat kalkulator web (HTML + CSS + JS)
  - [ ] Plugged: Buat to-do list dengan add, delete, mark complete
- **Evaluasi / Quiz**:
  - [ ] Quiz: Output dari kode JavaScript (12 soal)
  - [ ] Proyek: Buat aplikasi web interaktif lengkap

### 05. Keamanan Siber dan Kriptografi Dasar
- **Tujuan Pembelajaran**: Siswa memahami konsep keamanan siber dan kriptografi.
- **Materi Pokok**:
  - Kriptografi:
    - Caesar cipher: pergeseran alfabet
    - Substitution cipher
    - Symmetric encryption: AES (konsep)
    - Asymmetric encryption: RSA (konsep public/private key)
    - Hashing: MD5, SHA-256 (satu arah, untuk password)
  - HTTPS dan SSL/TLS: cara kerja koneksi aman
  - Digital signature dan certificate
  - Ethical hacking: penetration testing (konsep)
  - CTF (Capture The Flag): kompetisi keamanan siber
  - Career path: cybersecurity analyst, pentester, SOC analyst
- **Aktivitas**:
  - [ ] Plugged: Buat program Caesar cipher di Python
  - [ ] Plugged: Hash password menggunakan hashlib Python
  - [ ] Plugged: Mini CTF challenge — pecahkan kode enkripsi sederhana
- **Evaluasi / Quiz**:
  - [ ] Quiz: Konsep kriptografi dan keamanan siber (10 soal)
  - [ ] Challenge: Pecahkan 5 cipher yang diberikan

> **Status**: Segera Hadir — content.md sebagai roadmap, sub-materi belum diproduksi.
