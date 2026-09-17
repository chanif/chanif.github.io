# Praktik Lintas Bidang (PLB)

## Deskripsi
Modul yang mengintegrasikan berbagai elemen informatika ke dalam proyek-proyek kreasi digital nyata. Siswa belajar membuat produk digital: website, aplikasi mobile, dan proyek pameran, menerapkan semua pengetahuan yang telah dipelajari.

## Capaian Pembelajaran (CP)
- Membuat halaman web menggunakan HTML
- Mendesain tampilan web menggunakan CSS
- Menerapkan prinsip UI/UX dalam desain digital
- Membuat aplikasi mobile sederhana menggunakan MIT App Inventor
- Melaksanakan proyek pameran digital yang integratif

---

## Daftar Sub-Materi

### 01. Membuat Website dengan HTML
- **Tujuan Pembelajaran**: Siswa mampu membuat halaman web sederhana menggunakan HTML5.
- **Materi Pokok**:
  - Apa itu HTML? Bahasa markup untuk membuat halaman web
  - Struktur dasar HTML:
    ```html
    <!DOCTYPE html>
    <html>
      <head><title>Judul</title></head>
      <body>Konten</body>
    </html>
    ```
  - Elemen dan tag HTML:
    - Heading: h1-h6
    - Paragraf: p
    - Format teks: strong, em, u, br, hr
    - List: ul, ol, li
    - Link: a href
    - Gambar: img src
    - Tabel: table, tr, th, td
    - Form: form, input, textarea, button, select
  - Semantic HTML5:
    - header, nav, main, section, article, aside, footer
  - Atribut: id, class, src, href, alt, title
  - Komentar HTML: <!-- komentar -->
  - Tools: Notepad++, VS Code, atau editor online (CodePen, JSFiddle)
  - Validasi HTML: W3C Validator
- **Aktivitas**:
  - [ ] Plugged: Tutorial guided — buat halaman "Profil Diri" dengan heading, paragraf, gambar, dan link
  - [ ] Plugged: Buat halaman "Resep Masakan" dengan list bahan, langkah-langkah, dan tabel nutrisi
  - [ ] Plugged: Buat form pendaftaran event sekolah (nama, kelas, email, pilihan event)
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi tag HTML dan fungsinya (15 soal)
  - [ ] Praktik: Buat website 3 halaman (beranda, tentang, kontak) yang saling terhubung
- **Referensi & Link**:
  - Halaman interaktif: `01-membuat-website-html/index.html` (sudah ada)

