/**
 * ============================================================
 * KONFIGURASI GIM EDUKASI: Chef Algorithm — Lomba Masak Digital
 * Informatika Fase D — Algoritma & Pemrograman + Berpikir Komputasional
 * ============================================================
 */

window.GAME_CONFIG = {
  // ------------------------------------------------------------
  // 0. MODE PENGUJIAN
  // ------------------------------------------------------------
  is_testing: 1,

  // ------------------------------------------------------------
  // 1. METADATA
  // ------------------------------------------------------------
  meta: {
    title: 'Chef Algorithm — Lomba Masak Digital',
    tagline: 'Susun resep, atur langkah, sajikan tepat waktu!',
    subject: 'Informatika',
    grade: 'Kelas VII–IX / Fase D',
    phase: 'Fase D',
    element: 'Algoritma & Pemrograman (AP) + Berpikir Komputasional (BK)',
    author: 'Ach. Chanifuddin Fanani, S.Pd.',
    institution: 'SMP Negeri 2 Lamongan',
    background: 'assets/kitchen-bg-light.jpg',
    chefHero: 'assets/characters/chef-main.png',
  },

  // ------------------------------------------------------------
  // 2. TUJUAN PEMBELAJARAN
  // ------------------------------------------------------------
  objectives: [
    'Menyusun langkah-langkah penyelesaian masalah secara <b>sekuensial</b> (berurutan)',
    'Menggunakan <b>logika kondisional</b> (JIKA-MAKA) untuk membuat keputusan',
    'Mengidentifikasi pola berulang dan menggunakan <b>perulangan (loop)</b> untuk efisiensi',
    'Mendekomposisi masalah kompleks menjadi sub-masalah yang lebih sederhana (<b>dekomposisi</b>)',
  ],

  // ------------------------------------------------------------
  // 3. LOGO
  // ------------------------------------------------------------
  logos: {
    header_left: 'assets/kemendikdasmen lengkap.png',
    header_right: 'assets/sobat + bermutu + ramah.png',
    footer_logos: [
      'assets/Logo Tutwuri Kemendikdasmen.png',
      'assets/Logo-Sobat-SMP-2025.png',
      'assets/Logo Pendidikan Bermutu.png',
      'assets/Logo Ramah.png',
    ],
  },

  // ------------------------------------------------------------
  // 4. DEVELOPER
  // ------------------------------------------------------------
  developer: {
    photo: 'assets/fanani.jpg',
    name: 'Ach. Chanifuddin Fanani, S.Pd.',
    school: 'SMP Negeri 2 Lamongan',
    role: 'Guru Informatika & Kecerdasan Artifisial (KKA)',
    description: 'Full-Stack Developer sejak 2013 dan pengajar Informatika yang berdedikasi untuk menciptakan media pembelajaran interaktif yang inovatif dan menyenangkan.',
    email: 'chanif@smpn2lamongan.sch.id',
    website: 'https://chanif.github.io',
  },

  // ------------------------------------------------------------
  // 5. SCORING & BADGES
  // ------------------------------------------------------------
  scoring: {
    maxStarsPerLevel: 3,
    maxScorePerLevel: 250,
    badges: [
      { minScore: 0, name: 'Chef Pemula', emoji: '👨‍🍳', description: 'Baru memulai perjalanan di dapur digital' },
      { minScore: 300, name: 'Chef Handal', emoji: '👨‍🍳', description: 'Sudah menguasai dasar-dasar memasak algoritma' },
      { minScore: 600, name: 'Master Chef', emoji: '👨‍🍳', description: 'Mahir mengolah resep dengan logika yang tepat' },
      { minScore: 900, name: 'Chef Legend', emoji: '👨‍🍳', description: 'Legenda dapur digital! Semua algoritma dikuasai!' },
    ],
  },

  // ------------------------------------------------------------
  // 6. LEVEL 1: SUSUN RESEP (Algoritma Sekuensial)
  // ------------------------------------------------------------
  level1: {
    title: 'Susun Resep Nasi Goreng',
    subtitle: 'Algoritma Sekuensial',
    icon: '🥉',
    dishImage: 'assets/dishes/nasi-goreng.png',
    briefing: 'Seorang chef harus mengikuti langkah yang tepat untuk membuat hidangan sempurna. Susun langkah-langkah memasak Nasi Goreng dalam urutan yang benar!',
    concept: 'Algoritma Sekuensial',
    conceptDesc: 'Algoritma sekuensial adalah serangkaian langkah yang harus dijalankan secara berurutan. Menukar urutan langkah bisa menghasilkan hasil yang berbeda atau gagal!',
    steps: [
      { id: 1, text: 'Cuci dan siapkan bahan', emoji: '🧼', detail: 'Bersihkan sayuran, telur, dan nasi' },
      { id: 2, text: 'Potong bawang & sayuran', emoji: '🔪', detail: 'Iris halus bawang merah, bawang putih, dan daun bawang' },
      { id: 3, text: 'Panaskan minyak di wajan', emoji: '🍳', detail: 'Tuang minyak secukupnya, panaskan hingga cukup panas' },
      { id: 4, text: 'Tumis bumbu hingga harum', emoji: '🧅', detail: 'Masukkan bawang, tumis sampai berubah warna dan harum' },
      { id: 5, text: 'Masukkan nasi, aduk rata', emoji: '🍚', detail: 'Tuang nasi dingin, aduk bersama bumbu agar tercampur merata' },
      { id: 6, text: 'Tambah kecap & bumbu', emoji: '🫗', detail: 'Beri kecap manis, garam, dan merica secukupnya' },
      { id: 7, text: 'Sajikan di piring', emoji: '🍽️', detail: 'Angkat nasi goreng, tata di piring dengan hiasan' },
    ],
    pseudoCode: `ALGORITMA Nasi_Goreng
  LANGKAH 1: Cuci dan siapkan bahan
  LANGKAH 2: Potong bawang & sayuran
  LANGKAH 3: Panaskan minyak di wajan
  LANGKAH 4: Tumis bumbu hingga harum
  LANGKAH 5: Masukkan nasi, aduk rata
  LANGKAH 6: Tambah kecap & bumbu
  LANGKAH 7: Sajikan di piring`,
    funFact: 'Aplikasi ojek online seperti Gojek & Grab menggunakan <b>algoritma sekuensial</b> untuk menentukan langkah-langkah dari menerima order → navigasi → ambil makanan → antar ke pelanggan. Jika urutannya terbalik, pesanan tidak akan pernah sampai!',
    cpTp: {
      cp: 'AP (Algoritma & Pemrograman)',
      tp: 'Peserta didik mampu menyusun langkah-langkah penyelesaian masalah secara sekuensial (berurutan)',
    },
  },

  // ------------------------------------------------------------
  // 7. LEVEL 2: RESEP BERCABANG (Logika Kondisional IF-ELSE)
  // ------------------------------------------------------------
  level2: {
    title: 'Resep Bercabang',
    subtitle: 'Logika Kondisional IF-ELSE',
    icon: '🥈',
    briefing: 'Tamu restoran punya preferensi makanan yang berbeda-beda! Kamu harus membuat keputusan yang tepat berdasarkan kondisi setiap tamu.',
    concept: 'Logika Kondisional IF-ELSE',
    conceptDesc: 'Logika kondisional memungkinkan program membuat keputusan. JIKA suatu kondisi terpenuhi, MAKA lakukan aksi A. JIKA TIDAK, lakukan aksi B.',
    scenarios: [
      {
        id: 1,
        title: 'Tamu Vegetarian',
        question: 'Seorang tamu memesan nasi goreng, tapi dia VEGETARIAN. Apa yang harus kamu lakukan?',
        guestEmoji: '🧑‍🦱',
        guestImage: 'assets/characters/guest-vegetarian.png',
        guestLabel: 'Tamu Vegetarian',
        condition: 'tamu.preferensi == "vegetarian"',
        options: [
          { id: 'a', text: 'Gunakan tahu & tempe sebagai lauk', emoji: '🫘', correct: true },
          { id: 'b', text: 'Gunakan ayam goreng sebagai lauk', emoji: '🍗', correct: false },
          { id: 'c', text: 'Gunakan sosis sapi sebagai lauk', emoji: '🌭', correct: false },
        ],
        feedback_correct: 'Tepat! Tamu vegetarian tidak makan daging. Tahu & tempe adalah pilihan protein nabati yang sempurna!',
        feedback_wrong: 'Oops! Tamu ini vegetarian — tidak makan daging. Coba pilih bahan nabati seperti tahu & tempe.',
        pseudoCode: `JIKA tamu.preferensi == "vegetarian" MAKA
  lauk ← tahu & tempe
JIKA TIDAK MAKA
  lauk ← ayam goreng`,
      },
      {
        id: 2,
        title: 'Tamu Alergi Kacang',
        question: 'Tamu berikutnya memesan gado-gado, tapi dia ALERGI KACANG. Apa yang harus kamu lakukan?',
        guestEmoji: '👩‍🦰',
        guestImage: 'assets/characters/guest-allergy.png',
        guestLabel: 'Tamu Alergi Kacang',
        condition: 'tamu.alergi == "kacang"',
        options: [
          { id: 'a', text: 'Buat saus kacang seperti biasa', emoji: '🥜', correct: false },
          { id: 'b', text: 'Ganti dengan saus wijen', emoji: '🫙', correct: true },
          { id: 'c', text: 'Tambahkan kacang lebih banyak', emoji: '🥜', correct: false },
        ],
        feedback_correct: 'Hebat! Mengganti saus kacang dengan saus wijen adalah solusi aman untuk tamu alergi kacang.',
        feedback_wrong: 'Bahaya! Tamu ini alergi kacang — memberikan kacang bisa membahayakan kesehatannya. Ganti dengan saus wijen!',
        pseudoCode: `JIKA tamu.alergi == "kacang" MAKA
  saus ← saus wijen (aman)
JIKA TIDAK MAKA
  saus ← saus kacang (standar)`,
      },
      {
        id: 3,
        title: 'Tamu Diet Rendah Kalori',
        question: 'Tamu ini sedang DIET dan meminta porsi rendah kalori. Bagaimana cara menyajikan nasi goreng untuknya?',
        guestEmoji: '🧑‍💼',
        guestImage: 'assets/characters/guest-diet.png',
        guestLabel: 'Tamu Diet',
        condition: 'tamu.diet == true',
        options: [
          { id: 'a', text: 'Sajikan porsi jumbo extra nasi', emoji: '🍚', correct: false },
          { id: 'b', text: 'Ganti nasi putih dengan nasi merah & perbanyak sayuran', emoji: '🥗', correct: true },
          { id: 'c', text: 'Tambahkan keju & mentega extra', emoji: '🧈', correct: false },
        ],
        feedback_correct: 'Tepat! Nasi merah lebih rendah glikemik dan sayuran menambah serat — pilihan sempurna untuk diet rendah kalori.',
        feedback_wrong: 'Kurang tepat! Untuk diet rendah kalori, gunakan nasi merah dan perbanyak sayuran agar tetap sehat dan mengenyangkan.',
        pseudoCode: `JIKA tamu.diet == true MAKA
  nasi ← nasi merah
  porsi_sayuran ← ekstra
JIKA TIDAK MAKA
  nasi ← nasi putih
  porsi_sayuran ← standar`,
      },
    ],
    funFact: 'Instagram menggunakan <b>logika IF-ELSE</b> ratusan kali per detik: JIKA usia < 13 → tolak pendaftaran. JIKA postingan mengandung kekerasan → hapus otomatis. JIKA pengguna sudah follow → tampilkan tombol "Following".',
    cpTp: {
      cp: 'AP + BK (Algoritma & Pemrograman + Berpikir Komputasional)',
      tp: 'Peserta didik mampu menggunakan logika kondisional (JIKA-MAKA) untuk membuat keputusan berdasarkan kondisi',
    },
  },

  // ------------------------------------------------------------
  // 8. LEVEL 3: LOOP — MASAK N PORSI EFISIEN
  // ------------------------------------------------------------
  level3: {
    title: 'Masak 10 Porsi Efisien',
    subtitle: 'Perulangan / Loop',
    icon: '🥇',
    briefing: 'Kamu punya resep untuk 1 porsi nasi goreng. Sekarang kamu harus masak 10 porsi untuk acara! Apakah kamu akan menulis resep 10 kali... atau ada cara yang lebih pintar?',
    concept: 'Perulangan / Loop',
    conceptDesc: 'Loop (perulangan) memungkinkan kita menjalankan serangkaian perintah berulang kali tanpa menulis ulang. Ini sangat menghemat waktu dan tenaga!',
    recipe: [
      'Siapkan bahan',
      'Tumis bumbu',
      'Masukkan nasi',
      'Aduk & beri kecap',
      'Sajikan',
    ],
    defaultCount: 10,
    countOptions: [5, 10, 20],
    pseudoCode: `// Tanpa loop: menulis 10 kali!
masak_porsi_1()
masak_porsi_2()
masak_porsi_3()
... (7 baris lagi!)

// Dengan loop: cukup 3 baris!
ULANGI 10 KALI
  masak(nasi_goreng)
  sajikan()`,
    funFact: 'Spotify memutar <b>loop</b> 30 juta lagu setiap hari untuk 500 juta pengguna. Tanpa loop, programmer harus menulis kode untuk setiap lagu satu per satu — itu berarti 30 juta baris kode setiap hari!',
    cpTp: {
      cp: 'AP (Algoritma & Pemrograman)',
      tp: 'Peserta didik mampu mengidentifikasi pola berulang dan menggunakan perulangan (loop) untuk efisiensi',
    },
  },

  // ------------------------------------------------------------
  // 9. LEVEL 4: DEKOMPOSISI & PARALELISME
  // ------------------------------------------------------------
  level4: {
    title: 'Tantangan Waktu — 3 Menu Sekaligus!',
    subtitle: 'Dekomposisi & Paralelisme',
    icon: '🏆',
    briefing: '3 menu harus selesai sebelum waktu habis! Satu orang tidak mungkin menyelesaikan semuanya. Pecah tugas ke 3 asisten dan kerjakan secara bersamaan!',
    concept: 'Dekomposisi & Paralelisme',
    conceptDesc: 'Dekomposisi adalah memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah diselesaikan. Paralelisme adalah mengerjakan bagian-bagian itu secara bersamaan oleh orang/proses yang berbeda.',
    timerSeconds: 45,
    menus: [
      { id: 'nasi-goreng', name: 'Nasi Goreng', emoji: '🍳' },
      { id: 'soto-ayam', name: 'Soto Ayam', emoji: '🍲' },
      { id: 'es-jeruk', name: 'Es Jeruk', emoji: '🍊' },
    ],
    assistants: [
      { id: 'chef-a', name: 'Chef Adi', emoji: '👨‍🍳', image: 'assets/characters/chef-adi.png', color: '#EA580C', station: 'Wajan Nasi Goreng' },
      { id: 'chef-b', name: 'Chef Budi', emoji: '👩‍🍳', image: 'assets/characters/chef-budi.png', color: '#D97706', station: 'Panci Soto Ayam' },
      { id: 'chef-c', name: 'Chef Citra', emoji: '🧑‍🍳', image: 'assets/characters/chef-citra.png', color: '#059669', station: 'Bar Es Jeruk' },
    ],
    tasks: [
      { id: 't1', text: 'Cuci & siapkan bahan nasi goreng', menu: 'nasi-goreng', emoji: '🧼' },
      { id: 't2', text: 'Tumis bumbu & goreng nasi', menu: 'nasi-goreng', emoji: '🍳' },
      { id: 't3', text: 'Rebus ayam untuk soto', menu: 'soto-ayam', emoji: '🐔' },
      { id: 't4', text: 'Siapkan bumbu kuah soto', menu: 'soto-ayam', emoji: '🍲' },
      { id: 't5', text: 'Peras jeruk & siapkan es', menu: 'es-jeruk', emoji: '🧊' },
      { id: 't6', text: 'Campur & sajikan minuman', menu: 'es-jeruk', emoji: '🥤' },
    ],
    pseudoCode: `// Tanpa dekomposisi: 1 orang, semua dikerjakan berurutan
// Total: ~30 menit (sangat lama!)

// Dengan dekomposisi + paralelisme:
MULAI secara BERSAMAAN:
  Chef Adi  → masak Nasi Goreng
  Chef Budi → masak Soto Ayam
  Chef Citra → buat Es Jeruk
TUNGGU semua selesai
// Total: ~10 menit (3x lebih cepat!)`,
    funFact: 'Tim pengembang Minecraft <b>mendekomposisi</b> game raksasa mereka menjadi modul kecil: modul terrain, modul crafting, modul monster — masing-masing dikerjakan tim berbeda secara paralel. Tanpa dekomposisi, Minecraft mungkin butuh 10 tahun untuk dibuat!',
    cpTp: {
      cp: 'BK (Berpikir Komputasional)',
      tp: 'Peserta didik mampu mendekomposisi masalah kompleks menjadi sub-masalah yang lebih sederhana',
    },
  },

  // ------------------------------------------------------------
  // 10. PANDUAN
  // ------------------------------------------------------------
  tutorial: {
    steps: [
      {
        icon: '🎯',
        title: 'Selesaikan Misi',
        desc: 'Setiap level punya misi memasak yang berbeda. Selesaikan misi untuk mendapat bintang!',
      },
      {
        icon: '⭐',
        title: 'Kumpulkan Bintang',
        desc: 'Dapatkan 1–3 bintang per level berdasarkan performamu. Semakin sedikit percobaan, semakin banyak bintang!',
      },
      {
        icon: '🔍',
        title: 'Mode Algoritma',
        desc: 'Setelah menyelesaikan level, lihat pseudo-code dari apa yang baru saja kamu lakukan. Ternyata kamu sudah membuat algoritma!',
      },
      {
        icon: '🏆',
        title: 'Raih Lencana',
        desc: 'Kumpulkan skor untuk naik peringkat: Chef Pemula → Chef Handal → Master Chef → Chef Legend!',
      },
    ],
  },
};
