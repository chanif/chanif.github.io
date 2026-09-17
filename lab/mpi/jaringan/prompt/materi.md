# Materi & Evaluasi — MPI: Jaringan Komputer, Perjalanan Paket Data

Mapel: Informatika | Kelas VIII / Semester II | Fase D
Topik pokok: Konsep Paket Data, Router, dan Rute Alternatif dalam Jaringan Komputer
Sumber: storyboard "Jaringan Komputer – Perjalanan Paket Data" (5 scene)

Dokumen ini adalah **sumber kebenaran konten** untuk `command.md`. Isi materi, narasi, dan seluruh soal evaluasi di bawah ini WAJIB dipakai apa adanya (boleh disesuaikan gaya bahasa antarmuka, tapi substansi/kunci jawaban tidak boleh diubah).

---

## 1. Tujuan Pembelajaran

Setelah mengikuti pembelajaran melalui MPI ini, peserta didik diharapkan mampu:
1. Menjelaskan konsep dasar jaringan komputer dan fungsinya dalam kehidupan sehari-hari.
2. Mendeskripsikan proses pemecahan data menjadi paket-paket kecil untuk dikirimkan melalui jaringan.
3. Menganalisis peran router sebagai pengarah lalu lintas data dalam jaringan.
4. Mensimulasikan pengambilan keputusan rute alternatif ketika terjadi gangguan pada jaringan.
5. Menyimpulkan keunggulan sistem pengiriman berbasis paket (*packet switching*) dibandingkan pengiriman file utuh.

---

## 2. Alur Cerita & Materi (diadaptasi dari 5 Scene Storyboard)

### Scene 1 — Pembuka & Pemantik Konteks
**Narasi:** "Hai! Pernahkah kamu berpikir... bagaimana sebuah foto bisa sampai ke HP temanmu dalam hitungan detik? Apakah foto itu terbang utuh melalui kabel? Atau ada sesuatu yang lebih ajaib yang terjadi di balik layar? Yuk, kita selidiki bersama!"

**Visual:** dua karakter remaja SMP sedang chat lewat ponsel; karakter A menekan tombol "Kirim" pada sebuah foto; foto melesat masuk ke ikon sinyal/kabel lalu "meledak" menjadi potongan-potongan kecil bercahaya saat memasuki jaringan, kemudian muncul kembali utuh di layar karakter B.

**Teks di layar:**
- Judul: "Jaringan Komputer — Perjalanan Paket Data"
- Pemantik: "Bagaimana foto ini bisa sampai ke HPmu dalam hitungan detik?"
- Tujuan belajar (5 poin di Bagian 1)

### Scene 2 — Materi Inti: Konsep Paket Data & Router
**Narasi:** "Inilah rahasianya! Saat kamu mengirim foto, file itu TIDAK dikirim secara utuh. Ia dipecah menjadi bagian-bagian kecil yang disebut PAKET DATA. Bayangkan setiap paket data seperti sebuah amplop kecil. Di dalamnya ada dua bagian: pertama, 'HEADER' atau kepala paket, yang berisi alamat pengirim, alamat tujuan, dan nomor urut paket; kedua, 'PAYLOAD' atau isi paket, yaitu potongan kecil dari foto asli yang sedang kamu kirim. Berkat nomor urut inilah, walaupun paket-paket ini dikirim lewat jalur yang berbeda-beda dan bisa saja tiba tidak berurutan, komputer penerima tetap bisa menyusunnya kembali persis seperti foto aslinya. Setiap paket dikirim lewat jaringan dan bisa mengambil jalur yang berbeda-beda. Di persimpangan jaringan, ada perangkat bernama ROUTER, yang bertugas seperti polisi lalu lintas — ia mengarahkan setiap paket ke rute tercepat yang tersedia. Luar biasanya, jika satu rute macet atau rusak, paket akan otomatis mencari jalur lain!"

**Diagram (untuk divisualisasikan/dianimasikan):**
`[Komputer Pengirim] → foto dipecah jadi 4 paket bernomor → tiap paket melewati router berbeda → berkumpul & disusun ulang di [Komputer Penerima]`

