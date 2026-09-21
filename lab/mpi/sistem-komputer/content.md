# 📘 Content Blueprint: MPI Sistem Komputer (Revisi Mutu Tinggi)
## "Sistem Komputer: Menyelam ke Dalam Mesin Digital"
**Mata Pelajaran:** Informatika  
**Fase / Kelas:** Fase D / Kelas VII - VIII SMP  
**Elemen Kurikulum:** Sistem Komputer (SK) — Selaras BSKAP No. 032/H/KR/2024  
**Penyusun:** Ach. Chanifuddin Fanani, S.Pd. — SMP Negeri 2 Lamongan  

---

## 🎯 1. Capaian Pembelajaran & Tujuan Pembelajaran

### A. Capaian Pembelajaran (Elemen SK Fase D)
> *"Peserta didik mampu mendeskripsikan komponen, fungsi, dan cara kerja komputer yang membentuk sebuah sistem komputasi, serta menjelaskan interaksi antara perangkat keras, perangkat lunak, dan pengguna."*

### B. Tujuan Pembelajaran (TP Esensial & Kontekstual)
1. **TP 1 (Arsitektur Perangkat Keras):** Mengidentifikasi dan mengelompokkan **4 pilar komponen perangkat keras** (peranti masukan, pemroses/CPU, penyimpanan, dan keluaran) serta peran krusial **Motherboard** sebagai tulang punggung interkoneksi sistem.
2. **TP 2 (Mekanisme Pemrosesan Internal):** Menganalisis **siklus mesin CPU (Fetch-Decode-Execute-Store)**, peran memori utama (*RAM volatile*) vs media penyimpanan (*SSD NVMe non-volatile*), serta alur inisialisasi awal sistem (*Power-On Self-Test / POST BIOS*).
3. **TP 3 (Sistem Operasi & Kolaborasi Sinergis):** Menganalisis peran krusial **Sistem Operasi (OS)** dalam mengelola proses (CPU scheduling), memori (*Virtual Memory*), berkas, serta menjembatani hardware, aplikasi, dan pengguna (*brainware*).
4. **TP 4 (Simulasi & Troubleshooting):** Mensimulasikan **perakitan komponen komputer secara kompatibel** dan mendiagnosis kendala fungsi dasar (*troubleshooting hardware failure*).

---

## 🗺️ 2. Peta Alur Halaman MPI (Total 18 Halaman Terpadu)

Modul dirancang dengan ritme pedagogis selang-seling interaktif (*interleaving*) agar siswa tidak jenuh:  
**Teori ➔ Latihan Interaktif ➔ Teori ➔ Video Animasi ➔ Teori ➔ Evaluasi Komprehensif**

```
[1. Cover Utama] 
   └── [2. Menu Utama]
          ├── [3. Petunjuk Penggunaan]
          ├── [4. Tujuan Pembelajaran]
          ├── [5. Menu Pilihan Materi] (5 Sub-Materi Terpadu)
          │      ├── [6. Sub 1 (Teori 1): Anatomi Hardware & Tulang Punggung Motherboard]
          │      ├── [7. Sub 2 (Latihan): Menjodohkan Fungsi Hardware Interaktif] 🎮
          │      ├── [8. Sub 3 (Teori 2): Otak Komputer, Siklus Mesin CPU & Diagnostik BIOS]
          │      ├── [9. Sub 4 (Video): Video Animasi Siklus Mesin CPU] 🎬
          │      └── [10. Sub 5 (Teori 3): Sistem Operasi, Manajemen Memori & Kolaborasi]
          ├── [11. Permainan Intro] ── [12. Simulasi Rakit Komputer & Uji Kompatibilitas]
          ├── [13. Latihan Intro] ── [14. Evaluasi (PG, B/S, Jodohkan, Alur Booting)]
          ├── [15. Rangkuman & Refleksi Belajar]
          ├── [16. Referensi & Sumber Aset]
          ├── [17. Dokumentasi Prompt AI & Transparansi Juknis]
          ├── [18. Profil Pengembang]
          └── [19. Kredit & Penutup Kemendikdasmen]
```

---

## 📚 3. Rincian Materi Per Sub-Bab (5 Sub-Materi Terpadu)

### 🖥️ Sub-Materi 1: Anatomi Perangkat Keras & Tulang Punggung Motherboard (Teori 1)
*Fokus: Memahami bahwa komputer adalah ekosistem terpadu yang saling terhubung pada Motherboard.*

#### A. Konsep Sistem Komputer & Analogi Dapur Modern
Komputer bukan sekadar satu kotak mati, melainkan sebuah **SISTEM**—kombinasi harmonis antara komponen fisik (*Hardware*), perangkat lunak (*Software*), dan manusia (*Brainware*).
- **Analogi Dapur Restoran:**
  1. **Peranti Masukan (Input):** Pelayan ramah yang mencatat pesanan pelanggan dari meja (*Keyboard, Mouse, Mikrofon, Scanner*).
  2. **Peranti Pemroses (CPU & Motherboard):** Koki kepala yang meracik bumbu dan mengolah bahan masakan dengan kecepatan kilat.
  3. **Peranti Penyimpanan (RAM & Storage):** Meja racik koki untuk bahan makanan aktif (*RAM volatile*) dan lemari pendingin/gudang bahan baku (*SSD/Harddisk non-volatile*).
  4. **Peranti Keluaran (Output):** Piring saji hangat yang dihidangkan ke meja tamu untuk dinikmati (*Monitor, Speaker, Printer*).

