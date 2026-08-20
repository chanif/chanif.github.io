# Prompt untuk Antigravity — Starter Pack "Robot Penghindar Rintangan"

Gunakan seluruh isi file ini sebagai satu prompt ke Antigravity. Silakan copy-paste langsung.

---

## KONTEKS

Saya seorang guru Informatika di SMP Negeri 2 Lamongan. Saya sedang menyiapkan modul pembelajaran "Starter Pack" bertopik **Robot Penghindar Rintangan** untuk siswa SMP, dengan konsep dasar **Sensor Ultrasonik** dan **Logika Kondisional (If-Else)**, menggunakan simulator **Tinkercad Circuits**. Durasi total pembelajaran 90 menit.

Tolong buatkan **dua deliverable HTML terpisah** (masing-masing single-file, self-contained, tanpa dependency eksternal selain Google Fonts via CDN):

1. `presentasi.html` — slide presentasi interaktif untuk ditampilkan di kelas (mode proyektor/layar).
2. `lkpd.html` — Lembar Kerja Peserta Didik (LKPD), format yang enak dibaca di layar sekaligus rapi saat di-print/di-export ke PDF.

---

## 1. SPESIFIKASI PRESENTASI (`presentasi.html`)

### Kebutuhan teknis
- Single HTML file (HTML+CSS+JS inline, tidak ada file terpisah).
- Navigasi slide dengan: tombol Next/Prev di layar, keyboard arrow (← →), dan swipe di mobile/tablet.
- Indikator progres (misal "Slide 4 / 21") di pojok.
- Tampilan fullscreen-friendly (16:9), responsif untuk proyektor maupun laptop.
- Transisi antar slide halus (fade/slide), tidak berlebihan.
- Tombol "Fullscreen" opsional.
- Tidak perlu backend/server — cukup dibuka langsung dari file lokal di browser.

### Desain visual
- Palet warna: biru tua `#2F5496` sebagai warna utama, biru medium `#0563C1` sebagai aksen, abu `#595959` untuk teks sekunder, putih untuk kontras.
- Font: judul menggunakan font tegas (misal Poppins/Montserrat), isi menggunakan font mudah dibaca (misal Inter/Open Sans). Load dari Google Fonts.
- Gaya modern, bersih, banyak white space, cocok untuk siswa SMP (tidak terlalu formal/kaku, boleh ada ikon/ilustrasi sederhana berbasis SVG atau emoji tematik robot/sensor).
- Setiap slide punya elemen visual (ikon, diagram sederhana, atau ilustrasi CSS/SVG) yang relevan dengan isinya, bukan sekadar teks.

### Struktur & isi slide (total ±21 slide, mengikuti tahapan berikut)

**Tahap Pembukaan (Slide 1)**
- Slide 1: Judul modul "Robot Penghindar Rintangan", nama mapel (Informatika), pertanyaan pemantik besar di layar: *"Bagaimana robot vacuum cleaner tahu ada tembok di depannya?"* — buat ini jadi hook visual yang menarik perhatian.

**Tahap Pengembangan (Slide 2–20)**
- Slide 2: Judul pembahasan "Sensor Ultrasonik" + pertanyaan diskusi: *"Pernahkah kalian melihat alat yang bisa mengukur jarak tanpa menyentuh objek?"*
- Slide 3–4: Penjelasan prinsip kerja sensor ultrasonik (pemantulan gelombang suara/echo) — gunakan diagram visual sederhana (misal animasi CSS gelombang memantul dari objek ke sensor).
- Slide 5–6: Pengenalan logika kondisional (if-else) — jelaskan dengan flowchart sederhana (bisa dibuat dengan CSS/SVG box-and-arrow) yang menunjukkan alur "jika jarak < 15 cm → belok, jika tidak → lanjut maju".
- Slide 7–8: Pengenalan simulator Tinkercad Circuits — tampilan/screenshot placeholder rangkaian sensor ultrasonik + motor DC, jelaskan komponen yang dipakai.
- Slide 9–10: Instruksi praktik menulis kode agar robot berhenti dan berbelok saat sensor mendeteksi jarak < 15 cm — tampilkan pseudocode/blok logika sebagai referensi visual.
- Slide 11–20: Sesi praktik mandiri siswa menguji dan menyempurnakan simulasi (buat slide-slide ini sebagai checklist/milestone praktik, misalnya "Checkpoint 1: Rangkaian tersambung", "Checkpoint 2: Sensor terbaca", dst., sampai ke presentasi hasil).

**Tahap Penutup (Slide 21)**
- Slide 21: Rangkuman konsep (sensor ultrasonik + logika kondisional) dan kaitannya dengan penerapan dunia nyata (robot vacuum cleaner, kendaraan otonom, sistem parkir otomatis). Tutup dengan refleksi singkat atau ajakan bertanya.

