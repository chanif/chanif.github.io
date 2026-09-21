# Panduan Prompt Video — Google Flow / Veo / AI Video Generator
## "Siklus Mesin CPU & Perjalanan Instruksi di Dalam Komputer"

Dokumen ini berisi panduan dan prompt lengkap dalam **Bahasa Indonesia** dan **Bahasa Inggris** untuk memproduksi video animasi edukasi 3D/2.5D tentang bagaimana data dan instruksi diproses di dalam komputer (dari aksi klik pengguna, penjemputan dari RAM, penguraian kode di Control Unit, komputasi di ALU, hingga muncul kembali di layar monitor).

Video ini dirancang untuk mengisi **Halaman Video (Siklus Mesin CPU)** pada aplikasi Media Pembelajaran Interaktif (MPI) Sistem Komputer.

---

## 💡 Alur Kerja Rekomendasi: Image-to-Video (Extend Model)
1. **Buat Gambar Referensi Awal (First Frame):**  
   Gunakan prompt pada **BAGIAN 1** di generator gambar AI (*Midjourney v6*, *Google Imagen 3*, *DALL-E 3*, atau *Flux*) dengan rasio **16:9**.
2. **Buka Platform Video AI:**  
   Buka **flow.google** (Google Flow / Veo), **Runway Gen-3 Alpha**, **Luma Dream Machine**, atau **Kling AI**. Unggah gambar referensi sebagai **Start Frame**.
3. **Eksekusi Klip Berantai (Sequence Extension):**  
   Masukkan prompt **Klip 1**. Setelah klip pertama terbentuk, gunakan fitur **Extend / In-betweening** untuk menyambungkan **Klip 2, 3, 4, 5, dan 6** secara berurutan agar karakter, gaya visual, dan kontinuitas sirkuit tetap konsisten (*seamless*).
4. **Ekspor Video Utuh:**  
   Gabungkan (atau unduh hasil extend penuh) dalam rasio **16:9**, resolusi minimal **1080p Full HD**, simpan ke: `assets/video/siklus_cpu.mp4`.

---

# 🎨 BAGIAN 1: Prompt Gambar Awal (Referensi Frame Pertama)

> **Gunakan prompt ini untuk membuat gambar acuan utama (Rasio Layar 16:9):**

### 🇮🇩 Versi Bahasa Indonesia
```text
Ilustrasi konsep 3D isometrik modern dan bersih yang memukau tentang arsitektur komputer masa depan. Di sebelah kiri meja belajar, seorang siswa SMP Indonesia berseragam putih-biru rapi sedang tersenyum sambil memegang mouse komputer bercahaya neon cyan. Di sampingnya, terdapat casing komputer transparan (tempered glass) yang terbuka, memperlihatkan papan sirkuit Motherboard ATX berbalut garis sirkuit emas yang berpendar toska (#00ACC1). Di tengah motherboard terdapat prosesor CPU mikro berbalut heatspreader perak yang memancarkan cahaya biru lembut, dikelilingi modul RAM DDR4 dan kartu grafis GPU modern. Jejak pulsa cahaya digital halus melayang keluar dari tombol mouse bersiap melesat ke dalam casing PC. Pencahayaan studio lembut, estetika bersih dan berkelas, rasio layar lebar 16:9, resolusi tinggi 8k.
```

### 🇬🇧 Versi Bahasa Inggris (Untuk Midjourney / Flux)
```text
Isometric 3D concept illustration of a futuristic educational computer hardware system, modern clean aesthetic. On a sleek study desk, a cheerful Indonesian junior high school student in neat school uniform is holding a glowing cyan gaming mouse. Beside the monitor is an open-frame tempered glass PC case showcasing an ATX motherboard with glowing golden and cyan (#00ACC1) printed circuit board traces. At the center sits a metallic Intel-style CPU processor chip glowing with soft core light, flanked by a glowing DDR4 RAM stick, an M.2 SSD, and a dual-fan graphics card. Subtle glowing data light pulses stream gently from the mouse cable toward the motherboard. Warm ambient classroom lighting, soft depth of field, 8k resolution, clean composition, 16:9 aspect ratio.
```

