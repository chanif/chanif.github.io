# DOKUMENTASI SUMBER ASET, LISENSI, DAN PROMPTING KECERDASAN ARTIFISIAL (AI)
**Festival Biru Putih Tahun 2026 — Direktorat SMP, Kemendikdasmen RI**  
**Kategori Sayembara:** Media Pembelajaran Interaktif (MPI — Bab IV Juknis)  
**Judul Karya:** Sistem Komputer: Menyelam ke Dalam Mesin Digital  
**Pengembang:** Ach. Chanifuddin Fanani, S.Pd. (SMP Negeri 2 Lamongan)  

---

## 1. Landasan Kepatuhan Terhadap Panduan Juknis

Dokumen ini disusun sebagai wujud transparansi, integritas akademik, dan kepatuhan penuh terhadap ketentuan **Petunjuk Teknis Festival Biru Putih 2026**, khususnya:
1. **Bab II Halaman 6 Poin 3e:**  
   > *"Karya dapat memanfaatkan kecerdasan buatan (Artificial Intelligence). Jika dibuat oleh AI perlu dituliskan keterangan serta wajib menyertakan dokumen desain (prompting)."*
2. **Bab IV Ketentuan Media Pembelajaran Interaktif (MPI):**  
   > *"Media pembelajaran dirancang mandiri, responsif, berorientasi pada kemudahan belajar peserta didik SMP Fase D, serta bebas dari ketergantungan koneksi internet (offline-ready) demi pemerataan akses di seluruh Nusantara."*

Seluruh aset yang digunakan dalam media ini bersifat legal, bebas royalti (Royalty-Free / SIL Open Font License), mandiri tanpa ketergantungan CDN eksternal, dan didokumentasikan dengan rinci berikut ini.

---

## 2. Dokumentasi Lengkap Pembuatan Video AI (Google Vids)

Video animasi pembelajaran **"Siklus Mesin CPU & Perjalanan Instruksi di Dalam Komputer"** (Halaman 8 aplikasi MPI) diproduksi menggunakan platform **Google Vids (Google Workspace AI)** dan tersimpan secara luring penuh (offline) pada lokasi `assets/video/siklus_cpu.mp4`.

### A. Metadata Teknis Video
- **Judul Video:** "Siklus Mesin CPU & Perjalanan Instruksi di Dalam Komputer"
- **Lokasi Berkas:** `assets/video/siklus_cpu.mp4`
- **Format & Kualitas:** Video MP4 H.264, 1080p Full HD (1920x1080), 60 fps
- **Durasi & Rasio:** 00:48 Detik | Rasio Layar Lebar 16:9
- **Platform AI:** Google Vids (Google Workspace AI)
- **Fitur AI:** *Help Me Create a Video*, *AI Voiceover*, *Scene Flow Extender*
- **Panduan Storyboard:** `prompt/prompt_video.md`

### B. 4 Langkah Alur Kerja Produksi di Google Vids
1. **Prompt Storyboard & Naskah (*Help Me Create a Video*):**  
   Memasukkan deskripsi pembelajaran ke fitur AI Google Vids guna menghasilkan outline alur cerita, pemenggalan scene otomatis, serta draf naskah narasi edukatif.
2. **Penyiapan Aset Visual & Media Scene:**  
   Memasukkan gambar acuan visual 3D beresolusi tinggi (rasio 16:9) pada setiap segmen scene (Klik Mouse, RAM Fetch, CPU Decode, ALU Execute, GPU Store, Monitor Output).
3. **Penerapan Narasi Suara AI (*AI Voiceover*):**  
   Memanfaatkan fitur AI Voiceover bawaan Google Vids untuk membacakan penjelasan alur kerja siklus instruksi komputer secara jernih, runtut, dan bersahabat bagi siswa SMP.
4. **Finishing Timeline & Ekspor Video:**  
   Menyesuaikan durasi per-adegan dan transisi di timeline Google Vids, lalu mengekspor video Full HD 1080p dan menyimpannya ke `assets/video/siklus_cpu.mp4`.

