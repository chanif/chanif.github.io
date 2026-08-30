# Analisis Data (KKA)

## Deskripsi
Elemen keenam KKA yang mengajarkan siswa cara mengelola dan memahami data sebagai dasar pengambilan keputusan. Fokus pada pemahaman data dalam konteks AI: data sebagai "bahan bakar" AI, kualitas data, dan bagaimana data digunakan untuk melatih model.

## Capaian Pembelajaran (CP) — BSKAP No. 046/H/KR/2025
- Memahami konsep data dan peranannya dalam AI
- Merancang dan melaksanakan pengumpulan data
- Menyajikan data dalam bentuk tabel dan grafik yang informatif
- Menganalisis pola dan tren dalam data
- Menggunakan data untuk mendukung pengambilan keputusan
- Melaksanakan proyek analisis data end-to-end

---

## Daftar Sub-Materi

### 01. Apa Itu Data?
- **Tujuan Pembelajaran**: Siswa memahami data sebagai fondasi AI dan teknologi modern.
- **Materi Pokok**:
  - Data = fakta mentah yang belum diolah
  - Hierarki: Data → Informasi → Pengetahuan → Kebijaksanaan
  - Data di era digital:
    - Setiap hari manusia menghasilkan 2.5 quintillion bytes data
    - Sumber: media sosial, sensor IoT, transaksi, browsing
  - Data dan AI:
    - "Data is the new oil" — AI butuh data untuk belajar
    - Kualitas data = kualitas AI
    - Garbage in, garbage out
  - Jenis data:
    - Numerik (kuantitatif): angka, bisa dihitung
    - Kategorikal (kualitatif): label, kategori
    - Teks: tulisan, komentar, artikel
    - Gambar: foto, screenshot, scan
    - Audio: rekaman, musik, suara
    - Video: kombinasi gambar + audio + waktu
  - Data terstruktur vs tidak terstruktur:
    - Terstruktur: tabel, spreadsheet, database (mudah dianalisis)
    - Tidak terstruktur: teks bebas, gambar, video (butuh AI)
    - Semi-terstruktur: JSON, XML, email
  - Metadata: data tentang data (EXIF foto, tag file)
- **Aktivitas**:
  - [ ] Unplugged: "Data Detective" — identifikasi 20 data yang dihasilkan siswa dalam 1 hari
  - [ ] Plugged: Eksplorasi dataset publik Indonesia (BPS, data.go.id) — apa yang bisa dipelajari?
  - [ ] Plugged: Cek metadata foto HP — informasi apa yang tersimpan?
- **Evaluasi / Quiz**:
  - [ ] Quiz: Klasifikasi jenis data dan sumber data (12 soal)
  - [ ] Essay: "Data apa yang dihasilkan oleh sekolah kita dan bagaimana bisa dimanfaatkan?"

### 02. Mengumpulkan Data
- **Tujuan Pembelajaran**: Siswa mampu merancang pengumpulan data yang valid dan relevan.
- **Materi Pokok**:
  - Menentukan pertanyaan penelitian:
    - "Apa yang ingin kita ketahui dari data?"
    - Pertanyaan yang baik: spesifik, measurable, achievable
  - Metode pengumpulan:
    - Survei online: Google Forms, Typeform
    - Observasi: pengamatan dan pencatatan langsung
    - Eksperimen: variabel kontrol dan variabel uji
    - Web scraping sederhana (konsep): mengambil data dari website
    - API (konsep): mengambil data dari layanan online
    - Dataset publik: Kaggle, Google Dataset Search, BPS
  - Merancang kuesioner digital:
    - Jenis pertanyaan: pilihan ganda, skala Likert, isian singkat
    - Logika pertanyaan: skip logic, branching
    - Validasi data: batasan input
    - Pilot test: uji coba sebelum distribusi
  - Kualitas data:
    - Akurasi: apakah data benar?
    - Completeness: apakah data lengkap?
    - Consistency: apakah format seragam?
    - Timeliness: apakah data masih relevan?
  - Etika pengumpulan data:
    - Informed consent
    - Anonimitas dan kerahasiaan
    - Tidak memaksa partisipasi
    - Menyimpan data dengan aman