---

# 🎬 BAGIAN 2: Rangkaian Prompt Video 6 Klip (Google Flow Extend Sequence)

---

### 🔹 Klip 1 (00:00 – 00:08) — Dari Klik Mouse Menyelam ke Jalur Motherboard
> **Fokus Gerakan Visual:** Jari siswa menekan tombol mouse, gelombang pulsa listrik menyala, kamera melakukan gerakan *push-in* cepat dan mulus menembus casing kaca transparan, meluncur menyusuri jalur tembaga PCB Motherboard.

**Prompt Bahasa Indonesia:**
```text
Melanjutkan dari gambar referensi awal. Jari telunjuk siswa menekan tombol klik pada mouse. Seketika muncul riak cahaya biru cyan elektrik dari tombol mouse, meluncur deras melalui kabel USB menuju port motherboard. Kamera melakukan gerakan push-in zoom maju yang sangat mulus dan dramatis, menembus kaca transparan casing PC dan langsung menyelam ke tingkat mikroskopis permukaan motherboard. Pulsa-pulsa cahaya biner keemasan mengalir deras di sepanjang jalur tembaga sirkuit sirkuit terpadu menuju soket prosesor. Gerakan kamera mengalir cepat, stabil, tanpa guncangan, efek visual motion graphic beresolusi 60fps dengan pencahayaan neon toska yang elegan.
```

**Prompt Bahasa Inggris:**
```text
Continuing from the start frame. The student's finger clicks the mouse button. Instantly, an electric cyan data pulse travels down the cable and injects into the motherboard USB header. The camera performs a smooth, cinematic zoom push-in, passing through the transparent glass panel and diving into a microscopic view of the ATX motherboard. Golden and cyan data pulses race through intricate copper PCB traces toward the central processor socket. Fluid 60fps motion, dynamic camera glide, neon circuitry glow, clean educational aesthetic, no text clutter.
```

---

### 🔹 Klip 2 (00:08 – 00:16) — Penjemputan Instruksi dari RAM (Tahap 1: FETCH)
> **Fokus Gerakan Visual:** Kamera menyapu melintasi keping RAM DDR4 yang bercahaya. Deretan angka biner (0 dan 1) berbentuk paket cahaya diambil oleh Control Unit dan meluncur melintasi bus sistem menuju soket CPU.

**Prompt Bahasa Indonesia:**
```text
Melanjutkan pergerakan kamera di atas motherboard. Kamera bergerak menyamping dengan anggun menghadap modul memori RAM DDR4 yang tinggi dan bercahaya biru elektrik. Di dalam sel-sel memori RAM, deretan paket partikel cahaya berkilau melambangkan kode instruksi program (angka biner 0 dan 1) melayang keluar secara berurutan. Jalur bus data sistem berpendar terang saat paket instruksi tersebut dijemput (Fetch) dengan kecepatan kilat melintasi sirkuit emas menuju gerbang masuk prosesor CPU utama. Efek visual transmisi data berkecepatan tinggi dengan jejak cahaya yang memukau.
```

**Prompt Bahasa Inggris:**
```text
Continuing along the motherboard surface. The camera pans smoothly across an illuminated DDR4 RAM module with glowing memory heat spreaders. From within the memory cells, brilliant glowing data packets representing binary instruction codes float out. A high-speed system data bus lights up in vivid cyan as the instructions are retrieved (Fetched) and rush at lightning speed toward the massive central CPU processor socket. Cinematic motion blur, glowing data streams, crisp depth of field.
```

---

### 🔹 Klip 3 (00:16 – 00:24) — Penguraian Kode di Control Unit (Tahap 2: DECODE)
> **Fokus Gerakan Visual:** Kamera memasuki interior mikroskopis inti CPU. Struktur megah Control Unit (CU) memindai paket biner, mengurainya menjadi instruksi mikro berwarna-warni yang jelas.

