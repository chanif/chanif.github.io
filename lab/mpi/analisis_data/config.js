/**
 * ============================================================
 * KONFIGURASI ASET & TAMPILAN MPI (JavaScript / Static & GitHub Pages)
 * Analisis Data — Mengungkap Cerita di Balik Angka
 * ============================================================
 * File ini berisi seluruh konfigurasi aset visual, logo, latar belakang,
 * tombol navigasi, dan metadata modul Informatika Fase D.
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
        // Path gambar latar belakang studio analisis data (mendukung JPG, PNG, WEBP, SVG)
        image: 'assets/bg-data-clean.jpg',

        // Mode tampilan background ('cover', 'contain', '100% 100%')
        size: 'cover',

        // Posisi background
        position: 'center center',

        // Lapisan overlay putih untuk melembutkan warna background agar nyaman di mata
        overlay_opacity: 0.42,

        // Warna lapisan overlay (default: putih transparan)
        overlay_color: 'rgba(255, 255, 255, 0.42)',

        // Opacity latar kotak konten (0.0 s.d 1.0)
        box_opacity: 0.90,
    },

    // ------------------------------------------------------------
    // 2. LOGO INSTITUSI
    // ------------------------------------------------------------
    logos: {
        // Header Cover (Pojok Kiri & Kanan Atas, jika kosong memakai src HTML)
        header_left: '',
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
        // Foto Pengembang di Halaman Profil Pengembang
        dev_photo_1: 'assets/fanani.jpg',

        // Video lokal opsional (kosongkan '' untuk menjalankan Player Animasi Interaktif HTML5/SVG bawaan)
        video_src: '',
    },

    // ------------------------------------------------------------
    // 4. IKON & TOMBOL NAVIGASI
    // ------------------------------------------------------------
    navigation: {
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
        teal_primary: '#00ACC1',
        cyan_medium: '#4DD0E1',
        cyan_light: '#E0F7FA',
        blue_accent: '#0288D1',
        teal_dark: '#006064',
    },

    // ------------------------------------------------------------
    // 6. METADATA MEDIA PEMBELAJARAN
    // ------------------------------------------------------------
    meta: {
        title: 'Analisis Data — Mengungkap Cerita di Balik Angka',
        subject: 'Informatika',
        grade: 'Kelas VII–VIII SMP',
        phase: 'Fase D',
        author: 'Ach. Chanifuddin Fanani, S.Pd.',
        institution: 'SMP Negeri 2 Lamongan',
        publisher: 'Direktorat Sekolah Menengah Pertama — Kemendikdasmen',
    }
};
