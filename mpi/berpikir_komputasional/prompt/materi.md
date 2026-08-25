# Materi & Evaluasi — MPI: Berpikir Komputasional (Computational Thinking)
## Studi Kasus & Kontekstual: Algoritma di Balik Rumah Cerdas (Smart Home IoT)

**Mata Pelajaran:** Informatika  
**Fase / Kelas:** Fase D / Kelas IX (Semester I)  
**Elemen CP:** Berpikir Komputasional (BK)  
**Penyusun:** Ach. Chanifuddin Fanani, S.Pd. & Muhammad Ilyas Sayyid, S.Kom. (SMP Negeri 2 Lamongan)  
**Penerbit / Pembina:** Direktorat Sekolah Menengah Pertama — Kementerian Pendidikan Dasar dan Menengah  

---

## 1. Capaian & Tujuan Pembelajaran (Kurikulum Merdeka Fase D)

### Capaian Pembelajaran (CP) Elemen Berpikir Komputasional — Fase D:
> *"Pada akhir Fase D, peserta didik mampu **menerapkan berpikir komputasional** untuk menghasilkan beberapa solusi dalam menyelesaikan persoalan dengan data diskrit bervolume kecil serta **mendisposisikan** berpikir komputasional dalam bidang lain, terutama dalam literasi, numerasi, dan literasi sains (computationally literate)."*  
> *(Kepmendikbudristek No. 008/H/KR/2022 — SK BSKAP)*

### Catatan Pedagogis:
Konteks **Rumah Cerdas (Smart Home IoT)** digunakan sebagai **sarana konteks / studi kasus aplikatif nyata**, bukan tujuan akhir. Tujuannya adalah mempermudah siswa memahami dan memvisualisasikan bagaimana 4 fondasi berpikir komputasional dan logika kondisional bekerja secara nyata dalam teknologi modern.

### Tujuan Pembelajaran (TP):
Setelah mengikuti pembelajaran melalui media interaktif ini, peserta didik diharapkan mampu:
1. **Menjelaskan 4 Fondasi Berpikir Komputasional:** Mengidentifikasi dan memahami konsep *Dekomposisi, Abstraksi, Pengenalan Pola (Pattern Recognition),* dan *Algoritma* sebagai metode pemecahan masalah (*problem solving*) yang sistematis.
2. **Menerapkan Dekomposisi:** Memecah persoalan atau sistem yang rumit menjadi bagian-bagian atau subsistem yang lebih kecil, terstruktur, dan mudah dikelola (Input $\rightarrow$ Proses $\rightarrow$ Output).
3. **Menerapkan Abstraksi:** Menyaring dan berfokus hanya pada informasi/data esensial yang relevan dengan tujuan, serta mengabaikan detail-detail yang tidak diperlukan.
4. **Menerapkan Pengenalan Pola:** Mengidentifikasi kesamaan karakteristik, keteraturan tren, atau siklus berulang pada data/lingkungan untuk merumuskan solusi efisien yang dapat digunakan kembali.
5. **Merancang Algoritma & Logika Kondisional:** Menyusun urutan langkah instruksi logis dan aturan pengambilan keputusan (*IF-THEN, IF-AND-THEN, IF-ELSE*) dalam format instruksi terstruktur (*pseudocode* sederhana) untuk menyelesaikan persoalan otomasi.

---

## 2. Alur Cerita & Materi Pembelajaran

---

### Scene 1 — Pengantar: Cerita Pembuka yang Dekat dengan Siswa

