# 📋 SPESIFIKASI MEDIA PEMBELAJARAN INTERAKTIF (MPI)
# Template Vibe Coding Standar Festival MPI — Untuk Semua Mata Pelajaran SMP

> **Cara Pakai:**
> Ubah bagian **[BAGIAN 1]** sesuai mata pelajaran dan identitas Anda,
> lalu salin seluruh teks dokumen ini dan kirimkan ke AI (**Claude**, **Gemini**, atau **ChatGPT**).
> AI akan membuatkan aplikasi Media Pembelajaran Interaktif (MPI) berbasis web yang lengkap, interaktif, dan siap pakai.

---

## 🎯 BAGIAN 1 — IDENTITAS & MATERI (SESUAIKAN INI)

- **Mata Pelajaran** : [Contoh: IPA / Matematika / Bahasa Indonesia / IPS / Informatika / Bahasa Inggris / PPKn]
- **Fase / Kelas**   : [Contoh: Fase D — Kelas VII / VIII / IX SMP]
- **Materi Pokok**   : [Contoh: Sistem Pernapasan Manusia / Teorema Pythagoras / Teks Prosedur / Bentang Alam & Benua / Algoritma & Pemrograman]
- **Tujuan Belajar** : [Rumuskan tujuan pembelajaran sesuai Capaian Pembelajaran (CP) Fase D mata pelajaran Anda]
- **Nama Guru**      : [Nama Lengkap + Gelar Anda — Contoh: Edy Santoso, S.Pd.]
- **Nama Sekolah**   : [Nama Sekolah Anda — Contoh: SMP Negeri 1 Lamongan]
- **File Logo**      : [Bebas — lampirkan file logo sekolah Anda, AI otomatis menyesuaikan nama file]
- **File Foto Guru** : [Bebas — lampirkan file foto guru, AI otomatis menyesuaikan nama file]
- **File Background**: `bg-ruang-kelas.jpg` (atau lampirkan gambar latar pilihan Anda)

---

## 🎨 BAGIAN 2 — ATURAN TAMPILAN & DESAIN VISUAL (WAJIB DIIKUTI AI)

1. **Satu File Tunggal Mandiri (*Single File Self-Contained*):**
   - Hasil akhir harus berupa **1 file `index.html`** utuh tanpa ketergantungan file luar (CSS di dalam `<style>`, Javascript di dalam `<script>`).
   - Bebas pustaka/library eksternal (tidak memerlukan CDN atau framework).

2. **Penyatuan Latar Belakang & Panggung 16:9 Pas Layar Bebas Scroll (*No-Scroll 16:9 Fit*):**
   - Background utama halaman menggunakan `bg-ruang-kelas.jpg`:
     `body { background: url('bg-ruang-kelas.jpg') center/cover no-repeat fixed; }`
     Diberi lapisan overlay semi-transparan `rgba(240, 249, 255, 0.82)` agar konten tetap sangat kontras dan mudah dibaca. Fallback bila gambar tidak ada: latar `#f0f9ff`.
   - **Wadah `#stage-16-9` harus transparan tanpa border dan tanpa box-shadow**:
     `#stage-16-9 { background: transparent; border: none; box-shadow: none; border-radius: 0; aspect-ratio: 16 / 9; overflow: hidden; }`
     sehingga konten menyatu harmonis dengan pemandangan kelas, tidak tampak seperti kotak kaku yang terpotong.
   - **WAJIB BEBAS SCROLL VERTIKAL (*Zero Scrollbar*)**: Setiap halaman harus muat pas (*fit*) dalam 1 pandangan layar 16:9 pada proyektor/laptop. Dilarang membuat tata letak atau teks yang terlalu panjang ke bawah hingga memicu scrollbar vertikal. Gunakan padding proporsional `clamp(10px, 1.8vh, 18px)` dan `overflow: hidden` agar rapi dan pas.
   - **Ukuran font dasar panggung (*baseline font-size*)**:
     `#stage-16-9 { font-size: calc(15px * var(--font-scale, 1.0)); }`

3. **Ikon & Icon-Box Berukuran Besar & Proporsional:**
   - **Wadah Ikon Menu & Kartu Materi (*Icon Box*)**: Berukuran besar dan tegas `width: clamp(66px, 9vh, 88px); height: clamp(66px, 9vh, 88px); border-radius: 22px;` dengan ukuran emoji/ikon tematik sesuai mata pelajaran `font-size: clamp(34px, 4.8vh, 46px);`.
   - **Ikon Navigasi & Tombol Kontrol**: Berada di dalam lingkaran `clamp(40px, 5.2vh, 48px)` dengan font/ikon `clamp(18px, 2.3vh, 23px)`.
   - **Ikon Status & Evaluasi (Piala, Bintang, Ceklis)**: Berukuran `clamp(44px, 6vh, 60px)` dengan bayangan lembut.

