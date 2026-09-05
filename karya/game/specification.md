# 🍳 Chef Algorithm — Lomba Masak Digital

## Gim Edukasi untuk Festival Biru Putih 2026

**Tagline:** *"Susun resep, atur langkah, sajikan tepat waktu!"*

**Mata Pelajaran:** Informatika  
**Fase/Kelas:** Fase D (Kelas VII–IX SMP)  
**Elemen CP:** Algoritma & Pemrograman (AP) + Berpikir Komputasional (BK)  
**Kreator:** Chanif Fanani, S.Pd.  

---

## 📋 Ketentuan Juknis yang Wajib Dipenuhi

### A. Definisi & Karakteristik (BAB III Juknis)

- Gim Edukasi = bahan ajar yang mengintegrasikan gamifikasi untuk mendukung pencapaian tujuan pembelajaran
- Memiliki **alur penyelesaian misi (pathway)** yang jelas dari awal hingga akhir
- Terdapat **instruksi awal**, **sistem skor/poin**, dan **hasil akhir** yang ditampilkan jelas
- Eksplorasi berbasis konsep keilmuan tertentu
- Interaksi berupa: drag & drop, puzzle, menjodohkan, atau mekanisme permainan lainnya

### B. Struktur & Komponen Wajib

| # | Komponen | Keterangan |
|---|----------|------------|
| 1 | **Laman Muka** | Halaman pembuka: judul gim, tujuan pembelajaran, tombol mulai yang jelas |
| 2 | **Panduan** | Instruksi/tutorial cara bermain SEBELUM memulai gim utama |
| 3 | **Aktivitas/Misi** | Aktivitas atau misi permainan yang relevan dengan materi pembelajaran |
| 4 | **Misi (Pathway)** | Alur penyelesaian misi yang jelas dan terstruktur |
| 5 | **Indikator Progres** | Level, nyawa, jumlah misi tersisa, poin, atau progress bar |
| 6 | **Hasil Akhir** | Tampilan hasil akhir atau skor yang jelas sebagai apresiasi pencapaian |

### C. Mekanisme Permainan Wajib

| # | Aspek | Standar |
|---|-------|---------|
| 1 | **Minimal Tantangan** | ≥ 3 interaksi/tantangan relevan (3 level berbeda / 3 misi) |
| 2 | **Jenis Gamifikasi** | Berbasis peristiwa, tantangan, eksplorasi kontekstual, pemecahan masalah |
| 3 | **Mekanisme Dinamis** | Drag & drop, fill in the blank, mencocokkan, mengurutkan, menghubungkan, memilih jawaban |
| 4 | **Navigasi Intuitif** | Pengguna bisa memahami langkah berikutnya secara mandiri |

### D. Umpan Balik & Reward Wajib

| # | Aspek | Standar |
|---|-------|---------|
| 1 | **Respons Instan** | Setiap interaksi → respons langsung (visual dan/atau audio) |
| 2 | **Penghargaan** | Sistem reward yang mendorong melanjutkan permainan |
| 3 | **Hasil Akhir** | Skor/hasil akhir ditampilkan jelas sebagai apresiasi |

### E. Fungsionalitas & Stabilitas Wajib

| # | Aspek | Standar |
|---|-------|---------|
| 1 | **Bug-free** | Berjalan lancar tanpa kesalahan, tidak ada tautan mati, transisi antar-level mulus |
| 2 | **Waktu Muat** | ≤ 5 detik per level |
| 3 | **Lintas Perangkat** | Berfungsi di laptop, tablet, dan smartphone |
| 4 | **Audio Visual** | Animasi & suara memperkuat suasana, tidak berlebihan |
| 5 | **Konsistensi Visual** | Elemen visual konsisten, kontras tinggi, teks mudah dibaca |
| 6 | **Rasio Layar** | **16:9** |

### F. Format & Spesifikasi File

| # | Aspek | Spesifikasi |
|---|-------|-------------|
| 1 | Format | HTML5 (SPA — Single Page Application) |
| 2 | Pengumpulan | .ZIP dengan struktur folder jelas |
| 3 | Ukuran | ≤ 150 MB (termasuk semua aset, panduan, video demo) |
| 4 | File Panduan | PDF berisi panduan penggunaan (user guide) — **WAJIB** |
| 5 | Video Demo | Maksimal 3 menit, format MP4 — **WAJIB** |
| 6 | Dependensi | Hanya HTML, CSS, JavaScript standar. **TANPA plugin/URL eksternal** |
| 7 | Entry point | `index.html` di root directory .zip |
| 8 | Redirect | **TIDAK BOLEH** redirect ke halaman lain |

