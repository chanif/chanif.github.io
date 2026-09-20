/**
 * ============================================================
 * LAB MAYA — KONFIGURASI & DATA
 * Lab Perakitan Komputer — Simulasi Virtual Interaktif
 * Festival Biru Putih 2026 · Kategori Lab Maya
 * ============================================================
 */

window.LAB_CONFIG = {
  // ── Mode Testing ──
  is_testing: 1,

  // ── Metadata ──
  meta: {
    title: 'Lab Perakitan Komputer',
    subtitle: 'Simulasi Virtual Interaktif',
    tagline: 'Rakit, uji, dan pahami cara kerja komputer dari dalam!',
    subject: 'Informatika',
    grade: 'Fase D',
    phase: 'Fase D',
    element_cp: 'Sistem Komputer (SK)',
    tujuan_pembelajaran: [
      'Peserta didik memahami fungsi dan peran komponen utama komputer (CPU, RAM, penyimpanan, GPU, PSU, motherboard) dan mampu merakit sistem komputer secara virtual.',
      'Peserta didik memahami sistem bilangan biner sebagai dasar representasi data dalam komputer.',
      'Peserta didik memahami bagaimana komputer merepresentasikan warna menggunakan model RGB.',
    ],
    author: 'Ach. Chanifuddin Fanani, S.Pd.',
    institution: 'SMP Negeri 2 Lamongan',
    year: 2026,
  },

  // ── Logo Resmi ──
  logos: {
    footer_logos: [
      'assets/Logo Tutwuri Kemendikdasmen.png',
      'assets/Logo-Sobat-SMP-2025.png',
      'assets/Logo Pendidikan Bermutu.png',
      'assets/Logo Ramah.png',
    ],
  },

  assets: {
    dev_photo: 'assets/fanani.jpg',
  },

  // ── Halaman SPA ──
  pages: [
    'cover', 'teori', 'prosedur', 'simulasi-menu',
    'sim-rakit-pc', 'eksplorasi', 'sim-binary', 'sim-rgb',
    'lkpd', 'lkpd-hasil',
    'pengembang', 'referensi'
  ],

  pageLabels: {
    'cover':          'Laman Muka',
    'teori':          'Teori',
    'prosedur':       'Prosedur',
    'simulasi-menu':  'Menu Simulasi',
    'sim-rakit-pc':   'Simulasi: Rakit PC',
    'eksplorasi':     'Eksplorasi Digital',
    'sim-binary':     'Simulasi: Biner',
    'sim-rgb':        'Simulasi: Warna RGB',
    'lkpd':           'LKPD',
    'lkpd-hasil':     'Hasil LKPD',
    'pengembang':     'Pengembang',
    'referensi':      'Referensi',
  },

  // Navigasi: urutan prev/next (simulasi bisa diakses dari menu)
  linearNav: [
    'cover', 'teori', 'prosedur', 'simulasi-menu',
    'lkpd', 'lkpd-hasil', 'pengembang', 'referensi'
  ],

  // ── Progress indicator dots (7 titik utama) ──
  progressDots: [
    { id: 'cover', label: 'Muka', icon: '🏠' },
    { id: 'teori', label: 'Teori', icon: '📖' },
    { id: 'prosedur', label: 'Prosedur', icon: '📋' },
    { id: 'simulasi-menu', label: 'Simulasi', icon: '🔬' },
    { id: 'lkpd', label: 'LKPD', icon: '📝' },
    { id: 'pengembang', label: 'Pengembang', icon: '👤' },
    { id: 'referensi', label: 'Referensi', icon: '📚' },
  ],

  // ── Komponen PC ──
  components: [
    {
      id: 'cpu',
      name: 'CPU (Prosesor)',
      shortName: 'CPU',
      role: 'Otak Komputer',
      icon: '🧠',
      svg: 'assets/images/component-cpu.svg',
      coolerSvg: 'assets/images/component-cooler.svg',
      slotId: 'slot-cpu',
      color: '#00D4FF',
      description: 'Otak komputer — memproses semua instruksi dan perhitungan matematika.',
      analogy: 'Seperti otak manusia yang berpikir, menghitung, dan memberi perintah.',
      details: 'CPU (Central Processing Unit) berisi ALU (Arithmetic Logic Unit) untuk perhitungan matematika, Control Unit untuk mengendalikan aliran data, dan Cache super cepat. CPU modern punya miliaran transistor dalam chip sekecil kuku jari.',
      funFact: 'CPU laptop setebal koin dan berisi lebih dari 10 miliar transistor — lebih banyak dari jumlah manusia di bumi!',
      techSpec: 'Processor Octa-Core · 8C/16T · 3.60GHz · Socket LGA',
    },
    {
      id: 'ram',
      name: 'RAM (Memori Kerja)',
      shortName: 'RAM',
      role: 'Meja Kerja Cepat',
      icon: '⚡',
      svg: 'assets/images/component-ram.svg',
      installedSvg: 'assets/images/component-ram-installed.svg',
      slotId: 'slot-ram',
      color: '#10B981',
      description: 'Memori kerja sementara — menyimpan data aplikasi yang sedang aktif dibuka.',
      analogy: 'Seperti meja belajar — semakin luas meja, semakin banyak buku/aplikasi yang bisa dibuka bersamaan tanpa bertumpuk.',
      details: 'RAM (Random Access Memory) adalah memori volatil — datanya hilang saat komputer dimatikan. RAM menyimpan data dalam bilangan biner (0 dan 1). Semakin besar RAM, semakin lancar multitasking tanpa macet.',
      funFact: 'RAM 8GB punya sekitar 68 miliar sakelar biner mikro yang bisa menyala atau padam seketika!',
      techSpec: 'DDR4 High-Speed 8GB · 3200MHz · Dual Channel',
    },
    {
      id: 'ssd',
      name: 'SSD (Penyimpanan)',
      shortName: 'SSD',
      role: 'Lemari Arsip Permanen',
      icon: '💾',
      svg: 'assets/images/component-ssd.svg',
      slotId: 'slot-storage',
      color: '#F59E0B',
      description: 'Penyimpanan data permanen — menyimpan file, aplikasi, dan sistem operasi.',
      analogy: 'Seperti lemari arsip — semua berkas tetap tersimpan rapi dan aman meskipun komputer dimatikan.',
      details: 'SSD (Solid State Drive) adalah media penyimpanan non-volatil yang sangat cepat berbasis flash memory tanpa piringan berputar, sehingga tahan guncangan, sunyi, dan hemat daya.',
      funFact: 'SSD membaca data hingga 100× lebih cepat dari HDD piringan lama — seperti mobil balap vs sepeda ontel!',
      techSpec: 'NVMe M.2 2280 · 512GB PCIe Gen4 (7000 MB/s)',
    },
    {
      id: 'gpu',
      name: 'GPU (Kartu Grafis)',
      shortName: 'GPU',
      role: 'Pelukis Gambar Layar',
      icon: '🎮',
      svg: 'assets/images/component-gpu.svg',
      installedSvg: 'assets/images/component-gpu-installed.svg',
      slotId: 'slot-gpu',
      color: '#8B5CF6',
      description: 'Pemroses grafis & visual — menghitung jutaan warna piksel untuk monitor.',
      analogy: 'Seperti pelukis kilat yang mampu menggambar dan mewarnai jutaan titik piksel setiap detik.',
      details: 'GPU (Graphics Processing Unit) dirancang khusus untuk mengolah grafis 3D, efek video, dan visual monitor. GPU memiliki ribuan inti pemroses yang menghitung nilai warna RGB (Red, Green, Blue) secara paralel 60-144 kali per detik.',
      funFact: 'GPU modern menghitung warna untuk 8 juta piksel monitor 4K sebanyak 60 kali per detik tanpa henti!',
      techSpec: 'Dedicated Graphics Card · 8GB GDDR6 · Dual Fan Cooling',
    },
    {
      id: 'psu',
      name: 'PSU (Catu Daya)',
      shortName: 'PSU',
      role: 'Jantung Daya Listrik',
      icon: '🔌',
      svg: 'assets/images/component-psu.svg',
      installedSvg: 'assets/images/component-psu-installed.svg',
      slotId: 'slot-psu',
      color: '#EF4444',
      description: 'Pemasok energi listrik — mengubah arus listrik AC rumah menjadi DC stabil.',
      analogy: 'Seperti jantung manusia yang memompa darah (listrik) ke seluruh organ tubuh (komponen PC).',
      details: 'PSU (Power Supply Unit) mengubah arus bolak-balik AC (220V dari stopkontak) menjadi arus searah DC (12V, 5V, 3.3V) yang aman untuk sirkuit motherboard dan komponen sensitif.',
      funFact: 'Sertifikasi 80 Plus Gold pada PSU membuktikan efisiensi di atas 90%, sehingga sedikit sekali daya yang terbuang jadi panas!',
      techSpec: 'ATX 650W Full Modular · 80+ Gold Certified',
    },
    {
      id: 'ram_ddr2',
      name: 'RAM DDR2 1GB (Legacy)',
      shortName: 'RAM DDR2',
      role: 'Pengecoh (Tak Cocok)',
      icon: '⚡',
      svg: 'assets/images/component-ram-ddr2.svg',
      installedSvg: 'assets/images/component-ram-ddr2-installed.svg',
      slotId: null,
      isDistractor: true,
      color: '#ef4444',
      description: 'RAM generasi lama (DDR2). Posisi lekukan/notch pin berbeda dan tidak cocok dengan slot DDR4 motherboard modern.',
      analogy: 'Seperti mencoba memasukkan kunci rumah lama ke pintu rumah baru yang lekukannya berbeda sama sekali.',
      details: 'RAM DDR2 memiliki lekukan pin tepat di bagian tengah (x=175) dan beroperasi pada voltase 1.8V. Slot motherboard modern adalah DDR4 dengan lekukan offset (x=135) dan voltase 1.2V. Memaksanya masuk akan merusak pin motherboard.',
      funFact: 'DDR2 diperkenalkan tahun 2004 dan kecepatannya maksimal hanya 800MHz — sangat lambat dibanding DDR4 3200MHz!',
      techSpec: 'Legacy DDR2 1GB · 800MHz · CL5 · 1.8V (NOTCH TENGAH)',
      errorMsg: 'RAM DDR2 tidak kompatibel dengan Motherboard DDR4! Notch pin berbeda dan voltase tidak sesuai.',
    },
    {
      id: 'hdd_ide',
      name: 'Harddisk IDE PATA 3.5"',
      shortName: 'HDD IDE 40P',
      role: 'Pengecoh (Tak Cocok)',
      icon: '💾',
      svg: 'assets/images/component-hdd-ide.svg',
      slotId: null,
      isDistractor: true,
      color: '#ef4444',
      description: 'Harddisk lawas berkapasitas 80GB dengan kabel pita lebar 40-pin Parallel ATA. Motherboard modern tidak memiliki port IDE!',
      analogy: 'Seperti kaset pita pita hitam kuno yang tidak bisa dimasukkan ke colokan flashdisk komputer modern.',
      details: 'Harddisk IDE (PATA) memerlukan kabel pita 40-pin yang tebal dan soket pita kuno. Motherboard ATX modern sudah beralih ke slot M.2 NVMe PCIe dan port SATA yang jauh lebih ringkas dan berkecepatan tinggi.',
      funFact: 'Kabel pita IDE 40-pin zaman dulu selebar 5 sentimeter dan sering menghambat aliran sirkulasi udara di dalam casing PC!',
      techSpec: '80GB PATA/IDE 3.5" · 7200 RPM · Header Pita 40-Pin',
      errorMsg: 'Motherboard modern tidak memiliki konektor pita IDE 40-pin! Komponen ini tidak bisa digunakan.',
    },
    {
      id: 'cooler_fan',
      name: 'Cooler Fan 120mm',
      shortName: 'Fan Extra',
      role: 'Pengecoh (Pelengkap)',
      icon: '🌀',
      svg: 'assets/images/component-cooler.svg',
      slotId: null,
      isDistractor: true,
      color: '#ef4444',
      description: 'Kipas pendingin ekstra 120mm. Meskipun berguna untuk sirkulasi udara, kipas ini bukan komponen wajib utama yang harus terpasang agar komputer bisa menyala (POST).',
      analogy: 'Seperti AC di ruangan — nyaman tapi ruangan tetap bisa digunakan tanpa AC.',
      details: 'Cooler Fan tambahan ini berukuran 120mm dan biasa dipasang di casing. CPU sudah memiliki heatsink bawaan dan PSU memiliki kipas internal. Kipas tambahan ini bukan syarat POST (Power-On Self-Test) yang diuji oleh BIOS.',
      funFact: 'Kipas casing PC gaming premium bisa berputar hingga 2000 RPM dan memiliki LED RGB yang bisa diatur warnanya!',
      techSpec: 'Case Fan 120mm PWM · 1200 RPM · 4-Pin Header',
      errorMsg: 'Kipas pendingin ekstra bukan komponen inti yang diperlukan untuk booting. Motherboard tidak memiliki soket khusus untuk komponen ini di simulasi ini.',
    },
  ],

  // ── Skenario Boot ──
  bootScenarios: {
    allInstalled: {
      type: 'success',
      icon: '✅',
      title: 'BOOT BERHASIL!',
      postSequence: [
        'Initializing power supply... OK',
        'CPU detected: Processor 8-Core/16-Thread @ 3.60 GHz',
        'RAM check: 8192 MB DDR4 ... OK',
        'GPU detected: Dedicated Graphics Card (8192 MB GDDR6)',
        'Storage: NVMe M.2 512GB PCIe Gen4 SSD ... OK',
        'All POST checks passed.',
        '',
        'Loading operating system...',
        '████████████████████████ 100%',
        '',
        '🖥️  Welcome! Komputer siap digunakan.',
      ],
      explanation: 'Semua komponen terpasang dengan benar! CPU memproses, RAM menyimpan data kerja, GPU menampilkan gambar, SSD memuat sistem operasi, dan PSU memasok daya ke semuanya.',
    },
    missingCPU: {
      type: 'critical',
      icon: '❌',
      title: 'CRITICAL: CPU Not Detected',
      postSequence: [
        'Initializing power supply... OK',
        'CPU check... FAILED',
        '',
        '❌ CRITICAL ERROR: No CPU detected.',
        'Komputer tidak bisa memproses instruksi apa pun.',
        '',
        'CPU adalah "otak" komputer. Tanpa CPU,',
        'komputer seperti tubuh tanpa otak —',
        'tidak bisa berpikir atau melakukan apa pun.',
      ],
      beepPattern: 'none', // No POST at all without CPU
    },
    missingRAM: {
      type: 'critical',
      icon: '❌',
      title: 'CRITICAL: RAM Not Detected',
      postSequence: [
        'Initializing power supply... OK',
        'CPU detected... OK',
        'RAM check... FAILED',
        '',
        '🔊 BEEP! BEEP! BEEP!',
        '',
        '❌ No RAM detected.',
        'Komputer tidak punya memori kerja',
        'untuk menjalankan program apa pun.',
        '',
        'RAM seperti meja kerja — tanpa meja,',
        'tidak ada tempat untuk mengerjakan tugas.',
      ],
      beepPattern: 'triple-short',
    },
    missingSSD: {
      type: 'warning',
      icon: '⚠️',
      title: 'WARNING: No Boot Device',
      postSequence: [
        'Initializing power supply... OK',
        'CPU detected... OK',
        'RAM check: 8192 MB ... OK',
        'GPU detected... OK',
        'Storage check... NOT FOUND',
        '',
        '⚠️ WARNING: No boot device found.',
        '',
        'Komputer hidup, tapi tidak bisa',
        'memuat sistem operasi (Windows/Linux).',
        '',
        'SSD/HDD menyimpan OS dan semua file.',
        'Tanpa penyimpanan = komputer kosong.',
      ],
      beepPattern: 'single-long',
    },
    missingGPU: {
      type: 'warning',
      icon: '⚠️',
      title: 'WARNING: No Display Output',
      postSequence: [
        'Initializing power supply... OK',
        'CPU detected... OK',
        'RAM check: 8192 MB ... OK',
        'GPU check... NOT FOUND',
        '',
        '⚠️ No display output detected.',
        '',
        'Layar gelap — komputer bekerja di',
        'belakang layar, tapi tidak bisa',
        'menampilkan gambar ke monitor.',
        '',
        'GPU mengolah jutaan warna RGB untuk',
        'setiap piksel di layar 60× per detik.',
      ],
      beepPattern: 'single-long',
    },
    missingPSU: {
      type: 'critical',
      icon: '❌',
      title: 'FATAL: No Power',
      postSequence: [
        '',
        '',
        '    (layar gelap)',
        '',
        '',
        '❌ Tidak ada daya listrik.',
        'Komputer tidak hidup sama sekali.',
        '',
        'PSU memasok listrik ke SEMUA komponen.',
        'Tanpa PSU = tanpa listrik = mati total.',
        'Seperti rumah tanpa aliran PLN.',
      ],
      beepPattern: 'none',
    },
    multipleMissing: {
      type: 'critical',
      icon: '❌',
      title: 'MULTIPLE ERRORS',
      // Dynamically generated in script.js
    },
  },

  // ── Eksplorasi Lanjutan ──
  explorationPresets: {
    free: {
      id: 'free',
      name: 'Mode Bebas',
      icon: '🔧',
      description: 'Rakit sesukamu! Eksperimen tanpa batasan.',
      recommendation: null,
    },
    office: {
      id: 'office',
      name: 'PC Kantor',
      icon: '🏢',
      description: 'Rakit komputer untuk kerja kantoran (Word, Excel, browsing). Apa yang bisa dihemat?',
      recommendation: 'PC Kantor tidak butuh GPU mahal. CPU dan RAM cukup standar. Yang penting: SSD untuk kecepatan buka aplikasi dan PSU yang efisien.',
      priority: { cpu: 'medium', ram: 'medium', ssd: 'high', gpu: 'low', psu: 'medium' },
    },
    gaming: {
      id: 'gaming',
      name: 'PC Gaming',
      icon: '🎮',
      description: 'Rakit komputer untuk bermain game! Komponen mana yang paling penting?',
      recommendation: 'PC Gaming butuh GPU kuat untuk render grafik 3D, CPU cepat untuk AI & fisika game, dan RAM besar untuk loading asset. SSD penting untuk load time cepat.',
      priority: { cpu: 'high', ram: 'high', ssd: 'high', gpu: 'critical', psu: 'high' },
    },
    editing: {
      id: 'editing',
      name: 'PC Video Editing',
      icon: '🎬',
      description: 'Rakit komputer untuk editing video 4K. Apa yang harus diprioritaskan?',
      recommendation: 'Video Editing butuh RAM besar (minimal 16GB) untuk menampung footage, CPU multi-core untuk rendering, GPU untuk akselerasi efek visual, dan SSD cepat untuk baca/tulis file besar.',
      priority: { cpu: 'critical', ram: 'critical', ssd: 'high', gpu: 'high', psu: 'high' },
    },
  },

  // ── Tantangan Biner ──
  binaryChallenges: [
    { target: 42, hint: 'Ini adalah "jawaban untuk segalanya" menurut buku The Hitchhiker\'s Guide to the Galaxy!', binary: '00101010' },
    { target: 100, hint: 'Angka bulat 100 — skor sempurna!', binary: '01100100' },
    { target: 255, hint: 'Angka terbesar yang bisa dibuat dengan 8 bit! Nyalakan SEMUA lampu.', binary: '11111111' },
  ],

  // ── Tantangan RGB ──
  rgbChallenges: [
    { name: 'Kuning', targetR: 255, targetG: 255, targetB: 0, tolerance: 30, hint: 'Campurkan Merah + Hijau dengan intensitas penuh!' },
    { name: 'Ungu / Magenta', targetR: 255, targetG: 0, targetB: 255, tolerance: 30, hint: 'Campurkan Merah + Biru tanpa Hijau.' },
    { name: 'Cyan (Biru Muda)', targetR: 0, targetG: 255, targetB: 255, tolerance: 30, hint: 'Campurkan Hijau + Biru tanpa Merah.' },
  ],

  // ── Konten Teori ──
  teori: {
    pemantik: 'Pernahkah kamu membuka casing komputer? Apa saja yang ada di dalamnya? Apa yang terjadi jika salah satu komponen dihilangkan?',
    tabs: [
      {
        id: 'tujuan',
        title: 'Tujuan Pembelajaran',
        icon: '🎯',
        content: `
          <div class="teori-tp-tab-content">
            <div class="teori-tp-banner">
              <div class="teori-tp-badge">🎯 CAPAIAN &amp; TUJUAN PEMBELAJARAN</div>
              <h3 style="margin-bottom:0.4vw;font-size:1.25vw;color:var(--text-heading);">Laboratorium Virtual Sistem Komputer</h3>
              <p style="font-size:0.88vw;color:var(--text-muted);margin-bottom:1vw;line-height:1.5;">
                Media pembelajaran interaktif ini dirancang untuk peserta didik <strong>Informatika SMP Fase D</strong> guna memahami arsitektur komputer, peran perangkat keras internal, serta representasi data digital.
              </p>
            </div>

            <div class="teori-box box-teal" style="margin-bottom:1vw;">
              <h4 style="margin-bottom:0.3vw;">📋 Capaian Pembelajaran (CP) — Elemen Sistem Komputer (SK) Fase D</h4>
              <p style="font-style:italic;margin-bottom:0;font-size:0.86vw;line-height:1.45;">
                "Peserta didik mampu mendeskripsikan komponen, fungsi, dan cara kerja komputer yang membentuk sebuah sistem komputasi, serta memahami mekanisme internal penyimpanan data pada sistem komputer." — <em>BSKAP No. 032/H/KR/2024</em>
              </p>
            </div>

            <h4 style="margin-bottom:0.6vw;font-size:1vw;color:var(--text-heading);">🎯 Tujuan Pembelajaran:</h4>
            <div class="teori-tp-cards-grid">
              <div class="teori-tp-card">
                <div class="teori-tp-card-num">1</div>
                <div class="teori-tp-card-body">
                  <strong>Mengidentifikasi komponen utama sistem komputer</strong>
                  <p>Peserta didik dapat menyebutkan dan menjelaskan fungsi komponen utama sistem komputer (CPU, RAM, media penyimpanan, GPU, PSU, dan motherboard) serta peran pengguna (brainware) dalam mengoperasikan sistem.</p>
                </div>
              </div>
              <div class="teori-tp-card">
                <div class="teori-tp-card-num">2</div>
                <div class="teori-tp-card-body">
                  <strong>Menjelaskan cara kerja sistem komputer</strong>
                  <p>Peserta didik dapat menjelaskan siklus kerja komputer (input–proses–output–simpan) dan mensimulasikan perakitan komputer secara virtual dengan memasang komponen pada soket yang tepat.</p>
                </div>
              </div>
              <div class="teori-tp-card">
                <div class="teori-tp-card-num">3</div>
                <div class="teori-tp-card-body">
                  <strong>Memahami representasi data digital</strong>
                  <p>Peserta didik dapat menjelaskan sistem bilangan biner (bit dan byte) sebagai dasar penyimpanan data, serta memahami representasi warna layar melalui model warna aditif RGB.</p>
                </div>
              </div>
            </div>

            <div class="teori-box box-amber" style="margin-top:1vw;">
              <h4 style="margin-bottom:0.2vw;">💭 Pertanyaan Pemantik:</h4>
              <p style="font-style:italic;margin-bottom:0;font-size:0.86vw;">
                "Pernahkah kamu membuka casing komputer atau melihat bagian dalam perangkat elektronik? Mengapa komputer membutuhkan berbagai komponen berbeda yang saling terhubung agar bisa bekerja?"
              </p>
            </div>
          </div>
        `,
      },
      {
        id: 'apa-itu',
        title: 'Apa Itu Komputer?',
        icon: '💻',
        content: `
          <h3>Definisi dan Konsep Dasar Komputer</h3>
          <p>Komputer adalah perangkat elektronik yang dapat menerima data (<em>input</em>), menyimpan, mengolah data sesuai instruksi program, dan menghasilkan informasi (<em>output</em>) yang bermakna bagi penggunanya.</p>

          <div class="info-card">
            <h4>📌 Tiga Unsur Sistem Komputer</h4>
            <p>Komputer bukan sekadar perangkat keras. <strong>Sistem komputer</strong> adalah kesatuan yang terdiri dari tiga unsur yang bekerja bersama:</p>
            <div class="two-col" style="gap:0.6vw;margin-top:0.4vw;">
              <div style="padding:0.6vw;background:rgba(0,212,255,0.08);border-radius:6px;border:1px solid rgba(0,212,255,0.2);">
                <strong>🔧 Hardware (Perangkat Keras)</strong>
                <p style="margin:0.3vw 0 0;font-size:0.82vw;">Komponen fisik yang dapat dilihat dan disentuh: CPU, RAM, SSD, GPU, PSU, monitor, keyboard, mouse.</p>
              </div>
              <div style="padding:0.6vw;background:rgba(16,185,129,0.08);border-radius:6px;border:1px solid rgba(16,185,129,0.2);">
                <strong>💿 Software (Perangkat Lunak)</strong>
                <p style="margin:0.3vw 0 0;font-size:0.82vw;">Program dan instruksi yang dijalankan komputer: sistem operasi (Windows, Linux), aplikasi (Word, Chrome), dan game.</p>
              </div>
              <div style="padding:0.6vw;background:rgba(139,92,246,0.08);border-radius:6px;border:1px solid rgba(139,92,246,0.2);">
                <strong>🧑 Brainware (Pengguna/SDM)</strong>
                <p style="margin:0.3vw 0 0;font-size:0.82vw;">Manusia yang mengoperasikan, memprogram, dan merawat sistem komputer. Tanpa brainware, hardware dan software tidak bermakna.</p>
              </div>
            </div>
          </div>

          <div class="info-card" style="margin-top:0.8vw;">
            <h4>🏷️ Jenis-Jenis Komputer</h4>
            <div class="two-col" style="gap:0.5vw;">
              <div>
                <strong>🖥️ Komputer Desktop &amp; Laptop</strong>
                <p style="font-size:0.82vw;margin:0.2vw 0 0;">Komputer pribadi untuk kerja, belajar, dan hiburan. Desktop bisa dirakit sesuai kebutuhan; laptop lebih portabel.</p>
              </div>
              <div>
                <strong>📱 Smartphone &amp; Tablet</strong>
                <p style="font-size:0.82vw;margin:0.2vw 0 0;">Komputer mini bertenaga prosesor ARM yang muat di genggaman. Menjalankan aplikasi, kamera, GPS secara bersamaan.</p>
              </div>
              <div>
                <strong>🖨️ Embedded System</strong>
                <p style="font-size:0.82vw;margin:0.2vw 0 0;">Komputer tertanam di dalam perangkat lain: mesin cuci, TV pintar, mobil, sistem kendali industri, hingga ATM.</p>
              </div>
              <div>
                <strong>☁️ Server &amp; Superkomputer</strong>
                <p style="font-size:0.82vw;margin:0.2vw 0 0;">Komputer berperforma tinggi untuk memproses data jutaan pengguna internet dan simulasi ilmiah kompleks.</p>
              </div>
            </div>
          </div>

          <div class="fun-fact" style="margin-top:0.8vw;">
            <strong>📜 Perkembangan Singkat Komputer</strong>
            <p>Komputer pertama (ENIAC, 1945) sebesar dua ruangan kelas dan beratnya 30 ton. Chip komputer modern (sekecil kuku jari) berisi lebih dari 10 miliar transistor dan 1.000.000× lebih cepat dari ENIAC! Smartphone di sakumu kini lebih powerful dari komputer yang digunakan untuk mendaratkan manusia di bulan pada tahun 1969.</p>
          </div>
        `,
      },
      {
        id: 'cara-kerja',
        title: 'Cara Kerja',
        icon: '⚙️',
        content: `
          <h3>Cara Kerja Sistem Komputer</h3>
          <p>Semua komputer, dari smartphone hingga superkomputer, bekerja mengikuti satu siklus dasar yang sama — disebut <strong>siklus IPOS (Input–Proses–Output–Simpan)</strong>:</p>
          
          <div class="cycle-diagram">
            <div class="cycle-step" style="--step-color: #00D4FF">
              <div class="cycle-icon">⌨️</div>
              <div class="cycle-label">INPUT</div>
              <div class="cycle-desc">Data masuk melalui keyboard, mouse, kamera, mikrofon, sensor</div>
            </div>
            <div class="cycle-arrow">→</div>
            <div class="cycle-step" style="--step-color: #7C3AED">
              <div class="cycle-icon">🧠</div>
              <div class="cycle-label">PROSES</div>
              <div class="cycle-desc">CPU mengolah data sesuai instruksi program; RAM menyimpan data sementara</div>
            </div>
            <div class="cycle-arrow">→</div>
            <div class="cycle-step" style="--step-color: #10B981">
              <div class="cycle-icon">🖥️</div>
              <div class="cycle-label">OUTPUT</div>
              <div class="cycle-desc">Hasil ditampilkan di monitor, speaker, atau dikirim ke perangkat lain</div>
            </div>
            <div class="cycle-arrow">→</div>
            <div class="cycle-step" style="--step-color: #F59E0B">
              <div class="cycle-icon">💾</div>
              <div class="cycle-label">SIMPAN</div>
              <div class="cycle-desc">Data disimpan permanen di SSD/HDD agar bisa digunakan kembali</div>
            </div>
          </div>

          <div class="info-card" style="margin-top:0.8vw;">
            <h4>🔄 Contoh Nyata: Saat Kamu Mengetik di WhatsApp</h4>
            <ol style="margin:0.4vw 0 0;padding-left:1.2em;">
              <li><strong>Input:</strong> Jari menyentuh layar atau menekan tombol keyboard</li>
              <li><strong>Proses:</strong> CPU mengidentifikasi karakter, RAM menampung teks sementara, GPU merender tampilan layar</li>
              <li><strong>Output:</strong> Huruf muncul di layar; layar diperbarui 60 kali per detik oleh GPU</li>
              <li><strong>Simpan:</strong> Pesan disimpan di memori flash internal dan dikirim melalui jaringan</li>
            </ol>
          </div>

          <div class="teori-box box-teal" style="margin-top:0.8vw;">
            <h4>🔗 Peran Setiap Komponen dalam Siklus IPOS</h4>
            <table style="width:100%;font-size:0.82vw;border-collapse:collapse;">
              <thead><tr style="border-bottom:1px solid var(--border-color);">
                <th style="text-align:left;padding:0.3vw 0.5vw;">Komponen</th>
                <th style="text-align:left;padding:0.3vw 0.5vw;">Peran dalam IPOS</th>
              </tr></thead>
              <tbody>
                <tr><td style="padding:0.25vw 0.5vw;">⌨️ Keyboard, Mouse</td><td style="padding:0.25vw 0.5vw;">Input — memasukkan perintah dan data</td></tr>
                <tr><td style="padding:0.25vw 0.5vw;">🧠 CPU</td><td style="padding:0.25vw 0.5vw;">Proses — mengeksekusi instruksi program</td></tr>
                <tr><td style="padding:0.25vw 0.5vw;">⚡ RAM</td><td style="padding:0.25vw 0.5vw;">Proses — menyimpan data kerja sementara</td></tr>
                <tr><td style="padding:0.25vw 0.5vw;">🎮 GPU</td><td style="padding:0.25vw 0.5vw;">Output — mengolah grafis dan menampilkan gambar</td></tr>
                <tr><td style="padding:0.25vw 0.5vw;">🖥️ Monitor, Speaker</td><td style="padding:0.25vw 0.5vw;">Output — menyajikan hasil ke pengguna</td></tr>
                <tr><td style="padding:0.25vw 0.5vw;">💾 SSD/HDD</td><td style="padding:0.25vw 0.5vw;">Simpan — media penyimpanan data permanen</td></tr>
              </tbody>
            </table>
          </div>
        `,
      },
      {
        id: 'komponen',
        title: 'Komponen Utama',
        icon: '🔩',
        content: `
          <h3>Komponen Utama Sistem Komputer</h3>
          <p>Sistem komputer terdiri dari perangkat keras internal (di dalam casing), perangkat I/O, dan brainware. Klik kartu di bawah untuk mempelajari fungsi detail:</p>
          <div id="teori-komponen-grid" class="teori-komponen-grid">
            <!-- Rendered dynamically from components data -->
          </div>
          <div id="teori-komponen-detail" class="komponen-detail-panel">
            <p class="placeholder-text">👆 Klik salah satu kartu komponen di atas untuk melihat penjelasan detail &amp; spesifikasi teknis.</p>
          </div>

          <h4 style="margin-top:1.2em;">Perangkat Input &amp; Output (I/O)</h4>
          <div class="two-col">
            <div>
              <strong>⌨️ Perangkat Input</strong>
              <p>Perangkat untuk <em>memasukkan</em> data dan perintah ke komputer: keyboard, mouse, layar sentuh, mikrofon, kamera, scanner, joystick.</p>
            </div>
            <div>
              <strong>🖥️ Perangkat Output</strong>
              <p>Perangkat untuk <em>menampilkan</em> hasil pengolahan data: monitor, speaker, printer, proyektor, headphone.</p>
            </div>
          </div>

          <div class="teori-box" style="margin-top:1vw;background:rgba(139,92,246,0.06);border-left:3px solid #8b5cf6;">
            <h4 style="color:#a78bfa;">🧑 Brainware — Unsur Manusia dalam Sistem Komputer</h4>
            <p style="font-size:0.86vw;line-height:1.55;margin-bottom:0.4vw;">Brainware adalah <strong>manusia</strong> yang berperan dalam mengoperasikan, mengembangkan, dan memelihara sistem komputer. Tanpa brainware, hardware dan software tidak dapat berfungsi secara bermakna.</p>
            <div class="two-col" style="gap:0.5vw;">
              <div style="font-size:0.82vw;">
                <strong>👤 Pengguna (User)</strong> — mengoperasikan aplikasi untuk menyelesaikan tugas sehari-hari (mengetik, browsing, belajar online).
              </div>
              <div style="font-size:0.82vw;">
                <strong>👨‍💻 Programmer</strong> — menulis kode program (software) yang memerintah hardware untuk bekerja sesuai kebutuhan.
              </div>
              <div style="font-size:0.82vw;">
                <strong>🔧 Teknisi (IT Support)</strong> — merakit, merawat, dan memperbaiki perangkat keras komputer.
              </div>
              <div style="font-size:0.82vw;">
                <strong>🗂️ Administrator Sistem</strong> — mengelola server, jaringan, keamanan data, dan akses pengguna di organisasi.
              </div>
            </div>
          </div>
        `,
      },
      {
        id: 'biner',
        title: 'Representasi Data',
        icon: '🔢',
        content: `
          <h3>Cara Komputer Menyimpan &amp; Merepresentasikan Data</h3>
          <p>Komputer adalah perangkat elektronik digital. Di tingkat paling mendasar, prosesor dan sirkuit memori hanya mengenali aliran arus listrik: <strong>Ada Arus Listrik (ON = 1)</strong> dan <strong>Tidak Ada Arus (OFF = 0)</strong>. Pola kombinasi 0 dan 1 inilah yang disebut <strong>Sistem Bilangan Biner</strong> (basis 2).</p>

          <h4 style="margin-top:1vw;">🔤 Hierarki Satuan Kapasitas Data Digital</h4>
          <p style="font-size:0.84vw;color:var(--text-muted);margin-bottom:0.2vw;">Dari satu sakelar biner tunggal hingga gigabyte data di penyimpanan komputer:</p>
          
          <div class="capacity-cards">
            <div class="capacity-card">
              <span class="cap-badge">1 BIT (b)</span>
              <span class="cap-value">0 atau 1</span>
              <span class="cap-analogy">1 sakelar lampu (ON atau OFF)</span>
            </div>
            <div class="capacity-card">
              <span class="cap-badge">1 BYTE (B)</span>
              <span class="cap-value">8 Bit</span>
              <span class="cap-analogy">1 karakter huruf / angka (misal: 'A')</span>
            </div>
            <div class="capacity-card">
              <span class="cap-badge">1 KILOBYTE</span>
              <span class="cap-value">1.024 Byte</span>
              <span class="cap-analogy">≈ 1 halaman dokumen teks</span>
            </div>
            <div class="capacity-card">
              <span class="cap-badge">1 MEGABYTE</span>
              <span class="cap-value">1.024 KB</span>
              <span class="cap-analogy">≈ 1 foto kamera smartphone</span>
            </div>
            <div class="capacity-card">
              <span class="cap-badge">1 GIGABYTE</span>
              <span class="cap-value">1.024 MB</span>
              <span class="cap-analogy">≈ 250 lagu MP3 audio</span>
            </div>
          </div>

          <h4 style="margin-top:1.1vw;">🔢 Sistem Nilai Tempat Biner (Bobot Pangkat 2)</h4>
          <p style="font-size:0.84vw;color:var(--text-muted);">Dalam 1 Byte (8 bit), setiap posisi sakelar dari kanan ke kiri memiliki bobot kelipatan dua (2⁰ sampai 2⁷):</p>

          <table class="data-table-modern" style="text-align:center;">
            <thead>
              <tr>
                <th>Posisi Bit</th>
                <th>Bit 7 (2⁷)</th>
                <th>Bit 6 (2⁶)</th>
                <th>Bit 5 (2⁵)</th>
                <th>Bit 4 (2⁴)</th>
                <th>Bit 3 (2³)</th>
                <th>Bit 2 (2²)</th>
                <th>Bit 1 (2¹)</th>
                <th>Bit 0 (2⁰)</th>
                <th style="text-align:center;">Total Desimal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Nilai Bobot</strong></td>
                <td><span class="mono-val">128</span></td>
                <td><span class="mono-val">64</span></td>
                <td><span class="mono-val">32</span></td>
                <td><span class="mono-val">16</span></td>
                <td><span class="mono-val">8</span></td>
                <td><span class="mono-val">4</span></td>
                <td><span class="mono-val">2</span></td>
                <td><span class="mono-val">1</span></td>
                <td style="font-weight:800;color:var(--tab-active);">Maks: 255</td>
              </tr>
              <tr>
                <td><strong>Status Bit (Contoh)</strong></td>
                <td>0</td>
                <td>0</td>
                <td style="color:#10b981;font-weight:700;">1</td>
                <td>0</td>
                <td style="color:#10b981;font-weight:700;">1</td>
                <td>0</td>
                <td style="color:#10b981;font-weight:700;">1</td>
                <td>0</td>
                <td style="font-weight:800;color:#10b981;font-size:0.95vw;">42</td>
              </tr>
              <tr style="background:rgba(16, 185, 129, 0.05);">
                <td colspan="10" style="text-align:left;padding:0.4vw 0.8vw;font-size:0.78vw;color:var(--text-muted);">
                  💡 <strong>Perhitungan:</strong> Bit yang bernilai <strong>1</strong> dijumlahkan bobotnya: 32 + 8 + 2 = <strong>42</strong>. Bit bernilai 0 diabaikan.
                </td>
              </tr>
            </tbody>
          </table>

          <div class="two-col" style="margin-top:0.8vw;">
            <div>
              <h4>📊 Contoh Konversi Biner Lainnya</h4>
              <table class="data-table-modern">
                <thead>
                  <tr>
                    <th>Biner (8-Bit)</th>
                    <th>Penjumlahan Bobot</th>
                    <th>Desimal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span class="mono-val">0000 0001</span></td>
                    <td>1</td>
                    <td><strong>1</strong></td>
                  </tr>
                  <tr>
                    <td><span class="mono-val">0000 1010</span></td>
                    <td>8 + 2</td>
                    <td><strong>10</strong></td>
                  </tr>
                  <tr>
                    <td><span class="mono-val">0100 0001</span></td>
                    <td>64 + 1</td>
                    <td><strong>65</strong> <span style="font-size:0.75vw;color:var(--text-muted);">(Huruf 'A')</span></td>
                  </tr>
                  <tr>
                    <td><span class="mono-val">1111 1111</span></td>
                    <td>128 + 64 + 32 + 16 + 8 + 4 + 2 + 1</td>
                    <td><strong>255</strong> <span style="font-size:0.75vw;color:var(--text-muted);">(Nilai Penuh)</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4>🔤 Bagaimana Huruf Dikodekan? (Standar ASCII)</h4>
              <div class="info-card" style="margin-top:0.2vw;">
                <p style="font-size:0.83vw;line-height:1.5;margin-bottom:0.4vw;">
                  Setiap karakter yang kamu ketik di keyboard memiliki nomor kode unik standar internasional bernama <strong>ASCII</strong> (<em>American Standard Code for Information Interchange</em>):
                </p>
                <div style="display:flex;gap:0.4vw;margin-bottom:0.4vw;flex-wrap:wrap;">
                  <span class="color-swatch-chip"><span class="mono-val">01000001</span> = Huruf <strong>A</strong> (65)</span>
                  <span class="color-swatch-chip"><span class="mono-val">01000010</span> = Huruf <strong>B</strong> (66)</span>
                  <span class="color-swatch-chip"><span class="mono-val">01100001</span> = Huruf <strong>a</strong> (97)</span>
                </div>
                <p style="font-size:0.78vw;color:var(--text-muted);margin:0;">
                  Ketika kamu mengetik pesan, keyboard secara otomatis mengirimkan sinyal pulsa 8-bit ke RAM dan CPU secara instan.
                </p>
              </div>
            </div>
          </div>

          <div class="interactive-link-banner">
            <div class="banner-text">
              <strong>🕹️ Ingin Mencoba Mengubah Angka Biner Sendiri?</strong>
              <div style="font-size:0.78vw;color:var(--text-muted);margin-top:2px;">Buka laboratorium interaktif Sakelar Biner untuk menggeser tuas 8-bit dan melihat angka desimal berubah secara langsung!</div>
            </div>
            <button class="banner-btn" onclick="switchTab('eksplorasi')">
              Coba Sakelar Biner ⚡
            </button>
          </div>
        `,
      },
      {
        id: 'warna-rgb',
        title: 'Warna RGB',
        icon: '🎨',
        content: `
          <h3>Cara Monitor Menampilkan Jutaan Warna (Model RGB)</h3>
          <p>Layar monitor komputer, laptop, dan smartphone tidak memakai tinta cat fisik, melainkan memancarkan <strong>tiga berkas cahaya primer: Merah (Red), Hijau (Green), dan Biru (Blue)</strong>. Metode ini dikenal sebagai model pencampuran warna <strong>Aditif (Cahaya)</strong> — semakin banyak intensitas cahaya yang dipadukan, warna yang dihasilkan semakin terang menuju putih.</p>

          <h4 style="margin-top:1vw;">🌈 Tiga Kanal Warna Primer &amp; Format 24-Bit (True Color)</h4>
          <p style="font-size:0.84vw;color:var(--text-muted);margin-bottom:0.3vw;">Setiap piksel di layarmu memiliki 3 sub-piksel cahaya (R, G, B) dengan skala kekuatan <strong>0 (mati) hingga 255 (daya penuh)</strong>:</p>

          <div class="capacity-cards" style="grid-template-columns: repeat(3, 1fr);">
            <div class="capacity-card" style="border-top:3px solid #ef4444;">
              <span class="cap-badge" style="background:#ef4444;">🔴 KANAL MERAH (R)</span>
              <span class="cap-value">Skala 0 – 255</span>
              <span class="cap-analogy">Menggunakan 1 Byte (8 Bit) memori video</span>
            </div>
            <div class="capacity-card" style="border-top:3px solid #10b981;">
              <span class="cap-badge" style="background:#10b981;">🟢 KANAL HIJAU (G)</span>
              <span class="cap-value">Skala 0 – 255</span>
              <span class="cap-analogy">Menggunakan 1 Byte (8 Bit) memori video</span>
            </div>
            <div class="capacity-card" style="border-top:3px solid #3b82f6;">
              <span class="cap-badge" style="background:#3b82f6;">🔵 KANAL BIRU (B)</span>
              <span class="cap-value">Skala 0 – 255</span>
              <span class="cap-analogy">Menggunakan 1 Byte (8 Bit) memori video</span>
            </div>
          </div>

          <div class="fun-fact" style="margin-top:0.4vw;margin-bottom:0.8vw;">
            <strong>✨ Fakta Spektakuler:</strong> Karena masing-masing kanal punya 256 tingkat kecerahan, total kombinasi warna yang dapat dibentuk satu piksel adalah <strong>256 × 256 × 256 = 16.777.216 warna berbeda (16,7 Juta Warna)</strong>! Format ini disebut sistem warna <strong>24-Bit True Color</strong>.
          </div>

          <h4 style="margin-top:1vw;">🎨 Resep Pencampuran Warna Cahaya Aditif</h4>
          <p style="font-size:0.84vw;color:var(--text-muted);margin-bottom:0.2vw;">Perpaduan dua atau lebih berkas cahaya primer menghasilkan warna sekunder:</p>

          <div class="rgb-mixing-grid">
            <div class="rgb-mix-card">
              <div class="rgb-mix-inputs">
                <span class="color-swatch-square" style="background:#ef4444;"></span> Merah
                <span>+</span>
                <span class="color-swatch-square" style="background:#10b981;"></span> Hijau
              </div>
              <div class="rgb-mix-result">
                <span>=</span>
                <span class="color-swatch-chip"><span class="color-swatch-square" style="background:#ffff00;"></span> 🟡 Kuning</span>
              </div>
            </div>

            <div class="rgb-mix-card">
              <div class="rgb-mix-inputs">
                <span class="color-swatch-square" style="background:#10b981;"></span> Hijau
                <span>+</span>
                <span class="color-swatch-square" style="background:#3b82f6;"></span> Biru
              </div>
              <div class="rgb-mix-result">
                <span>=</span>
                <span class="color-swatch-chip"><span class="color-swatch-square" style="background:#00ffff;"></span> 🩵 Cyan</span>
              </div>
            </div>

            <div class="rgb-mix-card">
              <div class="rgb-mix-inputs">
                <span class="color-swatch-square" style="background:#ef4444;"></span> Merah
                <span>+</span>
                <span class="color-swatch-square" style="background:#3b82f6;"></span> Biru
              </div>
              <div class="rgb-mix-result">
                <span>=</span>
                <span class="color-swatch-chip"><span class="color-swatch-square" style="background:#ff00ff;"></span> 🟣 Magenta</span>
              </div>
            </div>

            <div class="rgb-mix-card">
              <div class="rgb-mix-inputs">
                <span>🔴 + 🟢 + 🔵</span> Semua Penuh (255)
              </div>
              <div class="rgb-mix-result">
                <span>=</span>
                <span class="color-swatch-chip"><span class="color-swatch-square" style="background:#ffffff;"></span> ⬜ Putih Terang</span>
              </div>
            </div>

            <div class="rgb-mix-card">
              <div class="rgb-mix-inputs">
                <span>Padam Total</span> Nilai (0, 0, 0)
              </div>
              <div class="rgb-mix-result">
                <span>=</span>
                <span class="color-swatch-chip"><span class="color-swatch-square" style="background:#000000;"></span> ⬛ Hitam (Mati)</span>
              </div>
            </div>

            <div class="rgb-mix-card">
              <div class="rgb-mix-inputs">
                <span>Kekuatan Sedang</span> Nilai (128, 128, 128)
              </div>
              <div class="rgb-mix-result">
                <span>=</span>
                <span class="color-swatch-chip"><span class="color-swatch-square" style="background:#808080;"></span> 🔘 Abu-Abu</span>
              </div>
            </div>
          </div>

          <h4 style="margin-top:1vw;">📋 Tabel Kode Warna Komputer (RGB Desimal &amp; Kode HEX)</h4>
          <table class="data-table-modern">
            <thead>
              <tr>
                <th style="width:25%;">Nama Warna</th>
                <th style="width:15%;">Kanal R</th>
                <th style="width:15%;">Kanal G</th>
                <th style="width:15%;">Kanal B</th>
                <th style="width:15%;">Kode HEX</th>
                <th style="width:15%;">Visual Swatch</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Merah Murni</strong></td>
                <td>255</td>
                <td>0</td>
                <td>0</td>
                <td><span class="mono-val">#FF0000</span></td>
                <td><span class="color-swatch-square" style="background:#ff0000;width:32px;height:18px;"></span></td>
              </tr>
              <tr>
                <td><strong>Hijau Murni</strong></td>
                <td>0</td>
                <td>255</td>
                <td>0</td>
                <td><span class="mono-val">#00FF00</span></td>
                <td><span class="color-swatch-square" style="background:#00ff00;width:32px;height:18px;"></span></td>
              </tr>
              <tr>
                <td><strong>Biru Murni</strong></td>
                <td>0</td>
                <td>0</td>
                <td>255</td>
                <td><span class="mono-val">#0000FF</span></td>
                <td><span class="color-swatch-square" style="background:#0000ff;width:32px;height:18px;"></span></td>
              </tr>
              <tr>
                <td><strong>Kuning Cerah</strong></td>
                <td>255</td>
                <td>255</td>
                <td>0</td>
                <td><span class="mono-val">#FFFF00</span></td>
                <td><span class="color-swatch-square" style="background:#ffff00;width:32px;height:18px;"></span></td>
              </tr>
              <tr>
                <td><strong>Cyan (Biru Muda)</strong></td>
                <td>0</td>
                <td>255</td>
                <td>255</td>
                <td><span class="mono-val">#00FFFF</span></td>
                <td><span class="color-swatch-square" style="background:#00ffff;width:32px;height:18px;"></span></td>
              </tr>
              <tr>
                <td><strong>Magenta (Ungu Terang)</strong></td>
                <td>255</td>
                <td>0</td>
                <td>255</td>
                <td><span class="mono-val">#FF00FF</span></td>
                <td><span class="color-swatch-square" style="background:#ff00ff;width:32px;height:18px;"></span></td>
              </tr>
              <tr>
                <td><strong>Putih Bersih</strong></td>
                <td>255</td>
                <td>255</td>
                <td>255</td>
                <td><span class="mono-val">#FFFFFF</span></td>
                <td><span class="color-swatch-square" style="background:#ffffff;width:32px;height:18px;"></span></td>
              </tr>
              <tr>
                <td><strong>Hitam Pekat</strong></td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td><span class="mono-val">#000000</span></td>
                <td><span class="color-swatch-square" style="background:#000000;width:32px;height:18px;"></span></td>
              </tr>
            </tbody>
          </table>

          <h4 style="margin-top:1.1vw;">⚡ Gerbang Logika — Jantung Pengambilan Keputusan CPU</h4>
          <p style="font-size:0.84vw;color:var(--text-muted);margin-bottom:0.3vw;">Di balik tampilan grafis dan operasi komputasi, transistor CPU dirangkai membentuk gerbang logika digital:</p>

          <div class="logic-gates-grid">
            <div class="logic-gate-card">
              <span class="gate-badge">GERBANG AND</span>
              <div class="gate-desc">Output bernilai <strong>1 (Benar)</strong> hanya jika <strong>SEMUA</strong> input bernilai 1.</div>
              <div class="gate-rule">1 AND 1 = 1 | Lainnya = 0</div>
              <div style="font-size:0.74vw;color:var(--text-muted);">Analogi: 2 sakelar dipasang berurutan seri. Keduanya wajib dinyalakan agar lampu menyala.</div>
            </div>

            <div class="logic-gate-card">
              <span class="gate-badge" style="background:#0284c7;">GERBANG OR</span>
              <div class="gate-desc">Output bernilai <strong>1 (Benar)</strong> jika <strong>SALAH SATU atau KEDUA</strong> input bernilai 1.</div>
              <div class="gate-rule" style="color:#0284c7;background:rgba(2,132,199,0.08);">0 OR 0 = 0 | Lainnya = 1</div>
              <div style="font-size:0.74vw;color:var(--text-muted);">Analogi: 2 sakelar paralel bercabang. Cukup salah satu sakelar dinyalakan lampu sudah menyala.</div>
            </div>

            <div class="logic-gate-card">
              <span class="gate-badge" style="background:#e11d48;">GERBANG NOT</span>
              <div class="gate-desc">Gerbang pembalik (inverter) — membalikkan nilai sinyal input secara langsung.</div>
              <div class="gate-rule" style="color:#e11d48;background:rgba(225,29,72,0.08);">NOT 1 = 0 | NOT 0 = 1</div>
              <div style="font-size:0.74vw;color:var(--text-muted);">Analogi: Tombol darurat pemutus arus listrik otomatis ketika terpicu.</div>
            </div>
          </div>

          <div class="interactive-link-banner">
            <div class="banner-text">
              <strong>🎨 Ingin Mencampur Warna RGB Secara Langsung?</strong>
              <div style="font-size:0.78vw;color:var(--text-muted);margin-top:2px;">Buka laboratorium interaktif Eksplorasi Digital untuk menggeser slider Red, Green, Blue dan melihat perpaduan warnanya seketika!</div>
            </div>
            <button class="banner-btn" onclick="switchTab('eksplorasi')">
              Coba Mixer RGB 🌈
            </button>
          </div>
        `,
      },
    ],
  },

  // ── Prosedur Langkah ──
  prosedur: [
    { step: 1, icon: '📚', text: 'Pelajari ringkasan <strong>Teori Komputer</strong> untuk memahami fungsi CPU, RAM, SSD, GPU, dan PSU.' },
    { step: 2, icon: '🖥️', text: 'Buka menu <strong>Rakit Komputer</strong> untuk masuk ke meja kerja perakitan virtual.' },
    { step: 3, icon: '✊', text: '<strong>Tarik (Drag and Drop)</strong> setiap komponen dari rak di sebelah kiri, lalu arahkan dan lepaskan tepat di atas soket motherboard yang menyala.' },
    { step: 4, icon: '🔧', text: 'Perhatikan indikator soket: soket target akan berdenyut kuning-emas dan berubah hijau saat komponen dilepas tepat sasaran.' },
    { step: 5, icon: '↩️', text: 'Ingin membongkar komponen? Tarik komponen yang terpasang keluar dari motherboard kembali ke rak, atau cukup klik soket tersebut.' },
    { step: 6, icon: '⚡', text: 'Setelah semua 5 komponen terpasang, tekan tombol <strong>POWER ON</strong> untuk memulai proses uji booting dan amati lampu diagnostik LED POST.' },
    { step: 7, icon: '🔬', text: 'Coba eksplorasi: lepaskan RAM atau GPU, lalu nyalakan komputer. Perhatikan kode beep dan error BIOS yang muncul!' },
    { step: 8, icon: '💡', text: 'Jelajahi simulasi pendukung <strong>Sakelar Biner</strong> dan <strong>Warna RGB</strong> untuk memperdalam konsep data digital.' },
    { step: 9, icon: '✍️', text: 'Kerjakan <strong>LKPD &amp; Kuis</strong> untuk menguji pemahaman dan raih predikat terbaikmu!' },
  ],

  // ── LKPD (Lembar Kerja Peserta Didik) ──
  lkpd: {
    // Bagian A: Pilihan Ganda (5 soal)
    bagianA: [
      {
        question: 'Komponen komputer yang berfungsi sebagai "otak" untuk memproses semua instruksi adalah...',
        options: ['RAM', 'CPU', 'SSD', 'GPU'],
        correct: 1,
        explanation: 'CPU (Central Processing Unit) adalah otak komputer yang memproses semua instruksi program. RAM hanya menyimpan data sementara, SSD menyimpan data permanen, dan GPU khusus mengolah grafis.',
      },
      {
        question: 'Apa yang terjadi jika komputer dinyalakan tanpa RAM terpasang?',
        options: [
          'Komputer berjalan normal',
          'Layar gelap tapi komputer hidup',
          'Komputer tidak bisa boot dan mengeluarkan bunyi beep',
          'Komputer berjalan lambat saja',
        ],
        correct: 2,
        explanation: 'Tanpa RAM, komputer tidak memiliki memori kerja untuk menjalankan program apa pun, termasuk BIOS. Komputer akan gagal POST dan biasanya mengeluarkan kode beep sebagai tanda error.',
      },
      {
        question: 'Manakah yang termasuk memori non-volatil (data tidak hilang saat komputer dimatikan)?',
        options: ['RAM', 'Cache CPU', 'SSD', 'Register'],
        correct: 2,
        explanation: 'SSD (dan HDD) adalah memori non-volatil — data tetap tersimpan meskipun komputer dimatikan. RAM, Cache, dan Register semuanya volatil — datanya hilang saat daya terputus.',
      },
      {
        question: 'Berapa angka desimal dari bilangan biner 00101010?',
        options: ['22', '42', '52', '84'],
        correct: 1,
        explanation: '00101010 = (0×128) + (0×64) + (1×32) + (0×16) + (1×8) + (0×4) + (1×2) + (0×1) = 32 + 8 + 2 = 42.',
      },
      {
        question: 'Warna kuning di layar komputer dihasilkan dari campuran warna cahaya...',
        options: ['Merah + Biru', 'Merah + Hijau', 'Hijau + Biru', 'Merah + Hijau + Biru'],
        correct: 1,
        explanation: 'Dalam model warna RGB (aditif/cahaya), Merah + Hijau menghasilkan Kuning. Ini berbeda dengan cat (subtraktif) di mana kuning adalah warna primer.',
      },
    ],

    // Bagian B: Benar atau Salah (5 soal)
    bagianB: [
      {
        statement: 'CPU adalah komponen yang menyimpan data secara permanen.',
        correct: false,
        explanation: 'Salah. CPU memproses instruksi, bukan menyimpan data. Penyimpanan permanen adalah fungsi SSD/HDD.',
      },
      {
        statement: 'RAM adalah memori volatil — datanya hilang saat komputer dimatikan.',
        correct: true,
        explanation: 'Benar. RAM (Random Access Memory) bersifat volatil. Data di RAM hanya bertahan selama komputer menyala dan mendapat daya listrik.',
      },
      {
        statement: 'GPU hanya dibutuhkan untuk bermain game.',
        correct: false,
        explanation: 'Salah. GPU digunakan untuk semua tampilan visual di layar, termasuk editing video, desain grafis, bahkan menampilkan antarmuka sistem operasi.',
      },
      {
        statement: 'Bilangan biner 11111111 sama dengan angka desimal 255.',
        correct: true,
        explanation: 'Benar. 11111111 = 128+64+32+16+8+4+2+1 = 255. Ini adalah angka terbesar yang bisa direpresentasikan dengan 8 bit (1 byte).',
      },
      {
        statement: 'Motherboard adalah komponen yang memasok daya listrik ke komputer.',
        correct: false,
        explanation: 'Salah. Yang memasok daya listrik adalah PSU (Power Supply Unit). Motherboard adalah papan sirkuit utama yang menghubungkan semua komponen.',
      },
    ],

    // Bagian C: Menjodohkan (5 pasang)
    bagianC: [
      { left: 'CPU', right: 'Otak pemroses instruksi utama komputer', color: '#00D4FF' },
      { left: 'RAM', right: 'Memori kerja sementara berkecepatan tinggi', color: '#10B981' },
      { left: 'SSD', right: 'Menyimpan data, program, dan OS secara permanen', color: '#F59E0B' },
      { left: 'GPU', right: 'Mengolah dan menampilkan gambar di layar', color: '#7C3AED' },
      { left: 'PSU', right: 'Memasok daya listrik ke seluruh komponen', color: '#EF4444' },
    ],
  },

  // ── Referensi ──
  references: [
    { type: 'Kurikulum', text: 'Capaian Pembelajaran Informatika Fase D — Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP), Kemendikdasmen, 2022.' },
    { type: 'Buku', text: 'Buku Siswa Informatika SMP Kelas VIII — Penerbit Pusat Perbukuan, Kemendikdasmen.' },
    { type: 'Referensi', text: 'Patterson, D. A., & Hennessy, J. L. (2020). Computer Organization and Design: The Hardware/Software Interface. Morgan Kaufmann.' },
    { type: 'Referensi', text: 'Stallings, W. (2019). Computer Organization and Architecture. Pearson.' },
    { type: 'Juknis', text: 'Panduan Festival Biru Putih 2026 — Direktorat Sekolah Menengah Pertama, Kemendikdasmen.' },
    { type: 'Font', text: 'Fredoka (Google Fonts, OFL License), Nunito (Google Fonts, OFL License), Poppins (Google Fonts, OFL License) — diunduh lokal.' },
    { type: 'Audio', text: 'Seluruh efek suara disintesis menggunakan Web Audio API — tanpa file audio eksternal.' },
  ],
};
