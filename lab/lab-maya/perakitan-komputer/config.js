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
          <p>Komputer hanya mengenal <strong>dua angka: 0 dan 1</strong>. Sistem ini disebut <strong>bilangan biner</strong> (binary). Seluruh data — teks, gambar, suara, video — dikodekan sebagai deretan panjang angka 0 dan 1.</p>
          
          <div class="info-card">
            <h4>🔤 Bit &amp; Byte — Satuan Data Digital</h4>
            <ul>
              <li><strong>1 Bit</strong> = satu digit biner (0 atau 1) — seperti satu saklar lampu: nyala atau mati</li>
              <li><strong>1 Byte</strong> = 8 bit = bisa mewakili angka 0–255</li>
              <li><strong>1 Kilobyte (KB)</strong> = 1.024 byte ≈ satu halaman teks</li>
              <li><strong>1 Megabyte (MB)</strong> = 1.024 KB ≈ satu foto HP</li>
              <li><strong>1 Gigabyte (GB)</strong> = 1.024 MB ≈ 250 lagu MP3</li>
            </ul>
          </div>

          <h4>Konversi Biner ke Desimal</h4>
          <table class="data-table">
            <thead><tr><th>Biner</th><th>Perhitungan</th><th>Desimal</th></tr></thead>
            <tbody>
              <tr><td class="mono">0000 0001</td><td>1</td><td>1</td></tr>
              <tr><td class="mono">0000 1010</td><td>8 + 2</td><td>10</td></tr>
              <tr><td class="mono">0010 1010</td><td>32 + 8 + 2</td><td>42</td></tr>
              <tr><td class="mono">1111 1111</td><td>128+64+32+16+8+4+2+1</td><td>255</td></tr>
            </tbody>
          </table>

          <h4 style="margin-top:1em;">🎨 Warna RGB — Kodifikasi Warna dalam Biner</h4>
          <p>Layar komputer menampilkan jutaan warna hanya dari <strong>3 warna dasar cahaya: Merah (Red), Hijau (Green), Biru (Blue)</strong> — disebut model <strong>RGB</strong>. Setiap warna diwakili angka 0–255 (1 byte).</p>
          <ul>
            <li>🔴 Merah + 🟢 Hijau = 🟡 <strong>Kuning</strong></li>
            <li>🟢 Hijau + 🔵 Biru = 🩵 <strong>Cyan</strong></li>
            <li>🔴 + 🟢 + 🔵 (semua penuh) = ⬜ <strong>Putih</strong></li>
          </ul>

          <div class="fun-fact">
            <strong>💡 Tahukah Kamu?</strong>
            <p>Semua data di HP-mu — foto, chat WhatsApp, lagu Spotify — disimpan sebagai deretan panjang angka 0 dan 1. Sebuah foto 5MB terdiri dari sekitar 40 juta digit biner! Coba buktikan di <strong>Eksplorasi Digital: Sakelar Biner &amp; Warna RGB</strong>!</p>
          </div>
        `,
      },
      {
        id: 'warna-rgb',
        title: 'Warna RGB',
        icon: '🎨',
        content: `
          <h3>Cara Komputer Menampilkan Warna</h3>
          <p>Layar komputer menampilkan jutaan warna hanya dari <strong>3 warna dasar cahaya: Merah (Red), Hijau (Green), Biru (Blue)</strong> — disebut model <strong>RGB</strong>.</p>
          
          <div class="info-card">
            <h4>🌈 Pencampuran Warna Cahaya (Aditif)</h4>
            <p>Berbeda dengan cat (subtraktif), cahaya bersifat <strong>aditif</strong> — semakin banyak warna dicampur, semakin terang:</p>
            <ul>
              <li>🔴 Merah + 🟢 Hijau = 🟡 <strong>Kuning</strong></li>
              <li>🟢 Hijau + 🔵 Biru = 🩵 <strong>Cyan</strong></li>
              <li>🔴 Merah + 🔵 Biru = 🟣 <strong>Magenta</strong></li>
              <li>🔴 + 🟢 + 🔵 (semua penuh) = ⬜ <strong>Putih</strong></li>
              <li>Semua mati = ⬛ <strong>Hitam</strong></li>
            </ul>
          </div>

          <h4>Setiap Warna = 3 Angka (0–255)</h4>
          <table class="data-table">
            <thead><tr><th>Warna</th><th>R</th><th>G</th><th>B</th><th>Kode HEX</th></tr></thead>
            <tbody>
              <tr><td>🔴 Merah</td><td>255</td><td>0</td><td>0</td><td class="mono">#FF0000</td></tr>
              <tr><td>🟡 Kuning</td><td>255</td><td>255</td><td>0</td><td class="mono">#FFFF00</td></tr>
              <tr><td>🔵 Biru Instagram</td><td>0</td><td>149</td><td>246</td><td class="mono">#0095F6</td></tr>
              <tr><td>⬜ Putih</td><td>255</td><td>255</td><td>255</td><td class="mono">#FFFFFF</td></tr>
            </tbody>
          </table>

          <h4 style="margin-top:1em;">⚡ Gerbang Logika — Dasar Perhitungan CPU</h4>
          <p>Di dalam CPU terdapat miliaran <strong>transistor</strong> yang membentuk gerbang logika. Tiga gerbang dasar:</p>
          <ul>
            <li><strong>AND</strong> — Output 1 hanya jika <em>semua</em> input bernilai 1</li>
            <li><strong>OR</strong> — Output 1 jika <em>salah satu</em> input bernilai 1</li>
            <li><strong>NOT</strong> — Membalikkan input: 0 → 1 dan 1 → 0</li>
          </ul>
          <p>Kombinasi gerbang-gerbang ini membentuk sirkuit penjumlah, pembanding, dan semua operasi yang dilakukan prosesor.</p>

          <div class="fun-fact">
            <strong>🔬 Sub-Piksel</strong>
            <p>Setiap piksel di layarmu terdiri dari 3 sub-piksel kecil: R, G, B. Layar Full HD (1920×1080) punya 2 juta piksel = 6 juta sub-piksel! GPU mengolah semuanya 60× per detik. Coba buktikan di <strong>Eksplorasi Digital: Warna RGB &amp; Gerbang Logika</strong>!</p>
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