**Narasi / Dialog Karakter:**
> *"Halo, Sahabat Informatika! 👋*
>
> *Pernahkah kamu terburu-buru berangkat ke sekolah di pagi hari, lalu sesampainya di kelas kamu tiba-tiba teringat: 'Aduh! Lampu kamarku sudah dimatikan belum ya? Kipas anginku masih menyala tidak ya?'*
>
> *Sekarang bayangkan jika kamarmu punya 'otak kecil' sendiri. Ketika kamu pergi dan hari sudah siang, lampu otomatis mati. Saat kamu pulang di sore hari yang gerah, kipas angin menyala otomatis menyambutmu.*
>
> *Apakah rumah itu punya sihir? Tentu tidak! Rumah seperti itu disebut **Rumah Cerdas (Smart Home)**. Di baliknya, ada **cara berpikir manusia** yang diterjemahkan menjadi bahasa komputasi. Cara berpikir itu disebut **Berpikir Komputasional (Computational Thinking)**.*
>
> *Berpikir Komputasional bukan tentang berpikir seperti robot, melainkan melatih otak kita agar mampu memecahkan masalah yang rumit dengan cara yang rapi, terstruktur, dan cerdas. Yuk, kita pelajari 4 fondasi rahasianya! 🚀"*

**Poin Pemantik di Layar:**
- Apa itu Berpikir Komputasional? *(Melatih otak memecahkan masalah secara cerdas dan terstruktur)*.
- Mengapa kita butuh 4 Fondasi BK dalam kehidupan sehari-hari dan teknologi?
- Bagaimana 4 Fondasi BK menggerakkan sistem Rumah Cerdas?

---

### Scene 2 — Materi Inti: 4 Fondasi Berpikir Komputasional (4 Tab Interaktif)

---

#### 🧩 TAB 1: DEKOMPOSISI (Decomposition) — *Memecah Masalah Besar Menjadi Kecil*

* **Konsep Dasar:**  
  Kemampuan memecah suatu masalah, tugas, atau sistem yang besar dan kompleks menjadi bagian-bagian yang lebih kecil, sederhana, dan terfokus agar mudah diselesaikan satu per satu.

* **Analogi Kehidupan Sehari-hari:**  
  * **Merapikan Kamar Tidur 🛏️:** Kamu tidak mungkin merapikan seluruh kamar dalam satu detik sekaligus. Kamu memecahnya jadi langkah-langkah kecil: ① Rapikan tempat tidur $\rightarrow$ ② Kumpulkan baju kotor ke keranjang $\rightarrow$ ③ Tata buku di meja belajar $\rightarrow$ ④ Buang sampah $\rightarrow$ ⑤ Sapu lantai.
  * **Tugas Kelompok Mading 🎨:** Tugas membuat majalah dinding dibagi: siapa yang mencari artikel, siapa yang menggambar ilustrasi, dan siapa yang menata tata letak.

* **Penerapan pada Sistem Rumah Cerdas (Studi Kasus IoT):**  
  Sistem rumah cerdas yang tampak canggih sebenarnya didekomposisi menjadi **3 bagian sederhana**:
  1. **🛰️ SENSOR (Input / Indera):** Alat pencari tahu yang membaca kondisi lingkungan.
     * *Sensor Cahaya (LDR):* Mengukur tingkat terang/gelap (satuan Lux).
     * *Sensor Suhu (DHT11):* Mengukur derajat panas/dingin udara (°C).
     * *Sensor Gerak (PIR):* Mendeteksi pancaran panas tubuh manusia saat bergerak.
  2. **🧠 MIKROKONTROLER (Proses / Otak):** Komputer mini (seperti *Arduino* atau *ESP32*) yang menerima data sensor, mengevaluasi aturan logika program, lalu memutuskan tindakan.
  3. **💡 AKTUATOR (Output / Pelaksana Tindakan):** Perangkat fisik yang melakukan aksi nyata.
     * *Lampu LED:* Menyala menerangi ruangan.
     * *Kipas Angin (Motor DC):* Berputar menyejukkan ruangan.
     * *Sirine Buzzer:* Berbunyi memberi peringatan bahaya.

> 💡 **Intisari Dekomposisi:** Masalah serumit apa pun menjadi mudah dikelola jika dipecah menjadi: **Sensor (Input)** $\rightarrow$ **Mikrokontroler (Proses)** $\rightarrow$ **Aktuator (Output)**!

---

#### 🔍 TAB 2: ABSTRAKSI (Abstraction) — *Fokus Pada yang Penting, Abaikan yang Tidak Perlu*