**Prompt Bahasa Indonesia:**
```text
Melanjutkan perjalanan masuk ke dalam jantung silikon mikroprosesor CPU. Kamera memasuki ruang futuristik yang dipenuhi gerbang-gerbang logika kristal semi-konduktor. Di tengah ruangan, unit kendali (Control Unit) berbentuk menara heksagonal bercahaya memindai paket biner yang baru tiba dengan sinar laser pemindai halus. Kode biner tersebut seketika terurai (Decode) menjadi sinyal perintah kontrol berwarna merah, hijau, dan biru yang terorganisir rapi. Lampu indikator sinkronisasi berkedip selaras dengan irama detak jam (Clock Speed) prosesor yang super presisi.
```

**Prompt Bahasa Inggris:**
```text
Continuing into the microscopic core of the CPU microprocessor. The camera glides into a futuristic silicon chamber filled with crystalline semiconductor logic gates. At the center, the Control Unit (CU)—a glowing hexagonal control hub—scans the incoming binary packet with a soft scanning laser. The binary code seamlessly unfolds (Decodes) into distinct colored control micro-signals. Synchronization indicators pulse in perfect harmony with the processor's high-speed clock cycle rhythm.
```

---

### 🔹 Klip 4 (00:24 – 00:32) — Komputasi Kilat di ALU (Tahap 3: EXECUTE)
> **Fokus Gerakan Visual:** Sinyal masuk ke ruang Arithmetic Logic Unit (ALU). Roda gerbang logika dan transistor berputar cepat menghasilkan solusi kalkulasi dalam kilatan cahaya emas.

**Prompt Bahasa Indonesia:**
```text
Melanjutkan aliran sinyal ke ruang Arithmetic Logic Unit (ALU). Sinyal-sinyal perintah masuk ke sirkuit kalkulator logika yang berputar dinamis. Simbol-simbol matematika dan logika (tanda tambah +, kali ×, dan gerbang logika AND/OR) berpendar dalam bola energi cahaya. ALU melakukan kalkulasi instan (Execute); dua aliran data biner bertemu di titik fokus dan meledak menjadi percikan cahaya keemasan lembut yang melambangkan hasil perhitungan yang telah berhasil diselesaikan secara sempurna dalam hitungan nanodetik.
```

**Prompt Bahasa Inggris:**
```text
Continuing into the Arithmetic Logic Unit (ALU) chamber. The control signals enter a dynamic computational matrix. Mathematical and logic symbols (+, ×, AND, OR) pulse inside glowing energy spheres. The ALU executes the calculation instantly; two binary data streams collide at a focal point, merging into a brilliant golden spark that signifies a successfully computed result within nanoseconds. High-tech dynamic lighting, crisp particle effects.
```

---

### 🔹 Klip 5 (00:32 – 00:40) — Penyimpanan & Saluran ke GPU (Tahap 4: STORE & DISPLAY BUS)
> **Fokus Gerakan Visual:** Hasil perhitungan disimpan ke register/RAM, lalu sinyal grafis melesat melalui jalur ekspansi PCIe x16 menuju Kartu Grafis (GPU). Kipas GPU berputar sejuk dan bilah heatsink bercahaya.

**Prompt Bahasa Indonesia:**
```text
Melanjutkan dari hasil komputasi ALU. Hasil perhitungan disimpan sejenak (Store) ke dalam register memori internal, lalu sebagian dialirkan keluar dengan cepat melintasi jalur bus ekspansi PCIe x16 yang bercahaya keemasan. Kamera meluncur cepat mengikuti laju sinyal menuju Kartu Grafis (GPU). Kipas pendingin GPU berputar anggun, bilah heatsink logam memantulkan cahaya LED RGB, dan prosesor grafis mengubah data kalkulasi tersebut menjadi paket informasi piksel warna beresolusi ultra-tinggi.
```

**Prompt Bahasa Inggris:**
```text
Continuing from the computed result. The output is written back (Stored) to high-speed internal registers, while graphical output streams rapidly along the glowing golden PCIe x16 expansion lanes. The camera tracks alongside the data surge as it enters the Graphics Card (GPU). The dual cooling fans spin gracefully, metallic heatsink fins shimmer with soft RGB illumination, and the GPU transforms the raw data into ultra-high-resolution pixel color packets.
```

---

