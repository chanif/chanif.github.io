# 📋 SPESIFIKASI MEDIA PEMBELAJARAN INTERAKTIF (MPI)
# Template Vibe Coding Standar Festival MPI — Untuk Semua Mata Pelajaran SMP

> **Cara Pakai:**
> Ubah bagian **[BAGIAN 1]** sesuai mata pelajaran dan identitas Anda,
> lalu salin seluruh teks dokumen ini dan kirimkan ke AI (**Gemini**, **Claude**, atau **ChatGPT**).
> AI akan membuatkan aplikasi Media Pembelajaran Interaktif (MPI) berbasis web yang lengkap, interaktif, dan siap pakai.

---

## 🎯 BAGIAN 1 — IDENTITAS & MATERI (SESUAIKAN INI)

- **Mata Pelajaran** : [Contoh: IPA / Matematika / Bahasa Indonesia / IPS / Informatika]
- **Fase / Kelas**   : [Contoh: Fase D — Kelas VII / VIII / IX SMP]
- **Materi Pokok**   : [Contoh: Sistem Pernapasan Manusia / Teorema Pythagoras / Teks Prosedur / Tata Surya]
- **Tujuan Belajar** : [Contoh: Peserta didik mampu menganalisis sistem pernapasan manusia serta mekanisme pernapasan dada dan perut]
- **Nama Guru**      : [Nama Lengkap + Gelar — Contoh: Edy Santoso, S.Pd.]
- **Nama Sekolah**   : [Contoh: SMP Negeri 1 Lamongan]
- **File Logo**      : [Bebas — lampirkan file logo sekolah Anda, AI otomatis menyesuaikan nama file]
- **File Foto Guru** : [Bebas — lampirkan file foto guru, AI otomatis menyesuaikan nama file]
- **File Background**: `bg-ruang-kelas.jpg` (atau lampirkan gambar latar pilihan Anda)

---

## 🎨 BAGIAN 2 — ATURAN TAMPILAN & DESAIN VISUAL (WAJIB DIIKUTI AI)

1. **Satu File Tunggal Mandiri (*Single File Self-Contained*):**
   - Hasil akhir harus berupa **1 file `index.html`** utuh tanpa ketergantungan file luar (CSS di dalam `<style>`, Javascript di dalam `<script>`).
   - Bebas pustaka/library eksternal (tidak memerlukan CDN atau framework).

2. **Penyatuan Latar Belakang & Panggung 16:9 (*Seamless Background Stage*):**
   - Background utama halaman menggunakan `bg-ruang-kelas.jpg`:
     `body { background: url('bg-ruang-kelas.jpg') center/cover no-repeat fixed; }`
     Diberi lapisan overlay semi-transparan `rgba(240, 249, 255, 0.82)` agar konten tetap sangat kontras dan mudah dibaca. Fallback bila gambar tidak ada: latar `#f0f9ff`.
   - **Wadah `#stage-16-9` harus transparan tanpa border dan tanpa box-shadow**:
     `#stage-16-9 { background: transparent; border: none; box-shadow: none; border-radius: 0; aspect-ratio: 16 / 9; }`
     sehingga konten menyatu harmonis dengan pemandangan kelas, tidak tampak seperti kotak kaku yang terpotong.

3. **Maksimalkan Penggunaan Ikon & SVG Vektor Interaktif (Sangat Penting):**
   - **Kaya Ikon Visual**: Gunakan emoji tematik dan icon box di setiap tombol navigasi, judul modul, kartu konsep, dan instrumen.
   - **Ilustrasi SVG Vektor Buatan Sendiri**: Bagian materi dan simulasi **WAJIB** menyertakan visualisasi SVG buatan sendiri yang canggih (misalnya anatomi organ tubuh berpartikel, skema mikroskopik pertukaran gas bergradien, lintasan gerak mekanik, atau diagram alur proses).
   - **Bebas Tumpang Tindih Teks (*Zero Overlapping Text*)**: Semua teks dan label pada SVG harus memiliki koordinat terpisah dengan kotak label (*pill badge*) berlatar belakang, sehingga tidak menabrak garis atau partikel.
   - **Animasi SVG Halus**: Beri animasi SVG seperti aliran garis putus-putus (`stroke-dashoffset`), partikel bergerak, dan efek perubahan bentuk (*morphing/scale*).

