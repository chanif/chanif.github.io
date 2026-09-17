# Panduan Prompt Video — Google Flow / Veo (Bahasa Indonesia)
## Topik: Berpikir Komputasional — Algoritma di Balik Rumah Cerdas (IoT)

Dokumen ini berisi prompt lengkap dalam **Bahasa Indonesia** untuk membuat video animasi edukasi pembelajaran Berpikir Komputasional dan Rumah Cerdas (Smart Home IoT) untuk **Halaman 7 (Video Pembelajaran)** pada aplikasi MPI.

---

## 💡 Alur Kerja Terbaik: Image-to-Video (Extend Model)
1. **Buat Gambar Referensi Awal (First Frame)** menggunakan prompt Bagian 1 di AI Image Generator (Imagen / Midjourney / DALL-E / Flux) dengan rasio **16:9**.
2. Buka **flow.google** (Google Flow), unggah gambar tersebut sebagai **Start Frame**.
3. Masukkan **Klip 1**. Setelah selesai, gunakan fitur **Extend** untuk menyambungkan **Klip 2, 3, 4, 5, dan 6** secara berurutan.
4. Export video utuh (rasio **16:9**), simpan ke: `assets/video/jaringan.mp4` (atau `assets/video/berpikir_komputasional.mp4`).

---

# 🎨 BAGIAN 1: Prompt Gambar Awal (Referensi Frame Pertama)

> **Gunakan prompt ini untuk membuat gambar acuan utama (Rasio 16:9):**

```text
Ilustrasi edukasi gaya 2.5D modern vektor motion graphic yang rapi, futuristik, dan ceria. Di bagian depan, dua siswa SMP Indonesia (satu siswa laki-laki berseragam putih-biru rapi dan satu siswi perempuan berhijab putih rapi) sedang berdiri di depan maket miniatur rumah cerdas (Smart Home) interaktif di meja lab komputer. Maket rumah dilengkapi lampu LED mini, kipas kecil, dan sensor-sensor kecil bercahaya toska dan oranye (#00ACC1, #FF9800). Di dinding belakang, terdapat diagram alir logika IF-THEN yang terpancar lembut secara holografis. Pencahayaan lab hangat dan ramah, estetika isometrik premium dengan gradien halus, resolusi tinggi 8k, komposisi bersih, rasio layar lebar 16:9.
```

---

# 🎬 BAGIAN 2: Rangkaian Prompt Video (Google Flow Extend Sequence)

---

### 🔹 Klip 1 (00:00 – 00:08) — Senja Tiba & Sensor Cahaya LDR Membaca Lingkungan
> **Fokus Gerakan:** Hari berganti sore menjadi gelap, sensor LDR di atap rumah mendeteksi perubahan intensitas cahaya, data analog mengalir ke mikrokontroler.

```text
Melanjutkan dari gambar referensi awal maket rumah cerdas. Langit di luar jendela perlahan berubah dari sore menjadi senja temaram. Di atap maket rumah, sensor cahaya LDR kecil mulai memancarkan denyut cahaya biru lembut saat menerima penurunan cahaya. Partikel data bercahaya cyan halus mengalir keluar dari sensor LDR, meluncur menelusuri jalur kabel PCB mini menuju mikrokontroler di tengah rumah. Kamera bergerak zoom-in maju perlahan dan halus (push-in) mendekati papan mikrokontroler. Animasi motion graphic 60fps yang bersih dan halus, tanpa dialog suara.
```

---

### 🔹 Klip 2 (00:08 – 00:16) — Mikrokontroler Mengevaluasi Logika IF-THEN
> **Fokus Gerakan:** Mikrokontroler bercahaya, diagram logika mengambang menampilkan evaluasi kondisi: "Cahaya < 200 Lux = BENAR".

```text
Melanjutkan gerakan kamera yang fokus pada chip mikrokontroler (otak rumah cerdas). Di atas chip, muncul animasi visual blok logika transparan holografis yang bertuliskan aturan: 'JIKA Cahaya < 200 Lux -> MAKA Nyalakan Lampu'. Sinar pemindai emas memeriksa nilai sensor (100 Lux), tanda centang hijau menyala terang menandakan kondisi terpenuhi. Chip mikrokontroler seketika memancarkan sinyal perintah listrik cepat menuju modul relay lampu. Kamera bergeser mulus mengikuti laju sinyal listrik di kabel.
```

---

### 🔹 Klip 3 (00:16 – 00:24) — Lampu Pintar Menyala Otomatis & Abstraksi Bekerja
> **Fokus Gerakan:** Lampu teras dan ruang tamu menyala otomatis berpendar hangat, mengilustrasikan abstraksi data esensial.