4. **Ilustrasi & Grafis SVG Vektor Berukuran Dominan (*Balanced Dominant SVG*):**
   - **Dimensi Kanvas SVG**: Pada halaman materi dan simulasi/aktivitas interaktif, diagram SVG menjadi sajian visual utama yang proporsional, dengan tinggi `height: clamp(260px, 38vh, 420px);` dan lebar `100%` agar pas tanpa mendorong konten keluar layar.
   - **Garis & Objek Jelas Sesuai Mata Pelajaran**: Elemen visual (seperti bangun geometri, diagram alur, peta konsep, skema siklus/mekanisme sains, atau grafik data) digambar dengan ketebalan proporsional (`stroke-width: 4px` sampai `6px`) dan warna gradien tajam. Simpul atau titik interaktif berukuran `r="12"` sampai `r="18"`.
   - **Label Teks SVG Jelas & Bebas Tabrakan (*Zero Overlapping*)**:
     - Ukuran teks di dalam SVG: `font-size="13px"` sampai `font-size="15px"` dengan `font-weight="800"`.
     - Setiap label teks WAJIB dibungkus dalam kotak label berlatar putih kontras (*pill badge* dengan `<rect rx="6" fill="white" stroke="..." stroke-width="1.5"/>`) dengan koordinat terpisah rapi dari garis gambar.
   - **Animasi SVG Halus**: Beri animasi SVG seperti aliran garis putus-putus (`stroke-dashoffset`), perubahan sudut/bentuk (*morphing*), partikel bergerak, atau efek sorotan pulsa (*pulsing scale*).

5. **Gambar & Foto Berukuran Dominan (Pertahankan Ukuran Bagus):**
   - **Logo Sekolah**: Tinggi `clamp(50px, 6.8vh, 68px)`, ditempatkan pada kapsul resmi di header atas dengan bayangan lembut.
   - **Foto Profil Guru**: Berbentuk lingkaran berdiameter `clamp(130px, 18vh, 175px)` dengan bingkai border bergradien tebal `4px–5px` dan efek bayangan timbul (*drop-shadow*).
   - **Kartu Materi Bergambar**: Area visual (gambar atau diagram SVG) mengambil porsi seimbang 40%–50% dari tinggi kartu.

6. **Tipografi Proporsional Ramah Proyektor (Skala 80% Nyaman Bebas Scroll):**
   - Ukuran teks diatur pas, nyaman dibaca, dan tidak memicu scroll vertikal:
     - **Judul Sampul Utama**: `clamp(2.8rem, 6.8vw, 5.2rem)` dengan efek stiker 3D teks berlapis (*white outline shadow* 4px–5px).
     - **Subjudul Sampul**: `clamp(1.4rem, 3.2vw, 2.6rem)` tebal dan kontras.
     - **Judul Halaman / Title Bar**: `clamp(16px, 2.2vh, 22px)` font tebal di dalam pill badge bergradien.
     - **Judul Kartu Menu & Kartu Konsep**: `clamp(15px, 2vh, 20px)` dengan `font-weight: 800`.
     - **Teks Penjelasan & Paragraf Konten**: `clamp(13px, 1.65vh, 16px)` dengan `font-weight: 600` dan line-height `1.45–1.5` (ringkas, bernas, dan pas dalam wadah).
     - **Tombol & Pilihan Jawaban Soal**: `clamp(13.5px, 1.8vh, 17px)` dengan padding lega `10px 22px`.
     - **Tombol "▶ MULAI"**: Lingkaran play `clamp(60px, 8.5vh, 80px)` dengan ikon play `clamp(26px, 3.6vh, 36px)`, dan teks label `clamp(24px, 3.8vh, 36px)`.

7. **Audio Efek Suara 100% Offline (Web Audio API Synthesizer):**
   - Dilarang keras menautkan file MP3 eksternal. Gunakan osilator sintetis bawaan browser untuk efek klik tombol (*frequency sweep* 450Hz–880Hz), bunyi jawaban benar (akor nada ceria C-E-G), bunyi salah (nada rendah), serta efek audio interaktif penjelajah materi.
   - Sediakan tombol toggle Suara: ON/OFF di navigasi atas.

8. **Deteksi Nama Berkas Gambar Otomatis & Penanganan Fallback (*Graceful Degradation*):**
   - AI **wajib mendeteksi dan menyesuaikan nama berkas gambar asli** yang dilampirkan/diunggah pengguna (nama file logo sekolah, foto guru, atau latar belakang apa pun nama berkasnya). Gunakan nama berkas yang dilampirkan tersebut langsung pada tag `<img src="...">`.
   - Setiap tag `<img>` untuk logo dan foto wajib memiliki atribut `onerror="this.style.display='none'"` agar tidak muncul kotak silang rusak bila file lokal belum disiapkan.

