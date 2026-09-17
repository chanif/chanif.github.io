# Spesifikasi Detail Template Media Pembelajaran Interaktif (MPI) — Informatika Fase D

Dokumen ini adalah pembacaan menyeluruh terhadap template PDF "Teknologi Informasi dan Komunikasi — Informatika (Fase D)" yang diunggah. Tujuannya: menjadi rujukan siap-pakai (prompt) ketika meminta AI membuatkan MPI baru (storyboard, desain slide, atau kode HTML/SPA) dengan tampilan dan struktur yang identik/konsisten dengan template ini.

---

## 1. Identitas & Konteks Media

| Aspek | Keterangan |
|---|---|
| Judul media | Teknologi Informasi dan Komunikasi |
| Mata pelajaran | Informatika |
| Jenjang/Fase | SMP — **Fase D** |
| Format | Slide interaktif bergaya *Single Page Application* (SPA)/Genially, dimainkan berurutan seperti buku digital dengan tombol navigasi |
| Rasio kanvas | Widescreen 16:9 (landscape, selaras ukuran umum 1536×804 px atau kelipatannya) |
| Instansi penerbit | Kementerian Pendidikan Dasar dan Menengah — Ditjen PAUD, Dikdas, dan Dikmas — Direktorat SMP |
| Branding pendukung | Logo "Sobat SMP", tagar "#PendidikanBermuktuUntukSemua", "Kemendikdasmen RAMAH" |
| Total halaman/scene | **20 halaman** (19 halaman tampilan + 1 halaman referensi internal palet warna) |
| Total scene tersambung (memiliki tombol navigasi ◀▶) | 12 halaman berurutan (dari "Materi 1" s.d. "Penanggung Jawab & Penyunting") |

---

## 2. Sistem Desain Global (Design System)

### 2.1 Palet Warna — "INFORMATIKA"

| Swatch | Hex | Peran dalam desain |
|---|---|---|
| Teal/Cyan utama | `#00ACC1` | Warna dominan: title bar, tombol bulat navigasi, aksen ikon, badge |
| Cyan medium | `#4DD0E1` | Gradasi sekunder, elemen dekoratif (mis. bintang, aksen tambahan) |
| Cyan sangat muda | `#E0F7FA` | Latar kotak konten (dipakai dengan opacity ~70–85% agar background kelas tetap terlihat samar) |
| Biru | `#0288D1` | Aksen tombol/ikon alternatif, variasi kontras dari teal utama |
| Teal gelap | `#006064` | Outline/kontras elemen gelap, bila diperlukan teks/kotak berwarna solid gelap |

> Catatan: setiap mata pelajaran tampaknya punya set palet sendiri (di halaman referensi tertulis label "INFORMATIKA"); bila dipakai untuk mapel lain, palet menyesuaikan identitas warna mapel tersebut namun struktur 5-swatch (utama, medium, sangat muda, aksen, gelap) tetap dipertahankan.

### 2.2 Tipografi

- **Font judul/heading** (judul besar Cover, judul tombol "Permainan"/"Latihan", title bar tiap halaman): font tebal, bulat, playful — gaya rounded sans-serif (mirip *Baloo 2*, *Fredoka*, atau *Poppins ExtraBold*). Ciri khas: **outline/stroke putih tebal** mengelilingi huruf + **drop shadow** lembut abu-abu di bawahnya, memberi efek "sticker"/timbul.
- **Font isi konten** (teks di dalam content box, label field, dsb.): sans-serif reguler yang lebih netral (mirip *Poppins Regular/Medium* atau *Nunito*), warna hitam/abu gelap, tanpa efek outline.
- **Ukuran relatif**: judul utama Cover paling besar (dominan di tengah layar); title bar tiap halaman ukuran sedang; label tombol menu & field ukuran kecil-menengah, tetap tebal (bold) untuk keterbacaan.

### 2.3 Latar Belakang (Background)