* **Konsep Dasar:**  
  Kemampuan menyaring informasi dengan hanya memusatkan perhatian pada data esensial yang dibutuhkan untuk menyelesaikan masalah, dan dengan sengaja mengabaikan detail-detail yang tidak relevan.

* **Analogi Kehidupan Sehari-hari:**  
  * **Peta Rute KRL / MRT 🚇:** Peta jalur kereta hanya menampilkan garis stasiun dan titik transit. Peta TIDAK menggambar pohon di pinggir rel, deretan ruko, atau jenis aspal jalan karena informasi itu tidak dibutuhkan penumpang untuk bepergian.
  * **Buku Kontak di HP 📱:** Kamu hanya menyimpan Nama dan Nomor Telepon temanmu. Kamu tidak perlu mencatat warna baju favorit atau ukuran sepatunya di buku telepon.

* **Penerapan pada Sistem Rumah Cerdas (Studi Kasus IoT):**  
  * Saat merancang **lampu kamar otomatis**, data yang ada di kamar sangat banyak: warna cat dinding, merk kasur, motif sprei, ukuran lemari, dan poster di tembok.
  * **Data Esensial yang Dipakai:** *Berapakah nilai sensor cahaya saat ini? Apakah < 200 Lux (gelap)?*
  * **Data yang Diabaikan (Dibuang):** Warna cat tembok, merk kasur, dan jenis gantungan baju.
  * **Manfaat Abstraksi:** Program mikrokontroler berjalan sangat cepat, hemat memori, hemat daya listrik, dan tidak terbebani data yang tidak berguna.

> 💡 **Intisari Abstraksi:** Abstraksi membuat sistem bekerja efisien dengan menyaring hal-hal penting dan membuang detail yang mubazir.

---

#### 📈 TAB 3: PENGENALAN POLA (Pattern Recognition) — *Melihat Keteraturan & Siklus Berulang*

* **Konsep Dasar:**  
  Kemampuan menemukan kesamaan karakteristik, tren, atau keteraturan berulang pada suatu data/kejadian untuk memprediksi hal yang akan terjadi dan membuat solusi yang bisa digunakan berulang kali.

* **Analogi Kehidupan Sehari-hari:**  
  * **Pola Jam Macet Sekolah 🚗:** Kamu tahu bahwa setiap pagi pukul 06.30 lalu lintas depan sekolah selalu padat. Karena kamu mengenali pola ini, kamu berangkat 15 menit lebih awal agar tidak terlambat.
  * **Pola Musim Hujan ☔:** Setiap bulan November–Februari hujan sering turun di sore hari, sehingga kamu selalu menyiapkan payung lipat di dalam tas.
  * **Tebak Nada Lagu 🎵:** Kamu bisa menebak judul lagu hanya dari mendengar 3 ketukan nada pertama karena otakmu mengenali polanya.

* **Penerapan pada Sistem Rumah Cerdas (Studi Kasus IoT):**  
  * **Pola Siklus Siang-Malam ☀️🌙:** Sensor membaca bahwa setiap pukul 17.30–18.00 matahari selalu terbenam dan cahaya meredup drastis. Pukul 05.30 pagi cahaya selalu naik kembali.
  * **Pola Suhu Siang Hari 🌡️:** Suhu ruangan konsisten naik di atas 31°C antara pukul 12.00–14.00 siang.
  * **Manfaat Pengenalan Pola:** Sistem tidak perlu diprogram ulang setiap hari; mikrokontroler cukup memanfaatkan pola siklus ini untuk menjadwalkan otomasi lampu dan pendingin udara secara teratur.

> 💡 **Intisari Pengenalan Pola:** Dengan mengenali pola berulang, kita bisa membuat aturan otomatisasi yang bekerja stabil sepanjang waktu.

---

#### ⚡ TAB 4: ALGORITMA & LOGIKA KONDISIONAL (Algorithm & Logic) — *Instruksi Logis & Pengambilan Keputusan*

* **Konsep Dasar Algoritma:**  
  Menyusun rangkaian instruksi langkah demi langkah yang logis, berurutan, terstruktur, dan tidak bermakna ganda (tidak ambigu) untuk menyelesaikan masalah atau mengambil keputusan.