---

### C. Master Prompt Video (Google Vids "Help Me Create a Video")

#### 🇬🇧 Versi Bahasa Inggris (Primary AI Video Prompt)
```text
Create an engaging, modern 3D educational video explaining the internal computer machine cycle for junior high school students. The video follows a student clicking a mouse, zooming smoothly into the computer case to reveal the motherboard and processor. Show how data is retrieved from RAM (Fetch), decoded inside the Control Unit (Decode), calculated within the Arithmetic Logic Unit (Execute), and stored back before sending output to the graphics card and monitor screen (Store & Output). Include clear, inspiring educational narration, sleek tech visuals with cyan and gold circuit glow, clean motion graphics, and a professional closing scene. 16:9 widescreen, Full HD quality.
```

#### 🇮🇩 Versi Bahasa Indonesia
```text
Buat video pembelajaran 3D yang memukau dan edukatif tentang siklus kerja internal komputer (siklus mesin CPU) untuk siswa SMP. Video diawali dari siswa berseragam sekolah yang mengklik mouse di meja belajarnya, lalu kamera menyelam ke dalam casing PC memperlihatkan papan motherboard ATX berbalut sirkuit emas dan toska (#00ACC1). Tampilkan modul RAM melepaskan instruksi (Fetch), Control Unit menguraikan kode (Decode), ALU mengeksekusi perhitungan logika matematika (Execute), dan hasilnya disimpan serta dialirkan ke GPU hingga muncul di layar monitor (Store & Output). Sertakan narasi suara yang jelas dan bersahabat, visual teknologi modern beresolusi tinggi, dan penutupan yang inspiratif. Format 16:9 Full HD.
```

---

### D. Prompt Aset Visual Acuan Frame Utama (Rasio 16:9)

#### 🇬🇧 Versi Bahasa Inggris
```text
Isometric 3D concept illustration of a futuristic educational computer hardware system, modern clean aesthetic. On a sleek study desk, a cheerful Indonesian junior high school student in neat school uniform is holding a glowing cyan gaming mouse. Beside the monitor is an open-frame tempered glass PC case showcasing an ATX motherboard with glowing golden and cyan (#00ACC1) printed circuit board traces. At the center sits a metallic Intel-style CPU processor chip glowing with soft core light, flanked by a glowing DDR4 RAM stick, an M.2 SSD, and a dual-fan graphics card. Subtle glowing data light pulses stream gently from the mouse cable toward the motherboard. Warm ambient classroom lighting, soft depth of field, 8k resolution, clean composition, 16:9 aspect ratio.
```

#### 🇮🇩 Versi Bahasa Indonesia
```text
Ilustrasi konsep 3D isometrik modern dan bersih yang memukau tentang arsitektur komputer masa depan. Di sebelah kiri meja belajar, seorang siswa SMP Indonesia berseragam putih-biru rapi sedang tersenyum sambil memegang mouse komputer bercahaya neon cyan. Di sampingnya, terdapat casing komputer transparan (tempered glass) yang terbuka, memperlihatkan papan sirkuit Motherboard ATX berbalut garis sirkuit emas yang berpendar toska (#00ACC1). Di tengah motherboard terdapat prosesor CPU mikro berbalut heatspreader perak yang memancarkan cahaya biru lembut, dikelilingi modul RAM DDR4 dan kartu grafis GPU modern. Jejak pulsa cahaya digital halus melayang keluar dari tombol mouse bersiap melesat ke dalam casing PC. Pencahayaan studio lembut, estetika bersih dan berkelas, rasio layar lebar 16:9, resolusi tinggi 8k.
```

---

### E. Rangkaian 6 Scene Storyboard di Timeline Google Vids (Detik demi Detik)

