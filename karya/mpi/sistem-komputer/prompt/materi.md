# 📖 Materi & Evaluasi — MPI: Sistem Komputer (Menyelam ke Dalam Mesin Digital)

**Mata Pelajaran:** Informatika  
**Jenjang / Fase:** SMP / Fase D (Kelas VII - VIII)  
**Elemen Capaian Pembelajaran:** Sistem Komputer (SK) — BSKAP No. 032/H/KR/2024  
**Judul Karya:** Sistem Komputer: Menyelam ke Dalam Mesin Digital  
**Penyusun:** Ach. Chanifuddin Fanani, S.Pd. — SMP Negeri 2 Lamongan  

---

## 🎯 1. Capaian & Indikator Ketercapaian Tujuan Pembelajaran

### Capaian Pembelajaran (CP) Elemen SK Fase D
> *"Peserta didik mampu mendeskripsikan komponen, fungsi, dan cara kerja komputer yang membentuk sebuah sistem komputasi, serta menjelaskan interaksi antara perangkat keras, perangkat lunak, dan pengguna."*

### Indikator Ketercapaian Tujuan Pembelajaran (IKTP)
1. **Mengidentifikasi 4 pilar perangkat keras & Motherboard:** Menganalisis peranti Masukan (*Input*), Pemrosesan (*CPU*), Keluaran (*Output*), Penyimpanan (*Storage*), serta peran Motherboard ATX sebagai papan sirkuit induk penghubung bus data.
2. **Menganalisis siklus mesin Von Neumann & Diagnostik BIOS:** Menjelaskan alur *Fetch-Decode-Execute-Store*, perbedaan memori kerja RAM (*volatile*) vs penyimpanan arsip SSD (*non-volatile*), serta proses *Power-On Self-Test (POST)* saat komputer dinyalakan.
3. **Menganalisis Sistem Operasi & Sinergi Sistem:** Menjelaskan peran OS dalam manajemen proses, manajemen memori (*Virtual Memory*), driver perangkat, dan monitoring performa (*Task Manager*).
4. **Mensimulasikan perakitan dan pemecahan masalah (*troubleshooting*):** Mengidentifikasi kompatibilitas soket CPU LGA 1700, notch RAM DDR4, SSD M.2 NVMe, serta menganalisis indikator error LED/Beep saat komponen gagal.

---

## 📚 2. Struktur Modul Pembelajaran Terpadu

### Bab 1: Anatomi Perangkat Keras & Tulang Punggung Motherboard
- **Sistem Komputer:** Kesatuan utuh Hardware, Software, dan Brainware.
- **Analogi Dapur Restoran:**
  - *Input:* Pelayan mencatat pesanan pelanggan (*Keyboard, Mouse, Scanner*).
  - *CPU:* Koki kepala meracik bumbu dan mengolah masakan (*Processor, ALU, CU*).
  - *RAM & Storage:* Meja racik bahan aktif (*RAM volatile*) dan lemari pendingin bahan baku (*SSD/HDD non-volatile*).
  - *Output:* Piring hidangan hangat disajikan ke meja tamu (*Monitor, Speaker, Printer*).
- **Motherboard ATX Modern:**
  - *Soket CPU LGA 1700:* Mengunci pin prosesor, dilindungi heatsink pendingin dari *thermal throttling*.
  - *Slot RAM DDR4 DIMM:* Dilengkapi lekukan (notch) khusus untuk mencegah salah pasang atau korslet.
  - *Slot M.2 NVMe PCIe Gen4:* Jalur transfer data ultra-cepat hingga ribuan megabyte per detik.
  - *Slot PCIe x16:* Jalur tol grafis ke Kartu Grafis (GPU).
  - *Konektor 24-Pin ATX:* Suplai daya listrik stabil dari Power Supply Unit (PSU).

---

### Bab 2: Otak Komputer, Siklus Mesin CPU & Diagnostik BIOS
- **Tiga Komponen Inti CPU:**
  1. *ALU (Arithmetic Logic Unit):* Melakukan kalkulasi matematika (+, -, ×, ÷) dan logika biner (AND, OR, NOT).
  2. *CU (Control Unit):* Mengatur alur lalu lintas data dan sinkronisasi clock prosesor.
  3. *Register & Cache (L1/L2/L3):* Memori internal super-cepat tepat di dalam inti silikon prosesor.