- Ilustrasi kartun **ruang kelas** flat-design, konsisten di seluruh halaman: meja-kursi kayu, jendela dengan tirai, AC di langit-langit, lampu/ventilasi plafon, proyektor, papan tulis/whiteboard kosong, jam dinding bulat, globe dunia, rak buku kecil.
- Palet latar cenderung **pastel hangat** (krem, cokelat kayu, ungu-muda dinding) yang dibuat low-contrast agar tidak bersaing dengan elemen UI di atasnya.
- Pada halaman dengan kotak konten besar, latar kelas tetap terlihat di sela-sela/di belakang kotak transparan — menegaskan nuansa "kelas digital".

### 2.4 Komponen UI Berulang (Component Library)

| Komponen | Bentuk & Gaya | Posisi umum | Dipakai di |
|---|---|---|---|
| **Title bar** | Kapsul (pill shape) solid warna teal `#00ACC1`, teks putih tebal, biasanya "menggantung" tumpang-tindih di tepi atas content box | Tengah-atas / kiri-atas content box | Semua halaman berisi konten (Petunjuk, Tujuan Pembelajaran, Materi X, Tarik Jawaban, Video, Permainan, Latihan, Rangkuman, Referensi, Pengembang, Penanggung Jawab) |
| **Content box** | Persegi panjang rounded besar, latar putih/cyan sangat muda semi-transparan, **border dashed (putus-putus) warna teal**, memenuhi sebagian besar area layar | Tengah layar, di bawah title bar | Hampir semua halaman isi |
| **Tombol MENU** | Lingkaran teal berisi ikon **hamburger** (☰ tiga garis) + kapsul label putih "MENU" tebal | Pojok kiri atas | Semua halaman "dalam" (bukan Cover/Beranda/Kredit) |
| **Tombol BERANDA** | Lingkaran teal berisi ikon **rumah** (🏠) + kapsul label putih "BERANDA" tebal | Pojok kiri atas | Cover, halaman Menu Utama, halaman Kredit/Penutup |
| **Tombol navigasi ◀ / ▶** | Lingkaran teal solid berisi ikon **double chevron** (« kembali / » lanjut) | Pojok kiri-bawah (kembali) & kanan-bawah (lanjut) | Materi 1, Tarik Jawaban, Video, Materi 3, Permainan (intro & konten), Latihan (intro & konten), Rangkuman, Referensi, Pengembang, Penanggung Jawab & Penyunting |
| **Tombol MULAI** | Kapsul putih dengan **ikon play** (▶) biru di lingkaran kiri + teks "MULAI" tebal teal, ada efek shadow bawah (tampak "timbul") | Tengah-bawah | Cover, halaman intro Permainan, halaman intro Latihan |
| **Kartu menu (menu card)** | Kotak rounded dengan border dashed teal, ikon flat besar di atas + label di bawah, berjajar 2×3 | Grid tengah layar | Halaman Menu Utama |
| **Kartu materi** | Kotak rounded dashed berisi gambar placeholder (ilustrasi langit-bukit hijau) + label "Judul Materi X", digantung dengan ikon **penjepit kertas (paper clip)** di atasnya | Berjajar 3 kolom | Halaman daftar Materi |
| **Badge/Sticky note "FASE D"** | Kotak kertas kecil bergaya sticky-note, sedikit dimiringkan (rotasi), dengan bayangan | Kanan tengah/atas | Cover |
| **Placeholder teks** | Kata literal **"text"** (huruf kecil, abu gelap) menandai slot yang harus diisi konten sesungguhnya | Di dalam content box | Semua halaman draf konten |
| **Placeholder gambar** | Ilustrasi flat sederhana "langit biru + awan + bukit hijau" (kotak/persegi) menandai slot gambar/foto/video yang belum diisi | Di dalam content box atau kartu | Materi (list), Materi 1, Materi 3, Pengembang |
| **Placeholder isian form** | Kata **"Isi"** di sebelah label field (mis. Nama/Instansi/Email) | Sebelah kanan label | Halaman Pengembang |
| **Placeholder nama** | Kata **"Nama"** polos menandai slot nama orang | Di dalam content box | Halaman Penanggung Jawab & Penyunting |

---