```text
Melanjutkan aliran sinyal ke lampu. Sinyal listrik tiba di relay, dan seketika lampu plafon teras dan ruang tamu maket menyala terang dengan pendaran cahaya kuning hangat yang lembut dan nyaman. Ruangan maket rumah menjadi terang benderang secara otomatis tanpa ada saklar yang ditekan manusia. Di sampingnya muncul grafik transparan ringkas yang menunjukkan konsep Abstraksi: sistem hanya memproses data gelap/terang dan mengabaikan detail yang tidak perlu. Kamera berputar menyapu keindahan rumah yang menyala.
```

---

### 🔹 Klip 4 (00:24 – 00:32) — Suhu Panas & Sensor PIR Mendeteksi Orang -> Kipas Berputar
> **Fokus Gerakan:** Sensor suhu DHT11 mendeteksi panas (>30°C) dan sensor gerak PIR mendeteksi ada orang duduk -> Kipas angin otomatis berputar.

```text
Kamera berpindah ke ruang keluarga di dalam rumah cerdas. Termometer digital DHT11 menunjukkan angka 32°C (merah panas), sementara sensor gerak PIR mendeteksi kehadiran karakter siswa yang duduk di sofa. Logika ganda IF-AND-THEN menyala: 'Suhu Panas DAN Ada Orang'. Seketika kipas angin langit-langit mini mulai berputar kencang menghasilkan hembusan angin sejuk bergaris angin biru lembut. Sistem membuktikan efisiensi energi karena kipas hanya menyala jika ada orang.
```

---

### 🔹 Klip 5 (00:32 – 00:40) — Simulasi Keamanan: Pintu Dibuka Ilegal -> Alarm Berbunyi
> **Fokus Gerakan:** Pintu terbuka tanpa tap kartu kunci RFID -> Lampu sirine merah berkedip cepat dan memancarkan efek getaran alarm.

```text
Kamera beralih ke pintu depan rumah cerdas. Pintu magnetik tiba-tiba terbuka tanpa adanya pemindaian kartu kunci RFID yang sah. Sensor pintu mendeteksi akses ilegal: aturan keamanan 'JIKA Pintu Terbuka TANPA RFID' terpicu. Sirine merah kecil di atas pintu langsung berkedip cepat memancarkan gelombang cahaya merah peringatan (🚨) dan mengirimkan notifikasi peringatan bahaya ke layar ponsel pintar. Animasi motion graphic yang dinamis dan berenergi.
```

---

### 🔹 Klip 6 (00:40 – 00:48) — Rangkuman 4 Fondasi & Siswa Tersenyum Bangga
> **Fokus Gerakan:** Kamera zoom-out kembali ke lab kelas, 4 ikon pilar BK (Dekomposisi, Abstraksi, Pola, Algoritma) berkumpul, siswa tersenyum puas.

```text
Kamera mundur perlahan (zoom out) menampilkan kembali kedua siswa SMP yang tersenyum gembira dan bertepuk tangan melihat seluruh sistem otomasi maket rumah cerdas bekerja secara sempurna. Di udara di atas maket, 4 lencana ikonik bercahaya emas dan toska melayang: Dekomposisi, Abstraksi, Pengenalan Pola, dan Algoritma. Cahaya lab kelas yang hangat, suasana inspiratif dan futuristik, penutup video animasi edukasi yang memukau dan berdaya guna tinggi.
```

---

# 🌟 OPSI ALTERNATIF: Single Master Prompt (1 Prompt Penuh)

> **Jika ingin men-generate 1 video berdurasi penuh tanpa sistem potongan:**

```text
Animasi motion graphic edukasi 2.5D vektor modern yang cerah, bersih, dan berteknologi tinggi tentang Berpikir Komputasional dalam Rumah Cerdas (Smart Home IoT). Cerita berpusat pada maket rumah pintar yang dipelajari dua siswa SMP Indonesia. Saat senja tiba, sensor cahaya LDR mendeteksi kondisi gelap, mikrokontroler cerdas mengevaluasi aturan logika kondisional 'JIKA Gelap MAKA Nyalakan Lampu', dan lampu ruangan otomatis menyala hangat. Selanjutnya, saat suhu ruangan mencapai 32°C dan sensor gerak PIR mendeteksi orang di ruangan, kipas angin otomatis berputar kencang secara hemat energi. Ketika pintu terbuka tanpa otorisasi kunci RFID, sirine merah berkedip memberikan peringatan bahaya. Keempat pilar Berpikir Komputasional (Dekomposisi, Abstraksi, Pola, Algoritma) bersatu menciptakan harmoni rumah pintar yang efisien. Palet warna toska (#00ACC1), cyan (#4DD0E1), oranye (#FF9800), dan pencahayaan hangat. Gerakan kamera sinematik halus 60fps tanpa teks bertumpuk dan tanpa narasi dialog.
```
