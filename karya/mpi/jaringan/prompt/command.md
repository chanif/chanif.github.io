# Command — Prompt Utama Pembuatan MPI

## Konteks
Buatkan sebuah **Media Pembelajaran Interaktif (MPI)** dalam bentuk **Single Page Application (SPA)** berbasis HTML/CSS/JavaScript murni (vanilla — tanpa framework/bundler berat), yang bisa berjalan **offline** langsung dari file `index.html`.

Sebelum mulai membuat apa pun, baca dan pahami dokumen-dokumen berikut secara menyeluruh:
1. **`spesifikasi.md`** — acuan desain & struktur: jumlah dan urutan halaman, palet warna, tipografi, komponen UI (title bar, content box, tombol MENU/BERANDA/◀▶/MULAI, kartu menu, kartu materi), gaya latar belakang ruang kelas, serta data kredit (Penanggung Jawab, Penyunting, Pengembang).
2. **`materi.md`** — sumber kebenaran untuk mata pelajaran, jenjang/kelas, topik pokok, tujuan pembelajaran, dan seluruh konten riil yang harus diisikan ke setiap halaman: narasi tiap materi, pasangan istilah untuk aktivitas drag & drop, skenario simulasi pilih jalur, seluruh soal evaluasi (berbagai jenis) beserta kunci jawaban, dan rangkuman.
3. **`prompt_video.md`** — bila file ini ada di proyek, berarti dibutuhkan video pada halaman "(Video)". File ini hanya berisi prompt untuk digenerate manual oleh pengguna (bukan tugas agent) — agent cukup menyiapkan slot video yang sesuai, lihat instruksi Bagian 4.

Jangan mengasumsikan atau menghardcode mapel/kelas/topik apa pun di luar apa yang tertulis di `materi.md` — dokumen ini bersifat umum agar bisa dipakai ulang untuk topik pembelajaran apa saja, cukup dengan mengganti isi `materi.md`.

## Tugas

### 1. Struktur & Navigasi
- Implementasikan seluruh halaman sesuai urutan dan aturan navigasi pada `spesifikasi.md` (halaman "beranda-level" tanpa tombol ◀▶, dan rangkaian linear yang bisa di-*paging* dengan ◀▶).
- Tombol MENU/BERANDA harus selalu mengembalikan pengguna ke halaman Menu Utama.
- Gunakan routing sederhana berbasis state JavaScript (bukan reload halaman), agar tetap SPA.

### 2. Tampilan & Gaya
- Ikuti palet warna, tipografi, dan komponen UI persis seperti dijabarkan di `spesifikasi.md`.
- Pertahankan gaya latar belakang ilustrasi ruang kelas kartun di semua halaman.
- Pastikan responsif minimal untuk rasio 16:9 (proyeksi kelas) dan tetap terbaca di layar laptop/tablet.

### 3. Aset Logo Institusi yang Sudah Tersedia
Beberapa aset logo **sudah disiapkan dan tersedia di proyek** — jangan digenerate ulang, jangan dibuatkan placeholder, dan jangan dimasukkan ke daftar `prompt_media.md` (Bagian 6). Cukup pakai file yang sudah ada di folder `assets/` (sesuaikan path relatif dengan struktur folder proyek yang sebenarnya, mis. `../assets/` bila `index.html` berada di subfolder terpisah dari `assets/`):

- `kemendikdasmen lengkap.png`
- `sobat + bermutu + ramah.png`
- `Logo Tutwuri Kemendikdasmen.png`
- `Logo Sobat SMP 2025.png`
- `Logo Pendidikan Bermutu.png`
- `Logo Ramah.png`

Aturan penempatan (ikuti persis, ini bukan opsional):
- **Halaman Cover/Judul** (dan halaman "beranda-level" sejenis yang memakai header logo institusi sesuai `spesifikasi.md`): tampilkan `kemendikdasmen lengkap.png` di **pojok kiri atas**, dan `sobat + bermutu + ramah.png` di **pojok kanan atas**.
- **Halaman terakhir/Kredit-Penutup**: tampilkan **4 logo berjajar, urut dari kiri ke kanan** persis sebagai berikut:
  1. `Logo Tutwuri Kemendikdasmen.png`
  2. `Logo Sobat SMP 2025.png`
  3. `Logo Pendidikan Bermutu.png`
  4. `Logo Ramah.png`
- Jaga rasio asli tiap logo (jangan di-stretch), beri jarak antar-logo yang seimbang, dan pastikan ukurannya proporsional terhadap lebar kotak/header tempat logo ditampilkan.

### 4. Pengisian Konten
- Isi setiap halaman Materi, Tujuan Pembelajaran, dan Rangkuman dengan teks dari `materi.md` (jangan biarkan placeholder "text"/"Isi" tersisa).
- Halaman **Tarik Jawaban**: implementasikan sebagai aktivitas drag-and-drop nyata menggunakan pasangan istilah–definisi yang tersedia di `materi.md`.
- Halaman **Permainan/Simulasi**: implementasikan skenario interaktif sesuai deskripsi simulasi di `materi.md` (situasi, opsi yang bisa dipilih, dan umpan balik benar/salah — ikuti persis apa yang tertulis di sana, jangan mengarang skenario baru).
- Halaman **Latihan**: implementasikan sebagai rangkaian evaluasi **modern dan bervariasi jenis soalnya** — jangan hanya pilihan ganda. Gunakan seluruh jenis soal yang tersedia di `materi.md` apa adanya (mis. pilihan ganda, benar/salah, menjodohkan/matching, drag-and-drop mengurutkan, simulasi praktik, atau jenis lain jika ada), masing-masing sebagai bagian/section terpisah dalam satu alur evaluasi, dengan interaksi yang benar-benar berfungsi (bukan sekadar radio button untuk semua jenis). Tampilkan skor/rekap gabungan di akhir sesuai skema penilaian yang ada di `materi.md`.
- Halaman **(Video)**: sediakan slot `<video>` yang menunjuk ke path file lokal (mis. `assets/video/materi-video.mp4`) — **jangan generate atau mencari video sendiri**; video akan disiapkan secara manual oleh pengguna berdasarkan file terpisah `prompt_video.md`. Cukup pastikan elemen video, kontrol play, dan fallback (pesan/placeholder bila file belum ada) sudah siap menerima file tersebut.
- Halaman **Pengembang** dan **Penanggung Jawab & Penyunting**: isi dengan data riil dari `spesifikasi.md` bagian data kredit (bukan placeholder "Isi"/"Nama").