## 3. Rincian Per Halaman (Scene-by-Scene)

### Halaman 1 — Cover
- Logo Kemendikdasmen (lambang Tut Wuri Handayani + teks "Direktorat Sekolah Menengah Pertama") di **pojok kiri atas**, dalam bingkai kapsul putih.
- Logo gabungan "Sobat SMP", "#PendidikanBermutuUntukSemua", "Kemendikdasmen RAMAH" di **pojok kanan atas**, dalam bingkai kapsul putih.
- Judul utama besar dua baris: **"Teknologi Informasi dan Komunikasi"** — memenuhi tengah layar, gaya font sticker (outline putih + shadow), warna teal.
- Label kapsul kecil di bawah judul: **"Informatika"** (latar teal solid, teks putih).
- Tombol **"▶ MULAI"** di tengah-bawah judul.
- Badge sticky-note **"FASE D"** di sisi kanan, agak dimiringkan, dengan ikon penjepit kertas.
- Latar belakang: ruang kelas kartun penuh (meja-kursi, jendela, AC, papan tulis, globe, proyektor).

### Halaman 2 — Beranda / Menu Utama
- Tombol **"🏠 BERANDA"** di pojok kiri atas.
- Judul kapsul **"Menu"** di tengah-atas.
- **6 kartu menu** tersusun 2 baris × 3 kolom, masing-masing: ikon flat + label teks tebal:
  1. **Petunjuk** — ikon bohlam menyala
  2. **Tujuan Pembelajaran** — ikon target dengan tanda centang
  3. **Materi** — ikon buku terbuka
  4. **Permainan** — ikon dua dadu
  5. **Latihan** — ikon kertas soal + pensil
  6. **Rangkuman** — ikon kertas dengan daftar centang
- Semua kartu memiliki border dashed teal dan latar putih transparan.

### Halaman 3 — Petunjuk
- Tombol MENU (kiri atas).
- Title bar **"Petunjuk"**.
- Satu content box besar berisi placeholder **"text"** — slot untuk instruksi cara menggunakan media (tombol apa untuk apa, alur belajar, dsb.).
- **Tidak ada** tombol navigasi ◀▶ (halaman berdiri sendiri, diakses langsung dari menu).

### Halaman 4 — Tujuan Pembelajaran
- Tombol MENU (kiri atas).
- Title bar **"Tujuan Pembelajaran"**.
- Content box placeholder **"text"** — slot daftar tujuan pembelajaran (biasanya poin bernomor).
- Tidak ada tombol navigasi ◀▶.

### Halaman 5 — Materi (daftar)
- Tombol MENU (kiri atas).
- Title bar **"Materi"**.
- **3 kartu materi** sejajar horizontal, masing-masing digantung dengan ikon penjepit kertas: gambar placeholder (langit-bukit) + label **"Judul Materi 1"**, **"Judul Materi 2"**, **"Judul Materi 3"**.
- Tidak ada tombol navigasi ◀▶ (kartu berfungsi sebagai tombol menuju masing-masing materi).

### Halaman 6 — Materi 1
- Tombol MENU (kiri atas).
- Title bar **"Materi 1"**.
- **Dua content box berdampingan** (kiri & kanan), masing-masing berisi placeholder **"text"** terpisah — pola untuk materi dua-kolom (mis. penjelasan teks di kiri, poin tambahan/istilah di kanan; atau dua sub-topik sejajar).
- Tombol navigasi **◀ (kiri-bawah)** dan **▶ (kanan-bawah)** aktif.

### Halaman 7 — Tarik Jawaban
- Tombol MENU (kiri atas).
- Title bar **"Tarik Jawaban"**.
- Satu content box besar **kosong** (belum ada placeholder teks) — slot untuk aktivitas interaktif **drag-and-drop** (menarik jawaban/label ke tempat yang sesuai; mis. mencocokkan istilah dengan definisi, atau menyusun urutan).
- Tombol navigasi ◀▶ aktif.