4. **Tipografi Ekstra Besar Ramah Proyektor Kelas (*High Legibility*):**
   - Standar ukuran huruf harus terbaca jelas dari baris belakang kelas:
     - Judul Sampul: `clamp(3rem, 7.5vw, 6rem)` dengan efek stiker 3D teks berlapis (*white outline shadow*).
     - Subjudul & Judul Halaman: `clamp(18px, 2.5vh, 26px)` tebal.
     - Teks Konten & Penjelasan: `clamp(13.5px, 1.7vh, 17px)` dengan line-height `1.55`.
     - Tombol & Pilihan Jawaban: `clamp(14px, 1.8vh, 18px)` dengan padding lega agar nyaman dioperasikan di proyektor interaktif atau layar tablet.

5. **Audio Efek Suara 100% Offline (Web Audio API Synthesizer):**
   - Dilarang keras menautkan file MP3 eksternal. Gunakan osilator sintetis bawaan browser untuk efek klik tombol (*frequency sweep* 450Hz–880Hz), bunyi jawaban benar (akor nada ceria C-E-G), bunyi salah (nada rendah), serta simulasi desah tarikan dan hembusan napas.
   - Sediakan tombol toggle Suara: ON/OFF di navigasi atas.

6. **Deteksi Nama Berkas Gambar Otomatis & Penanganan Fallback (*Graceful Degradation*):**
   - AI **wajib mendeteksi dan menyesuaikan nama berkas gambar asli** yang dilampirkan/diunggah pengguna (misalnya nama file logo sekolah, foto guru, atau gambar latar belakang apa pun nama berkasnya). Gunakan nama berkas yang dilampirkan tersebut langsung pada tag `<img src="...">` tanpa memaksa pengguna mengubah nama filenya terlebih dahulu.
   - Setiap tag `<img>` untuk logo dan foto wajib memiliki atribut `onerror="this.style.display='none'"` agar tidak muncul kotak silang rusak bila file lokal belum disiapkan.

---

## 📱 BAGIAN 3 — STRUKTUR HALAMAN (7 MODUL PEMBELAJARAN LENGKAP)

Aplikasi dibangun dengan arsitektur Single Page Application (SPA) 7 halaman berpindah instan:

### 1. Halaman 1: Sampul / Beranda (*Cover*)
- **Header Atas**: Kapsul resmi nama sekolah (`SMP Negeri 2 Lamongan`), dinas pendidikan, serta badge kemitraan (*Kurikulum Merdeka*, *Fase D*).
- **Bagian Tengah Terfokus**: Judul materi ekstra besar dengan gaya stiker 3D kontras, subtopik penjelasan, dan **Tombol "▶ MULAI" Raksasa** berputar/berdenyut (*pulsing glow effect*) yang memikat perhatian siswa. Tidak perlu ada kartu samping yang mengganggu konsentrasi.
- **Footer Bawah**: Baris identitas guru pengembang media dan semboyan pembelajaran.

### 2. Halaman 2: Menu Utama (*Dashboard Modul*)
- Grid 6 kartu menu berdimensi 3D dengan ikon visual besar, judul tegas, dan deskripsi singkat:
  1. 🎯 **Tujuan Pembelajaran** (Capaian & indikator kompetensi siswa)
  2. 🧬 **Materi Pembelajaran** (Eksplorasi organ/konsep kunci)
  3. 🌬️ **Simulator Interaktif** (Laboratorium virtual makro & mikro)
  4. 📝 **Evaluasi Multi-Format** (3 jenis instrumen uji pemahaman)
  5. 👨‍🏫 **Profil Guru** (Informasi fasilitator narasumber)
  6. 💡 **Fakta Sains Menarik** (Pop-up interaktif info sains menakjubkan)
- Navigasi atas: Tombol `🏠 BERANDA` dan kontrol aksesibilitas cepat (Pengatur Zoom & Ukuran Huruf).

### 3. Halaman 3: Tujuan Pembelajaran
- Menampilkan kartu tunggal **Tujuan Pembelajaran (TP)** yang luas, fokus, dan terpusat:
  - Butir-butir indikator ketercapaian tujuan pembelajaran yang spesifik, operasional, dan terukur sesuai Kurikulum Merdeka Fase D.
  - Tidak perlu petunjuk penggunaan media atau petunjuk praktikum agar siswa langsung fokus pada target kompetensi yang harus dikuasai.

