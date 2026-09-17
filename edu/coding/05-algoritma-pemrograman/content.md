# Algoritma dan Pemrograman (KKA)

## Deskripsi
Elemen kelima KKA yang fokus pada keterampilan menulis kode. Dimulai dari pemrograman blok (Scratch) untuk membangun fondasi logika, lalu bertransisi ke pemrograman teks (Python) untuk aplikasi yang lebih kompleks termasuk game dan proyek data sederhana.

## Capaian Pembelajaran (CP) — BSKAP No. 046/H/KR/2025
- Membuat program interaktif menggunakan pemrograman blok (Scratch)
- Menerapkan event handling dan interaksi pengguna dalam program
- Menggunakan variabel, kondisi, dan operator dalam program
- Menerapkan pengulangan (loop) dan fungsi untuk efisiensi kode
- Menulis program Python untuk menyelesaikan masalah
- Membuat game sederhana dan proyek aplikasi nyata

---

## Daftar Sub-Materi

### 01. Pemrograman Blok (Scratch)
- **Tujuan Pembelajaran**: Siswa mampu membuat program interaktif menggunakan Scratch sebagai fondasi logika pemrograman.
- **Materi Pokok**:
  - Mengapa Scratch? Belajar coding tanpa typing error
  - Interface Scratch:
    - Stage: layar output
    - Sprite: karakter/objek
    - Block palette: kategori blok instruksi
    - Script area: tempat menyusun program
    - Costume tab: tampilan sprite
    - Sound tab: suara
  - Blok dasar per kategori:
    - Motion: move, turn, go to, glide
    - Looks: say, think, show, hide, change costume, change effect
    - Sound: play sound, change volume
    - Events: when flag clicked, when key pressed, when this sprite clicked
    - Control: wait, repeat, forever, if-then, if-then-else, stop
    - Sensing: touching, key pressed, ask and wait, mouse position
    - Operators: math, comparison, logic, random, join
    - Variables: set, change, show, hide
  - Proyek pertama: "Hello World" — sprite menyapa saat diklik
  - Membuat animasi: ganti kostum + gerakan = animasi
  - Coordinate system: x (-240 to 240), y (-180 to 180)
- **Aktivitas**:
  - [ ] Plugged: Tutorial — buat sprite yang bergerak dan bersuara saat diklik
  - [ ] Plugged: Buat animasi kupu-kupu terbang menggunakan costume switch + motion
  - [ ] Plugged: Eksplorasi proyek Scratch orang lain → remix dengan tambahan fitur
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi fungsi blok Scratch (12 soal visual)
  - [ ] Praktik: Buat animasi cerita pendek (min. 2 sprite, 3 scene)

### 02. Event dan Interaksi
- **Tujuan Pembelajaran**: Siswa memahami event-driven programming dan membuat program yang responsif terhadap input.
- **Materi Pokok**:
  - Event-driven programming: program merespons kejadian (event)
  - Jenis event di Scratch:
    - When green flag clicked: program dimulai
    - When key pressed: input keyboard (panah, spasi, huruf)
    - When this sprite clicked: input mouse
    - When backdrop switches: perubahan scene
    - When I receive [message]: komunikasi antar sprite
  - Broadcasting:
    - broadcast [message]: kirim pesan ke semua sprite
    - when I receive [message]: terima pesan dan jalankan kode
    - Koordinasi antar sprite: dialog, scene transition
  - Membuat game interaktif:
    - Player control: gerakkan karakter dengan keyboard
    - Collision detection: "touching" dan "touching color"
    - Score system: variabel score
    - Timer: countdown
    - Game over condition
  - Contoh proyek:
    - Maze game: arahkan karakter menuju finish
    - Catch game: tangkap objek yang jatuh
    - Shooting game: tembak target
