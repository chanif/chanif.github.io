/**
 * HOLO-RIG 3D // Lab Perakitan Komputer v2
 * Database Komponen 3D PC & Motherboard Lengkap (16 Komponen + 10 Langkah Perakitan)
 */

window.PC_COMPONENTS = [
    {
        id: 'motherboard',
        number: 1,
        name: 'Motherboard ATX (Papan Induk)',
        shortName: 'Motherboard ATX',
        category: 'motherboard-core',
        categoryLabel: 'Motherboard & Inti',
        slot: 'Form Factor ATX (305 × 244 mm)',
        badgeColor: '#00f0ff',
        icon: '🟩',
        homePos: [-0.52, 0.35, -0.25],
        explodeOffset: [-0.95, 0.0, 0.0],
        moboExplodeOffset: [0.0, 0.0, 0.0],
        labelLocal: [0.08, 1.45, 0.92],
        camTarget: [-0.2, 0.35, -0.15],
        camPos: [4.2, 1.1, 1.8],
        summary: 'Papan sirkuit cetak (PCB) multi-lapis yang menjadi tulang punggung komputer. Seluruh komponen—mulai dari CPU, RAM, SSD NVMe, GPU, hingga port I/O—terpasang dan saling bertukar data serta daya listrik melalui jalur tembaga (bus) di atas papan ini.',
        analogy: 'Bayangkan motherboard sebagai jaringan jalan tol dan gardu listrik sebuah kota cerdas. Tanpa jalan penghubung ini, gedung-gedung hebat seperti CPU, RAM, dan GPU tidak akan bisa berkomunikasi.',
        subParts: [
            { title: 'PCB Multi-Layer (6-8 Lapis Tembaga)', detail: 'Menghubungkan ribuan jalur sinyal berkecepatan tinggi sekaligus mencegah interferensi elektromagnetik.' },
            { title: 'Slot Ekspansi PCIe x16 & x1', detail: 'Jalur komunikasi serial berkecepatan tinggi untuk kartu grafis (GPU) dan kartu ekspansi tambahan.' },
            { title: 'Header Front Panel (JFP1) & Kipas', detail: 'Pin kecil untuk menghubungkan tombol Power, Reset, LED casing, dan kontrol PWM kipas.' },
            { title: 'Port SATA III (6 Gbps)', detail: 'Konektor di tepi kanan bawah papan untuk menghubungkan kabel data ke SSD 2.5" dan HDD 3.5".' }
        ],
        specs: {
            'Form Factor': 'Standard ATX (305 × 244 mm)',
            'Arsitektur PCB': '6-Layer Low-Loss Copper Traces',
            'Ekspansi PCIe': '1× PCIe 4.0 x16 (Reinforced), 2× PCIe 3.0 x1',
            'Konektivitas Internal': '4× DIMM DDR5, 2× M.2 NVMe, 4× SATA 6Gb/s'
        },
        connectedTo: ['cpu-socket', 'vrm-heatsink', 'ram', 'ssd-nvme', 'chipset', 'gpu', 'power-connectors'],
        assemblyTip: 'Selalu pasang 9 baut standoff kuningan di casing sesuai lubang ATX sebelum menempelkan motherboard agar bagian belakang PCB tidak korsleting dengan logam casing.',
        realPhoto: 'assets/photos/motherboard.webp',
        photoCaption: 'Foto motherboard ATX (ASUS ROG Strix) tampak atas dengan socket CPU LGA, slot RAM DDR, heatsink VRM, dan slot PCIe.',
        photoCredit: 'Foto: PantheraLeo1359531 (Wikimedia Commons, CC BY 4.0)'
    },
    {
        id: 'cpu-socket',
        number: 2,
        name: 'Socket CPU LGA 1700 & Pengunci ILM',
        shortName: 'Socket CPU',
        category: 'motherboard-core',
        categoryLabel: 'Motherboard & Inti',
        slot: 'LGA 1700 (Land Grid Array)',
        badgeColor: '#38bdf8',
        icon: '🔲',
        homePos: [-0.46, 0.95, -0.35],
        explodeOffset: [-0.15, 0.05, 0.0],
        moboExplodeOffset: [0.35, 0.0, 0.0],
        labelLocal: [0.08, 0.28, 0.0],
        camTarget: [-0.42, 0.95, -0.35],
        camPos: [1.65, 1.25, 0.45],
        summary: 'Dududukan mekanis dan elektris tempat prosesor ditancapkan. Pada tipe LGA (Land Grid Array), 1.700 pin emas halus berada di dalam socket motherboard untuk menyentuh pad kontak di bagian bawah CPU secara presisi.',
        analogy: 'Seperti stasiun dok presisi dengan ribuan jarum emas mikroskopis yang menghantarkan listrik dan miliaran instruksi per detik ke prosesor.',
        subParts: [
            { title: 'Array 1.700 Pin Emas (Gold Contacts)', detail: 'Pin pegas mikroskopis yang sangat sensitif; menyentuh pad bawah CPU tanpa perlu ditekan paksa.' },
            { title: 'ILM (Independent Loading Mechanism)', detail: 'Rangka penutup logam dan tuas pengunci baja untuk menekan CPU dengan tekanan merata.' },
            { title: 'Takik Penjajar (Alignment Key)', detail: 'Tonjolan kecil di sisi socket yang memastikan CPU tidak mungkin terpasang terbalik.' }
        ],
        specs: {
            'Tipe Socket': 'LGA 1700 (Pin di Motherboard)',
            'Jumlah Kontak': '1.700 Micro-Spring Gold Pins',
            'Mekanisme Pengunci': 'Stainless Steel ILM + Retention Lever',
            'Jalur Terhubung': 'Direct Memory Bus & PCIe Lanes ke CPU'
        },
        connectedTo: ['motherboard', 'cpu', 'vrm-heatsink', 'ram'],
        assemblyTip: 'Jangan pernah menyentuh pin emas di dalam socket dengan jari! Biarkan penutup plastik pelindung tetap terpasang sampai CPU benar-benar siap diturunkan.',
        realPhoto: 'assets/photos/cpu-socket.webp',
        photoCaption: 'Foto closeup socket CPU LGA 1700 asli lengkap dengan rangka pengunci baja ILM dan array ribuan pin kontak.',
        photoCredit: 'Foto: Jacek Halicki (Wikimedia Commons, CC BY-SA 4.0)'
    },
    {
        id: 'cpu',
        number: 3,
        name: 'Processor / CPU (Central Processing Unit)',
        shortName: 'Processor (CPU)',
        category: 'motherboard-core',
        categoryLabel: 'Motherboard & Inti',
        slot: 'Socket LGA 1700',
        badgeColor: '#22d3ee',
        icon: '🧠',
        homePos: [-0.41, 0.95, -0.35],
        explodeOffset: [1.35, 0.12, 0.0],
        moboExplodeOffset: [1.10, 0.05, 0.0],
        labelLocal: [0.06, 0.25, 0.0],
        camTarget: [-0.35, 0.95, -0.35],
        camPos: [1.85, 1.30, 0.55],
        summary: 'Otak utama sistem komputer yang menjalankan siklus instruksi Fetch–Decode–Execute. Terdiri atas Control Unit (CU) sebagai pengatur, Arithmetic Logic Unit (ALU) untuk perhitungan matematika/logika, Register, dan memori Cache berkecepatan ultra-tinggi.',
        analogy: 'Jika komputer adalah dapur restoran, CPU adalah Kepala Koki super cepat yang membaca resep (program), menghitung takaran (ALU), dan mengoordinasikan semua asisten.',
        subParts: [
            { title: 'IHS (Integrated Heat Spreader)', detail: 'Pelindung logam nikel-tembaga di bagian atas untuk meratakan panas dari chip silikon ke CPU cooler.' },
            { title: 'Silicon Die (Cores, ALU, CU & Cache)', detail: 'Miliaran transistor nanometer di balik IHS yang memproses instruksi biner.' },
            { title: 'Pad Kontak LGA Bawah & Segitiga Pin-1', detail: 'Tanda segitiga emas di pojok substrat PCB sebagai patokan arah pemasangan di socket.' }
        ],
        specs: {
            'Arsitektur': 'Hybrid Multi-Core (Performance + Efficiency Cores)',
            'Siklus Kerja': 'Fetch → Decode → Execute (GHz Clock)',
            'Cache Internal': 'L1 / L2 / L3 Smart Cache',
            'Konsumsi Daya': '65W – 125W TDP (Disuplai oleh VRM)'
        },
        connectedTo: ['cpu-socket', 'cpu-cooler', 'vrm-heatsink', 'ram', 'ssd-nvme', 'gpu'],
        assemblyTip: 'Sejajarkan tanda segitiga emas di pojok kiri bawah CPU dengan tanda segitiga pada socket. Turunkan secara vertikal tanpa menggesernya agar pin tidak bengkok.',
        realPhoto: 'assets/photos/cpu.webp',
        photoCaption: 'Foto prosesor asli Intel Core i7-12700K (Alder Lake, LGA 1700) memperlihatkan susunan ratusan pad kontak emas di sisi bawah PCB.',
        photoCredit: 'Foto: Eric Gaba (Wikimedia Commons, CC BY-SA 4.0)'
    },
    {
        id: 'cpu-cooler',
        number: 4,
        name: 'CPU Cooler (Heatsink Tower & Kipas PWM)',
        shortName: 'CPU Cooler',
        category: 'motherboard-core',
        categoryLabel: 'Motherboard & Inti',
        slot: 'Mounting Bracket LGA 1700 + Header CPU_FAN',
        badgeColor: '#06b6d4',
        icon: '❄️',
        homePos: [-0.08, 0.95, -0.35],
        explodeOffset: [2.85, 0.22, 0.0],
        moboExplodeOffset: [2.25, 0.15, 0.0],
        labelLocal: [0.35, 0.45, 0.0],
        camTarget: [0.05, 0.95, -0.35],
        camPos: [2.6, 1.6, 1.5],
        summary: 'Sistem pendingin aktif yang menyerap panas ekstrem dari Integrated Heat Spreader (IHS) CPU melalui pasta termal dan pipa tembaga (heatpipe), menyebarkannya ke sirip aluminium, lalu meniupkannya keluar menggunakan kipas PWM.',
        analogy: 'Seperti radiator pada mobil balap: tanpa pendingin ini, mesin CPU akan kepanasan (thermal throttling) hanya dalam beberapa detik dan sistem akan mati otomatis.',
        subParts: [
            { title: 'Copper Coldplate (Baseplate Tembaga)', detail: 'Menempel langsung di atas IHS CPU dengan lapisan tipis thermal paste untuk transfer panas maksimal.' },
            { title: '4× Heatpipe Tembaga Sintered', detail: 'Pipa berisi cairan penguap yang memindahkan panas sangat cepat dari dasar ke sirip radiator.' },
            { title: 'Fin Array & Kipas PWM 120mm ARGB', detail: 'Susunan sirip aluminium tipis + kipas 4-pin PWM yang kecepatannya otomatis naik saat suhu CPU meningkat.' }
        ],
        specs: {
            'Tipe Pendingin': 'Single-Tower 4-Heatpipe Air Cooler',
            'Konektor Daya': '4-Pin PWM (CPU_FAN) + 3-Pin 5V ARGB',
            'Kecepatan Kipas': '600 – 1.800 RPM (Kontrol Suhu Otomatis)',
            'Aliran Udara': 'Mendorong panas dari depan (+Z) ke belakang (-Z)'
        },
        connectedTo: ['cpu', 'motherboard', 'case-fans'],
        assemblyTip: 'Oleskan thermal paste seukuran biji kacang hijau di tengah IHS CPU, lepas stiker plastik bening di dasar cooler, lalu kencangkan baut secara menyilang agar tekanan rata.',
        realPhoto: 'assets/photos/cpu-cooler.webp',
        photoCaption: 'Foto CPU air cooler model tower (Jonsbo CR-1000 GT) dengan pipa tembaga (heatpipe), sirip aluminium, dan kipas 120 mm.',
        photoCredit: 'Foto: PantheraLeo1359531 (Wikimedia Commons, CC BY 4.0)'
    },
    {
        id: 'vrm-heatsink',
        number: 5,
        name: 'VRM (Voltage Regulator Module) & Heatsink',
        shortName: 'VRM & Heatsink',
        category: 'motherboard-core',
        categoryLabel: 'Motherboard & Inti',
        slot: 'Sekeliling Socket CPU (Atas & Kiri)',
        badgeColor: '#6366f1',
        icon: '🔋',
        homePos: [-0.36, 1.25, -0.68],
        explodeOffset: [1.10, 0.65, -0.50],
        moboExplodeOffset: [0.95, 0.50, -0.35],
        labelLocal: [0.15, 0.40, -0.22],
        camTarget: [-0.36, 1.25, -0.65],
        camPos: [2.0, 1.8, 0.6],
        summary: 'Modul pengatur tegangan yang mengubah arus 12V dari Power Supply (melalui konektor CPU EPS 8-pin) menjadi tegangan rendah yang sangat presisi (~1.1V–1.35V) namun berarus sangat besar untuk menyuplai CPU.',
        analogy: 'Ibarat gardu trafo PLN mini di sebelah rumah: menurunkan tegangan tinggi 12V menjadi tegangan aman yang mulus tanpa fluktuasi agar CPU bekerja stabil.',
        subParts: [
            { title: 'MOSFET / DrMOS Power Stages', detail: 'Sakelar transistor berkecepatan tinggi yang mengubah tegangan DC-to-DC; menghasilkan panas sehingga perlu heatsink.' },
            { title: 'Ferrite Choke (Induktor Kotak)', detail: 'Kumparan ferit yang menyaring riak arus listrik agar aliran ke CPU halus.' },
            { title: 'Solid State Capacitors & Heatsink Aluminium', detail: 'Kapasitor padat penyimpan muatan sesaat dan blok heatsink beralur untuk mendinginkan MOSFET.' }
        ],
        specs: {
            'Konfigurasi Fase': '12+1+1 Power Phase Design',
            'Konversi Tegangan': '12V DC Input → ~1.1V–1.35V Vcore CPU',
            'Komponen Inti': 'DrMOS + Ferrite Choke + 10K Solid Caps',
            'Pendinginan': 'Dual Anodized Aluminum Heatsink + Thermal Pad'
        },
        connectedTo: ['power-connectors', 'cpu-socket', 'cpu', 'motherboard'],
        assemblyTip: 'Jangan abaikan aliran udara di sekitar VRM heatsink. Pastikan kipas CPU atau kipas exhaust belakang tetap mengalirkan udara melewati sirip VRM.',
        realPhoto: 'assets/photos/vrm-heatsink.webp',
        photoCaption: 'Foto rangkaian VRM asli di sekitar socket CPU yang tersusun atas deretan induktor (choke), MOSFET, dan kapasitor padat.',
        photoCredit: 'Foto: StefanEnDev (Wikimedia Commons, CC0)'
    },
    {
        id: 'ram',
        number: 6,
        name: 'RAM DDR5 Dual-Channel (Random Access Memory)',
        shortName: 'RAM DDR5',
        category: 'motherboard-core',
        categoryLabel: 'Motherboard & Inti',
        slot: 'Slot DIMM A2 & B2 (288-Pin)',
        badgeColor: '#10b981',
        icon: '📏',
        homePos: [-0.32, 0.95, 0.34],
        explodeOffset: [1.75, 0.15, 0.65],
        moboExplodeOffset: [1.35, 0.10, 0.50],
        labelLocal: [0.18, 0.45, 0.05],
        camTarget: [-0.30, 0.95, 0.34],
        camPos: [2.1, 1.35, 1.55],
        summary: 'Memori kerja jangka pendek bersifat volatil (data hilang saat listrik padam). RAM menyimpan program dan data yang sedang aktif dibuka sehingga CPU dapat mengaksesnya jutaan kali lebih cepat dibanding mengambil dari SSD.',
        analogy: 'Seperti meja kerja di depan koki (CPU): semakin luas dan rapi meja RAM, semakin banyak bahan (aplikasi) yang bisa dikerjakan sekaligus tanpa bolak-balik ke gudang (SSD).',
        subParts: [
            { title: 'Chip IC DRAM & PMIC On-Module', detail: 'Keping silikon penyimpan bit data dalam kapasitor mikro serta pengatur daya bawaan DDR5.' },
            { title: 'Aluminum Heatspreader & ARGB Diffuser', detail: 'Pelat logam penyebar panas sekaligus strip cahaya sinkronisasi warna di tepi atas modul.' },
            { title: '288-Pin Gold Edge & Notch Asimetris', detail: 'Celah lekukan khusus di bagian bawah pin agar modul DDR5 tidak tertukar atau terpasang terbalik.' }
        ],
        specs: {
            'Kapasitas & Konfigurasi': '32 GB (2 × 16 GB) Dual-Channel (Slot A2/B2)',
            'Tipe & Kecepatan': 'DDR5-6000 MT/s (288-Pin DIMM)',
            'Sifat Memori': 'Volatil (Membutuhkan daya 1.1V terus-menerus)',
            'Bandwidth': 'Dual-Channel 128-bit bus langsung ke CPU'
        },
        connectedTo: ['cpu', 'motherboard', 'ssd-nvme'],
        assemblyTip: 'Untuk 2 keping RAM, pasang di slot ke-2 dan ke-4 (DIMM A2 & B2) dari arah CPU agar mode Dual-Channel aktif. Tekan kedua ujung hingga pengunci berbunyi "KLIK".',
        realPhoto: 'assets/photos/ram.webp',
        photoCaption: 'Foto modul memori RAM DDR5 dual-channel asli (Corsair Vengeance RGB) dengan heatspreader putih dan 288-pin emas.',
        photoCredit: 'Foto: Jacek Halicki (Wikimedia Commons, CC BY-SA 4.0)'
    },
    {
        id: 'ssd-nvme',
        number: 7,
        name: 'SSD NVMe M.2 PCIe 4.0',
        shortName: 'SSD NVMe M.2',
        category: 'motherboard-core',
        categoryLabel: 'Motherboard & Inti',
        slot: 'Slot M.2 Key-M (2280)',
        badgeColor: '#f59e0b',
        icon: '⚡',
        homePos: [-0.44, 0.24, -0.25],
        explodeOffset: [1.55, -0.05, 0.28],
        moboExplodeOffset: [1.20, -0.05, 0.22],
        labelLocal: [0.12, 0.14, 0.0],
        camTarget: [-0.40, 0.24, -0.25],
        camPos: [1.85, 0.55, 0.65],
        summary: 'Media penyimpanan permanen (non-volatil) berbentuk ringkas tanpa kabel yang langsung menancap ke slot M.2 motherboard. Menggunakan jalur PCIe 4.0 x4 langsung ke CPU sehingga proses booting OS dan loading aplikasi berlangsung dalam hitungan detik.',
        analogy: 'Lemari arsip digital super cepat yang menempel langsung di samping meja kerja (motherboard), bukan di gedung terpisah yang harus dihubungkan dengan kabel.',
        subParts: [
            { title: 'Controller NVMe & DRAM Cache', detail: 'Prosesor kecil di atas SSD yang mengatur pembacaan/penulisan data paralel ke chip memori.' },
            { title: '3D TLC NAND Flash Chips', detail: 'Chip memori non-volatil tempat sistem operasi, aplikasi, dan file tersimpan permanen meski listrik mati.' },
            { title: 'Heatsink Thermal Armor M.2', detail: 'Pelat pendingin aluminium dengan bantalan thermal pad agar controller SSD tidak kepanasan saat transfer data besar.' }
        ],
        specs: {
            'Form Factor': 'M.2 2280 (Lebar 22 mm × Panjang 80 mm)',
            'Antarmuka': 'NVMe 1.4 via PCIe 4.0 x4 (M-Key)',
            'Kecepatan Baca/Tulis': 'Hingga ~7.000 MB/s (12× lebih cepat dari SATA)',
            'Sifat Penyimpanan': 'Non-Volatil (Data tetap aman tanpa listrik)'
        },
        connectedTo: ['cpu', 'motherboard', 'ram'],
        assemblyTip: 'Masukkan SSD NVMe pada sudut ~30° ke konektor M.2 hingga pin emas masuk penuh, lalu tekan ujungnya ke standoff dan kunci dengan baut kecil M.2.',
        realPhoto: 'assets/photos/ssd-nvme.webp',
        photoCaption: 'Foto SSD NVMe M.2 2280 PCIe 4.0 asli (Samsung 980 PRO 1 TB) dengan chip NAND Flash dan konektor M-Key tanpa kabel.',
        photoCredit: 'Foto: D-Kuru (Wikimedia Commons, CC BY-SA 4.0)'
    },
    {
        id: 'chipset',
        number: 8,
        name: 'Chipset PCH (Platform Controller Hub)',
        shortName: 'Chipset PCH',
        category: 'motherboard-core',
        categoryLabel: 'Motherboard & Inti',
        slot: 'Terintegrasi di Sudut Kanan Bawah Motherboard',
        badgeColor: '#8b5cf6',
        icon: '🎛️',
        homePos: [-0.36, -0.55, 0.42],
        explodeOffset: [1.25, -0.42, 0.60],
        moboExplodeOffset: [1.05, -0.32, 0.48],
        labelLocal: [0.15, 0.24, 0.0],
        camTarget: [-0.35, -0.55, 0.42],
        camPos: [1.95, -0.35, 1.45],
        summary: 'Chip pengatur lalu lintas I/O sekunder (sering dikenal sebagai Southbridge modern). Chipset menghubungkan CPU dengan perangkat berkecepatan menengah seperti port SATA, USB, LAN, Wi-Fi, audio codec, serta slot ekspansi PCIe tambahan melalui jalur DMI.',
        analogy: 'Jika CPU adalah Direktur Utama, Chipset adalah Manajer Operasional yang menangani semua urusan port USB, hardisk SATA, jaringan LAN, dan audio agar CPU bisa fokus pada komputasi berat.',
        subParts: [
            { title: 'Silicon Chipset Die (PCH)', detail: 'Chip pengendali yang mengatur hub USB, controller SATA, dan jalur PCIe sekunder.' },
            { title: 'Heatsink Chipset Anodized', detail: 'Blok aluminium berdesain futuristik dengan aksen cahaya yang menyerap panas operasi PCH.' }
        ],
        specs: {
            'Link ke CPU': 'DMI 4.0 (Direct Media Interface)',
            'Port Dikelola': 'USB 3.2/2.0, SATA III, Gigabit LAN, Audio',
            'Jalur PCIe Tambahan': 'Up to 16× Chipset PCIe Lanes',
            'TDP Operasi': '~6W (Didinginkan Heatsink Pasif)'
        },
        connectedTo: ['motherboard', 'cpu', 'storage-sata', 'io-panel', 'cmos-bios'],
        assemblyTip: 'Driver chipset (Chipset INF) wajib diinstal setelah instalasi sistem operasi agar seluruh port USB, SATA, dan manajemen daya motherboard bekerja optimal.',
        realPhoto: 'assets/photos/chipset.webp',
        photoCaption: 'Foto blok heatsink chipset PCH pada motherboard yang melayani jalur SATA, USB, dan slot ekspansi PCIe.',
        photoCredit: 'Foto: TheStriker (Wikimedia Commons, CC BY-SA 4.0)'
    },
    {
        id: 'cmos-bios',
        number: 9,
        name: 'Baterai CMOS CR2032 & Chip BIOS/UEFI',
        shortName: 'CMOS & BIOS/UEFI',
        category: 'motherboard-core',
        categoryLabel: 'Motherboard & Inti',
        slot: 'Holder CR2032 + SPI Flash ROM',
        badgeColor: '#cbd5e1',
        icon: '🪙',
        homePos: [-0.45, -0.52, -0.38],
        explodeOffset: [1.05, -0.52, -0.15],
        moboExplodeOffset: [0.90, -0.40, -0.10],
        labelLocal: [0.10, 0.20, 0.0],
        camTarget: [-0.43, -0.52, -0.38],
        camPos: [1.55, -0.40, 0.45],
        summary: 'Kombinasi chip memori BIOS/UEFI (firmware pertama yang berjalan saat PC dinyalakan untuk mengecek hardware lewat POST) dan baterai kancing 3V CR2032 yang menjaga Real-Time Clock (jam sistem) serta pengaturan BIOS tetap tersimpan saat kabel listrik dicabut.',
        analogy: 'Baterai CMOS ibarat baterai jam tangan di dalam PC agar komputer tidak lupa tanggal dan settingan dasarnya meski listrik padam, sementara BIOS adalah buku panduan awal saat komputer bangun tidur.',
        subParts: [
            { title: 'Baterai Lithium CR2032 (3V)', detail: 'Menyuplai daya mikro ke chip RTC & CMOS RAM agar waktu sistem dan profil BIOS tidak tereset.' },
            { title: 'Chip SPI Flash ROM (UEFI BIOS)', detail: 'Menyimpan firmware UEFI yang menjalankan POST (Power-On Self-Test) sebelum memuat Windows/Linux.' }
        ],
        specs: {
            'Tegangan Baterai': '3.0V DC Lithium Coin Cell (CR2032)',
            'Fungsi Firmware': 'POST Hardware Check & Bootloader UEFI',
            'Kapasitas Flash': '256 Mb (32 MB) SPI NOR Flash',
            'Fitur Reset': 'Clear CMOS (Cabut baterai 5 menit / Jumper)'
        },
        connectedTo: ['motherboard', 'chipset', 'cpu'],
        assemblyTip: 'Jika salah mengatur overclocking RAM atau PC gagal tampil ke layar (No Display), cabut kabel PSU lalu lepas baterai CMOS selama 3–5 menit untuk mereset BIOS ke setelan pabrik.',
        realPhoto: 'assets/photos/cmos-bios.webp',
        photoCaption: 'Foto baterai kancing Lithium CR2032 3V terpasang pada holder motherboard untuk menjaga RTC dan konfigurasi BIOS/UEFI.',
        photoCredit: 'Foto: Kent Madsen (Wikimedia Commons, CC BY-SA 2.0)'
    },
    {
        id: 'io-panel',
        number: 10,
        name: 'Rear I/O Panel & Shield Motherboard',
        shortName: 'Rear I/O Panel',
        category: 'motherboard-core',
        categoryLabel: 'Motherboard & Inti',
        slot: 'Tepi Belakang Motherboard (-Z)',
        badgeColor: '#94a3b8',
        icon: '🔌',
        homePos: [-0.30, 0.90, -1.36],
        explodeOffset: [0.40, 0.25, -1.35],
        moboExplodeOffset: [0.35, 0.20, -1.05],
        labelLocal: [0.18, 0.45, -0.10],
        camTarget: [-0.28, 0.90, -1.32],
        camPos: [1.85, 1.30, -2.55],
        summary: 'Deretan port konektor eksternal yang terintegrasi langsung pada tepi belakang motherboard untuk menghubungkan komputer ke monitor (saat memakai iGPU), keyboard, mouse, flashdisk, kabel jaringan LAN, antena Wi-Fi, dan sistem audio.',
        analogy: 'Seperti pintu gerbang komunikasi luar kota: tempat masuk dan keluarnya segala perangkat eksternal dari dunia nyata ke dalam sistem komputer.',
        subParts: [
            { title: 'USB 3.2 Gen 2 Type-A & Type-C', detail: 'Port transfer data berkecepatan tinggi hingga 10–20 Gbps untuk perangkat eksternal dan periferal.' },
            { title: 'HDMI & DisplayPort (iGPU Output)', detail: 'Keluaran video khusus apabila menggunakan kartu grafis terintegrasi di dalam CPU.' },
            { title: 'RJ-45 2.5G LAN, Wi-Fi SMA & Audio 7.1', detail: 'Koneksi jaringan kabel/nirkabel serta jack 3.5mm untuk mikrofon, headphone, dan speaker.' }
        ],
        specs: {
            'Port USB': '4× USB 3.2 Type-A, 1× USB-C, 2× USB 2.0',
            'Jaringan': '2.5Gb Ethernet RJ-45 + Dual Wi-Fi 6E',
            'Display (iGPU)': '1× HDMI 2.1, 1× DisplayPort 1.4',
            'Audio': '3× Gold-Plated 3.5mm HD Audio Jacks'
        },
        connectedTo: ['motherboard', 'chipset', 'case-chassis'],
        assemblyTip: 'Perhatikan! Jika PC memakai kartu grafis dedicated (GPU), colokkan kabel monitor ke port di belakang GPU bagian bawah—BUKAN ke Rear I/O motherboard.',
        realPhoto: 'assets/photos/io-panel.webp',
        photoCaption: 'Foto panel Rear I/O motherboard asli berisi port HDMI, DisplayPort, USB 3.2/Type-C, LAN RJ-45, antena Wi-Fi, dan jack audio.',
        photoCredit: 'Foto: Jacek Halicki (Wikimedia Commons, CC BY-SA 4.0)'
    },
    {
        id: 'power-connectors',
        number: 11,
        name: 'Konektor Daya ATX 24-Pin & CPU EPS 8-Pin',
        shortName: 'Konektor Daya (24/8-Pin)',
        category: 'motherboard-core',
        categoryLabel: 'Motherboard & Inti',
        slot: 'Tepi Kanan (24-Pin) & Pojok Kiri Atas (8-Pin)',
        badgeColor: '#ef4444',
        icon: '⚡',
        homePos: [-0.42, 0.65, 0.85],
        explodeOffset: [1.10, 0.25, 0.85],
        moboExplodeOffset: [0.90, 0.20, 0.65],
        labelLocal: [0.15, 0.35, 0.08],
        camTarget: [-0.38, 0.85, 0.55],
        camPos: [2.25, 1.25, 1.65],
        summary: 'Dua soket utama penerima pasokan daya DC dari Power Supply Unit (PSU). Soket ATX 24-Pin menyalurkan arus 3.3V, 5V, dan 12V untuk seluruh sirkuit motherboard, sedangkan soket EPS 8-Pin di pojok atas khusus memasok daya 12V murni bagi CPU melalui VRM.',
        analogy: 'Sekering utama dan kabel induk listrik gedung: tanpa kedua konektor ini terpasang rapat, kipas tidak akan berputar dan sistem tidak dapat menyala.',
        subParts: [
            { title: 'Socket ATX 24-Pin Main Power', detail: 'Terletak di tepi kanan motherboard (dekat slot RAM) untuk suplai daya papan induk, slot PCIe, dan sinyal Power-On.' },
            { title: 'Socket CPU EPS 8-Pin (4+4 Pin)', detail: 'Terletak di pojok kiri atas dekat VRM heatsink khusus memasok daya tinggi ke prosesor.' }
        ],
        specs: {
            'Main Power': '24-Pin ATX (3.3V, 5V, 12V, +5VSB, PS_ON)',
            'CPU Power': '8-Pin EPS12V (Hingga ~300W @ 12V)',
            'Pengaman Mekanis': 'Klip pengait plastik & bentuk pin trapesium/persegi',
            'Sumber Daya': 'Terhubung langsung ke modul PSU'
        },
        connectedTo: ['psu', 'motherboard', 'vrm-heatsink'],
        assemblyTip: 'Kesalahan pemula paling sering: lupa mencolokkan kabel CPU 8-Pin di pojok kiri atas motherboard! Akibatnya kipas menyala namun layar tetap gelap (No POST).',
        realPhoto: 'assets/photos/power-connectors.webp',
        photoCaption: 'Foto closeup soket daya utama ATX 24-Pin asli di tepi motherboard lengkap dengan pengait pengunci kabel PSU.',
        photoCredit: 'Foto: Jacek Halicki (Wikimedia Commons, CC BY-SA 4.0)'
    },
    {
        id: 'gpu',
        number: 12,
        name: 'Kartu Grafis / GPU (Graphics Processing Unit)',
        shortName: 'GPU (VGA Card)',
        category: 'expansion-cooling',
        categoryLabel: 'Ekspansi & Casing',
        slot: 'Slot PCIe 4.0 x16 + Kabel Daya PCIe',
        badgeColor: '#a855f7',
        icon: '🎮',
        homePos: [0.18, -0.12, -0.30],
        explodeOffset: [2.45, -0.58, 0.12],
        moboExplodeOffset: [1.95, -0.45, 0.05],
        labelLocal: [0.55, 0.25, 0.15],
        camTarget: [0.15, -0.12, -0.25],
        camPos: [3.2, 0.7, 1.9],
        summary: 'Prosesor khusus pemrosesan grafis dan komputasi paralel masif (ribuan shader/CUDA core & Tensor core) dengan memori VRAM GDDR6X terdedikasi. Mengolah tampilan 3D, rendering video, simulasi fisika, hingga akselerasi AI sebelum dikirim ke monitor.',
        analogy: 'Jika CPU adalah seorang profesor jenius yang memecahkan soal rumit satu per satu, GPU adalah ribuan pelukis yang bekerja serentak melukis jutaan piksel layar setiap detik.',
        subParts: [
            { title: 'Die GPU & Memori VRAM GDDR6X', detail: 'Chip inti pemroses grafis di tengah PCB yang dikelilingi modul VRAM berkecepatan ultra-tinggi.' },
            { title: 'Triple-Fan Cooler & Fin Array', detail: 'Tiga kipas aksial dan heatsink pipa tembaga tebal untuk membuang panas hingga 250W+.' },
            { title: 'Metal Backplate & Konektor Daya 12VHPWR', detail: 'Pelat pelindung belakang anti-lentur (anti-sag) serta port suplai daya tambahan dari PSU.' },
            { title: 'DisplayPort & HDMI Output Bracket', detail: 'Bracket logam di belakang casing tempat kabel monitor ditancapkan.' }
        ],
        specs: {
            'Slot Interface': 'PCI Express 4.0 x16',
            'Memori Video': '12 GB – 16 GB GDDR6X (High-Bandwidth)',
            'Konsumsi Daya': '200W – 320W (Slot PCIe 75W + Kabel PSU)',
            'Output Layar': '3× DisplayPort 1.4a, 1× HDMI 2.1'
        },
        connectedTo: ['motherboard', 'cpu', 'psu', 'case-chassis'],
        assemblyTip: 'Buka pengait (latch) di ujung slot PCIe x16 sebelum menekan GPU masuk. Jangan lupa pasang baut bracket di casing belakang dan colokkan kabel daya PCIe dari PSU!',
        realPhoto: 'assets/photos/gpu.webp',
        photoCaption: 'Foto kartu grafis dedicated asli (MSI GeForce RTX 3070 Ventus 3X) dengan sistem pendingin tiga kipas dan antarmuka PCIe x16.',
        photoCredit: 'Foto: TheStriker (Wikimedia Commons, CC BY 4.0)'
    },
    {
        id: 'case-chassis',
        number: 13,
        name: 'Casing PC Mid-Tower & Tempered Glass',
        shortName: 'Casing & Glass Panel',
        category: 'expansion-cooling',
        categoryLabel: 'Ekspansi & Casing',
        slot: 'Rangka Struktural ATX Mid-Tower',
        badgeColor: '#64748b',
        icon: '🖥️',
        homePos: [0.0, 0.0, 0.0],
        explodeOffset: [-1.15, 0.0, 0.0],
        moboExplodeOffset: [-1.45, 0.0, 0.0],
        labelLocal: [1.28, 1.95, 1.85],
        camTarget: [0.0, 0.1, 0.1],
        camPos: [6.4, 3.1, 6.2],
        summary: 'Rangka baja pelindung seluruh komponen internal dari benturan fisik, debu, dan gangguan elektromagnetik sekaligus membentuk terowongan aliran udara (airflow). Dilengkapi PSU shroud terpisah untuk manajemen kabel rapi dan panel samping Tempered Glass.',
        analogy: 'Ibarat bodi mobil dan rumah kaca pamer: melindungi mesin berharga di dalamnya, mengatur arah angin pendinginan, dan memperlihatkan estetika komponen di dalam.',
        subParts: [
            { title: 'Motherboard Tray & Cable Grommets', detail: 'Pelat dudukan standoff motherboard berlubang karet agar kabel PSU rapi tersembunyi di belakang.' },
            { title: 'Tempered Glass Side Panel', detail: 'Kaca pengaman transparan di sisi kiri agar kondisi komponen, indikator debug LED, dan kipas mudah dipantau.' },
            { title: 'PSU Shroud & Mesh Airflow Front/Top', detail: 'Kompartemen bawah penutup PSU + HDD serta panel jaring penyaring debu di depan dan atas.' }
        ],
        specs: {
            'Kompatibilitas': 'ATX / Micro-ATX / Mini-ITX',
            'Material': '0.8mm SGCC Steel + 4mm Tempered Glass',
            'Ruang Komponen': 'GPU hingga 360mm, Cooler hingga 165mm',
            'Front I/O Atas': 'Power Button, USB 3.0, USB-C, Audio Combo'
        },
        connectedTo: ['motherboard', 'case-fans', 'psu', 'io-panel', 'gpu'],
        assemblyTip: 'Selalu lepaskan panel samping Tempered Glass dengan hati-hati dan letakkan di permukaan empuk (bukan lantai keramik keras) sebelum merakit motherboard ke dalam casing.',
        realPhoto: 'assets/photos/case-chassis.webp',
        photoCaption: 'Foto casing PC Mid-Tower asli (Kolink Observatory) dengan panel kaca tempered dan ventilasi aliran udara depan.',
        photoCredit: 'Foto: PantheraLeo1359531 (Wikimedia Commons, CC BY 4.0)'
    },
    {
        id: 'psu',
        number: 14,
        name: 'Power Supply Unit (PSU 850W Modular)',
        shortName: 'Power Supply (PSU)',
        category: 'expansion-cooling',
        categoryLabel: 'Ekspansi & Casing',
        slot: 'Kompartemen Bawah Belakang Casing',
        badgeColor: '#eab308',
        icon: '🔌',
        homePos: [-0.10, -1.68, -1.05],
        explodeOffset: [-0.30, -1.25, -1.45],
        moboExplodeOffset: [-0.35, -1.10, -1.25],
        labelLocal: [0.75, 0.30, 0.25],
        camTarget: [-0.10, -1.65, -1.05],
        camPos: [2.6, -0.7, -2.5],
        summary: 'Jantung kelistrikan komputer yang mengubah arus bolak-balik (AC 220V) dari stopkontak PLN menjadi arus searah (DC) bertegangan rendah yang stabil (+12V, +5V, +3.3V) dengan proteksi terhadap lonjakan listrik dan korsleting.',
        analogy: 'Seperti jantung dan pembangkit listrik pribadi: menyaring tegangan listrik rumah yang kasar lalu memompa energi bersih terukur ke setiap organ komputer.',
        subParts: [
            { title: 'Sirkuit Converter AC-to-DC & Kapasitor Utama', detail: 'Mengubah tegangan 220V AC menjadi jalur DC stabil dengan efisiensi sertifikasi 80+ Gold.' },
            { title: 'Panel Output Full-Modular', detail: 'Soket kabel lepas-pasang khusus ATX 24-pin, CPU 8-pin, PCIe GPU, dan SATA agar casing bebas kabel berlebih.' },
            { title: 'Kipas Pendingin 135mm & Sakelar Utama AC', detail: 'Menjaga suhu komponen daya tetap dingin serta sakelar I/O di bagian belakang.' }
        ],
        specs: {
            'Kapasitas Daya': '850 Watt (Continuous Output)',
            'Efisiensi': '80 PLUS Gold (~90% Efficiency)',
            'Jalur Tegangan DC': '+12V (70.8A), +5V (20A), +3.3V (20A)',
            'Proteksi': 'OVP, UVP, OCP, OPP, SCP, OTP'
        },
        connectedTo: ['power-connectors', 'gpu', 'storage-sata', 'case-chassis'],
        assemblyTip: 'Pasang PSU dengan kipas menghadap ke bawah (ke lubang filter debu dasar casing) agar menghisap udara dingin dari luar. Gunakan hanya kabel modular bawaan asli PSU tersebut!',
        realPhoto: 'assets/photos/psu.webp',
        photoCaption: 'Foto Power Supply Unit (PSU) ATX full-modular asli yang menampilkan soket kabel terlabel dan bundel kabel daya modular.',
        photoCredit: 'Foto: Project Kei (Wikimedia Commons, CC BY-SA 4.0)'
    },
    {
        id: 'storage-sata',
        number: 15,
        name: 'Storage SATA III (SSD 2.5" & HDD 3.5")',
        shortName: 'Storage SATA (SSD/HDD)',
        category: 'expansion-cooling',
        categoryLabel: 'Ekspansi & Casing',
        slot: 'Drive Bay Bawah + Kabel Data SATA ke Motherboard',
        badgeColor: '#f97316',
        icon: '💽',
        homePos: [-0.15, -1.65, 1.25],
        explodeOffset: [0.40, -1.15, 1.55],
        moboExplodeOffset: [0.40, -1.00, 1.35],
        labelLocal: [0.65, 0.35, 0.25],
        camTarget: [-0.15, -1.65, 1.25],
        camPos: [2.7, -0.8, 2.8],
        summary: 'Media penyimpanan massal sekunder berkapasitas besar (terabyte) untuk mengarsipkan dokumen, video, proyek, dan cadangan sistem. Berbeda dengan NVMe M.2, drive SATA dipasang pada rak casing dan terhubung memakai kabel data SATA ke motherboard serta kabel daya SATA dari PSU.',
        analogy: 'Gudang arsip besar di lantai bawah bangunan: kapasitasnya sangat luas dan ekonomis untuk menyimpan koleksi data jangka panjang.',
        subParts: [
            { title: 'HDD 3.5" (Hard Disk Drive Magnetik)', detail: 'Menggunakan piringan cakram berputar (7200 RPM) & lengan baca magnetik; unggul dalam kapasitas besar.' },
            { title: 'SSD 2.5" SATA (Solid State Drive)', detail: 'Penyimpanan berbasis chip NAND flash tanpa bagian bergerak; jauh lebih cepat dan tahan guncangan dibanding HDD.' },
            { title: 'Konektor SATA Data (7-Pin) & Power (15-Pin)', detail: 'Dua konektor berbentuk huruf "L" untuk komunikasi data ke Chipset motherboard dan daya dari PSU.' }
        ],
        specs: {
            'Antarmuka': 'SATA III (Serial ATA Revision 3.0)',
            'Kecepatan Maks': '6 Gbps (~550 MB/s SSD SATA, ~180 MB/s HDD)',
            'Kabel Dibutuhkan': '1× Kabel Data SATA (ke Mobo) + 1× SATA Power (PSU)',
            'Kapasitas Umum': '1 TB SSD 2.5" + 2 TB HDD 3.5"'
        },
        connectedTo: ['chipset', 'motherboard', 'psu', 'case-chassis'],
        assemblyTip: 'Drive SATA membutuhkan DUA kabel sekaligus agar terdeteksi di BIOS: kabel data tipis (ke port SATA motherboard) dan kabel daya lebar (dari PSU).',
        realPhoto: 'assets/photos/storage-sata.webp',
        photoCaption: 'Perbandingan dua perangkat SATA III asli: kiri SSD 2.5" SATA (Samsung 870 QVO), kanan cakram magnetik HDD 3.5" desktop.',
        photoCredit: 'Foto komposit: Dinkun Chen (CC BY-SA 4.0) & Evan-Amos (CC BY-SA 3.0)'
    },
    {
        id: 'case-fans',
        number: 16,
        name: 'Sistem Kipas Casing ARGB (Intake & Exhaust)',
        shortName: 'Kipas Airflow ARGB',
        category: 'expansion-cooling',
        categoryLabel: 'Ekspansi & Casing',
        slot: '3× Depan (Intake) & 1× Belakang (Exhaust)',
        badgeColor: '#00f0ff',
        icon: '🌀',
        homePos: [0.18, 0.65, 0.25],
        explodeOffset: [0.0, 0.10, 1.80],
        moboExplodeOffset: [0.0, 0.10, 1.60],
        labelLocal: [0.22, 1.15, 2.02],
        camTarget: [0.15, 0.55, 0.45],
        camPos: [5.5, 2.2, 4.8],
        summary: 'Sistem sirkulasi udara terarah di dalam casing. Tiga kipas depan (Intake) menarik udara sejuk dari luar melewati GPU, RAM, dan CPU Cooler, sementara satu kipas belakang (Exhaust) menyedot udara panas keluar dari casing.',
        analogy: 'Sistem ventilasi terowongan angin: udara segar terus masuk dari depan dan udara panas langsung dibuang lewat belakang agar suhu internal tidak terperangkap.',
        subParts: [
            { title: '3× Kipas Front Intake (120mm ARGB)', detail: 'Menghisap udara sejuk dari panel depan menuju motherboard dan GPU (tekanan positif anti-debu).' },
            { title: '1× Kipas Rear Exhaust (120mm ARGB)', detail: 'Terpasang di belakang sejajar CPU Cooler untuk langsung membuang hawa panas keluar casing.' },
            { title: 'Cincin Difuser ARGB 5V', detail: 'LED addressable yang menyala serempak dan dapat diatur polanya melalui software motherboard.' }
        ],
        specs: {
            'Konfigurasi': '3× Intake Depan + 1× Exhaust Belakang (Positive Pressure)',
            'Ukuran': '4 × 120mm High-Static Pressure PWM',
            'Kecepatan': '800 – 1.600 RPM (Low Noise ~24 dBA)',
            'Arah Aliran': 'Depan (+Z) → Belakang (-Z) & Atas (+Y)'
        },
        connectedTo: ['case-chassis', 'cpu-cooler', 'gpu', 'motherboard'],
        assemblyTip: 'Ingat aturan arah angin kipas standar: sisi depan yang terbuka (logo stiker rapi) adalah sisi HISAP (Intake), sedangkan sisi rangka penopang kabel di belakang adalah sisi TIUP (Exhaust).',
        realPhoto: 'assets/photos/case-fans.webp',
        photoCaption: 'Foto kipas casing PC 120 mm asli (Corsair) dengan desain bilah terarah untuk menjaga sirkulasi airflow dalam casing.',
        photoCredit: 'Foto: Eric Chan (Wikimedia Commons, CC BY 2.0)'
    }
];

