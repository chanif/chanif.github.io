# 📋 SPESIFIKASI MEDIA PEMBELAJARAN INTERAKTIF (MPI)
# Template Vibe Coding — Untuk Semua Mata Pelajaran SMP

> **Cara Pakai:**
> Ubah bagian **[BAGIAN 1]** sesuai mata pelajaran dan identitas Anda,
> lalu salin seluruh teks ini dan kirim ke **Gemini** atau **Claude AI**.
> AI akan membuatkan aplikasi media pembelajaran interaktif berbasis web secara otomatis.

---

## 🎯 BAGIAN 1 — IDENTITAS & MATERI (SESUAIKAN INI)

- **Mata Pelajaran** : [Contoh: IPA / Matematika / Bahasa Indonesia / IPS / Informatika]
- **Fase / Kelas**   : [Contoh: Fase D — Kelas VII / VIII / IX SMP]
- **Materi Pokok**   : [Contoh: Tata Surya / Teorema Pythagoras / Teks Prosedur / dst.]
- **Tujuan Belajar** : [Contoh: Peserta didik mampu menjelaskan urutan planet di tata surya]
- **Nama Guru**      : [Nama Lengkap + Gelar — Contoh: Budi Santoso, S.Pd.]
- **Nama Sekolah**   : [Contoh: SMP Negeri 1 Lamongan]
- **File Logo**      : `logo.png` (letakkan satu folder dengan index.html)
- **File Foto Guru** : `foto-guru.jpg` (letakkan satu folder dengan index.html)
- **File Background**: `bg-ruang-kelas.jpg` (letakkan satu folder dengan index.html)

---

## 🎨 BAGIAN 2 — ATURAN TAMPILAN (WAJIB DIIKUTI AI)

1. **Satu file saja:** Hasil akhir harus berupa **1 file `index.html`** lengkap. Semua CSS di dalam `<style>` dan JavaScript di dalam `<script>`. Tidak boleh ada file .css atau .js terpisah.

2. **Huruf besar dan jelas** untuk proyektor kelas:
   - Teks konten minimal **14–16px**
   - Judul minimal **24–40px**, tebal
   - Tombol dan pilihan kuis minimal **16px**, mudah diklik

3. **Warna cerah dan ceria** (bukan tema gelap):
   - Latar putih bersih, aksen warna terang (biru langit, hijau mint, oranye hangat)
   - Banyak emoji tematik sebagai dekorasi visual

4. **Efek suara sintetis** menggunakan Web Audio API bawaan browser — tidak boleh menggunakan file MP3 eksternal.

5. **Logo dan foto guru** ditampilkan dengan fallback otomatis:
   - Logo: `<img src="logo.png" onerror="this.style.display='none'">`
   - Foto: `<img src="foto-guru.jpg" onerror="this.style.display='none'">`
   - Jika file tidak ada, tampilan tetap rapi (tidak ada gambar rusak/silang merah).

6. **Rasio layar 16:9** terkunci, responsif, dan bebas scroll antar halaman (tidak perlu scroll panjang ke bawah).

7. **Background foto ruang kelas** (`bg-ruang-kelas.jpg`) digunakan sebagai latar belakang keseluruhan aplikasi:
   - `body { background: url('bg-ruang-kelas.jpg') center/cover no-repeat fixed; }`
   - Di atas background foto, tambahkan overlay semi-transparan agar konten tetap terbaca: `background: rgba(255,255,255,0.82)`
   - Fallback jika file tidak ada: gunakan warna latar `#f0f9ff` (biru muda cerah).

---

## 📱 BAGIAN 3 — STRUKTUR HALAMAN (6 HALAMAN BERURUTAN)

Aplikasi navigasi satu halaman (SPA) tanpa halaman cover splash terpisah, sehingga foto latar belakang ruang kelas (`bg-ruang-kelas.jpg`) langsung menyatu secara elegan dengan konten sejak awal dibuka:

1. **Menu Utama (Beranda Terpadu)** — Tampilan beranda langsung saat aplikasi dibuka:
   - Header terpadu: logo sekolah (`logo.png`), identitas dinas & sekolah, judul mapel & materi pokok, tombol kontrol font/zoom, dan kartu identitas guru.
   - 6 kartu modul interaktif yang jelas dan mudah diklik:
     - 📖 Petunjuk & Tujuan
     - 📚 Materi Utama
     - ⚡ Simulasi Interaktif
     - 📝 Kuis Evaluasi
     - 👨‍🏫 Profil Guru
     - 💡 Fakta Menarik

2. **Petunjuk & Tujuan** — Petunjuk belajar dan capaian/tujuan pembelajaran (TP).

3. **Materi Utama** — Minimal 4–6 kartu konsep dengan penjelasan dan ilustrasi visual tematik.

4. **Simulasi Interaktif (Canggih & Edukatif)** — Simulasi visual real-time multi-fitur:
   - Mode mekanisme ganda: Pernapasan Perut (Otot Diafragma) vs Pernapasan Dada (Otot Antartulang Rusuk / Interkostal).
   - Kontrol ritme aktivitas fisik: Istirahat (santai), Jalan Kaki, dan Olahraga Cepat (kecepatan animasi dan volume tidal beradaptasi).
   - Slider interaktif untuk menarik diafragma / kontraksi manual (0%–100%) dengan respons visual instan.
   - Papan instrumen telemetri real-time: volume udara (mL), tekanan intrapulmonal vs atmosfer (mmHg), kondisi otot (kontraksi/relaksasi), dan visualisasi Hukum Boyle.
   - Tampilan mikroskopis pertukaran gas di kantung alveolus & kapiler darah (difusi O₂ dan CO₂ pada hemoglobin eritrosit).
   - Efek suara sintetis hembusan napas (Web Audio API) yang realistis dengan tombol mute/unmute.

5. **Kuis Evaluasi** — Minimal 3 jenis soal:
   - Bagian A: 3 soal Pilihan Ganda (huruf besar, 30 poin)
   - Bagian B: 4 pasang Menjodohkan dengan garis SVG interaktif (40 poin)
   - Bagian C: 3 soal Benar/Salah (30 poin)
   - Halaman hasil: skor total (0–100), rincian poin per bagian, dan tombol ulangi kuis.

6. **Profil Guru** — Foto guru (`foto-guru.jpg`), nama lengkap beserta gelar, sekolah, dan kutipan motivasi pembelajaran.

---

## 💻 BAGIAN 4 — PERINTAH KE AI

"Tolong buatkan kode program lengkap untuk Media Pembelajaran Interaktif (MPI) sesuai spesifikasi di atas. Hasilkan **1 blok kode HTML utuh** tanpa terpotong. Gunakan warna cerah ceria, huruf BESAR (min. 14px konten, 24px judul), rasio layar 16:9 responsif. **Jangan buat cover terpisah**, jadikan Menu Utama sebagai beranda terpadu dengan header logo sekolah & identitas yang langsung menyatu elegan dengan background ruang kelas (`bg-ruang-kelas.jpg` dengan overlay semi-transparan `rgba(255,255,255,0.82)` dan fallback `#f0f9ff`). Buatkan **simulasi interaktif canggih** (mode mekanisme diafragma vs dada, slider ritme aktivitas fisik, slider kontrol manual tarikan diafragma, telemetri tekanan & volume Hukum Boyle, tampilan mikroskopis pertukaran gas alveolus, dan audio sintetis Web Audio API). Sertakan kuis evaluasi 3 format (PG + Menjodohkan garis SVG + Benar/Salah). Pastikan logo dan foto guru dimuat dengan fallback protektif jika file tidak ada."
