# 📖 Materi & Evaluasi — MPI: Sistem Komputer (Menyelam ke Dalam Mesin)

**Mata Pelajaran:** Informatika  
**Jenjang / Fase:** SMP / Fase D (Kelas VII - VIII)  
**Elemen Capaian Pembelajaran:** Sistem Komputer (SK)  
**Judul Karya:** Sistem Komputer: Menyelam ke Dalam Mesin Digital  
**Penyusun:** Ach. Chanifuddin Fanani, S.Pd. — SMP Negeri 2 Lamongan  

---

## 🎯 1. Capaian & Tujuan Pembelajaran

### Capaian Pembelajaran (CP) Elemen SK Fase D
> *"Peserta didik mampu mendeskripsikan komponen, fungsi, dan cara kerja komputer yang membentuk sebuah sistem komputasi, serta menjelaskan proses kodifikasi data (bilangan biner) untuk penyimpanan data dalam memori komputer."*

### Indikator Ketercapaian Tujuan Pembelajaran (IKTP)
1. **Mengidentifikasi 4 komponen utama perangkat keras (Arsitektur Von Neumann):** Perangkat Masukan (*Input*), Pemrosesan (*Process/CPU*), Keluaran (*Output*), dan Penyimpanan (*Storage*).
2. **Menganalisis mekanisme kerja CPU dan Memori:** Siklus *Fetch-Decode-Execute*, fungsi RAM (*volatile*) vs SSD/Storage (*non-volatile*).
3. **Membedakan perangkat lunak:** Sistem Operasi (*Operating System*) sebagai pengelola perangkat keras dan Perangkat Lunak Aplikasi (*Application Software*).
4. **Mempraktikkan kodifikasi data biner:** Menghitung konversi bilangan biner 8-bit ke desimal serta memahami representasi warna RGB dan teks.

---

## 📚 2. Struktur Modul Materi

### Bab 1: Perangkat Keras & Model Von Neumann
- **Komputer itu Apa?**
  Komputer adalah sistem elektronik yang menerima data masukan (*input*), memprosesnya sesuai instruksi (*processing*), menghasilkan informasi (*output*), dan menyimpannya (*storage*).
- **4 Pilar Komponen Hardware:**
  1. **Input Device:** Keyboard, Mouse, Mikrofon, Scanner, Touchscreen.
  2. **Processing Device (Otak Komputer):** 
     - **CPU (Central Processing Unit):** Terdiri dari ALU (*Arithmetic Logic Unit* untuk berhitung logika) dan CU (*Control Unit* sebagai dirigen instruksi).
     - **Motherboard:** Papan sirkuit utama tempat semua komponen bersatu.
  3. **Storage Device (Penyimpan Data):**
     - **RAM (Random Access Memory):** Tempat kerja sementara, sangat cepat, data hilang saat listrik padam (*volatile*).
     - **SSD / Harddisk:** Penyimpan permanen file, dokumen, dan sistem operasi (*non-volatile*).
  4. **Output Device:** Monitor, Speaker, Printer, Proyektor.

---

### Bab 2: Perangkat Lunak (Software) & Cara Kerja Sistem
- **Sistem Operasi (OS) — Jenderal Pengelola:**
  - Tanpa OS, perangkat keras hanyalah tumpukan logam dan silikon mati.
  - OS (Windows, Linux, Android, iOS) menjembatani manusia dan aplikasi dengan perangkat keras.
- **Perangkat Lunak Aplikasi:**
  - Program yang dirancang untuk menyelesaikan tugas spesifik pengguna (browser, perkakas kantor, editor grafis, gim).
- **Bagaimana Komputer Bekerja? Siklus Mesin (*Machine Cycle*):**
  - **Fetch (Ambil):** CPU mengambil instruksi dari RAM.
  - **Decode (Terjemahkan):** CPU memahami apa yang harus dilakukan.
  - **Execute (Jalankan):** CPU mengeksekusi perhitungan di ALU.
  - **Store (Simpan):** Hasil disimpan kembali ke memori.

---

### Bab 3: Bahasa Rahasia Komputer — Bilangan Biner
- **Mengapa Komputer Pakai Biner (0 dan 1)?**
  - Sirkuit komputer terbuat dari milyaran transistor kecil yang hanya memiliki dua kondisi listrik: **MATI (0)** atau **HIDUP (1)**.
  - Satuan terkecil data disebut **bit** (*binary digit*). 8 bit berkumpul membentuk **1 Byte** (cukup untuk menyimpan 1 huruf karakter).
- **Nilai Tempat 8-Bit (Pangkat 2):**
  - Bobot bit dari kiri ke kanan: `128 | 64 | 32 | 16 | 8 | 4 | 2 | 1`
  - Contoh: Biner `00001010` = 8 + 2 = **10** desimal.
  - Biner `01000001` = 64 + 1 = **65** desimal (dalam tabel ASCII adalah huruf **'A'**).

---

## 🎮 3. Spesifikasi Lab Simulasi Terintegrasi

### Simulasi 1: Rakit PC Interaktif
- Komponen di rak perakitan: **CPU**, **RAM**, **SSD M.2**, **GPU (Kartu Grafis)**.
- Slot motherboard yang responsif terhadap penempatan komponen.
- Tombol **"⚡ Nyalakan Komputer (Power Test)"**:
  - Jika komponen lengkap: Kipas CPU berputar animasi kencang, RGB menyala, dan monitor menampilkan layar BIOS *"System Booting... SUCCESS!"*
  - Jika belum lengkap: Tombol power berbunyi peringatan *"Beep! RAM belum terpasang!"*