#### B. Motherboard: Tulang Punggung Interkoneksi
Seluruh komponen tidak dapat bekerja sendiri tanpa papan sirkuit induk (**Motherboard ATX**):
- **Soket CPU (LGA 1700):** Rumah bagi jutaan pin emas tempat prosesor bertengger. Dilindungi heatsink-fan agar tidak *overheat*.
- **Slot RAM DIMM:** Dilengkapi lekukan (*notch*) khusus standar DDR4 untuk mencegah salah pasang atau korsleting tegangan listrik.
- **Slot M.2 NVMe:** Jalur bus PCIe berkecepatan gigabyte per detik (jauh melampaui kabel pita IDE/SATA kuno).
- **Slot Ekspansi PCIe x16:** Jalur tol grafis berkecepatan tinggi khusus untuk Kartu Grafis (GPU).
- **Konektor Daya 24-Pin ATX:** Pintu masuk pasokan arus listrik stabil dari Power Supply Unit (PSU).

---

### 🎯 Sub-Materi 2: Latihan Menjodohkan Hardware (Latihan 1)
*Fokus: Menguji ketepatan pengelompokan fungsi komponen hardware secara langsung melalui interaksi garis SVG dinamis.*

---

### 🧠 Sub-Materi 3: Otak Komputer, Siklus Mesin CPU & Diagnostik BIOS (Teori 2)
*Fokus: Memahami cara kerja mikroskopis mikroprosesor dan detik-detik awal komputer dinyalakan.*

#### A. Tiga Pilar Anatomi CPU
1. **ALU (Arithmetic Logic Unit):** Mesin hitung logika super-cepat yang menangani matematika (+, -, ×, ÷) dan perbandingan biner (AND, OR, NOT).
2. **CU (Control Unit):** Mandor pengatur lalu lintas data yang menjemput instruksi dan menyinkronkan seluruh kerja sirkuit.
3. **Register & Cache (L1/L2/L3):** Memori internal berkecepatan ultra-tinggi yang langsung terhubung ke inti prosesor tanpa jeda latensi.

#### B. Siklus Mesin CPU (Machine Cycle): 4 Langkah Berulang
Setiap kali kamu mengklik mouse atau mengetik huruf, CPU menjalankan siklus Von Neumann:
1. **Fetch (Jemput):** Control Unit menjemput kode instruksi dari memori RAM melalui bus data.
2. **Decode (Terjemahkan):** Control Unit menguraikan kode biner menjadi sinyal mikro perintah.
3. **Execute (Eksekusi):** ALU mengeksekusi operasi matematika/logika yang diminta.
4. **Store (Simpan):** Hasil komputasi disimpan kembali ke register, RAM, atau dikirim ke kartu grafis.

#### C. Detik-Detik Komputer Menyala: Uji Diagnostik POST BIOS
Sebelum layar desktop Windows/Linux muncul, sistem menjalankan **Power-On Self-Test (POST)** oleh firmware BIOS/UEFI:
- **4 Lampu Diagnostik LED:**
  1. *LED CPU:* Memeriksa kesiapan prosesor.
  2. *LED DRAM:* Memeriksa modul RAM terpasang kokoh.
  3. *LED VGA:* Memeriksa kartu grafis siap memancarkan visual.
  4. *LED BOOT:* Memeriksa media SSD memuat sistem operasi.
- **Beep Code:** Satu nada beep pendek menandakan sistem normal dan sehat. Jika berbunyi berulang, menandakan ada komponen yang kendor atau salah pasang!

---

### 🎬 Sub-Materi 4: Video Animasi Siklus Mesin CPU (Video)
*Fokus: Menonton visualisasi 3D perjalanan instruksi dari klik mouse, menyusuri motherboard, diproses di inti CPU, hingga tampil di monitor.*

---

### ⚙️ Sub-Materi 5: Sistem Operasi, Manajemen Memori & Kolaborasi (Teori 3)
*Fokus: Memahami bagaimana perangkat lunak mengendalikan perangkat keras dan berinteraksi dengan pengguna.*

#### A. Peran Vital Sistem Operasi (OS)
Tanpa OS, komputer tercanggih hanyalah tumpukan logam silikon mati. Fungsi utama OS:
1. **Manajemen Proses (CPU Scheduling):** Membagi giliran jatah waktu kerja CPU agar puluhan aplikasi bisa berjalan mulus (*multitasking*).
2. **Manajemen Memori (*Virtual Memory / Paging*):** Bila RAM penuh, OS meminjam sebagian ruang SSD sebagai memori darurat agar aplikasi tidak mendadak *crash*.
3. **Antarmuka Pengguna (GUI vs CLI):** Menyediakan jendela visual (*windows*), tombol, dan kursor mouse agar komputer mudah digunakan.
4. **Penerjemah Perangkat (*Device Driver*):** Perangkat lunak khusus yang menerjemahkan bahasa OS ke peranti keras (misal: driver printer atau kartu grafis).

#### B. Kolaborasi Segitiga Emas: Hardware, Software, Brainware
Komputasi adalah harmoni dari:
- **Hardware (Raga/Fisik):** Menyediakan sirkuit elektronika dan daya komputasi.
- **Software (Jiwa/Instruksi):** Berisi logika kode program dan arahan operasional.
- **Brainware (Akal/Niat Manusia):** Memberikan tujuan perintah, nilai etika, dan memanfaatkan informasi.
- **Task Manager:** Perkakas bawaan OS untuk memantau penggunaan CPU, RAM, dan mendeteksi aplikasi yang macet (*troubleshooting*).
