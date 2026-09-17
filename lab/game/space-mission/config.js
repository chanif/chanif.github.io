/* ============================================================
   Space Mission: Command Center — Game Configuration
   All level data, text content, and game settings
   ============================================================ */

const GAME_CONFIG = {
  title: 'Space Mission: Command Center',
  subtitle: 'Satu kesalahan kode = misi gagal. Presisi adalah segalanya.',
  creator: 'Ach. Chanifuddin Fanani, S.Pd.',
  school: 'SMP Negeri 2 Lamongan',
  event: 'Festival Biru Putih 2026',
  is_testing: 0,

  // Tujuan Pembelajaran (Cover Page)
  learning_objectives: [
    'Menyusun langkah-langkah penyelesaian masalah secara <strong>sekuensial</strong> (berurutan)',
    'Menggunakan <strong>logika kondisional (IF-ELSE)</strong> untuk membuat keputusan berbasis kondisi',
    'Mengidentifikasi pola berulang dan menggunakan <strong>perulangan (loop)</strong> untuk efisiensi',
    'Mendekomposisi masalah kompleks menjadi sub-masalah yang dapat dikerjakan <strong>secara paralel</strong>',
  ],

  // Briefing / Tutorial cards
  briefing_cards: [
    {
      icon: '🎯',
      title: 'Selesaikan Misi',
      desc: 'Setiap misi punya tantangan berbeda. Gunakan algoritma yang tepat untuk menyelamatkan stasiun!'
    },
    {
      icon: '⭐',
      title: 'Kumpulkan Bintang',
      desc: 'Raih 1–3 bintang per misi berdasarkan performa. Semakin sedikit kesalahan, semakin banyak bintang!'
    },
    {
      icon: '🔍',
      title: 'Pelajari Algoritmanya',
      desc: 'Setelah misi selesai, lihat pseudo-code dari apa yang baru saja kamu lakukan. Ternyata kamu sudah memprogram!'
    },
    {
      icon: '🏆',
      title: 'Raih Gelar',
      desc: 'Kumpulkan skor untuk naik gelar: Space Cadet → Astronaut → Commander → Legend!'
    }
  ],

  // Badges system
  badges: [
    { min_stars: 0, label: '🛸 Space Cadet', color: '#94A3B8' },
    { min_stars: 4, label: '👨‍🚀 Astronaut', color: '#22D3EE' },
    { min_stars: 8, label: '🚀 Commander', color: '#7C3AED' },
    { min_stars: 12, label: '⭐ Space Legend', color: '#F59E0B' },
  ],

  // ====================== MISSION 1: BOOT SEQUENCE =======================
  mission1: {
    id: 'boot-sequence',
    title: 'Boot Sequence',
    subtitle: 'Algoritma Sekuensial',
    concept: 'Sekuensial',
    planet_color: '#1E88E5',
    briefing: 'Stasiun angkasa baru saja diluncurkan! Semua sistem harus dinyalakan dalam urutan yang TEPAT. Jika salah urutan — reaktor MELEDAK. Susun urutan boot sequence yang benar!',
    steps: [
      { id: 'power',       icon: '⚡', label: 'Inti Daya (Core Power)',   desc: 'Aktifkan sumber daya utama reaktor' },
      { id: 'lifesupport', icon: '💚', label: 'Pendukung Kehidupan',      desc: 'Sistem pemroses udara kabin' },
      { id: 'oxygen',      icon: '🫧', label: 'Sistem Oksigen',           desc: 'Distribusi O₂ ke seluruh modul' },
      { id: 'navigation',  icon: '🗺️', label: 'Navigasi & Pemetaan',     desc: 'Kalibrasi sistem penentuan posisi' },
      { id: 'comms',       icon: '📡', label: 'Komunikasi',               desc: 'Hubungkan dengan Mission Control' },
      { id: 'propulsion',  icon: '🔥', label: 'Propulsi',                 desc: 'Aktifkan thruster manuver' },
      { id: 'sensors',     icon: '🔬', label: 'Sensor Eksternal',         desc: 'Kalibrasi sensor lingkungan luar' },
    ],
    max_score: 300,
    pseudocode: `ALGORITMA Boot_Sequence_Stasiun
MULAI
  LANGKAH 1: Aktifkan(Inti_Daya)
  LANGKAH 2: Aktifkan(Pendukung_Kehidupan)
  LANGKAH 3: Aktifkan(Sistem_Oksigen)
  LANGKAH 4: Aktifkan(Navigasi)
  LANGKAH 5: Aktifkan(Komunikasi)
  LANGKAH 6: Aktifkan(Propulsi)
  LANGKAH 7: Aktifkan(Sensor_Eksternal)
  TAMPILKAN("Semua sistem ONLINE — Misi Dapat Dimulai!")
SELESAI`,
    funfact: '🛸 Tahukah Kamu? Roket Saturn V milik NASA untuk misi Apollo menggunakan <strong>algoritma sekuensial</strong> dengan lebih dari 5.000 langkah boot sequence sebelum mesin pertama dinyalakan!',
    cp_tp: 'Elemen CP: Algoritma & Pemrograman (AP) — Peserta didik menyusun langkah-langkah penyelesaian masalah secara <strong>sekuensial (berurutan)</strong>.',
  },

  // ====================== MISSION 2: LIFE SUPPORT =======================
  mission2: {
    id: 'life-support',
    title: 'Life Support',
    subtitle: 'Logika Kondisional IF-ELSE',
    concept: 'Kondisional',
    planet_color: '#E53935',
    briefing: 'Sensor mendeteksi kondisi berbeda di setiap zona stasiun. Kamu harus memutuskan tindakan yang tepat. Keputusan yang salah bisa berakibat fatal bagi kru!',
    scenarios: [
      {
        id: 'temp',
        zone: 'Zona Alpha — Laboratorium',
        zone_icon: '🧪',
        reading_label: 'Suhu Zona',
        reading_value: '-173°C',
        reading_status: 'CRITICAL',
        reading_color: 'danger',
        condition_display: 'IF suhu < -50°C',
        choices: [
          { id: 'a', label: '🔥 Aktifkan Pemanas Zona Alpha', correct: true, feedback: '✅ Tepat! Suhu -173°C jauh di bawah -50°C. Pemanas diaktifkan, zona aman!' },
          { id: 'b', label: '❄️ Aktifkan Pendingin Tambahan', correct: false, feedback: '❌ Salah! Zona sudah sangat dingin. Menambah pendingin akan membahayakan kru.' },
          { id: 'c', label: '⏸️ Lanjutkan tanpa tindakan', correct: false, feedback: '❌ Berbahaya! Suhu kritis tidak boleh diabaikan. Kru dalam bahaya!' },
        ],
      },
      {
        id: 'oxygen',
        zone: 'Zona Beta — Modul Tidur',
        zone_icon: '😴',
        reading_label: 'Kadar Oksigen',
        reading_value: '10%',
        reading_status: 'CRITICAL',
        reading_color: 'danger',
        condition_display: 'IF oksigen < 20%',
        choices: [
          { id: 'a', label: '💨 Aktifkan Sistem Oksigen Darurat', correct: true, feedback: '✅ Benar! Kadar 10% sangat rendah (normal = 21%). Sistem oksigen darurat diaktifkan!' },
          { id: 'b', label: '🚪 Buka Pintu Antar-Modul', correct: false, feedback: '❌ Kurang tepat! Membuka pintu tidak cukup cepat mengatasi kekurangan oksigen akut.' },
          { id: 'c', label: '💤 Biarkan kru tetap tidur', correct: false, feedback: '❌ Sangat berbahaya! Kru bisa kehilangan kesadaran karena kekurangan oksigen.' },
        ],
      },
      {
        id: 'pressure',
        zone: 'Zona Gamma — Gudang',
        zone_icon: '📦',
        reading_label: 'Tekanan Kabin',
        reading_value: '2.8 atm',
        reading_status: 'HIGH',
        reading_color: 'warning',
        condition_display: 'IF tekanan > 1.5 atm',
        choices: [
          { id: 'a', label: '⚠️ Evakuasi kru dari zona', correct: false, feedback: '❌ Berlebihan! Evaluasi kru tidak perlu jika katup bisa menangani tekanan.' },
          { id: 'b', label: '🔧 Buka Katup Tekanan Darurat', correct: true, feedback: '✅ Tepat! Tekanan 2.8 atm jauh di atas batas aman 1.5 atm. Katup diaktifkan!' },
          { id: 'c', label: '📊 Catat saja di log sistem', correct: false, feedback: '❌ Salah! Tekanan berlebih bisa menyebabkan kebocoran atau ledakan. Harus ditangani!' },
        ],
      },
    ],
    max_score: 300,
    pseudocode: `ALGORITMA Life_Support_Control
MULAI
  BACA(sensor_suhu, sensor_oksigen, sensor_tekanan)

  JIKA suhu < -50 MAKA
    Aktifkan(pemanas_zona)
  AKHIR_JIKA

  JIKA oksigen < 20 MAKA
    Aktifkan(sistem_oksigen_darurat)
  AKHIR_JIKA

  JIKA tekanan > 1.5 MAKA
    Buka(katup_tekanan_darurat)
  AKHIR_JIKA
SELESAI`,
    funfact: '🌍 Tahukah Kamu? Sistem <strong>IF-ELSE</strong> digunakan komputer Stasiun Luar Angkasa Internasional (ISS) ribuan kali per detik — memantau suhu, oksigen, tekanan, dan radiasi secara otomatis tanpa campur tangan manusia.',
    cp_tp: 'Elemen CP: AP + BK — Peserta didik menggunakan <strong>logika kondisional (JIKA-MAKA)</strong> untuk membuat keputusan berdasarkan kondisi nyata.',
  },

  // ====================== MISSION 3: SOLAR CHARGING =======================
  mission3: {
    id: 'solar-charging',
    title: 'Solar Charging',
    subtitle: 'Perulangan / Loop',
    concept: 'Loop',
    planet_color: '#F59E0B',
    briefing: 'Badai surya menonaktifkan 12 pod energi stasiun! Kamu perlu merestart semuanya. Menulis instruksi satu per satu untuk 12 pod terlalu lama dan boros. Gunakan LOOP!',
    pod_count: 12,
    loop_options: [5, 8, 10, 12],
    manual_steps: [
      'charge(pod_1)', 'charge(pod_2)', 'charge(pod_3)',
      'charge(pod_4)', 'charge(pod_5)', 'charge(pod_6)',
    ],
    loop_template: `ULANGI [N] KALI:
  ambil_pod_berikutnya()
  charge(pod)
  simpan_status("CHARGED")
AKHIR_ULANGI`,
    max_score: 300,
    pseudocode: `ALGORITMA Solar_Recharge
MULAI
  i ← 1
  ULANGI SELAMA i ≤ 12:
    pod ← ambil_pod(i)
    charge(pod)
    simpan_status(pod, "CHARGED")
    i ← i + 1
  AKHIR_ULANGI
  TAMPILKAN("Semua 12 pod berhasil di-charge!")
SELESAI`,
    funfact: '🎵 Tahukah Kamu? Spotify memutar <strong>loop</strong> untuk lebih dari 500 juta pengguna setiap hari. Tanpa loop, programmer harus menulis kode terpisah untuk setiap lagu — bayangkan menulis 100 juta baris kode hanya untuk itu!',
    cp_tp: 'Elemen CP: AP — Peserta didik mengidentifikasi pola berulang dan menggunakan <strong>perulangan (loop)</strong> untuk efisiensi pemrograman.',
  },

  // ====================== MISSION 4: EMERGENCY PROTOCOL =======================
  mission4: {
    id: 'emergency-protocol',
    title: 'Emergency Protocol',
    subtitle: 'Dekomposisi & Paralelisme',
    concept: 'Dekomposisi',
    planet_color: '#7C3AED',
    briefing: '🚨 DARURAT LEVEL MERAH! Tiga krisis sekaligus menyerang stasiun — terlalu banyak untuk satu orang! Pecah tugas dan kirim 3 tim secara bersamaan. Setiap detik sangat berharga!',
    timer_seconds: 45,
    teams: [
      { id: 'alfa',  label: 'Tim Alfa',  role: 'Navigasi & Pemetaan', icon: '🗺️', color: '#1E88E5', capacity: 3 },
      { id: 'beta',  label: 'Tim Beta',  role: 'Teknik & Perbaikan',  icon: '🔧', color: '#F59E0B', capacity: 3 },
      { id: 'gamma', label: 'Tim Gamma', role: 'Medis & Dukungan',    icon: '💊', color: '#10B981', capacity: 3 },
    ],
    tasks: [
      { id: 't1', icon: '🗺️', label: 'Kalibrasi Peta Darurat',    category: 'nav' },
      { id: 't2', icon: '🧭', label: 'Hitung Jalur Evakuasi',       category: 'nav' },
      { id: 't3', icon: '📍', label: 'Tandai Zona Bahaya',          category: 'nav' },
      { id: 't4', icon: '🔧', label: 'Perbaiki Panel Kontrol',      category: 'tech' },
      { id: 't5', icon: '⚛️', label: 'Cek Status Reaktor',          category: 'tech' },
      { id: 't6', icon: '🔩', label: 'Segel Kebocoran Tekanan',     category: 'tech' },
      { id: 't7', icon: '💊', label: 'Siapkan Kit Medis',           category: 'med' },
      { id: 't8', icon: '💨', label: 'Stabilkan Sistem Oksigen',    category: 'med' },
      { id: 't9', icon: '🚁', label: 'Koordinasi Evakuasi Kru',     category: 'med' },
    ],
    max_score: 300,
    pseudocode: `ALGORITMA Emergency_Protocol
DEKOMPOSISI:
  BAGI tugas_darurat MENJADI 3 sub-tugas
  
PARALEL:
  TIM_ALFA:
    Kalibrasi_Peta()
    Hitung_Jalur_Evakuasi()
    Tandai_Zona_Bahaya()
  
  TIM_BETA:
    Perbaiki_Panel()
    Cek_Reaktor()
    Segel_Kebocoran()
  
  TIM_GAMMA:
    Siapkan_Kit_Medis()
    Stabilkan_Oksigen()
    Koordinasi_Evakuasi()
AKHIR_PARALEL
TAMPILKAN("Semua krisis teratasi!")`,
    funfact: '🎮 Tahukah Kamu? Tim developer Minecraft <strong>mendekomposisi</strong> game raksasa mereka menjadi modul kecil: modul terrain, crafting, monster, dan physics — masing-masing dikerjakan tim berbeda <strong>secara paralel</strong>. Tanpa dekomposisi, game sebesar itu tidak mungkin selesai!',
    cp_tp: 'Elemen CP: BK (Berpikir Komputasional) — Peserta didik <strong>mendekomposisi</strong> masalah kompleks menjadi sub-masalah yang dapat diselesaikan secara paralel.',
  },
};
