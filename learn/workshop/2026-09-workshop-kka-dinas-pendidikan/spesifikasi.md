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

## 📱 BAGIAN 3 — STRUKTUR HALAMAN (7 HALAMAN BERURUTAN)

Aplikasi navigasi satu halaman (SPA) dengan 7 halaman berurutan:

1. **Cover** — Logo sekolah di sudut, nama mata pelajaran dan materi besar di tengah, tombol **"▶ MULAI"** mencolok, nama guru di bawah.

2. **Menu Utama** — 6 kartu besar ikon dengan teks jelas:
   - 📖 Petunjuk & Tujuan
   - 📚 Materi Utama
   - ⚡ Simulasi Interaktif
   - 📝 Kuis Evaluasi
   - 👨‍🏫 Profil Guru
   - 💡 Fakta Menarik

3. **Petunjuk & Tujuan** — Cara menggunakan media dan tujuan pembelajaran yang jelas.

4. **Materi Utama** — Minimal 4–6 kartu konsep dengan penjelasan dan ilustrasi emoji/grafis.

5. **Simulasi Interaktif** — Animasi visual interaktif yang relevan dengan materi (bisa berupa slider, klik-klik, animasi proses, dll). Sertakan suara sintetis dan tombol aksi besar.

6. **Kuis Evaluasi** — Minimal 3 jenis soal:
   - Bagian A: 3 soal Pilihan Ganda (huruf besar, 30 poin)
   - Bagian B: 4 pasang Menjodohkan dengan garis SVG interaktif (40 poin)
   - Bagian C: 3 soal Benar/Salah (30 poin)
   - Halaman hasil: skor total, rincian, tombol ulangi

7. **Profil Guru** — Foto guru (`foto-guru.jpg`), nama, sekolah, dan kata motivasi.

---

## 💻 BAGIAN 4 — PERINTAH KE AI

"Tolong buatkan kode program lengkap untuk Media Pembelajaran Interaktif (MPI) sesuai spesifikasi di atas. Hasilkan **1 blok kode HTML utuh** tanpa terpotong. Gunakan warna cerah ceria, huruf BESAR (min. 14px konten, 24px judul), rasio layar 16:9 responsif, cover profesional dengan tombol '▶ MULAI' berpendar, simulasi interaktif yang visual dan bersuara sintetis Web Audio API, serta kuis evaluasi 3 format (PG + Menjodohkan SVG + Benar/Salah). Pastikan logo dan foto guru dimuat dengan fallback otomatis jika file tidak tersedia. Gunakan `bg-ruang-kelas.jpg` sebagai background body dengan overlay putih semi-transparan (rgba 255,255,255,0.82) agar konten tetap terbaca, dengan fallback warna `#f0f9ff`."