**Poin konsep utama (teks di layar):**
- **① PAKET DATA** — data yang dikirim dipecah menjadi bagian-bagian kecil, disebut "Paket Data".
- **② ROUTER** — bertugas seperti polisi lalu lintas; mencarikan rute tercepat untuk setiap paket.
- **③ RUTE DINAMIS** — jika satu rute macet/rusak, paket akan otomatis mencari rute alternatif.

### Scene 3 — Simulasi Interaktif: Pilih Jalur Paket Data
**Narasi:** "Sekarang giliranmu! Di hadapanmu ada jaringan dengan tiga jalur. Sayangnya, Jalur B sedang mengalami kerusakan server — ditandai dengan ikon peringatan merah. Tugasmu: klik router pada jalur alternatif yang paling aman dan cepat, lalu tekan tombol 'Kirim Paket' untuk membuktikan bahwa paket datamu berhasil sampai!"

**Setup simulasi:**
- Komputer Pengirim (kiri) — Komputer Penerima (kanan)
- **PATH A** (biru) — normal, aman
- **PATH B** (merah, ikon ⚠️ berkedip) — Server Down / Request Time Out, RUSAK
- **PATH C** (hijau) — normal, aman
- Siswa mengklik router pada PATH A atau PATH C, lalu menekan tombol "📤 Kirim Paket".

### Scene 4 — Umpan Balik & Remediasi Adaptif
- **Jika pilih PATH A/C (benar):** animasi paket melewati jalur dengan mulus, efek konfeti, ikon ✅ besar, foto berhasil utuh di penerima.
  Narasi: "Luar biasa! Router berhasil menemukan rute aman. Semua paket data tiba di tujuan dan berhasil dirakit kembali menjadi foto yang utuh. Itulah kehebatan jaringan komputer!"
- **Jika pilih PATH B, percobaan ke-1 (salah):** paket berhenti tiba-tiba, efek "koneksi terputus".
  Narasi (Hint 1): "Ups! Rute ini terputus — Request Time Out. Perhatikan baik-baik ikon peringatan ⚠️ pada jalur tersebut dan coba pilih jalur lain!" → tombol "Coba Lagi" kembali ke Scene 3.
- **Jika salah lagi, percobaan ke-2:** muncul Hint 2 + tombol remediasi.
  Narasi (Hint 2): "Jangan menyerah! Ingat: paket data selalu mencari jalan lain ketika ada hambatan. Jalur yang aman adalah yang TIDAK memiliki ikon peringatan merah." → tombol "Ulangi Simulasi" (ke Scene 3 dari awal) dan "Kembali ke Materi" (ke Scene 2); tombol "Lanjut" tetap tersedia agar siswa tidak terjebak.

### Scene 5 — Penutup & Refleksi
**Narasi:** "Selamat! Kamu telah menyelesaikan simulasi Perjalanan Paket Data. Mari kita ingat kembali tiga hal penting: Satu — data dipecah menjadi paket kecil agar pengiriman lebih efisien. Dua — router berperan sebagai pengarah lalu lintas yang menentukan jalur terbaik. Tiga — jaringan internet bersifat dinamis dan selalu mencari rute alternatif jika ada gangguan. Kamu keren! Teruslah penasaran dan berani bertanya tentang teknologi di sekitarmu."

**Rangkuman (teks di layar):**
1. Data dipecah → paket-paket kecil
2. Router → menentukan arah paket
3. Jaringan → dinamis, selalu cari rute

**Pertanyaan refleksi (kotak input teks bebas, tanpa penilaian benar/salah):**
"Berdasarkan simulasi tadi, tuliskan di buku catatanmu: Mengapa memecah data menjadi paket-paket kecil lebih menguntungkan daripada mengirimkan satu file utuh sekaligus?"

**Badge penyelesaian:** "🏆 Kamu sudah menjadi Packet Explorer!"

---

## 3. Keunggulan Packet Switching (materi pendukung, untuk memperkaya Materi 3 pada `spesifikasi.md`)

