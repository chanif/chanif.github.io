/**
 * ============================================================
 * KONFIGURASI ASET & TAMPILAN MPI (JavaScript / Static & GitHub Pages)
 * Sistem Komputer — Menyelam ke Dalam Mesin Digital
 * ============================================================
 * File ini berisi seluruh konfigurasi aset visual, logo, latar belakang,
 * ikon navigasi, dan informasi media.
 */

window.MPI_CONFIG = {
    // ------------------------------------------------------------
    // 0. MODE PENGUJIAN / TESTING
    // ------------------------------------------------------------
    // 1 = Tampilkan nomor halaman di bawah tengah (untuk mempermudah koreksi/revisi)
    // 0 = Mode produksi/normal (nomor halaman disembunyikan)
    is_testing: 0,

    // ------------------------------------------------------------
    // 1. LATAR BELAKANG (BACKGROUND)
    // ------------------------------------------------------------
    background: {
        // Path gambar latar belakang ruang kelas (mendukung JPG, PNG, WEBP, SVG)
        // Kosongkan ('') jika ingin menggunakan latar belakang animasi SVG internal
        image: 'assets/bg-jaringan-orange.png',

        // Mode tampilan background ('cover', 'contain', '100% 100%')
        size: 'cover',

        // Posisi background
        position: 'center center',

        // Lapisan overlay putih untuk melembutkan warna background agar nyaman di mata
        // 0.0 = tanpa overlay, 0.35 s.d 0.50 = soft/lembut (direkomendasikan), 1.0 = putih penuh
        overlay_opacity: 0.40,

        // Warna lapisan overlay (default: putih transparan)
        overlay_color: 'rgba(255, 255, 255, 0.40)',

        // Opacity latar kotak konten (0.0 s.d 1.0)
        box_opacity: 0.88,
    },

    // ------------------------------------------------------------
    // 2. LOGO INSTITUSI
    // ------------------------------------------------------------
    logos: {
        // Header Cover (Pojok Kiri Atas)
        header_left: '',

        // Header Cover (Pojok Kanan Atas)
        header_right: '',

        // 4 Logo Berjajar di Halaman Kredit/Penutup (Urut dari Kiri ke Kanan)
        footer_logos: [
            'assets/Logo Tutwuri Kemendikdasmen.png',
            'assets/Logo-Sobat-SMP-2025.png',
            'assets/Logo Pendidikan Bermutu.png',
            'assets/Logo Ramah.png',
        ],
    },

    // ------------------------------------------------------------
    // 3. ASET MEDIA & PENGEMBANG
    // ------------------------------------------------------------
    assets: {
        // Foto Pengembang di Halaman Pengembang
        dev_photo_1: 'assets/fanani.jpg',
        dev_photo_2: 'assets/ilyas.jpeg',

        // Video materi lokal (offline ready)
        video_src: 'assets/video/jaringan.mp4',
    },

    // ------------------------------------------------------------
    // 4. IKON & TOMBOL NAVIGASI
    // ------------------------------------------------------------
    navigation: {
        // Teks atau path gambar untuk tombol navigasi
        btn_beranda_icon: '🏠',
        btn_beranda_label: 'BERANDA',

        btn_menu_icon: '☰',
        btn_menu_label: 'MENU',

        btn_prev_icon: '◀',
        btn_next_icon: '▶',

        btn_mulai_icon: '▶',
        btn_mulai_label: 'MULAI',
    },

    // ------------------------------------------------------------
    // 5. PALET WARNA (Design System: Informatika Fase D)
    // ------------------------------------------------------------
    colors: {
        teal_primary: '#00ACC1', // Warna dominan: title bar, tombol bulat navigasi
        cyan_medium: '#4DD0E1', // Gradasi sekunder, aksen dekoratif
        cyan_light: '#E0F7FA', // Latar kotak konten semi-transparan
        blue_accent: '#0288D1', // Aksen tombol / ikon alternatif
        teal_dark: '#006064', // Teks tebal & outline kontras gelap
    },

    // ------------------------------------------------------------
    // 6. METADATA MEDIA PEMBELAJARAN
    // ------------------------------------------------------------
    meta: {
        title: 'Jaringan Komputer — Perjalanan Paket Data',
        subject: 'Informatika',
        grade: 'Kelas VIII / Semester II (Genap)',
        phase: 'Fase D',
        author: 'Ach. Chanifuddin Fanani, S.Pd.',
        institution: 'SMP Negeri 2 Lamongan',
        publisher: 'Direktorat Sekolah Menengah Pertama — Kemendikdasmen',
    }
};