### Halaman 8 — (Video)
- Tombol MENU (kiri atas).
- Title bar **"(Video)"** — tanda kurung menunjukkan ini adalah *placeholder label*, bisa diganti judul video sesungguhnya.
- **Kiri**: placeholder video player lengkap dengan elemen UI: tombol play, progress bar/scrubber, penanda waktu (mis. "1:02 / 3:50"), ikon volume, ikon pengaturan (gear), ikon fullscreen — semua bergaya video player standar (mirip YouTube).
- **Kanan**: content box kecil berisi placeholder **"text"** — slot untuk keterangan/transkrip/poin penting video.
- Tombol navigasi ◀▶ aktif.

### Halaman 9 — Materi 3
- Tombol MENU (kiri atas).
- Title bar **"Materi 3"**.
- **Kiri**: gambar placeholder (langit-bukit) berbentuk persegi.
- **Kanan**: placeholder **"text"** — pola materi bergambar (gambar + penjelasan).
- Tombol navigasi ◀▶ aktif.

### Halaman 10 — Permainan (halaman pembuka/intro)
- Tombol MENU (kiri atas).
- Judul besar **"Permainan"** bergaya sticker di tengah, dihiasi ikon **piala emas** (kiri atas judul) dan kumpulan **bintang emas** (kanan atas judul) sebagai elemen dekoratif kemenangan/reward.
- Tombol **"▶ MULAI"** di bawah judul.
- Tombol navigasi ◀▶ tetap aktif di pojok bawah.

### Halaman 11 — Permainan (konten)
- Tombol MENU (kiri atas).
- Title bar **"Permainan"**.
- Content box placeholder **"text"** — slot untuk instruksi detail permainan/skor/leaderboard.
- Tombol navigasi ◀▶ aktif.

### Halaman 12 — Latihan (halaman pembuka/intro)
- Tombol MENU (kiri atas).
- Judul besar **"Latihan"** bergaya sticker, dihiasi ikon **bohlam bertanda tanya** (kiri atas, melambangkan berpikir/soal) dan ikon **kertas + kaca pembesar** (kanan, melambangkan pemeriksaan/analisis soal).
- Tombol **"▶ MULAI"** di bawah judul.
- Tombol navigasi ◀▶ aktif.

### Halaman 13 — Latihan (konten)
- Tombol MENU (kiri atas).
- Title bar **"Latihan"**.
- Content box placeholder **"text"** — slot soal-soal latihan/kuis (bisa diisi dengan komponen kuis pilihan ganda, dsb.).
- Tombol navigasi ◀▶ aktif.

### Halaman 14 — Rangkuman
- Tombol MENU (kiri atas).
- Title bar **"Rangkuman"**.
- Content box placeholder **"text"** — slot ringkasan poin-poin penting materi.
- Tombol navigasi ◀▶ aktif.

### Halaman 15 — Referensi
- Tombol MENU (kiri atas).
- Title bar **"Referensi"**.
- Content box placeholder **"text"** — slot daftar pustaka/sumber rujukan.
- Tombol navigasi ◀▶ aktif (tidak terlihat tombol ▶ di render tapi pola tetap konsisten dengan halaman lain).

### Halaman 16 — Pengembang
- Tombol MENU (kiri atas).
- Title bar **"Pengembang"**.
- **Kiri**: foto/placeholder gambar profil (persegi, gaya sama dengan placeholder lain).
- **Kanan**: tiga field berlabel kapsul teal solid — **"Nama :"**, **"Instansi :"**, **"Email :"** — masing-masing dengan kotak isian putih bertuliskan placeholder **"Isi"**.
- Di bawah field: ikon **Instagram** (gradasi warna asli logo IG) + teks **"@nama"** sebagai placeholder handle sosial media.
- Tombol navigasi ◀▶ aktif.
- Konten aktual untuk mengisi field ini ada di **Bagian 6.4 (Penulis Naskah dan Pengembang MPI)**.

### Halaman 17 — Penanggung Jawab & Penyunting
- Tombol MENU (kiri atas).
- **Dua title bar terpisah** berjajar: **"Penanggung Jawab"** (kiri) dan **"Penyunting"** (kanan).
- Masing-masing punya content box sendiri berisi placeholder **"Nama"**.
- Tombol navigasi ◀▶ aktif.
- Konten aktual untuk mengisi daftar nama ini ada di **Bagian 6.2 dan 6.3 (Penanggung Jawab dan Penyunting)**.