Dibanding mengirim satu file utuh sekaligus, memecah data menjadi paket kecil (*packet switching*) punya beberapa keunggulan:
- **Efisien** — banyak pengguna bisa berbagi jalur jaringan yang sama secara bersamaan, karena paket-paket kecil dari banyak pengirim bisa "menyelip" bergantian di jalur yang sama.
- **Andal (tahan gangguan)** — jika satu jalur rusak, hanya paket yang lewat jalur itu yang perlu dikirim ulang/dialihkan, bukan seluruh file.
- **Cepat sampai** — paket bisa mengambil jalur berbeda-beda secara paralel, lalu disusun ulang di tujuan berdasarkan nomor urut.

---

## 4. Aktivitas "Tarik Jawaban" (Drag & Drop — Mencocokkan Istilah)

Instruksi tampil di layar: *"Tarik istilah di kiri ke definisi yang tepat di kanan!"*

| Istilah (kiri) | Definisi yang cocok (kanan) |
|---|---|
| Paket Data | Bagian kecil hasil pemecahan data asli yang dikirim melalui jaringan |
| Header | Bagian paket berisi alamat pengirim, alamat tujuan, dan nomor urut |
| Payload | Bagian paket berisi potongan data/isi asli yang dikirim |
| Router | Perangkat yang mengarahkan paket data ke rute tercepat/tersedia |
| Rute Dinamis | Kemampuan jaringan mencari jalur baru saat jalur utama terganggu |
| Packet Switching | Metode pengiriman data dengan memecahnya menjadi paket-paket kecil |

---

## 5. Evaluasi / Latihan — Beragam Jenis Soal

Halaman **Latihan** harus berisi kombinasi jenis soal berikut (bukan hanya pilihan ganda), disajikan berurutan sebagai satu rangkaian evaluasi dengan skor gabungan di akhir. Total 5 bagian.

### Bagian A — Pilihan Ganda

**A1.** Apa fungsi utama jaringan komputer?
A. Menyimpan data secara permanen
B. Menghubungkan perangkat agar bisa saling bertukar data
C. Mempercepat proses booting komputer
D. Mengganti fungsi hard disk
**Kunci: B**

**A2.** Saat kamu mengirim foto lewat aplikasi chat, foto tersebut sebenarnya...
A. Dikirim utuh dalam satu waktu
B. Disimpan dulu di server sebelum dibuka penerima
C. Dipecah menjadi paket-paket kecil lalu disusun kembali di penerima
D. Diubah menjadi teks lalu dikembalikan jadi gambar
**Kunci: C**

**A3.** Bagian paket data yang berisi alamat pengirim, alamat tujuan, dan nomor urut disebut...
A. Payload
B. Header
C. Router
D. Bandwidth
**Kunci: B**

**A4.** Peran router dalam jaringan komputer paling tepat digambarkan sebagai...
A. Tempat penyimpanan data sementara
B. Perangkat yang mengarahkan paket data ke rute terbaik
C. Aplikasi pengirim pesan
D. Alat pengukur kecepatan internet
**Kunci: B**

**A5.** Berikut ini yang BUKAN keunggulan sistem *packet switching* dibanding pengiriman file utuh adalah...
A. Lebih efisien karena jalur bisa dipakai bergantian oleh banyak pengguna
B. Lebih tahan gangguan karena hanya paket yang terdampak yang perlu dialihkan
C. Data pasti terkirim lebih cepat walau tanpa router
D. Paket bisa dikirim lewat jalur berbeda secara paralel
**Kunci: C**

### Bagian B — Benar / Salah

**B1.** Data yang dikirim melalui jaringan selalu dikirim dalam bentuk utuh tanpa dipecah. → **Salah**
**B2.** Setiap paket data memiliki nomor urut agar bisa disusun kembali di penerima. → **Benar**
**B3.** Router bertugas mengarahkan paket data ke rute tercepat yang tersedia. → **Benar**
**B4.** Jika satu rute mengalami gangguan, seluruh proses pengiriman data akan berhenti total. → **Salah**
**B5.** Payload adalah bagian paket data yang berisi alamat pengirim dan alamat tujuan. → **Salah** *(itu fungsi header; payload berisi potongan data asli)*
**B6.** Packet switching membuat jaringan lebih tahan terhadap gangguan dibanding mengirim file utuh sekaligus. → **Benar**

