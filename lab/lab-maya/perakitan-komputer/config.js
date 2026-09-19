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
    grade: 'Kelas VIII SMP',
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
    'sim-rakit-pc', 'sim-binary', 'sim-rgb',
    'lkpd', 'lkpd-hasil',
    'pengembang', 'referensi'
  ],

  pageLabels: {
    'cover':          'Laman Muka',
    'teori':          'Teori',
    'prosedur':       'Prosedur',
    'simulasi-menu':  'Menu Simulasi',
    'sim-rakit-pc':   'Simulasi: Rakit PC',
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
      techSpec: 'Intel Core i7-8800K · 8C/16T · 3.60GHz · LGA 1700',
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
      techSpec: 'Hyper-X 8GB DDR4 · 3200MHz · Dual Channel',
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
      techSpec: 'NVIDIA RTX 3060 · 8GB GDDR6 · Dual Fan Cooling',
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
  ],

  // ── Skenario Boot ──
  bootScenarios: {
    allInstalled: {
      type: 'success',
      icon: '✅',
      title: 'BOOT BERHASIL!',
      postSequence: [
        'Initializing power supply... OK',
        'CPU detected: Intel Core i5-13400 @ 2.50 GHz',
        'RAM check: 8192 MB DDR4 ... OK',
        'GPU detected: NVIDIA GeForce RTX 3060',
        'Storage: Samsung 970 EVO Plus 512GB NVMe SSD ... OK',
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
        id: 'apa-itu',
        title: 'Apa Itu Komputer?',
        icon: '💻',
        content: `
          <h3>Definisi Komputer</h3>
          <p>Komputer adalah perangkat elektronik yang dapat menerima data (<em>input</em>), memproses data sesuai instruksi, dan menghasilkan informasi (<em>output</em>).</p>
          
          <div class="info-card">
            <h4>🔧 Hardware vs 💿 Software</h4>
            <div class="two-col">
              <div>
                <strong>Hardware (Perangkat Keras)</strong>
                <p>Bagian komputer yang bisa dilihat dan disentuh: CPU, RAM, SSD, monitor, keyboard, mouse.</p>
              </div>
              <div>
                <strong>Software (Perangkat Lunak)</strong>
                <p>Program dan instruksi yang dijalankan di hardware: Windows, Chrome, Microsoft Word, game.</p>
              </div>
            </div>
          </div>

          <div class="fun-fact">
            <strong>📜 Sejarah Singkat</strong>
            <p>Komputer pertama (ENIAC, 1945) sebesar ruangan dan beratnya 30 ton. Sekarang, smartphone di sakumu 1.000.000× lebih cepat!</p>
          </div>
        `,
      },
      {
        id: 'komponen',
        title: 'Komponen Utama',
        icon: '🔩',
        content: `
          <h3>5 Komponen Utama Komputer & Motherboard</h3>
          <p>Setiap komputer memiliki komponen inti yang bekerja sama. Klik kartu di bawah untuk mempelajari fungsi dan analoginya:</p>
          <div id="teori-komponen-grid" class="teori-komponen-grid">
            <!-- Rendered dynamically from components data -->
          </div>
          <div id="teori-komponen-detail" class="komponen-detail-panel">
            <p class="placeholder-text">👆 Klik salah satu kartu komponen di atas untuk melihat penjelasan detail & spesifikasi teknis.</p>
          </div>

          <h4 style="margin-top:1.2em">Perangkat I/O (Input/Output)</h4>
          <div class="two-col">
            <div>
              <strong>⌨️ Input</strong>
              <p>Keyboard, mouse, mikrofon, kamera, scanner — perangkat untuk <em>memasukkan</em> data ke komputer.</p>
            </div>
            <div>
              <strong>🖥️ Output</strong>
              <p>Monitor, speaker, printer — perangkat untuk <em>menampilkan</em> hasil pengolahan data.</p>
            </div>
          </div>
        `,
      },
      {
        id: 'cara-kerja',
        title: 'Cara Kerja',
        icon: '⚙️',
        content: `
          <h3>Bagaimana Komputer Bekerja?</h3>
          <p>Semua komputer bekerja mengikuti siklus dasar yang sama:</p>
          
          <div class="cycle-diagram">
            <div class="cycle-step" style="--step-color: #00D4FF">
              <div class="cycle-icon">⌨️</div>
              <div class="cycle-label">INPUT</div>
              <div class="cycle-desc">Data masuk melalui keyboard, mouse, mikrofon</div>
            </div>
            <div class="cycle-arrow">→</div>
            <div class="cycle-step" style="--step-color: #7C3AED">
              <div class="cycle-icon">🧠</div>
              <div class="cycle-label">PROSES</div>
              <div class="cycle-desc">CPU + RAM mengolah data sesuai instruksi program</div>
            </div>
            <div class="cycle-arrow">→</div>
            <div class="cycle-step" style="--step-color: #10B981">
              <div class="cycle-icon">🖥️</div>
              <div class="cycle-label">OUTPUT</div>
              <div class="cycle-desc">Hasil ditampilkan di monitor, speaker, printer</div>
            </div>
            <div class="cycle-arrow">→</div>
            <div class="cycle-step" style="--step-color: #F59E0B">
              <div class="cycle-icon">💾</div>
              <div class="cycle-label">SIMPAN</div>
              <div class="cycle-desc">Data disimpan di SSD/HDD untuk digunakan nanti</div>
            </div>
          </div>

          <div class="info-card">
            <h4>🔄 Contoh Nyata</h4>
            <p>Saat kamu mengetik pesan WhatsApp:</p>
            <ol>
              <li><strong>Input:</strong> Jari menekan tombol di layar sentuh</li>
              <li><strong>Proses:</strong> CPU mengubah sentuhan menjadi huruf, RAM menyimpan pesan sementara</li>
              <li><strong>Output:</strong> Huruf muncul di layar, suara "tik" dari speaker</li>
              <li><strong>Simpan:</strong> Pesan disimpan di memori HP dan dikirim via jaringan</li>
            </ol>
          </div>
        `,
      },
      {
        id: 'biner',
        title: 'Bilangan Biner',
        icon: '🔢',
        content: `
          <h3>Cara Komputer Menyimpan Data</h3>
          <p>Komputer hanya mengenal <strong>dua angka: 0 dan 1</strong>. Sistem ini disebut <strong>bilangan biner</strong> (binary).</p>
          
          <div class="info-card">
            <h4>🔤 Bit & Byte</h4>
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

          <div class="fun-fact">
            <strong>💡 Tahukah Kamu?</strong>
            <p>Semua data di HP-mu — foto, chat WhatsApp, lagu Spotify — disimpan sebagai deretan panjang angka 0 dan 1. Coba buktikan di <strong>Simulasi Binary Switch</strong>!</p>
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

          <div class="fun-fact">
            <strong>🔬 Sub-Piksel</strong>
            <p>Setiap piksel di layarmu terdiri dari 3 sub-piksel kecil: R, G, B. Layar Full HD (1920×1080) punya 2 juta piksel = 6 juta sub-piksel! GPU mengolah semuanya 60× per detik. Coba buktikan di <strong>Simulasi RGB Mixer</strong>!</p>
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
