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

## 🗺️ 2. Peta Alur Halaman MPI (Total 19 Halaman)

Modul dirancang dengan ritme pedagogis selang-seling interaktif (*interleaving*) agar siswa tidak jenuh:  
**Teori ➔ Latihan Interaktif ➔ Teori ➔ Video Animasi ➔ Teori**

```
[1. Cover] 
   └── [2. Menu Utama]
          ├── [3. Petunjuk Penggunaan]
          ├── [4. Tujuan Pembelajaran]
          ├── [5. Menu Pilihan Materi] (5 Sub-Materi Berimbang)
          │      ├── [6. Sub 1 (Teori 1): Anatomi Perangkat Keras]
          │      ├── [7. Sub 2 (Latihan): Menjodohkan Fungsi Hardware] 🎮
          │      ├── [8. Sub 3 (Teori 2): Otak Komputer & Alur Data CPU]
          │      ├── [9. Sub 4 (Video): Video Animasi Siklus Mesin CPU] 🎬
          │      └── [10. Sub 5 (Teori 3): Sistem Operasi & Kolaborasi]
          ├── [11. Permainan Intro] ── [12. Simulasi Rakit Komputer]
          ├── [13. Latihan Intro] ── [14. Evaluasi (PG, B/S, Jodohkan, Alur Boot)]
          ├── [15. Rangkuman & Refleksi]
          ├── [16. Referensi & Daftar Pustaka]
          ├── [17. Profil Pengembang]
          ├── [18. Motto / Kutipan Inspirasi & 3 Pilar Pendidikan]
          └── [19. Kredit & Penutup Kemendikdasmen]
```

---

## 📚 3. Rincian Materi Per Sub-Bab (5 Sub-Materi)

### 🖥️ Sub-Materi 1: Anatomi Perangkat Keras Komputer (Teori 1)
*Fokus: Mengenal wujud fisik dan fungsi 4 kelompok perangkat keras.*

#### A. Konsep Sistem Komputer
Komputer bukan sekadar satu kotak benda, melainkan sebuah **SISTEM**—kesatuan dari komponen yang saling terhubung untuk menerima data, mengolahnya, dan menghasilkan informasi berguna.

#### B. 4 Pilar Perangkat Keras (Hardware)
Materi disajikan dengan **Analogi Dapur Restoran**:
1. **Peranti Masukan (Input Device):** Pelayan yang mencatat pesanan pelanggan dari meja. *(Keyboard, Mouse, Mikrofon, Scanner)*.
2. **Peranti Pemroses (Processing Device - CPU):** Koki utama yang meracik bumbu dan memasak bahan makanan. *(CPU, Motherboard)*.
3. **Peranti Penyimpanan (Storage & Memory):** Meja racik koki (RAM) dan lemari pendingin bahan makanan (SSD/Harddisk).
4. **Peranti Keluaran (Output Device):** Piring saji hangat yang dihidangkan ke meja makan tamu. *(Monitor, Speaker, Printer)*.

---

### 🎯 Sub-Materi 2: Latihan Interaktif Menjodohkan Hardware (Latihan 1)
*Fokus: Langsung menguji dan memperkuat pemahaman 4 pilar hardware selagi materi masih segar.*
- Siswa menghubungkan kartu istilah hardware (CPU, RAM, SSD, Motherboard, I/O) dengan fungsi/peran utamanya.
- Garis koneksi SVG interaktif, umpan balik suara, dan skor evaluasi langsung.

---

### 🧠 Sub-Materi 3: Otak Komputer & Alur Pemrosesan (Teori 2)
*Fokus: Memahami bagaimana mesin berpikir dan mengolah instruksi.*

#### A. Anatomi CPU (Central Processing Unit)
- **ALU (Arithmetic Logic Unit):** Kalkulator super cepat untuk hitungan matematika (+, -, ×, ÷) dan logika.
- **CU (Control Unit):** Mandor pengatur lalu lintas data yang menjemput instruksi.
- **Register:** Memori kerja internal berkecepatan ultra-tinggi tepat di dalam prosesor.

#### B. Siklus Mesin (Machine Cycle): 4 Tahap Berulang
1. **Fetch (Jemput):** CU mengambil instruksi dari RAM.
2. **Decode (Terjemahkan):** CU menguraikan maksud kode perintah.
3. **Execute (Eksekusi):** ALU menjalankan kalkulasi perintah.
4. **Store (Simpan):** Hasil dituliskan kembali ke RAM atau layar.

#### C. Pertarungan: RAM vs SSD / Harddisk
- **RAM:** Volatil (sementara), kecepatan luar biasa tinggi, analogi meja kerja aktif.
- **SSD:** Non-volatil (permanen), kapasitas besar, analogi lemari arsip buku.
- **Clock Speed:** Processor 3.5 GHz melakukan 3,5 miliar siklus per detik!

---

### 🎬 Sub-Materi 4: Video Animasi Siklus Mesin CPU (Video)
*Fokus: Visualisasi dinamis pergerakan data dari input, bus memori, pemrosesan CPU, hingga monitor.*
- Video berdurasi singkat (~2 menit) ditempatkan pada panggung khusus yang lega.
- Panduan pengamatan:
  1. Pengiriman data input melalui bus sistem ke RAM.
  2. Pengambilan (Fetch), penguraian kode (Decode), dan perhitungan (Execute) oleh ALU/CU.
  3. Penyajian hasil keluaran ke kartu grafis dan layar monitor.

---

### ⚙️ Sub-Materi 5: Sistem Operasi & Kolaborasi Sistem (Teori 3)
*Fokus: Mengapa komputer butuh perangkat lunak dan bagaimana ketiganya berinteraksi.*

#### A. Apa Itu Sistem Operasi (OS)?
Jika perangkat keras adalah raga/badan, maka Sistem Operasi adalah **jiwa/nyawa** yang menggerakkannya.
- **Fungsi Utama OS:** Manajemen sumber daya hardware, Antarmuka Grafis (GUI), dan Manajemen berkas file.
- **Contoh OS:** Windows, Linux, macOS, Android, iOS.

#### B. Segitiga Emas: Hardware + Software + Brainware
Sinergi mutlak antara komponen fisik (Hardware), program logika (Software), dan manusia berakal (Brainware), serta peran program *Driver* sebagai penerjemah.

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