> Catatan: jumlah slide boleh disesuaikan (misalnya digabung/dipecah) selama seluruh poin materi di atas tercakup dan alurnya tetap logis mengikuti tahapan Pembukaan → Pengembangan → Penutup.

---

## 2. SPESIFIKASI LKPD (`lkpd.html`)

### Kebutuhan teknis
- Single HTML file, dioptimalkan untuk dua mode: dibaca di layar (siswa isi langsung jika device mendukung) dan di-print ke PDF/kertas (gunakan CSS `@media print` agar rapi, tanpa elemen UI yang mengganggu saat dicetak).
- Kolom isian menggunakan `<input>`/`<textarea>` yang tetap terlihat rapi baik di layar maupun versi cetak (border jelas, cukup ruang untuk tulisan tangan bila dicetak).
- Tambahkan tombol "Print / Export PDF" yang memanggil `window.print()`.

### Desain visual
- Selaras dengan presentasi: palet warna sama (`#2F5496`, `#0563C1`), tapi versi LKPD lebih minimalis dan hemat tinta (dominan putih/hitam saat print, warna hanya di header/aksen).
- Header LKPD berisi: judul modul, logo/nama sekolah (SMP Negeri 2 Lamongan), kolom Nama Siswa, Kelas, Kelompok, Tanggal.

### Struktur isi LKPD

1. **Identitas** — Nama, Kelas, Kelompok, Tanggal.
2. **Tujuan Pembelajaran** — tampilkan 3 tujuan pembelajaran (ringkas, dari modul):
   1. Menjelaskan prinsip kerja sensor ultrasonik dalam mendeteksi jarak.
   2. Menyusun logika kondisional untuk mengendalikan arah gerak robot.
   3. Mensimulasikan rangkaian robot penghindar rintangan menggunakan Tinkercad Circuits.
3. **Alat & Bahan** — checklist (checkbox): Laptop/PC, Akun Tinkercad, Mouse & Keyboard, Browser (Chrome/Firefox).
4. **Kegiatan 1 — Mengenal Sensor Ultrasonik** (terkait slide 2–4)
   - Pertanyaan pemantik untuk dijawab siswa: "Sebutkan 1 contoh alat di sekitarmu yang menggunakan sensor jarak!" (kolom jawaban singkat)
   - Pertanyaan pemahaman: "Jelaskan dengan kata-katamu sendiri bagaimana sensor ultrasonik mengukur jarak!" (kolom jawaban esai pendek)
5. **Kegiatan 2 — Logika Kondisional** (terkait slide 5–6)
   - Latihan melengkapi pseudocode/flowchart if-else sederhana (sediakan kotak kosong/blank untuk diisi siswa, misal: "JIKA jarak < ___ cm MAKA robot ___").
6. **Kegiatan 3 — Praktik di Tinkercad Circuits** (terkait slide 7–10)
   - Langkah kerja bernomor yang harus diikuti siswa (rangkai sensor ultrasonik + motor DC, tulis program kondisional, uji simulasi).
   - Kolom "Catatan/kendala saat praktik".
7. **Kegiatan 4 — Uji Coba & Penyempurnaan** (terkait slide 11–20)
   - Tabel checklist checkpoint (Rangkaian tersambung / Sensor terbaca dengan benar / Robot berbelok saat mendeteksi rintangan / dst.), dengan kolom centang (✓/belum) dan catatan perbaikan.
8. **Refleksi Penutup** (terkait slide 21)
   - "Sebutkan 1 contoh penerapan sensor & logika kondisional pada teknologi di kehidupan sehari-hari selain robot ini."
   - "Apa bagian tersulit dari kegiatan hari ini, dan bagaimana kamu mengatasinya?"
   - Kolom tanda tangan siswa & guru (opsional).

---

## 3. INSTRUKSI TAMBAHAN UNTUK ANTIGRAVITY

- Buat kedua file secara terpisah dan pastikan keduanya bisa dibuka langsung tanpa server (double-click file HTML).
- Gunakan HTML semantik, aksesibel (kontras warna cukup, ukuran font terbaca jelas untuk siswa SMP).
- Jangan gunakan library eksternal berat (React/Vue/dll) — cukup vanilla HTML/CSS/JS agar ringan dan mudah diedit manual nantinya.
- Beri komentar singkat di dalam kode pada bagian-bagian utama (misal `<!-- SLIDE 3: Prinsip kerja sensor -->`) agar mudah saya edit sendiri setelah file jadi.
- Setelah selesai, tampilkan struktur slide/section apa saja yang sudah dibuat dalam bentuk daftar ringkas.