### 4. Halaman 4: Materi Inti Pembelajaran
- Grid kartu konsep materi (minimal 4–6 organ/konsep pokok) dengan ikon visual tematik, border bergradien warna harmonis, judul tebal, serta paragraf penjelasan sains yang lugas dan bermakna.

### 5. Halaman 5: Simulator Interaktif (Makro & Mikro)
- Memiliki tab pengalih tampilan dua mode:
  - **Mode Makro (Anatomi Mekanika)**: Diagram SVG vektor dinamis yang merespons tombol aksi *Tarik Napas* dan *Hembuskan Napas*, slider manual, selektor mekanisme pernapasan (perut vs dada), serta kartu telemetri angka real-time (tekanan, volume, kondisi otot).
  - **Mode Mikro (Mikroskopik Pertukaran Gas)**: Infografis SVG penampang melintang berstruktur 3 zona terpisah (Rongga Alveolus, Membran Difusi Beranimasi, dan Pembuluh Kapiler Darah dengan sel eritrosit bersirkulasi). Dilengkapi 4 kartu langkah penuntun yang jika diklik memberikan sorotan bercahaya (*glow highlight*) pada bagian diagram yang sesuai.

### 6. Halaman 6: Evaluasi Multi-Format (Skor Total: 100 Poin)
- Instrumen asesmen formatif 3 babak bertahap:
  - **Babak A (Pilihan Ganda - 30 Poin)**: 3 soal kontekstual dengan 4 opsi tombol besar, umpan balik langsung (*instant feedback*), dan suara apresiasi.
  - **Babak B (Menjodohkan Garis SVG - 40 Poin)**: 4 pasang konsep kiri dan fungsi kanan. Siswa mengklik pasangan dan sistem otomatis menggambar garis SVG animasi interaktif yang menghubungkan keduanya.
  - **Babak C (Benar / Salah - 30 Poin)**: 3 pernyataan analisis kritis dengan tombol besar **✓ BENAR** dan **✗ SALAH**.
  - **Babak D (Rekapitulasi Skor)**: Piala animasi, nilai total (0–100), rincian poin per babak, kalimat motivasi pencapaian, dan tombol reset evaluasi.

### 7. Halaman 7: Profil Guru Pengembang
- Kartu profil elegan memuat avatar foto guru dalam bingkai lingkaran bergradien, nama lengkap dan gelar, jabatan/tugas, asal sekolah, serta kutipan motivasi inspiratif bagi pendidikan.

---

## 💻 BAGIAN 4 — PROMPT INSTRUKSI KE AI

Salin teks berikut ini ke AI:

> "Tolong buatkan kode program lengkap untuk Media Pembelajaran Interaktif (MPI) Kurikulum Merdeka sesuai seluruh spesifikasi di atas. Hasilkan **1 file `index.html` mandiri yang utuh dan lengkap tanpa terpotong**. 
> 
> Syarat mutlak yang wajib dipenuhi:
> 1. Gunakan warna cerah ceria dengan background `bg-ruang-kelas.jpg` ber-overlay putih transparan. `#stage-16-9` harus transparan tanpa border dan tanpa box-shadow agar menyatu dengan background.
> 2. Huruf berukuran BESAR (konten min. 14–17px, judul sampul raksasa ber-outline putih stiker).
> 3. Halaman cover terpusat dengan tombol '▶ MULAI' raksasa berpendar tanpa kartu samping.
> 4. Halaman 3 berjudul 'Tujuan Pembelajaran' (kartu terpusat memuat indikator TP Kurikulum Merdeka, tanpa petunjuk penggunaan media/praktikum).
> 5. Maksimalkan penggunaan ikon emoji dan grafis SVG vektor interaktif buatan sendiri pada materi dan simulator (termasuk diagram mikroskopik Alveolus 3 zona yang bersih tanpa tumpang tindih teks).
> 6. Efek suara 100% menggunakan Web Audio API sintetis (tanpa file MP3).
> 7. Evaluasi formatif 3 jenis (Pilihan Ganda + Menjodohkan Garis SVG interaktif + Benar/Salah) berbobot total 100 poin.
> 8. Deteksi nama file gambar/logo/foto yang dilampirkan pengguna secara otomatis dan sesuaikan referensi `src`-nya di kode HTML dengan penanganan error fallback."