* **Analogi Kehidupan Sehari-hari:**  
  * **Resep Memasak Mie Instan 🍜:**  
    ① Rebus 400 ml air hingga mendidih $\rightarrow$ ② Masukkan mie selama 3 menit $\rightarrow$ ③ Tuang bumbu ke piring $\rightarrow$ ④ Tiriskan mie dan aduk bersama bumbu. *(Jika langkah tertukar, hasilnya akan gagal!).*
  * **Langkah Aman Menyeberang Jalan 🚶:**  
    ① Berdiri di tepi jalan $\rightarrow$ ② Tengok kanan $\rightarrow$ ③ Tengok kiri $\rightarrow$ ④ JIKA aman, melangkah maju $\rightarrow$ ⑤ JIKA TIDAK aman, tunggu sejenak.

* **Jantung Algoritma: Logika Kondisional (Aturan Keputusan Komputer):**  
  Komputer dan mikrokontroler tidak memiliki insting; mereka mengambil keputusan berdasarkan **aturan logika kondisional**:

  1. **Logika Tunggal (JIKA - MAKA / *IF - THEN*):**  
     *Pola:* `JIKA (Syarat Terpenuhi) -> MAKA (Jalankan Aksi)`  
     *Contoh di Rumah Cerdas (Lampu Otomatis):*  
     `JIKA Sensor Cahaya < 200 Lux (Gelap) -> MAKA Nyalakan Lampu Kamar 💡`

  2. **Logika Majemuk (JIKA - DAN - MAKA / *IF - AND - THEN*):**  
     *Pola:* Menggabungkan dua syarat dengan kata hubung **DAN**. Aksi hanya jalan jika **SEMUA syarat bernilai BENAR**.  
     *Contoh di Rumah Cerdas (Kipas Hemat Listrik):*  
     `JIKA Suhu Ruangan > 30°C (Panas) DAN Sensor Gerak Mendeteksi Orang -> MAKA Putar Kipas Angin 🌀`  
     *(Jika suhu panas tetapi kamar kosong, kipas TIDAK berputar, sehingga menghemat listrik!).*

  3. **Logika Percabangan (JIKA - MAKA - JIKA TIDAK / *IF - THEN - ELSE*):**  
     *Pola:* Menyediakan respon alternatif jika syarat utama tidak terpenuhi.  
     *Contoh di Rumah Cerdas (Sistem Keamanan Pintu):*  
     `JIKA Pintu Terbuka TANPA Kartu Kunci Sah -> MAKA Bunyikan Sirine Alarm 🚨;`  
     `JIKA TIDAK (Kartu Sah Terbaca) -> MAKA Buka Kunci Pintu dengan Aman ✅.`

> 💡 **Intisari Algoritma:** Algoritma adalah jembatan instruksi dari pikiran manusia ke komputer. Logika kondisional (*IF-THEN-ELSE*) memungkinkan rumah cerdas mengambil keputusan secara otomatis dan tepat.

---

## 3. Video Pembelajaran (Audio-Visual)

* **Konten:** Animasi cara kerja sistem Rumah Cerdas (Smart Home IoT).
* **Fokus Tayangan:** Memperlihatkan bagaimana Sensor LDR membaca cahaya senja (Dekomposisi & Abstraksi), Mikrokontroler mengevaluasi logika `IF Cahaya < 200 Lux` (Algoritma), dan Lampu teras menyala otomatis (Aktuator).

---

## 4. Aktivitas Tarik Jawaban (Drag & Drop Uji Konsep)

**Instruksi bagi Siswa:**  
*"Tarik kartu konsep di sebelah kiri, lalu pasangkan pada kotak penjelasan yang tepat di sebelah kanan!"*

