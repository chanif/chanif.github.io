/**
 * ============================================================
 * Fanani Learning Platform — Client Tracker & API Connector
 * Hybrid sync: LocalStorage + Cloudflare Edge D1 (api.fanani.my.id)
 * ============================================================
 */

const FananiTracker = (() => {
    const API_BASE_URL = 'https://api.fanani.my.id'; // Cloudflare Workers + D1 Database

    // Complete curriculum directory structure for Informatika & KKA
const COURSE_CATALOG = {
        informatika: [
            {
                unit_id: '01',
                title: 'Pengantar Informatika',
                desc: 'Konsep dasar, sejarah, profesi, dan peran komputasi dalam kehidupan',
                path: 'informatika/01-pengantar-informatika/',
                topics: [
                    { id: 'inf-intro-01', title: 'Apa Itu Informatika & 8 Pilar Kurikulum Merdeka', path: 'informatika/01-pengantar-informatika/01-apa-itu-informatika/' },
                    { id: 'inf-intro-02', title: 'Sejarah & Perkembangan Informatika: Dari Abakus hingga AI', path: 'informatika/01-pengantar-informatika/02-sejarah-perkembangan/' },
                    { id: 'inf-intro-03', title: 'Profesi & Peta Karier di Bidang Informatika', path: 'informatika/01-pengantar-informatika/03-profesi-di-bidang-informatika/' },
                    { id: 'inf-intro-04', title: 'Informatika di Sekitar Kita & Revolusi Industri 4.0', path: 'informatika/01-pengantar-informatika/04-informatika-di-sekitar-kita/' }
                ]
            },
            {
                unit_id: '02',
                title: 'Berpikir Komputasional',
                desc: '4 pilar pemecahan masalah algoritmis: dekomposisi, pola, abstraksi, algoritma',
                path: 'informatika/02-berpikir-komputasional/',
                topics: [
                    { id: 'inf-bk-01', title: 'Dekomposisi: Seni Memecah Masalah Besar', path: 'informatika/02-berpikir-komputasional/01-dekomposisi/' },
                    { id: 'inf-bk-02-pola', title: 'Pengenalan Pola (Pattern Recognition)', path: 'informatika/02-berpikir-komputasional/02-pengenalan-pola/' },
                    { id: 'inf-bk-03-abstraksi', title: 'Abstraksi: Memilah Informasi Esensial', path: 'informatika/02-berpikir-komputasional/03-abstraksi/' },
                    { id: 'inf-bk-04-algoritma', title: 'Algoritma, Flowchart & Pseudocode', path: 'informatika/02-berpikir-komputasional/04-algoritma-dan-pseudocode/' },
                    { id: 'inf-bk-02', title: 'Berpikir Komputasional: Algoritma di Balik Rumah Cerdas (IoT)', path: 'informatika/02-berpikir-komputasional/05-studi-kasus-rumah-cerdas/' },
                    { id: 'inf-bk-06', title: 'Proyek Mandiri Berpikir Komputasional', path: 'informatika/02-berpikir-komputasional/06-proyek-bk/' }
                ]
            },
            {
                unit_id: '03',
                title: 'Teknologi Informasi & Komunikasi',
                desc: 'Perangkat lunak produktivitas, kolaborasi cloud, presentasi, dan desain grafis',
                path: 'informatika/03-teknologi-informasi-komunikasi/',
                topics: [
                    { id: 'inf-tik-01', title: 'Perangkat Lunak Produktivitas', path: 'informatika/03-teknologi-informasi-komunikasi/01-perangkat-lunak-produktivitas/' },
                    { id: 'inf-tik-02', title: 'Pengolahan Dokumen Digital & Mail Merge', path: 'informatika/03-teknologi-informasi-komunikasi/02-pengolahan-dokumen-digital/' },
                    { id: 'inf-tik-03', title: 'Presentasi Efektif & Desain Slide Memikat', path: 'informatika/03-teknologi-informasi-komunikasi/03-presentasi-efektif/' },
                    { id: 'inf-tik-04', title: 'Kolaborasi Cloud & Penyimpanan Digital', path: 'informatika/03-teknologi-informasi-komunikasi/04-kolaborasi-cloud/' },
                    { id: 'inf-tik-05', title: 'Desain Grafis Dasar & Teori Warna', path: 'informatika/03-teknologi-informasi-komunikasi/05-desain-grafis-dasar/' }
                ]
            },
            {
                unit_id: '04',
                title: 'Sistem Komputer',
                desc: 'Perangkat keras (hardware), software, OS, sistem bilangan, dan interaksi manusia-komputer',
                path: 'informatika/04-sistem-komputer/',
                topics: [
                    { id: 'inf-sk-01', title: 'Mengenal Perangkat Komputer', path: 'informatika/04-sistem-komputer/01-perangkat-keras/' },
                    { id: 'inf-sk-02', title: 'Perangkat Lunak & Sistem Operasi', path: 'informatika/04-sistem-komputer/02-perangkat-lunak-sistem-operasi/' },
                    { id: 'inf-sk-03', title: 'Representasi Data Digital: Bit, Teks, Gambar & Suara', path: 'informatika/04-sistem-komputer/03-representasi-data-digital/' },
                    { id: 'inf-sk-04', title: 'Sistem Bilangan', path: 'informatika/04-sistem-komputer/04-sistem-bilangan/' },
                    { id: 'inf-sk-05', title: 'Interaksi Manusia-Komputer (IMK) & Prinsip UI/UX', path: 'informatika/04-sistem-komputer/05-interaksi-manusia-komputer/' }
                ]
            },
            {
                unit_id: '05',
                title: 'Jaringan Komputer & Internet',
                desc: 'Topologi, arsitektur TCP/IP, DNS, paket data, dan keamanan koneksi jaringan',
                path: 'informatika/05-jaringan-komputer-internet/',
                topics: [
                    { id: 'inf-jki-01', title: 'Jaringan Komputer & Internet', path: 'informatika/05-jaringan-komputer-internet/01-pengenalan-jaringan/' },
                    { id: 'inf-jki-02', title: 'Topologi & Perangkat Jaringan Komputer', path: 'informatika/05-jaringan-komputer-internet/02-topologi-dan-perangkat/' },
                    { id: 'inf-jki-03', title: 'Protokol Jaringan, IP Address & DNS', path: 'informatika/05-jaringan-komputer-internet/03-protokol-ip-address-dns/' },
                    { id: 'inf-jk-02', title: 'Jaringan Komputer: Perjalanan Paket Data di Internet', path: 'informatika/05-jaringan-komputer-internet/04-perjalanan-paket-data/' },
                    { id: 'inf-jki-05', title: 'Layanan Internet & Mesin Pencari Cerdas', path: 'informatika/05-jaringan-komputer-internet/05-layanan-internet/' },
                    { id: 'inf-jki-06', title: 'Internet & Keamanan Digital', path: 'informatika/05-jaringan-komputer-internet/06-keamanan-jaringan/' }
                ]
            },
            {
                unit_id: '06',
                title: 'Analisis Data',
                desc: 'Pengumpulan, pembersihan data, pengolahan spreadsheet, dan visualisasi grafik',
                path: 'informatika/06-analisis-data/',
                topics: [
                    { id: 'inf-ad-01', title: 'Pengantar Analisis Data & Hierarki DIKW', path: 'informatika/06-analisis-data/01-pengantar-data/' },
                    { id: 'inf-ad-02', title: 'Metode Pengumpulan Data & Etika Kuesioner', path: 'informatika/06-analisis-data/02-pengumpulan-data/' },
                    { id: 'inf-ad-03', title: 'Pengolahan Data dengan Google Sheets', path: 'informatika/06-analisis-data/03-pengolahan-spreadsheet/' },
                    { id: 'inf-ad-04', title: 'Visualisasi Data: Seni Mengubah Angka Menjadi Cerita', path: 'informatika/06-analisis-data/04-visualisasi-data/' },
                    { id: 'inf-ad-05', title: 'Interpretasi Data & Menarik Kesimpulan', path: 'informatika/06-analisis-data/05-interpretasi-kesimpulan/' },
                    { id: 'inf-ad-06', title: 'Proyek Analisis Data Mandiri', path: 'informatika/06-analisis-data/06-proyek-analisis-data/' }
                ]
            },
            {
                unit_id: '07',
                title: 'Algoritma & Pemrograman',
                desc: 'Flowchart, Scratch blok, variabel, percabangan if-else, loop, dan Python dasar',
                path: 'informatika/07-algoritma-pemrograman/',
                topics: [
                    { id: 'inf-ap-01', title: 'Algoritma & Flowchart', path: 'informatika/07-algoritma-pemrograman/01-konsep-algoritma/' },
                    { id: 'inf-ap-02', title: 'Scratch Lanjutan: Game & Animasi Interaktif', path: 'informatika/07-algoritma-pemrograman/02-pemrograman-blok-scratch/' },
                    { id: 'inf-ap-03', title: 'Variabel, Tipe Data & Operator', path: 'informatika/07-algoritma-pemrograman/03-variabel-dan-tipe-data/' },
                    { id: 'inf-ap-04', title: 'Struktur Percabangan (If-Else & Elif)', path: 'informatika/07-algoritma-pemrograman/04-percabangan-if-else/' },
                    { id: 'inf-ap-05', title: 'Logika: Percabangan & Pengulangan', path: 'informatika/07-algoritma-pemrograman/05-perulangan-loop/' },
                    { id: 'inf-ap-06', title: 'Python Turtle: Belajar Coding Lewat Menggambar', path: 'informatika/07-algoritma-pemrograman/06-python-dasar/' },
                    { id: 'inf-ap-07', title: 'Fungsi & Modularitas Kode', path: 'informatika/07-algoritma-pemrograman/07-fungsi-dan-modularitas/' },
                    { id: 'inf-ap-08', title: 'Proyek Pemrograman Mandiri', path: 'informatika/07-algoritma-pemrograman/08-proyek-pemrograman/' }
                ]
            },
            {
                unit_id: '08',
                title: 'Dampak Sosial Informatika',
                desc: 'Etika digital netiket, rekam jejak digital, privasi, HKI, dan anti cyberbullying & hoax',
                path: 'informatika/08-dampak-sosial-informatika/',
                topics: [
                    { id: 'inf-dsi-01', title: 'Etika Digital & Netiquette', path: 'informatika/08-dampak-sosial-informatika/01-etika-digital/' },
                    { id: 'inf-dsi-02', title: 'Rekam Jejak Digital', path: 'informatika/08-dampak-sosial-informatika/02-rekam-jejak-digital/' },
                    { id: 'inf-dsi-03', title: 'Keamanan & Privasi Data Pribadi', path: 'informatika/08-dampak-sosial-informatika/03-keamanan-privasi-data/' },
                    { id: 'inf-dsi-04', title: 'Hak Kekayaan Intelektual (HKI) & Lisensi Digital', path: 'informatika/08-dampak-sosial-informatika/04-hak-kekayaan-intelektual/' },
                    { id: 'inf-dsi-05', title: 'Pencegahan Cyberbullying & Deteksi Hoax', path: 'informatika/08-dampak-sosial-informatika/05-cyberbullying-dan-hoax/' },
                    { id: 'inf-dsi-06', title: 'Kewargaan Digital', path: 'informatika/08-dampak-sosial-informatika/06-kewargaan-digital/' }
                ]
            },
            {
                unit_id: '09',
                title: 'Praktik Lintas Bidang (PLB)',
                desc: 'Membuat website HTML/CSS, UI/UX, mobile app inventor, dan pameran digital',
                path: 'informatika/09-praktik-lintas-bidang/',
                topics: [
                    { id: 'inf-plb-01', title: 'Membuat Website dengan HTML', path: 'informatika/09-praktik-lintas-bidang/01-membuat-website-html/' },
                    { id: 'inf-plb-02', title: 'Mempercantik Web dengan CSS', path: 'informatika/09-praktik-lintas-bidang/02-styling-dengan-css/' },
                    { id: 'inf-plb-03', title: 'UI/UX Dasar: Desain yang Nyaman', path: 'informatika/09-praktik-lintas-bidang/03-ui-ux-dasar/' },
                    { id: 'inf-plb-04', title: 'App Inventor: Buat Aplikasi Android', path: 'informatika/09-praktik-lintas-bidang/04-app-inventor/' },
                    { id: 'inf-plb-05', title: 'Proyek Pameran Digital', path: 'informatika/09-praktik-lintas-bidang/05-proyek-pameran-digital/' }
                ]
            },
            {
                unit_id: '10',
                title: 'Informatika Lanjut',
                desc: 'Struktur data, OOP Python lanjutan, SQL database, web JS DOM, dan kriptografi',
                path: 'informatika/10-informatika-lanjut/',
                topics: [
                    { id: 'inf-lanjut-01', title: 'Struktur Data: Stack, Queue & Array', path: 'informatika/10-informatika-lanjut/01-struktur-data/' },
                    { id: 'inf-lanjut-02', title: 'Pemrograman Berorientasi Objek (OOP) Python', path: 'informatika/10-informatika-lanjut/02-oop-python-lanjutan/' },
                    { id: 'inf-lanjut-03', title: 'Basis Data Relasional & Query SQL', path: 'informatika/10-informatika-lanjut/03-basis-data-sql/' },
                    { id: 'inf-lanjut-04', title: 'Pemrograman Web: JavaScript & DOM', path: 'informatika/10-informatika-lanjut/04-pemrograman-web-javascript/' },
                    { id: 'inf-lanjut-05', title: 'Keamanan Siber & Kriptografi Dasar', path: 'informatika/10-informatika-lanjut/05-keamanan-siber-kriptografi/' }
                ]
            }
        ],
        coding: [
            {
                unit_id: '01',
                title: 'Berpikir Komputasional KKA',
                desc: 'Logika penalaran komputasi, dekomposisi koding, dan aktivitas unplugged',
                path: 'coding/01-berpikir-komputasional/',
                topics: [
                    { id: 'kka-bk-01', title: 'Logika & Penalaran Komputasi', path: 'coding/01-berpikir-komputasional/01-logika-dan-penalaran/' },
                    { id: 'kka-bk-02', title: 'Dekomposisi Masalah Koding & AI', path: 'coding/01-berpikir-komputasional/02-dekomposisi-masalah/' },
                    { id: 'kka-bk-03', title: 'Pengenalan Pola dalam Data & AI', path: 'coding/01-berpikir-komputasional/03-pengenalan-pola/' },
                    { id: 'kka-bk-04', title: 'Abstraksi & Generalisasi Komputasi', path: 'coding/01-berpikir-komputasional/04-abstraksi-dan-generalisasi/' },
                    { id: 'kka-bk-05', title: 'Perancangan Algoritma & Efisiensi', path: 'coding/01-berpikir-komputasional/05-perancangan-algoritma/' },
                    { id: 'kka-bk-06', title: 'Berpikir Komputasional Unplugged', path: 'coding/01-berpikir-komputasional/06-computational-thinking-unplugged/' }
                ]
            },
            {
                unit_id: '02',
                title: 'Literasi Digital KKA',
                desc: 'Identitas digital, keamanan akun 2FA, verifikasi SIFT, dan lisensi Creative Commons',
                path: 'coding/02-literasi-digital/',
                topics: [
                    { id: 'kka-ld-01', title: 'Identitas Digital & Jejak Online', path: 'coding/02-literasi-digital/01-identitas-digital-jejak-online/' },
                    { id: 'kka-ld-02', title: 'Keamanan Siber Dasar', path: 'coding/02-literasi-digital/02-keamanan-siber-dasar/' },
                    { id: 'kka-ld-03', title: 'Literasi Informasi & Deteksi Hoax', path: 'coding/02-literasi-digital/03-literasi-informasi-hoax/' },
                    { id: 'kka-ld-04', title: 'Produksi Konten Digital yang Etis', path: 'coding/02-literasi-digital/04-produksi-konten-digital-etis/' },
                    { id: 'kka-ld-05', title: 'Hak Cipta & Lisensi Creative Commons', path: 'coding/02-literasi-digital/05-hak-cipta-lisensi-creative-commons/' }
                ]
            },
            {
                unit_id: '03',
                title: 'Literasi & Etika AI',
                desc: 'Cara kerja machine learning, mitigasi bias algoritma, privasi data, dan etika AI',
                path: 'coding/03-literasi-etika-ai/',
                topics: [
                    { id: 'kka-ai-01', title: 'Apa Itu Kecerdasan Buatan (AI)? 🤖✨', path: 'coding/03-literasi-etika-ai/01-apa-itu-kecerdasan-artifisial/' },
                    { id: 'kka-ai-02', title: 'Cara Kerja Machine Learning 🧠', path: 'coding/03-literasi-etika-ai/02-cara-kerja-machine-learning/' },
                    { id: 'kka-ai-03', title: 'Jenis-Jenis & Cabang Kecerdasan Artifisial', path: 'coding/03-literasi-etika-ai/03-jenis-jenis-ai/' },
                    { id: 'kka-ai-04', title: 'Bias & Keadilan dalam AI ⚖️', path: 'coding/03-literasi-etika-ai/04-bias-dan-keadilan-ai/' },
                    { id: 'kka-ai-05', title: 'Deepfake & Misinformasi AI', path: 'coding/03-literasi-etika-ai/05-deepfake-misinformasi-ai/' },
                    { id: 'kka-ai-06', title: 'Etika & Tanggung Jawab AI 🛡️', path: 'coding/03-literasi-etika-ai/06-etika-tanggung-jawab-ai/' },
                    { id: 'kka-ai-07', title: 'AI & Masa Depan Dunia Kerja', path: 'coding/03-literasi-etika-ai/07-ai-dan-masa-depan-pekerjaan/' }
                ]
            },
            {
                unit_id: '04',
                title: 'Pemanfaatan & Pengembangan AI',
                desc: 'Generative AI, prompting cerdas, Teachable Machine, dan solusi AI',
                path: 'coding/04-pemanfaatan-pengembangan-ai/',
                topics: [
                    { id: 'kka-genai-01', title: 'Mengenal Generative AI 🎨✍️', path: 'coding/04-pemanfaatan-pengembangan-ai/01-mengenal-generative-ai/' },
                    { id: 'kka-genai-02', title: 'Prompt Engineering: Seni Memerintah AI 🎯', path: 'coding/04-pemanfaatan-pengembangan-ai/02-prompt-engineering/' },
                    { id: 'kka-genai-03', title: 'AI untuk Teks & Penulisan Kreatif', path: 'coding/04-pemanfaatan-pengembangan-ai/03-ai-untuk-teks-dan-tulisan/' },
                    { id: 'kka-genai-04', title: 'AI untuk Gambar & Multimedia 🎨🖼️', path: 'coding/04-pemanfaatan-pengembangan-ai/04-ai-untuk-gambar-dan-multimedia/' },
                    { id: 'kka-genai-05', title: 'AI Asisten Belajar Pribadi 📚🤖', path: 'coding/04-pemanfaatan-pengembangan-ai/05-ai-asisten-belajar/' },
                    { id: 'kka-genai-06', title: 'Melatih AI dengan Teachable Machine 📷🤖', path: 'coding/04-pemanfaatan-pengembangan-ai/06-teachable-machine/' },
                    { id: 'kka-genai-07', title: 'Proyek Mini: Pendeteksi Sampah AI ♻️📷', path: 'coding/04-pemanfaatan-pengembangan-ai/07-proyek-image-classifier/' },
                    { id: 'kka-genai-08', title: 'Merancang Solusi Berbasis AI 🚀💡', path: 'coding/04-pemanfaatan-pengembangan-ai/08-merancang-solusi-berbasis-ai/' }
                ]
            },
            {
                unit_id: '05',
                title: 'Algoritma & Pemrograman KKA',
                desc: 'Koding visual Scratch, event, variabel, looping, transisi ke Python, dan game',
                path: 'coding/05-algoritma-pemrograman/',
                topics: [
                    { id: 'kka-ap-01', title: 'Pemrograman Blok Scratch', path: 'coding/05-algoritma-pemrograman/01-pemrograman-blok-scratch/' },
                    { id: 'kka-ap-02', title: 'Event & Interaksi Pengguna', path: 'coding/05-algoritma-pemrograman/02-event-dan-interaksi/' },
                    { id: 'kka-ap-03', title: 'Variabel & Percabangan Kondisional', path: 'coding/05-algoritma-pemrograman/03-variabel-dan-kondisi/' },
                    { id: 'kka-ap-04', title: 'Pengulangan & Fungsi Kustom', path: 'coding/05-algoritma-pemrograman/04-pengulangan-dan-fungsi/' },
                    { id: 'kka-ap-05', title: 'Pengenalan Bahasa Python', path: 'coding/05-algoritma-pemrograman/05-pengenalan-python/' },
                    { id: 'kka-ap-06', title: 'Python untuk Pengolahan Data Sederhana', path: 'coding/05-algoritma-pemrograman/06-python-untuk-data-sederhana/' },
                    { id: 'kka-ap-07', title: 'Membuat Game Sederhana', path: 'coding/05-algoritma-pemrograman/07-membuat-game-sederhana/' },
                    { id: 'kka-ap-08', title: 'Proyek Akhir Aplikasi Koding', path: 'coding/05-algoritma-pemrograman/08-proyek-aplikasi-koding/' }
                ]
            },
            {
                unit_id: '06',
                title: 'Analisis Data KKA',
                desc: 'Piramida DIKW, dataset publik, visualisasi grafik, dan data-driven decision',
                path: 'coding/06-analisis-data/',
                topics: [
                    { id: 'kka-ad-01', title: 'Apa Itu Data? Fondasi Kecerdasan Artifisial', path: 'coding/06-analisis-data/01-apa-itu-data/' },
                    { id: 'kka-ad-02', title: 'Metode & Etika Pengumpulan Data', path: 'coding/06-analisis-data/02-mengumpulkan-data/' },
                    { id: 'kka-ad-03', title: 'Menyajikan Data: Tabel & Visualisasi Grafik', path: 'coding/06-analisis-data/03-menyajikan-data-tabel-grafik/' },
                    { id: 'kka-ad-04', title: 'Menganalisis Pola & Tren Data', path: 'coding/06-analisis-data/04-menganalisis-pola-data/' },
                    { id: 'kka-ad-05', title: 'Data & Pengambilan Keputusan', path: 'coding/06-analisis-data/05-data-dan-pengambilan-keputusan/' },
                    { id: 'kka-ad-06', title: 'Proyek Akhir Analisis Data & Kolaborasi AI', path: 'coding/06-analisis-data/06-proyek-analisis-data/' }
                ]
            },
            {
                unit_id: '07',
                title: 'Koding Kreatif Lanjutan & Capstone AI',
                desc: 'Python ML, NLP, OpenCV Computer Vision, Chatbot AI, Robotika, dan Capstone',
                path: 'coding/07-koding-kreatif-lanjutan/',
                topics: [
                    { id: 'kka-adv-01', title: 'Python untuk Machine Learning', path: 'coding/07-koding-kreatif-lanjutan/01-python-untuk-machine-learning/' },
                    { id: 'kka-adv-02', title: 'Natural Language Processing (NLP)', path: 'coding/07-koding-kreatif-lanjutan/02-natural-language-processing/' },
                    { id: 'kka-adv-03', title: 'Computer Vision & OpenCV', path: 'coding/07-koding-kreatif-lanjutan/03-computer-vision-opencv/' },
                    { id: 'kka-adv-04', title: 'Membangun Chatbot AI Interaktif', path: 'coding/07-koding-kreatif-lanjutan/04-chatbot-ai/' },
                    { id: 'kka-adv-05', title: 'Robotika Cerdas & Simulasi Digital', path: 'coding/07-koding-kreatif-lanjutan/05-robotika-simulasi/' },
                    { id: 'kka-adv-06', title: 'Proyek Capstone AI & Koding Lanjutan', path: 'coding/07-koding-kreatif-lanjutan/06-proyek-capstone-ai/' }
                ]
            }
        ]
    };

    const LEGACY_TOPIC_ALIASES = {
        'inf-sistem-01': 'inf-sk-01',
        'inf-sistem-04': 'inf-sk-04',
        'inf-jaringan-01': 'inf-jki-01',
        'inf-jaringan-06': 'inf-jki-06',
        'inf-analisis-03': 'inf-ad-03',
        'inf-algoritma-01': 'inf-ap-01',
        'inf-algoritma-02': 'inf-ap-02',
        'inf-algoritma-05': 'inf-ap-05',
        'inf-algoritma-06': 'inf-ap-06',
        'inf-dampak-02': 'inf-dsi-02',
        'inf-dampak-06': 'inf-dsi-06',
        'inf-praktik-01': 'inf-plb-01',
        'inf-praktik-02': 'inf-plb-02',
        'inf-praktik-03': 'inf-plb-03',
        'inf-praktik-04': 'inf-plb-04',
        'inf-praktik-05': 'inf-plb-05'
    };

    function normalizeTopicId(topicId) {
        const clean = String(topicId || '').trim();
        return LEGACY_TOPIC_ALIASES[clean] || clean;
    }

    function migrateLegacyLocalKeys() {
        try {
            const prog = getLocalProgress();
            let progChanged = false;
            Object.keys(LEGACY_TOPIC_ALIASES).forEach(oldId => {
                const newId = LEGACY_TOPIC_ALIASES[oldId];
                if (prog[oldId] && !prog[newId]) {
                    prog[newId] = true;
                    progChanged = true;
                }
                const oldEvalRaw = localStorage.getItem(`eval_hist_${oldId}`);
                if (oldEvalRaw) {
                    const oldList = JSON.parse(oldEvalRaw || '[]');
                    const curList = JSON.parse(localStorage.getItem(`eval_hist_${newId}`) || '[]');
                    if (Array.isArray(oldList) && oldList.length > 0 && curList.length === 0) {
                        localStorage.setItem(`eval_hist_${newId}`, JSON.stringify(oldList.map(e => ({ ...e, topic_id: newId }))));
                    }
                }
                const oldRefl = localStorage.getItem(`refl_${oldId}`);
                if (oldRefl && !localStorage.getItem(`refl_${newId}`)) {
                    localStorage.setItem(`refl_${newId}`, oldRefl);
                }
            });
            if (progChanged) {
                localStorage.setItem('fanani_edu_progress', JSON.stringify(prog));
            }
        } catch (e) {}
    }

    function getToken() {
        try {
            return localStorage.getItem('fanani_auth_token') || null;
        } catch (e) {
            return null;
        }
    }

    function getUser() {
        try {
            const user = JSON.parse(localStorage.getItem('fanani_user') || 'null');
            if (user) {
                return user;
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    function getUserIdentity() {
        const user = getUser();
        if (!user || !user.google_id || !user.email) return null;
        return {
            google_id: String(user.google_id).trim(),
            email: String(user.email).trim(),
            full_name: String(user.full_name || user.name || '').trim(),
            kelas: String(user.kelas || '').trim()
        };
    }

    function getUserProfilePayload() {
        const user = getUser();
        if (!user) return null;
        return {
            full_name: String(user.full_name || user.name || '').trim(),
            kelas: String(user.kelas || '').trim()
        };
    }

    function hasServerAuth() {
        return Boolean(getToken() || getUserIdentity());
    }

    function persistRecoveredToken(data) {
        try {
            const newTok = data && (data.session_token || data.token);
            if (newTok) {
                localStorage.setItem('fanani_auth_token', newTok);
            }
        } catch (e) {}
    }

    function getLocalProgress() {
        try {
            return JSON.parse(localStorage.getItem('fanani_edu_progress') || localStorage.getItem('fanani_learn_progress') || '{}');
        } catch (e) {
            return {};
        }
    }

    function setLocalProgress(topicId, isCompleted = true) {
        try {
            const tid = normalizeTopicId(topicId);
            const prog = getLocalProgress();
            prog[tid] = isCompleted;
            localStorage.setItem('fanani_edu_progress', JSON.stringify(prog));
        } catch (e) {}
    }

    // Helper to safely handle HTTP 401 (Expired/Revoked Token)
    function handleAuthStatus(res) {
        if (res && res.status === 401) {
            console.warn('[Tracker] Sesi login telah berakhir atau tidak valid (401). Membersihkan token.');
            localStorage.removeItem('fanani_auth_token');
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('fanani_session_expired', {
                    detail: { message: 'Sesi login telah berakhir. Progres lokal Anda tetap tersimpan.' }
                }));
            }
            return false;
        }
        return true;
    }

    // Record or sync completion status
    async function markCompleted(subject, topicId) {
        const canonicalId = normalizeTopicId(topicId);
        setLocalProgress(canonicalId, true);

        const token = getToken();
        const identity = getUserIdentity();
        if (!token && !identity) return { success: true, mode: 'local' };

        try {
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${API_BASE_URL}/save_progress`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    subject,
                    topic_id: canonicalId,
                    status: 'completed',
                    user_identity: identity,
                    user_profile: getUserProfilePayload()
                })
            });
            if (!handleAuthStatus(res)) {
                return { success: false, mode: 'session_expired' };
            }
            if (!res.ok) {
                const syncFallback = await syncData(true);
                return syncFallback && syncFallback.success ? { success: true, mode: 'synced' } : { success: false, mode: 'local_fallback' };
            }
            const data = await res.json();
            persistRecoveredToken(data);
            syncData(false).catch(() => {});
            return { success: Boolean(data && data.success), mode: 'server' };
        } catch (err) {
            console.warn('[Tracker] Offline fallback for progress:', err);
            const syncFallback = await syncData(true).catch(() => null);
            return syncFallback && syncFallback.success ? { success: true, mode: 'synced' } : { success: true, mode: 'local_fallback' };
        }
    }

    function mountAuthSyncCard(totalScore, syncResult) {
        try {
            const html = getAuthSyncHtml(totalScore, syncResult);
            const existing = document.getElementById('eval-auth-sync-card');
            if (existing) {
                existing.outerHTML = html;
                return;
            }
            const recap = document.getElementById('eval-recap-result');
            if (recap) {
                const temp = document.createElement('div');
                temp.innerHTML = html;
                if (temp.firstElementChild) recap.appendChild(temp.firstElementChild);
                return;
            }
            const histBox = document.getElementById('attempt-history-box');
            if (histBox && histBox.parentElement) {
                const temp = document.createElement('div');
                temp.innerHTML = html;
                if (temp.firstElementChild) histBox.parentElement.insertBefore(temp.firstElementChild, histBox);
            }
        } catch (e) {
            console.warn('[Tracker] Error rendering auth sync card in eval recap:', e);
        }
    }

    // Submit evaluation with score and answers (multi-attempt)
    async function submitEvaluation(payload) {
        const canonicalId = normalizeTopicId(payload.topic_id);
        const { subject, total_score } = payload;
        const clientCreatedAt = new Date().toISOString();
        const normalizedPayload = { ...payload, topic_id: canonicalId, client_created_at: clientCreatedAt };

        // 1. Save locally to history first so data is never lost
        try {
            const histKey = `eval_hist_${canonicalId}`;
            const localHist = JSON.parse(localStorage.getItem(histKey) || '[]');
            const attemptNum = localHist.length + 1;
            const entry = {
                attempt_number: attemptNum,
                ...normalizedPayload,
                created_at: clientCreatedAt
            };
            localHist.push(entry);
            localStorage.setItem(histKey, JSON.stringify(localHist));

            if (total_score >= 70) {
                setLocalProgress(canonicalId, true);
            }
        } catch (e) {}

        // 2. Sync to Server if token or student identity is present
        const token = getToken();
        const identity = getUserIdentity();
        let syncResult = { success: true, mode: 'local' };

        if (token || identity) {
            try {
                const headers = { 'Content-Type': 'application/json' };
                if (token) headers['Authorization'] = `Bearer ${token}`;

                const res = await fetch(`${API_BASE_URL}/submit_evaluation`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        ...normalizedPayload,
                        user_identity: identity,
                        user_profile: getUserProfilePayload()
                    })
                });
                if (!handleAuthStatus(res)) {
                    syncResult = { success: false, mode: 'session_expired' };
                } else if (!res.ok) {
                    const fallbackSync = await syncData(true);
                    syncResult = (fallbackSync && fallbackSync.success)
                        ? { success: true, mode: 'synced' }
                        : { success: false, mode: 'local_fallback' };
                } else {
                    const data = await res.json();
                    persistRecoveredToken(data);
                    if (data && data.success) {
                        syncResult = { ...data, mode: 'server' };
                        syncData(false).catch(() => {});
                    } else {
                        const fallbackSync = await syncData(true);
                        syncResult = (fallbackSync && fallbackSync.success)
                            ? { success: true, mode: 'synced' }
                            : { success: false, mode: 'local_fallback' };
                    }
                }
            } catch (err) {
                console.warn('[Tracker] Offline fallback for evaluation:', err);
                const fallbackSync = await syncData(true).catch(() => null);
                syncResult = (fallbackSync && fallbackSync.success)
                    ? { success: true, mode: 'synced' }
                    : { success: false, mode: 'local_fallback' };
            }
        }

        // 3. Render accurate sync status card
        mountAuthSyncCard(total_score, syncResult);
        return syncResult;
    }

    // Save reflection note
    async function saveReflection(subject, topic_id, reflection_text) {
        const canonicalId = normalizeTopicId(topic_id);
        try {
            localStorage.setItem(`refl_${canonicalId}`, reflection_text);
        } catch (e) {}

        const token = getToken();
        const identity = getUserIdentity();
        if (!token && !identity) return { success: true, mode: 'local' };

        try {
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${API_BASE_URL}/save_reflection`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    subject,
                    topic_id: canonicalId,
                    reflection_text,
                    user_identity: identity,
                    user_profile: getUserProfilePayload()
                })
            });
            if (!handleAuthStatus(res)) {
                return { success: false, mode: 'session_expired' };
            }
            if (!res.ok) {
                const syncFallback = await syncData(true);
                return syncFallback && syncFallback.success ? { success: true, mode: 'synced' } : { success: false, mode: 'local_fallback' };
            }
            const data = await res.json();
            persistRecoveredToken(data);
            syncData(false).catch(() => {});
            return { success: Boolean(data && data.success), mode: 'server' };
        } catch (err) {
            console.warn('[Tracker] Offline fallback for reflection:', err);
            const syncFallback = await syncData(true).catch(() => null);
            return syncFallback && syncFallback.success ? { success: true, mode: 'synced' } : { success: false, mode: 'local_fallback' };
        }
    }

    // Fetch history for specific topic
    async function getHistory(subject, topic_id) {
        const canonicalId = normalizeTopicId(topic_id);
        const token = getToken();
        if (token) {
            try {
                const res = await fetch(`${API_BASE_URL}/get_topic_history?subject=${encodeURIComponent(subject)}&topic_id=${encodeURIComponent(canonicalId)}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.success) {
                        return data;
                    }
                }
            } catch (err) {}
        }

        // Fallback local
        const histKey = `eval_hist_${canonicalId}`;
        const localHist = JSON.parse(localStorage.getItem(histKey) || '[]');
        const localRefl = localStorage.getItem(`refl_${canonicalId}`) || null;
        const isComp = !!getLocalProgress()[canonicalId];

        return {
            success: true,
            attempts: localHist,
            history: localHist,
            total_attempts: localHist.length,
            max_score: localHist.length ? Math.max(...localHist.map(h => h.total_score || 0)) : 0,
            reflection: localRefl,
            reflection_text: localRefl,
            is_completed: isComp,
            mode: 'local'
        };
    }

    async function getAllProgressSummary() {
        const user = getUser() || { name: 'Siswa Tamu', kelas: 'Mode Mandiri' };
        const localProgress = getLocalProgress();

        let totalCompleted = 0;
        let totalScoreSum = 0;
        let evaluatedCount = 0;
        let totalStars = 0;
        let reflectionCount = 0;
        let perfectScoreCount = 0;

        function processSection(unitList, subjectKey) {
            return unitList.map(unit => {
                let unitCompleted = 0;
                const modules = unit.topics.map(t => {
                    const histKey = `eval_hist_${t.id}`;
                    const attempts = JSON.parse(localStorage.getItem(histKey) || '[]');
                    const maxScore = attempts.length ? Math.max(...attempts.map(a => a.total_score || 0)) : 0;
                    const refl = localStorage.getItem(`refl_${t.id}`);
                    const isDone = !!localProgress[t.id] || maxScore >= 70;

                    let stars = 0;
                    if (isDone) {
                        stars = 1;
                        if (maxScore >= 70) stars = 2;
                        if (maxScore >= 100) {
                            stars = 3;
                            perfectScoreCount++;
                        }
                    }

                    if (isDone) {
                        unitCompleted++;
                        totalCompleted++;
                    }
                    if (attempts.length > 0) {
                        totalScoreSum += maxScore;
                        evaluatedCount++;
                    }
                    if (refl) reflectionCount++;
                    totalStars += stars;

                    return {
                        id: t.id,
                        title: t.title,
                        path: t.path,
                        is_completed: isDone,
                        stars: stars,
                        max_score: maxScore,
                        total_attempts: attempts.length,
                        has_reflection: !!refl,
                        reflection_text: refl || ''
                    };
                });

                const totalInUnit = unit.topics.length;
                const percentage = Math.round((unitCompleted / totalInUnit) * 100);

                return {
                    unit_id: unit.unit_id,
                    title: unit.title,
                    desc: unit.desc,
                    path: unit.path,
                    total_modules: totalInUnit,
                    completed_modules: unitCompleted,
                    percentage: percentage,
                    modules: modules
                };
            });
        }

        const infData = processSection(COURSE_CATALOG.informatika, 'informatika');
        const kkaData = processSection(COURSE_CATALOG.coding, 'coding');

        const totalModules = (COURSE_CATALOG.informatika.reduce((acc, u) => acc + u.topics.length, 0) +
                              COURSE_CATALOG.coding.reduce((acc, u) => acc + u.topics.length, 0)) || 102;
        const overallPercentage = Math.round((totalCompleted / totalModules) * 100);
        const averageScore = evaluatedCount > 0 ? Math.round(totalScoreSum / evaluatedCount) : 0;

        let levelTitle = "Petualang Pemula 🌟";
        let levelRank = 1;
        let nextLevelThreshold = 10;
        let badgeIcon = "🌱";

        if (totalCompleted >= 86) {
            levelTitle = "Master Informatika & AI 👑";
            levelRank = 5;
            nextLevelThreshold = 96;
            badgeIcon = "👑";
        } else if (totalCompleted >= 50) {
            levelTitle = "Insinyur Digital 🏆";
            levelRank = 4;
            nextLevelThreshold = 86;
            badgeIcon = "🏆";
        } else if (totalCompleted >= 25) {
            levelTitle = "Pakar Logika & Algoritma ⚡";
            levelRank = 3;
            nextLevelThreshold = 50;
            badgeIcon = "⚡";
        } else if (totalCompleted >= 10) {
            levelTitle = "Koder Berbakat 🚀";
            levelRank = 2;
            nextLevelThreshold = 25;
            badgeIcon = "🚀";
        }

        const badges = [
            {
                id: 'first_step',
                icon: '🌱',
                title: 'Langkah Pertama',
                desc: 'Menyelesaikan modul pembelajaran pertama',
                unlocked: totalCompleted >= 1
            },
            {
                id: 'logic_expert',
                icon: '🧩',
                title: 'Ahli Logika',
                desc: 'Menyelesaikan seluruh modul Berpikir Komputasional',
                unlocked: (infData[1] && infData[1].completed_modules >= 5) || (kkaData[0] && kkaData[0].completed_modules >= 6)
            },
            {
                id: 'ai_friend',
                icon: '🤖',
                title: 'Sahabat AI',
                desc: 'Menuntaskan pembelajaran Literasi & Pemanfaatan AI',
                unlocked: kkaData[2] && kkaData[2].completed_modules >= 5
            },
            {
                id: 'coder_star',
                icon: '🐍',
                title: 'Bintang Koder',
                desc: 'Mencoba tantangan koding & game Python',
                unlocked: kkaData[4] && kkaData[4].completed_modules >= 4
            },
            {
                id: 'perfect_100',
                icon: '💯',
                title: 'Skor Sempurna 100',
                desc: 'Meraih skor 100 poin pada evaluasi modul',
                unlocked: perfectScoreCount >= 1
            },
            {
                id: 'reflective_learner',
                icon: '✍️',
                title: 'Siswa Reflektif',
                desc: 'Menuliskan 5+ catatan refleksi belajar',
                unlocked: reflectionCount >= 5
            },
            {
                id: 'grandmaster',
                icon: '👑',
                title: 'Juara Penjelajah',
                desc: 'Menyelesaikan lebih dari 50 modul belajar',
                unlocked: totalCompleted >= 50
            }
        ];

        return {
            user,
            stats: {
                total_completed: totalCompleted,
                total_modules: totalModules,
                percentage: overallPercentage,
                total_stars: totalStars,
                average_score: averageScore,
                evaluated_count: evaluatedCount,
                reflection_count: reflectionCount,
                perfect_count: perfectScoreCount,
                level_title: levelTitle,
                level_rank: levelRank,
                next_threshold: nextLevelThreshold,
                badge_icon: badgeIcon
            },
            badges: badges,
            catalog: {
                informatika: infData,
                coding: kkaData
            }
        };
    }

    async function googleLogin(credential) {
        try {
            const res = await fetch(`${API_BASE_URL}/google_login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential })
            });
            const data = await res.json();
            const token = data.session_token || data.token;
            if (data.success && token) {
                localStorage.setItem('fanani_auth_token', token);
                return { ...data, session_token: token };
            }
            return { success: false, error: data.error || 'Login failed' };
        } catch (err) {
            console.warn('[Tracker] Google login network fallback:', err);
            return { success: false, error: err.message };
        }
    }

    async function saveProfile(payload) {
        const storedUser = getUser() || {};
        const fullName = payload.full_name || payload.name || storedUser.full_name || storedUser.name || '';
        const kelas = payload.kelas || storedUser.kelas || '';
        const token = getToken();
        const identity = getUserIdentity();

        if (!token && !identity) {
            return { success: true, mode: 'local_only' };
        }

        try {
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${API_BASE_URL}/save_profile`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    full_name: fullName,
                    kelas,
                    user_identity: identity
                })
            });
            if (!handleAuthStatus(res)) {
                return { success: false, error: 'Sesi login telah berakhir' };
            }
            const data = await res.json();
            persistRecoveredToken(data);
            return data;
        } catch (err) {
            console.warn('[Tracker] Save profile network fallback:', err);
            return { success: true, mode: 'local_fallback' };
        }
    }

    // Two-Way Smart Synchronization (Reconcile Local Storage with Server D1 Database)
    let isSyncing = false;
    let lastSyncTime = 0;

    async function syncData(force = false) {
        // Cooldown: prevent concurrent or too frequent syncs (< 4s apart unless forced)
        const now = Date.now();
        if (isSyncing || (!force && now - lastSyncTime < 4000)) {
            return { skipped: true, reason: 'debounced' };
        }

        migrateLegacyLocalKeys();

        const token = getToken();
        const identity = getUserIdentity();
        if (!token && !identity) {
            return { skipped: true, reason: 'unauthenticated' };
        }

        isSyncing = true;
        try {
            // 1. Gather all local progress (normalized to canonical topic IDs)
            const rawLocalProg = getLocalProgress();
            const localProg = {};
            Object.keys(rawLocalProg).forEach(k => {
                if (rawLocalProg[k]) {
                    localProg[normalizeTopicId(k)] = true;
                }
            });

            // 2. Gather all local evaluation submissions (normalized & deduplicated)
            const localEvals = [];
            const seenEvals = new Set();
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('eval_hist_')) {
                    const topicId = normalizeTopicId(key.substring(10));
                    try {
                        const attempts = JSON.parse(localStorage.getItem(key) || '[]');
                        if (Array.isArray(attempts)) {
                            attempts.forEach(att => {
                                const createdAt = att.created_at || new Date().toISOString();
                                const totalScore = att.total_score || 0;
                                const dedupKey = `${topicId}|${createdAt}|${totalScore}`;
                                if (seenEvals.has(dedupKey)) return;
                                seenEvals.add(dedupKey);
                                localEvals.push({
                                    topic_id: topicId,
                                    subject: att.subject || (topicId.startsWith('kka-') ? 'coding' : 'informatika'),
                                    attempt_number: att.attempt_number || 1,
                                    score_a: att.score_a || 0,
                                    score_b: att.score_b || 0,
                                    score_c: att.score_c || 0,
                                    score_d: att.score_d || 0,
                                    total_score: totalScore,
                                    answers: att.answers || {},
                                    created_at: createdAt
                                });
                            });
                        }
                    } catch (e) {}
                }
            }

            // 3. Gather all local reflection notes (normalized to canonical topic IDs)
            const localReflections = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('refl_')) {
                    const topicId = normalizeTopicId(key.substring(5));
                    const text = localStorage.getItem(key);
                    if (text && text.trim() && !localReflections[topicId]) {
                        localReflections[topicId] = {
                            text: text.trim(),
                            subject: topicId.startsWith('kka-') ? 'coding' : 'informatika'
                        };
                    }
                }
            }

            // 4. Send to /sync_progress endpoint
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const payload = {
                progress: localProg,
                evaluations: localEvals,
                reflections: localReflections,
                user_identity: identity,
                user_profile: getUserProfilePayload()
            };

            const res = await fetch(`${API_BASE_URL}/sync_progress`, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload)
            });

            if (!handleAuthStatus(res)) {
                isSyncing = false;
                return { success: false, error: 'Sesi login telah berakhir' };
            }

            if (!res.ok) {
                isSyncing = false;
                return { success: false, error: 'Server returned ' + res.status };
            }

            const data = await res.json();
            persistRecoveredToken(data);

            if (data && data.success) {
                // Reconcile server user profile (e.g., kelas/name) back into localStorage
                if (data.user) {
                    try {
                        const curUser = getUser() || {};
                        const mergedKelas = data.user.kelas || curUser.kelas || '';
                        const mergedName = data.user.full_name || curUser.full_name || curUser.name || '';
                        const mergedUser = {
                            ...curUser,
                            id: data.user.id || curUser.id,
                            google_id: curUser.google_id,
                            email: data.user.email || curUser.email,
                            name: mergedName,
                            full_name: mergedName,
                            kelas: mergedKelas,
                            picture: data.user.avatar_url || curUser.picture || '',
                            role: data.user.role || curUser.role || 'student',
                            profile_completed: Boolean(data.user.profile_completed || mergedKelas)
                        };
                        localStorage.setItem('fanani_user', JSON.stringify(mergedUser));
                    } catch (e) {}
                }

                // 5. Reconcile merged progress back to LocalStorage
                if (data.merged_progress) {
                    const existingProg = getLocalProgress();
                    const mergedProg = {};
                    Object.keys(existingProg).forEach(k => {
                        if (existingProg[k]) mergedProg[normalizeTopicId(k)] = true;
                    });
                    Object.keys(data.merged_progress).forEach(k => {
                        if (data.merged_progress[k]) mergedProg[normalizeTopicId(k)] = true;
                    });
                    localStorage.setItem('fanani_edu_progress', JSON.stringify(mergedProg));
                }

                // 6. Reconcile merged evaluations back to LocalStorage (deduplicated)
                if (data.merged_evaluations) {
                    Object.keys(data.merged_evaluations).forEach(rawId => {
                        const tId = normalizeTopicId(rawId);
                        const sAttempts = data.merged_evaluations[rawId];
                        if (Array.isArray(sAttempts) && sAttempts.length > 0) {
                            const existing = JSON.parse(localStorage.getItem(`eval_hist_${tId}`) || '[]');
                            const combined = [...sAttempts];
                            const serverKeys = new Set(sAttempts.map(a => `${a.total_score || 0}|${String(a.created_at || '').substring(0, 16)}`));
                            existing.forEach(loc => {
                                const locKey = `${loc.total_score || 0}|${String(loc.created_at || '').substring(0, 16)}`;
                                if (!serverKeys.has(locKey)) combined.push(loc);
                            });
                            localStorage.setItem(`eval_hist_${tId}`, JSON.stringify(combined.map(a => ({ ...a, topic_id: tId }))));
                        }
                    });
                }

                // 7. Reconcile merged reflections back to LocalStorage
                if (data.merged_reflections) {
                    Object.keys(data.merged_reflections).forEach(rawId => {
                        const tId = normalizeTopicId(rawId);
                        const rText = data.merged_reflections[rawId];
                        if (rText) {
                            localStorage.setItem(`refl_${tId}`, rText);
                        }
                    });
                }

                lastSyncTime = Date.now();
                isSyncing = false;
                renderNavbarAuth();

                // Dispatch global event for active pages to reactively refresh
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('fanani_sync_done', { detail: data }));
                }

                return { success: true, stats: data.stats, synced_at: data.synced_at };
            }

            isSyncing = false;
            return { success: false, error: data.error || 'Sync failed' };
        } catch (err) {
            console.warn('[Tracker] Sync error (offline fallback):', err);
            isSyncing = false;
            return { success: false, error: err.message };
        }
    }

    // Determine clean relative paths across any depth in the /edu hierarchy
    function getAppPaths() {
        const loc = window.location.pathname.replace(/\\/g, '/');
        let learnBase = './';
        let progressPath = 'dashboard/progress/index.html';
        
        if (loc.includes('/edu/informatika/') || loc.includes('/edu/coding/')) {
            const afterLearn = loc.substring(loc.indexOf('/edu/') + 5);
            const segments = afterLearn.split('/').filter(s => s.length > 0 && !s.endsWith('.html'));
            const depth = segments.length;
            const prefix = '../'.repeat(depth);
            learnBase = prefix;
            progressPath = prefix + 'dashboard/progress/index.html';
        } else if (loc.includes('/edu/dashboard/progress/')) {
            learnBase = '../../index.html';
            progressPath = './index.html';
        } else if (loc.includes('/edu/dashboard/admin/')) {
            learnBase = '../../index.html';
            progressPath = '../progress/index.html';
        } else if (loc.includes('/edu/dashboard/')) {
            learnBase = '../index.html';
            progressPath = 'progress/index.html';
        } else if (loc.includes('/edu/')) {
            learnBase = './';
            progressPath = 'dashboard/progress/index.html';
        } else {
            learnBase = '/edu/';
            progressPath = '/edu/dashboard/progress/index.html';
        }
        return { learnBase, progressPath };
    }

    async function retrySyncNow(btnEl) {
        const scoreVal = btnEl && btnEl.dataset && btnEl.dataset.score !== undefined
            ? Number(btnEl.dataset.score)
            : undefined;
        if (btnEl) {
            btnEl.disabled = true;
            btnEl.textContent = '⏳ Menyinkronkan...';
        }
        const res = await syncData(true);
        const syncResult = (res && res.success)
            ? { success: true, mode: 'synced' }
            : { success: false, mode: 'local_fallback' };
        mountAuthSyncCard(scoreVal, syncResult);
        renderNavbarAuth();
        return syncResult;
    }

    // Generate rich status card for HASIL ASESMEN FORMATIF
    function getAuthSyncHtml(totalScore, syncResult = null) {
        const user = getUser();
        const { learnBase, progressPath } = getAppPaths();
        const authReady = hasServerAuth();
        const hasName = Boolean(user && user.name && user.name !== 'Siswa Tamu');
        const isLogged = hasName && authReady;
        const didFailSync = Boolean(syncResult && syncResult.success === false);
        const scoreVal = totalScore !== undefined ? totalScore : 100;

        if (isLogged && !didFailSync) {
            const kelasHtml = user.kelas
                ? `<span class="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-bold">Kelas ${user.kelas}</span>`
                : (user.role === 'teacher'
                    ? `<span class="bg-indigo-400 text-slate-950 px-1.5 py-0.2 rounded font-bold">Akun Guru</span>`
                    : `<a href="${learnBase}index.html" class="bg-amber-400 hover:bg-amber-300 text-slate-950 px-2 py-0.5 rounded font-extrabold underline">⚠️ Belum Pilih Kelas</a>`);
            return `
                <div id="eval-auth-sync-card" class="mt-4 p-4 bg-emerald-950/60 border border-emerald-400/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-200 shadow-md">
                    <div class="flex items-center gap-3 w-full sm:w-auto">
                        <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center text-xl flex-shrink-0">
                            ✅
                        </div>
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <strong class="text-white text-xs">Nilai & Progres Berhasil Tersimpan!</strong>
                                <span class="px-2 py-0.5 bg-emerald-400 text-slate-950 font-extrabold text-[10px] rounded-lg">Tersinkron Guru</span>
                            </div>
                            <p class="text-[11px] text-emerald-300/90 mt-0.5">
                                Tercatat atas nama <strong>${user.name}</strong> ${kelasHtml} • Nilai: <strong class="text-white">${scoreVal}/100</strong>
                            </p>
                        </div>
                    </div>
                    <a href="${progressPath}" class="px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-extrabold rounded-xl transition text-xs flex items-center gap-1.5 shadow-md whitespace-nowrap flex-shrink-0">
                        <span>📊</span> Buka Rapor Progress Belajar →
                    </a>
                </div>
            `;
        } else if (authReady && didFailSync) {
            return `
                <div id="eval-auth-sync-card" class="mt-4 p-4 bg-gradient-to-r from-amber-950/90 via-slate-900 to-rose-950/80 border-2 border-amber-400/70 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-amber-200 shadow-xl">
                    <div class="flex items-start sm:items-center gap-3 w-full md:w-auto">
                        <div class="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center text-2xl flex-shrink-0">
                            🔄
                        </div>
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <strong class="text-amber-300 text-sm font-heading font-extrabold">Nilai Tersimpan di Browser — Belum Terkirim ke Server Guru</strong>
                                <span class="px-2 py-0.5 bg-amber-400 text-slate-950 font-extrabold text-[10px] rounded-full">Menunggu Sinkronisasi</span>
                            </div>
                            <p class="text-[11px] text-slate-300 leading-snug mt-1 max-w-xl">
                                Koneksi ke server gagal atau sesi login ${(user && user.name) ? `<strong>${user.name}</strong> ` : ''}perlu diperbarui. Klik <strong>Kirim Ulang Sekarang</strong> atau masuk ulang dengan Google agar nilai <strong class="text-white font-mono">(${scoreVal}/100)</strong> masuk ke daftar nilai Pak Fanani!
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 w-full md:w-auto justify-end flex-shrink-0 flex-wrap">
                        <button type="button" data-score="${scoreVal}" onclick="window.FananiTracker.retrySyncNow(this)" class="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-heading font-extrabold rounded-xl transition text-xs flex items-center gap-1.5 shadow-md whitespace-nowrap">
                            <span>🔄</span> Kirim Ulang Sekarang
                        </button>
                        <a href="${learnBase}index.html#auth-status-card" class="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition text-xs whitespace-nowrap border border-white/20">
                            🔑 Cek Akun Google
                        </a>
                        <a href="${progressPath}" class="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition text-xs whitespace-nowrap border border-white/20">
                            📊 Rapor
                        </a>
                    </div>
                </div>
            `;
        } else {
            return `
                <div id="eval-auth-sync-card" class="mt-4 p-4 bg-gradient-to-r from-amber-950/90 via-slate-900 to-amber-950/90 border-2 border-amber-400/70 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-amber-200 shadow-xl">
                    <div class="flex items-start sm:items-center gap-3 w-full md:w-auto">
                        <div class="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center text-2xl flex-shrink-0">
                            ⚠️
                        </div>
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <strong class="text-amber-300 text-sm font-heading font-extrabold">Perhatian: Status Mode Belajar Tamu</strong>
                                <span class="px-2 py-0.5 bg-amber-400 text-slate-950 font-extrabold text-[10px] rounded-full">Belum Masuk Database Guru</span>
                            </div>
                            <p class="text-[11px] text-slate-300 leading-snug mt-1 max-w-xl">
                                Nilai evaluasimu <strong class="text-white font-mono">(${scoreVal}/100)</strong> baru tersimpan di browser ini. <strong>Masuk dengan Akun Google</strong> agar nilaimu otomatis tercatat di rapor guru Pak Fanani!
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2.5 w-full md:w-auto justify-end flex-shrink-0 flex-wrap">
                        <a href="${learnBase}index.html#auth-status-card" class="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-heading font-extrabold rounded-xl transition text-xs flex items-center gap-1.5 shadow-md whitespace-nowrap">
                            <span>🔑</span> Masuk Akun Google Sekarang
                        </a>
                        <a href="${progressPath}" class="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition text-xs whitespace-nowrap border border-white/20">
                            📊 Lihat Rapor
                        </a>
                    </div>
                </div>
            `;
        }
    }

    // Auto-inject Global Auth Mini-Bar into Navbar
    function renderNavbarAuth() {
        const loc = window.location.pathname.replace(/\\/g, '/');
        if (loc.endsWith('/edu/') || loc.endsWith('/edu/index.html') || loc.includes('/edu/progress/') || loc.includes('/edu/dashboard/')) {
            return;
        }

        const nav = document.querySelector('nav');
        if (!nav) return;

        let container = document.getElementById('global-auth-nav-widget');
        if (!container) {
            container = document.createElement('div');
            container.id = 'global-auth-nav-widget';
            container.className = 'flex items-center gap-2';
            
            const rightGroup = nav.querySelector('div:last-child');
            if (rightGroup && rightGroup !== nav) {
                rightGroup.insertBefore(container, rightGroup.firstChild);
            } else {
                nav.appendChild(container);
            }
        }

        const user = getUser();
        const { learnBase, progressPath } = getAppPaths();
        const isLogged = Boolean(user && user.name && user.name !== 'Siswa Tamu' && hasServerAuth());

        if (isLogged) {
            const kelasBadge = user.kelas
                ? `<span class="text-[9px] font-extrabold text-amber-700 bg-amber-200 px-1 py-0.2 rounded">Kelas ${user.kelas}</span>`
                : (user.role === 'teacher'
                    ? `<span class="text-[9px] font-extrabold text-indigo-700 bg-indigo-100 px-1 py-0.2 rounded">Guru</span>`
                    : `<a href="${learnBase}index.html" class="text-[9px] font-extrabold text-red-700 bg-red-100 border border-red-300 px-1.5 py-0.2 rounded animate-pulse" title="Klik untuk memilih kelas di beranda">⚠️ Pilih Kelas!</a>`);
            container.innerHTML = `
                <div class="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 px-2.5 py-1 rounded-2xl transition">
                    <div class="w-7 h-7 rounded-xl bg-slate-900 flex items-center justify-center text-xs overflow-hidden flex-shrink-0">
                        ${user.picture ? `<img src="${user.picture}" referrerpolicy="no-referrer" class="w-full h-full object-cover rounded-xl" onerror="this.parentElement.innerHTML='🎓'">` : '🎓'}
                    </div>
                    <div class="text-left hidden sm:block leading-tight pr-1">
                        <span class="text-[11px] font-extrabold text-slate-800 block truncate max-w-[120px]">${user.name}</span>
                        ${kelasBadge}
                    </div>
                    <a href="${progressPath}" class="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] rounded-xl transition shadow-sm flex items-center gap-1">
                        <span>📊</span> <span class="hidden md:inline">Rapor</span>
                    </a>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="flex items-center gap-1.5 bg-amber-50 border border-amber-200/90 px-2.5 py-1 rounded-2xl text-xs">
                    <span class="text-amber-800 font-bold text-[10px] sm:text-[11px] flex items-center gap-1">
                        <span>👤</span> <span class="hidden md:inline">Mode Tamu · </span><span class="hidden sm:inline text-amber-600">Belum Sinkron Guru</span>
                    </span>
                    <a href="${learnBase}index.html#auth-status-card" class="px-2 py-0.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-[10px] rounded-lg transition shadow-sm whitespace-nowrap">
                        🔑 Masuk
                    </a>
                    <a href="${progressPath}" class="px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[10px] rounded-lg transition whitespace-nowrap">
                        📊 Progres
                    </a>
                </div>
            `;
        }
    }

    // ============================================================
    // QUIZ OBFUSCATION & SECURE ANSWER VALIDATION SUITE (ITEM 6)
    // Prevents students from opening DevTools / Inspect Element to read plain text answers.
    // ============================================================
    const QUIZ_SALT = 'fanani_edu_merdeka_2025';

    function hashAnswerSync(val, qKey = '') {
        const str = `${QUIZ_SALT}_${String(qKey).toLowerCase()}_${String(val).trim().toLowerCase()}`;
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = (((hash << 5) + hash) + str.charCodeAt(i)) & 0xFFFFFFFF;
            if (hash >= 0x80000000) hash -= 0x100000000;
        }
        return ((hash & 0xFFFFFFFF) >>> 0).toString(16);
    }

    function obfuscateKeys(rawKeyMap) {
        const obfuscated = {};
        Object.keys(rawKeyMap).forEach(k => {
            obfuscated[k] = hashAnswerSync(rawKeyMap[k], k);
        });
        return obfuscated;
    }

    function verifyObfuscatedAnswers(userAnswers, obfuscatedMap, pointsPerQuestion = 5) {
        let score = 0;
        let correctCount = 0;
        const keys = Object.keys(obfuscatedMap);
        const results = {};

        keys.forEach(k => {
            const userVal = userAnswers[k];
            if (userVal !== undefined && userVal !== null && String(userVal).trim() !== '') {
                const userHash = hashAnswerSync(userVal, k);
                const isCorrect = userHash === obfuscatedMap[k];
                results[k] = isCorrect;
                if (isCorrect) {
                    score += pointsPerQuestion;
                    correctCount++;
                }
            } else {
                results[k] = false;
            }
        });

        return {
            score,
            correctCount,
            totalQuestions: keys.length,
            maxScore: keys.length * pointsPerQuestion,
            results
        };
    }

    if (typeof window !== 'undefined') {
        const initTracker = () => {
            migrateLegacyLocalKeys();
            renderNavbarAuth();
            if (hasServerAuth()) {
                setTimeout(() => { syncData(false).catch(() => {}); }, 600);
            }
        };

        // Auto-retry sync when network reconnects (Item 3)
        window.addEventListener('online', () => {
            console.log('[Tracker] Jaringan internet kembali online, menyinkronkan data tertunda...');
            if (hasServerAuth()) {
                syncData(true).catch(() => {});
            }
        });

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initTracker);
        } else {
            initTracker();
        }
    }

    return {
        getToken,
        getUser,
        hasServerAuth,
        normalizeTopicId,
        retrySyncNow,
        COURSE_CATALOG,
        markCompleted,
        submitEvaluation,
        saveReflection,
        getHistory,
        getAllProgressSummary,
        googleLogin,
        saveProfile,
        syncData,
        getAppPaths,
        getAuthSyncHtml,
        renderNavbarAuth,
        hashAnswerSync,
        obfuscateKeys,
        verifyObfuscatedAnswers
    };
})();

/**
 * ============================================================
 * FananiMatcher — Interactive SVG Connector Matching Engine
 * Features: Visual bezier curves, distinct pair colors, individual ✕ cancel
 * ============================================================
 */
const FananiMatcher = {
    instances: {},

    create(config) {
        const container = document.getElementById(config.containerId);
        if (!container) return null;

        const instance = {
            id: config.containerId,
            container: container,
            leftItems: config.leftItems || [],
            rightItems: config.rightItems || [],
            correctPairs: config.correctPairs || {},
            pairs: {}, // { leftId: rightId }
            selectedLeft: null,
            onPairChange: config.onPairChange || null
        };

        this.instances[config.containerId] = instance;
        this.render(instance);
        return instance;
    },

    getPairs(containerId) {
        const instance = this.instances[containerId];
        return instance ? instance.pairs : {};
    },

    render(instance) {
        const container = instance.container;
        container.classList.add('relative', 'w-full', 'select-none');

        const pairStyles = [
            { border: 'border-emerald-400', bg: 'bg-emerald-50/80', text: 'text-emerald-950', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300', hex: '#10b981' },
            { border: 'border-sky-400', bg: 'bg-sky-50/80', text: 'text-sky-950', badge: 'bg-sky-100 text-sky-800 border-sky-300', hex: '#0284c7' },
            { border: 'border-purple-400', bg: 'bg-purple-50/80', text: 'text-purple-950', badge: 'bg-purple-100 text-purple-800 border-purple-300', hex: '#8b5cf6' },
            { border: 'border-amber-400', bg: 'bg-amber-50/80', text: 'text-amber-950', badge: 'bg-amber-100 text-amber-800 border-amber-300', hex: '#d97706' },
            { border: 'border-rose-400', bg: 'bg-rose-50/80', text: 'text-rose-950', badge: 'bg-rose-100 text-rose-800 border-rose-300', hex: '#e11d48' }
        ];

        const pairedCount = Object.keys(instance.pairs).length;
        const totalItems = instance.leftItems.length;

        container.innerHTML = `
            <div class="flex items-center justify-between gap-2 pb-3 mb-2 border-b border-slate-100 text-xs">
                <div class="flex items-center gap-2">
                    <span class="px-2.5 py-0.5 rounded-full font-extrabold text-[11px] ${pairedCount === totalItems ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}">
                        🔗 Terpasang: ${pairedCount} / ${totalItems}
                    </span>
                    <span class="text-slate-400 hidden sm:inline">Klik item kiri lalu klik pasangan yang cocok di kanan</span>
                </div>
                <button type="button" onclick="FananiMatcher.reset('${instance.id}')" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition flex items-center gap-1">
                    <span>🔄</span> Reset Semua
                </button>
            </div>
            
            <div class="relative grid md:grid-cols-2 gap-6 items-start py-1" id="${instance.id}-grid">
                <!-- SVG Canvas for Connector Lines -->
                <svg id="${instance.id}-svg" class="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"></svg>
                
                <!-- Left Column -->
                <div class="space-y-3 relative z-20" id="${instance.id}-col-left">
                    ${instance.leftItems.map((item, idx) => {
                        const rId = instance.pairs[item.id];
                        const isPaired = !!rId;
                        const isSelected = instance.selectedLeft === item.id;
                        const pairIdx = isPaired ? Object.keys(instance.pairs).indexOf(item.id) % pairStyles.length : -1;
                        const style = isPaired ? pairStyles[pairIdx] : null;
                        
                        let cardClass = "p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ";
                        if (isSelected) {
                            cardClass += "bg-amber-100 border-2 border-amber-500 text-amber-950 shadow-md scale-[1.01]";
                        } else if (isPaired) {
                            cardClass += `${style.bg} border-2 ${style.border} ${style.text} font-bold shadow-sm`;
                        } else {
                            cardClass += "bg-slate-50 hover:bg-white border-slate-200 hover:border-amber-400 text-slate-800 font-medium hover:shadow-sm";
                        }
                        
                        return `
                            <div data-match-left="${item.id}" onclick="FananiMatcher.selectLeft('${instance.id}', '${item.id}')" class="${cardClass}">
                                <div class="flex items-center gap-2.5 flex-1 min-w-0">
                                    <span class="w-6 h-6 rounded-xl ${isPaired ? style.badge : isSelected ? 'bg-amber-200 text-amber-900 border-amber-400' : 'bg-slate-200 text-slate-700'} flex items-center justify-center font-bold text-[11px] flex-shrink-0 border">
                                        ${idx + 1}
                                    </span>
                                    <span class="leading-snug">${item.text}</span>
                                </div>
                                <div class="flex items-center gap-1.5 flex-shrink-0">
                                    ${isPaired ? `
                                        <button type="button" onclick="event.stopPropagation(); FananiMatcher.removePair('${instance.id}', '${item.id}')" title="Hapus Jawaban Ini" class="w-6 h-6 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 font-extrabold text-xs flex items-center justify-center transition border border-rose-300 shadow-sm">
                                            ✕
                                        </button>
                                    ` : `
                                        <div class="w-3.5 h-3.5 rounded-full ${isSelected ? 'bg-amber-500 ring-4 ring-amber-200 animate-pulse' : 'bg-slate-300'} border-2 border-white shadow-sm"></div>
                                    `}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <!-- Right Column -->
                <div class="space-y-3 relative z-20" id="${instance.id}-col-right">
                    ${instance.rightItems.map((item) => {
                        const lId = Object.keys(instance.pairs).find(k => instance.pairs[k] === item.id);
                        const isPaired = !!lId;
                        const pairIdx = isPaired ? Object.keys(instance.pairs).indexOf(lId) % pairStyles.length : -1;
                        const style = isPaired ? pairStyles[pairIdx] : null;
                        
                        let cardClass = "p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ";
                        if (isPaired) {
                            cardClass += `${style.bg} border-2 ${style.border} ${style.text} font-bold shadow-sm`;
                        } else {
                            cardClass += "bg-slate-50 hover:bg-white border-slate-200 hover:border-amber-400 text-slate-800 font-medium hover:shadow-sm";
                        }
                        
                        return `
                            <div data-match-right="${item.id}" onclick="FananiMatcher.selectRight('${instance.id}', '${item.id}')" class="${cardClass}">
                                <div class="flex items-center gap-1.5 flex-shrink-0">
                                    ${isPaired ? `
                                        <button type="button" onclick="event.stopPropagation(); FananiMatcher.removePair('${instance.id}', '${lId}')" title="Hapus Jawaban Ini" class="w-6 h-6 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 font-extrabold text-xs flex items-center justify-center transition border border-rose-300 shadow-sm">
                                            ✕
                                        </button>
                                    ` : `
                                        <div class="w-3.5 h-3.5 rounded-full bg-slate-300 border-2 border-white shadow-sm"></div>
                                    `}
                                </div>
                                <div class="flex-1 min-w-0 leading-snug">
                                    <span>${item.text}</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        setTimeout(() => this.drawLines(instance), 40);
    },

    selectLeft(instanceId, leftId) {
        const instance = this.instances[instanceId];
        if (!instance) return;

        if (instance.selectedLeft === leftId) {
            instance.selectedLeft = null;
        } else {
            instance.selectedLeft = leftId;
        }
        this.render(instance);
    },

    selectRight(instanceId, rightId) {
        const instance = this.instances[instanceId];
        if (!instance) return;

        if (!instance.selectedLeft) {
            const lId = Object.keys(instance.pairs).find(k => instance.pairs[k] === rightId);
            if (lId) {
                this.removePair(instanceId, lId);
            }
            return;
        }

        // Disconnect previous matching using this right item
        Object.keys(instance.pairs).forEach(k => {
            if (instance.pairs[k] === rightId) {
                delete instance.pairs[k];
            }
        });

        // Set pair
        instance.pairs[instance.selectedLeft] = rightId;
        instance.selectedLeft = null;

        if (instance.onPairChange) {
            instance.onPairChange(instance.pairs);
        }

        this.render(instance);
    },

    removePair(instanceId, leftId) {
        const instance = this.instances[instanceId];
        if (!instance) return;
        delete instance.pairs[leftId];
        if (instance.selectedLeft === leftId) instance.selectedLeft = null;
        if (instance.onPairChange) {
            instance.onPairChange(instance.pairs);
        }
        this.render(instance);
    },

    reset(instanceId) {
        const instance = this.instances[instanceId];
        if (!instance) return;
        instance.pairs = {};
        instance.selectedLeft = null;
        if (instance.onPairChange) {
            instance.onPairChange(instance.pairs);
        }
        this.render(instance);
    },

    drawLines(instance) {
        const grid = document.getElementById(`${instance.id}-grid`);
        const svg = document.getElementById(`${instance.id}-svg`);
        if (!grid || !svg) return;

        const gRect = grid.getBoundingClientRect();
        if (gRect.width === 0) return;

        svg.setAttribute('viewBox', `0 0 ${gRect.width} ${gRect.height}`);
        svg.style.width = `${gRect.width}px`;
        svg.style.height = `${gRect.height}px`;
        svg.innerHTML = '';

        const pairColors = ['#10b981', '#0284c7', '#8b5cf6', '#d97706', '#e11d48'];
        const leftKeys = Object.keys(instance.pairs);

        leftKeys.forEach((lId, idx) => {
            const rId = instance.pairs[lId];
            if (!rId) return;

            const lEl = grid.querySelector(`[data-match-left="${lId}"]`);
            const rEl = grid.querySelector(`[data-match-right="${rId}"]`);
            if (!lEl || !rEl) return;

            const lRect = lEl.getBoundingClientRect();
            const rRect = rEl.getBoundingClientRect();

            const color = pairColors[idx % pairColors.length];
            const isSideBySide = rRect.left > lRect.right - 10;

            if (isSideBySide) {
                const x1 = lRect.right - gRect.left - 4;
                const y1 = lRect.top + lRect.height / 2 - gRect.top;
                const x2 = rRect.left - gRect.left + 4;
                const y2 = rRect.top + rRect.height / 2 - gRect.top;

                const dx = Math.max(30, (x2 - x1) * 0.5);
                const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

                // Glow
                const glow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                glow.setAttribute('d', pathD);
                glow.setAttribute('stroke', color);
                glow.setAttribute('stroke-width', '7');
                glow.setAttribute('stroke-linecap', 'round');
                glow.setAttribute('fill', 'none');
                glow.setAttribute('opacity', '0.2');
                svg.appendChild(glow);

                // Main Line
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', pathD);
                path.setAttribute('stroke', color);
                path.setAttribute('stroke-width', '3.5');
                path.setAttribute('stroke-linecap', 'round');
                path.setAttribute('fill', 'none');
                path.setAttribute('opacity', '0.9');
                svg.appendChild(path);

                // Endpoints
                const dot1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                dot1.setAttribute('cx', x1);
                dot1.setAttribute('cy', y1);
                dot1.setAttribute('r', '4.5');
                dot1.setAttribute('fill', color);
                svg.appendChild(dot1);

                const dot2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                dot2.setAttribute('cx', x2);
                dot2.setAttribute('cy', y2);
                dot2.setAttribute('r', '4.5');
                dot2.setAttribute('fill', color);
                svg.appendChild(dot2);
            }
        });
    }
};

window.addEventListener('resize', () => {
    if (window.FananiMatcher && window.FananiMatcher.instances) {
        Object.keys(window.FananiMatcher.instances).forEach(id => {
            window.FananiMatcher.drawLines(window.FananiMatcher.instances[id]);
        });
    }
});

if (typeof window !== 'undefined') {
    window.FananiTracker = FananiTracker;
    window.FananiMatcher = FananiMatcher;
}

