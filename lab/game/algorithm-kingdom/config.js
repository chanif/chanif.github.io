/* ============================================================
   Algorithm Kingdom — Game Configuration
   All level data, dialog, scoring, assets, and kingdom building data
   Author: Ach. Chanifuddin Fanani, S.Pd. — SMPN 2 Lamongan
   ============================================================ */

const GAME_CONFIG = {
  title: 'Algorithm Kingdom',
  subtitle: 'Bangun Kerajaanmu dengan Kekuatan Algoritma!',
  creator: 'Ach. Chanifuddin Fanani, S.Pd.',
  school: 'SMP Negeri 2 Lamongan',
  event: 'Festival Biru Putih 2026',

  learning_objectives: [
    'Menyusun langkah-langkah penyelesaian masalah secara <strong>sekuensial</strong> (berurutan)',
    'Menggunakan <strong>logika kondisional (IF-ELSE)</strong> untuk membuat keputusan berbasis kondisi',
    'Mengidentifikasi pola berulang dan menggunakan <strong>perulangan (loop)</strong> untuk efisiensi',
    'Mendekomposisi masalah kompleks menjadi sub-masalah yang dapat dikerjakan <strong>secara paralel</strong>',
  ],

  briefing_cards: [
    { icon: '🏗️', title: 'Bangun Kerajaan', desc: 'Setiap misi yang selesai = bangunan visual megah berdiri di peta kerajaan!' },
    { icon: '⭐', title: 'Raih 3 Bintang', desc: 'Selesaikan tantangan dengan presisi tinggi dan efisiensi algoritma untuk bintang penuh!' },
    { icon: '📜', title: 'Pelajari Algoritma', desc: 'Lihat pseudo-code nyata di setiap akhir level. Buktikan kamu sudah berpikir seperti programmer!' },
    { icon: '👑', title: 'Tahta Tertinggi', desc: 'Kumpulkan skor untuk naik kasta: Rakyat Biasa → Ksatria → Panglima → Raja Algoritma Agung!' },
  ],

  badges: [
    { min_stars: 0,  label: '🧑‍🌾 Rakyat Biasa', color: '#78716C' },
    { min_stars: 4,  label: '⚔️ Ksatria Kode',   color: '#3B82F6' },
    { min_stars: 8,  label: '🛡️ Panglima Logika', color: '#8B5CF6' },
    { min_stars: 12, label: '👑 Raja Algoritma',  color: '#F59E0B' },
  ],

  // Kingdom buildings — unlocked after each mission
  kingdom_buildings: [
    { id: 'castle',  img: 'assets/buildings/castle.jpg',       fallback: '🏰', label: 'Kastil Utama',     district: 'Wilayah I — Ibukota' },
    { id: 'shield',  img: 'assets/buildings/watchtower.svg',   fallback: '🛡️', label: 'Menara Penjaga',   district: 'Wilayah II — Perbatasan' },
    { id: 'farm',    img: 'assets/buildings/granary-farm.svg', fallback: '🌾', label: 'Lumbung Pangan',   district: 'Wilayah III — Lembah Subur' },
    { id: 'council', img: 'assets/buildings/council-hall.svg', fallback: '🏛️', label: 'Balai Dewan',     district: 'Wilayah IV — Pusat Komando' },
  ],

  // Characters
  characters: {
    king:     { name: 'Baginda Raja',     avatar: 'assets/characters/king-avatar.jpg',      title: 'Penguasa Kerajaan' },
    water:    { name: 'Menteri Pengairan', avatar: 'assets/characters/minister-water.jpg',   role: 'Pakar Hidrolika & Banjir' },
    health:   { name: 'Menteri Kesehatan', avatar: 'assets/characters/minister-health.jpg',  role: 'Tabib & Alkemis Wabah' },
    defense:  { name: 'Panglima Pertahanan', avatar: 'assets/characters/minister-defense.jpg', role: 'Komandan Pasukan Perisai' },
  },

  // ====================== LEVEL 1: BANGUN KASTIL =======================
  mission1: {
    id: 'bangun-kastil',
    title: 'Bangun Kastil Utama',
    subtitle: 'Algoritma Sekuensial & Uji Fisika Konstruksi',
    concept: 'Sekuensial',
    color: '#D97706',
    building_reward: 'castle',
    timer_seconds: 90,
    use_distractors: true,
    briefing: '⚠️ Ada kartu JEBAKAN tersembunyi di antara langkah-langkah! Pilih dengan cermat 7 dari 9 kartu yang tersedia. Susun dari fondasi terbawah hingga kibaran panji. Ingat: urutan salah = kastil RUNTUH! Selesaikan dalam 90 detik untuk bonus bintang!',
    steps: [
      { id: 'survey',     icon: '📐', label: 'Survei Lahan',         desc: 'Ukur tanah & pasang patok batas bangunan', stageLayer: 'survey' },
      { id: 'foundation', icon: '🪨', label: 'Gali Fondasi Batu',   desc: 'Gali parit & cor batu pondasi yang kokoh', stageLayer: 'foundation' },
      { id: 'walls',      icon: '🧱', label: 'Susun Dinding Batu',   desc: 'Naikkan dinding bata setinggi 3 tingkat',  stageLayer: 'walls' },
      { id: 'roof',       icon: '🏠', label: 'Pasang Atap Kayu',     desc: 'Rangka kayu jati & genteng kedap air',     stageLayer: 'roof' },
      { id: 'tower',      icon: '🗼', label: 'Dirikan Menara Intai', desc: 'Menara sudut untuk pertahanan panah',      stageLayer: 'tower' },
      { id: 'gate',       icon: '🚪', label: 'Pasang Gerbang Oak',   desc: 'Pintu gerbang tebal berpaku besi tempa',    stageLayer: 'gate' },
      { id: 'flag',       icon: '🚩', label: 'Kibarkan Bendera',     desc: 'Pasang panji kerajaan di puncak kastil',   stageLayer: 'flag' },
    ],
    // Distractor steps for extra challenge / knight mode
    distractors: [
      { id: 'paint_pink', icon: '🎨', label: 'Cat Dinding Pink',      desc: 'Langkah jebakan: Cat dekorasi saat dinding belum beres!' },
      { id: 'burn_scaffold', icon: '🔥', label: 'Bakar Perancah',     desc: 'Langkah jebakan: Menghancurkan alat kerja tukang!' },
    ],
    max_score: 300,
    pseudocode: `ALGORITMA Bangun_Kastil
MULAI
  LANGKAH 1: Survei_Lahan()
  LANGKAH 2: Gali_Fondasi_Batu()
  LANGKAH 3: Susun_Dinding_Batu()
  LANGKAH 4: Pasang_Atap_Kayu()
  LANGKAH 5: Dirikan_Menara_Intai()
  LANGKAH 6: Pasang_Gerbang_Oak()
  LANGKAH 7: Kibarkan_Bendera()
  CETAK("Kastil berdiri megah tanpa celah runtuh!")
SELESAI`,
    funfact: '🏰 Tahukah Kamu? Dalam pemrograman, <strong>eksekusi sekuensial</strong> adalah prinsip paling dasar. Seperti membangun kastil Edinburgh abad pertengahan, jika sebuah baris kode dipanggil sebelum variabelnya dideklarasikan, program akan "runtuh" (Crash / Error)!',
    cp_tp: 'Elemen CP: Algoritma & Pemrograman (AP) — Peserta didik menyusun langkah-langkah penyelesaian masalah secara <strong>sekuensial (berurutan)</strong> dan memahami akibat kesalahan urutan kronologis.',
  },

  // ====================== LEVEL 2: KEBIJAKAN KERAJAAN =======================
  mission2: {
    id: 'kebijakan-kerajaan',
    title: 'Kebijakan Pertahanan & Rakyat',
    subtitle: 'Logika Percabangan Kondisional IF-ELSE',
    concept: 'Kondisional (IF-ELSE)',
    color: '#2563EB',
    building_reward: 'shield',
    scenario_timer_seconds: 25,
    briefing: '⏱️ Utusan membawa kabar darurat! Kamu punya 25 detik untuk memutuskan setiap kebijakan. Jika waktu habis, pilihan terburuk akan otomatis diambil! Terapkan logika JIKA... MAKA... ELSE... yang paling bijak dan cepat!',
    initial_vitals: { water: 60, security: 55, gold: 70, morale: 65 },
    scenarios: [
      {
        id: 'drought',
        title: 'Kekeringan Ekstrem di Desa Selatan',
        zone: 'Lembah Selatan — Pertanian Gersang',
        zone_icon: '☀️',
        messenger: 'assets/characters/minister-water.jpg',
        reading_label: 'Sensor Curah Hujan',
        reading_value: '2 mm (Normal: > 30 mm)',
        reading_status: 'KRITIS',
        reading_color: 'danger',
        condition_display: 'JIKA curah_hujan < 10 mm MAKA',
        choices: [
          {
            id: 'a',
            label: '💧 Buka saluran cadangan dan bagikan ransum air darurat',
            correct: true,
            effects: { water: +25, gold: -10, morale: +20, security: 0 },
            feedback: '✅ Tepat Sekali! Keputusan membuka cadangan air menyelamatkan rakyat dari dehidrasi dan gagal panen. Moral rakyat meroket!',
          },
          {
            id: 'b',
            label: '🎉 Gelar pesta dansa akbar untuk melupakan haus',
            correct: false,
            effects: { water: -15, gold: -20, morale: -25, security: 0 },
            feedback: '❌ Kebijakan Keliru! Rakyat kelaparan dan kehausan, bukan butuh pesta boros. Moral rakyat anjlok drastis!',
          },
          {
            id: 'c',
            label: '📜 Perintahkan juru tulis mencatat saja tanpa tindakan',
            correct: false,
            effects: { water: -20, gold: 0, morale: -15, security: 0 },
            feedback: '❌ Hanya mencatat tanpa eksekusi MAKA? Komputer tanpa aksi bersyarat hanyalah loop hampa!',
          },
        ],
      },
      {
        id: 'bandit',
        title: 'Serbuan Gerombolan Perampok Perbatasan',
        zone: 'Benteng Celah Utara — Pos Penjagaan',
        zone_icon: '⚔️',
        messenger: 'assets/characters/minister-defense.jpg',
        reading_label: 'Laporan Intelijen Keamanan',
        reading_value: '12 Pasukan Raider Bersiap Menyerang',
        reading_status: 'SIAGA 1',
        reading_color: 'danger',
        condition_display: 'JIKA ancaman_musuh > 5 KALI MAKA',
        choices: [
          {
            id: 'a',
            label: '🏃 Suruh warga desa mengungsi dan tinggalkan benteng',
            correct: false,
            effects: { water: 0, gold: -30, morale: -20, security: -35 },
            feedback: '❌ Menyerahkan benteng tanpa perlawanan membuat perbatasan hancur dan perampok semakin merajalela!',
          },
          {
            id: 'b',
            label: '🛡️ Mobilisasi regu ksatria perisai dan perkuat barikade',
            correct: true,
            effects: { water: 0, gold: -15, morale: +15, security: +35 },
            feedback: '✅ Titah Bijak! Pasukan ksatria memukul mundur gerombolan penjarah di gerbang batas. Wilayah aman sentosa!',
          },
          {
            id: 'c',
            label: '🕊️ Kirim surat permohonan damai dan hadiah koin emas',
            correct: false,
            effects: { water: 0, gold: -40, morale: -15, security: -10 },
            feedback: '❌ Memberi upeti kepada perampok justru menguras kas kerajaan dan mengundang serangan lebih besar!',
          },
        ],
      },
      {
        id: 'harvest',
        title: 'Panen Gandum Melimpah di Dataran Tengah',
        zone: 'Lumbung Timur — Dataran Aluvial',
        zone_icon: '🌾',
        messenger: 'assets/characters/king-avatar.jpg',
        reading_label: 'Hasil Timbang Panen Raya',
        reading_value: '500 Karung Gandum (Target: 300)',
        reading_status: 'SURPLUS MELIMPAH',
        reading_color: 'success',
        condition_display: 'JIKA hasil_panen > kapasitas_desa MAKA',
        choices: [
          {
            id: 'a',
            label: '🔥 Bakar kelebihan panen agar harga pasar tetap mahal',
            correct: false,
            effects: { water: -10, gold: -10, morale: -40, security: 0 },
            feedback: '❌ Sungguh kejam dan boros! Membakar makanan memicu kemarahan para petani yang bercucuran keringat!',
          },
          {
            id: 'b',
            label: '🏪 Simpan ke lumbung cadangan kerajaan & buka perdagangan',
            correct: true,
            effects: { water: +20, gold: +30, morale: +20, security: +10 },
            feedback: '✅ Brilian! Surplus disimpan untuk persiapan musim paceklik, dan sebagian dijual ke saudagar untuk mengisi kas kerajaan!',
          },
          {
            id: 'c',
            label: '🍻 Bagikan gratis untuk pesta miras di kedai desa',
            correct: false,
            effects: { water: -10, gold: 0, morale: -10, security: -20 },
            feedback: '❌ Pesta miras menimbulkan kekacauan malam hari dan menurunkan ketertiban umum!',
          },
        ],
      },
    ],
    max_score: 300,
    pseudocode: `ALGORITMA Kebijakan_Kerajaan
BACA(sensor_cuaca, radar_keamanan, timbangan_panen)

JIKA sensor_cuaca.curah_hujan < 10 MAKA
  Buka_Saluran_Air()
  Bagikan_Ransum()
LAINNYA
  Alirkan_Normal()
AKHIR_JIKA

JIKA radar_keamanan.ancaman > 5 MAKA
  Mobilisasi_Ksatria_Perisai()
LAINNYA
  Patroli_Rutin()
AKHIR_JIKA

JIKA timbangan_panen.surplus > 0 MAKA
  Simpan_Ke_Lumbung_Kerajaan()
  Jual_Kelebihan(kas_kerajaan)
AKHIR_JIKA`,
    funfact: '🤖 Tahukah Kamu? Logika <strong>IF-ELSE</strong> adalah dasar dari kecerdasan buatan dan game modern. Di game RPG, musuh memutuskan untuk menyerang, bertahan, atau kabur menggunakan ribuan kondisi IF-ELSE berdasarkan sisa nyawa dan posisimu!',
    cp_tp: 'Elemen CP: AP + BK — Peserta didik merumuskan keputusan bersyarat menggunakan <strong>logika kondisional (IF-ELSE)</strong> untuk menjaga kestabilan sistem multi-variabel.',
  },

  // ====================== LEVEL 3: PANEN RAYA =======================
  mission3: {
    id: 'panen-raya',
    title: 'Panen Raya Otomatis',
    subtitle: 'Algoritma Perulangan (Loop) & Ekspedisi Gerobak',
    concept: 'Perulangan (Loop)',
    color: '#059669',
    building_reward: 'farm',
    cart_capacity: 5,
    total_runs_needed: 3,
    briefing: '🚜 Gerobak kerajaan hanya muat 5 desa sekali jalan! Untuk memanen semua 12 dusun, kamu perlu beberapa putaran perulangan. Atur berapa kali iterasi loop setiap ronde — dan saat gerobak tiba di desa, KLIK desa yang BERKEDIP dalam 2 detik untuk memanen! Gagal klik = desa dilewati!',
    village_count: 12,
    villages: [
      { id: 1,  name: 'Dusun Gandum 1',  yield: 40, x: 8,  y: 20 },
      { id: 2,  name: 'Dusun Gandum 2',  yield: 35, x: 18, y: 35 },
      { id: 3,  name: 'Dusun Padi 3',    yield: 50, x: 12, y: 60 },
      { id: 4,  name: 'Dusun Jagung 4',  yield: 45, x: 26, y: 75 },
      { id: 5,  name: 'Dusun Kebun 5',   yield: 30, x: 38, y: 55 },
      { id: 6,  name: 'Dusun Aluvial 6', yield: 60, x: 44, y: 25 },
      { id: 7,  name: 'Dusun Bukit 7',   yield: 35, x: 56, y: 38 },
      { id: 8,  name: 'Dusun Sungai 8',  yield: 50, x: 62, y: 70 },
      { id: 9,  name: 'Dusun Lembah 9',  yield: 40, x: 74, y: 80 },
      { id: 10, name: 'Dusun Rawa 10',   yield: 35, x: 80, y: 48 },
      { id: 11, name: 'Dusun Kincir 11', yield: 55, x: 86, y: 22 },
      { id: 12, name: 'Dusun Lumbung 12',yield: 65, x: 92, y: 62 },
    ],
    loop_options: [3, 4, 5, 6],
    speed_options: [
      { label: '1x Normal', val: 1500 },
      { label: '2x Cepat',  val: 900 },
      { label: '⚡ Turbo',   val: 500 },
    ],
    max_score: 300,
    pseudocode: `ALGORITMA Panen_Raya_Otomatis
MULAI
  total_gandum ← 0
  
  // Perulangan untuk 12 desa pertanian
  UNTUK desa ← 1 SAMPAI 12 LAKUKAN:
    Gerobak.Datangi(desa)
    hasil ← Gerobak.Timbang_Panen(desa)
    total_gandum ← total_gandum + hasil
    Gerobak.Angkut_Ke_Lumbung(total_gandum)
  AKHIR_UNTUK

  TAMPILKAN("Seluruh 12 desa berhasil dipanen secara otomatis!")
SELESAI`,
    funfact: '🚜 Tahukah Kamu? Menggunakan loop menghemat lebih dari <strong>89% baris kode</strong>! Di dunia nyata, robot manufaktur modern mengulang gerakan yang sama jutaan kali sehari dengan loop yang hanya membutuhkan beberapa baris instruksi!',
    cp_tp: 'Elemen CP: AP — Peserta didik mengidentifikasi pola berulang dan menyusun instruksi <strong>perulangan (loop)</strong> untuk meningkatkan efisiensi komputasi.',
  },

  // ====================== LEVEL 4: KRISIS KERAJAAN =======================
  mission4: {
    id: 'krisis-kerajaan',
    title: 'Pusat Komando Krisis',
    subtitle: 'Dekomposisi Masalah & Komputasi Paralel (Multi-Thread)',
    concept: 'Dekomposisi & Paralelisme',
    color: '#7C3AED',
    building_reward: 'council',
    briefing: '🚨 DARURAT TINGKAT TINGGI! Tiga bencana besar melanda kerajaan secara serentak: Banjir di delta sungai, wabah penyakit di pemukiman warga, dan serangan penjarah di pos perbatasan. Kamu tidak bisa menanganinya sendirian secara berurutan — gunakan DEKOMPOSISI untuk membagi tugas ke 3 Menteri dan jalankan secara PARALEL sebelum waktu habis!',
    timer_seconds: 45,
    teams: [
      {
        id: 'water',
        label: 'Menteri Pengairan',
        title: 'Divisi Bencana Banjir',
        role: 'Pakar Hidrolika & Aliran Sungai',
        icon: '🌊',
        avatar: 'assets/characters/minister-water.jpg',
        color: '#3B82F6',
        capacity: 3,
        voice: '"Serahkan urusan tanggul dan tata air kepadaku, Yang Mulia!"',
      },
      {
        id: 'health',
        label: 'Menteri Kesehatan',
        title: 'Divisi Penanggulangan Wabah',
        role: 'Pakar Herbalis & Alkemis',
        icon: '💊',
        avatar: 'assets/characters/minister-health.jpg',
        color: '#10B981',
        capacity: 3,
        voice: '"Ramuan herbal dan sanitasi desa siap didistribusikan!"',
      },
      {
        id: 'defense',
        label: 'Panglima Pertahanan',
        title: 'Divisi Keamanan Perbatasan',
        role: 'Komandan Pasukan Perisai',
        icon: '⚔️',
        avatar: 'assets/characters/minister-defense.jpg',
        color: '#EF4444',
        capacity: 3,
        voice: '"Pedang dan perisai kami siap menjaga kedamaian rakyat!"',
      },
    ],
    tasks: [
      { id: 't1', icon: '🏗️', label: 'Bangun Tanggul Darurat Sungai',  category: 'water',   tip: 'Urusan air/sungai' },
      { id: 't2', icon: '🚣', label: 'Evakuasi Warga Bantaran Kali',    category: 'water',   tip: 'Urusan banjir' },
      { id: 't3', icon: '💧', label: 'Buka Kanal Pembuang Air Danau',   category: 'water',   tip: 'Urusan hidrolika' },
      { id: 't4', icon: '🏥', label: 'Dirikan Tenda Karantina Medis',    category: 'health',  tip: 'Urusan medis/wabah' },
      { id: 't5', icon: '🧪', label: 'Racik Ramuan Obat Herbal Desa',   category: 'health',  tip: 'Urusan pengobatan' },
      { id: 't6', icon: '🧹', label: 'Sterilisasi Sumur & Sumber Air',   category: 'health',  tip: 'Sanitasi kesehatan' },
      { id: 't7', icon: '🛡️', label: 'Tegakkan Barikade Benteng Utama', category: 'defense', tip: 'Pertahanan militer' },
      { id: 't8', icon: '🐎', label: 'Kirim Patroli Ksatria Berkuda',   category: 'defense', tip: 'Operasi pengamanan' },
      { id: 't9', icon: '📯', label: 'Bunyikan Terompet Perang Batas',  category: 'defense', tip: 'Komando tempur' },
    ],
    max_score: 300,
    pseudocode: `ALGORITMA Komando_Krisis_Paralel
// 1. DEKOMPOSISI: Pecah 9 tugas menjadi 3 sub-masalah independen
DEKOMPOSISI(Krisis_Kerajaan):
  kelompok_air     ← [Tanggul, Evakuasi, Kanal]
  kelompok_medis   ← [Tenda_Karantina, Racik_Obat, Sterilisasi]
  kelompok_militer ← [Barikade, Ksatria_Kuda, Terompet]

// 2. PARALELISME: Jalankan ketiga menteri bersamaan (3 Core / Thread)
JALANKAN_PARALEL:
  THREAD 1 (Menteri_Pengairan): Eksekusi(kelompok_air)
  THREAD 2 (Menteri_Kesehatan): Eksekusi(kelompok_medis)
  THREAD 3 (Panglima_Militer):  Eksekusi(kelompok_militer)
TUNGGU_SEMUA_SELESAI()

// Efisiensi: Waktu selesai = 1/3 dari eksekusi berurutan!
TAMPILKAN("Semua krisis terselesaikan 3x lebih cepat!")`,
    funfact: '⚡ Tahukah Kamu? Komputer dan ponsel modern memiliki <strong>prosesor Multi-Core (misal Octa-Core)</strong>. Saat bermain game berat, tugas render grafik, fisika, suara, dan logika AI didekomposisi dan dijalankan secara paralel di core terpisah agar game berjalan mulus tanpa lag!',
    cp_tp: 'Elemen CP: BK (Berpikir Komputasional) — Peserta didik menerapkan pilar <strong>Dekomposisi</strong> untuk memecah masalah besar dan mengorganisasi eksekusi <strong>paralel</strong>.',
  },
};