| Konsep Berpikir Komputasional (Kiri) | Penjelasan Penerapan Kontekstual (Kanan) |
|---|---|
| **Dekomposisi** | Memecah sistem rumah cerdas menjadi 3 bagian sederhana: Sensor (Input), Mikrokontroler (Proses), dan Aktuator (Output) |
| **Abstraksi** | Hanya fokus pada data tingkat cahaya gelap/terang saat merancang lampu otomatis dan mengabaikan warna cat tembok |
| **Pengenalan Pola** | Mengenali bahwa matahari selalu terbenam pukul 18.00 setiap hari untuk menjadwalkan lampu otomatis secara teratur |
| **Algoritma** | Menyusun aturan logika langkah demi langkah: JIKA sensor gelap MAKA nyalakan lampu, JIKA terang MAKA matikan |
| **Sensor (Input)** | Alat pencari tahu yang membaca kondisi fisik lingkungan (cahaya, suhu, gerakan) sebagai masukan data |
| **Aktuator (Output)** | Alat pelaksana fisik yang melakukan aksi nyata (lampu menyala, kipas berputar, sirine alarm berbunyi) |

---

## 5. Simulator Permainan Edukatif: Smart Home IoT Lab

Siswa berperan sebagai **Arsitek Rumah Cerdas** yang merancang dan menguji aturan logika pada 3 misi interaktif:

### 🔹 Misi 1: Lampu Kamar Otomatis (Logika Sederhana)
* **Tantangan:** Rancang aturan agar lampu kamar otomatis menyala ketika ruangan gelap (< 200 Lux) dan padam saat terang.
* **Panel Uji:** Slider Sensor Cahaya LDR (0–800 Lux).
* **Blok Aturan:** `JIKA Cahaya < 200 Lux -> MAKA Nyalakan Lampu -> JIKA TIDAK -> Matikan Lampu`.
* **Respon Visual:** Lampu memancarkan pendaran kuning saat slider digeser ke area gelap.

### 🔹 Misi 2: Kipas Angin Pintar Hemat Energi (Logika Majemuk)
* **Tantangan:** Cegah pemborosan listrik! Kipas angin hanya boleh berputar jika suhu terasa panas (> 30°C) **DAN** sensor mendeteksi keberadaan orang di ruangan.
* **Panel Uji:** Slider Suhu (20–40°C) + Tombol Deteksi Gerak PIR (Ada Orang / Kosong).
* **Blok Aturan:** `JIKA Suhu > 30°C DAN Ada Gerakan -> MAKA Putar Kipas Angin`.
* **Respon Visual:** Animasi kipas berputar kencang hanya saat kedua syarat terpenuhi secara bersamaan.

### 🔹 Misi 3: Sistem Keamanan Pintu & Alarm (Logika Percabangan)
* **Tantangan:** Lindungi rumah dari penyusup. Jika pintu terbuka tanpa kartu kunci yang sah, sirine alarm darurat harus berbunyi.
* **Panel Uji:** Switch Status Pintu (Terbuka/Tertutup) + Switch Kartu RFID (Sah/Ilegal).
* **Blok Aturan:** `JIKA Pintu Terbuka TANPA Kartu Sah -> MAKA Bunyikan Sirine & Kirim Sinyal Bahaya`.
* **Respon Visual:** Sirine berkedip merah dan memancarkan efek suara alarm darurat.

---

## 6. Evaluasi Pembelajaran Komprehensif (Total 18 Poin)

---

### 📝 Bagian A — Pilihan Ganda (5 Soal @ 1 Poin = 5 Poin)

1. **(C2 - Dekomposisi)** Memecah sistem rumah pintar yang rumit menjadi komponen Sensor (Input), Mikrokontroler (Proses), dan Aktuator (Output) merupakan penerapan fondasi...  
   A. Abstraksi  
   B. **Dekomposisi** *(Kunci Benar)*  
   C. Pengenalan Pola  
   D. Algoritma  

2. **(C3 - Abstraksi)** Saat merancang sistem lampu teras otomatis, programmer hanya fokus pada parameter intensitas cahaya gelap/terang dan mengabaikan warna cat tembok atau merk perabot di rumah. Pendekatan ini merupakan penerapan fondasi...  
   A. Pengenalan Pola  
   B. Dekomposisi  
   C. **Abstraksi** *(Kunci Benar)*  
   D. Kompilasi  