### 02. Styling dengan CSS
- **Tujuan Pembelajaran**: Siswa mampu mendesain tampilan halaman web menggunakan CSS.
- **Materi Pokok**:
  - Apa itu CSS? Mengatur tampilan (style) halaman web
  - 3 cara menambahkan CSS:
    - Inline: `<p style="color:red">`
    - Internal: `<style>` di head
    - External: file `.css` terpisah (direkomendasikan)
  - Selector: tag, class (.), id (#), universal (*), descendant, child
  - Property umum:
    - Teks: color, font-size, font-family, font-weight, text-align, line-height
    - Background: background-color, background-image
    - Box model: margin, padding, border, width, height
    - Display: block, inline, inline-block, flex, grid
    - Position: static, relative, absolute, fixed, sticky
  - Flexbox layout:
    - display: flex
    - justify-content, align-items
    - flex-direction, flex-wrap
  - CSS Grid (dasar):
    - display: grid
    - grid-template-columns, grid-template-rows
    - gap
  - Responsive design:
    - Media queries: @media (max-width: 768px)
    - Mobile-first approach
    - Viewport meta tag
  - Animasi CSS:
    - transition: property, duration, easing
    - @keyframes dan animation
    - hover effects
  - CSS Variables (custom properties): --primary-color
  - Google Fonts: cara menggunakan font kustom
- **Aktivitas**:
  - [ ] Plugged: Style halaman "Profil Diri" — tambahkan warna, font, layout, dan animasi
  - [ ] Plugged: Buat card komponen (nama, foto, deskripsi) menggunakan Flexbox
  - [ ] Plugged: Buat layout responsive — tampilan berbeda di mobile dan desktop
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi property CSS dan nilainya (12 soal)
  - [ ] Praktik: Diberikan desain mockup, buatlah CSS-nya
  - [ ] Challenge: Buat animasi loading spinner hanya dengan CSS
- **Referensi & Link**:
  - Halaman interaktif: `02-styling-dengan-css/index.html` (sudah ada)

### 03. UI/UX Dasar
- **Tujuan Pembelajaran**: Siswa memahami prinsip desain antarmuka (UI) dan pengalaman pengguna (UX).
- **Materi Pokok**:
  - Perbedaan UI dan UX:
    - UI (User Interface): tampilan visual
    - UX (User Experience): keseluruhan pengalaman pengguna
  - Prinsip desain UI:
    - Hierarki visual: yang penting harus menonjol
    - Konsistensi: elemen serupa terlihat dan berfungsi sama
    - White space / negative space
    - Contrast: memudahkan pembacaan
    - Typography hierarchy: judul > subtitle > body
  - Prinsip UX:
    - User-centered design: desain untuk pengguna, bukan untuk diri sendiri
    - Usability: mudah digunakan
    - Accessibility: bisa diakses semua orang (termasuk disabilitas)
    - Feedback: sistem memberi respons atas tindakan pengguna
  - Proses desain UX:
    1. Research: siapa penggunanya?
    2. Wireframe: sketsa kasar layout
    3. Prototype: desain interaktif (klikable)
    4. Testing: uji coba dengan pengguna nyata
    5. Iteration: perbaiki berdasarkan feedback
  - Tools: Figma (gratis), Canva, kertas dan pensil
  - Color theory dalam UI: kontras, harmoni, accessibility (WCAG)
  - Mobile-first design: desain untuk layar kecil dulu
- **Aktivitas**:
  - [ ] Plugged: "UI Review" — evaluasi 3 website/app berdasarkan prinsip UI/UX
  - [ ] Unplugged: Buat wireframe di kertas untuk aplikasi "To-Do List"
  - [ ] Plugged: Buat prototype di Figma — desain ulang satu halaman website sekolah
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi pelanggaran prinsip UI/UX dalam screenshot (10 soal)
  - [ ] Proyek: Desain UI untuk aplikasi sederhana (wireframe + high-fidelity mockup)
- **Referensi & Link**:
  - Halaman interaktif: `03-ui-ux-dasar/index.html` (sudah ada)

### 04. App Inventor — Membuat Aplikasi Android
- **Tujuan Pembelajaran**: Siswa mampu membuat aplikasi Android sederhana menggunakan MIT App Inventor.
- **Materi Pokok**:
  - Pengenalan MIT App Inventor (appinventor.mit.edu):
    - Designer view: layout dan komponen UI
    - Blocks view: logika pemrograman visual
  - Komponen UI:
    - Button, Label, TextBox, Image
    - Layout: HorizontalArrangement, VerticalArrangement
    - ListPicker, Spinner
    - Notifier (dialog/toast)
  - Event handlers: when Button.Click, when Screen.Initialize
  - Logika:
    - Variabel (global dan local)
    - If-else blocks
    - Loop blocks
    - Math blocks
    - Text blocks
  - Komponen multimedia:
    - Camera, ImagePicker
    - Sound, Player
    - TextToSpeech, SpeechRecognizer
  - Penyimpanan:
    - TinyDB (local storage)
    - File component
  - Sensor:
    - AccelerometerSensor (gerak)
    - LocationSensor (GPS)
    - OrientationSensor
  - Proyek step-by-step:
    1. Aplikasi kalkulator sederhana
    2. Aplikasi konversi satuan
    3. Aplikasi kuis interaktif
    4. Aplikasi to-do list dengan TinyDB
- **Aktivitas**:
  - [ ] Plugged: Tutorial guided — buat aplikasi "Hello World" (button + label)
  - [ ] Plugged: Buat aplikasi kalkulator (input 2 angka, 4 operasi)
  - [ ] Plugged: Buat aplikasi kuis 5 soal dengan scoring
  - [ ] Plugged: Buat aplikasi catatan harian dengan penyimpanan lokal
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi komponen dan blok App Inventor (10 soal)
  - [ ] Proyek: Buat aplikasi Android untuk memecahkan masalah nyata di sekolah
- **Referensi & Link**:
  - Halaman interaktif: `04-app-inventor/index.html` (sudah ada)
  - Link: appinventor.mit.edu

### 05. Proyek Pameran Digital
- **Tujuan Pembelajaran**: Siswa melaksanakan proyek integratif yang menggabungkan semua keterampilan dan mempresentasikannya.
- **Materi Pokok**:
  - Konsep pameran digital:
    - Portfolio online
    - Exhibition booth (virtual/fisik)
    - Demo day
  - Panduan proyek:
    1. Pilih tema (bebas, relevan dengan kehidupan)
    2. Rancang solusi digital (website, app, atau presentasi interaktif)
    3. Terapkan semua keterampilan (HTML/CSS, desain, algoritma, data)
    4. Buat dokumentasi proyek
    5. Presentasikan di depan kelas/sekolah
  - Contoh proyek:
    - Website informasi tentang isu sosial (lingkungan, kesehatan, pendidikan)
    - Aplikasi utilitas (kalkulator, konverter, scheduler)
    - Game edukasi interaktif
    - Data visualization dashboard tentang topik menarik
    - Digital storytelling (cerita interaktif)
  - Rubrik penilaian:
    - Kreativitas dan orisinalitas (25%)
    - Penguasaan teknis (25%)
    - Desain dan UI/UX (20%)
    - Presentasi dan komunikasi (15%)
    - Dokumentasi (15%)
  - Tips presentasi proyek digital
- **Aktivitas**:
  - [ ] Proyek besar (4-6 minggu): pilih dan eksekusi proyek digital
  - [ ] Milestone: proposal → wireframe/desain → development → testing → presentasi
  - [ ] Peer review dan feedback
  - [ ] Pameran kelas: setiap siswa/kelompok punya "booth" untuk mendemonstrasikan produknya
- **Evaluasi / Quiz**:
  - [ ] Penilaian proyek berdasarkan rubrik
  - [ ] Peer assessment dan visitor feedback
  - [ ] Refleksi akhir: "Apa yang paling berharga dari proyek ini?"
- **Referensi & Link**:
  - Halaman interaktif: `05-proyek-pameran-digital/index.html` (sudah ada)