- **Aktivitas**:
  - [ ] Plugged: Buat karakter yang dikendalikan keyboard (panah + spasi untuk lompat)
  - [ ] Plugged: Buat game "Catch the Falling Objects" dengan scoring
  - [ ] Plugged: Buat dialog interaktif 2 karakter menggunakan broadcast
- **Evaluasi / Quiz**:
  - [ ] Quiz: Konsep event dan broadcast (10 soal)
  - [ ] Proyek: Buat game dengan min. 3 jenis event dan scoring system

### 03. Variabel dan Kondisi
- **Tujuan Pembelajaran**: Siswa memahami variabel dan percabangan untuk membuat program yang cerdas.
- **Materi Pokok**:
  - Variabel di Scratch:
    - Membuat variabel: "Make a Variable"
    - Scope: for this sprite only vs for all sprites
    - Set [var] to [value]: memberi nilai
    - Change [var] by [value]: menambah/mengurangi
    - Menampilkan variabel di stage
  - Tipe data (implisit di Scratch):
    - Angka: 42, 3.14
    - String: "Halo", "Informatika"
    - Boolean: conditions (true/false)
  - Operator:
    - Aritmatika: +, -, ×, ÷, mod
    - Perbandingan: <, =, >
    - Logika: and, or, not
    - String: join, letter of, length of, contains
    - Random: pick random (min) to (max)
  - Percabangan (kondisional):
    - If-then: jalankan jika kondisi benar
    - If-then-else: dua jalur berdasarkan kondisi
    - Nested if: if di dalam if
  - Contoh penerapan:
    - Score tracker: variabel score bertambah saat benar
    - Lives system: variabel nyawa berkurang saat salah
    - Level system: ubah backdrop saat score mencapai threshold
    - Quiz app: cek jawaban benar/salah
  - Variabel di Python (pengenalan):
    - `nama = "Andi"`, `score = 0`
    - `if score > 10:` → print("Level up!")
- **Aktivitas**:
  - [ ] Plugged: Buat quiz 5 soal di Scratch — score bertambah jika benar, nyawa berkurang jika salah
  - [ ] Plugged: Buat game dengan level system (score 10 → level 2, score 20 → level 3)
  - [ ] Plugged: Buat kalkulator sederhana di Scratch (ask → hitung → say)
- **Evaluasi / Quiz**:
  - [ ] Quiz: Tracing variabel dan kondisi — tentukan output (10 soal)
  - [ ] Proyek: Buat aplikasi interaktif yang menggunakan min. 3 variabel dan percabangan

### 04. Pengulangan dan Fungsi
- **Tujuan Pembelajaran**: Siswa menguasai loop dan custom block untuk membuat program yang efisien.
- **Materi Pokok**:
  - Pengulangan di Scratch:
    - repeat [N]: ulang N kali
    - forever: ulang selamanya (untuk game loop)
    - repeat until [condition]: ulang sampai kondisi terpenuhi
  - Pattern dengan loop:
    - Animasi berkelanjutan: forever + motion
    - Menggambar dengan Pen: repeat + move + turn = bentuk geometri
    - Counter: variabel + repeat
  - Nested loop: loop di dalam loop
    - Contoh: menggambar grid, mencetak pola
  - Custom Block (My Blocks):
    - Membuat blok sendiri: "Make a Block"
    - Input parameters: blok dengan variabel
    - DRY principle: Don't Repeat Yourself
    - Refactoring: mengubah kode repetitif menjadi custom block
  - Fungsi di Python (pengenalan):
    - `def sapa(nama):` → `print(f"Halo {nama}")`
    - Parameter dan return value
    - Memanggil fungsi: `sapa("Andi")`
  - Debugging:
    - Step-by-step execution: slow down blocks
    - Add broadcast messages for debugging
    - Say block untuk menampilkan nilai variabel