3. **(C2 - Konsep IoT & Input/Output)** Dalam sistem Rumah Cerdas, komponen yang bertindak sebagai "indera" untuk membaca perubahan kondisi lingkungan fisik sekitar (seperti cahaya, suhu, atau gerakan) adalah...  
   A. Aktuator (Lampu / Kipas)  
   B. **Sensor (LDR / Suhu / PIR)** *(Kunci Benar)*  
   C. Baterai Cadangan  
   D. Kabel Penghubung  

4. **(C3 - Algoritma Kondisional)** Manakah penulisan aturan logika kondisional yang paling tepat dan hemat energi agar kipas angin menyala hanya ketika suhu ruangan melebihi 30°C?  
   A. JIKA Suhu < 30°C MAKA Nyalakan Kipas  
   B. **JIKA Suhu > 30°C MAKA Nyalakan Kipas** *(Kunci Benar)*  
   C. JIKA Kipas Berputar MAKA Suhu 30°C  
   D. JIKA Ruangan Kosong MAKA Nyalakan Kipas  

5. **(C2 - Pengenalan Pola)** Sistem pemantau cuaca mendeteksi bahwa matahari selalu terbenam pukul 18.00 dan suhu udara selalu meningkat tajam pada pukul 12.00–14.00 setiap hari. Kemampuan mendeteksi keteraturan data berulang ini merupakan contoh fondasi...  
   A. Dekomposisi  
   B. Abstraksi  
   C. **Pengenalan Pola (Pattern Recognition)** *(Kunci Benar)*  
   D. Algoritma Percabangan  

---

### ✅❌ Bagian B — Benar / Salah (6 Soal @ 1 Poin = 6 Poin)

1. Sensor bertindak sebagai perangkat output yang mengeksekusi gerakan mekanik pada sistem rumah cerdas. $\rightarrow$ **Salah** *(Sensor adalah input/pembaca data, sedangkan aktuator adalah output/pelaksana).*
2. Mikrokontroler berfungsi sebagai otak pemroses data yang mengeksekusi aturan logika algoritma dari nilai sensor. $\rightarrow$ **Benar**
3. Prinsip Abstraksi membantu komputer menghemat kapasitas memori dan daya komputasi karena hanya mengolah data penting yang relevan. $\rightarrow$ **Benar**
4. Tanpa algoritma yang tersusun jelas dan pasti, mikrokontroler tetap dapat menebak waktu yang tepat untuk menyalakan sirine alarm. $\rightarrow$ **Salah** *(Komputer hanya bisa bekerja berdasarkan instruksi yang pasti).*
5. Pada logika majemuk (JIKA - DAN - MAKA), seluruh syarat kondisi yang ditentukan harus bernilai benar agar aksi dapat dijalankan. $\rightarrow$ **Benar**
6. Lampu LED, motor penggerak kipas, dan speaker sirine adalah contoh perangkat aktuator (output). $\rightarrow$ **Benar**

---

### 🔗 Bagian C — Menjodohkan / Matching (5 Pasangan @ 1 Poin = 5 Poin)

| Kolom Kiri (Komponen / Konsep) | Kolom Kanan (Peran & Definisi Kontekstual) |
|---|---|
| **1. Sensor Cahaya (LDR)** | **b.** Membaca intensitas cahaya gelap/terang di sekitar ruangan |
| **2. Mikrokontroler (ESP32)** | **d.** Otak komputer mini yang memproses data dan mengeksekusi aturan logika |
| **3. Aktuator (Relay)** | **a.** Saklar otomatis yang menghubungkan aliran listrik ke perangkat fisik |
| **4. Logika JIKA-MAKA** | **e.** Aturan terstruktur untuk mengambil keputusan otomatis berdasarkan input |
| **5. Abstraksi Data** | **c.** Menyaring data penting yang dibutuhkan dan mengabaikan detail non-esensial |

*Kunci Pasangan:* **1-b, 2-d, 3-a, 4-e, 5-c**

---

### 📊 Bagian D — Drag & Drop Mengurutkan Algoritma (1 Poin)

**Instruksi:** *"Seret dan susunlah 6 tahapan cara kerja sistem lampu teras otomatis berikut ke urutan algoritma yang tepat dari awal hingga akhir!"*

