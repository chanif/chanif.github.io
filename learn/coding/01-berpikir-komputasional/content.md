# Berpikir Komputasional (KKA)

## Deskripsi
Elemen pertama KKA yang melatih siswa menyelesaikan masalah secara sistematis menggunakan pendekatan komputasional. Fokus pada penerapan berpikir komputasional dalam konteks koding dan AI, berbeda dengan modul BK di Informatika yang lebih umum.

## Capaian Pembelajaran (CP) — BSKAP No. 046/H/KR/2025
- Menerapkan logika dan penalaran untuk menyelesaikan masalah
- Mendekomposisi masalah kompleks menjadi sub-masalah yang dapat diselesaikan secara komputasional
- Mengidentifikasi pola data untuk menemukan solusi efisien
- Melakukan abstraksi dan generalisasi untuk membuat model solusi
- Merancang algoritma langkah demi langkah yang dapat dieksekusi komputer/mesin

---

## Daftar Sub-Materi

### 01. Logika dan Penalaran
- **Tujuan Pembelajaran**: Siswa mampu menerapkan logika formal untuk menyelesaikan masalah.
- **Materi Pokok**:
  - Logika proposisional:
    - Proposisi: pernyataan benar atau salah
    - Operator: AND (∧), OR (∨), NOT (¬)
    - Tabel kebenaran
  - Logika dalam pemrograman:
    - Kondisi boolean: True/False
    - Operator perbandingan
    - Short-circuit evaluation
  - Penalaran deduktif vs induktif
  - Logika puzzle:
    - Puzzle logika klasik (Siapa yang makan ikan?)
    - Sudoku: penalaran eliminasi
    - Puzzle knight and knave
  - Pattern matching: mencocokkan pola dalam teks/data
- **Aktivitas**:
  - [ ] Unplugged: Selesaikan 5 logic puzzle bertingkat kesulitan
  - [ ] Unplugged: Buat tabel kebenaran untuk ekspresi logika
  - [ ] Plugged: Gunakan operator logika di Scratch/Python untuk validasi data
- **Evaluasi / Quiz**:
  - [ ] Quiz: Tabel kebenaran dan ekspresi logika (10 soal)
  - [ ] Quiz: Logic puzzles (5 soal cerita)
- **Game Interaktif**:
  - [ ] Logic puzzle game: selesaikan puzzle berbasis logika secara interaktif

### 02. Dekomposisi Masalah
- **Tujuan Pembelajaran**: Siswa mampu memecah masalah koding/AI menjadi komponen-komponen kecil.
- **Materi Pokok**:
  - Review dekomposisi (dari perspektif koding):
    - Memecah program besar jadi fungsi-fungsi kecil
    - Memecah fitur jadi task-task
  - Top-down design:
    - Mulai dari masalah besar → pecah jadi sub-masalah → pecah lagi
    - Analogi: membuat game = [input handler] + [game logic] + [rendering] + [sound]
  - Contoh dekomposisi dalam koding:
    - Membuat game: karakter + level + scoring + UI + sound
    - Membuat website: header + navbar + content + sidebar + footer
    - Membuat chatbot: input → NLP → logic → response → output
  - Dekomposisi masalah AI:
    - Klasifikasi gambar: input → preprocessing → model → prediction → output
    - Recommendation system: data collection → feature extraction → similarity → ranking
  - Teknik: task breakdown, user story, flowchart modular
- **Aktivitas**:
  - [ ] Unplugged: Dekomposisi "Membuat Game Pong" — pecah jadi 10+ sub-task
  - [ ] Plugged: Buat mind map dekomposisi untuk proyek chatbot sederhana
  - [ ] Plugged: Pecah program besar yang diberikan menjadi fungsi-fungsi
- **Evaluasi / Quiz**:
  - [ ] Praktik: Diberikan spesifikasi aplikasi, dekomposisi menjadi modul-modul
  - [ ] Quiz: Identifikasi dekomposisi yang tepat vs yang salah (8 soal)

### 03. Pengenalan Pola
- **Tujuan Pembelajaran**: Siswa mengenali pola dalam data dan code untuk meningkatkan efisiensi.
- **Materi Pokok**:
  - Pattern recognition dalam data:
    - Pola dalam dataset: tren, anomali, clustering
    - Pola dalam gambar: edges, textures, shapes (dasar computer vision)
    - Pola dalam teks: kata kunci, sentimen, frekuensi
  - Pattern recognition dalam koding:
    - Code patterns: loop, accumulator, sentinel, flag
    - Design patterns (konsep): ada pola-pola umum yang sudah terbukti
    - Refactoring: mengenali kode yang bisa disederhanakan
  - Pattern recognition dalam AI:
    - Machine learning = belajar pola dari data
    - Training data → model belajar pola → prediction
    - Overfitting: model terlalu hafal pola training data
  - Teknik menemukan pola:
    - Sorting dan grouping data
    - Visualisasi (grafik, heatmap)
    - Statistical analysis sederhana (mean, median, mode)
- **Aktivitas**:
  - [ ] Plugged: Analisis dataset sederhana (spreadsheet) — temukan 5 pola menarik
  - [ ] Plugged: Identifikasi pola dalam kode — mana yang bisa dijadikan fungsi?
  - [ ] Unplugged: Cari pola dalam barisan angka, gambar, dan DNA (ATCG)
- **Evaluasi / Quiz**:
  - [ ] Quiz: Temukan dan jelaskan pola (10 soal campuran visual+data)
  - [ ] Latihan: Refactor kode — gunakan pola yang ditemukan untuk menyederhanakan