### Bagian C — Menjodohkan (Matching)

Instruksi: "Jodohkan istilah di kolom kiri dengan penjelasan yang tepat di kolom kanan."

| Kolom Kiri | Kolom Kanan (acak saat ditampilkan) |
|---|---|
| 1. Paket Data | a. Perangkat pengarah lalu lintas data ke rute tercepat |
| 2. Header | b. Bagian kecil hasil pemecahan data asli |
| 3. Payload | c. Kemampuan jaringan mencari jalur baru saat ada gangguan |
| 4. Router | d. Bagian paket berisi alamat pengirim, tujuan, dan nomor urut |
| 5. Rute Dinamis | e. Potongan isi data asli yang dikirim di dalam paket |

**Kunci: 1-b, 2-d, 3-e, 4-a, 5-c**

### Bagian D — Drag & Drop Mengurutkan (Sequencing)

Instruksi: "Seret kotak-kotak berikut ke urutan proses pengiriman data yang benar, dari awal hingga akhir."

Kotak acak yang harus diurutkan siswa:
1. Foto dipecah menjadi beberapa paket data kecil
2. Setiap paket diberi header berisi alamat pengirim, alamat tujuan, dan nomor urut
3. Paket-paket dikirim melalui jaringan lewat jalur yang bisa berbeda-beda
4. Router mengarahkan setiap paket ke rute tercepat yang tersedia
5. Jika satu rute rusak/macet, paket otomatis mencari rute alternatif
6. Semua paket sampai di penerima dan disusun ulang sesuai nomor urut menjadi foto utuh

**Kunci urutan benar:** 1 → 2 → 3 → 4 → 5 → 6 (sesuai urutan penomoran di atas; tampilkan kotak secara teracak ke siswa)

### Bagian E — Simulasi Praktik (reuse Scene 3 & 4)
Sebagai penutup evaluasi, tampilkan ulang simulasi "Pilih Jalur Paket Data" dari Scene 3 (Bagian 2) sebagai **evaluasi praktik/autentik** — skor benar dihitung jika siswa memilih PATH A atau C pada percobaan pertama.

### Rekap Skor
Total keseluruhan poin = A(5) + B(6) + C(5) + D(1, dihitung benar hanya jika seluruh urutan tepat) + E(1) = **18 poin**. Tampilkan skor akhir dalam bentuk persentase dan berikan apresiasi bertingkat, misalnya:
- 90–100%: "Luar biasa! Kamu benar-benar Packet Explorer sejati! 🏆"
- 60–89%: "Bagus! Beberapa konsep sudah kamu kuasai, coba ulangi bagian yang masih salah."
- <60%: "Yuk, pelajari lagi Materi 2 sebelum mencoba lagi!"

---

## 6. Rangkuman Akhir (untuk halaman Rangkuman)

1. Data dipecah menjadi paket-paket kecil agar pengiriman lebih efisien.
2. Router berperan sebagai pengarah lalu lintas yang menentukan jalur terbaik untuk setiap paket.
3. Jaringan bersifat dinamis — selalu mencari rute alternatif jika ada gangguan pada jalur utama.

**Pertanyaan refleksi (kotak input teks siswa, tanpa penilaian):**
"Berdasarkan simulasi tadi, tuliskan di buku catatanmu: Mengapa memecah data menjadi paket-paket kecil lebih menguntungkan daripada mengirimkan satu file utuh sekaligus?"

**Badge penyelesaian:** "🏆 Kamu sudah menjadi Packet Explorer!"

---

## 7. Kebutuhan Video

Materi ini idealnya dilengkapi **satu video animasi pendek** yang menggabungkan Scene 1 (pembuka/pemantik) dan Scene 2 (animasi paket data dipecah → melewati router → disusun ulang). Prompt generasi video untuk kebutuhan ini ada di file terpisah **`prompt_video.md`** (dibuat khusus untuk digenerate manual lewat Google Flow). Lihat file tersebut untuk detail prompt dan rekomendasi penempatan video di dalam struktur halaman `spesifikasi.md`.