window.ASSEMBLY_STEPS = [
    {
        step: 1,
        targetId: 'motherboard',
        title: 'Siapkan Motherboard ATX',
        instruction: 'Tempatkan Motherboard ATX di meja kerja (atau sejajarkan di atas standoff casing). Motherboard adalah fondasi seluruh komponen.'
    },
    {
        step: 2,
        targetId: 'cpu-socket',
        title: 'Buka Tuas Socket LGA 1700',
        instruction: 'Angkat tuas pengunci baja (ILM) pada socket CPU motherboard sebelum meletakkan prosesor.'
    },
    {
        step: 3,
        targetId: 'cpu',
        title: 'Pasang Processor (CPU)',
        instruction: 'Sejajarkan tanda segitiga emas CPU pada socket, turunkan perlahan secara tegak lurus, lalu kunci kembali rangka ILM.'
    },
    {
        step: 4,
        targetId: 'ssd-nvme',
        title: 'Pasang SSD NVMe M.2',
        instruction: 'Masukkan keping SSD NVMe ke slot M.2 Key-M motherboard dan kunci dengan heatsink thermal armornya.'
    },
    {
        step: 5,
        targetId: 'ram',
        title: 'Pasang RAM DDR5 Dual-Channel',
        instruction: 'Tancapkan dua keping RAM DDR5 ke slot DIMM A2 dan B2 hingga klip pengunci di kedua ujung berbunyi klik.'
    },
    {
        step: 6,
        targetId: 'cpu-cooler',
        title: 'Pasang CPU Cooler',
        instruction: 'Setelah pasta termal dioleskan di atas CPU, pasang tower heatsink & kipas PWM di atas CPU lalu hubungkan ke header CPU_FAN.'
    },
    {
        step: 7,
        targetId: 'case-chassis',
        title: 'Masukkan Rakitan ke Casing ATX & Pasang Kipas',
        instruction: 'Pasang motherboard ke dalam rangka Casing Mid-Tower bersama sistem kipas Intake & Exhaust.'
    },
    {
        step: 8,
        targetId: 'psu',
        title: 'Pasang Power Supply Unit (PSU)',
        instruction: 'Tempatkan PSU 850W di kompartemen bawah belakang casing dan siapkan jalur kabel modularnya.'
    },
    {
        step: 9,
        targetId: 'power-connectors',
        title: 'Hubungkan Daya Motherboard & Storage SATA',
        instruction: 'Colokkan konektor ATX 24-Pin, CPU EPS 8-Pin ke motherboard, serta drive Storage SATA di bay bawah.'
    },
    {
        step: 10,
        targetId: 'gpu',
        title: 'Pasang Kartu Grafis (GPU) & Uji POST Boot!',
        instruction: 'Pasang GPU ke slot PCIe 4.0 x16, tutup panel kaca Tempered Glass, dan sistem siap dinyalakan!'
    }
];