#### 🔹 Scene 1 (00:00 – 00:08): Dari Klik Mouse Menyelam ke Jalur Motherboard (Input Trigger)
- **Fokus Visual:** Jari siswa menekan klik mouse. Riak pulsa cahaya biru cyan elektrik meluncur deras melalui kabel USB menuju port motherboard. Kamera push-in menembus kaca transparan casing PC menyelam ke tingkat mikroskopis sirkuit PCB.
- **Prompt EN:** `Continuing from the start frame. The student's finger clicks the mouse button. Instantly, an electric cyan data pulse travels down the cable and injects into the motherboard USB header. The camera performs a smooth, cinematic zoom push-in, passing through the transparent glass panel and diving into a microscopic view of the ATX motherboard. Golden and cyan data pulses race through intricate copper PCB traces toward the central processor socket. Fluid 60fps motion, dynamic camera glide, neon circuitry glow, clean educational aesthetic, no text clutter.`
- **Prompt ID:** `Melanjutkan dari gambar referensi awal. Jari telunjuk siswa menekan tombol klik pada mouse. Seketika muncul riak cahaya biru cyan elektrik dari tombol mouse, meluncur deras melalui kabel USB menuju port motherboard. Kamera melakukan gerakan push-in zoom maju yang sangat mulus dan dramatis, menembus kaca transparan casing PC dan langsung menyelam ke tingkat mikroskopis permukaan motherboard. Pulsa-pulsa cahaya biner keemasan mengalir deras di sepanjang jalur tembaga sirkuit sirkuit terpadu menuju soket prosesor.`

#### 🔹 Scene 2 (00:08 – 00:16): Penjemputan Instruksi dari RAM (Tahap 1: FETCH)
- **Fokus Visual:** Kamera bergerak menyamping menghadap keping RAM DDR4 yang bercahaya. Deretan angka biner (0 dan 1) berbentuk paket partikel cahaya berkilau melayang keluar dan dijemput melintasi sirkuit bus sistem menuju soket prosesor CPU.
- **Prompt EN:** `Continuing along the motherboard surface. The camera pans smoothly across an illuminated DDR4 RAM module with glowing memory heat spreaders. From within the memory cells, brilliant glowing data packets representing binary instruction codes float out. A high-speed system data bus lights up in vivid cyan as the instructions are retrieved (Fetched) and rush at lightning speed toward the massive central CPU processor socket. Cinematic motion blur, glowing data streams, crisp depth of field.`
- **Prompt ID:** `Melanjutkan pergerakan kamera di atas motherboard. Kamera bergerak menyamping dengan anggun menghadap modul memori RAM DDR4 yang tinggi dan bercahaya biru elektrik. Di dalam sel-sel memori RAM, deretan paket partikel cahaya berkilau melambangkan kode instruksi program (angka biner 0 dan 1) melayang keluar secara berurutan. Jalur bus data sistem berpendar terang saat paket instruksi tersebut dijemput (Fetch) dengan kecepatan kilat melintasi sirkuit emas menuju gerbang masuk prosesor CPU utama.`

#### 🔹 Scene 3 (00:16 – 00:24): Penguraian Kode di Control Unit (Tahap 2: DECODE)
- **Fokus Visual:** Kamera memasuki interior mikroskopis inti CPU. Struktur megah Control Unit (CU) memindai paket biner dengan laser pemindai halus, mengurainya menjadi sinyal perintah kontrol berwarna merah, hijau, dan biru yang terorganisir rapi.
- **Prompt EN:** `Continuing into the microscopic core of the CPU microprocessor. The camera glides into a futuristic silicon chamber filled with crystalline semiconductor logic gates. At the center, the Control Unit (CU)—a glowing hexagonal control hub—scans the incoming binary packet with a soft scanning laser. The binary code seamlessly unfolds (Decodes) into distinct colored control micro-signals. Synchronization indicators pulse in perfect harmony with the processor's high-speed clock cycle rhythm.`
- **Prompt ID:** `Melanjutkan perjalanan masuk ke dalam jantung silikon mikroprosesor CPU. Kamera memasuki ruang futuristik yang dipenuhi gerbang-gerbang logika kristal semi-konduktor. Di tengah ruangan, unit kendali (Control Unit) berbentuk menara heksagonal bercahaya memindai paket biner yang baru tiba dengan sinar laser pemindai halus. Kode biner tersebut seketika terurai (Decode) menjadi sinyal perintah kontrol berwarna merah, hijau, dan biru yang terorganisir rapi.`