*Kunci Urutan Runtut (1 $\rightarrow$ 6):*
1. Sensor Cahaya (LDR) mengukur intensitas cahaya di sekitar teras rumah.
2. Data analog pembacaan cahaya dikirimkan menuju pin input mikrokontroler.
3. Mikrokontroler mengevaluasi aturan logika algoritma: apakah kondisi saat ini gelap (< 200 Lux)?
4. Jika kondisi gelap terpenuhi, mikrokontroler mengirimkan sinyal pemicu aktif ke modul relay.
5. Modul relay menghubungkan aliran arus listrik menuju lampu teras rumah.
6. Lampu teras menyala secara otomatis menerangi lingkungan malam dengan aman.

---

### 🎮 Bagian E — Simulasi Praktik Keputusan Logika (1 Poin)

**Tantangan Kasus:**  
*"Sebagai Arsitek Rumah Cerdas, analisislah pilihan aturan logika mana yang paling hemat energi, cerdas, dan adaptif untuk penerangan teras rumah malam hari!"*

- Pilihan A: *Lampu Selalu Menyala 24 Jam Penuh Tanpa Sensor* (Boros listrik, tidak cerdas).
- **Pilihan B (Kunci Benar):** *JIKA Sensor Cahaya Gelap DAN Sensor Gerak Mendeteksi Ada Orang $\rightarrow$ MAKA Lampu Menyala* (Hemat energi, adaptif, menerapkan logika multi-kondisi).
- Pilihan C: *JIKA Siang Hari Terang $\rightarrow$ MAKA Lampu Menyala* (Logika terbalik dan boros energi).

---

### 🏆 Skema Rekapitulasi Skor & Apresiasi
* **Total Poin:** Bagian A (5) + Bagian B (6) + Bagian C (5) + Bagian D (1) + Bagian E (1) = **18 Poin**
* **Konversi Nilai:** $\text{Skor Akhir} = (\text{Poin Diperoleh} / 18) \times 100\%$
* **Tingkat Apresiasi:**
  - **90% – 100%:** *"Luar biasa, Arsitek! 🏆 Pemikiran komputasionalmu sangat matang! Kamu siap merancang inovasi rumah cerdas masa depan!"*
  - **60% – 89%:** *"Kerja bagus! 👏 Kamu sudah memahami konsep berpikir komputasional dengan baik. Ulas kembali beberapa bagian untuk hasil sempurna!"*
  - **< 60%:** *"Tetap semangat! 💪 Pelajari kembali 4 Fondasi Berpikir Komputasional dan coba simulasikan kembali!"*

---

## 7. Rangkuman Materi & Refleksi Kritis

### Ringkasan Intisari (Takeaway Points):
1. **Berpikir Komputasional adalah Cara Berpikir:** Melatih kita menjadi pemecah masalah (*problem solver*) yang efektif, rapi, dan terstruktur. Keterampilan ini berguna di semua mata pelajaran dan kehidupan nyata.
2. **Harmoni 4 Fondasi:** 
   - 🧩 **Dekomposisi:** Memecah masalah besar jadi bagian kecil.
   - 🔍 **Abstraksi:** Fokus pada yang penting, abaikan yang tidak relevan.
   - 📈 **Pengenalan Pola:** Mencari keteraturan atau siklus berulang.
   - ⚡ **Algoritma:** Menyusun instruksi logis dan aturan keputusan (*IF-THEN-ELSE*).
3. **Penerapan Teknologi:** Dalam otomasi modern (seperti IoT), **Sensor** membaca data (Input), **Mikrokontroler** memproses aturan logika (Proses), dan **Aktuator** mengeksekusi tindakan nyata (Output).

### Lembar Refleksi Siswa:
> *"Setelah mempelajari materi ini, coba amati lingkungan rumah atau sekolahmu! Masalah sehari-hari apa lagi yang menurutmu bisa diselesaikan atau diotomatisasi dengan menerapkan 4 Fondasi Berpikir Komputasional? Tuliskan ide kreatifmu secara mandiri!"*