- **Aktivitas**:
  - [ ] Plugged: Gambar bentuk geometri dengan Pen extension (segitiga, persegi, bintang, spiral)
  - [ ] Plugged: Buat custom block "draw_polygon(sides, size)" — satu blok untuk semua bentuk
  - [ ] Plugged: Refactor game yang sudah dibuat — ubah kode repetitif menjadi custom block
  - [ ] Plugged: Buat animasi kaleidoskop menggunakan nested loop
- **Evaluasi / Quiz**:
  - [ ] Quiz: Tracing loop — tentukan output/gambar yang dihasilkan (10 soal)
  - [ ] Proyek: Buat generative art menggunakan loop dan custom block

### 05. Pengenalan Python
- **Tujuan Pembelajaran**: Siswa mampu menulis program Python dasar dan memahami transisi dari pemrograman blok ke teks.
- **Materi Pokok**:
  - Mengapa Python? Mudah dibaca, banyak digunakan, cocok untuk AI/data
  - Setup:
    - Online: Google Colab (gratis, tanpa install)
    - Online: repl.it, trinket.io
    - Offline: Python + VS Code / IDLE
  - Syntax dasar:
    - Print: `print("Hello World")`
    - Komentar: `# ini komentar`
    - Variabel: `nama = "Andi"`, `umur = 14`
    - Input: `nama = input("Siapa namamu? ")`
    - Tipe data: int, float, str, bool
    - Konversi: int(), float(), str()
  - Operator: aritmatika, perbandingan, logika
  - String operations:
    - Concatenation: `"Halo " + nama`
    - f-string: `f"Halo {nama}, umurmu {umur}"`
    - Methods: .upper(), .lower(), .strip(), .replace()
  - Percabangan: if, elif, else
  - Loop: for (dengan range), while
  - Perbandingan Scratch vs Python:
    - say → print()
    - ask → input()
    - if-then → if:
    - repeat N → for i in range(N):
    - variable set → variabel =
  - Turtle graphics: pengenalan visual programming di Python
    - import turtle
    - forward(), backward(), left(), right()
    - pencolor(), fillcolor(), begin_fill(), end_fill()
- **Aktivitas**:
  - [ ] Plugged: "Hello World" di Python — first program!
  - [ ] Plugged: Buat program biodata interaktif (input nama, umur, hobi → output terformat)
  - [ ] Plugged: Konversi proyek Scratch ke Python — bandingkan blok vs teks
  - [ ] Plugged: Buat seni Turtle — gambar rumah, bunga, atau mandala
- **Evaluasi / Quiz**:
  - [ ] Quiz: Syntax Python dasar (12 soal — pilih output yang benar)
  - [ ] Latihan: 10 soal coding Python dasar (print, input, variabel, if-else, loop)
  - [ ] Proyek: Buat "Mad Libs" game di Python (fill-in-the-blank story)

### 06. Python untuk Data Sederhana
- **Tujuan Pembelajaran**: Siswa mampu mengolah data sederhana menggunakan Python.
- **Materi Pokok**:
  - List (array):
    - Membuat: `buah = ["apel", "jeruk", "mangga"]`
    - Akses: `buah[0]`, `buah[-1]`
    - Methods: append(), remove(), pop(), sort(), reverse()
    - Length: len(buah)
    - Iterasi: `for item in buah:`
    - List comprehension: `[x*2 for x in range(10)]`
  - Dictionary:
    - Membuat: `siswa = {"nama": "Andi", "kelas": "7A"}`
    - Akses: `siswa["nama"]`
    - Methods: .keys(), .values(), .items()
    - Nested dictionary
  - Mengolah data:
    - Menghitung statistik dari list: sum, len, max, min
    - Menghitung rata-rata: sum(data) / len(data)
    - Menghitung frekuensi: Counter dari collections
    - Sorting data: sorted()
  - File handling dasar:
    - Baca file: open(), read(), readlines()
    - Tulis file: write()
    - CSV: membaca dan menulis data tabel
  - Mini data project:
    - Analisis nilai ujian kelas
    - Word frequency counter dari teks
    - Program inventaris barang sederhana
