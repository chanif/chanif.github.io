// ============================================================
// LEVEL 1: PAUD — Eksplorasi Logika Dasar & Unplugged
// ============================================================
// File ini berisi seluruh data materi & soal untuk jenjang PAUD.
// Didesain ramah anak: banyak emoji, kartu visual, warna cerah.
// ============================================================

window.levelPaud = {
    id: "paud",
    title: "Level 1: PAUD",
    badge: "Persiapan",
    icon: "👶",
    description: "Eksplorasi motorik, logika berpikir dasar, dan permainan kelompok tanpa layar (unplugged).",
    lessons: [
        // ===================== MATERI 1 =====================
        {
            id: "paud_1",
            title: "Mengenal Arah (Kanan, Kiri, Maju)",
            icon: "🧭",
            difficulty: "Mudah",
            duration: "10 menit",
            content: `
                <div class="bg-indigo-50 rounded-3xl p-6 text-center border-2 border-indigo-100 shadow-sm relative overflow-hidden">
                    <h3 class="text-2xl font-extrabold text-indigo-700 mb-6 relative z-10">🧭 Mari Mengenal Arah!</h3>
                    <div class="relative w-full max-w-sm mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg border-4 border-white transform transition hover:scale-105">
                        <img src="assets/images/paud_robot.png" alt="Robot Arah" class="w-full h-auto object-cover aspect-video" />
                    </div>

                    <p class="text-base text-indigo-900 font-bold leading-relaxed mb-6 relative z-10">
                        Bantu robot kecil ini mencari jalan keluar! Kita pakai kartu panah untuk memberi perintah. 🤖
                    </p>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-indigo-200 mb-6">
                        <h4 class="text-sm font-black text-indigo-800 uppercase mb-3">📖 Apa itu Arah?</h4>
                        <p class="text-sm text-indigo-900 leading-relaxed">
                            Arah adalah petunjuk ke mana kita harus pergi. Ada 3 arah utama yang akan kita pelajari:
                        </p>
                    </div>

                    <div class="flex justify-center gap-4 relative z-10 flex-wrap mb-6">
                        <div class="bg-white p-4 rounded-2xl shadow-md border-b-4 border-indigo-200 min-w-[100px]">
                            <span class="block text-5xl mb-2">⬆️</span>
                            <span class="block text-xs font-black text-indigo-800 uppercase">Maju</span>
                            <span class="block text-[10px] text-indigo-500 mt-1">Ke depan!</span>
                        </div>
                        <div class="bg-white p-4 rounded-2xl shadow-md border-b-4 border-indigo-200 min-w-[100px]">
                            <span class="block text-5xl mb-2">➡️</span>
                            <span class="block text-xs font-black text-indigo-800 uppercase">Kanan</span>
                            <span class="block text-[10px] text-indigo-500 mt-1">Sisi tangan kanan 🖐️</span>
                        </div>
                        <div class="bg-white p-4 rounded-2xl shadow-md border-b-4 border-indigo-200 min-w-[100px]">
                            <span class="block text-5xl mb-2">⬅️</span>
                            <span class="block text-xs font-black text-indigo-800 uppercase">Kiri</span>
                            <span class="block text-[10px] text-indigo-500 mt-1">Sisi tangan kiri ✋</span>
                        </div>
                    </div>

                    <div class="bg-indigo-100 p-4 rounded-2xl border-2 border-indigo-200">
                        <p class="text-sm font-bold text-indigo-800">
                            💡 <strong>Tips:</strong> Angkat tangan kanan dan kiri untuk menghafal arah! Tangan yang membentuk huruf "L" adalah tangan <strong>Kiri</strong>. ✋
                        </p>
                    </div>
                </div>
            `,
            enrichment: {
                title: "Panduan Aktivitas Unplugged PAUD",
                url: "https://code.org/curriculum/unplugged"
            },
            questions: [
                {
                    id: "q_paud_l1_1",
                    question: '<div class="bg-indigo-100 p-4 rounded-xl border-2 border-indigo-200 shadow-sm text-indigo-900 font-extrabold text-lg flex gap-3 items-center"><span>🧩 Jika robot melihat panah ⬆️, apa yang harus ia lakukan?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🚶</span> Maju satu langkah</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🛑</span> Berhenti diam</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔄</span> Berputar</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l1_2",
                    question: '<div class="bg-indigo-100 p-4 rounded-xl border-2 border-indigo-200 shadow-sm text-indigo-900 font-extrabold text-lg flex gap-3 items-center"><span>👋 Arah manakah yang berlawanan dengan Kiri 👈?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">👉</span> Kanan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬆️</span> Maju</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬇️</span> Mundur</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l1_3",
                    question: '<div class="bg-indigo-100 p-4 rounded-xl border-2 border-indigo-200 shadow-sm text-indigo-900 font-extrabold text-lg flex gap-3 items-center"><span>🖐️ Jika kita ingin berbelok ke sisi tangan kanan, kartu mana yang kita ambil?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">➡️</span> Kartu Kanan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬅️</span> Kartu Kiri</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬆️</span> Kartu Maju</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l1_4",
                    question: '<div class="bg-indigo-100 p-4 rounded-xl border-2 border-indigo-200 shadow-sm text-indigo-900 font-extrabold text-lg flex gap-3 items-center"><span>🤔 Simbol panah ⬆️ artinya apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬆️</span> Maju ke depan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬅️</span> Belok Kiri</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">➡️</span> Belok Kanan</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l1_5",
                    question: '<div class="bg-indigo-100 p-4 rounded-xl border-2 border-indigo-200 shadow-sm text-indigo-900 font-extrabold text-lg flex gap-3 items-center"><span>🤔 Simbol panah ➡️ artinya apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">➡️</span> Belok Kanan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬅️</span> Belok Kiri</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬆️</span> Maju</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l1_6",
                    question: '<div class="bg-indigo-100 p-4 rounded-xl border-2 border-indigo-200 shadow-sm text-indigo-900 font-extrabold text-lg flex gap-3 items-center"><span>🤔 Simbol panah ⬅️ artinya apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬅️</span> Belok Kiri</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">➡️</span> Belok Kanan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬆️</span> Maju</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l1_7",
                    question: '<div class="bg-indigo-100 p-4 rounded-xl border-2 border-indigo-200 shadow-sm text-indigo-900 font-extrabold text-lg flex gap-3 items-center"><span>🕳️ Di depan ada lubang! Apa yang sebaiknya kita lakukan?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">↩️</span> Berbelok dulu, baru maju</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬆️</span> Maju terus saja</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🛑</span> Diam saja di tempat</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l1_8",
                    question: '<div class="bg-indigo-100 p-4 rounded-xl border-2 border-indigo-200 shadow-sm text-indigo-900 font-extrabold text-lg flex gap-3 items-center"><span>🤖 Robot ingin maju 2 kali: 🤖 ➡️ 🟩 ➡️ 🟩 ➡️ 🚩. Berapa kartu panah Maju ⬆️ yang diperlukan?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">2️⃣</span> Dua kartu</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">1️⃣</span> Satu kartu</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">3️⃣</span> Tiga kartu</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l1_9",
                    question: '<div class="bg-indigo-100 p-4 rounded-xl border-2 border-indigo-200 shadow-sm text-indigo-900 font-extrabold text-lg flex gap-3 items-center"><span>🃏 Kartu panah ⬆️ ➡️ ⬅️ gunanya untuk apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🤖</span> Menentukan jalan robot</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎨</span> Menggambar pemandangan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">📖</span> Mewarnai buku</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l1_10",
                    question: '<div class="bg-indigo-100 p-4 rounded-xl border-2 border-indigo-200 shadow-sm text-indigo-900 font-extrabold text-lg flex gap-3 items-center"><span>🌳 Di depan ada pohon! Kita mau lewat sisi kiri. Kartu pertama yang dipakai?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬅️</span> Belok Kiri</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">➡️</span> Belok Kanan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬆️</span> Maju</div>'
                    ],
                    correctIndex: 0
                }
            ]
        },

        // ===================== MATERI 2 =====================
        {
            id: "paud_2",
            title: "Pola Warna Sederhana",
            icon: "🎨",
            difficulty: "Mudah",
            duration: "12 menit",
            content: `
                <div class="bg-rose-50 rounded-3xl p-6 text-center border-2 border-rose-100 shadow-sm relative overflow-hidden">
                    <h3 class="text-2xl font-extrabold text-rose-700 mb-6 relative z-10">🎨 Belajar Pola Warna!</h3>
                    <div class="relative w-full max-w-sm mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg border-4 border-white transform transition hover:scale-105">
                        <img src="assets/images/paud_pattern.png" alt="Pola Warna" class="w-full h-auto object-cover aspect-video" />
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-rose-200 mb-6">
                        <h4 class="text-sm font-black text-rose-800 uppercase mb-3">📖 Apa itu Pola?</h4>
                        <p class="text-sm text-rose-900 leading-relaxed">
                            Pola adalah susunan yang <strong>berulang</strong> dengan teratur. Kalau kita tahu polanya, kita bisa menebak apa yang muncul selanjutnya! 🧠
                        </p>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-rose-200 mb-6">
                        <h4 class="text-sm font-black text-rose-800 uppercase mb-3">🔍 Contoh Pola</h4>
                        <div class="space-y-3">
                            <div class="flex justify-center gap-2 text-3xl">
                                <span>🔴</span><span>🔵</span><span>🔴</span><span>🔵</span><span class="animate-pulse">❓</span>
                            </div>
                            <p class="text-sm text-rose-900 font-bold">Jawabannya: 🔴 Merah! Karena polanya Merah-Biru berulang.</p>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-rose-200 mb-6">
                        <h4 class="text-sm font-black text-rose-800 uppercase mb-3">🎯 Contoh Pola Lain</h4>
                        <div class="space-y-3">
                            <div class="flex justify-center gap-2 text-3xl">
                                <span>🟢</span><span>🟡</span><span>🟢</span><span>🟡</span><span class="animate-pulse">❓</span>
                            </div>
                            <p class="text-sm text-rose-900 font-bold">Jawabannya: 🟢 Hijau!</p>
                            <div class="flex justify-center gap-2 text-3xl mt-3">
                                <span>⭐</span><span>🌙</span><span>⭐</span><span>🌙</span><span>⭐</span><span class="animate-pulse">❓</span>
                            </div>
                            <p class="text-sm text-rose-900 font-bold">Jawabannya: 🌙 Bulan!</p>
                        </div>
                    </div>

                    <div class="bg-rose-100 p-4 rounded-2xl border-2 border-rose-200">
                        <p class="text-sm font-bold text-rose-800">
                            💡 <strong>Tips:</strong> Perhatikan benda yang muncul berulang-ulang. Benda pertama akan muncul lagi setelah benda terakhir! 🔁
                        </p>
                    </div>
                </div>
            `,
            enrichment: {
                title: "Bahan Belajar Pola Geometri Anak",
                url: "https://www.activityvillage.co.uk/patterns"
            },
            questions: [
                {
                    id: "q_paud_l2_1",
                    question: '<div class="bg-rose-100 p-4 rounded-xl border-2 border-rose-200 shadow-sm text-rose-900 font-extrabold text-lg"><span>🔴🔵🔴🔵 ... Warna apa selanjutnya?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔴</span> Merah</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🟢</span> Hijau</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🟡</span> Kuning</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l2_2",
                    question: '<div class="bg-rose-100 p-4 rounded-xl border-2 border-rose-200 shadow-sm text-rose-900 font-extrabold text-lg"><span>🟢🟡🟢🟡 ... Apa selanjutnya?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🟢</span> Hijau</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔴</span> Merah</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🟡</span> Kuning</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l2_3",
                    question: '<div class="bg-rose-100 p-4 rounded-xl border-2 border-rose-200 shadow-sm text-rose-900 font-extrabold text-lg"><span>⭐🌙⭐🌙⭐ ... Apa selanjutnya?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🌙</span> Bulan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">⭐</span> Bintang</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">☀️</span> Matahari</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l2_4",
                    question: '<div class="bg-rose-100 p-4 rounded-xl border-2 border-rose-200 shadow-sm text-rose-900 font-extrabold text-lg"><span>🍎🍌🍎🍌 ... Buah apa selanjutnya?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🍎</span> Apel</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🍌</span> Pisang</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🍊</span> Jeruk</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l2_5",
                    question: '<div class="bg-rose-100 p-4 rounded-xl border-2 border-rose-200 shadow-sm text-rose-900 font-extrabold text-lg"><span>🔵🔵🔴🔵🔵🔴 ... Apa warna selanjutnya?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔵</span> Biru</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔴</span> Merah</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🟢</span> Hijau</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l2_6",
                    question: '<div class="bg-rose-100 p-4 rounded-xl border-2 border-rose-200 shadow-sm text-rose-900 font-extrabold text-lg"><span>🐱🐶🐱🐶 ... Hewan apa selanjutnya?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🐱</span> Kucing</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🐶</span> Anjing</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🐰</span> Kelinci</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l2_7",
                    question: '<div class="bg-rose-100 p-4 rounded-xl border-2 border-rose-200 shadow-sm text-rose-900 font-extrabold text-lg"><span>🔺🔻🔺🔻 ... Bentuk apa selanjutnya?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔺</span> Segitiga Atas</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔻</span> Segitiga Bawah</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">⬛</span> Kotak</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l2_8",
                    question: '<div class="bg-rose-100 p-4 rounded-xl border-2 border-rose-200 shadow-sm text-rose-900 font-extrabold text-lg"><span>🤔 Apa itu "Pola"?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔁</span> Susunan yang berulang teratur</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎲</span> Susunan yang acak</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">📦</span> Kumpulan barang</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l2_9",
                    question: '<div class="bg-rose-100 p-4 rounded-xl border-2 border-rose-200 shadow-sm text-rose-900 font-extrabold text-lg"><span>❤️💙❤️💙❤️ ... Apa selanjutnya?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">💙</span> Hati Biru</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">❤️</span> Hati Merah</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">💚</span> Hati Hijau</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l2_10",
                    question: '<div class="bg-rose-100 p-4 rounded-xl border-2 border-rose-200 shadow-sm text-rose-900 font-extrabold text-lg"><span>🎵 Kalau kita tahu polanya, kita bisa...</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔮</span> Menebak apa yang muncul selanjutnya</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🏃</span> Berlari cepat</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎨</span> Menggambar saja</div>'
                    ],
                    correctIndex: 0
                }
            ]
        },

        // ===================== MATERI 3 =====================
        {
            id: "paud_3",
            title: "Sequencing (Urutan Langkah Harian)",
            icon: "📅",
            difficulty: "Mudah",
            duration: "10 menit",
            content: `
                <div class="bg-amber-50 rounded-3xl p-6 text-center border-2 border-amber-100 shadow-sm relative overflow-hidden">
                    <h3 class="text-2xl font-extrabold text-amber-700 mb-6 relative z-10">📅 Urutan Langkah Harian!</h3>
                    <div class="relative w-full max-w-sm mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg border-4 border-white transform transition hover:scale-105">
                        <img src="assets/images/paud_sequence.png" alt="Urutan Harian" class="w-full h-auto object-cover aspect-video" />
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-amber-200 mb-6">
                        <h4 class="text-sm font-black text-amber-800 uppercase mb-3">📖 Apa itu Urutan?</h4>
                        <p class="text-sm text-amber-900 leading-relaxed">
                            Urutan (Sequencing) artinya melakukan sesuatu <strong>langkah demi langkah</strong> sesuai aturan. Kalau urutannya salah, hasilnya jadi aneh! 😅
                        </p>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-amber-200 mb-6">
                        <h4 class="text-sm font-black text-amber-800 uppercase mb-3">🌅 Urutan Pagi Beruang</h4>
                        <p class="text-sm text-amber-900 mb-4">Bantu beruang menyusun urutan paginya yang benar!</p>
                        <div class="flex justify-center gap-3 flex-wrap">
                            <div class="bg-amber-100 p-3 rounded-2xl shadow-md border-b-4 border-amber-200">
                                <span class="block text-3xl mb-1">1️⃣ 🛏️</span>
                                <span class="block text-[10px] font-black text-amber-800 uppercase">Bangun Tidur</span>
                            </div>
                            <div class="bg-amber-100 p-3 rounded-2xl shadow-md border-b-4 border-amber-200">
                                <span class="block text-3xl mb-1">2️⃣ 🪥</span>
                                <span class="block text-[10px] font-black text-amber-800 uppercase">Sikat Gigi</span>
                            </div>
                            <div class="bg-amber-100 p-3 rounded-2xl shadow-md border-b-4 border-amber-200">
                                <span class="block text-3xl mb-1">3️⃣ 🥣</span>
                                <span class="block text-[10px] font-black text-amber-800 uppercase">Sarapan</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-amber-200 mb-6">
                        <h4 class="text-sm font-black text-amber-800 uppercase mb-3">🚿 Contoh Urutan Mandi</h4>
                        <div class="flex justify-center gap-2 flex-wrap">
                            <div class="bg-amber-100 p-2 rounded-xl text-center min-w-[70px]">
                                <span class="block text-2xl">1️⃣👕</span>
                                <span class="block text-[9px] font-bold text-amber-800">Lepas Baju</span>
                            </div>
                            <div class="text-2xl self-center">➡️</div>
                            <div class="bg-amber-100 p-2 rounded-xl text-center min-w-[70px]">
                                <span class="block text-2xl">2️⃣🚿</span>
                                <span class="block text-[9px] font-bold text-amber-800">Nyalakan Air</span>
                            </div>
                            <div class="text-2xl self-center">➡️</div>
                            <div class="bg-amber-100 p-2 rounded-xl text-center min-w-[70px]">
                                <span class="block text-2xl">3️⃣🧼</span>
                                <span class="block text-[9px] font-bold text-amber-800">Pakai Sabun</span>
                            </div>
                            <div class="text-2xl self-center">➡️</div>
                            <div class="bg-amber-100 p-2 rounded-xl text-center min-w-[70px]">
                                <span class="block text-2xl">4️⃣💧</span>
                                <span class="block text-[9px] font-bold text-amber-800">Bilas</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-amber-100 p-4 rounded-2xl border-2 border-amber-200">
                        <p class="text-sm font-bold text-amber-800">
                            💡 <strong>Ingat:</strong> Komputer juga bekerja berurutan! Kalau langkahnya salah, hasilnya jadi salah. Ini disebut <strong>algoritma</strong>! 🤖
                        </p>
                    </div>
                </div>
            `,
            enrichment: {
                title: "Aktivitas Urutan Harian untuk Anak",
                url: "https://code.org/curriculum/unplugged"
            },
            questions: [
                {
                    id: "q_paud_l3_1",
                    question: '<div class="bg-amber-100 p-4 rounded-xl border-2 border-amber-200 shadow-sm text-amber-900 font-extrabold text-lg"><span>🌅 Apa yang pertama dilakukan saat pagi?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🛏️</span> Bangun tidur</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🥣</span> Sarapan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎮</span> Main game</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l3_2",
                    question: '<div class="bg-amber-100 p-4 rounded-xl border-2 border-amber-200 shadow-sm text-amber-900 font-extrabold text-lg"><span>🪥 Setelah bangun tidur, sebaiknya kita...</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🪥</span> Sikat gigi & mandi</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎮</span> Main game dulu</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🌙</span> Tidur lagi</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l3_3",
                    question: '<div class="bg-amber-100 p-4 rounded-xl border-2 border-amber-200 shadow-sm text-amber-900 font-extrabold text-lg"><span>🤔 Apa arti "Urutan" (Sequencing)?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">📋</span> Melakukan langkah satu per satu</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔀</span> Melakukan semua sekaligus</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🚫</span> Tidak perlu ada langkah</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l3_4",
                    question: '<div class="bg-amber-100 p-4 rounded-xl border-2 border-amber-200 shadow-sm text-amber-900 font-extrabold text-lg"><span>🚿 Mau mandi: 1.Lepas baju 👕 2.Nyalakan air 🚿 3.Pakai sabun 🧼 4.Bilas 💧. Boleh dibalik urutan 2 dan 3?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">❌</span> Tidak, nanti sabunnya tidak bisa dibilas!</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">✅</span> Boleh saja</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🤷</span> Terserah</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l3_5",
                    question: '<div class="bg-amber-100 p-4 rounded-xl border-2 border-amber-200 shadow-sm text-amber-900 font-extrabold text-lg"><span>👟 Urutkan! Mau pakai sepatu: 1.Pakai kaus kaki 🧦 2.Pakai sepatu 👟 3.Ikat tali 🪢. Mana yang benar?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">✅</span> 🧦 ➡️ 👟 ➡️ 🪢</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">❌</span> 👟 ➡️ 🧦 ➡️ 🪢</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">❌</span> 🪢 ➡️ 👟 ➡️ 🧦</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l3_6",
                    question: '<div class="bg-amber-100 p-4 rounded-xl border-2 border-amber-200 shadow-sm text-amber-900 font-extrabold text-lg"><span>🤖 Kalau urutan langkah salah, apa yang terjadi?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">😅</span> Hasilnya jadi aneh/salah</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">😊</span> Hasilnya tetap benar</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🤷</span> Tidak ada pengaruhnya</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l3_7",
                    question: '<div class="bg-amber-100 p-4 rounded-xl border-2 border-amber-200 shadow-sm text-amber-900 font-extrabold text-lg"><span>🥛 Membuat susu: Ambil gelas 🥛 ➡️ Masukkan susu 🥄 ➡️ Tuang air 💧 ➡️ Aduk 🥣. Langkah pertama apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🥛</span> Ambil gelas</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">💧</span> Tuang air</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🥄</span> Masukkan susu</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l3_8",
                    question: '<div class="bg-amber-100 p-4 rounded-xl border-2 border-amber-200 shadow-sm text-amber-900 font-extrabold text-lg"><span>📖 Langkah-langkah yang berurutan disebut apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">📋</span> Algoritma</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎨</span> Gambar</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎵</span> Lagu</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l3_9",
                    question: '<div class="bg-amber-100 p-4 rounded-xl border-2 border-amber-200 shadow-sm text-amber-900 font-extrabold text-lg"><span>🎒 Mau berangkat sekolah. Mana urutan yang benar?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">✅</span> Mandi 🚿 ➡️ Pakai baju 👕 ➡️ Sarapan 🍞 ➡️ Berangkat 🚌</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">❌</span> Berangkat 🚌 ➡️ Mandi 🚿 ➡️ Sarapan 🍞</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">❌</span> Pakai baju 👕 ➡️ Mandi 🚿 ➡️ Berangkat 🚌</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l3_10",
                    question: '<div class="bg-amber-100 p-4 rounded-xl border-2 border-amber-200 shadow-sm text-amber-900 font-extrabold text-lg"><span>🤖 Komputer juga bekerja berurutan. Siapa yang memberi urutan perintah ke komputer?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">👨‍💻</span> Manusia (Programmer)</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🐱</span> Kucing</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🌳</span> Pohon</div>'
                    ],
                    correctIndex: 0
                }
            ]
        },

        // ===================== MATERI 4 =====================
        {
            id: "paud_4",
            title: "Kondisional 'Jika... Maka...' Unplugged",
            icon: "⚖️",
            difficulty: "Sedang",
            duration: "15 menit",
            content: `
                <div class="bg-cyan-50 rounded-3xl p-6 text-center border-2 border-cyan-100 shadow-sm relative overflow-hidden">
                    <h3 class="text-2xl font-extrabold text-cyan-700 mb-6 relative z-10">⚖️ Jika... Maka...!</h3>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-cyan-200 mb-6">
                        <h4 class="text-sm font-black text-cyan-800 uppercase mb-3">📖 Apa itu Kondisi?</h4>
                        <p class="text-sm text-cyan-900 leading-relaxed">
                            Kita membuat <strong>aturan</strong>: <strong>JIKA</strong> sesuatu terjadi, <strong>MAKA</strong> kita akan melakukan sesuatu! Seperti aturan di kehidupan sehari-hari. 🤔
                        </p>
                    </div>

                    <div class="space-y-4 mb-6">
                        <div class="bg-white p-4 rounded-2xl shadow-md border-l-4 border-cyan-400 text-left">
                            <p class="text-base text-cyan-900 font-bold">
                                🌧️ <strong>JIKA</strong> hujan turun, <strong>MAKA</strong> pakai payung ☔
                            </p>
                        </div>
                        <div class="bg-white p-4 rounded-2xl shadow-md border-l-4 border-cyan-400 text-left">
                            <p class="text-base text-cyan-900 font-bold">
                                ☀️ <strong>JIKA</strong> cuaca panas, <strong>MAKA</strong> pakai topi 🧢
                            </p>
                        </div>
                        <div class="bg-white p-4 rounded-2xl shadow-md border-l-4 border-cyan-400 text-left">
                            <p class="text-base text-cyan-900 font-bold">
                                🔴 <strong>JIKA</strong> lampu merah, <strong>MAKA</strong> berhenti 🛑
                            </p>
                        </div>
                        <div class="bg-white p-4 rounded-2xl shadow-md border-l-4 border-emerald-400 text-left">
                            <p class="text-base text-cyan-900 font-bold">
                                🟢 <strong>JIKA</strong> lampu hijau, <strong>MAKA</strong> jalan 🚶
                            </p>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-cyan-200 mb-6">
                        <h4 class="text-sm font-black text-cyan-800 uppercase mb-3">🎮 Contoh di Game</h4>
                        <p class="text-sm text-cyan-900 leading-relaxed">
                            <strong>JIKA</strong> karakter 🤖 menyentuh bintang ⭐, <strong>MAKA</strong> dapat poin! 🎉<br>
                            <strong>JIKA</strong> karakter 🤖 jatuh ke lubang 🕳️, <strong>MAKA</strong> game over! 💀
                        </p>
                    </div>

                    <div class="bg-cyan-100 p-4 rounded-2xl border-2 border-cyan-200">
                        <p class="text-sm font-bold text-cyan-800">
                            💡 <strong>Tips:</strong> Kita selalu membuat keputusan "Jika...Maka..." setiap hari! Komputer juga begitu — ia harus diberi aturan yang jelas. 🤖
                        </p>
                    </div>
                </div>
            `,
            enrichment: {
                title: "Aktivitas Logika Kondisional untuk Anak",
                url: "https://code.org/curriculum/unplugged"
            },
            questions: [
                {
                    id: "q_paud_l4_1",
                    question: '<div class="bg-cyan-100 p-4 rounded-xl border-2 border-cyan-200 shadow-sm text-cyan-900 font-extrabold text-lg"><span>🌧️ JIKA hujan turun, MAKA kita harus pakai apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">☔</span> Payung</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🕶️</span> Kacamata hitam</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🩳</span> Celana pendek</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l4_2",
                    question: '<div class="bg-cyan-100 p-4 rounded-xl border-2 border-cyan-200 shadow-sm text-cyan-900 font-extrabold text-lg"><span>🔴 JIKA lampu merah menyala, kendaraan harus?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🛑</span> Berhenti</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🏎️</span> Ngebut</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔄</span> Putar balik</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l4_3",
                    question: '<div class="bg-cyan-100 p-4 rounded-xl border-2 border-cyan-200 shadow-sm text-cyan-900 font-extrabold text-lg"><span>🟢 JIKA tombol hijau ditekan, mesin menyala. JIKA tombol 🔴 ditekan?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🛑</span> Mesin mati</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🚀</span> Mesin terbang</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎈</span> Keluar balon</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l4_4",
                    question: '<div class="bg-cyan-100 p-4 rounded-xl border-2 border-cyan-200 shadow-sm text-cyan-900 font-extrabold text-lg"><span>😊 JIKA kamu senang, kamu akan...</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">😄</span> Tersenyum</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">😢</span> Menangis</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">😡</span> Marah</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l4_5",
                    question: '<div class="bg-cyan-100 p-4 rounded-xl border-2 border-cyan-200 shadow-sm text-cyan-900 font-extrabold text-lg"><span>🍎 JIKA ada apel di meja, MAKA kita bisa...</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">😋</span> Memakannya</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🚗</span> Mengendarainya</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">✈️</span> Menerbangkannya</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l4_6",
                    question: '<div class="bg-cyan-100 p-4 rounded-xl border-2 border-cyan-200 shadow-sm text-cyan-900 font-extrabold text-lg"><span>⭐ Di game: JIKA menyentuh bintang ⭐, MAKA...</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎉</span> Dapat poin!</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">💀</span> Game over</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">😴</span> Tidur</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l4_7",
                    question: '<div class="bg-cyan-100 p-4 rounded-xl border-2 border-cyan-200 shadow-sm text-cyan-900 font-extrabold text-lg"><span>🤔 "Jika... Maka..." itu artinya apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">📋</span> Membuat aturan/keputusan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎨</span> Menggambar</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎵</span> Bernyanyi</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l4_8",
                    question: '<div class="bg-cyan-100 p-4 rounded-xl border-2 border-cyan-200 shadow-sm text-cyan-900 font-extrabold text-lg"><span>🥶 JIKA udara dingin, sebaiknya kita pakai...</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🧥</span> Jaket tebal</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🩳</span> Celana pendek</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">👙</span> Baju renang</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l4_9",
                    question: '<div class="bg-cyan-100 p-4 rounded-xl border-2 border-cyan-200 shadow-sm text-cyan-900 font-extrabold text-lg"><span>🔔 JIKA bel sekolah berbunyi, MAKA murid harus...</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🏫</span> Masuk kelas</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🏃</span> Lari pulang</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">😴</span> Tidur</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l4_10",
                    question: '<div class="bg-cyan-100 p-4 rounded-xl border-2 border-cyan-200 shadow-sm text-cyan-900 font-extrabold text-lg"><span>🤖 Apakah komputer juga perlu aturan "Jika...Maka..."?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">✅</span> Ya! Komputer perlu aturan jelas</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">❌</span> Tidak, komputer bisa sendiri</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🤷</span> Tidak tahu</div>'
                    ],
                    correctIndex: 0
                }
            ]
        },

        // ===================== MATERI 5 =====================
        {
            id: "paud_5",
            title: "Pengelompokan Objek (Klasifikasi)",
            icon: "🏷️",
            difficulty: "Mudah",
            duration: "10 menit",
            content: `
                <div class="bg-emerald-50 rounded-3xl p-6 text-center border-2 border-emerald-100 shadow-sm relative overflow-hidden">
                    <h3 class="text-2xl font-extrabold text-emerald-700 mb-6 relative z-10">🏷️ Ayo Mengelompokkan!</h3>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-emerald-200 mb-6">
                        <h4 class="text-sm font-black text-emerald-800 uppercase mb-3">📖 Apa itu Klasifikasi?</h4>
                        <p class="text-sm text-emerald-900 leading-relaxed">
                            Klasifikasi artinya <strong>mengelompokkan benda</strong> yang mirip ke tempat yang sama. Kita bisa kelompokkan berdasarkan <strong>warna</strong>, <strong>ukuran</strong>, atau <strong>jenis</strong>! 📦
                        </p>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-emerald-200 mb-6">
                        <h4 class="text-sm font-black text-emerald-800 uppercase mb-3">🎨 Kelompokkan Berdasar Warna</h4>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="bg-red-50 p-3 rounded-xl border-2 border-red-200 text-center">
                                <p class="text-xs font-black text-red-700 mb-2">🔴 Keranjang Merah</p>
                                <div class="text-2xl">🍎 🌹 🍓</div>
                            </div>
                            <div class="bg-blue-50 p-3 rounded-xl border-2 border-blue-200 text-center">
                                <p class="text-xs font-black text-blue-700 mb-2">🔵 Keranjang Biru</p>
                                <div class="text-2xl">🫐 🧢 💎</div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-emerald-200 mb-6">
                        <h4 class="text-sm font-black text-emerald-800 uppercase mb-3">🐾 Kelompokkan Berdasar Jenis</h4>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="bg-amber-50 p-3 rounded-xl border-2 border-amber-200 text-center">
                                <p class="text-xs font-black text-amber-700 mb-2">🐾 Hewan</p>
                                <div class="text-2xl">🐱 🐶 🐰 🐘</div>
                            </div>
                            <div class="bg-green-50 p-3 rounded-xl border-2 border-green-200 text-center">
                                <p class="text-xs font-black text-green-700 mb-2">🍎 Buah</p>
                                <div class="text-2xl">🍎 🍌 🍊 🍇</div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-emerald-100 p-4 rounded-2xl border-2 border-emerald-200">
                        <p class="text-sm font-bold text-emerald-800">
                            💡 <strong>Tips:</strong> Komputer juga suka mengelompokkan data! Misalnya foto di HP dikelompokkan berdasar tanggal 📅 atau lokasi 📍.
                        </p>
                    </div>
                </div>
            `,
            enrichment: {
                title: "Aktivitas Klasifikasi untuk Anak",
                url: "https://www.education.com/worksheets/sorting/"
            },
            questions: [
                {
                    id: "q_paud_l5_1",
                    question: '<div class="bg-emerald-100 p-4 rounded-xl border-2 border-emerald-200 shadow-sm text-emerald-900 font-extrabold text-lg"><span>🍎🍌🍊 Ini semua termasuk kelompok apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🍎</span> Buah-buahan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🐾</span> Hewan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🚗</span> Kendaraan</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l5_2",
                    question: '<div class="bg-emerald-100 p-4 rounded-xl border-2 border-emerald-200 shadow-sm text-emerald-900 font-extrabold text-lg"><span>🐱🐶🐰🐘 Ini semua termasuk kelompok apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🐾</span> Hewan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🍎</span> Buah</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🪑</span> Perabotan</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l5_3",
                    question: '<div class="bg-emerald-100 p-4 rounded-xl border-2 border-emerald-200 shadow-sm text-emerald-900 font-extrabold text-lg"><span>🔴🔵🔴🔵 Benda ini dikelompokkan berdasar apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎨</span> Warna</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">📏</span> Ukuran</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔢</span> Jumlah</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l5_4",
                    question: '<div class="bg-emerald-100 p-4 rounded-xl border-2 border-emerald-200 shadow-sm text-emerald-900 font-extrabold text-lg"><span>🍎🌹🍓 benda ini warnanya sama. Apa warnanya?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔴</span> Merah</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🔵</span> Biru</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🟢</span> Hijau</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l5_5",
                    question: '<div class="bg-emerald-100 p-4 rounded-xl border-2 border-emerald-200 shadow-sm text-emerald-900 font-extrabold text-lg"><span>🤔 Apa arti "Klasifikasi"?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">📦</span> Mengelompokkan benda yang mirip</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🏃</span> Berlari cepat</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎵</span> Bernyanyi</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l5_6",
                    question: '<div class="bg-emerald-100 p-4 rounded-xl border-2 border-emerald-200 shadow-sm text-emerald-900 font-extrabold text-lg"><span>🚗🚌🏍️ Ini kelompok apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🚗</span> Kendaraan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🍎</span> Makanan</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🐾</span> Hewan</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l5_7",
                    question: '<div class="bg-emerald-100 p-4 rounded-xl border-2 border-emerald-200 shadow-sm text-emerald-900 font-extrabold text-lg"><span>🐱🍎🐶🍌 Mana yang bukan kelompok hewan?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🍎</span> Apel dan 🍌 Pisang</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🐱</span> Kucing</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🐶</span> Anjing</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l5_8",
                    question: '<div class="bg-emerald-100 p-4 rounded-xl border-2 border-emerald-200 shadow-sm text-emerald-900 font-extrabold text-lg"><span>📏 Gajah 🐘 dan semut 🐜 beda apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">📏</span> Ukurannya (besar vs kecil)</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎨</span> Warnanya</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🍎</span> Rasanya</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l5_9",
                    question: '<div class="bg-emerald-100 p-4 rounded-xl border-2 border-emerald-200 shadow-sm text-emerald-900 font-extrabold text-lg"><span>🧩 Di keranjang biru 🔵 kita masukkan benda warna biru. Mana yang masuk?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">🫐</span> Blueberry</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🍎</span> Apel merah</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🍌</span> Pisang kuning</div>'
                    ],
                    correctIndex: 0
                },
                {
                    id: "q_paud_l5_10",
                    question: '<div class="bg-emerald-100 p-4 rounded-xl border-2 border-emerald-200 shadow-sm text-emerald-900 font-extrabold text-lg"><span>💻 Komputer juga mengelompokkan data. Contohnya apa?</span></div>',
                    options: [
                        '<div class="flex items-center gap-2"><span class="text-2xl">📅</span> Foto dikelompokkan berdasar tanggal</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🏃</span> Komputer berlari ke luar</div>',
                        '<div class="flex items-center gap-2"><span class="text-2xl">🎵</span> Komputer bernyanyi</div>'
                    ],
                    correctIndex: 0
                }
            ]
        },

        // ===================== MATERI 6 =====================
        {
            id: "paud_6",
            title: "Algoritma Membuat Susu",
            icon: "🥛",
            difficulty: "Mudah",
            duration: "12 menit",
            content: `
                <div class="bg-violet-50 rounded-3xl p-6 text-center border-2 border-violet-100 shadow-sm relative overflow-hidden">
                    <h3 class="text-2xl font-extrabold text-violet-700 mb-6 relative z-10">🥛 Algoritma Membuat Susu!</h3>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-violet-200 mb-6">
                        <h4 class="text-sm font-black text-violet-800 uppercase mb-3">📖 Apa itu Algoritma?</h4>
                        <p class="text-sm text-violet-900 leading-relaxed">
                            Algoritma adalah <strong>langkah-langkah teratur</strong> untuk menyelesaikan tugas. Seperti resep masak — harus berurutan agar hasilnya enak! 🧑‍🍳
                        </p>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-violet-200 mb-6">
                        <h4 class="text-sm font-black text-violet-800 uppercase mb-3">🥛 Langkah-langkah Membuat Susu</h4>
                        <div class="flex justify-center gap-2 flex-wrap">
                            <div class="bg-violet-100 p-3 rounded-xl text-center min-w-[75px]">
                                <span class="block text-3xl">1️⃣🥛</span>
                                <span class="block text-[9px] font-bold text-violet-800 mt-1">Ambil Gelas</span>
                            </div>
                            <div class="text-2xl self-center">➡️</div>
                            <div class="bg-violet-100 p-3 rounded-xl text-center min-w-[75px]">
                                <span class="block text-3xl">2️⃣🥄</span>
                                <span class="block text-[9px] font-bold text-violet-800 mt-1">Masukkan Susu</span>
                            </div>
                            <div class="text-2xl self-center">➡️</div>
                            <div class="bg-violet-100 p-3 rounded-xl text-center min-w-[75px]">
                                <span class="block text-3xl">3️⃣💧</span>
                                <span class="block text-[9px] font-bold text-violet-800 mt-1">Tuang Air</span>
                            </div>
                            <div class="text-2xl self-center">➡️</div>
                            <div class="bg-violet-100 p-3 rounded-xl text-center min-w-[75px]">
                                <span class="block text-3xl">4️⃣🥣</span>
                                <span class="block text-[9px] font-bold text-violet-800 mt-1">Aduk Rata</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-violet-200 mb-6">
                        <h4 class="text-sm font-black text-violet-800 uppercase mb-3">❌ Kalau Urutan Salah?</h4>
                        <p class="text-sm text-violet-900 leading-relaxed">
                            Bayangkan kalau kita <strong>tuang air dulu 💧</strong> baru <strong>ambil gelas 🥛</strong>... Airnya tumpah ke mana-mana! 😅<br>
                            Makanya urutan itu penting!
                        </p>
                    </div>

                    <div class="bg-violet-100 p-4 rounded-2xl border-2 border-violet-200">
                        <p class="text-sm font-bold text-violet-800">
                            💡 <strong>Ingat:</strong> Algoritma = langkah berurutan. Komputer mengikuti algoritma persis seperti yang kita tulis! 🤖
                        </p>
                    </div>
                </div>
            `,
            enrichment: {
                title: "Aktivitas Algoritma Sederhana untuk Anak",
                url: "https://code.org/curriculum/unplugged"
            },
            questions: [
                {
                    id: "q_paud_l6_1", question: '<div class="bg-violet-100 p-4 rounded-xl border-2 border-violet-200 shadow-sm text-violet-900 font-extrabold text-lg"><span>🤔 Apa itu Algoritma?</span></div>',
                    options: ['<div class="flex items-center gap-2"><span class="text-2xl">📋</span> Langkah-langkah berurutan</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎨</span> Gambar yang bagus</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎵</span> Lagu anak-anak</div>'], correctIndex: 0
                },
                {
                    id: "q_paud_l6_2", question: '<div class="bg-violet-100 p-4 rounded-xl border-2 border-violet-200 shadow-sm text-violet-900 font-extrabold text-lg"><span>🥛 Langkah pertama membuat susu?</span></div>',
                    options: ['<div class="flex items-center gap-2"><span class="text-2xl">🥛</span> Ambil gelas</div>','<div class="flex items-center gap-2"><span class="text-2xl">💧</span> Tuang air</div>','<div class="flex items-center gap-2"><span class="text-2xl">🥄</span> Masukkan susu</div>'], correctIndex: 0
                },
                {
                    id: "q_paud_l6_3", question: '<div class="bg-violet-100 p-4 rounded-xl border-2 border-violet-200 shadow-sm text-violet-900 font-extrabold text-lg"><span>🥣 Langkah terakhir membuat susu?</span></div>',
                    options: ['<div class="flex items-center gap-2"><span class="text-2xl">🥣</span> Aduk rata</div>','<div class="flex items-center gap-2"><span class="text-2xl">🥛</span> Ambil gelas</div>','<div class="flex items-center gap-2"><span class="text-2xl">💧</span> Tuang air</div>'], correctIndex: 0
                },
                {
                    id: "q_paud_l6_4", question: '<div class="bg-violet-100 p-4 rounded-xl border-2 border-violet-200 shadow-sm text-violet-900 font-extrabold text-lg"><span>😅 Apa yang terjadi kalau tuang air dulu sebelum ambil gelas?</span></div>',
                    options: ['<div class="flex items-center gap-2"><span class="text-2xl">💦</span> Airnya tumpah!</div>','<div class="flex items-center gap-2"><span class="text-2xl">😊</span> Tidak apa-apa</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎉</span> Jadi lebih enak</div>'], correctIndex: 0
                },
                {
                    id: "q_paud_l6_5", question: '<div class="bg-violet-100 p-4 rounded-xl border-2 border-violet-200 shadow-sm text-violet-900 font-extrabold text-lg"><span>🧑‍🍳 Algoritma itu mirip dengan apa?</span></div>',
                    options: ['<div class="flex items-center gap-2"><span class="text-2xl">📝</span> Resep masak</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎮</span> Video game</div>','<div class="flex items-center gap-2"><span class="text-2xl">📺</span> Acara TV</div>'], correctIndex: 0
                },
                {
                    id: "q_paud_l6_6", question: '<div class="bg-violet-100 p-4 rounded-xl border-2 border-violet-200 shadow-sm text-violet-900 font-extrabold text-lg"><span>🥛➡️🥄➡️💧➡️🥣 Ada berapa langkah membuat susu?</span></div>',
                    options: ['<div class="flex items-center gap-2"><span class="text-2xl">4️⃣</span> Empat langkah</div>','<div class="flex items-center gap-2"><span class="text-2xl">2️⃣</span> Dua langkah</div>','<div class="flex items-center gap-2"><span class="text-2xl">6️⃣</span> Enam langkah</div>'], correctIndex: 0
                },
                {
                    id: "q_paud_l6_7", question: '<div class="bg-violet-100 p-4 rounded-xl border-2 border-violet-200 shadow-sm text-violet-900 font-extrabold text-lg"><span>🤖 Apakah komputer perlu algoritma?</span></div>',
                    options: ['<div class="flex items-center gap-2"><span class="text-2xl">✅</span> Ya! Komputer mengikuti langkah yang kita tulis</div>','<div class="flex items-center gap-2"><span class="text-2xl">❌</span> Tidak perlu</div>','<div class="flex items-center gap-2"><span class="text-2xl">🤷</span> Kadang-kadang saja</div>'], correctIndex: 0
                },
                {
                    id: "q_paud_l6_8", question: '<div class="bg-violet-100 p-4 rounded-xl border-2 border-violet-200 shadow-sm text-violet-900 font-extrabold text-lg"><span>📋 Kenapa urutan itu penting?</span></div>',
                    options: ['<div class="flex items-center gap-2"><span class="text-2xl">🎯</span> Supaya hasilnya benar dan bagus</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎨</span> Supaya warnanya cantik</div>','<div class="flex items-center gap-2"><span class="text-2xl">🏃</span> Supaya lebih cepat saja</div>'], correctIndex: 0
                },
                {
                    id: "q_paud_l6_9", question: '<div class="bg-violet-100 p-4 rounded-xl border-2 border-violet-200 shadow-sm text-violet-900 font-extrabold text-lg"><span>🍞 Mau bikin roti selai. Langkah pertama apa?</span></div>',
                    options: ['<div class="flex items-center gap-2"><span class="text-2xl">🍞</span> Ambil roti</div>','<div class="flex items-center gap-2"><span class="text-2xl">🍓</span> Oleskan selai</div>','<div class="flex items-center gap-2"><span class="text-2xl">😋</span> Makan langsung</div>'], correctIndex: 0
                },
                {
                    id: "q_paud_l6_10", question: '<div class="bg-violet-100 p-4 rounded-xl border-2 border-violet-200 shadow-sm text-violet-900 font-extrabold text-lg"><span>🧩 Mana urutan yang BENAR untuk membuat susu?</span></div>',
                    options: ['<div class="flex items-center gap-2"><span class="text-2xl">✅</span> 🥛➡️🥄➡️💧➡️🥣</div>','<div class="flex items-center gap-2"><span class="text-2xl">❌</span> 💧➡️🥣➡️🥛➡️🥄</div>','<div class="flex items-center gap-2"><span class="text-2xl">❌</span> 🥣➡️🥛➡️💧➡️🥄</div>'], correctIndex: 0
                }
            ]
        },

        // ===================== MATERI 7 =====================
        {
            id: "paud_7",
            title: "Loop Sederhana dengan Gerakan",
            icon: "🔄",
            difficulty: "Sedang",
            duration: "15 menit",
            content: `
                <div class="bg-pink-50 rounded-3xl p-6 text-center border-2 border-pink-100 shadow-sm relative overflow-hidden">
                    <h3 class="text-2xl font-extrabold text-pink-700 mb-6 relative z-10">🔄 Loop — Ulangi Gerakan!</h3>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-pink-200 mb-6">
                        <h4 class="text-sm font-black text-pink-800 uppercase mb-3">📖 Apa itu Loop?</h4>
                        <p class="text-sm text-pink-900 leading-relaxed">
                            Loop artinya <strong>mengulangi</strong> sesuatu berkali-kali. Daripada bilang "Lompat! Lompat! Lompat!", kita bisa bilang: <strong>"Ulangi Lompat 3 kali!"</strong> 🦘
                        </p>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-pink-200 mb-6">
                        <h4 class="text-sm font-black text-pink-800 uppercase mb-3">🦘 Contoh Loop Gerakan</h4>
                        <div class="space-y-3">
                            <div class="bg-pink-100 p-3 rounded-xl flex items-center justify-center gap-2">
                                <span class="text-xl font-black text-pink-700">🔁 Ulangi 3 kali:</span>
                                <span class="text-3xl">🦘🦘🦘</span>
                            </div>
                            <div class="bg-pink-100 p-3 rounded-xl flex items-center justify-center gap-2">
                                <span class="text-xl font-black text-pink-700">🔁 Ulangi 2 kali:</span>
                                <span class="text-3xl">👏👏</span>
                            </div>
                            <div class="bg-pink-100 p-3 rounded-xl flex items-center justify-center gap-2">
                                <span class="text-xl font-black text-pink-700">🔁 Ulangi 4 kali:</span>
                                <span class="text-3xl">🙌🙌🙌🙌</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-pink-200 mb-6">
                        <h4 class="text-sm font-black text-pink-800 uppercase mb-3">🤔 Tanpa Loop vs Dengan Loop</h4>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="bg-red-50 p-3 rounded-xl border-2 border-red-200 text-center">
                                <p class="text-xs font-black text-red-700 mb-2">❌ Tanpa Loop (Capek!)</p>
                                <p class="text-xs text-red-800">Lompat!<br>Lompat!<br>Lompat!<br>Lompat!<br>Lompat!</p>
                            </div>
                            <div class="bg-green-50 p-3 rounded-xl border-2 border-green-200 text-center">
                                <p class="text-xs font-black text-green-700 mb-2">✅ Dengan Loop (Hemat!)</p>
                                <p class="text-xs text-green-800">🔁 Ulangi 5 kali:<br>Lompat!</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-pink-100 p-4 rounded-2xl border-2 border-pink-200">
                        <p class="text-sm font-bold text-pink-800">
                            💡 <strong>Tips:</strong> Loop membuat kita hemat waktu! Komputer sangat suka loop karena tidak perlu menulis perintah berkali-kali. 🤖
                        </p>
                    </div>
                </div>
            `,
            enrichment: { title: "Aktivitas Loop untuk Anak", url: "https://code.org/curriculum/unplugged" },
            questions: [
                { id: "q_paud_l7_1", question: '<div class="bg-pink-100 p-4 rounded-xl border-2 border-pink-200 shadow-sm text-pink-900 font-extrabold text-lg"><span>🤔 Apa arti "Loop"?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🔁</span> Mengulangi sesuatu berkali-kali</div>','<div class="flex items-center gap-2"><span class="text-2xl">🛑</span> Berhenti selamanya</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎨</span> Menggambar</div>'], correctIndex: 0 },
                { id: "q_paud_l7_2", question: '<div class="bg-pink-100 p-4 rounded-xl border-2 border-pink-200 shadow-sm text-pink-900 font-extrabold text-lg"><span>🦘 "Ulangi Lompat 3 kali!" Berapa kali kita lompat?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">3️⃣</span> Tiga kali 🦘🦘🦘</div>','<div class="flex items-center gap-2"><span class="text-2xl">1️⃣</span> Satu kali</div>','<div class="flex items-center gap-2"><span class="text-2xl">5️⃣</span> Lima kali</div>'], correctIndex: 0 },
                { id: "q_paud_l7_3", question: '<div class="bg-pink-100 p-4 rounded-xl border-2 border-pink-200 shadow-sm text-pink-900 font-extrabold text-lg"><span>👏 "Ulangi Tepuk 2 kali!" Hasilnya?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">👏👏</span></div>','<div class="flex items-center gap-2"><span class="text-2xl">👏</span></div>','<div class="flex items-center gap-2"><span class="text-2xl">👏👏👏👏</span></div>'], correctIndex: 0 },
                { id: "q_paud_l7_4", question: '<div class="bg-pink-100 p-4 rounded-xl border-2 border-pink-200 shadow-sm text-pink-900 font-extrabold text-lg"><span>🤔 Kenapa pakai Loop?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">⏱️</span> Supaya hemat waktu dan tidak capek</div>','<div class="flex items-center gap-2"><span class="text-2xl">😤</span> Supaya makin capek</div>','<div class="flex items-center gap-2"><span class="text-2xl">🤷</span> Tidak ada alasan</div>'], correctIndex: 0 },
                { id: "q_paud_l7_5", question: '<div class="bg-pink-100 p-4 rounded-xl border-2 border-pink-200 shadow-sm text-pink-900 font-extrabold text-lg"><span>🤖 Mana yang lebih hemat?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">✅</span> "Ulangi Maju 5 kali"</div>','<div class="flex items-center gap-2"><span class="text-2xl">❌</span> "Maju! Maju! Maju! Maju! Maju!"</div>','<div class="flex items-center gap-2"><span class="text-2xl">🤷</span> Sama saja</div>'], correctIndex: 0 },
                { id: "q_paud_l7_6", question: '<div class="bg-pink-100 p-4 rounded-xl border-2 border-pink-200 shadow-sm text-pink-900 font-extrabold text-lg"><span>🔄 "Ulangi Putar 4 kali!" Berapa kali kita putar?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">4️⃣</span> Empat kali</div>','<div class="flex items-center gap-2"><span class="text-2xl">2️⃣</span> Dua kali</div>','<div class="flex items-center gap-2"><span class="text-2xl">1️⃣</span> Satu kali</div>'], correctIndex: 0 },
                { id: "q_paud_l7_7", question: '<div class="bg-pink-100 p-4 rounded-xl border-2 border-pink-200 shadow-sm text-pink-900 font-extrabold text-lg"><span>🏃 Kalau perintahnya "Ulangi Lari 0 kali!", apa yang terjadi?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🛑</span> Tidak lari sama sekali</div>','<div class="flex items-center gap-2"><span class="text-2xl">🏃</span> Lari 1 kali</div>','<div class="flex items-center gap-2"><span class="text-2xl">🏃🏃</span> Lari 2 kali</div>'], correctIndex: 0 },
                { id: "q_paud_l7_8", question: '<div class="bg-pink-100 p-4 rounded-xl border-2 border-pink-200 shadow-sm text-pink-900 font-extrabold text-lg"><span>🎵 Loop itu seperti apa di kehidupan sehari-hari?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🎵</span> Lagu yang diulang-ulang</div>','<div class="flex items-center gap-2"><span class="text-2xl">📕</span> Buku yang sudah habis</div>','<div class="flex items-center gap-2"><span class="text-2xl">🚪</span> Pintu yang tertutup</div>'], correctIndex: 0 },
                { id: "q_paud_l7_9", question: '<div class="bg-pink-100 p-4 rounded-xl border-2 border-pink-200 shadow-sm text-pink-900 font-extrabold text-lg"><span>🙌 Perintah: "Ulangi (Angkat Tangan 🙌 lalu Turunkan ✋) 2 kali". Berapa gerakan total?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">4️⃣</span> Empat gerakan (🙌✋🙌✋)</div>','<div class="flex items-center gap-2"><span class="text-2xl">2️⃣</span> Dua gerakan</div>','<div class="flex items-center gap-2"><span class="text-2xl">1️⃣</span> Satu gerakan</div>'], correctIndex: 0 },
                { id: "q_paud_l7_10", question: '<div class="bg-pink-100 p-4 rounded-xl border-2 border-pink-200 shadow-sm text-pink-900 font-extrabold text-lg"><span>🤖 Apakah komputer bisa menggunakan Loop?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">✅</span> Ya! Loop sangat berguna untuk komputer</div>','<div class="flex items-center gap-2"><span class="text-2xl">❌</span> Tidak, komputer tidak bisa</div>','<div class="flex items-center gap-2"><span class="text-2xl">🤷</span> Hanya kadang-kadang</div>'], correctIndex: 0 }
            ]
        },

        // ===================== MATERI 8 =====================
        {
            id: "paud_8",
            title: "Debugging Gambar",
            icon: "🔍",
            difficulty: "Sedang",
            duration: "12 menit",
            content: `
                <div class="bg-orange-50 rounded-3xl p-6 text-center border-2 border-orange-100 shadow-sm relative overflow-hidden">
                    <h3 class="text-2xl font-extrabold text-orange-700 mb-6 relative z-10">🔍 Debugging — Cari Kesalahan!</h3>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-orange-200 mb-6">
                        <h4 class="text-sm font-black text-orange-800 uppercase mb-3">📖 Apa itu Debugging?</h4>
                        <p class="text-sm text-orange-900 leading-relaxed">
                            Debugging artinya <strong>mencari dan memperbaiki kesalahan</strong> (bug 🐛). Seperti detektif yang mencari petunjuk! 🔎
                        </p>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-orange-200 mb-6">
                        <h4 class="text-sm font-black text-orange-800 uppercase mb-3">🧩 Cari yang Tidak Sesuai!</h4>
                        <div class="space-y-3">
                            <div class="bg-orange-100 p-4 rounded-xl">
                                <p class="text-sm font-bold text-orange-800 mb-2">Contoh 1: Kelompok hewan</p>
                                <div class="text-3xl">🐶 🐱 🍎 🐰 🐘</div>
                                <p class="text-sm font-bold text-orange-700 mt-2">🐛 Bug: 🍎 Apel bukan hewan! Hapus apelnya!</p>
                            </div>
                            <div class="bg-orange-100 p-4 rounded-xl">
                                <p class="text-sm font-bold text-orange-800 mb-2">Contoh 2: Urutan angka</p>
                                <div class="text-3xl">1️⃣ 2️⃣ 3️⃣ 5️⃣ 4️⃣</div>
                                <p class="text-sm font-bold text-orange-700 mt-2">🐛 Bug: 5️⃣ dan 4️⃣ posisinya tertukar!</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-orange-100 p-4 rounded-2xl border-2 border-orange-200">
                        <p class="text-sm font-bold text-orange-800">
                            💡 <strong>Tips:</strong> Programmer sejati tidak takut salah! Mereka suka mencari bug dan memperbaikinya. Itu namanya Debugging! 🦸
                        </p>
                    </div>
                </div>
            `,
            enrichment: { title: "Aktivitas Debugging untuk Anak", url: "https://code.org/curriculum/unplugged" },
            questions: [
                { id: "q_paud_l8_1", question: '<div class="bg-orange-100 p-4 rounded-xl border-2 border-orange-200 shadow-sm text-orange-900 font-extrabold text-lg"><span>🐛 Apa itu "Bug"?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">❌</span> Kesalahan yang perlu diperbaiki</div>','<div class="flex items-center gap-2"><span class="text-2xl">🐞</span> Serangga sungguhan di komputer</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎁</span> Hadiah kejutan</div>'], correctIndex: 0 },
                { id: "q_paud_l8_2", question: '<div class="bg-orange-100 p-4 rounded-xl border-2 border-orange-200 shadow-sm text-orange-900 font-extrabold text-lg"><span>🔍 Apa itu "Debugging"?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🔧</span> Mencari dan memperbaiki kesalahan</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎨</span> Menggambar</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎵</span> Bernyanyi</div>'], correctIndex: 0 },
                { id: "q_paud_l8_3", question: '<div class="bg-orange-100 p-4 rounded-xl border-2 border-orange-200 shadow-sm text-orange-900 font-extrabold text-lg"><span>🐶🐱🍎🐰 Mana yang tidak cocok di kelompok hewan?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🍎</span> Apel</div>','<div class="flex items-center gap-2"><span class="text-2xl">🐶</span> Anjing</div>','<div class="flex items-center gap-2"><span class="text-2xl">🐱</span> Kucing</div>'], correctIndex: 0 },
                { id: "q_paud_l8_4", question: '<div class="bg-orange-100 p-4 rounded-xl border-2 border-orange-200 shadow-sm text-orange-900 font-extrabold text-lg"><span>1️⃣2️⃣3️⃣5️⃣4️⃣ Mana yang posisinya salah?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🔀</span> 5️⃣ dan 4️⃣ harus ditukar</div>','<div class="flex items-center gap-2"><span class="text-2xl">✅</span> Sudah benar semua</div>','<div class="flex items-center gap-2"><span class="text-2xl">❌</span> 1️⃣ harus dihapus</div>'], correctIndex: 0 },
                { id: "q_paud_l8_5", question: '<div class="bg-orange-100 p-4 rounded-xl border-2 border-orange-200 shadow-sm text-orange-900 font-extrabold text-lg"><span>🍎🍌🚗🍊 Mana yang bukan buah?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🚗</span> Mobil</div>','<div class="flex items-center gap-2"><span class="text-2xl">🍎</span> Apel</div>','<div class="flex items-center gap-2"><span class="text-2xl">🍌</span> Pisang</div>'], correctIndex: 0 },
                { id: "q_paud_l8_6", question: '<div class="bg-orange-100 p-4 rounded-xl border-2 border-orange-200 shadow-sm text-orange-900 font-extrabold text-lg"><span>🦸 Programmer yang baik itu bagaimana?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">💪</span> Tidak takut salah, suka mencari bug</div>','<div class="flex items-center gap-2"><span class="text-2xl">😢</span> Selalu menangis kalau salah</div>','<div class="flex items-center gap-2"><span class="text-2xl">😴</span> Tidur saja</div>'], correctIndex: 0 },
                { id: "q_paud_l8_7", question: '<div class="bg-orange-100 p-4 rounded-xl border-2 border-orange-200 shadow-sm text-orange-900 font-extrabold text-lg"><span>🔴🔵🔴🟢🔴🔵 Warna mana yang tidak sesuai pola?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🟢</span> Hijau (seharusnya 🔵 Biru)</div>','<div class="flex items-center gap-2"><span class="text-2xl">🔴</span> Merah</div>','<div class="flex items-center gap-2"><span class="text-2xl">🔵</span> Biru</div>'], correctIndex: 0 },
                { id: "q_paud_l8_8", question: '<div class="bg-orange-100 p-4 rounded-xl border-2 border-orange-200 shadow-sm text-orange-900 font-extrabold text-lg"><span>🛏️➡️🥣➡️🪥 Urutan pagi ini benar tidak?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">❌</span> Salah! Sikat gigi 🪥 seharusnya sebelum sarapan 🥣</div>','<div class="flex items-center gap-2"><span class="text-2xl">✅</span> Sudah benar</div>','<div class="flex items-center gap-2"><span class="text-2xl">🤷</span> Tidak tahu</div>'], correctIndex: 0 },
                { id: "q_paud_l8_9", question: '<div class="bg-orange-100 p-4 rounded-xl border-2 border-orange-200 shadow-sm text-orange-900 font-extrabold text-lg"><span>🐱🐶🐱🐶🐱🐶🐶 Ada yang aneh! Apa bugnya?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🐛</span> 🐶 di akhir kelebihan satu</div>','<div class="flex items-center gap-2"><span class="text-2xl">✅</span> Semuanya benar</div>','<div class="flex items-center gap-2"><span class="text-2xl">🐱</span> Kucing kelebihan</div>'], correctIndex: 0 },
                { id: "q_paud_l8_10", question: '<div class="bg-orange-100 p-4 rounded-xl border-2 border-orange-200 shadow-sm text-orange-900 font-extrabold text-lg"><span>🔎 Setelah menemukan bug, apa yang kita lakukan?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🔧</span> Memperbaikinya!</div>','<div class="flex items-center gap-2"><span class="text-2xl">🚫</span> Membiarkannya</div>','<div class="flex items-center gap-2"><span class="text-2xl">🏃</span> Lari pergi</div>'], correctIndex: 0 }
            ]
        },

        // ===================== MATERI 9 =====================
        {
            id: "paud_9",
            title: "Logika Spasial Menyusun Balok",
            icon: "🧱",
            difficulty: "Sedang",
            duration: "15 menit",
            content: `
                <div class="bg-teal-50 rounded-3xl p-6 text-center border-2 border-teal-100 shadow-sm relative overflow-hidden">
                    <h3 class="text-2xl font-extrabold text-teal-700 mb-6 relative z-10">🧱 Menyusun Balok!</h3>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-teal-200 mb-6">
                        <h4 class="text-sm font-black text-teal-800 uppercase mb-3">📖 Apa itu Logika Spasial?</h4>
                        <p class="text-sm text-teal-900 leading-relaxed">
                            Logika spasial artinya memahami <strong>posisi</strong> dan <strong>bentuk</strong> benda. Di mana letaknya? Di <strong>atas</strong>, <strong>bawah</strong>, <strong>kanan</strong>, atau <strong>kiri</strong>? 🧠
                        </p>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-teal-200 mb-6">
                        <h4 class="text-sm font-black text-teal-800 uppercase mb-3">🏗️ Contoh Menyusun Balok</h4>
                        <div class="space-y-3">
                            <div class="bg-teal-100 p-4 rounded-xl">
                                <p class="text-sm font-bold text-teal-800 mb-2">Instruksi: Taruh 🟥 di atas 🟦</p>
                                <div class="flex flex-col items-center gap-0">
                                    <div class="text-4xl">🟥</div>
                                    <div class="text-4xl">🟦</div>
                                </div>
                                <p class="text-xs font-bold text-teal-700 mt-2">✅ Benar! Merah di atas Biru.</p>
                            </div>
                            <div class="bg-teal-100 p-4 rounded-xl">
                                <p class="text-sm font-bold text-teal-800 mb-2">Instruksi: Taruh 🟨 di samping kanan 🟩</p>
                                <div class="flex justify-center gap-0">
                                    <div class="text-4xl">🟩</div>
                                    <div class="text-4xl">🟨</div>
                                </div>
                                <p class="text-xs font-bold text-teal-700 mt-2">✅ Benar! Kuning di kanan Hijau.</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-teal-100 p-4 rounded-2xl border-2 border-teal-200">
                        <p class="text-sm font-bold text-teal-800">
                            💡 <strong>Tips:</strong> Logika spasial melatih otak kita memahami ruang — penting untuk membangun rumah, mendesain game, dan bahkan mengemudikan robot! 🤖🏠
                        </p>
                    </div>
                </div>
            `,
            enrichment: { title: "Permainan Balok dan Puzzle Spasial", url: "https://www.education.com/games/spatial-awareness/" },
            questions: [
                { id: "q_paud_l9_1", question: '<div class="bg-teal-100 p-4 rounded-xl border-2 border-teal-200 shadow-sm text-teal-900 font-extrabold text-lg"><span>🧱 "Taruh 🟥 di atas 🟦" artinya?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">⬆️</span> Merah di posisi atas, Biru di bawah</div>','<div class="flex items-center gap-2"><span class="text-2xl">⬇️</span> Biru di atas, Merah di bawah</div>','<div class="flex items-center gap-2"><span class="text-2xl">➡️</span> Merah di samping Biru</div>'], correctIndex: 0 },
                { id: "q_paud_l9_2", question: '<div class="bg-teal-100 p-4 rounded-xl border-2 border-teal-200 shadow-sm text-teal-900 font-extrabold text-lg"><span>📦 Mana posisi "di bawah"?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">⬇️</span> Bagian bawah/lantai</div>','<div class="flex items-center gap-2"><span class="text-2xl">⬆️</span> Bagian atas/langit</div>','<div class="flex items-center gap-2"><span class="text-2xl">➡️</span> Bagian kanan</div>'], correctIndex: 0 },
                { id: "q_paud_l9_3", question: '<div class="bg-teal-100 p-4 rounded-xl border-2 border-teal-200 shadow-sm text-teal-900 font-extrabold text-lg"><span>🟩🟨 Kuning 🟨 ada di sebelah mana dari Hijau 🟩?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">➡️</span> Di sebelah kanan</div>','<div class="flex items-center gap-2"><span class="text-2xl">⬅️</span> Di sebelah kiri</div>','<div class="flex items-center gap-2"><span class="text-2xl">⬆️</span> Di atas</div>'], correctIndex: 0 },
                { id: "q_paud_l9_4", question: '<div class="bg-teal-100 p-4 rounded-xl border-2 border-teal-200 shadow-sm text-teal-900 font-extrabold text-lg"><span>🤔 Apa itu "Logika Spasial"?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🧠</span> Memahami posisi dan bentuk benda</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎵</span> Bernyanyi</div>','<div class="flex items-center gap-2"><span class="text-2xl">🏃</span> Berlari cepat</div>'], correctIndex: 0 },
                { id: "q_paud_l9_5", question: '<div class="bg-teal-100 p-4 rounded-xl border-2 border-teal-200 shadow-sm text-teal-900 font-extrabold text-lg"><span>🏗️ Instruksi: "Susun dari bawah ke atas: 🟦🟥🟨". Mana yang paling bawah?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🟦</span> Biru</div>','<div class="flex items-center gap-2"><span class="text-2xl">🟥</span> Merah</div>','<div class="flex items-center gap-2"><span class="text-2xl">🟨</span> Kuning</div>'], correctIndex: 0 },
                { id: "q_paud_l9_6", question: '<div class="bg-teal-100 p-4 rounded-xl border-2 border-teal-200 shadow-sm text-teal-900 font-extrabold text-lg"><span>🏗️ Susun 🟦🟥🟨 dari bawah ke atas. Mana yang paling atas?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🟨</span> Kuning</div>','<div class="flex items-center gap-2"><span class="text-2xl">🟦</span> Biru</div>','<div class="flex items-center gap-2"><span class="text-2xl">🟥</span> Merah</div>'], correctIndex: 0 },
                { id: "q_paud_l9_7", question: '<div class="bg-teal-100 p-4 rounded-xl border-2 border-teal-200 shadow-sm text-teal-900 font-extrabold text-lg"><span>⬅️➡️ "Di samping kiri" artinya di sebelah mana?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">⬅️</span> Sebelah kiri</div>','<div class="flex items-center gap-2"><span class="text-2xl">➡️</span> Sebelah kanan</div>','<div class="flex items-center gap-2"><span class="text-2xl">⬆️</span> Di atas</div>'], correctIndex: 0 },
                { id: "q_paud_l9_8", question: '<div class="bg-teal-100 p-4 rounded-xl border-2 border-teal-200 shadow-sm text-teal-900 font-extrabold text-lg"><span>🧱 Untuk apa logika spasial?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🏠</span> Membangun, mendesain, dan membuat game!</div>','<div class="flex items-center gap-2"><span class="text-2xl">😴</span> Tidur</div>','<div class="flex items-center gap-2"><span class="text-2xl">🍎</span> Makan apel</div>'], correctIndex: 0 },
                { id: "q_paud_l9_9", question: '<div class="bg-teal-100 p-4 rounded-xl border-2 border-teal-200 shadow-sm text-teal-900 font-extrabold text-lg"><span>🟥 di atas 🟦 di atas 🟩. Balok mana yang di tengah?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🟦</span> Biru</div>','<div class="flex items-center gap-2"><span class="text-2xl">🟥</span> Merah</div>','<div class="flex items-center gap-2"><span class="text-2xl">🟩</span> Hijau</div>'], correctIndex: 0 },
                { id: "q_paud_l9_10", question: '<div class="bg-teal-100 p-4 rounded-xl border-2 border-teal-200 shadow-sm text-teal-900 font-extrabold text-lg"><span>🤖 Robot diminta: "Taruh kotak di depan pintu 🚪". Robot harus mengerti apa?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">📍</span> Posisi (di mana letaknya)</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎨</span> Warna kotak</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎵</span> Suara yang keluar</div>'], correctIndex: 0 }
            ]
        },

        // ===================== MATERI 10 =====================
        {
            id: "paud_10",
            title: "Kerja Sama Tim Instruksi",
            icon: "🤝",
            difficulty: "Mudah",
            duration: "10 menit",
            content: `
                <div class="bg-sky-50 rounded-3xl p-6 text-center border-2 border-sky-100 shadow-sm relative overflow-hidden">
                    <h3 class="text-2xl font-extrabold text-sky-700 mb-6 relative z-10">🤝 Kerja Sama Tim!</h3>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-sky-200 mb-6">
                        <h4 class="text-sm font-black text-sky-800 uppercase mb-3">📖 Bermain Programmer & Robot</h4>
                        <p class="text-sm text-sky-900 leading-relaxed">
                            Kita bermain berdua! Satu anak jadi <strong>Programmer</strong> 👨‍💻 (pemberi instruksi), satu anak lagi jadi <strong>Robot</strong> 🤖 (pelaksana). Robot hanya boleh bergerak kalau disuruh Programmer!
                        </p>
                    </div>

                    <div class="grid grid-cols-2 gap-3 mb-6">
                        <div class="bg-indigo-50 p-4 rounded-2xl border-2 border-indigo-200 text-center">
                            <span class="text-4xl block mb-2">👨‍💻</span>
                            <p class="text-xs font-black text-indigo-700 uppercase">Programmer</p>
                            <p class="text-[10px] text-indigo-600 mt-1">Memberi perintah:<br>"Maju 2 langkah!"</p>
                        </div>
                        <div class="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 text-center">
                            <span class="text-4xl block mb-2">🤖</span>
                            <p class="text-xs font-black text-emerald-700 uppercase">Robot</p>
                            <p class="text-[10px] text-emerald-600 mt-1">Mendengarkan dan melakukan:<br>👣 👣</p>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-md border-b-4 border-sky-200 mb-6">
                        <h4 class="text-sm font-black text-sky-800 uppercase mb-3">📝 Aturan Permainan</h4>
                        <div class="text-left text-sm text-sky-900 space-y-2">
                            <p>1️⃣ Robot 🤖 <strong>tidak boleh bergerak sendiri</strong> tanpa perintah</p>
                            <p>2️⃣ Programmer 👨‍💻 harus memberi perintah yang <strong>jelas</strong></p>
                            <p>3️⃣ Kalau perintahnya salah, robot akan bergerak <strong>salah</strong> juga!</p>
                            <p>4️⃣ Setelah selesai, <strong>bergantian peran</strong>! 🔄</p>
                        </div>
                    </div>

                    <div class="bg-sky-100 p-4 rounded-2xl border-2 border-sky-200">
                        <p class="text-sm font-bold text-sky-800">
                            💡 <strong>Tips:</strong> Ini mirip dengan cara programmer sungguhan memberi instruksi ke komputer. Komputer itu seperti robot yang sangat patuh — ia hanya menjalankan perintah persis seperti yang ditulis! 🤖✨
                        </p>
                    </div>
                </div>
            `,
            enrichment: { title: "Aktivitas Kolaborasi Coding Anak", url: "https://code.org/curriculum/unplugged" },
            questions: [
                { id: "q_paud_l10_1", question: '<div class="bg-sky-100 p-4 rounded-xl border-2 border-sky-200 shadow-sm text-sky-900 font-extrabold text-lg"><span>👨‍💻 Siapa yang memberi perintah?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">👨‍💻</span> Programmer</div>','<div class="flex items-center gap-2"><span class="text-2xl">🤖</span> Robot</div>','<div class="flex items-center gap-2"><span class="text-2xl">🐱</span> Kucing</div>'], correctIndex: 0 },
                { id: "q_paud_l10_2", question: '<div class="bg-sky-100 p-4 rounded-xl border-2 border-sky-200 shadow-sm text-sky-900 font-extrabold text-lg"><span>🤖 Siapa yang melaksanakan perintah?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🤖</span> Robot</div>','<div class="flex items-center gap-2"><span class="text-2xl">👨‍💻</span> Programmer</div>','<div class="flex items-center gap-2"><span class="text-2xl">🌳</span> Pohon</div>'], correctIndex: 0 },
                { id: "q_paud_l10_3", question: '<div class="bg-sky-100 p-4 rounded-xl border-2 border-sky-200 shadow-sm text-sky-900 font-extrabold text-lg"><span>🤖 Bolehkah robot bergerak sendiri tanpa perintah?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">❌</span> Tidak boleh!</div>','<div class="flex items-center gap-2"><span class="text-2xl">✅</span> Boleh saja</div>','<div class="flex items-center gap-2"><span class="text-2xl">🤷</span> Kadang-kadang</div>'], correctIndex: 0 },
                { id: "q_paud_l10_4", question: '<div class="bg-sky-100 p-4 rounded-xl border-2 border-sky-200 shadow-sm text-sky-900 font-extrabold text-lg"><span>📢 Programmer bilang: "Maju 2 langkah!" Robot jalan berapa?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">2️⃣</span> Dua langkah 👣👣</div>','<div class="flex items-center gap-2"><span class="text-2xl">5️⃣</span> Lima langkah</div>','<div class="flex items-center gap-2"><span class="text-2xl">0️⃣</span> Tidak jalan</div>'], correctIndex: 0 },
                { id: "q_paud_l10_5", question: '<div class="bg-sky-100 p-4 rounded-xl border-2 border-sky-200 shadow-sm text-sky-900 font-extrabold text-lg"><span>❌ Kalau perintah programmer salah, robot akan...</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">😅</span> Bergerak salah juga!</div>','<div class="flex items-center gap-2"><span class="text-2xl">✅</span> Tetap benar</div>','<div class="flex items-center gap-2"><span class="text-2xl">🛑</span> Berhenti selamanya</div>'], correctIndex: 0 },
                { id: "q_paud_l10_6", question: '<div class="bg-sky-100 p-4 rounded-xl border-2 border-sky-200 shadow-sm text-sky-900 font-extrabold text-lg"><span>📝 Perintah harus seperti apa?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">✅</span> Jelas dan mudah dimengerti</div>','<div class="flex items-center gap-2"><span class="text-2xl">🤫</span> Berbisik tidak jelas</div>','<div class="flex items-center gap-2"><span class="text-2xl">🤪</span> Campur-campur tidak karuan</div>'], correctIndex: 0 },
                { id: "q_paud_l10_7", question: '<div class="bg-sky-100 p-4 rounded-xl border-2 border-sky-200 shadow-sm text-sky-900 font-extrabold text-lg"><span>🔄 Setelah selesai bermain, apa yang dilakukan?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🔄</span> Bergantian peran!</div>','<div class="flex items-center gap-2"><span class="text-2xl">🏃</span> Pulang</div>','<div class="flex items-center gap-2"><span class="text-2xl">😴</span> Tidur</div>'], correctIndex: 0 },
                { id: "q_paud_l10_8", question: '<div class="bg-sky-100 p-4 rounded-xl border-2 border-sky-200 shadow-sm text-sky-900 font-extrabold text-lg"><span>💻 Komputer itu mirip siapa dalam permainan ini?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🤖</span> Robot (pelaksana perintah)</div>','<div class="flex items-center gap-2"><span class="text-2xl">👨‍💻</span> Programmer</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎨</span> Pelukis</div>'], correctIndex: 0 },
                { id: "q_paud_l10_9", question: '<div class="bg-sky-100 p-4 rounded-xl border-2 border-sky-200 shadow-sm text-sky-900 font-extrabold text-lg"><span>🤝 Kenapa kerja sama itu penting?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">💪</span> Supaya tugas selesai lebih baik bersama-sama</div>','<div class="flex items-center gap-2"><span class="text-2xl">😴</span> Supaya bisa tidur</div>','<div class="flex items-center gap-2"><span class="text-2xl">🏃</span> Supaya bisa lari</div>'], correctIndex: 0 },
                { id: "q_paud_l10_10", question: '<div class="bg-sky-100 p-4 rounded-xl border-2 border-sky-200 shadow-sm text-sky-900 font-extrabold text-lg"><span>🤖 Apa yang terjadi kalau programmer bilang "Maju" tapi robot belok?</span></div>', options: ['<div class="flex items-center gap-2"><span class="text-2xl">🐛</span> Ada bug! Robot tidak mengikuti perintah dengan benar</div>','<div class="flex items-center gap-2"><span class="text-2xl">✅</span> Tidak apa-apa</div>','<div class="flex items-center gap-2"><span class="text-2xl">🎉</span> Robot dapat hadiah</div>'], correctIndex: 0 }
            ]
        }
    ]
};