### 5. Kebutuhan Teknis
- Satu file `index.html` di root proyek (siap di-ZIP untuk diunggah ke platform Ruang Murid).
- Semua CSS dan JS boleh disatukan ke file terpisah (`style.css`, `script.js`) selama tetap relatif ke `index.html` dan berjalan tanpa server (`file://` atau server statis sederhana).
- Tidak ada dependency eksternal yang memerlukan koneksi internet (semua font/ikon dibundel lokal atau memakai fallback web-safe font bila tidak memungkinkan membundel).
- Kode harus rapi, terkomentar, dan mudah diedit ulang (terutama bagian konten teks, supaya guru lain bisa mengganti topik/soal dengan mudah).

### 6. Pembuatan `prompt_media.md`
Selain kode MPI, buatkan juga sebuah file terpisah bernama **`prompt_media.md`** di root proyek. File ini **bukan bagian dari aplikasi**, melainkan kumpulan prompt siap-pakai untuk digenerate ke tools AI image/asset generator (mis. Nano Banana, Midjourney, DALL-E, dsb.), agar semua gambar/ilustrasi/ikon yang dibutuhkan MPI ini bisa dibuat konsisten satu gaya.

**Jangan masukkan logo institusi dari Bagian 3 ke dalam daftar ini** — logo-logo tersebut sudah tersedia dan tidak perlu digenerate.

Untuk setiap aset visual lain yang disebutkan di `spesifikasi.md` (Bagian "Kebutuhan Aset") dan yang muncul di breakdown halaman, buatkan satu entri berisi:
- **Nama aset** (mis. `bg-ruang-kelas.png`, `icon-router.svg`, `badge-fase-d.png`, `ilustrasi-materi1.png`, dst.)
- **Dipakai di halaman** mana saja
- **Prompt generasi gambar** dalam Bahasa Inggris (karena kebanyakan image generator lebih akurat dengan prompt Inggris), yang secara eksplisit menyebutkan: gaya *flat illustration/cartoon, clean vector style*, palet warna (sebutkan hex dari `spesifikasi.md`: `#00ACC1`, `#4DD0E1`, `#E0F7FA`, `#0288D1`, `#006064`), rasio/ukuran yang disarankan (mis. 1:1 untuk ikon, 16:9 untuk background/ilustrasi materi), dan latar transparan bila aset berupa ikon/elemen lepas (bukan background penuh).
- **Catatan tambahan** bila perlu variasi (mis. satu ikon butuh 2 versi: kondisi normal & kondisi bermasalah/error, jika skenario di `materi.md` membutuhkannya).

Susun aset minimal untuk:
- Latar belakang ruang kelas (dipakai berulang di semua halaman)
- 6 ikon menu (Petunjuk, Tujuan Pembelajaran, Materi, Permainan, Latihan, Rangkuman)
- Ikon/ilustrasi konsep-konsep kunci yang disebutkan di `materi.md` (sesuaikan jumlah & jenisnya dengan istilah dan poin materi yang ada di sana)
- Ilustrasi pembuka/pemantik sesuai konteks yang digambarkan di `materi.md` (mis. karakter, objek, atau situasi yang disebut dalam narasi pembuka)
- Ikon dekoratif Permainan (piala, bintang) dan Latihan (bohlam tanda tanya, kaca pembesar)
- Badge fase/jenjang dan badge penghargaan penyelesaian (nama & bentuknya ikuti apa yang disebut di `materi.md`, bila ada)
- Ikon navigasi (hamburger MENU, rumah BERANDA, chevron ◀▶, play MULAI) — bila tidak dipakai versi teks/emoji langsung di kode
- Placeholder gambar generik (langit-bukit) untuk kartu Materi & Pengembang bila belum ada foto asli

### 7. Verifikasi Akhir
Sebelum menganggap tugas selesai, cek ulang:
- [ ] Semua halaman pada `spesifikasi.md` sudah ada dan urut.
- [ ] Tidak ada placeholder "text"/"Isi"/"Nama" yang tersisa.
- [ ] Navigasi ◀▶, MENU, dan BERANDA berfungsi di semua halaman yang relevan.
- [ ] Logo institusi pada halaman Cover dan halaman Kredit/Penutup sudah terpasang sesuai posisi & urutan di Bagian 3.
- [ ] Aktivitas drag & drop, simulasi pilih jalur, dan seluruh jenis soal evaluasi di halaman Latihan berjalan dan memberi umpan balik yang benar (bukan hanya pilihan ganda).
- [ ] Slot video pada halaman "(Video)" sudah siap menerima file lokal, tanpa agent men-generate video sendiri.
- [ ] File bisa dibuka langsung via `index.html` tanpa error console.
- [ ] File `prompt_media.md` sudah dibuat, mencakup semua aset yang disebutkan di atas (di luar logo institusi), dengan prompt yang konsisten gaya & palet warnanya.