### G. Kriteria Penilaian

| Aspek | Bobot | Indikator |
|-------|-------|-----------|
| **Substansi** | **60%** | Kesesuaian Kurikulum (15%), Akurasi Keilmuan (15%), Kedalaman Materi (10%), Kemandirian Belajar (10%), Asesmen Terintegrasi (10%) |
| **Media** | **25%** | Fungsionalitas Gim (8%), Kualitas Visual & Audio (5%), Mekanisme Permainan (4%), Sistem Umpan Balik (4%), Navigasi & Instruksi (4%) |
| **Inovasi & Kreativitas** | **15%** | Orisinalitas (5%), Kontekstualisasi (5%), Daya Tarik (5%) |

### H. Ketentuan Umum

- ✅ Karya **orisinal**, belum pernah dipublikasikan
- ✅ Tidak mengandung unsur SARA, pornografi, politik
- ✅ Aset AI-generated harus dituliskan keterangan + dokumen prompting
- ✅ Aset eksternal harus royalty-free atau CC BY-SA 4.0 (dicantumkan sumbernya)
- ✅ Tidak ada watermark selain logo instansi dan logo Kemendikdasmen
- ✅ Logo Kemendikdasmen (Tut Wuri Handayani) **boleh** dicantumkan

---

## 🎮 Desain Game

### Konsep Utama

**Analogi:** Resep masak = Algoritma. Siswa bermain sebagai chef digital yang harus menyelesaikan misi memasak menggunakan konsep informatika secara natural.

**Gaya Visual:** MasterChef-style competition — dapur profesional, bahan-bahan colorful, animasi memasak.

### Alur Permainan (4 Level)

#### Level 1: **Susun Resep Nasi Goreng** 🥉
| Aspek | Detail |
|-------|--------|
| **Misi** | Drag & drop langkah masak ke urutan yang benar |
| **Langkah** | Cuci bahan → Potong → Tumis bumbu → Masukkan nasi → Aduk → Sajikan |
| **Mekanisme** | Drag & drop kartu langkah ke slot urutan |
| **Konsep Informatika** | **Algoritma sekuensial** — urutan langkah penting, tukar urutan = gagal |
| **Feedback** | ✅ Urutan benar → animasi masak step-by-step. ❌ Salah → efek gagal + penjelasan |
| **Skor** | Bintang berdasarkan jumlah percobaan (1× = ⭐⭐⭐, 2× = ⭐⭐, 3× = ⭐) |

#### Level 2: **Resep Bercabang** 🥈
| Aspek | Detail |
|-------|--------|
| **Misi** | Masak untuk tamu dengan preferensi berbeda |
| **Skenario** | "JIKA tamu vegetarian → pakai tahu. JIKA TIDAK → pakai ayam." |
| **Mekanisme** | Flowchart visual — siswa pilih cabang yang benar dari IF-ELSE diagram |
| **Konsep Informatika** | **Logika kondisional IF-ELSE** — keputusan berdasarkan kondisi |
| **Feedback** | ✅ Cabang benar → tamu senang + bintang. ❌ Salah → tamu kecewa + penjelasan |
| **Variasi** | 3 skenario berbeda (vegetarian, alergi, porsi diet) |

#### Level 3: **Masak 10 Porsi Efisien** 🥇
| Aspek | Detail |
|-------|--------|
| **Misi** | Punya resep 1 porsi. Harus masak 10 porsi tanpa menulis ulang 10×. |
| **Mekanisme** | Siswa menyusun "resep otomatis" menggunakan blok ULANGI (loop) |
| **Konsep Informatika** | **Perulangan / Loop** — efisiensi dengan repetisi |
| **Feedback** | Counter animasi: porsi 1 selesai... porsi 2... sampai 10 |
| **Bonus** | Bisa set jumlah porsi sendiri (5, 10, 20) — lihat loop berjalan |

