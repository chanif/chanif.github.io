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
   - **Ukuran font dasar panggung (*baseline font-size*)**:
     `#stage-16-9 { font-size: calc(18px * var(--font-scale, 1.0)); }`

3. **Ikon & Icon-Box Berukuran EKSTRA BESAR (Jumbo Scale Icons):**
   - **DILARANG menggunakan ikon kecil standar web biasa (16px–24px)**.
   - **Wadah Ikon Menu & Kartu Materi (*Icon Box*)**: Wajib berukuran besar `width: clamp(72px, 10vh, 96px); height: clamp(72px, 10vh, 96px); border-radius: 26px;` dengan ukuran emoji/ikon di dalamnya `font-size: clamp(38px, 5.5vh, 54px);`.
   - **Ikon Navigasi & Tombol Kontrol**: Berada di dalam lingkaran `clamp(44px, 5.6vh, 54px)` dengan font/ikon `clamp(20px, 2.6vh, 26px)`.
   - **Ikon Status & Evaluasi (Piala, Bintang, Ceklis)**: Berukuran `clamp(48px, 6.5vh, 68px)` agar memberikan dampak visual yang kuat dan menyenangkan bagi siswa.

4. **Ilustrasi & Grafis SVG Vektor Berukuran JUMBO (*Full-Canvas Dominant SVG*):**
   - **DILARANG membuat SVG kecil/sempit seperti perangko!**
   - **Dimensi Kanvas SVG**: Pada halaman materi dan simulator interaktif, diagram SVG **WAJIB MENJADI SAJIAN VISUAL UTAMA YANG MENGISI RUANG**, dengan tinggi minimal `height: clamp(320px, 48vh, 520px);` dan lebar `100%` (atau `min-width: 550px`).
   - **Garis & Objek Tebal**: Elemen organ, lintasan gerak, dan pembuluh darah harus digambar tebal (`stroke-width: 5px` sampai `9px`) dengan warna gradien yang cerah dan tajam. Partikel dan sel eritrosit berukuran besar (`r="14"` sampai `r="24"`).
   - **Label Teks SVG Ekstra Besar & Bebas Tabrakan (*Zero Overlapping*)**:
     - Ukuran teks di dalam SVG wajib besar: `font-size="16px"` sampai `font-size="20px"` dengan `font-weight="800"`.
     - Setiap teks WAJIB dibungkus dalam kotak label berlatar belakang kontras (*pill badge* dengan `<rect rx="8" fill="white" stroke="..." stroke-width="2"/>`) dengan koordinat yang terpisah aman dari garis anatomi sehingga terbaca sempurna dari baris belakang kelas.
   - **Animasi SVG Halus**: Beri animasi SVG seperti aliran garis putus-putus (`stroke-dashoffset`), partikel mengalir, dan denyut organ (*pulsing scale*).

5. **Gambar & Foto Berukuran Dominan & Terlihat Jelas:**
   - **Logo Sekolah**: Tinggi minimal `clamp(55px, 7.5vh, 75px)`, ditempatkan pada kapsul resmi di header atas dengan bayangan lembut.
   - **Foto Profil Guru**: Berbentuk lingkaran besar berdiameter `clamp(150px, 22vh, 210px)` dengan bingkai border bergradien tebal `5px–6px` dan efek bayangan timbul (*drop-shadow*).
   - **Kartu Materi / Media Bergambar**: Area visual (gambar atau diagram SVG) harus mengambil porsi minimal 50% dari total area kartu, bukan thumbnail kecil di sudut.

6. **Tipografi Ekstra Besar & Tebal Ramah Proyektor Layar Lebar (*High Legibility*):**
   - Standar ukuran teks harus terbaca sangat jelas dari kejauhan:
     - **Judul Sampul Utama**: `clamp(3.5rem, 8.5vw, 6.8rem)` dengan efek stiker 3D teks berlapis (*white outline shadow* 5px–6px tebal).
     - **Subjudul Sampul**: `clamp(1.8rem, 4.2vw, 3.6rem)` tebal dan kontras.
     - **Judul Halaman / Title Bar**: `clamp(20px, 2.8vh, 28px)` font tebal di dalam pill badge bergradien.
     - **Judul Kartu Menu & Kartu Konsep**: `clamp(18px, 2.5vh, 25px)` dengan `font-weight: 800`.
     - **Teks Penjelasan & Paragraf Konten**: `clamp(16px, 2.1vh, 20px)` dengan `font-weight: 600` dan line-height `1.6` (DILARANG teks tipis berukuran 12px–13px).
     - **Tombol & Pilihan Jawaban Soal**: `clamp(16px, 2.2vh, 22px)` dengan padding lega `14px 28px` agar nyaman dioperasikan di layar sentuh proyektor atau tablet.
     - **Tombol "▶ MULAI" Raksasa**: Lingkaran play `clamp(68px, 9.5vh, 92px)` dengan ikon play `clamp(32px, 4.5vh, 46px)`, dan teks label `clamp(30px, 4.8vh, 48px)`.