---

## 📱 BAGIAN 3 — STRUKTUR HALAMAN (7 MODUL PEMBELAJARAN LENGKAP)

Aplikasi dibangun dengan arsitektur Single Page Application (SPA) 7 halaman berpindah instan (semua halaman pas 1 pandangan layar tanpa scroll):

### 1. Halaman 1: Sampul / Beranda (*Cover*)
- **Header Atas**: Kapsul resmi identitas instansi / nama sekolah (WAJIB mengambil nilai **Nama Sekolah** yang diisi pengguna di Bagian 1, DILARANG memakai nama sekolah paten/hardcoded), logo sekolah berukuran tinggi 50–68px, dinas pendidikan, serta badge kemitraan (*Kurikulum Merdeka*, *Fase D*).
- **Bagian Tengah Terfokus**: Judul materi besar dengan gaya stiker 3D kontras, subtopik penjelasan berhuruf proporsional, dan **Tombol "▶ MULAI"** berpendar (*pulsing glow effect*) yang memikat perhatian siswa tanpa kartu samping.
- **Footer Bawah**: Baris identitas guru pengembang media (mengambil **Nama Guru** dan **Nama Sekolah** dari Bagian 1) serta semboyan pembelajaran dengan font jelas.

### 2. Halaman 2: Menu Utama (*Dashboard Modul*)
- Grid 6 kartu menu berdimensi 3D dengan **wadah ikon besar (66–88px)**, judul tegas berukuran `15–20px`, dan deskripsi singkat terbaca jelas:
  1. 🎯 **Tujuan Pembelajaran** (Capaian & indikator kompetensi siswa)
  2. 📖 **Materi Pembelajaran** (Eksplorasi konsep kunci materi dengan diagram visual)
  3. 🕹️ **Simulasi / Aktivitas Interaktif** (Laboratorium / eksperimen virtual / simulasi konsep ber-SVG)
  4. 📝 **Evaluasi Multi-Format** (3 jenis instrumen uji pemahaman berbobot 100 poin)
  5. 👨‍🏫 **Profil Guru** (Informasi fasilitator pendidik dengan foto profil besar)
  6. 💡 **Wawasan & Fakta Menarik** (Pop-up interaktif fakta edukatif kontekstual materi)
- Navigasi atas: Tombol `🏠 BERANDA` dan kontrol aksesibilitas cepat (Pengatur Zoom & Ukuran Huruf).

### 3. Halaman 3: Tujuan Pembelajaran
- Menampilkan kartu tunggal **Tujuan Pembelajaran (TP)** yang luas, fokus, dan terpusat:
  - Butir-butir indikator ketercapaian tujuan pembelajaran yang spesifik, operasional, dan terukur sesuai materi mata pelajaran dengan tipografi `13.5–16px` dan ikon poin tematik.
  - Pas dalam 1 layar tanpa memicu scroll vertikal.

### 4. Halaman 4: Materi Inti Pembelajaran
- Grid kartu konsep materi (minimal 4–6 subtopik / konsep pokok materi) dengan:
  - **Ikon tematik dan ilustrasi visual** di setiap kartu.
  - Judul tebal berukuran `15–20px`.
  - Paragraf penjelasan materi yang ringkas, bernas, dan mudah dipahami siswa (font `13–16px`, `font-weight: 600`).

### 5. Halaman 5: Simulasi / Aktivitas Interaktif (Laboratorium Virtual SVG)
- Memiliki diagram / visualisasi SVG interaktif (tinggi 260–420px) yang disesuaikan secara dinamis dengan mata pelajaran yang dipilih:
  - **Contoh untuk IPA**: Laboratorium anatomi, siklus ekosistem, pernapasan/pencernaan, atau lintasan gerak dan partikel.
  - **Contoh untuk Matematika**: Visualisasi geometri interaktif (misal: teorema Pythagoras dinamis, sudut segitiga, transformasi geometri, atau grafik fungsi dengan slider angka).
  - **Contoh untuk Bahasa / IPS / Informatika**: Diagram alur struktur teks, peta interaktif wilayah/sejarah, pohon silsilah sosial, atau simulator logika pemrograman.
- Dilengkapi tombol interaktif (tombol aksi perubahan, slider pengatur parameter, atau selektor mode) serta telemetri / indikator status langsung.
- Teks label SVG menggunakan kotak badge putih (`13–15px`) agar bebas tabrakan garis dan tidak meluber keluar panggung.