- **Aktivitas**:
  - [ ] Plugged: Buat survei Google Forms tentang kebiasaan digital siswa (10+ pertanyaan)
  - [ ] Plugged: Kumpulkan dan download data hasil survei sebagai spreadsheet
  - [ ] Plugged: Eksplorasi Kaggle — download dan eksplorasi dataset yang menarik
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi metode pengumpulan yang tepat (8 soal skenario)
  - [ ] Praktik: Review kuesioner — identifikasi masalah dan perbaiki

### 03. Menyajikan Data: Tabel dan Grafik
- **Tujuan Pembelajaran**: Siswa mampu menyajikan data dalam format visual yang informatif.
- **Materi Pokok**:
  - Tabel data:
    - Struktur: baris (record) dan kolom (field)
    - Header yang jelas
    - Sorting dan filtering
    - Formatting: angka, mata uang, persentase
  - Jenis grafik dan penggunaannya:
    - Bar chart: membandingkan antar kategori
    - Column chart: variasi bar chart vertikal
    - Line chart: menunjukkan tren waktu
    - Pie chart: menunjukkan proporsi (max 5-6 irisan!)
    - Scatter plot: menunjukkan hubungan 2 variabel
    - Histogram: distribusi frekuensi data numerik
    - Stacked bar: komposisi dalam perbandingan
  - Membuat grafik yang baik:
    - Judul yang informatif
    - Label sumbu x dan y
    - Legend jika ada beberapa series
    - Sumber data
    - Skala yang tepat (tidak misleading!)
  - Tools:
    - Google Sheets charts: cepat dan mudah
    - Canva: untuk infografis
    - Python matplotlib (pengenalan): `plt.bar()`, `plt.plot()`, `plt.pie()`
  - Visualisasi yang menyesatkan:
    - Sumbu Y yang tidak mulai dari 0
    - Skala yang dimanipulasi
    - Cherry-picking data
    - 3D charts yang mendistorsi proporsi
- **Aktivitas**:
  - [ ] Plugged: Buat 4 jenis grafik berbeda dari data survei kelas menggunakan Google Sheets
  - [ ] Plugged: "Spot the Lie" — identifikasi 5 grafik yang menyesatkan
  - [ ] Plugged: Buat infografis dari data menggunakan Canva
  - [ ] Plugged: (Opsional) Buat grafik menggunakan Python matplotlib
- **Evaluasi / Quiz**:
  - [ ] Quiz: Pilih grafik yang tepat untuk jenis data (10 soal)
  - [ ] Quiz: Identifikasi grafik yang misleading (5 soal visual)
  - [ ] Proyek: Buat dashboard 5 grafik dari dataset yang sama

### 04. Menganalisis Pola Data
- **Tujuan Pembelajaran**: Siswa mampu menemukan pola, tren, dan insight dari data.
- **Materi Pokok**:
  - Statistik deskriptif:
    - Central tendency: mean (rata-rata), median (nilai tengah), modus (paling sering)
    - Spread: range, standar deviasi (konsep)
    - Frekuensi dan distribusi
  - Menemukan pola:
    - Tren: naik, turun, stabil, siklis
    - Outlier: data yang menyimpang jauh
    - Clustering: kelompok data yang serupa
    - Seasonal patterns: pola berulang berdasarkan waktu
  - Korelasi:
    - Positif: X naik, Y naik
    - Negatif: X naik, Y turun
    - Tidak berkorelasi
    - "Correlation ≠ Causation" — sangat penting!
  - Analisis sederhana:
    - Perbandingan: membandingkan 2+ kelompok data
    - Persentase dan proporsi
    - Growth rate: berapa persen pertumbuhan?
  - Data cleaning:
    - Missing values: cara menangani data kosong
    - Duplikat: menemukan dan menghapus
    - Format inkonsisten: standardisasi
  - Python untuk analisis (pengenalan):
    - `import statistics`: mean(), median(), mode()
    - List comprehension untuk filter data
    - Simple plotting dengan matplotlib
- **Aktivitas**:
  - [ ] Plugged: Analisis data survei — hitung mean, median, modus, identifikasi tren
  - [ ] Plugged: "Correlation Detective" — diberikan scatter plot, tentukan jenis korelasi
  - [ ] Plugged: Data cleaning exercise — bersihkan dataset yang "kotor"
  - [ ] Plugged: (Opsional) Analisis data menggunakan Python
