# Panduan Prompt Video — Google Flow / Veo (Bahasa Indonesia)

Dokumen ini berisi prompt lengkap dalam **Bahasa Indonesia** untuk membuat video animasi edukasi pembelajaran jaringan komputer (Perjalanan Paket Data) untuk **Halaman 8 (Video)** pada aplikasi MPI.

---

## 💡 Alur Kerja Terbaik: Image-to-Video (Extend Model)
1. **Buat Gambar Referensi Awal (First Frame)** menggunakan prompt Bagian 1 di AI Image Generator (Imagen / Midjourney / DALL-E / Flux) dengan rasio **16:9**.
2. Buka **flow.google** (Google Flow), unggah gambar tersebut sebagai **Start Frame**.
3. Masukkan **Klip 1**. Setelah selesai, gunakan fitur **Extend** untuk menyambungkan **Klip 2, 3, 4, 5, dan 6** secara berurutan.
4. Export video utuh (rasio **16:9**), simpan ke: `assets/video/materi-video.mp4`.

---

# 🎨 BAGIAN 1: Prompt Gambar Awal (Referensi Frame Pertama)

> **Gunakan prompt ini untuk membuat gambar acuan utama (Rasio 16:9):**

```text
Ilustrasi edukasi gaya 2.5D modern vektor motion graphic yang rapi dan bersih. Di bagian depan, dua siswa SMP Indonesia yang ceria (satu siswa laki-laki berseragam putih-biru rapi, dan satu siswi perempuan memakai jilbab putih rapi) sedang duduk bersama di meja belajar modern. Siswa laki-laki memegang smartphone yang menampilkan foto kucing oranye lucu di layarnya dengan tombol "KIRIM" berwarna cyan menyala. Jejak cahaya digital halus berwarna toska dan cyan (#00ACC1, #4DD0E1) melayang lembut keluar dari layar ponsel ke udara. Latar belakang ruang kelas minimalis yang bersih dengan pencahayaan hangat yang lembut, bayangan halus, estetika isometrik premium dengan gradien halus, resolusi tinggi 8k, komposisi bersih, rasio layar lebar 16:9.
```

---

# 🎬 BAGIAN 2: Rangkaian Prompt Video (Google Flow Extend Sequence)

---

### 🔹 Klip 1 (00:00 – 00:08) — Aksi Mengirim & Kamera Masuk ke Layar HP
> **Fokus Gerakan:** Jari siswa menekan tombol "Kirim", gelombang cahaya menyala, kamera zoom-in masuk ke layar.

```text
Melanjutkan dari gambar referensi awal. Ibu jari siswa laki-laki dengan lembut menekan tombol "KIRIM" berwarna cyan yang menyala di layar ponsel. Efek riak cahaya cyan menyebar keluar dari tombol ke seluruh permukaan layar. Foto kucing mulai bercahaya terang dan memancarkan partikel digital berkilau. Kamera melakukan gerakan zoom-in maju perlahan dan halus (push-in) dari sudut pandang siswa langsung masuk ke dalam layar smartphone yang bercahaya. Fisika animasi motion graphic halus 60fps, sinar cahaya berpendar lembut, tanpa goyangan kamera, tanpa suara dialog atau narasi.
```

---

### 🔹 Klip 2 (00:08 – 00:16) — Foto Terpecah Menjadi 4 Paket Data
> **Fokus Gerakan:** Foto terbelah menjadi 4 kartu bercahaya bernomor 1-2-3-4 dengan header amplop, lalu meluncur ke kabel serat optik.

```text
Melanjutkan gerakan kamera yang meluncur masuk ke dalam ruang sirkuit digital layar ponsel. Foto kucing dengan mulus terbelah menjadi 4 paket data persegi panjang transparan berkilau yang melayang di udara. Setiap paket memiliki badan kaca bercahaya toska yang memuat potongan foto, kepala paket (header) putih di bagian atas bertuliskan angka '1', '2', '3', dan '4', serta penanda verifikasi kecil di bagian bawah. Keempat paket melayang sejenak, lalu melesat cepat satu per satu masuk ke dalam jalur kabel serat optik biru bercahaya yang membentang ke depan. Efek jejak cahaya partikel dinamis, garis vektor tajam dan bersih, kamera bergerak mulus mengikuti laju paket.
```

---

### 🔹 Klip 3 (00:16 – 00:24) — Masuk ke Persimpangan & Diarahkan Router
> **Fokus Gerakan:** Paket tiba di persimpangan jalan digital. Router memindai header dan membagi jalur perjalanan paket.