### 6. Halaman 6: Evaluasi Multi-Format (Skor Total: 100 Poin)
- Instrumen asesmen formatif 3 babak bertahap dengan materi soal sesuai mata pelajaran:
  - **Babak A (Pilihan Ganda - 30 Poin)**: 3 butir soal pemahaman konsep dengan 4 opsi tombol pas dan umpan balik langsung.
  - **Babak B (Menjodohkan Garis SVG - 40 Poin)**: 4 pasang kartu istilah di sebelah kiri dan definisi/fungsinya di sebelah kanan. Siswa mengklik pasangan dan sistem otomatis menggambar garis SVG animasi interaktif penghubung keduanya.
  - **Babak C (Benar / Salah - 30 Poin)**: 3 butir pernyataan analisis kritis dengan tombol **✓ BENAR** dan **✗ SALAH**.
  - **Babak D (Rekapitulasi Skor)**: Piala animasi (min. 50px), nilai total (0–100), rincian poin per babak, dan tombol reset.

### 7. Halaman 7: Profil Guru Pengembang
- Kartu profil proporsional memuat:
  - **Foto guru berukuran besar** dalam bingkai lingkaran berdiameter `130–175px` dengan border gradien dan bayangan timbul.
  - Nama lengkap dan gelar pendidik (mengambil **Nama Guru** dari Bagian 1) dengan font tebal `20–24px`.
  - Asal sekolah (mengambil **Nama Sekolah** dari Bagian 1) dan jabatan/tugas guru dengan font `13–15px`.
  - Kutipan motivasi inspiratif bagi pendidikan.

---

## 💻 BAGIAN 4 — PROMPT INSTRUKSI KE AI

Salin teks berikut ini ke AI:

> "Tolong buatkan kode program lengkap untuk Media Pembelajaran Interaktif (MPI) Kurikulum Merdeka sesuai seluruh spesifikasi di atas. Hasilkan **1 file `index.html` mandiri yang utuh dan lengkap tanpa terpotong**. 
> 
> Syarat mutlak yang wajib dipenuhi:
> 1. Gunakan warna cerah ceria dengan background `bg-ruang-kelas.jpg` ber-overlay putih transparan. `#stage-16-9` harus transparan tanpa border dan tanpa box-shadow agar menyatu dengan background.
> 2. **PAS 1 PANDANGAN LAYAR 16:9 BEBAS SCROLL (SANGAT PENTING)**:
>    - Seluruh tampilan dan konten di setiap modul wajib muat pas dalam panggung rasio 16:9 **tanpa memicu scrollbar vertikal**. Gunakan `overflow: hidden`, padding terukur (`clamp(10px, 1.8vh, 18px)`), dan tata letak flex/grid efisien.
> 3. **SKALA TIPOGRAFI & ELEMEN VISUAL PROPORSIONAL**:
>    - Ukuran teks proporsional dan tegas: baseline panggung `15px`, konten & penjelasan `13px–16px` (`font-weight: 600`), judul kartu `15px–20px`, judul halaman `16px–22px`, judul sampul `clamp(2.8rem, 6.8vw, 5.2rem)`.
>    - Pertahankan ukuran gambar dan elemen visual tetap besar & menarik: wadah ikon (*icon-box*) `66px–88px` (emoji `34px–46px`), foto profil guru diameter `130px–175px`, logo sekolah tinggi `50px–68px`.
>    - Ilustrasi SVG diagram pada materi dan simulasi/aktivitas dibuat dominan (tinggi `260px–420px`, lebar 100%) dengan garis diagram tebal (`stroke-width: 4px–6px`) dan label teks SVG berukuran `13px–15px` di dalam kotak label (*pill badge*) putih agar bebas tumpang tindih teks dan tidak meluber keluar layar.
> 4. **IDENTITAS RESMI DINAMIS (DILARANG HARDCODE)**:
>    - Nama Sekolah, Nama Guru, Mata Pelajaran, Materi Pokok, dan Tujuan Belajar **WAJIB MENGGUNAKAN DATA DARI BAGIAN 1** yang telah diisi pengguna. DILARANG menggunakan nama sekolah atau nama guru bawaan contoh.
> 5. Halaman cover terpusat dengan tombol '▶ MULAI' berpendar tanpa kartu samping.
> 6. Halaman 3 berjudul 'Tujuan Pembelajaran' (kartu terpusat memuat indikator TP Kurikulum Merdeka, tanpa petunjuk penggunaan media/praktikum).
> 7. Efek suara 100% menggunakan Web Audio API sintetis (tanpa file MP3 eksternal).
> 8. Evaluasi formatif 3 jenis (Pilihan Ganda + Menjodohkan Garis SVG interaktif + Benar/Salah) berbobot total 100 poin.
> 9. Deteksi nama file gambar/logo/foto yang dilampirkan pengguna secara otomatis dan sesuaikan referensi `src`-nya di kode HTML dengan penanganan error fallback."