### 🔹 Klip 6 (00:40 – 00:48) — Tampil Seketika di Layar Monitor (OUTPUT TUNTAS)
> **Fokus Gerakan Visual:** Sinyal keluar dari port video monitor, kamera zoom-out mundur dengan elegan menembus layar monitor, menampilkan hasil gambar 3D utuh di layar komputer, sementara siswa tersenyum kagum.

**Prompt Bahasa Indonesia:**
```text
Melanjutkan dari kartu grafis. Paket data piksel melesat keluar melalui port kabel display dan langsung ditembakkan ke panel layar monitor. Kamera melakukan gerakan zoom-out mundur secara dramatis dan mulus keluar dari dalam matriks piksel monitor kembali ke ruang belajar kelas. Di layar monitor komputer, sebuah simulasi visual interaktif yang kaya warna telah terbuka sempurna secara instan. Siswa tersenyum ceria dan takjub melihat bagaimana triliunan instruksi di dalam komputer selesai diproses hanya dalam sekejap mata. Pencahayaan kelas yang hangat dan inspiratif, penutupan video yang elegan dan berkesan.
```

**Prompt Bahasa Inggris:**
```text
Continuing from the GPU. The pixel packets stream through the display port and burst onto the monitor's display panel. The camera smoothly and dramatically zooms out through the microscopic pixel matrix back into the warm study room. On the large computer monitor, a vibrant interactive 3D simulation renders instantly and flawlessly. The student smiles in awe, realizing how trillions of microscopic machine cycles execute in the blink of an eye. Inspiring classroom ambient glow, cinematic closing sequence.
```

---

# 🌟 OPSI ALTERNATIF: Single Master Prompt (1 Prompt Penuh)

> **Gunakan prompt ini jika Anda menggunakan AI Video Generator satu kali proses tanpa sambungan klip (seperti Runway Gen-3 Alpha, Sora, Kling AI, atau Luma Dream Machine):**

### 🇮🇩 Versi Bahasa Indonesia
```text
Animasi motion graphic edukasi 3D berestetika modern dan bersih tentang siklus kerja internal komputer. Adegan dimulai dari seorang siswa SMP berseragam rapi yang mengklik mouse di meja belajarnya. Kamera seketika melakukan gerakan zoom-in dramatis menembus casing PC transparan dan menyelam ke dalam motherboard ATX bercahaya sirkuit emas dan toska (#00ACC1). Terlihat modul RAM DDR4 melepaskan paket instruksi biner (Fetch), yang meluncur deras ke prosesor CPU. Di dalam CPU, Control Unit mengurai kode instruksi (Decode), disusul Arithmetic Logic Unit (ALU) yang mengeksekusi perhitungan dengan kilatan cahaya energi logika (Execute). Hasil perhitungan disimpan (Store) dan dikirimkan melintasi jalur PCIe x16 ke kartu grafis GPU. Kamera mundur keluar (zoom-out) kembali ke layar monitor yang seketika menampilkan grafik visual memukau di hadapan siswa yang tersenyum kagum. Gerakan kamera 60fps sangat halus, sinematik, bebas teks bertumpuk, pencahayaan neon teknologi pendidikan premium dengan rasio 16:9.
```

### 🇬🇧 Versi Bahasa Inggris
```text
A stunning, seamless 3D educational animation explaining the internal computer machine cycle. The video starts with a smiling junior high school student clicking a computer mouse on a clean wooden study desk. The camera performs a smooth, cinematic push-in through the transparent tempered glass PC case, plunging into an illuminated ATX motherboard with glowing golden and cyan circuit traces (#00ACC1). An illuminated DDR4 RAM stick releases glowing binary data packets (Fetch), which race into the central CPU socket. Inside the microscopic CPU core, the Control Unit unfolds the instructions (Decode), and the ALU executes the mathematical calculation with dazzling golden sparks (Execute). The result is stored (Store) and dispatched through PCIe x16 lanes to the graphics card (GPU). The camera smoothly pulls back out through the monitor screen, revealing a magnificent interactive digital world rendered instantly as the student smiles in wonder. Fluid 60fps motion, cinematic lighting, clean composition, 16:9 aspect ratio.
```
