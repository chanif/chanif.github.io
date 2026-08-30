/**
 * ============================================================
 * Fanani Learning Platform — Client Tracker & API Connector
 * Hybrid sync: LocalStorage + Server MySQL (smpn2lmg.sch.id)
 * ============================================================
 */

const FananiTracker = (() => {
    const API_BASE_URL = 'https://smpn2lmg.sch.id/fanani_api'; // Host endpoint PHP server

    // Complete curriculum directory structure for Informatika & KKA
    const COURSE_CATALOG = {
        informatika: [
            {
                unit_id: '01',
                title: 'Pengantar Informatika',
                desc: 'Konsep dasar, sejarah, profesi, dan peran komputasi dalam kehidupan',
                path: 'informatika/01-pengantar-informatika/',
                topics: [
                    { id: 'inf-intro-01', title: 'Apa itu Informatika?', path: 'informatika/01-pengantar-informatika/01-apa-itu-informatika/' },
                    { id: 'inf-intro-02', title: 'Sejarah Perkembangan Komputer', path: 'informatika/01-pengantar-informatika/02-sejarah-perkembangan/' },
                    { id: 'inf-intro-03', title: 'Profesi di Bidang Informatika', path: 'informatika/01-pengantar-informatika/03-profesi-di-bidang-informatika/' },
                    { id: 'inf-intro-04', title: 'Informatika di Sekitar Kita', path: 'informatika/01-pengantar-informatika/04-informatika-di-sekitar-kita/' },
                    { id: 'inf-intro-05', title: 'Peta Belajar & Eksplorasi', path: 'informatika/01-pengantar-informatika/05-peta-belajar-informatika/' }
                ]
            },
            {
                unit_id: '02',
                title: 'Berpikir Komputasional',
                desc: '4 pilar pemecahan masalah algoritmis: dekomposisi, pola, abstraksi, algoritma',
                path: 'informatika/02-berpikir-komputasional/',
                topics: [
                    { id: 'inf-bk-01', title: 'Dekomposisi Masalah', path: 'informatika/02-berpikir-komputasional/01-dekomposisi/' },
                    { id: 'inf-bk-02', title: 'Pengenalan Pola', path: 'informatika/02-berpikir-komputasional/02-pengenalan-pola/' },
                    { id: 'inf-bk-03', title: 'Abstraksi & Generalisasi', path: 'informatika/02-berpikir-komputasional/03-abstraksi/' },
                    { id: 'inf-bk-04', title: 'Algoritma & Pseudocode', path: 'informatika/02-berpikir-komputasional/04-algoritma-dan-pseudocode/' },
                    { id: 'inf-bk-05', title: 'Studi Kasus Rumah Cerdas', path: 'informatika/02-berpikir-komputasional/05-studi-kasus-rumah-cerdas/' }
                ]
            },
            {
                unit_id: '03',
                title: 'Teknologi Informasi & Komunikasi',
                desc: 'Perangkat lunak produktivitas, kolaborasi cloud, dan etika komunikasi digital',
                path: 'informatika/03-teknologi-informasi-komunikasi/',
                topics: [
                    { id: 'inf-tik-01', title: 'Aplikasi Perkantoran Terpadu', path: 'informatika/03-teknologi-informasi-komunikasi/01-aplikasi-perkantoran/' },
                    { id: 'inf-tik-02', title: 'Integrasi Konten Antar Aplikasi', path: 'informatika/03-teknologi-informasi-komunikasi/02-integrasi-konten/' },
                    { id: 'inf-tik-03', title: 'Cloud Storage & Kolaborasi Online', path: 'informatika/03-teknologi-informasi-komunikasi/03-cloud-storage-kolaborasi/' },
                    { id: 'inf-tik-04', title: 'Mesin Pencari & Teknik Googling Cerdas', path: 'informatika/03-teknologi-informasi-komunikasi/04-mesin-pencari-cerdas/' },
                    { id: 'inf-tik-05', title: 'Etika Berkirim Email & Dokumen Digital', path: 'informatika/03-teknologi-informasi-komunikasi/05-etika-komunikasi-digital/' }
                ]
            },
            {
                unit_id: '04',
                title: 'Sistem Komputer',
                desc: 'Perangkat keras (hardware), software, OS, dan alur siklus pemrosesan Von Neumann',
                path: 'informatika/04-sistem-komputer/',
                topics: [
                    { id: 'inf-sk-01', title: 'Perangkat Keras Komputer (Hardware)', path: 'informatika/04-sistem-komputer/01-perangkat-keras/' },
                    { id: 'inf-sk-02', title: 'Perangkat Lunak & Sistem Operasi', path: 'informatika/04-sistem-komputer/02-perangkat-lunak-os/' },
                    { id: 'inf-sk-03', title: 'Mekanisme Siklus Kerja CPU', path: 'informatika/04-sistem-komputer/03-cara-kerja-cpu/' },
                    { id: 'inf-sk-04', title: 'Representasi Data Biner Komputer', path: 'informatika/04-sistem-komputer/04-representasi-data-biner/' },
                    { id: 'inf-sk-05', title: 'Troubleshooting Dasar Komputer', path: 'informatika/04-sistem-komputer/05-troubleshooting-komputer/' }
                ]
            },
            {
                unit_id: '05',
                title: 'Jaringan Komputer & Internet',
                desc: 'Topologi, arsitektur TCP/IP, DNS, paket data, dan keamanan koneksi Wi-Fi',
                path: 'informatika/05-jaringan-komputer-internet/',
                topics: [
                    { id: 'inf-jki-01', title: 'Pengenalan Jaringan Komputer', path: 'informatika/05-jaringan-komputer-internet/01-pengenalan-jaringan/' },
                    { id: 'inf-jki-02', title: 'Topologi & Perangkat Jaringan', path: 'informatika/05-jaringan-komputer-internet/02-topologi-jaringan/' },
                    { id: 'inf-jki-03', title: 'Protokol Jaringan, IP Address & DNS', path: 'informatika/05-jaringan-komputer-internet/03-protokol-ip-address-dns/' },
                    { id: 'inf-jki-04', title: 'Perjalanan Paket Data di Internet', path: 'informatika/05-jaringan-komputer-internet/04-perjalanan-paket-data/' },
                    { id: 'inf-jki-05', title: 'Keamanan Jaringan & Koneksi Publik', path: 'informatika/05-jaringan-komputer-internet/05-keamanan-jaringan-wifi/' }
                ]
            },
            {
                unit_id: '06',
                title: 'Analisis Data',
                desc: 'Pengumpulan, pembersihan data, pengolahan rumus logika, dan visualisasi grafik',
                path: 'informatika/06-analisis-data/',
                topics: [
                    { id: 'inf-ad-01', title: 'Konsep Data, Informasi & Pengetahuan', path: 'informatika/06-analisis-data/01-konsep-data-informasi/' },
                    { id: 'inf-ad-02', title: 'Pengumpulan & Input Data Terstruktur', path: 'informatika/06-analisis-data/02-pengumpulan-data/' },
                    { id: 'inf-ad-03', title: 'Pengolahan Rumus Spreadsheet & Fungsi Logika', path: 'informatika/06-analisis-data/03-pengolahan-rumus-fungsi/' },
                    { id: 'inf-ad-04', title: 'Visualisasi Data Grafik Interaktif', path: 'informatika/06-analisis-data/04-visualisasi-data/' },
                    { id: 'inf-ad-05', title: 'Studi Kasus Analisis Survei Kantin', path: 'informatika/06-analisis-data/05-studi-kasus-survei-sekolah/' }
                ]
            },
            {
                unit_id: '07',
                title: 'Algoritma & Pemrograman',
                desc: 'Pemrograman blok Scratch, percabangan if-else, looping, dan logika pembuatan game',
                path: 'informatika/07-algoritma-pemrograman/',
                topics: [
                    { id: 'inf-ap-01', title: 'Pengenalan Algoritma & Flowchart', path: 'informatika/07-algoritma-pemrograman/01-algoritma-flowchart/' },
                    { id: 'inf-ap-02', title: 'Koding Visual Blok dengan Scratch', path: 'informatika/07-algoritma-pemrograman/02-koding-visual-scratch/' },
                    { id: 'inf-ap-03', title: 'Variabel, Tipe Data & Operator Logika', path: 'informatika/07-algoritma-pemrograman/03-variabel-dan-operator/' },
                    { id: 'inf-ap-04', title: 'Struktur Percabangan & Perulangan Loop', path: 'informatika/07-algoritma-pemrograman/04-percabangan-dan-loop/' },
                    { id: 'inf-ap-05', title: 'Proyek Pembuatan Game Edukatif Scratch', path: 'informatika/07-algoritma-pemrograman/05-proyek-game-scratch/' }
                ]
            },
            {
                unit_id: '08',
                title: 'Dampak Sosial Informatika',
                desc: 'Etika digital netiket, jejak digital, cyberbullying, dan Undang-Undang ITE',
                path: 'informatika/08-dampak-sosial-informatika/',
                topics: [
                    { id: 'inf-dsi-01', title: 'Perkembangan Teknologi & Transformasi Sosial', path: 'informatika/08-dampak-sosial-informatika/01-transformasi-sosial/' },
                    { id: 'inf-dsi-02', title: 'Jejak Digital & Manajemen Reputasi Online', path: 'informatika/08-dampak-sosial-informatika/02-jejak-digital-reputasi/' },
                    { id: 'inf-dsi-03', title: 'Cyberbullying & Kesehatan Mental Digital', path: 'informatika/08-dampak-sosial-informatika/03-cyberbullying-kesehatan-mental/' },
                    { id: 'inf-dsi-04', title: 'Hak Cipta Digital, Lisensi & Plagiarisme', path: 'informatika/08-dampak-sosial-informatika/04-hak-cipta-lisensi-plagiarisme/' },
                    { id: 'inf-dsi-05', title: 'Hukum Siber & Literasi UU ITE Indonesia', path: 'informatika/08-dampak-sosial-informatika/05-hukum-siber-uu-ite/' }
                ]
            },
            {
                unit_id: '09',
                title: 'Praktik Lintas Bidang (PLB)',
                desc: 'Kolaborasi antardisiplin, perancangan prototipe perangkat lunak, dan presentasi tim',
                path: 'informatika/09-praktik-lintas-bidang/',
                topics: [
                    { id: 'inf-plb-01', title: 'Pengantar Proyek Lintas Bidang & Kolaborasi Tim', path: 'informatika/09-praktik-lintas-bidang/01-pengantar-plb-kolaborasi/' },
                    { id: 'inf-plb-02', title: 'Perancangan Solusi Komputasi Terpadu', path: 'informatika/09-praktik-lintas-bidang/02-perancangan-solusi-komputasi/' },
                    { id: 'inf-plb-03', title: 'Pengembangan Prototipe Aplikasi & Artefak Komputasi', path: 'informatika/09-praktik-lintas-bidang/03-pengembangan-prototipe-artefak/' },
                    { id: 'inf-plb-04', title: 'Pengujian Sistem, Debugging & Evaluasi Pengguna', path: 'informatika/09-praktik-lintas-bidang/04-pengujian-debugging-evaluasi/' },
                    { id: 'inf-plb-05', title: 'Dokumentasi Teknis & Presentasi Pameran Karya', path: 'informatika/09-praktik-lintas-bidang/05-dokumentasi-presentasi-karya/' }
                ]
            },
            {
                unit_id: '10',
                title: 'Literasi Digital & Masa Depan',
                desc: 'Keamanan data pribadi, AI masa depan, smart city, dan karir era teknologi tinggi',
                path: 'informatika/10-literasi-digital-masa-depan/',
                topics: [
                    { id: 'inf-ldm-01', title: 'Kecakapan Digital Kritis & Anti Hoaks', path: 'informatika/10-literasi-digital-masa-depan/01-kecakapan-digital-kritis/' },
                    { id: 'inf-ldm-02', title: 'Keamanan Data Pribadi & Privasi Digital', path: 'informatika/10-literasi-digital-masa-depan/02-keamanan-privasi-data/' },
                    { id: 'inf-ldm-03', title: 'Teknologi Masa Depan: AI, IoT & Smart City', path: 'informatika/10-literasi-digital-masa-depan/03-teknologi-masa-depan-ai-iot/' },
                    { id: 'inf-ldm-04', title: 'Eksplorasi Karir & Pendidikan Lanjutan Teknologi', path: 'informatika/10-literasi-digital-masa-depan/04-karir-pendidikan-teknologi/' },
                    { id: 'inf-ldm-05', title: 'Refleksi Pembelajaran & Portofolio Siswa', path: 'informatika/10-literasi-digital-masa-depan/05-portofolio-digital-mandiri/' }
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
                    { id: 'kka-bk-02', title: 'Dekomposisi Masalah Koding', path: 'coding/01-berpikir-komputasional/02-dekomposisi-masalah/' },
                    { id: 'kka-bk-03', title: 'Pengenalan Pola & Optimasi', path: 'coding/01-berpikir-komputasional/03-pengenalan-pola/' },
                    { id: 'kka-bk-04', title: 'Abstraksi & Pemodelan Sistem', path: 'coding/01-berpikir-komputasional/04-abstraksi-dan-generalisasi/' },
                    { id: 'kka-bk-05', title: 'Perancangan Algoritma Efisien', path: 'coding/01-berpikir-komputasional/05-perancangan-algoritma/' },
                    { id: 'kka-bk-06', title: 'Computational Thinking Unplugged', path: 'coding/01-berpikir-komputasional/06-computational-thinking-unplugged/' }
                ]
            },
            {
                unit_id: '02',
                title: 'Literasi Digital KKA',
                desc: 'Identitas digital, keamanan akun 2FA, verifikasi SIFT, dan lisensi Creative Commons',
                path: 'coding/02-literasi-digital/',
                topics: [
                    { id: 'kka-ld-01', title: 'Identitas Digital & Jejak Online', path: 'coding/02-literasi-digital/01-identitas-digital-jejak-online/' },
                    { id: 'kka-ld-02', title: 'Keamanan Siber Personal & 2FA', path: 'coding/02-literasi-digital/02-keamanan-siber-dasar/' },
                    { id: 'kka-ld-03', title: 'Literasi Informasi & Verifikasi SIFT', path: 'coding/02-literasi-digital/03-literasi-informasi-hoax/' },
                    { id: 'kka-ld-04', title: 'Produksi Konten Digital Etis', path: 'coding/02-literasi-digital/04-produksi-konten-digital-etis/' },
                    { id: 'kka-ld-05', title: 'Hak Cipta & Lisensi Creative Commons', path: 'coding/02-literasi-digital/05-hak-cipta-lisensi-creative-commons/' }
                ]
            },
            {
                unit_id: '03',
                title: 'Literasi & Etika AI',
                desc: 'Cara kerja machine learning, mitigasi bias algoritma, privasi data, dan etika AI',
                path: 'coding/03-literasi-etika-ai/',
                topics: [
                    { id: 'kka-ai-01', title: 'Apa itu Kecerdasan Artifisial (AI)?', path: 'coding/03-literasi-etika-ai/01-apa-itu-kecerdasan-artifisial/' },
                    { id: 'kka-ai-02', title: 'Cara Kerja Machine Learning', path: 'coding/03-literasi-etika-ai/02-cara-kerja-machine-learning/' },
                    { id: 'kka-ai-03', title: 'Ragam Jenis Kecerdasan Artifisial', path: 'coding/03-literasi-etika-ai/03-jenis-jenis-ai/' },
                    { id: 'kka-ai-04', title: 'Bias Data & Keadilan Algoritma AI', path: 'coding/03-literasi-etika-ai/04-bias-dan-keadilan-ai/' },
                    { id: 'kka-ai-05', title: 'Deepfake, Manipulasi & Misinformasi AI', path: 'coding/03-literasi-etika-ai/05-deepfake-misinformasi-ai/' },
                    { id: 'kka-ai-06', title: 'Etika & Tanggung Jawab Penggunaan AI', path: 'coding/03-literasi-etika-ai/06-etika-tanggung-jawab-ai/' },
                    { id: 'kka-ai-07', title: 'AI dan Masa Depan Lapangan Kerja', path: 'coding/03-literasi-etika-ai/07-ai-dan-masa-depan-pekerjaan/' }
                ]
            },
            {
                unit_id: '04',
                title: 'Pemanfaatan & Pengembangan AI',
                desc: 'Generative AI, prompting cerdas, Teachable Machine, dan solusi AI',
                path: 'coding/04-pemanfaatan-pengembangan-ai/',
                topics: [
                    { id: 'kka-genai-01', title: 'Mengenal Generative AI & Model LLM', path: 'coding/04-pemanfaatan-pengembangan-ai/01-mengenal-generative-ai/' },
                    { id: 'kka-genai-02', title: 'Seni Prompt Engineering Efektif', path: 'coding/04-pemanfaatan-pengembangan-ai/02-prompt-engineering/' },
                    { id: 'kka-genai-03', title: 'AI untuk Penulisan & Ide Kreatif', path: 'coding/04-pemanfaatan-pengembangan-ai/03-ai-untuk-teks-dan-tulisan/' },
                    { id: 'kka-genai-04', title: 'AI untuk Gambar & Kreasi Multimedia', path: 'coding/04-pemanfaatan-pengembangan-ai/04-ai-untuk-gambar-dan-multimedia/' },
                    { id: 'kka-genai-05', title: 'AI sebagai Asisten Belajar Mandiri', path: 'coding/04-pemanfaatan-pengembangan-ai/05-ai-asisten-belajar/' },
                    { id: 'kka-genai-06', title: 'Latihan Model dengan Teachable Machine', path: 'coding/04-pemanfaatan-pengembangan-ai/06-teachable-machine/' },
                    { id: 'kka-genai-07', title: 'Proyek Image Classifier Mandiri', path: 'coding/04-pemanfaatan-pengembangan-ai/07-proyek-image-classifier/' },
                    { id: 'kka-genai-08', title: 'Merancang Solusi Berbasis AI Nyata', path: 'coding/04-pemanfaatan-pengembangan-ai/08-merancang-solusi-berbasis-ai/' }
                ]
            },
            {
                unit_id: '05',
                title: 'Algoritma & Pemrograman KKA',
                desc: 'Koding visual Scratch, transisi ke Python teks, struktur data, dan game maker',
                path: 'coding/05-algoritma-pemrograman/',
                topics: [
                    { id: 'kka-ap-01', title: 'Algoritma Pemrograman Visual Scratch', path: 'coding/05-algoritma-pemrograman/01-algoritma-pemrograman-visual-scratch/' },
                    { id: 'kka-ap-02', title: 'Struktur Logika, Percabangan & Loop', path: 'coding/05-algoritma-pemrograman/02-struktur-logika-percabangan-loop/' },
                    { id: 'kka-ap-03', title: 'Transisi Koding Visual ke Teks Python', path: 'coding/05-algoritma-pemrograman/03-transisi-koding-visual-ke-teks-python/' },
                    { id: 'kka-ap-04', title: 'Sintaks Dasar Python, Variabel & Tipe Data', path: 'coding/05-algoritma-pemrograman/04-sintaks-dasar-python-variabel-tipe-data/' },
                    { id: 'kka-ap-05', title: 'Struktur Kontrol Alur Python', path: 'coding/05-algoritma-pemrograman/05-struktur-kontrol-alur-python/' },
                    { id: 'kka-ap-06', title: 'Fungsi Modular & Library Python', path: 'coding/05-algoritma-pemrograman/06-fungsi-modular-dan-library-python/' },
                    { id: 'kka-ap-07', title: 'Proyek Pembuatan Game Python Sederhana', path: 'coding/05-algoritma-pemrograman/07-proyek-game-python-sederhana/' },
                    { id: 'kka-ap-08', title: 'Pengembangan Aplikasi Mandiri & SDLC', path: 'coding/05-algoritma-pemrograman/08-pengembangan-aplikasi-mandiri-sdlc/' }
                ]
            },
            {
                unit_id: '06',
                title: 'Analisis Data KKA',
                desc: 'Piramida DIKW, dataset publik, visualisasi grafik, dan data-driven decision',
                path: 'coding/06-analisis-data/',
                topics: [
                    { id: 'kka-ad-01', title: 'Hierarki DIKW & Data Bahan Bakar AI', path: 'coding/06-analisis-data/01-hierarki-dikw-data-bahan-bakar-ai/' },
                    { id: 'kka-ad-02', title: 'Pengumpulan & Eksplorasi Dataset Publik', path: 'coding/06-analisis-data/02-pengumpulan-eksplorasi-dataset-publik/' },
                    { id: 'kka-ad-03', title: 'Pembersihan Data (Data Cleaning)', path: 'coding/06-analisis-data/03-pembersihan-data-cleaning/' },
                    { id: 'kka-ad-04', title: 'Visualisasi Data Grafik & Storytelling', path: 'coding/06-analisis-data/04-visualisasi-data-storytelling/' },
                    { id: 'kka-ad-05', title: 'Pengambilan Keputusan Berbasis Data', path: 'coding/06-analisis-data/05-pengambilan-keputusan-berbasis-data/' },
                    { id: 'kka-ad-06', title: 'Proyek Riset Analisis Data Sekolah', path: 'coding/06-analisis-data/06-proyek-riset-analisis-data-sekolah/' }
                ]
            },
            {
                unit_id: '07',
                title: 'Koding Kreatif Lanjutan & Capstone AI',
                desc: 'Python ML, NLP, OpenCV Computer Vision, Chatbot AI, Robotika, dan Capstone',
                path: 'coding/07-koding-kreatif-lanjutan/',
                topics: [
                    { id: 'kka-adv-01', title: 'Python untuk Machine Learning (Scikit-Learn)', path: 'coding/07-koding-kreatif-lanjutan/01-python-untuk-machine-learning/' },
                    { id: 'kka-adv-02', title: 'Natural Language Processing (NLP & Sentimen)', path: 'coding/07-koding-kreatif-lanjutan/02-natural-language-processing/' },
                    { id: 'kka-adv-03', title: 'Computer Vision & OpenCV (Deteksi Wajah/Objek)', path: 'coding/07-koding-kreatif-lanjutan/03-computer-vision-opencv/' },
                    { id: 'kka-adv-04', title: 'Arsitektur & Pembuatan Chatbot AI Interaktif', path: 'coding/07-koding-kreatif-lanjutan/04-chatbot-ai/' },
                    { id: 'kka-adv-05', title: 'Robotika Cerdas & Simulasi Fisika Digital', path: 'coding/07-koding-kreatif-lanjutan/05-robotika-simulasi/' },
                    { id: 'kka-adv-06', title: 'Proyek Capstone AI & Demo Day Inovasi', path: 'coding/07-koding-kreatif-lanjutan/06-proyek-capstone-ai/' }
                ]
            }
        ]
    };

    function getToken() {
        try {
            return localStorage.getItem('fanani_auth_token') || null;
        } catch (e) {
            return null;
        }
    }

    function getUser() {
        try {
            return JSON.parse(localStorage.getItem('fanani_user') || 'null');
        } catch (e) {
            return null;
        }
    }

    function getLocalProgress() {
        try {
            return JSON.parse(localStorage.getItem('fanani_learn_progress') || '{}');
        } catch (e) {
            return {};
        }
    }

    function setLocalProgress(topicId, isCompleted = true) {
        try {
            const prog = getLocalProgress();
            prog[topicId] = isCompleted;
            localStorage.setItem('fanani_learn_progress', JSON.stringify(prog));
        } catch (e) {}
    }

    // Record or sync completion status
    async function markCompleted(subject, topicId) {
        setLocalProgress(topicId, true);

        const token = getToken();
        if (!token) return { success: true, mode: 'local' };

        try {
            const res = await fetch(`${API_BASE_URL}/save_progress.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ subject, topic_id: topicId, status: 'completed' })
            });
            const data = await res.json();
            return { success: data.success, mode: 'server' };
        } catch (err) {
            console.warn('[Tracker] Offline fallback for progress:', err);
            return { success: true, mode: 'local_fallback' };
        }
    }

    // Submit evaluation with score and answers (multi-attempt)
    async function submitEvaluation(payload) {
        // payload: { subject, topic_id, score_a, score_b, score_c, score_d, total_score, answers }
        const { subject, topic_id, total_score } = payload;

        // 1. Save locally to history
        try {
            const histKey = `eval_hist_${topic_id}`;
            const localHist = JSON.parse(localStorage.getItem(histKey) || '[]');
            const attemptNum = localHist.length + 1;
            const entry = {
                attempt_number: attemptNum,
                ...payload,
                created_at: new Date().toISOString()
            };
            localHist.push(entry);
            localStorage.setItem(histKey, JSON.stringify(localHist));

            if (total_score >= 70) {
                setLocalProgress(topic_id, true);
            }
        } catch (e) {}

        // 2. Sync to Server if authenticated
        const token = getToken();
        if (!token) return { success: true, mode: 'local' };

        try {
            const res = await fetch(`${API_BASE_URL}/submit_evaluation.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            return { success: data.success, mode: 'server', data };
        } catch (err) {
            console.warn('[Tracker] Offline fallback for evaluation:', err);
            return { success: true, mode: 'local_fallback' };
        }
    }

    // Save reflection note
    async function saveReflection(subject, topic_id, reflection_text) {
        try {
            localStorage.setItem(`refl_${topic_id}`, reflection_text);
        } catch (e) {}

        const token = getToken();
        if (!token) return { success: true, mode: 'local' };

        try {
            const res = await fetch(`${API_BASE_URL}/save_reflection.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ subject, topic_id, reflection_text })
            });
            const data = await res.json();
            return { success: data.success, mode: 'server' };
        } catch (err) {
            console.warn('[Tracker] Offline fallback for reflection:', err);
            return { success: true, mode: 'local_fallback' };
        }
    }

    // Fetch history for specific topic
    async function getHistory(subject, topic_id) {
        const token = getToken();
        if (token) {
            try {
                const res = await fetch(`${API_BASE_URL}/get_topic_history.php?subject=${subject}&topic_id=${topic_id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (data && data.success) {
                    return data;
                }
            } catch (err) {}
        }

        // Fallback local
        const histKey = `eval_hist_${topic_id}`;
        const localHist = JSON.parse(localStorage.getItem(histKey) || '[]');
        const localRefl = localStorage.getItem(`refl_${topic_id}`) || null;
        const isComp = !!getLocalProgress()[topic_id];

        return {
            success: true,
            attempts: localHist,
            total_attempts: localHist.length,
            max_score: localHist.length ? Math.max(...localHist.map(h => h.total_score || 0)) : 0,
            reflection_text: localRefl,
            is_completed: isComp,
            mode: 'local'
        };
    }

    // Comprehensive Aggregator across all 96 topics (50 Informatika + 46 KKA)
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

        const totalModules = 96; // 50 + 46
        const overallPercentage = Math.round((totalCompleted / totalModules) * 100);
        const averageScore = evaluatedCount > 0 ? Math.round(totalScoreSum / evaluatedCount) : 0;

        // Determine Level / Rank Gamification
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

        // Badges calculation
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

    // Google Login API handler
    async function googleLogin(credential) {
        try {
            const res = await fetch(`${API_BASE_URL}/google_login.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential })
            });
            const data = await res.json();
            if (data.success && data.session_token) {
                localStorage.setItem('fanani_auth_token', data.session_token);
                return data;
            }
            return { success: false, error: data.error || 'Login failed' };
        } catch (err) {
            console.warn('[Tracker] Google login network fallback:', err);
            return { success: false, error: err.message };
        }
    }

    // Save profile API handler
    async function saveProfile(payload) {
        const fullName = payload.full_name || payload.name;
        const kelas = payload.kelas;
        const token = getToken();

        if (!token) return { success: true, mode: 'local' };

        try {
            const res = await fetch(`${API_BASE_URL}/save_profile.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ full_name: fullName, kelas })
            });
            const data = await res.json();
            return data;
        } catch (err) {
            console.warn('[Tracker] Save profile network fallback:', err);
            return { success: true, mode: 'local_fallback' };
        }
    }

    return {
        getToken,
        getUser,
        COURSE_CATALOG,
        markCompleted,
        submitEvaluation,
        saveReflection,
        getHistory,
        getAllProgressSummary,
        googleLogin,
        saveProfile
    };
})();

if (typeof window !== 'undefined') {
    window.FananiTracker = FananiTracker;
}