```text
Melanjutkan perjalanan paket data. Keempat paket data bernomor meluncur di sepanjang jalur sirkuit bercahaya dan tiba di persimpangan jaringan digital. Di tengah persimpangan terdapat perangkat Router kartun modern yang ramah dengan lampu indikator hijau berkedip dan panah penunjuk arah holografis. Saat setiap paket mendekat, sinar pemindai holografis membaca header nomor paket. Router menggerakkan indikator arahnya, meneruskan Paket 1 dan 2 ke jalur atas berwarna biru, Paket 3 ke jalur tengah, dan Paket 4 ke jalur bawah berwarna oranye. Gerakan kamera berputar halus menyapu pemandangan mengikuti pemisahan rute paket. Gerakan berirama dan estetik bersih.
```

---

### 🔹 Klip 4 (00:24 – 00:32) — Rute Dinamis Menghindari Jalur Rusak
> **Fokus Gerakan:** Jalur tengah mengalami gangguan (kabel putus/merah), Paket 3 otomatis membelok ke rute alternatif.

```text
Melanjutkan pergerakan mengikuti Paket 3 di jalur tengah. Tiba-tiba jalur tengah berkedip merah dengan ikon peringatan bahaya yang menunjukkan kabel terputus (Server Down / RTO). Alih-alih berhenti, lintasan Paket 3 seketika melengkung ke atas, secara cerdas beralih ke jalur alternatif bercahaya toska yang aman. Paket meluncur lancar memutar melewati area jalur yang rusak dan bergabung kembali ke jalur transmisi utama tanpa hambatan. Kamera bergerak menyamping mengikuti manuver cerdas Paket 3. Kontras visual yang indah antara jalur merah yang macet dan jalur toska yang lancar.
```

---

### 🔹 Klip 5 (00:32 – 00:40) — Tiba di Buffer HP Penerima
> **Fokus Gerakan:** Paket tiba dari berbagai arah dengan urutan tidak beraturan (3, 1, 4, 2) dan masuk ke memori antrean (*Buffer*).

```text
Melanjutkan perjalanan. Kamera meluncur masuk ke dalam ruang memori penerima—sebuah wadah kaca transparan bercahaya (Buffer) di dalam smartphone tujuan. Keempat paket data tiba dari pintu kabel yang berbeda pada waktu kedatangan yang berbeda secara acak: Paket 3 tiba paling awal, disusul Paket 1, Paket 4, dan terakhir Paket 2. Setiap paket mendarat mulus ke dalam wadah antrean dengan efek pantulan magnetik yang halus. Sudut kamera menghadap ke bawah menangkap proses penampungan paket secara menyeluruh dan jelas.
```

---

### 🔹 Klip 6 (00:40 – 00:48) — Perakitan Kembali & Foto Utuh 100%
> **Fokus Gerakan:** Paket mengurutkan diri 1-2-3-4, menyatu kembali menjadi foto asli, lalu kamera keluar ke siswi yang tersenyum puas.

```text
Melanjutkan adegan di dalam buffer. Keempat pecahan paket data membaca nomor urut header masing-masing dan secara otomatis bergeser menyusun diri sesuai urutan yang benar: 1, 2, 3, 4. Ujung-ujung pecahan saling menempel dan menyatu secara magnetis dengan kilauan cahaya emas yang memukau. Garis potongan menghilang, menampilkan kembali foto kucing oranye yang utuh 100% dan sangat jernih di layar ponsel. Kamera bergerak mundur perlahan (zoom out) keluar dari layar HP kembali ke ruang kelas, memperlihatkan siswi tersenyum senang menatap foto yang baru saja diterimanya dengan sempurna. Pencahayaan kelas yang hangat dan nyaman, penutupan animasi yang elegan dan mulus.
```

---

# 🌟 OPSI ALTERNATIF: Single Master Prompt (1 Prompt Penuh)

> **Jika ingin men-generate 1 video berdurasi panjang sekaligus tanpa sistem potongan:**

```text
Animasi motion graphic edukasi 2D vektor modern yang bersih dan jelas mengenai cara kerja jaringan komputer. Cerita dimulai dari seorang siswa SMP kartun yang menekan tombol kirim foto di layar ponsel. Foto tersebut terbelah menjadi 4 paket data bercahaya bernomor (1, 2, 3, 4) lengkap dengan kepala paket (header) yang melesat melintasi kabel serat optik bercahaya. Paket tiba di persimpangan yang dijaga perangkat Router cerdas yang membaca alamat dan mengarahkan paket ke beberapa rute berbeda. Saat salah satu rute mengalami gangguan putus sinyal, paket secara otomatis berbelok ke rute alternatif yang lancar. Paket tiba tidak berurutan di wadah memori (buffer) ponsel penerima, lalu secara otomatis mengurutkan diri (1-2-3-4) dan menyatu kembali menjadi foto asli yang utuh dan jernih, diterima dengan gembira oleh siswi penerima. Palet warna toska (#00ACC1), cyan (#4DD0E1), dan putih bersih. Gerakan kamera mengalir mulus, tanpa teks yang bertumpuk, hanya efek suara ambient elektronik ringan tanpa narasi suara.
```
