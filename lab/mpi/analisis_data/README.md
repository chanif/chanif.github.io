# 📊 Media Pembelajaran Interaktif (MPI): Analisis Data

**"Analisis Data: Mengungkap Cerita di Balik Angka"**

- **Mata Pelajaran:** Informatika (Kurikulum Merdeka)
- **Jenjang / Fase:** SMP / Fase D (Kelas VII – VIII)
- **Elemen:** Analisis Data (AD) — Selaras BSKAP No. 032/H/KR/2024
- **Pengembang:** Ach. Chanifuddin Fanani, S.Pd. — SMP Negeri 2 Lamongan
- **Status:** ✅ Selesai & Siap Digunakan (Offline-Ready Web SPA)

---

## ✨ Fitur Utama
1. **Desain Sistem Resmi Kemendikdasmen Informatika Fase D:** 21 halaman SPA terpadu dengan font lokal offline (`Fredoka`, `Nunito`, `Poppins`), latar belakang studio data, kontrol Zoom, Ukuran Teks (`Aa`), Toggle Audio Web Synth, dan navigasi sentuh/keyboard.
2. **6 Bagian Materi Interaktif + Mini-Lab Langsung:**
   - **Bagian 1:** Data, Informasi & Piramida DIKW + *Cek Cepat Jenis Data*
   - **Bagian 2:** Uji Praktik Menjodohkan istilah dasar (garis kurva SVG)
   - **Bagian 3:** Pengumpulan Data & Spreadsheet + *Demo Rumus Langsung* (`SUM`, `AVERAGE`, `MIN`, `MAX`, `COUNTIF`)
   - **Bagian 4:** *Pemutar Animasi Interaktif Alur Analisis Data* (4 adegan vektor SVG 48 detik + opsi video `.mp4` lokal)
   - **Bagian 5:** Visualisasi Data & Grafik + *Uji Sumbu Y Jujur vs Menyesatkan*
   - **Bagian 6:** Interpretasi Statistik Deskriptif (*Mean, Median, Modus, Range*), Korelasi vs Kausalitas, & Deteksi Bias
3. **Permainan "Laboratorium Detektif Data" (4 Misi Progresif):**
   - **Misi 1:** Klinik Data (membersihkan duplikat, outlier, sel kosong, dan format teks)
   - **Misi 2:** Lab Rumus Spreadsheet (`SUM`, `AVERAGE`, `COUNTIF` interaktif)
   - **Misi 3:** Studio Pilih Grafik (render grafik SVG langsung dari skenario data)
   - **Misi 4:** Detektif Grafik & Bias (audit grafik manipulatif menjadi laporan jujur)
4. **Evaluasi Mandiri 25 Poin & Refleksi:** PG (10), Benar/Salah (5), Menjodohkan (5), Urutan Siklus Data (5) lengkap dengan rekap pembahasan dan simpan refleksi `localStorage`.

---

## 📁 Struktur Berkas
```text
lab/mpi/analisis_data/
├── index.html                 # Aplikasi SPA 21 halaman lengkap
├── style.css                  # Stylesheet resmi + modul interaktif Analisis Data
├── script.js                  # Controller SPA, animasi pipeline, game 4 misi, kuis & audio synth
├── config.js                  # Konfigurasi tampilan, latar, logo, & metadata
├── content.md                 # Blueprint kurikulum & alur pedagogis MPI
├── README.md                  # Dokumentasi modul MPI Analisis Data
├── prompt/
│   ├── materi.md              # Bahan ajar & bank 10 soal formatif beserta pembahasan
│   └── prompt_video.md        # Panduan produksi video Google Vids (6 scene storyboard)
└── assets/
    ├── fonts/                 # Font offline Fredoka, Nunito, Poppins (.woff2 & fonts.css)
    ├── video/                 # Folder opsional untuk video lokal siklus_data.mp4
    ├── bg-data-clean.jpg      # Latar belakang studio analisis data
    ├── analisis_data.jpg      # Ilustrasi sampul katalog MPI
    ├── thumb_materi_1..6.jpg  # 6 thumbnail kartu materi gaya matte-3D minimalis
    └── Logo*.png / fanani.jpg # Aset logo resmi Kemendikdasmen & foto pengembang
```
