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

## 🗺️ 2. Peta Alur Halaman MPI (Total 16 Halaman Efektif)

Tidak lagi memaksakan struktur template MPI Jaringan. Alur dirancang mengalir alami:

```
[1. Cover] 
   └── [2. Menu Utama]
          ├── [3. Petunjuk Penggunaan]
          ├── [4. Tujuan Pembelajaran]
          ├── [5. Menu Pilihan Materi]
          │      ├── [6. Materi 1: Anatomi Perangkat Keras]
          │      ├── [7. Materi 2: Cara Kerja CPU & Memori]
          │      │      └── (Termasuk Media Video Siklus Kerja)
          │      └── [8. Materi 3: Sistem Operasi & Kolaborasi]
          │             └── [9. Aktivitas Interaktif: Kelompokkan Komponen]
          ├── [10. Permainan Intro] ── [11. Simulasi Rakit Komputer]
          ├── [12. Latihan Intro] ── [13. Evaluasi (PG, B/S, Jodohkan)]
          ├── [14. Rangkuman & Refleksi]
          ├── [15. Referensi & Daftar Pustaka]
          ├── [16. Profil Pengembang]
          └── [17. Kredit & Penutup Kemendikdasmen]
```

*(Halaman 17 "Kutipan/Motto" yang sebelumnya ada dihapus sesuai arahan user, sehingga halaman langsung mengalir ke Penutup Resmi).*

---

## 📚 3. Rincian Materi Per Sub-Bab (3 Sub-Materi Utama)

### 🖥️ Sub-Materi 1: Anatomi Perangkat Keras Komputer
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

#### D. Media Video Interaktif
Video berdurasi singkat (~2 menit) disematkan langsung untuk memperlihatkan animasi visual partikel data mengalir dari keyboard ➔ RAM ➔ CPU ➔ Monitor.

---

### ⚙️ Sub-Materi 3: Sistem Operasi & Kolaborasi Sistem
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

## 🎮 4. Rancangan Aktivitas & Evaluasi

### A. Aktivitas 1: Klasifikasi Komponen (Tarik Jawaban)
- Menampilkan 6 kartu komponen acak (misal: Webcam, SSD, Core i7, Speaker, Barcode Scanner, RAM).
- Siswa mengelompokkan ke 4 kotak kategori: **[Masukan]**, **[Pemroses]**, **[Penyimpanan]**, **[Keluaran]**.
- Umpan balik langsung dengan visual kartu menempel rapi dan suara konfirmasi.

### B. Aktivitas 2 (Permainan Utama): Lab Perakitan PC
- Siswa merakit PC virtual: memasang Processor ke socket motherboard, memasang keping RAM, menyambungkan kabel SSD, memasang kartu grafis (GPU), dan Power Supply.
- Tombol **"Nyalakan PC"**:
  - Jika rakitan lengkap & benar ➔ PC menyala, monitor menampilkan layar desktop Windows/Linux, kipas berputar!
  - Jika ada komponen vital terlewat (misal RAM lupa dipasang) ➔ Muncul bunyi *beep code error* dan tips diagnosis masalah (*troubleshooting*).

### C. Evaluasi / Latihan (10 Butir Terstandar Kemendikdasmen)
- **Bagian A (Pilihan Ganda - 4 butir):** Konsep 4 pilar, fungsi ALU, perbedaan RAM vs SSD, peran OS.
- **Bagian B (Benar / Salah - 3 butir):** Karakteristik memori volatile, peran CPU clock, fungsi driver perangkat.
- **Bagian C (Menjodohkan / Matching - 3 butir):** Menghubungkan nama komponen dengan analogi/peran kuncinya.
- **Hasil Akhir:** Nilai 0–100, apresiasi bintang, ulasan kunci jawaban, tombol coba lagi.

---

## 💡 5. Rekap Koreksi & Perbaikan dari Catatan Pengguna

| Catatan User | Status Analisis & Solusi Baru |
|---|---|
| **TP No 4 (Biner 8-bit)** | ❌ **Dihapus total.** MPI difokuskan pada hardware, alur data CPU/memori, dan OS. Materi biner dialihkan ke Lab Maya. |
| **Istilah Von Neumann** | 🔄 **Disederhanakan.** Di Halaman 3 & 4 diganti dengan *"4 Pilar Komponen Sistem Komputer"* dan *"Siklus Pengolahan Data"*. Lebih ramah siswa SMP. |
| **Jumlah Sub-Materi Halaman 5** | 💡 **Diubah menjadi 3 Sub-Materi Tematik** (1. Anatomi Hardware, 2. Otak Komputer & Alur Data, 3. Sistem Operasi & Kolaborasi). Jauh lebih pas, proporsional, dan tidak meniru mentah-mentah MPI Jaringan. |
| **Halaman 6 (Materi 1 - Tab)** | 🎨 **Tidak lagi dipaksakan 3 tab.** Materi 1 disajikan sebagai kartu interaktif 4 Pilar Perangkat Keras yang jernih, lega, dan nyaman dibaca. |
| **Halaman 17 (Kutipan/Motto)** | ❌ **Dihapus.** Alur navigasi melompat langsung dari Halaman 16 (Pengembang) ke Penutup/Kredit Kemendikdasmen. Total halaman menjadi 17 halaman terpadu. |
| **Navigasi Halaman 1 (Cover)** | ✅ **Sudah bersih tanpa tombol prev/next liar.** |