#### 🔹 Scene 4 (00:24 – 00:32): Komputasi Kilat di ALU (Tahap 3: EXECUTE)
- **Fokus Visual:** Sinyal masuk ke ruang ALU. Simbol matematika (+, -, ×) dan gerbang logika (AND, OR) berpendar dalam bola energi cahaya. Dua aliran data biner bertemu di titik fokus dan meledak menjadi percikan cahaya keemasan tanda kalkulasi selesai dalam hitungan nanodetik.
- **Prompt EN:** `Continuing into the Arithmetic Logic Unit (ALU) chamber. The control signals enter a dynamic computational matrix. Mathematical and logic symbols (+, ×, AND, OR) pulse inside glowing energy spheres. The ALU executes the calculation instantly; two binary data streams collide at a focal point, merging into a brilliant golden spark that signifies a successfully computed result within nanoseconds. High-tech dynamic lighting, crisp particle effects.`
- **Prompt ID:** `Melanjutkan aliran sinyal ke ruang Arithmetic Logic Unit (ALU). Sinyal-sinyal perintah masuk ke sirkuit kalkulator logika yang berputar dinamis. Simbol-simbol matematika dan logika (tanda tambah +, kali ×, dan gerbang logika AND/OR) berpendar dalam bola energi cahaya. ALU melakukan kalkulasi instan (Execute); dua aliran data biner bertemu di titik fokus dan meledak menjadi percikan cahaya keemasan lembut yang melambangkan hasil perhitungan yang telah berhasil diselesaikan secara sempurna dalam hitungan nanodetik.`

#### 🔹 Scene 5 (00:32 – 00:40): Penyimpanan & Saluran ke GPU (Tahap 4: STORE & PCIe BUS)
- **Fokus Visual:** Hasil perhitungan disimpan (Store) ke register internal lalu dialirkan keluar dengan cepat melintasi jalur PCIe x16 bercahaya emas. Kamera meluncur mengikuti sinyal menuju Kartu Grafis (GPU). Kipas pendingin berputar sejuk dan heatsink memantulkan LED RGB.
- **Prompt EN:** `Continuing from the computed result. The output is written back (Stored) to high-speed internal registers, while graphical output streams rapidly along the glowing golden PCIe x16 expansion lanes. The camera tracks alongside the data surge as it enters the Graphics Card (GPU). The dual cooling fans spin gracefully, metallic heatsink fins shimmer with soft RGB illumination, and the GPU transforms the raw data into ultra-high-resolution pixel color packets.`
- **Prompt ID:** `Melanjutkan dari hasil komputasi ALU. Hasil perhitungan disimpan sejenak (Store) ke dalam register memori internal, lalu sebagian dialirkan keluar dengan cepat melintasi jalur bus ekspansi PCIe x16 yang bercahaya keemasan. Kamera meluncur cepat mengikuti laju sinyal menuju Kartu Grafis (GPU). Kipas pendingin GPU berputar anggun, bilah heatsink logam memantulkan cahaya LED RGB, dan prosesor grafis mengubah data kalkulasi tersebut menjadi paket informasi piksel warna beresolusi ultra-tinggi.`

