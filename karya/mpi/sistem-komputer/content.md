# 📘 Content Blueprint: MPI Sistem Komputer
## "Sistem Komputer: Menyelam ke Dalam Mesin Digital"
**Mata Pelajaran:** Informatika  
**Fase / Kelas:** Fase D / Kelas VIII SMP  
**Elemen Kurikulum:** Sistem Komputer (SK)  
**Penyusun:** Ach. Chanifuddin Fanani, S.Pd. — SMP Negeri 2 Lamongan  

---

## 🎯 1. Capaian Pembelajaran & Tujuan Pembelajaran

### A. Capaian Pembelajaran (Elemen SK Fase D)
> *"Peserta didik mampu mendeskripsikan komponen, fungsi, dan cara kerja komputer yang membentuk sebuah sistem komputasi, serta menjelaskan interaksi antara perangkat keras, perangkat lunak, dan pengguna."*

### B. Tujuan Pembelajaran (TP Hasil Revisi — Padat, Jelas, & Esensial)
1. **TP 1:** Mengidentifikasi dan mengelompokkan **4 komponen utama perangkat keras** (peranti masukan, pemroses, penyimpanan, dan keluaran) beserta perannya dalam sistem komputer.
2. **TP 2:** Menjelaskan **mekanisme kerja internal komputer** dalam memproses data (interaksi antara CPU, memori utama/RAM, dan media penyimpanan).
3. **TP 3:** Menganalisis peran krusial **Sistem Operasi (Operating System)** sebagai pengelola sumber daya perangkat keras dan penghubung dengan aplikasi serta pengguna (*brainware*).
4. **TP 4:** Mensimulasikan **perakitan komponen sistem komputer** dan mendiagnosis kendala fungsi dasar (*troubleshooting*).

*(Catatan Revisi: Materi representasi biner 8-bit/ASCII/RGB dihapus dari MPI ini agar fokus mendalam pada sistem mekanik dan komputasi internal, serta dialihkan sebagai materi pendukung di Lab Maya).*

---

## 🗺️ 2. Peta Alur Halaman MPI (Total 18 Halaman)

Struktur modul dirancang proporsional dengan 5 sub materi terintegrasi:

```
[1. Cover] 
   └── [2. Menu Utama]
          ├── [3. Petunjuk Penggunaan]
          ├── [4. Tujuan Pembelajaran]
          ├── [5. Menu Pilihan Materi] (5 Sub-Materi Terpilih)
          │      ├── [6. Sub 1 (Teori 1): Anatomi Perangkat Keras]
          │      ├── [7. Sub 2 (Teori 2): Otak Komputer & Alur Data CPU]
          │      ├── [8. Sub 3 (Video): Video Animasi Siklus Mesin CPU]
          │      ├── [9. Sub 4 (Teori 3): Sistem Operasi & Kolaborasi]
          │      └── [10. Sub 5 (Latihan): Menjodohkan Fungsi Hardware]
          ├── [11. Permainan Intro] ── [12. Simulasi Rakit Komputer]
          ├── [13. Latihan Intro] ── [14. Evaluasi (PG, B/S, Jodohkan, Alur Boot)]
          ├── [15. Rangkuman & Refleksi]
          ├── [16. Referensi & Daftar Pustaka]
          ├── [17. Profil Pengembang]
          └── [18. Kredit & Penutup Kemendikdasmen]
```

---

## 📚 3. Rincian Materi Per Sub-Bab (5 Sub-Materi)

### 🖥️ Sub-Materi 1: Anatomi Perangkat Keras Komputer (Teori 1)
*Fokus: Mengenal wujud fisik dan fungsi 4 kelompok perangkat keras.*

#### A. Konsep Sistem Komputer
Komputer bukan sekadar satu kotak benda, melainkan sebuah **SISTEM**—kesatuan dari komponen yang saling terhubung untuk menerima data, mengolahnya, dan menghasilkan informasi berguna.

#### B. 4 Pilar Perangkat Keras (Hardware)
Alih-alih menggunakan istilah kaku *Arsitektur Von Neumann*, materi disajikan dengan **Analogi Dapur Restoran**:
1. **Peranti Masukan (Input Device):**
   - *Fungsi:* Pintu masuk instruksi dan data dari manusia ke komputer.
   - *Contoh:* Keyboard, Mouse, Mikrofon, Scanner, Touchscreen.
   - *Analogi:* Pelayan yang mencatat pesanan pelanggan dan mengantarkannya ke dapur.
