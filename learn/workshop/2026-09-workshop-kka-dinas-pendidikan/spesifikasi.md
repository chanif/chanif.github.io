# 📋 SPESIFIKASI PROMPT MEDIA PEMBELAJARAN INTERAKTIF (MPI) SMP
# Template Vibe Coding Mandiri — Siap Pakai untuk Semua Mata Pelajaran

> **Petunjuk Guru:**  
> Salin seluruh isi dokumen ini, sesuaikan bagian **[1. Identitas & Materi]** di bawah, lalu tempelkan (*paste*) langsung ke chat AI (**Claude**, **Gemini**, atau **ChatGPT**). AI akan langsung memprogramkan media interaktif yang memikat, berhuruf besar terbaca jelas, dan siap tayang!

---

## 🎯 1. IDENTITAS & MATERI (SESUAIKAN DENGAN KELAS ANDA)

- **Mata Pelajaran** : [Contoh: IPA / Matematika / Bahasa Indonesia / IPS / Informatika / Bahasa Inggris]
- **Fase / Jenjang**   : [Contoh: Fase D — Kelas VII / VIII / IX SMP]
- **Materi Pokok**    : [Contoh: Sistem Respirasi (Mekanisme Pernapasan) / Teorema Pythagoras / Teks Prosedur]
- **Tujuan Singkat**  : [Contoh: Peserta didik mampu menganalisis mekanisme inspirasi-ekspirasi serta fungsi diafragma]
- **Nama Guru**       : [Contoh: Ach. Chanifuddin Fanani, S.Pd.]
- **Nama Sekolah**    : [Contoh: SMP Negeri 2 Lamongan]
- **File Logo**       : `logo-smp-negeri-2-lamongan.png` (atau `logo.png` di folder yang sama)
- **File Foto Guru**  : `fanani.jpg` (atau `foto-guru.jpg` di folder yang sama)

---

## 🎨 2. ESTETIKA, TIPOGRAFI, & ATURAN TEKNIS (WAJIB DIPATUHI AI)

1. **Wajib 1 File Tunggal (`index.html`)**:
   - Seluruh kode (HTML, CSS di dalam `<style>`, dan JavaScript di dalam `<script>`) **harus berada dalam satu file `index.html` utuh**.
   - DILARANG memisahkan berkas `.css` atau `.js` agar guru dapat langsung membuka file cukup dengan klik ganda di peramban (Chrome/Edge).
2. **Ukuran Huruf Wajib BESAR & Terbaca Jelas di Layar Proyektor / Jarak Jauh**:
   - **Teks Tubuh & Deskripsi**: Minimal 14px–16px (`text-sm` hingga `text-base`).
   - **Judul Halaman & Judul Kartu**: Minimal 20px–36px (`text-xl` hingga `text-4xl`, `font-extrabold`).
   - **Tombol & Pilihan Jawaban Kuis**: Minimal 16px (`text-base` atau `text-lg`, tebal dan nyaman disentuh).
   - **DILARANG KERAS memakai teks terlalu kecil**: Jangan gunakan `text-[10px]`, `text-[11px]`, atau `text-xs` pada konten bacaan, soal, dan penjelasan utama.
3. **Tema Visual Cerah, Ceria, & Penuh Grafis Simbolik**:
   - **Warna Cerah Ramah SMP**: Latar putih bersih, aksen pastel ceria (sky blue, mint toska, coral hangat, amber). **HINDARI tema gelap/dark mode yang kusam**.
   - **Banjir Simbol & Ikon**: Gunakan banyak emoji tematik berukuran besar (🫁 🌬️ 👃 🎋 🌿 🍇 🛡️ 🧬 📖 🎯 📝 👨‍🏫 💡), kartu berbingkai warna-warni, serta ilustrasi grafis SVG terintegrasi.
4. **Kemandirian Aset & Audio Sintetis**:
   - Font: Google Fonts modern (*Quicksand* untuk judul / *Inter* untuk teks).
   - Efek Suara: Wajib disintesis menggunakan **Web Audio API** murni (bunyi klik tombol, napas, benar, salah, selesai). Jangan menggunakan file MP3 eksternal.
5. **Penanganan Logo & Foto Profesional**:
   - Tempatkan logo pada Cover dan Navigasi:
     `<img src="logo-smp-negeri-2-lamongan.png" alt="Logo Sekolah" class="h-12 w-auto object-contain" onerror="this.src='logo.png'; this.onerror=function(){this.style.display='none';};">`
     *(Jika berkas logo tidak ada, sembunyikan otomatis dan gantikan dengan lencana teks sekolah)*.
   - Tempatkan foto guru pada Halaman Profil:
     `<img src="fanani.jpg" alt="Foto Guru" class="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white" onerror="this.src='foto-guru.jpg'; this.onerror=function(){this.src='data:image/svg+xml,...';};">`
6. **Rasio Layar 16:9 Lanskap Terkunci & Responsif**:
   - Tampilan dikunci dalam kontainer rasio **16:9 lanskap** (`aspect-ratio: 16 / 9; width: min(100vw, calc(100vh * 16 / 9));`) dengan latar belakang lingkungan sains yang hangat, bebas pengguliran (*scroll-free*) yang membingungkan.