- **Siklus Mesin CPU (Machine Cycle):**
  - **1. Fetch (Jemput):** CU mengambil instruksi program dari memori RAM.
  - **2. Decode (Terjemahkan):** CU menguraikan kode biner menjadi sinyal mikro perintah.
  - **3. Execute (Eksekusi):** ALU menjalankan kalkulasi perintah secara instan.
  - **4. Store (Simpan):** Hasil disimpan kembali ke register atau RAM/layar.
- **Detik-Detik Booting: Power-On Self-Test (POST) BIOS:**
  - Saat tombol Power ditekan, firmware BIOS/UEFI memeriksa 4 komponen utama secara berurutan:
    - *LED CPU:* Memeriksa kesiapan prosesor.
    - *LED DRAM:* Memeriksa modul RAM terpasang kokoh.
    - *LED VGA:* Memeriksa kartu display aktif.
    - *LED BOOT:* Memeriksa drive SSD memuat OS.
  - *Beep Code:* 1 beep pendek = normal booting sukses. Beep panjang berulang = kegagalan deteksi RAM/VGA.

---

### Bab 3: Sistem Operasi, Manajemen Memori & Kolaborasi Sistem
- **Sistem Operasi (OS) — Jiwa Sang Mesin:**
  - Tanpa OS, perangkat keras hanyalah tumpukan logam silikon mati.
  - *Manajemen Proses (CPU Scheduling):* Membagi giliran kerja CPU agar puluhan aplikasi berjalan serentak.
  - *Manajemen Memori (Virtual Memory / Paging):* Meminjam ruang penyimpanan SSD sebagai cadangan saat kapasitas RAM hampir habis agar aplikasi tidak *crash*.
  - *Antarmuka Grafis (GUI):* Memudahkan manusia berinteraksi lewat ikon jendela dan tetikus.
  - *Driver Perangkat:* Penerjemah komunikasi antara OS dan hardware fisik baru.
- **Kolaborasi Segitiga Emas:**
  - *Hardware (Raga):* Memberikan tenaga komputasi fisik.
  - *Software (Pikiran):* Memuat logika dan algoritma perintah.
  - *Brainware (Akal):* Manusia yang menentukan arah tujuan pemecahan masalah.

---

## 🎮 3. Spesifikasi Lab Simulasi & Evaluasi

### Simulasi 1: Simulator Rakit PC & Uji Kompatibilitas
- Memilih komponen kompatibel (CPU Soket LGA, RAM DDR4, SSD M.2, GPU PCIe, PSU ATX).
- Sistem menolak komponen rusak/cacat (misal CPU pin patah, RAM DDR2 lawas, floppy disk).
- Tombol **"⚡ Nyalakan PC"**:
  - Jika rakitan valid: Kipas berputar, lampu RGB menyala, layar monitor menampilkan status BIOS POST SUCCESS.
  - Jika ada kesalahan: Memberikan tips *troubleshooting* edukatif.

### Simulasi 2: Sakelar Biner & Diagnostik Masalah
- Konversi sakelar biner 8-bit ke angka desimal (128, 64, 32, 16, 8, 4, 2, 1).
- Skenario studi kasus perbaikan: Layar Gelap (cek RAM/VGA) dan Memori Penuh (cek Task Manager & Virtual Memory).

---

## 📝 4. Bank Soal Kuis Formatif (10 Soal Berbobot)

1. **Komponen yang sering disebut sebagai 'otak komputer' karena bertugas memproses seluruh instruksi dan perhitungan logika matematika adalah...**
   - A. Harddisk
   - B. CPU (Central Processing Unit) *(Kunci)*
   - C. Keyboard
   - D. Power Supply
   - *Pembahasan: CPU memproses seluruh instruksi dan kalkulasi matematika/logika melalui ALU dan CU.*

2. **Perbedaan mendasar antara RAM dan SSD dalam menyimpan data komputasi adalah...**
   - A. RAM bersifat permanen, sedangkan SSD datanya hilang saat komputer mati
   - B. RAM bersifat sementara (volatile) dan berkecepatan tinggi, sedangkan SSD menyimpan data permanen (non-volatile) *(Kunci)*
   - C. RAM berukuran kapasitas lebih besar daripada SSD
   - D. RAM hanya digunakan saat komputer dimatikan
   - *Pembahasan: RAM adalah memori kerja aktif (volatile), sedangkan SSD menyimpan arsip file secara permanen.*