2. **Peranti Pemroses (Processing Device - CPU):**
   - *Fungsi:* Mengolah data, melakukan perhitungan logika, dan mengeksekusi instruksi.
   - *Contoh:* Processor (CPU), Motherboard.
   - *Analogi:* Koki utama yang meracik bumbu dan memasak bahan makanan.
3. **Peranti Penyimpanan (Storage & Memory):**
   - *Fungsi:* Menyimpan instruksi program dan data pengguna, baik sementara maupun jangka panjang.
   - *Contoh:* RAM, ROM, SSD, Harddisk, Flashdisk.
   - *Analogi:* Meja racik koki (RAM) dan lemari pendingin bahan makanan (SSD).
4. **Peranti Keluaran (Output Device):**
   - *Fungsi:* Menampilkan atau mengeluarkan hasil pengolahan data agar dapat dipahami manusia.
   - *Contoh:* Monitor, Speaker, Printer, Proyektor.
   - *Analogi:* Piring saji hangat yang dihidangkan ke meja makan tamu.

---

### 🧠 Sub-Materi 2: Otak Komputer & Alur Pemrosesan (CPU & Memori)
*Fokus: Memahami bagaimana mesin berpikir dan mengolah instruksi.*

#### A. Anatomi CPU (Central Processing Unit)
CPU adalah mikrokontroler canggih bernilai triliunan transistor. Di dalamnya terdapat unit inti:
- **ALU (Arithmetic Logic Unit):** Kalkulator super cepat untuk hitungan matematika (+, -, ×, ÷) dan logika (BENAR/SALAH).
- **CU (Control Unit):** Mandor pengatur lalu lintas yang memandu ke mana data harus dikirim.
- **Register:** Memori mini berkecepatan cahaya tepat di dalam CPU untuk memegang data yang sedang dihitung detik itu juga.

#### B. Siklus Mesin (Machine Cycle): 3 Langkah Abadi
Bagaimana komputer menjalankan perintah ketikan kita?
1. **Fetch (Jemput):** CU mengambil instruksi kode dari RAM.
2. **Decode (Terjemahkan):** CU menerjemahkan instruksi menjadi sinyal listrik biner.
3. **Execute (Eksekusi):** ALU menjalankan perintah (misal: menjumlahkan angka).
4. **Store (Simpan):** Hasil perhitungan ditulis kembali ke RAM atau layar.

#### C. Pertarungan: RAM vs SSD / Harddisk
Mengapa komputer butuh dua jenis memori yang berbeda?
| Aspek | RAM (Random Access Memory) | SSD / Harddisk (Storage) |
|---|---|---|
| **Sifat Data** | **Volatile** (Hilang total saat listrik mati) | **Non-Volatile** (Tersimpan permanen) |
| **Kecepatan** | Ekstrem cepat (akses langsung ke CPU) | Lebih lambat dibanding RAM |
| **Fungsi Utama** | Meja kerja aplikasi yang sedang dibuka | Lemari arsip berkas, foto, dan sistem operasi |
| **Kapasitas Khas** | 8 GB – 32 GB | 256 GB – 2.000 GB (2 TB) |

---

### 🎬 Sub-Materi 3: Video Animasi Siklus Mesin CPU (Video Mandiri)
*Fokus: Visualisasi pergerakan data dari input, bus memori, pemrosesan CPU, hingga monitor.*
- Video berdurasi singkat (~2 menit) ditempatkan pada panggung khusus yang lega.
- Dilengkapi poin penting pengamatan:
  1. Pengiriman data input melalui bus sistem ke RAM.
  2. Pengambilan (Fetch), penguraian kode (Decode), dan perhitungan (Execute) oleh ALU/CU.
  3. Pengiriman hasil keluaran ke kartu grafis dan layar monitor.

---

### ⚙️ Sub-Materi 4: Sistem Operasi & Kolaborasi Sistem (Teori 3)
*Fokus: Mengapa komputer butuh perangkat lunak dan bagaimana ketiganya berinteraksi.*

#### A. Apa Itu Sistem Operasi (OS)?
Jika perangkat keras adalah raga/badan, maka Sistem Operasi adalah **jiwa/nyawa** yang menggerakkannya. Tanpa OS, laptop tercanggih sekalipun hanyalah tumpukan logam dan silikon mati.
- **Fungsi Utama OS:**
  1. *Manajemen Perangkat:* Mengatur CPU, memori, keyboard, dan layar.
  2. *Antarmuka Pengguna (GUI):* Menyediakan ikon, jendela, dan kursor agar pengguna tidak perlu mengetik baris perintah kode.
  3. *Manajemen Berkas:* Mengatur folder, penyimpanan file, dan izin keamanan.