#### 🔹 Scene 6 (00:40 – 00:48): Tampil Seketika di Layar Monitor (OUTPUT TUNTAS)
- **Fokus Visual:** Paket piksel ditembakkan ke panel layar monitor. Kamera zoom-out mundur dramatis keluar menembus matriks piksel monitor kembali ke ruang belajar kelas. Simulasi visual 3D interaktif telah terbuka seketika dan siswa tersenyum kagum.
- **Prompt EN:** `Continuing from the GPU. The pixel packets stream through the display port and burst onto the monitor's display panel. The camera smoothly and dramatically zooms out through the microscopic pixel matrix back into the warm study room. On the large computer monitor, a vibrant interactive 3D simulation renders instantly and flawlessly. The student smiles in awe, realizing how trillions of microscopic machine cycles execute in the blink of an eye. Inspiring classroom ambient glow, cinematic closing sequence.`
- **Prompt ID:** `Melanjutkan dari kartu grafis. Paket data piksel melesat keluar melalui port kabel display dan langsung ditembakkan ke panel layar monitor. Kamera melakukan gerakan zoom-out mundur secara dramatis dan mulus keluar dari dalam matriks piksel monitor kembali ke ruang belajar kelas. Di layar monitor komputer, sebuah simulasi visual interaktif yang kaya warna telah terbuka sempurna secara instan. Siswa tersenyum ceria dan takjub melihat bagaimana triliunan instruksi di dalam komputer selesai diproses hanya dalam sekejap mata.`

---

## 3. Inventaris Aset Gambar AI — Menu Navigasi & Latar Belakang

| No | Berkas Aset | Peran / Penempatan | Platform AI | Deskripsi Prompt AI Asli | Status Lisensi |
|---|---|---|---|---|---|
| 1 | `assets/bg-lab-clean.jpg` | Background Utama MPI | Google Imagen 3 | `Clean minimalist 3D empty modern computer laboratory and digital workspace background. Bright spacious interior with large sunlit glass windows overlooking green trees, clean sleek white and pastel cyan desks with neat minimalist monitors, smooth light wood laminate floor, soft ambient morning daylight, peaceful spacious and airy, soft pastel color palette of clean white, soft teal, light cream, and warm sunlight. Completely empty room with no people, minimal and serene, 16:9 aspect ratio.` | Karya Orisinal Pengembang |
| 2 | `assets/thumb_materi_1.jpg` | Sub-Materi 1 (Segitiga Emas) | Google Imagen 3 | `Clean minimalist 3D isometric illustration representing the Computer System Golden Triangle. A glowing stylized triangle linking three clean icons: a friendly desktop computer monitor representing Hardware, a holographic glowing software window representing Software, and a cute friendly student avatar icon representing Brainware. Solid uniform soft pastel teal mint background (#b2dfdb), cute modern educational illustration, centered composition, 16:9 aspect ratio.` | Karya Orisinal Pengembang |
| 3 | `assets/thumb_materi_2.jpg` | Sub-Materi 2 (Menjodohkan) | Google Imagen 3 | `Clean minimalist 3D illustration representing an interactive hardware matching challenge and puzzle game. Cute stylized computer hardware components like a mechanical keyboard, a gaming mouse, and a RAM memory stick connecting with vibrant puzzle connector pieces or target matching slots. Solid uniform soft pastel yellow amber background (#fff9c4), cheerful playful educational design, clean render, 16:9 aspect ratio.` | Karya Orisinal Pengembang |
| 4 | `assets/thumb_materi_3.jpg` | Sub-Materi 3 (Motherboard) | Google Imagen 3 | `Clean minimalist 3D isometric illustration of a computer motherboard and core hardware components. A cute stylized ATX motherboard with an open golden CPU socket in the center, colorful RAM slots, heat sinks, and a PCIe graphics card slot, surrounded neatly by simplified storage SSD and processor chip. Solid uniform soft pastel sky blue background (#bbdefb), modern educational tech aesthetic, clean render, 16:9 aspect ratio.` | Karya Orisinal Pengembang |
| 5 | `assets/thumb_materi_4.jpg` | Sub-Materi 4 (Video Siklus CPU) | Google Imagen 3 | `Clean minimalist 3D illustration of a multimedia video player screen presenting an animated CPU data simulation. A cute stylized tablet monitor screen displaying glowing circuit data waves and a large glossy circular video play button icon in the center. Solid uniform soft pastel rose pink background (#f8bbd0), modern educational aesthetic, clean render, 16:9 aspect ratio.` | Karya Orisinal Pengembang |
| 6 | `assets/thumb_materi_5.jpg` | Sub-Materi 5 (Cara Kerja CPU) | Google Imagen 3 | `Clean minimalist 3D isometric illustration representing the internal CPU machine cycle (Fetch, Decode, Execute, Store). A glowing central CPU chip with miniature clockwork gears and 4 colorful glowing curved circular arrows looping in a continuous cycle, with glowing binary 1s and 0s and small RAM memory chips beside it. Solid uniform soft pastel orange peach background (#ffe0b2), modern clean educational tech style, 16:9 aspect ratio.` | Karya Orisinal Pengembang |
| 7 | `assets/thumb_materi_6.jpg` | Sub-Materi 6 (OS & Kolaborasi) | Google Imagen 3 | `Clean minimalist 3D isometric illustration of an Operating System desktop interface connecting hardware and apps. Cute floating layers of modern graphical user interface windows (GUI), colorful app tiles, a gears settings icon, and a multitasking process dashboard floating harmoniously above a digital platform. Solid uniform soft pastel lavender purple background (#e1bee7), modern educational tech aesthetic, 16:9 aspect ratio.` | Karya Orisinal Pengembang |