7. **Audio Efek Suara 100% Offline (Web Audio API Synthesizer):**
   - Dilarang keras menautkan file MP3 eksternal. Gunakan osilator sintetis bawaan browser untuk efek klik tombol (*frequency sweep* 450Hz–880Hz), bunyi jawaban benar (akor nada ceria C-E-G), bunyi salah (nada rendah), serta simulasi desah tarikan dan hembusan napas.
   - Sediakan tombol toggle Suara: ON/OFF di navigasi atas.

8. **Deteksi Nama Berkas Gambar Otomatis & Penanganan Fallback (*Graceful Degradation*):**
   - AI **wajib mendeteksi dan menyesuaikan nama berkas gambar asli** yang dilampirkan/diunggah pengguna (nama file logo sekolah, foto guru, atau latar belakang apa pun nama berkasnya). Gunakan nama berkas yang dilampirkan tersebut langsung pada tag `<img src="...">`.
   - Setiap tag `<img>` untuk logo dan foto wajib memiliki atribut `onerror="this.style.display='none'"` agar tidak muncul kotak silang rusak bila file lokal belum disiapkan.

---

## 📱 BAGIAN 3 — STRUKTUR HALAMAN (7 MODUL PEMBELAJARAN LENGKAP)

Aplikasi dibangun dengan arsitektur Single Page Application (SPA) 7 halaman berpindah instan:

### 1. Halaman 1: Sampul / Beranda (*Cover*)
- **Header Atas**: Kapsul resmi nama sekolah (`SMP Negeri 2 Lamongan`), logo sekolah berukuran besar (tinggi min. 55–75px), dinas pendidikan, serta badge kemitraan (*Kurikulum Merdeka*, *Fase D*).
- **Bagian Tengah Terfokus**: Judul materi raksasa dengan gaya stiker 3D kontras, subtopik penjelasan berhuruf besar, dan **Tombol "▶ MULAI" Raksasa** berputar/berdenyut (*pulsing glow effect*) yang memikat perhatian siswa. Tidak perlu ada kartu samping yang mengganggu konsentrasi.
- **Footer Bawah**: Baris identitas guru pengembang media dan semboyan pembelajaran dengan font jelas.

### 2. Halaman 2: Menu Utama (*Dashboard Modul*)
- Grid 6 kartu menu berdimensi 3D dengan **wadah ikon jumbo (72–96px)**, judul tegas berukuran `18–25px`, dan deskripsi singkat terbaca jelas:
  1. 🎯 **Tujuan Pembelajaran** (Capaian & indikator kompetensi siswa)
  2. 🧬 **Materi Pembelajaran** (Eksplorasi organ/konsep kunci dengan diagram)
  3. 🌬️ **Simulator Interaktif** (Laboratorium virtual makro & mikro ber-SVG besar)
  4. 📝 **Evaluasi Multi-Format** (3 jenis instrumen uji pemahaman berbobot 100 poin)
  5. 👨‍🏫 **Profil Guru** (Informasi fasilitator pendidik dengan foto besar)
  6. 💡 **Fakta Sains Menarik** (Pop-up interaktif info sains menakjubkan)
- Navigasi atas: Tombol `🏠 BERANDA` dan kontrol aksesibilitas cepat (Pengatur Zoom & Ukuran Huruf).

### 3. Halaman 3: Tujuan Pembelajaran
- Menampilkan kartu tunggal **Tujuan Pembelajaran (TP)** yang luas, fokus, dan terpusat:
  - Butir-butir indikator ketercapaian tujuan pembelajaran yang spesifik, operasional, dan terukur dengan tipografi besar `16–20px` dan ikon poin tematik.
  - Tidak perlu petunjuk penggunaan media atau petunjuk praktikum agar siswa langsung fokus pada target kompetensi yang harus dikuasai.

### 4. Halaman 4: Materi Inti Pembelajaran
- Grid kartu konsep materi (minimal 4–6 organ/konsep pokok) dengan:
  - **Ikon dan ilustrasi grafis besar** di setiap kartu.
  - Judul tebal berukuran besar `18–24px`.
  - Paragraf penjelasan sains yang lugas, bermakna, dan mudah dibaca dari jarak jauh (font `16–19px`, `font-weight: 600`).