### Halaman 18 — Kutipan/Motto
- Tombol MENU (kiri atas).
- Elemen dekoratif **penjepit kertas besar** menggantung di tengah-atas, seolah menjepit kartu kutipan.
- Kartu kutipan besar berisi teks tebal huruf kapital: *"BERKARYA UNTUK NEGERI MELALUI DIGITALISASI PEMBELAJARAN INOVATIF BERDAMPAK"*.
- Tidak ada tombol navigasi ◀▶.

### Halaman 19 — Kredit/Penutup
- Tombol **"🏠 BERANDA"** di pojok kiri atas.
- Kotak besar berisi **4 logo** berjajar: Kemendikdasmen (dengan lambang Tut Wuri Handayani), Sobat SMP, #PendidikanBermutuUntukSemua, Kemendikdasmen RAMAH.
- Di bawah logo, teks resmi tiga baris (huruf kapital tebal, hitam):
  1. "KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH"
  2. "DIREKTORAT JENDERAL PENDIDIKAN ANAK USIA DINI, PENDIDIKAN DASAR, DAN PENDIDIKAN NONFORMAL DAN INFORMAL"
  3. "DIREKTORAT SEKOLAH MENENGAH PERTAMA"
- Tidak ada tombol navigasi ◀▶ (halaman penutup/akhir alur).

### Halaman 20 — Referensi Palet Warna (internal, bukan tampilan MPI)
- Bukan bagian dari alur tampilan siswa — ini adalah **panduan desain** untuk pengembang.
- Judul **"INFORMATIKA"** di kiri atas, dalam kotak berbingkai hitam tebal.
- 5 kotak swatch warna berjajar dengan kode hex di bawah masing-masing (lihat tabel palet warna di Bagian 2.1).

---

## 4. Alur Navigasi (Flow) yang Teramati

- **Beranda-level pages** (tanpa arrow ◀▶, akses via tombol menu/kartu): Cover → Menu Utama → {Petunjuk, Tujuan Pembelajaran, Materi(daftar)} → Kredit/Penutup.
- **Rangkaian linear ber-arrow** (bisa di-*paging* berurutan dengan ◀▶): Materi 1 → Tarik Jawaban → (Video) → Materi 3 → Permainan(intro) → Permainan(konten) → Latihan(intro) → Latihan(konten) → Rangkuman → Referensi → Pengembang → Penanggung Jawab & Penyunting.
- Halaman **Kutipan/Motto** tampil tanpa arrow, kemungkinan disisipkan sebagai selingan/penutup dari rangkaian di atas atau diakses terpisah.
- *Catatan*: pola ini disimpulkan dari kehadiran/ketidakhadiran tombol arrow pada tiap halaman; sebaiknya dikonfirmasi ulang saat implementasi teknis (mis. saat membuat kode SPA sesungguhnya).

---

## 5. Kebutuhan Aset (Asset Requirements)

| Jenis aset | Kebutuhan |
|---|---|
| Ilustrasi latar kelas | 1 set ilustrasi flat ruang kelas (bisa 1 gambar statis dipakai berulang di semua halaman) |
| Ikon menu (6 buah) | Bohlam, target-centang, buku, dadu, kertas-pensil, kertas-centang — gaya flat, warna selaras palet teal/biru |
| Ikon dekoratif | Piala, bintang (Permainan); bohlam tanda tanya, kaca pembesar+kertas (Latihan); penjepit kertas (Materi list, Kutipan) |
| Placeholder gambar | Ilustrasi generik "langit-bukit" untuk slot Materi/Pengembang yang belum diisi gambar asli |
| Placeholder video | Video pendek (durasi bebas) + thumbnail, untuk slot halaman "(Video)" |
| Logo institusi | Logo Kemendikdasmen, Sobat SMP, Pendidikan Bermutu, Kemendikdasmen RAMAH (resolusi tinggi, format PNG transparan) |
| Font | Font rounded-bold untuk judul (mis. Baloo 2/Fredoka/Poppins ExtraBold) + font reguler untuk isi (mis. Poppins/Nunito) |