---

## 4. Inventaris Aset Gambar AI — Simulator PC & Kasus Teknisi (Halaman 13)

| No | Berkas Aset | Peran / Penempatan | Platform AI | Deskripsi Prompt AI Asli | Status Lisensi |
|---|---|---|---|---|---|
| 8 | `assets/comp_cpu_good.jpg` | Simulator: CPU LGA 1700 Valid | Google Imagen 3 | `Realistic modern desktop CPU microprocessor chip with LGA 1700 gold contact pads on bottom, shiny metallic integrated heat spreader (IHS) on top, clean tech product studio shot, crisp macro detail, soft cyan studio lighting, white isolated background.` | Karya Orisinal Pengembang |
| 9 | `assets/comp_cpu_bad.jpg` | Simulator: CPU Pin Patah (Pengecoh) | Google Imagen 3 | `Old vintage computer CPU processor chip with several bent and broken golden pins on green circuit substrate, visibly damaged electronic component, macro product photography, studio lighting, isolated neutral background.` | Karya Orisinal Pengembang |
| 10 | `assets/comp_ram_good.jpg` | Simulator: RAM DDR4 16GB Valid | Google Imagen 3 | `Modern high performance desktop RAM stick with sleek black metal heat spreader and subtle RGB light diffuser, gold connector pins with DDR4 notch alignment, clean studio product shot, light blue background.` | Karya Orisinal Pengembang |
| 11 | `assets/comp_ram_bad.jpg` | Simulator: RAM DDR1 Lawas (Pengecoh) | Google Imagen 3 | `Vintage legacy DDR1 SDRAM memory stick module with exposed green printed circuit board and retro memory chips, aged outdated computer hardware with legacy notch position, clean studio product photography.` | Karya Orisinal Pengembang |
| 12 | `assets/comp_ssd_good.jpg` | Simulator: SSD M.2 NVMe Valid | Google Imagen 3 | `Modern M.2 NVMe solid state drive SSD with gold contact pins, flash memory NAND chips, and controller, ultra high speed storage component, clean macro product photography, soft studio lighting.` | Karya Orisinal Pengembang |
| 13 | `assets/comp_floppy_bad.jpg` | Simulator: Disket 1.44MB (Pengecoh) | Google Imagen 3 | `Vintage 3.5 inch black magnetic floppy diskette with metal sliding shutter, retro obsolete storage media from 1990s, clean studio lighting, isolated neutral background.` | Karya Orisinal Pengembang |
| 14 | `assets/comp_psu_good.jpg` | Simulator: PSU 550W 80+ Valid | Google Imagen 3 | `Modern 550W ATX desktop power supply unit (PSU) with black metal casing, honeycomb ventilation grill, cooling fan, and bundled power cables, clean studio shot, neutral background.` | Karya Orisinal Pengembang |
| 15 | `assets/comp_charger_bad.jpg` | Simulator: Adaptor 10W (Pengecoh) | Google Imagen 3 | `Small white 10W USB mobile phone wall charger plug adapter with two metal prongs, isometric 3D render, clean isolated light background, tech icon for low power unsuitable adapter.` | Karya Orisinal Pengembang |
| 16 | `assets/trouble_screen_beep.jpg`| Kasus 1: Layar Blank & Beep Code | Google Imagen 3 | `Desktop computer monitor displaying a black screen with a floating No Signal warning message, connected to a modern PC tower with power LED on, alert sound waves icon, clean isometric 3D render, educational computer lab troubleshooting illustration.` | Karya Orisinal Pengembang |
| 17 | `assets/trouble_task_manager.jpg`| Kasus 2: Task Manager RAM 98% | Google Imagen 3 | `Computer desktop screen displaying a diagnostic Task Manager performance window, prominent red 98 percent RAM memory overload bar chart, clean modern UI graphics, isometric 3D render, computer troubleshooting educational illustration.` | Karya Orisinal Pengembang |