### 5. Halaman 5: Simulator Interaktif (Makro & Mikro)
- Memiliki tab pengalih tampilan dua mode dengan **kanvas diagram SVG berukuran JUMBO (tinggi 320–520px)**:
  - **Mode Makro (Anatomi Mekanika)**: Diagram SVG vektor dinamis berukuran besar yang merespons tombol aksi *Tarik Napas* dan *Hembuskan Napas*, slider manual, selektor mekanisme pernapasan (perut vs dada), serta kartu telemetri angka real-time yang besar dan jelas.
  - **Mode Mikro (Mikroskopik Pertukaran Gas)**: Infografis SVG penampang melintang berstruktur 3 zona terpisah berukuran besar (Rongga Alveolus, Membran Difusi Beranimasi, dan Pembuluh Kapiler Darah dengan sel eritrosit bersirkulasi tebal). Dilengkapi 4 kartu langkah penuntun yang jika diklik memberikan sorotan bercahaya (*glow highlight*) pada bagian diagram yang sesuai. Teks label SVG wajib menggunakan kotak badge berlatar belakang putih agar bebas dari tabrakan garis.

### 6. Halaman 6: Evaluasi Multi-Format (Skor Total: 100 Poin)
- Instrumen asesmen formatif 3 babak bertahap dengan tombol dan kartu jawaban berukuran besar:
  - **Babak A (Pilihan Ganda - 30 Poin)**: 3 soal kontekstual dengan 4 opsi tombol besar ber-padding lega, umpan balik langsung (*instant feedback*), dan suara apresiasi.
  - **Babak B (Menjodohkan Garis SVG - 40 Poin)**: 4 pasang kartu konsep kiri dan fungsi kanan berukuran besar. Siswa mengklik pasangan dan sistem otomatis menggambar garis SVG animasi interaktif yang menghubungkan keduanya.
  - **Babak C (Benar / Salah - 30 Poin)**: 3 pernyataan analisis kritis dengan tombol besar **✓ BENAR** dan **✗ SALAH**.
  - **Babak D (Rekapitulasi Skor)**: Piala animasi besar (min. 64px), nilai total (0–100), rincian poin per babak, kalimat motivasi pencapaian, dan tombol reset evaluasi.

### 7. Halaman 7: Profil Guru Pengembang
- Kartu profil luas memuat:
  - **Foto guru berukuran besar** dalam bingkai lingkaran berdiameter `150–210px` dengan border gradien tebal dan bayangan timbul.
  - Nama lengkap dan gelar dengan font besar tebal `24–30px`.
  - Jabatan/tugas dan asal sekolah dengan font `16–18px`.
  - Kutipan motivasi inspiratif bagi pendidikan.

---

## 💻 BAGIAN 4 — PROMPT INSTRUKSI KE AI

Salin teks berikut ini ke AI:

> "Tolong buatkan kode program lengkap untuk Media Pembelajaran Interaktif (MPI) Kurikulum Merdeka sesuai seluruh spesifikasi di atas. Hasilkan **1 file `index.html` mandiri yang utuh dan lengkap tanpa terpotong**. 
> 
> Syarat mutlak yang wajib dipenuhi:
> 1. Gunakan warna cerah ceria dengan background `bg-ruang-kelas.jpg` ber-overlay putih transparan. `#stage-16-9` harus transparan tanpa border dan tanpa box-shadow agar menyatu dengan background.
> 2. **SKALA VISUAL WAJIB JUMBO & BOLD (SANGAT PENTING)**:
>    - DILARANG menggunakan teks kecil (12–13px) atau ikon sempit.
>    - Huruf konten & penjelasan berukuran BESAR: minimal `16px–20px` (font-weight: 600) agar terbaca jelas dari baris belakang kelas melalui proyektor.
>    - Judul sampul raksasa ber-outline putih stiker 3D tebal (`clamp(3.5rem, 8.5vw, 6.8rem)`).
>    - Wadah ikon (*icon-box*) berukuran besar `72px–96px` dengan ukuran emoji/ikon `38px–54px`.
>    - Ilustrasi grafis dan diagram SVG pada materi dan simulator WAJIB BERUKURAN BESAR (tinggi kanvas SVG minimal `320px–520px`, lebar penuh 100%) dengan garis organ tebal (`stroke-width: 5px–8px`), partikel besar, dan label teks SVG berukuran `16px–20px` di dalam kotak label (*pill badge*) berlatar putih agar bebas tumpang tindih.
>    - Foto profil guru berukuran besar (lingkaran diameter `150px–210px`) dan logo sekolah tinggi minimal `55px–75px`.
> 3. Halaman cover terpusat dengan tombol '▶ MULAI' raksasa berpendar tanpa kartu samping.
> 4. Halaman 3 berjudul 'Tujuan Pembelajaran' (kartu terpusat memuat indikator TP Kurikulum Merdeka, tanpa petunjuk penggunaan media/praktikum).
> 5. Efek suara 100% menggunakan Web Audio API sintetis (tanpa file MP3 eksternal).
> 6. Evaluasi formatif 3 jenis (Pilihan Ganda + Menjodohkan Garis SVG interaktif + Benar/Salah) berbobot total 100 poin dengan tombol-tombol pilihan berukuran besar.
> 7. Deteksi nama file gambar/logo/foto yang dilampirkan pengguna secara otomatis dan sesuaikan referensi `src`-nya di kode HTML dengan penanganan error fallback."