7. **Standar Desain Halaman Depan (Cover) Profesional Kemendikdasmen**:
   - **Bilah Logo Atas**: Kiri berisi kapsul instansi sekolah (`logo-smp-negeri-2-lamongan.png`) dan kanan berisi lencana kurikulum (*Kurikulum Merdeka*, *#PendidikanBermutu*, *Fase D SMP*).
   - **Tipografi 3D "Sticker Outline"**: Judul materi utama besar tebal dengan bayangan garis tepi putih multi-arah (*text-shadow outline*), subjudul berwarna oranye hangat, dan lencana jenjang kapsul padat.
   - **Tombol Ikonik "▶ MULAI"**: Tombol kapsul putih ber-border toska tebal (`border: 4.5px solid var(--teal)`) dengan lingkaran putar gradien di kiri, teks tebal `MULAI`, dan animasi denyut pendar (*pulse glow*).
   - **Kartu Penyeimbang Samping (Anchor Cards)**: Menampilkan info ringkas/fakta sains di kiri dan kanan judul agar tampilan seimbang dan berkelas.

---

## 📱 3. STRUKTUR ALUR MEDIA PEMBELAJARAN (SPA 7 BAGIAN)

Aplikasi wajib menerapkan alur **Single Page Application (SPA)** dengan navigasi instan:

1. **Halaman 1: Cover (Standar Profesional Direktorat SMP / Kemendikdasmen)**
   - Logo sekolah (`logo-smp-negeri-2-lamongan.png`), lencana kemitraan/kurikulum, kartu ringkasan samping, judul materi 3D sticker outline, pill jenjang Fase D, tombol utama berukuran besar: **"▶ MULAI"** berpendar, dan kredit nama guru pengembang di bilah bawah.
2. **Halaman 2: Menu Utama (Dashboard Penuh Ikon Besar 3D)**
   - Bilah navigasi kapsul (Beranda) dan kartu cepat aksesibilitas (Zoom & Font).
   - 6 Kartu menu interaktif dengan animasi hover membal dan teks yang sangat mudah terbaca:
     1. 📖 **Petunjuk & TP** (Tujuan dan alur pembelajaran)
     2. 🧬 **Organ Pernapasan** (Penjelasan struktur & fungsi visual)
     3. 🌬️ **Simulator Paru-Paru [Unggulan "WAH"]** (Simulasi dua arah dinamis)
     4. 📝 **Evaluasi Multi-Format** (Pilihan Ganda, Menjodohkan Garis SVG, Benar/Salah)
     5. 👨‍🏫 **Profil Guru** (Biodata pengembang media)
     6. 💡 **Fakta Sains Menarik** (Pop-up kejutan sains inspiratif)
3. **Halaman 3: Petunjuk & Tujuan Pembelajaran**
   - Rincian ringkas indikator capaian belajar dan langkah eksplorasi dalam ukuran teks terbaca jelas.
4. **Halaman 4: Materi Pembelajaran Interaktif**
   - 6 Kartu organ dengan simbol visual dan penjelasan konsep mendalam ramah anak SMP.
5. **Halaman 5: Simulasi Interaktif Berdampak "WAH" (Highlight Workshop)**
   - Wajib menghadirkan simulasi dua arah yang dinamis dan hidup:
     - Tombol aksi besar: *"1. Tarik Napas (Inspirasi)"* dan *"2. Hembuskan (Ekspirasi)"*.
     - Animasi perubahan grafis SVG secara real-time (paru-paru membesar/mengecil, sekat diafragma melengkung/mendatar, partikel udara bergerak masuk/keluar).
     - Efek suara napas realistis disintesis lewat **Web Audio API**.
     - Papan telemetri sains dengan teks terbaca jelas (perubahan volume, tekanan udara Hukum Boyle, status organ) serta tombol *Auto-Play/Otomatis*.
6. **Halaman 6: Evaluasi Multi-Format Interaktif (Bukan Hanya Pilihan Ganda)**:
   - **Bagian A: Pilihan Ganda (PG)**: 3 butir soal konseptual berhuruf besar (30 poin).
   - **Bagian B: Menjodohkan Organ & Fungsi (Matching)**: 4 pasang kartu dengan **animasi garis penghubung SVG interaktif** yang tertarik dari kartu kiri ke kanan saat diklik, dengan respon warna (hijau jika cocok, merah jika salah) dan suara sintetis (40 poin)!
   - **Bagian C: Benar / Salah (True/False)**: 3 pernyataan cepat untuk menguji ketelitian konsep (30 poin).
   - **Halaman Hasil & Rekapitulasi**: Skor total skala 100, rincian skor per bagian, ulasan kualitatif, dan tombol reset evaluasi.
7. **Halaman 7: Profil Guru Pengembang**
   - Foto guru (`fanani.jpg` / `foto-guru.jpg`), nama lengkap dengan gelar, instansi sekolah, kutipan inspiratif, dan tombol kembali ke Menu Utama.

---

## 💻 4. PERINTAH INSTRUKSI KEPADA AI

"Tolong buatkan kode program lengkap untuk Media Pembelajaran Interaktif (MPI) di atas sekarang. Tuliskan kodenya secara utuh dalam 1 blok kode HTML lengkap tanpa terpotong, dikunci dalam rasio 16:9 lanskap responsif, dengan warna cerah ceria, huruf BESAR DAN TERBACA JELAS (font minimal 14px-16px, judul 24px-44px), cover profesional standar Kemendikdasmen dengan judul 3D sticker outline dan tombol '▶ MULAI' berpendar, simulator visual paru-paru interaktif 'wah' bersuara sintetis, serta evaluasi multi-format lengkap!"

