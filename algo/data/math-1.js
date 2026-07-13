window.math1 = {
    id: "math-1",
    title: "Mengenal Angka 0-5",
    badge: "PAUD",
    icon: "1️⃣",
    description: "Belajar mengenal angka 0 sampai 5 dengan menghitung benda-benda seru.",
    lessons: [
        {
            id: "mth1_1",
            title: "Angka 0, 1, dan 2",
            icon: "✌️",
            difficulty: "Mudah",
            duration: "10 menit",
            content: `
                <div class="flex flex-col items-center gap-6">
                    <div class="bg-slate-100 p-8 rounded-3xl border-4 border-slate-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-slate-600 block mb-4">0</span>
                        <span class="text-6xl block">🫙</span>
                        <p class="text-xl font-bold text-slate-800 mt-4 uppercase">Nol / Kosong</p>
                        <p class="text-slate-500 mt-2">Tidak ada isinya sama sekali.</p>
                    </div>
                    <div class="bg-blue-100 p-8 rounded-3xl border-4 border-blue-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-blue-600 block mb-4">1</span>
                        <span class="text-6xl block">🍎</span>
                        <p class="text-xl font-bold text-blue-800 mt-4 uppercase">Satu Apel</p>
                        <p class="text-blue-500 mt-2">Satu jari telunjuk ☝️</p>
                    </div>
                    <div class="bg-green-100 p-8 rounded-3xl border-4 border-green-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-green-600 block mb-4">2</span>
                        <span class="text-6xl block">🍎🍎</span>
                        <p class="text-xl font-bold text-green-800 mt-4 uppercase">Dua Apel</p>
                        <p class="text-green-500 mt-2">Dua jari (peace) ✌️</p>
                    </div>
                </div>
            `,
            questions: [
                { id: "q1", question: "Gambar 🍎 ada berapa?", options: ["1 (Satu)", "2 (Dua)", "0 (Nol)"], correctIndex: 0 },
                { id: "q2", question: "Gambar 🍎🍎 ada berapa?", options: ["2 (Dua)", "1 (Satu)", "3 (Tiga)"], correctIndex: 0 },
                { id: "q3", question: "Kalau kotaknya kosong, artinya angkanya...", options: ["0 (Nol)", "1 (Satu)", "2 (Dua)"], correctIndex: 0 },
                { id: "q4", question: "Angka berapakah ini? 1", options: ["Satu", "Dua", "Nol"], correctIndex: 0 },
                { id: "q5", question: "Angka berapakah ini? 2", options: ["Dua", "Satu", "Nol"], correctIndex: 0 },
                { id: "q6", question: "Jari ✌️ menunjukkan angka berapa?", options: ["2", "1", "0"], correctIndex: 0 },
                { id: "q7", question: "Jari ☝️ menunjukkan angka berapa?", options: ["1", "2", "0"], correctIndex: 0 },
                { id: "q8", question: "Angka yang bentuknya bulat seperti telur adalah...", options: ["0", "1", "2"], correctIndex: 0 },
                { id: "q9", question: "Angka yang bentuknya seperti bebek berenang adalah...", options: ["2", "1", "0"], correctIndex: 0 },
                { id: "q10", question: "Angka yang bentuknya seperti tiang lurus adalah...", options: ["1", "2", "0"], correctIndex: 0 },
                { id: "q11", question: "Setelah angka 1 adalah angka...", options: ["2", "0", "3"], correctIndex: 0 },
                { id: "q12", question: "Sebelum angka 1 adalah angka...", options: ["0", "2", "3"], correctIndex: 0 },
                { id: "q13", question: "Mana yang jumlahnya 2?", options: ["🚗🚗", "🚗", "kosong"], correctIndex: 0 },
                { id: "q14", question: "Mana yang jumlahnya 1?", options: ["🐶", "🐶🐶", "kosong"], correctIndex: 0 },
                { id: "q15", question: "Mana yang jumlahnya 0?", options: ["Tidak ada gambar", "Satu gambar", "Dua gambar"], correctIndex: 0 }
            ]
        },
        {
            id: "mth1_2",
            title: "Angka 3, 4, dan 5",
            icon: "🖐️",
            difficulty: "Mudah",
            duration: "10 menit",
            content: `
                <div class="flex flex-col items-center gap-6">
                    <div class="bg-yellow-100 p-8 rounded-3xl border-4 border-yellow-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-yellow-600 block mb-4">3</span>
                        <span class="text-6xl block">⭐ ⭐ ⭐</span>
                        <p class="text-xl font-bold text-yellow-800 mt-4 uppercase">Tiga Bintang</p>
                        <p class="text-yellow-500 mt-2">Tiga jari 🤟</p>
                    </div>
                    <div class="bg-orange-100 p-8 rounded-3xl border-4 border-orange-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-orange-600 block mb-4">4</span>
                        <span class="text-6xl block">🎈 🎈 🎈 🎈</span>
                        <p class="text-xl font-bold text-orange-800 mt-4 uppercase">Empat Balon</p>
                        <p class="text-orange-500 mt-2">Empat jari 🖖</p>
                    </div>
                    <div class="bg-pink-100 p-8 rounded-3xl border-4 border-pink-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-pink-600 block mb-4">5</span>
                        <span class="text-6xl block">🍰 🍰 🍰 🍰 🍰</span>
                        <p class="text-xl font-bold text-pink-800 mt-4 uppercase">Lima Kue</p>
                        <p class="text-pink-500 mt-2">Lima jari (Satu tangan penuh) 🖐️</p>
                    </div>
                </div>
            `,
            questions: [
                { id: "q1", question: "Berapa banyak bintang ini? ⭐ ⭐ ⭐", options: ["3", "4", "5"], correctIndex: 0 },
                { id: "q2", question: "Berapa banyak balon ini? 🎈 🎈 🎈 🎈", options: ["4", "3", "5"], correctIndex: 0 },
                { id: "q3", question: "Berapa banyak kue ini? 🍰 🍰 🍰 🍰 🍰", options: ["5", "4", "3"], correctIndex: 0 },
                { id: "q4", question: "Angka berapakah ini? 3", options: ["Tiga", "Empat", "Lima"], correctIndex: 0 },
                { id: "q5", question: "Angka berapakah ini? 4", options: ["Empat", "Tiga", "Lima"], correctIndex: 0 },
                { id: "q6", question: "Angka berapakah ini? 5", options: ["Lima", "Empat", "Tiga"], correctIndex: 0 },
                { id: "q7", question: "Satu tangan penuh 🖐️ berarti jumlahnya...", options: ["5", "4", "3"], correctIndex: 0 },
                { id: "q8", question: "Angka yang seperti kursi terbalik adalah...", options: ["4", "3", "5"], correctIndex: 0 },
                { id: "q9", question: "Angka yang seperti burung terbang adalah...", options: ["3", "4", "5"], correctIndex: 0 },
                { id: "q10", question: "Setelah angka 2 adalah angka...", options: ["3", "4", "5"], correctIndex: 0 },
                { id: "q11", question: "Setelah angka 3 adalah angka...", options: ["4", "5", "2"], correctIndex: 0 },
                { id: "q12", question: "Setelah angka 4 adalah angka...", options: ["5", "3", "6"], correctIndex: 0 },
                { id: "q13", question: "Mana yang jumlahnya 3?", options: ["🐱 🐱 🐱", "🐱 🐱", "🐱 🐱 🐱 🐱"], correctIndex: 0 },
                { id: "q14", question: "Mana yang jumlahnya 4?", options: ["🐶 🐶 🐶 🐶", "🐶 🐶 🐶", "🐶 🐶 🐶 🐶 🐶"], correctIndex: 0 },
                { id: "q15", question: "Mana yang jumlahnya 5?", options: ["🍎 🍎 🍎 🍎 🍎", "🍎 🍎 🍎 🍎", "🍎 🍎 🍎"], correctIndex: 0 }
            ]
        },
        {
            id: "mth1_3",
            title: "Hitung Bersama 0-5",
            icon: "🎲",
            difficulty: "Sedang",
            duration: "10 menit",
            content: `
                <div class="text-center">
                    <span class="text-9xl mb-8 block">🤔</span>
                    <h2 class="text-3xl font-extrabold text-blue-600 mb-4">Ayo Berhitung!</h2>
                    <p class="text-xl text-slate-600">Kita sudah kenal angka 0 sampai 5. Mari kita coba hitung bersama-sama!</p>
                </div>
            `,
            questions: [
                { id: "q1", question: "Urutan angka yang benar adalah...", options: ["0, 1, 2, 3, 4, 5", "1, 2, 0, 3, 4, 5", "5, 4, 3, 2, 1, 0"], correctIndex: 0 },
                { id: "q2", question: "Setelah 4 adalah...", options: ["5", "3", "2"], correctIndex: 0 },
                { id: "q3", question: "Sebelum 2 adalah...", options: ["1", "3", "4"], correctIndex: 0 },
                { id: "q4", question: "Berapa banyak 🍕 ini?", options: ["1", "2", "3"], correctIndex: 0 },
                { id: "q5", question: "Berapa banyak 🍩 🍩 ini?", options: ["2", "1", "3"], correctIndex: 0 },
                { id: "q6", question: "Berapa banyak 🍦 🍦 🍦 ini?", options: ["3", "4", "2"], correctIndex: 0 },
                { id: "q7", question: "Berapa banyak 🍔 🍔 🍔 🍔 ini?", options: ["4", "5", "3"], correctIndex: 0 },
                { id: "q8", question: "Berapa banyak 🍓 🍓 🍓 🍓 🍓 ini?", options: ["5", "4", "6"], correctIndex: 0 },
                { id: "q9", question: "Jika aku punya 3 permen, manakah angkanya?", options: ["3", "2", "4"], correctIndex: 0 },
                { id: "q10", question: "Jika aku tidak punya apa-apa, angkanya adalah...", options: ["0", "1", "2"], correctIndex: 0 },
                { id: "q11", question: "Mana yang lebih banyak: 1 Apel atau 2 Apel?", options: ["2 Apel", "1 Apel", "Sama saja"], correctIndex: 0 },
                { id: "q12", question: "Mana yang lebih banyak: 5 Jeruk atau 3 Jeruk?", options: ["5 Jeruk", "3 Jeruk", "Sama saja"], correctIndex: 0 },
                { id: "q13", question: "1, 2, 3, ..., 5. Angka yang hilang adalah?", options: ["4", "2", "6"], correctIndex: 0 },
                { id: "q14", question: "0, ..., 2, 3. Angka yang hilang adalah?", options: ["1", "4", "5"], correctIndex: 0 },
                { id: "q15", question: "Jari di satu tangan ada...", options: ["5", "4", "3"], correctIndex: 0 }
            ]
        }
    ]
};