### 04. Abstraksi dan Generalisasi
- **Tujuan Pembelajaran**: Siswa mampu membuat model abstrak yang dapat diterapkan pada berbagai situasi serupa.
- **Materi Pokok**:
  - Abstraksi dalam koding:
    - Variabel = abstraksi dari nilai
    - Fungsi = abstraksi dari serangkaian instruksi
    - Class/Object = abstraksi dari entitas dunia nyata
    - API = abstraksi dari sistem kompleks
  - Generalisasi:
    - Membuat solusi yang bisa dipakai untuk banyak kasus
    - Contoh: dari "hitung luas persegi" → "hitung luas poligon beraturan"
    - Parameterization: membuat fungsi fleksibel dengan parameter
  - Abstraksi dalam AI:
    - Feature extraction: dari data mentah → fitur penting
    - Model = abstraksi dari pola dalam data
    - API AI (seperti Google Vision, OpenAI) = abstraksi dari model kompleks
  - Tingkatan abstraksi:
    - Low-level: bit, byte, assembly
    - Mid-level: Python, Java
    - High-level: drag-and-drop tools, no-code platforms
  - Black box vs white box: kapan perlu tahu detail, kapan cukup tahu input/output
- **Aktivitas**:
  - [ ] Plugged: Buat fungsi umum (generic) yang bisa menangani berbagai tipe input
  - [ ] Plugged: Gunakan API AI (Teachable Machine) — tidak perlu tahu cara kerja internal
  - [ ] Unplugged: Gambar "abstraksi berlapis" — dari transistor hingga mengklik tombol di browser
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi level abstraksi (8 soal)
  - [ ] Latihan: Generalisasi fungsi spesifik menjadi fungsi universal

### 05. Perancangan Algoritma
- **Tujuan Pembelajaran**: Siswa mampu merancang algoritma yang efisien dan dapat diimplementasikan dalam program.
- **Materi Pokok**:
  - Algoritma pencarian (searching):
    - Linear search: cek satu per satu
    - Binary search: cari di data terurut (lebih cepat!)
    - Perbandingan efisiensi
  - Algoritma pengurutan (sorting):
    - Bubble sort: bandingkan pasangan, tukar jika salah urutan
    - Selection sort: cari terkecil, pindahkan ke depan
    - Perbandingan efisiensi (konsep Big-O sederhana)
  - Algoritma greedy:
    - Pilih solusi terbaik di setiap langkah
    - Contoh: kembalian uang dengan koin minimum
    - Contoh: knapsack problem sederhana
  - Rekursi (dasar):
    - Fungsi yang memanggil dirinya sendiri
    - Base case dan recursive case
    - Contoh: faktorial, fibonacci, tower of Hanoi
  - Strategi pemecahan masalah:
    - Brute force: coba semua kemungkinan
    - Divide and conquer: bagi masalah, selesaikan, gabungkan
    - Dynamic programming (konsep): simpan hasil yang sudah dihitung
- **Aktivitas**:
  - [ ] Plugged: Implementasi linear search dan binary search di Python
  - [ ] Plugged: Visualisasi bubble sort — buat animasi sorting
  - [ ] Unplugged: "Sorting Network" — siswa berdiri membentuk sorting network, tukar posisi berdasarkan perbandingan
  - [ ] Plugged: Implementasi rekursi: faktorial dan fibonacci
- **Evaluasi / Quiz**:
  - [ ] Quiz: Tracing algoritma pencarian dan pengurutan (10 soal)
  - [ ] Quiz: Pilih algoritma yang tepat untuk skenario tertentu
  - [ ] Challenge: Optimasi algoritma — buat solusi yang lebih efisien
- **Game Interaktif**:
  - [ ] Sorting visualizer: lihat cara kerja berbagai algoritma sorting secara visual
  - [ ] Search race: linear vs binary search — siapa yang lebih cepat?

### 06. Computational Thinking Unplugged
- **Tujuan Pembelajaran**: Siswa mempraktikkan berpikir komputasional tanpa komputer melalui aktivitas fisik dan permainan.
- **Materi Pokok**:
  - Aktivitas CS Unplugged:
    - Binary numbers: kartu biner untuk menghitung
    - Image representation: pixel art dengan grid kertas
    - Sorting network: berdiri dan bertukar posisi
    - Error detection: cek paritas (kartu magic)
    - Finite automata: petualangan maze dengan aturan
  - Permainan strategi berbasis algoritma:
    - Nim game: strategi menang pasti
    - 20 Questions: binary search
    - Mastermind: deduksi logis
  - Robot tanpa komputer:
    - Instruksi untuk "robot manusia" — presisi bahasa
    - Debuging instruksi yang salah
  - Koneksi ke dunia nyata:
    - Bagaimana Google Maps menemukan rute terpendek?
    - Bagaimana Spotify merekomendasikan lagu?
    - Bagaimana Instagram menyortir feed?
- **Aktivitas**:
  - [ ] Unplugged: Kartu biner — hitung angka tanpa kalkulator
  - [ ] Unplugged: Pixel art — gambar menggunakan grid berwarna
  - [ ] Unplugged: Sorting network — siswa jadi elemen array, urutkan dengan bertukar posisi
  - [ ] Unplugged: Nim game tournament — siapa yang bisa menemukan strategi menang?
- **Evaluasi / Quiz**:
  - [ ] Partisipasi dan ketepatan dalam aktivitas unplugged
  - [ ] Refleksi: hubungkan aktivitas unplugged dengan konsep programming