- **Contoh OS Populer:** Microsoft Windows, Linux (Ubuntu), macOS, Android, iOS.

#### B. Segitiga Emas: Hardware + Software + Brainware
Sistem komputer hanya bisa bekerja jika ketiga unsur ini bersinergi:
1. **Hardware (Perangkat Keras):** Komponen fisik penyedia daya komputasi.
2. **Software (Perangkat Lunak):** Kumpulan instruksi digital (Sistem Operasi + Program Aplikasi).
3. **Brainware (Pengguna):** Manusia yang memberikan tujuan, data masukan, dan memanfaatkan hasil informasi.

---

### 🎯 Sub-Materi 5: Latihan Interaktif Menjodohkan Hardware (Aktivitas)
*Fokus: Menguji pemahaman fungsi hardware dengan aktivitas menjodohkan interaktif.*
- Menghubungkan istilah hardware (CPU, RAM, SSD, Motherboard, I/O) dengan fungsi utamanya.
- Menampilkan garis koneksi SVG dinamis, penilaian instan, dan umpan balik suara.

---

## 🎮 4. Permainan & Evaluasi Pembelajaran

### A. Permainan Utama: Simulator Perakitan PC
- Siswa merakit PC virtual: memasang Processor ke socket motherboard, memasang keping RAM, menyambungkan kabel SSD, memasang kartu grafis (GPU), dan Power Supply.
- Tombol **"Nyalakan PC"**:
  - Jika rakitan lengkap & benar ➔ PC menyala, monitor menampilkan layar desktop, kipas berputar!
  - Jika ada komponen vital terlewat ➔ Muncul tips diagnosis masalah (*troubleshooting*).

### B. Evaluasi / Latihan (4 Bagian Terpadu)
- **Bagian A (Pilihan Ganda - 5 butir):** Konsep 4 pilar, fungsi ALU, perbedaan RAM vs SSD, peran OS.
- **Bagian B (Benar / Salah - 5 butir):** Karakteristik memori volatile, peran CPU clock, fungsi driver perangkat.
- **Bagian C (Menjodohkan / Matching - 5 butir):** Menghubungkan nama komponen dengan analogi/peran kuncinya.
- **Bagian D (Mengurutkan / Sequencing - 5 langkah):** Mengurutkan tahapan alur proses booting komputer.
- **Hasil Akhir:** Rekapitulasi skor, apresiasi bintang, animasi konfeti, dan tombol coba lagi.

---

## 💡 5. Rekap Koreksi & Perbaikan dari Catatan Pengguna

| Catatan User | Status Analisis & Solusi Baru |
|---|---|
| **Cover Title Sub Font Size** | ✅ **Diubah menjadi `font-size: calc(90px * var(--font-scale, 1.0))`** sesuai permintaan user. |
| **Jumlah Sub-Materi Halaman 5** | 💡 **Dibuat menjadi 5 Sub-Materi Terpadu** (1. Anatomi Hardware, 2. Otak Komputer & Alur Data, 3. Video Animasi CPU, 4. Sistem Operasi & Kolaborasi, 5. Latihan Menjodohkan Hardware). |
| **Video Mandiri** | 🎬 **Memiliki halaman tersendiri (Halaman 8)** sehingga tidak berdesakan dengan teori CPU/RAM dan nyaman dipelajari. |
| **Sub untuk Latihan** | 🎯 **Halaman 10 (Menjodohkan Hardware) menjadi Sub ke-5** latihan interaktif langsung. |
| **TP No 4 (Biner 8-bit)** | ❌ **Dihapus total.** MPI difokuskan pada hardware, alur data CPU/memori, dan OS. |
| **Istilah Von Neumann** | 🔄 **Disederhanakan.** Di Halaman 3 & 4 diganti dengan *"4 Pilar Komponen Sistem Komputer"* dan *"Siklus Pengolahan Data"*. Lebih ramah siswa SMP. |
| **Halaman 6 (Materi 1 - Tab)** | 🎨 **Bebas tab bertumpuk.** Materi 1 disajikan sebagai kartu interaktif 4 Pilar Perangkat Keras yang jernih dan lega. |
| **Halaman 17 Lama (Kutipan/Motto)** | ❌ **Dihapus.** Dari Profil Pengembang langsung menuju Penutup/Kredit Kemendikdasmen. Total halaman menjadi 18 halaman terpadu. |
| **Navigasi Halaman 1 (Cover)** | ✅ **Sudah bersih tanpa tombol prev/next liar.** |