- **Evaluasi / Quiz**:
  - [ ] Quiz: Hitung statistik deskriptif (10 soal)
  - [ ] Quiz: Identifikasi pola dan korelasi dari grafik (8 soal visual)
  - [ ] Latihan: Analisis dataset dan tulis 5 insight/temuan

### 05. Data dan Pengambilan Keputusan
- **Tujuan Pembelajaran**: Siswa mampu menggunakan data sebagai dasar pengambilan keputusan yang rasional.
- **Materi Pokok**:
  - Data-driven decision making:
    - Keputusan berbasis data vs berbasis feeling/intuisi
    - Contoh: Netflix memilih film berdasarkan data tontonan
    - Contoh: toko mengatur stok berdasarkan data penjualan
  - Proses pengambilan keputusan berbasis data:
    1. Define: apa keputusan yang harus dibuat?
    2. Collect: data apa yang relevan?
    3. Analyze: apa yang dikatakan data?
    4. Interpret: apa artinya?
    5. Decide: pilih tindakan terbaik
    6. Evaluate: apakah keputusan berhasil?
  - Data storytelling:
    - Menyusun narasi dari data
    - Struktur: konteks → insight → rekomendasi
    - Visualisasi sebagai pendukung cerita
    - Audience awareness: siapa yang membaca?
  - Keterbatasan data:
    - Data bisa bias
    - Data bisa tidak lengkap
    - Korelasi ≠ kausalitas (review)
    - Angka bisa dimanipulasi
  - Data literacy:
    - Kemampuan membaca, memahami, dan mengkritisi data
    - Keterampilan penting di abad 21
    - Jangan langsung percaya statistik tanpa konteks
- **Aktivitas**:
  - [ ] Plugged: Studi kasus — diberikan dataset penjualan kantin, buat rekomendasi menu
  - [ ] Plugged: "Data Story" — presentasi data tentang isu kelas/sekolah dengan narasi yang meyakinkan
  - [ ] Unplugged: Debat: "Apakah semua keputusan harus berbasis data?"
- **Evaluasi / Quiz**:
  - [ ] Quiz: Proses pengambilan keputusan berbasis data (8 soal)
  - [ ] Proyek: Buat presentasi rekomendasi berbasis data untuk perbaikan sekolah

### 06. Proyek Analisis Data
- **Tujuan Pembelajaran**: Siswa melaksanakan proyek analisis data end-to-end dengan koneksi ke AI.
- **Materi Pokok**:
  - Panduan proyek lengkap:
    1. Pilih topik dan pertanyaan penelitian
    2. Rancang metode pengumpulan data
    3. Kumpulkan data (min. 50 data points)
    4. Bersihkan dan siapkan data
    5. Analisis: statistik dan visualisasi
    6. Temukan insight dan pola
    7. Buat rekomendasi/kesimpulan
    8. Presentasikan dengan data storytelling
  - Koneksi ke AI:
    - Data yang baik = AI yang baik
    - Gunakan AI untuk membantu analisis (ChatGPT untuk interpretasi)
    - Gunakan AI untuk membuat visualisasi (Canva AI, Google Sheets)
    - Refleksi: "Apakah AI bisa melakukan analisis ini tanpa manusia?"
  - Contoh topik proyek:
    - "Hubungan screen time dan nilai ujian siswa kelas 7-9"
    - "Pola penggunaan kantin: menu populer vs waktu makan"
    - "Jenis konten TikTok yang paling banyak ditonton siswa"
    - "Analisis cuaca dan kehadiran siswa"
    - "Pola pengeluaran uang saku siswa SMP"
  - Rubrik penilaian
- **Aktivitas**:
  - [ ] Proyek kelompok (3-4 siswa, 2-3 minggu)
  - [ ] Milestone: proposal → pengumpulan data → analisis → presentasi
  - [ ] Peer review dan feedback
- **Evaluasi / Quiz**:
  - [ ] Penilaian proyek (kualitas data: 20%, analisis: 25%, visualisasi: 20%, insight: 20%, presentasi: 15%)
  - [ ] Peer assessment
  - [ ] Refleksi individu
