# 📋 Master Plan & Roadmap Laboratorium Interaktif Informatika (Fase D - SMP)
**Author**: Ach. Chanifuddin Fanani, S.Pd.  
**Repository**: [chanif.github.io/lab/](file:///d:/Belajar/fanani/chanif.github.io/lab/)  
**Status**: Active Development  
**Last Updated**: 2026-09-26  

---

## 🎯 Visi & Tujuan
Mengembangkan laboratorium virtual, media interaktif, dan simulasi eksploratif berbasis web untuk pembelajaran Informatika Kurikulum Merdeka Fase D (SMP). Laboratorium dirancang agar:
1. **Interaktif & Visual**: Siswa tidak hanya membaca teori, tetapi langsung memanipulasi variabel, menguji hipotesis, dan melihat dampak seketika (*instant visual feedback*).
2. **Konteks Nyata Siswa SMP**: Studi kasus menggunakan data dan skenario kehidupan sehari-hari (sekolah, gawai, media sosial, pertemanan, dan permainan).
3. **Mandiri & Ringan**: Dibangun dengan Vanilla JS + Canvas/SVG + Tailwind CSS tanpa ketergantungan library berat, bekerja lancar di smartphone, tablet, laptop sekolah, maupun Chromebook.
4. **Mendukung Mode Gelap (Dark Mode)**: Harmonis dengan sistem tema global situs melalui `theme.js`.

---

## 🗺️ Peta Cakupan Elemen Informatika (Fase D)

| Elemen | Nama Modul Lab | Status | Deskripsi Singkat |
| :--- | :--- | :---: | :--- |
| **BK** (Berpikir Komputasional) | *MPI Berpikir Komputasional* & *Algorithm Kingdom* | ✅ Selesai | 4 Pilar CT, Smart Home IoT, logika algoritma, perulangan, & percabangan. |
| **SK** (Sistem Komputer) | *Lab Perakitan Komputer* & *MPI Sistem Komputer* | ✅ Selesai (Dikerjakan User) | Perakitan perangkat keras, simulasi saklar biner, Von Neumann, POST boot audio. |
| **JKI** (Jaringan Komputer & Internet) | *MPI Jaringan Komputer* | ✅ Selesai | Visualisasi pengiriman paket data, router hop, packet switching. |
| **AD** (Analisis Data) | **Lab Detektif Data & Visualisasi Korelasi** | 🚀 **Dalam Pengerjaan** | Pembersihan data (*data cleaning*), dynamic chart studio, & simulator korelasi 2 variabel. |
| **DSI** (Dampak Sosial Informatika) | **Lab Keamanan Digital: Password Fortress & Phishing Detective** | ⏳ Terencana | Pengukur entropi kata sandi, simulator brute force, & detektor rekayasa sosial/hoaks. |
| **TIK** (Teknologi Informasi & Komunikasi) | **Simulator Pencarian & Validasi Informasi** | ⏳ Terencana | Operator pencarian lanjutan (*search operators*), kurasi sumber tepercaya, & uji CRAAP. |
| **PLB** (Praktik Lintas Bidang) | **Virtual Digital Showcase & Peer Review** | ⏳ Terencana | Galeri pameran karya artefak komputasi siswa dengan rubrik penilaian kolaboratif. |

---

## 🔬 Rincian Rencana Pengembangan Modul

### 1. 📊 Modul AD: Lab Analisis Data & Visualisasi (Prioritas Utama)
- **Folder**: `lab/analisis-data/`
- **File Utama**: `index.html`, `js/data-engine.js`, `js/charts.js`, `assets/data/`
- **Konsep Inti**:
  1. **Dataset Explorer**: 100 data riil survei aktivitas harian siswa SMP (Waktu Belajar, Waktu Main Game/HP, Jam Tidur, Nilai Rata-rata Ujian, Ekskul, Uang Saku).
  2. **Data Scrubbing / Cleaning Mode**: Game mini interaktif mendeteksi nilai tidak wajar (*outlier/anomaly*) seperti jam belajar 50 jam/hari atau nilai negatif.
  3. **Multi-Chart Studio (Canvas/SVG)**:
     - *Bar Chart*: Distribusi nilai & perbandingan kategori ekskul.
     - *Donut / Pie Chart*: Proporsi alokasi waktu 24 jam siswa.
     - *Scatter Plot & Trendline*: Memetakan hubungan 2 variabel (misal: "Screen Time vs Jam Tidur" atau "Waktu Belajar vs Nilai Ujian").
  4. **Correlation & Hypothesis Tester**:
     - Siswa memilih Hipotesis (misal: *"Semakin lama main HP, apakah nilai pasti hancur?"*).
     - Menghitung koefisien korelasi Pearson secara visual dengan interpretasi ramah anak (Korelasi Positif Kuat, Korelasi Negatif, atau Tidak Berkorelasi).
     - Menekankan prinsip penting data: *"Korelasi tidak selalu berarti sebab-akibat (Correlation does not imply causation)"*.
  5. **Misi Detektif Data**: 3 studi kasus evaluasi berbasis data dengan badge penyelesaian.

---

### 2. 🛡️ Modul DSI: Lab Keamanan Digital & Etika Informasi
- **Folder**: `lab/dsi/`
- **Konsep Inti**:
  1. **Password Fortress**:
     - Kalkulator entropi sandi interaktif (*Length, Lowercase, Uppercase, Numbers, Special Symbols*).
     - Simulasi waktu retas *Brute Force* (dari milidetik hingga milyaran tahun) dengan visualisasi superkomputer/GPU cluster.
     - Pembangun Passphrase aman dan mudah diingat (*xkcd method*).
  2. **Phishing & Fake News Detective**:
     - Skenario inbox interaktif (Email palsu bank, chat WhatsApp hadiah undian, link login Instagram palsu).
     - Kaca pembesar digital untuk memeriksa domain name spoofing, sertifikat SSL, dan *urgency manipulation*.

---

### 3. 🔍 Modul TIK: Simulator Pencarian & Validasi Informasi
- **Folder**: `lab/tik/`
- **Konsep Inti**:
  1. **Google Dorking / Search Operators Simulator**:
     - Simulasi antarmuka search engine dengan filter operator: `site:kemdikbud.go.id`, `filetype:pdf`, `"frasa pasti"`, `exclude -kata`.
  2. **CRAAP Test Evaluator**:
     - Evaluasi kredibilitas artikel berita secara interaktif (*Currency, Relevance, Authority, Accuracy, Purpose*).

---

### 4. 🎨 Modul PLB: Virtual Digital Showcase & Peer Review
- **Folder**: `lab/plb/`
- **Konsep Inti**:
  1. **Virtual Showcase Booths**:
     - Galeri pameran produk artefak komputasi siswa (Poster Canva, Game Scratch, Prototipe Web, Lembar Kerja AI).
  2. **Rubrik Evaluasi Sejawat (Peer Feedback)**:
     - Form interaktif pemberian apresiasi dan saran konstruktif dengan format bintang dan rubrik 4 kriteria.

---

## ⚙️ Prinsip Teknis
- Menggunakan standar modern HTML5, ES6 Modules, Tailwind CSS pre-compiled (`assets/css/style.min.css`).
- Dukungan penuh Dark Mode (`theme.js`).
- Aksesibilitas keyboard dan mobile responsive.
- **MPI Protection Enforced**: Folder `lab/mpi/` tetap terlindungi dan tidak disentuh sama sekali.