---

## 5. Transparansi Komponen Non-AI & Orisinalitas Vektor Interaktif

1. **Motherboard & Komponen Interaktif (Vektor SVG):**  
   Seluruh diagram visual pada papan sirkuit Motherboard ATX (`motherboard-atx.svg`), soket CPU, modul RAM DDR4 & DDR2, SSD NVMe M.2, dan kabel power dirancang menggunakan format grafis vektor SVG (*Scalable Vector Graphics*) demi presisi dimensi soket, notch konektor, dan fleksibilitas interaksi *drag-and-drop* tanpa distorsi piksel.
2. **Logo Lembaga & Identitas Resmi:**  
   Logo Kemendikdasmen RI (`kemendikdasmen lengkap.png`), Logo Sobat SMP 2025 (`Logo-Sobat-SMP-2025.png`), Logo Gerakan Pendidikan Bermutu, Logo Sekolah Ramah Anak, serta foto profil pengembang adalah materi resmi non-AI.

---

## 6. Dokumentasi Tipografi Terbuka & Efek Suara Prosedural

1. **Tipografi Offline:**  
   - Font **Fredoka** (Headings) — SIL OFL v1.1
   - Font **Nunito** (Body Text) — SIL OFL v1.1
   - Font **Poppins** (UI Navigation) — SIL OFL v1.1
   Semua font disimpan lokal pada direktori `assets/fonts/` tanpa ketergantungan Google Fonts CDN saat aplikasi dijalankan.
2. **Efek Suara Prosedural Native (Web Audio API):**  
   Seluruh efek suara umpan balik (klik tombol, sapuan kartu, kode BIOS POST beep, penanda kuis) dihasilkan melalui sintesis gelombang audio JavaScript (AudioContext) tanpa file MP3/WAV eksternal, menjamin kemandirian aplikasi 100% offline.

---

## 7. Pernyataan Bebas Hak Cipta Pihak Ketiga

Dengan ini saya menyatakan bahwa:
1. Seluruh materi modul, soal kuis, dan alur media pembelajaran interaktif disusun secara orisinal oleh pengembang.
2. Pemanfaatan AI generatif untuk video dan ilustrasi grafis dilakukan melalui instruksi prompt mandiri dan berlisensi komersial bebas royalti.
3. Media ini tidak mengambil atau menjiplak karya pihak lain, serta bebas dari unsur komersial maupun materi berbayar.

**Lamongan, Februari 2026**  
Pengembang Karya,  

**Ach. Chanifuddin Fanani, S.Pd.**  
NIP. 199108262020121007