#### Level 4: **Tantangan Waktu — 3 Menu Sekaligus!** 🏆
| Aspek | Detail |
|-------|--------|
| **Misi** | 3 menu harus selesai sebelum timer habis. Terlalu banyak untuk 1 orang! |
| **Mekanisme** | Pecah tugas ke 3 asisten: assign "cuci", "potong", "masak" → jalankan paralel |
| **Konsep Informatika** | **Dekomposisi & paralelisme** — pecah masalah besar jadi bagian kecil |
| **Feedback** | Animasi 3 asisten bekerja bersamaan → timer countdown → selesai/gagal |
| **Skor** | Bintang berdasarkan sisa waktu (cepat = lebih banyak bintang) |

### Sistem Penilaian & Reward

| Elemen | Detail |
|--------|--------|
| **Bintang** | 1–3 bintang per level (berdasarkan performa) |
| **Skor** | Akumulatif dari semua level (0–1000) |
| **Lencana** | "Chef Pemula" → "Chef Handal" → "Master Chef" → "Chef Legend" |
| **Progress Bar** | Visual di layar utama menunjukkan progres keseluruhan |
| **Halaman Hasil** | Ringkasan skor + bintang + lencana + waktu total |

### Halaman yang Harus Ada

| # | Halaman | Fungsi |
|---|---------|--------|
| 1 | **Cover / Laman Muka** | Judul, tujuan pembelajaran, tombol MULAI, info kreator |
| 2 | **Panduan / Tutorial** | Cara bermain, penjelasan mekanisme, tombol navigasi |
| 3 | **Menu Level** | Pilih level 1–4 (level terkunci sampai sebelumnya selesai) |
| 4 | **Level 1–4** | Area permainan utama (masing-masing) |
| 5 | **Hasil Per-Level** | Skor + bintang + feedback setelah selesai level |
| 6 | **Hasil Akhir** | Rangkuman keseluruhan setelah semua level selesai |
| 7 | **Profil Kreator** | Info pengembang (nama, sekolah, kontak) |

---

## 🏗️ Arsitektur Teknis

### Struktur File

```
karya/game/
├── index.html          ← Entry point (SPA)
├── style.css           ← Semua styling
├── script.js           ← Logika game utama
├── config.js           ← Konfigurasi game (skor, level, teks)
├── specification.md    ← Dokumen ini
├── assets/
│   ├── images/         ← Ilustrasi bahan, dapur, karakter
│   │   ├── kitchen/    ← Background & elemen dapur
│   │   ├── ingredients/← Bahan-bahan masakan
│   │   ├── characters/ ← Chef, asisten, tamu
│   │   └── ui/         ← Tombol, ikon, badge
│   ├── audio/          ← Sound effects
│   │   ├── sfx/        ← Sizzle, ding, chop, dll
│   │   └── bgm/        ← Background music per level
│   └── fonts/          ← Font custom (jika ada)
└── panduan/
    └── panduan-penggunaan.pdf  ← User guide (WAJIB)
```

### Pendekatan Teknis

| Aspek | Pilihan |
|-------|---------|
| **Arsitektur** | Single Page Application (SPA) — semua dalam 1 `index.html` |
| **Navigasi** | Section-based dengan `goToPage()` — sama seperti MPI yang sudah ada |
| **Styling** | Vanilla CSS — dark theme dapur, gradien warm (oranye, merah, kuning) |
| **Animasi** | CSS transitions + JavaScript (requestAnimationFrame) |
| **Drag & Drop** | HTML5 Drag & Drop API atau pointer events (touch-friendly) |
| **Audio** | Web Audio API untuk SFX, `<audio>` tag untuk BGM |
| **Responsif** | CSS media queries, rasio 16:9, fallback untuk layar kecil |
| **State** | JavaScript object untuk state game (skor, level unlocked, bintang) |

### Referensi Arsitektur

Gunakan pola arsitektur yang sama dengan MPI Sistem Komputer:
- `config.js` → konfigurasi global (judul, teks, skor max, dll)
- `script.js` → logika navigasi, game engine per level, state management
- `style.css` → design system, animasi, responsive layout
- `index.html` → semua section/page dalam 1 file

---

## 📐 Panduan Desain Visual

### Palet Warna