- **Aktivitas**:
  - [ ] Plugged: Buat program "Shopping List" menggunakan list (add, remove, display)
  - [ ] Plugged: Buat program "Student Database" menggunakan list of dictionaries
  - [ ] Plugged: Analisis data: hitung rata-rata, median, modus dari dataset nilai ujian
- **Evaluasi / Quiz**:
  - [ ] Quiz: Operasi list dan dictionary (12 soal)
  - [ ] Proyek: Buat program analisis data sederhana dari file CSV

### 07. Membuat Game Sederhana
- **Tujuan Pembelajaran**: Siswa membuat game sederhana yang menggabungkan semua konsep pemrograman.
- **Materi Pokok**:
  - Game design basics:
    - Game loop: input → update → render → repeat
    - Game state: menu, playing, game over
    - Scoring dan progress
  - Game di Scratch (lanjutan):
    - Platformer: gravitasi, jumping, collision
    - RPG sederhana: dialog, inventory, battle system
    - Puzzle game: logic-based challenges
  - Game di Python (text-based):
    - Number guessing game (while loop + random)
    - Rock-paper-scissors (if-else + random)
    - Hangman (string + list)
    - Text adventure (dictionary + if-else)
    - Trivia quiz (list of dicts + loop)
  - Game dengan Pygame (pengenalan):
    - Install: pip install pygame
    - Window, surface, event loop
    - Drawing shapes dan loading images
    - Keyboard input dan movement
    - Collision detection
    - Sound effects
  - Game balancing: membuat game yang menyenangkan
    - Difficulty curve: mulai mudah, makin sulit
    - Feedback: score, lives, visual/audio feedback
    - Fairness: tidak terlalu mudah, tidak terlalu sulit
- **Aktivitas**:
  - [ ] Plugged Scratch: Buat game platformer dengan 3 level
  - [ ] Plugged Python: Buat "Hangman" game di terminal
  - [ ] Plugged Python: Buat "Text Adventure" game bercabang (min. 5 scene)
  - [ ] Plugged Python: (Opsional) Buat game sederhana dengan Pygame
- **Evaluasi / Quiz**:
  - [ ] Proyek: Buat game lengkap (Scratch atau Python) dengan scoring, levels, dan game over
  - [ ] Dokumentasi: tulis game design document
  - [ ] Playtesting: minta teman memainkan dan beri feedback

### 08. Proyek Aplikasi Koding
- **Tujuan Pembelajaran**: Siswa melaksanakan proyek pemrograman akhir yang bermanfaat.
- **Materi Pokok**:
  - Ide proyek:
    - Utility app: kalkulator, konverter satuan, password generator
    - Productivity: to-do list, habit tracker, flashcard app
    - Data app: personal finance tracker, quiz score analyzer
    - Creative: generative art, music maker, story generator
    - Social good: informasi lingkungan, health checker, educational tool
  - Software development process:
    1. Requirements: apa yang harus bisa dilakukan app?
    2. Design: bagaimana tampilan dan alurnya?
    3. Implementation: tulis kodenya
    4. Testing: uji semua fitur, cari bug
    5. Documentation: tulis README dan komentar kode
    6. Presentation: demo dan pitch
  - Code quality:
    - Naming conventions: variabel deskriptif
    - Comments: jelaskan MENGAPA, bukan APA
    - Functions: modularisasi kode
    - Error handling: try-except
  - Version control (konsep): simpan versi kode
  - Rubrik penilaian
- **Aktivitas**:
  - [ ] Proyek individu (3-4 minggu)
  - [ ] Milestone: proposal → prototype → testing → presentation
  - [ ] Code review session
- **Evaluasi / Quiz**:
  - [ ] Penilaian proyek (fungsionalitas: 30%, kualitas kode: 25%, kreativitas: 20%, presentasi: 15%, dokumentasi: 10%)
  - [ ] Demo day dan peer review