3. **Papan sirkuit induk yang menjadi tempat bertenggernya CPU, RAM, slot PCIe kartu grafis, dan jalur bus data disebut...**
   - A. Motherboard / Mainboard *(Kunci)*
   - B. Power Supply
   - C. Heatsink Fan
   - D. Casing Tower
   - *Pembahasan: Motherboard adalah tulang punggung interkoneksi utama yang menghubungkan seluruh komponen hardware.*

4. **Ketika kamu menyalakan komputer, proses pengujian perangkat keras awal yang dijalankan oleh BIOS/UEFI sebelum memuat sistem operasi disebut...**
   - A. Disk Defragmenter
   - B. Power-On Self-Test (POST) *(Kunci)*
   - C. Rendering Video
   - D. Windows Update
   - *Pembahasan: POST memeriksa kesiapan CPU, DRAM, VGA, dan Storage sebelum menyerahkan kendali ke sistem operasi.*

5. **Tahapan siklus mesin CPU (Machine Cycle) saat Control Unit mengambil kode instruksi dari memori RAM dinamakan...**
   - A. Execute
   - B. Fetch *(Kunci)*
   - C. Decode
   - D. Store
   - *Pembahasan: Fetch adalah tahap penjemputan kode instruksi dari RAM ke dalam CPU.*

6. **Bagian di dalam CPU yang bertugas melakukan perhitungan penjumlahan, pengurangan, serta perbandingan logika biner (AND, OR, NOT) adalah...**
   - A. Arithmetic Logic Unit (ALU) *(Kunci)*
   - B. Control Unit (CU)
   - C. Solid State Drive (SSD)
   - D. Power Button
   - *Pembahasan: ALU adalah kalkulator internal mikroprosesor yang mengeksekusi operasi matematika dan logika.*

7. **Ketika kapasitas RAM komputer hampir habis karena membuka terlalu banyak aplikasi berat, Sistem Operasi memanfaatkan teknik meminjam sebagian ruang SSD sebagai memori darurat yang disebut...**
   - A. BIOS Cache
   - B. Virtual Memory / Paging *(Kunci)*
   - C. Formatting
   - D. Overclocking
   - *Pembahasan: Virtual Memory memungkinkan OS memindahkan data sementara ke SSD agar sistem tidak langsung crash.*

8. **Program perangkat lunak khusus yang bertindak sebagai "penerjemah bahasa" antara Sistem Operasi dan perangkat keras tertentu (seperti printer baru atau kartu grafis) disebut...**
   - A. Web Browser
   - B. Device Driver *(Kunci)*
   - C. Antivirus
   - D. Wallpaper
   - *Pembahasan: Driver memungkinkan OS berkomunikasi dan mengendalikan fitur spesifik dari suatu hardware.*

9. **Jika saat merakit PC kamu mencoba memaksa memasang keping RAM DDR2 lama ke motherboard modern yang berstandar DDR4, apa yang akan terjadi secara fisik?**
   - A. Komputer langsung menyala dua kali lebih cepat
   - B. Keping RAM tidak bisa masuk karena posisi lekukan (notch) penguncinya berbeda dan dapat patah jika dipaksa *(Kunci)*
   - C. RAM DDR2 otomatis berubah menjadi DDR4
   - D. Layar monitor langsung menampilkan foto desktop
   - *Pembahasan: Produsen mendesain posisi notch pemisah pin berbeda pada setiap generasi RAM untuk mencegah salah pasang dan korsleting tegangan.*

10. **Komponen pendingin (Heatsink dan Kipas) sangat wajib dipasang rapat di atas permukaan prosesor (CPU) karena...**
    - A. CPU menghasilkan panas sangat tinggi akibat triliunan perpindahan arus listrik setiap detik sehingga rawan overheat (*thermal throttling*) *(Kunci)*
    - B. Agar CPU terlihat bercahaya di dalam casing kaca
    - C. Untuk menyedot debu dari lantai ruang komputer
    - D. Agar suara kipas dapat menjadi musik pengiring belajar
    - *Pembahasan: Tanpa pendinginan efektif, CPU akan membatasi kecepatannya atau mendadak mati darurat (shutdown) untuk mencegah kerusakan silikon.*