```
Primary:   #FF6B35 (Oranye hangat — api/kompor)
Secondary: #F7C948 (Kuning emas — bintang/reward)  
Accent:    #E63946 (Merah — tombol/alert)
Dark:      #1D1D1D (Hitam dapur profesional)
Light:     #FFF8F0 (Krem hangat — background)
Success:   #2ECC71 (Hijau — benar/selesai)
```

### Tipografi

- **Heading:** Font bold, playful (Google Fonts: Fredoka One / Baloo 2)
- **Body:** Font clean (Google Fonts: Nunito / Quicksand)
- **Ukuran:** Proporsional, mudah dibaca di layar kecil

### Gaya Ilustrasi

- **Flat design** dengan sentuhan 2.5D
- Warna-warna hangat (dapur, makanan, api)
- Karakter chef bergaya cartoon/chibi
- Bahan makanan dengan style kawaii/cute
- Animasi smooth (microinteraction saat hover, klik, drag)

---

## ✅ Checklist Kepatuhan Juknis

- [ ] Laman Muka dengan judul, tujuan, tombol mulai
- [ ] Panduan/tutorial sebelum mulai gim
- [ ] Minimal 3 tantangan/level (kita buat 4)
- [ ] Mekanisme dinamis: drag & drop, fill-in, pilih jawaban
- [ ] Navigasi intuitif
- [ ] Respons instan setiap interaksi (visual + audio)
- [ ] Sistem reward (bintang, lencana, skor)
- [ ] Hasil akhir/skor ditampilkan jelas
- [ ] Bug-free, loading ≤ 5 detik
- [ ] Lintas perangkat (laptop, tablet, smartphone)
- [ ] Rasio 16:9
- [ ] SPA — tidak redirect ke halaman lain
- [ ] Tidak ada URL/aset eksternal
- [ ] index.html di root directory
- [ ] File .zip ≤ 150 MB (target < 25 MB)
- [ ] PDF panduan penggunaan
- [ ] Video demo ≤ 3 menit (MP4)
- [ ] Aset orisinal / royalty-free / CC BY-SA 4.0
- [ ] Aset AI-generated diberi keterangan + dokumen prompting
- [ ] Materi selaras dengan CP & TP Informatika SMP

---

## 🗺️ Roadmap Pengerjaan

### Fase 1: Fondasi (Hari 1–2)
- [ ] Setup struktur file
- [ ] Buat `config.js` dan design system di `style.css`
- [ ] Buat halaman Cover / Laman Muka
- [ ] Buat halaman Panduan/Tutorial
- [ ] Buat halaman Menu Level dengan progress tracking
- [ ] Buat navigasi SPA (goToPage)

### Fase 2: Game Engine (Hari 3–5)
- [ ] Level 1: Drag & drop urutan resep
- [ ] Level 2: Flowchart IF-ELSE visual
- [ ] Level 3: Loop builder
- [ ] Level 4: Dekomposisi + timer
- [ ] Sistem skor, bintang, dan state management

### Fase 3: Polish (Hari 6–7)
- [ ] Sound effects dan background music
- [ ] Animasi dan transisi
- [ ] Halaman Hasil Per-Level dan Hasil Akhir
- [ ] Halaman Profil Kreator
- [ ] Responsive testing (laptop, tablet, phone)

### Fase 4: Deliverable (Hari 8)
- [ ] Buat PDF panduan penggunaan
- [ ] Rekam video demo (3 menit)
- [ ] Testing final di Chrome, Firefox, Safari, Edge
- [ ] Package .zip dan validasi ukuran

---

## 📝 Catatan Penting untuk Implementasi

1. **Semua aset harus offline** — tidak boleh ada CDN, Google Fonts via URL, atau aset eksternal lainnya. Font harus di-download dan disimpan lokal.
2. **Touch-friendly** — semua drag & drop harus bekerja di layar sentuh (gunakan pointer events, bukan hanya mouse events).
3. **Asesmen terintegrasi** — bintang dan skor per level = evaluasi otomatis yang memenuhi kriteria asesmen (10% dari bobot substansi).
4. **Konsep informatika harus tersembunyi** — juri (dan siswa) melihat "masak" bukan "coding". Istilah teknis hanya muncul di recap/penjelasan.
5. **Gunakan pola yang sama dengan MPI** — arsitektur SPA, config-driven, section-based navigation sudah terbukti berhasil.