---

## 6. Data Aktual — Halaman Pengembang, Penanggung Jawab & Penyunting

Berikut isi resmi yang dipakai untuk mengisi placeholder pada **Halaman 16 (Pengembang)** dan **Halaman 17 (Penanggung Jawab & Penyunting)**.

### 6.1 Instansi Penerbit
- Kementerian Pendidikan Dasar Dan Menengah
- Direktorat Jenderal Pendidikan Anak Usia Dini, Pendidikan Dasar, Dan Pendidikan Nonformal Dan Informal
- Direktorat SMP

### 6.2 Penanggung Jawab
1. Dr. Maulani Mega Hapsari, S.IP, M.A. — *Direktur SMP*
2. Roelly Herdyanto, S.E., M.Si. — *Kasubag Tata Usaha Direktorat SMP*
3. Cepy Lukman Rusdiana, S.Kom., M.Si — *Kasubdit Fasilitasi Sarana dan Prasarana Tatakelola Direktorat SMP*
4. Hendro Sucipto, S.Kom — *Pejabat Pembuat Komitmen Direktorat SMP*

### 6.3 Penyunting
1. Dra. Nikensari, M.Ed — *Direktorat SMP*
2. Dr. Noris Rahmatullah, S.T., M.T — *Direktorat SMP*
3. Johan Winarni, S.P., M.Pd — *Direktorat SMP*
4. Rindhy Anthika Nadya, S.Kom — *Direktorat SMP*
5. Kunto Imbar Nursetyo, M.Pd. — *Universitas Negeri Jakarta*
6. Syifa Aulia Usman — *Universitas Negeri Jakarta*
7. Fadia Meyra Mukti — *Universitas Negeri Jakarta*

### 6.4 Penulis Naskah dan Pengembang MPI
1. **Ach. Chanifuddin Fanani** — Guru Informatika & KKA, SMP Negeri 2 Lamongan — fanani.my.id
2. **Akhmad Ilyas Yudansyah** — Tenaga Kependidikan, SMP Negeri 2 Lamongan

> Catatan pemakaian: karena daftar Penanggung Jawab (4 nama) dan Penyunting (7 nama) cukup panjang, halaman 17 pada template asli (yang hanya menyediakan satu slot "Nama" per kolom) kemungkinan perlu disesuaikan tampilannya — misalnya kotak konten dibuat scrollable atau daftar bernomor bertingkat — agar semua nama & jabatan di atas tertampung tanpa terpotong.

---

## 7. Cara Memakai Spesifikasi Ini sebagai Prompt AI

Saat memberi instruksi ke AI untuk membuat MPI baru berdasarkan template ini, sertakan:
1. **Struktur halaman** — salin urutan & jumlah halaman dari Bagian 3, sesuaikan judul Materi 1/2/3, topik Permainan/Latihan dengan konten baru.
2. **Palet warna** — pakai kode hex pada Bagian 2.1, atau minta AI membuat palet 5-swatch baru bila mapel/topik berbeda, dengan peran warna yang sama (utama/medium/sangat muda/aksen/gelap).
3. **Komponen UI** — jelaskan komponen dari Bagian 2.4 (title bar kapsul, content box dashed, tombol MENU/BERANDA, tombol ◀▶, tombol MULAI, kartu menu, kartu materi, badge) agar AI mereplikasi bentuk & posisi yang sama.
4. **Tipografi** — minta font judul bergaya rounded-bold dengan outline putih + shadow, dan font isi sans-serif reguler.
5. **Latar belakang** — tegaskan gaya ilustrasi ruang kelas kartun sebagai identitas visual konsisten.
6. **Placeholder & alur** — jelaskan halaman mana yang perlu arrow navigasi (rangkaian linear) dan mana yang berdiri sendiri (akses via menu), sesuai Bagian 4.