### Simulasi 2: Sakelar Biner 8-Bit (Interactive Binary Switch)
- 8 Sakelar lampu bolam virtual bernilai: 128, 64, 32, 16, 8, 4, 2, 1.
- Siswa mengklik sakelar lampu untuk mengubah status 0 (Mati) atau 1 (Menyala).
- Layar kalkulator di samping otomatis menjumlahkan nilai desimal secara *real-time*.
- Ada mode tantangan: *"Nyalakan lampu untuk membentuk angka 42!"*

---

## 📝 4. Bank Soal Kuis Formatif (10 Soal)

1. **Komponen yang sering disebut sebagai 'otak komputer' karena bertugas memproses seluruh instruksi dan perhitungan logika adalah...**
   - A. Harddisk
   - B. CPU (Central Processing Unit) *(Kunci)*
   - C. Keyboard
   - D. Power Supply
   - *Pembahasan: CPU memproses seluruh instruksi program dan kalkulasi matematika/logika melalui ALU dan CU.*

2. **Perbedaan mendasar antara RAM dan SSD/Harddisk dalam menyimpan data adalah...**
   - A. RAM bersifat permanen, sedangkan SSD datanya hilang saat mati lampu
   - B. RAM bersifat sementara (volatile), sedangkan SSD menyimpan permanen (non-volatile) *(Kunci)*
   - C. RAM berukuran lebih besar daripada SSD
   - D. RAM hanya digunakan untuk mencetak dokumen
   - *Pembahasan: RAM adalah memori kerja jangka pendek (volatile), sedangkan SSD menyimpan file secara permanen.*

3. **Perangkat berikut ini yang seluruhnya termasuk dalam kategori Perangkat Masukan (Input Device) adalah...**
   - A. Monitor, Speaker, Printer
   - B. Keyboard, Mouse, Mikrofon *(Kunci)*
   - C. CPU, RAM, Motherboard
   - D. Proyektor, Flashdisk, Harddisk
   - *Pembahasan: Keyboard, mouse, dan mikrofon berfungsi memasukkan data/perintah ke dalam sistem komputer.*

4. **Sistem Operasi (Operating System) seperti Windows, Linux, atau Android berfungsi sebagai...**
   - A. Penghias tampilan casing komputer
   - B. Pengelola sumber daya perangkat keras dan penghubung antara pengguna dengan aplikasi *(Kunci)*
   - C. Pengganti arus listrik rumah
   - D. Pembersih kotoran debu kipas CPU
   - *Pembahasan: OS adalah perangkat lunak dasar pengelola perangkat keras dan eksekusi program aplikasi.*

5. **Mengapa komputer internal menggunakan sistem bilangan biner (angka 0 dan 1) dalam bekerja?**
   - A. Karena huruf alfabet terlalu banyak untuk dipelajari komputer
   - B. Karena transistor sirkuit komputer hanya mengenal dua kondisi fisik: tidak ada arus (0) dan ada arus (1) *(Kunci)*
   - C. Karena angka biner diciptakan oleh penemu monitor
   - D. Agar siswa merasa kesulitan belajar
   - *Pembahasan: Komputer tersusun atas transistor elektronik biner (sakelar on/off arus listrik).*

6. **Berapa nilai desimal dari bilangan biner 8-bit `00001011`?**
   - A. 8
   - B. 10
   - C. 11 *(Kunci)*
   - D. 15
   - *Pembahasan: Bobot bit yang aktif (1) adalah posisi 8, 2, dan 1. Maka 8 + 2 + 1 = 11.*

7. **Satuan data terkecil dalam sistem komputasi disebut bit. Gabungan dari 8 buah bit akan membentuk...**
   - A. 1 Kilo
   - B. 1 Byte *(Kunci)*
   - C. 1 Hertz
   - D. 1 Watt
   - *Pembahasan: 1 Byte = 8 bit, yang merupakan standar penyimpanan satu karakter huruf/angka.*

8. **Papan sirkuit utama tempat diletakkannya CPU, RAM, dan kartu ekspansi agar saling terhubung disebut...**
   - A. Motherboard / Mainboard *(Kunci)*
   - B. Mousepad
   - C. Heatsink Fan
   - D. Casing Tower
   - *Pembahasan: Motherboard adalah papan sirkuit induk yang mengintegrasikan seluruh komponen hardware.*

9. **Ketika kamu menekan tombol power komputer, urutan proses awal yang dijalankan sebelum masuk ke desktop adalah...**
   - A. Langsung membuka Microsoft Word
   - B. Proses Booting (POST dan inisialisasi hardware oleh BIOS/UEFI) *(Kunci)*
   - C. Menghapus seluruh file di penyimpanan
   - D. Mengirim email ke guru
   - *Pembahasan: Proses Booting menginisialisasi hardware dan memuat sistem operasi dari SSD ke RAM.*

10. **Komponen pendingin (Heatsink dan Kipas) sangat krusial dipasang di atas processor (CPU) karena...**
    - A. CPU menghasilkan panas tinggi akibat triliunan perpindahan arus listrik setiap detik *(Kunci)*
    - B. Agar CPU terlihat bercahaya di dalam casing
    - C. Untuk menyedot debu dari lantai
    - D. Agar suara komputer menjadi sangat keras
    - *Pembahasan: Perpindahan daya listrik di mikroprosesor menimbulkan panas tinggi yang harus segera dilepaskan agar tidak overheat.*
