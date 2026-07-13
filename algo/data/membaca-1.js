window.membaca1 = {
    id: "membaca-1",
    title: "Mengenal Huruf A-Z",
    badge: "PAUD",
    icon: "🔤",
    description: "Belajar mengenal huruf besar A sampai Z dengan gambar yang lucu.",
    lessons: [
        {
            id: "mb1_1",
            title: "Huruf A - E",
            icon: "🅰️",
            difficulty: "Mudah",
            duration: "10 menit",
            content: `
                <div class="flex flex-col items-center gap-6">
                    <div class="bg-pink-100 p-8 rounded-3xl border-4 border-pink-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-pink-600 block mb-4">A</span>
                        <span class="text-6xl block">🍎</span>
                        <p class="text-2xl font-bold text-pink-800 mt-4 uppercase">Apel</p>
                    </div>
                    <div class="bg-orange-100 p-8 rounded-3xl border-4 border-orange-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-orange-600 block mb-4">B</span>
                        <span class="text-6xl block">🦆</span>
                        <p class="text-2xl font-bold text-orange-800 mt-4 uppercase">Bebek</p>
                    </div>
                    <div class="bg-yellow-100 p-8 rounded-3xl border-4 border-yellow-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-yellow-600 block mb-4">C</span>
                        <span class="text-6xl block">🍒</span>
                        <p class="text-2xl font-bold text-yellow-800 mt-4 uppercase">Ceri</p>
                    </div>
                    <div class="bg-green-100 p-8 rounded-3xl border-4 border-green-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-green-600 block mb-4">D</span>
                        <span class="text-6xl block">🍩</span>
                        <p class="text-2xl font-bold text-green-800 mt-4 uppercase">Donat</p>
                    </div>
                    <div class="bg-blue-100 p-8 rounded-3xl border-4 border-blue-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-blue-600 block mb-4">E</span>
                        <span class="text-6xl block">🦅</span>
                        <p class="text-2xl font-bold text-blue-800 mt-4 uppercase">Elang</p>
                    </div>
                </div>
            `,
            questions: [
                { id: "q1", question: "Huruf apakah ini? 🍎", options: ["A", "B", "C"], correctIndex: 0 },
                { id: "q2", question: "Huruf apakah ini? 🦆", options: ["D", "B", "E"], correctIndex: 1 },
                { id: "q3", question: "Gambar yang dimulai dari huruf C adalah...", options: ["🍎 Apel", "🦆 Bebek", "🍒 Ceri"], correctIndex: 2 },
                { id: "q4", question: "🍩 Donat dimulai dari huruf...", options: ["C", "D", "E"], correctIndex: 1 },
                { id: "q5", question: "🦅 Elang dimulai dari huruf...", options: ["E", "A", "B"], correctIndex: 0 },
                { id: "q6", question: "Setelah huruf A adalah huruf...", options: ["C", "B", "D"], correctIndex: 1 },
                { id: "q7", question: "Sebelum huruf E adalah huruf...", options: ["D", "C", "B"], correctIndex: 0 },
                { id: "q8", question: "Huruf manakah yang berbentuk seperti segitiga? ⛺", options: ["A", "C", "D"], correctIndex: 0 },
                { id: "q9", question: "Huruf manakah yang seperti bulan sabit? 🌙", options: ["B", "C", "E"], correctIndex: 1 },
                { id: "q10", question: "Bebek (🦆) diawali huruf...", options: ["B", "C", "A"], correctIndex: 0 },
                { id: "q11", question: "Apel (🍎) diawali huruf...", options: ["A", "D", "E"], correctIndex: 0 },
                { id: "q12", question: "Manakah yang huruf E?", options: ["A", "C", "E"], correctIndex: 2 },
                { id: "q13", question: "Berapa banyak kaki pada huruf E kapital?", options: ["1", "2", "3"], correctIndex: 2 },
                { id: "q14", question: "Manakah yang huruf B?", options: ["B", "D", "A"], correctIndex: 0 },
                { id: "q15", question: "Ceri (🍒) diawali huruf...", options: ["A", "B", "C"], correctIndex: 2 }
            ]
        },
        {
            id: "mb1_2",
            title: "Huruf F - J",
            icon: "🅵",
            difficulty: "Mudah",
            duration: "10 menit",
            content: `
                <div class="flex flex-col items-center gap-6">
                    <div class="bg-indigo-100 p-8 rounded-3xl border-4 border-indigo-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-indigo-600 block mb-4">F</span>
                        <span class="text-6xl block">📸</span>
                        <p class="text-2xl font-bold text-indigo-800 mt-4 uppercase">Foto</p>
                    </div>
                    <div class="bg-purple-100 p-8 rounded-3xl border-4 border-purple-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-purple-600 block mb-4">G</span>
                        <span class="text-6xl block">🐘</span>
                        <p class="text-2xl font-bold text-purple-800 mt-4 uppercase">Gajah</p>
                    </div>
                    <div class="bg-pink-100 p-8 rounded-3xl border-4 border-pink-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-pink-600 block mb-4">H</span>
                        <span class="text-6xl block">🚁</span>
                        <p class="text-2xl font-bold text-pink-800 mt-4 uppercase">Helikopter</p>
                    </div>
                    <div class="bg-red-100 p-8 rounded-3xl border-4 border-red-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-red-600 block mb-4">I</span>
                        <span class="text-6xl block">🐟</span>
                        <p class="text-2xl font-bold text-red-800 mt-4 uppercase">Ikan</p>
                    </div>
                    <div class="bg-orange-100 p-8 rounded-3xl border-4 border-orange-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-orange-600 block mb-4">J</span>
                        <span class="text-6xl block">🦒</span>
                        <p class="text-2xl font-bold text-orange-800 mt-4 uppercase">Jerapah</p>
                    </div>
                </div>
            `,
            questions: [
                { id: "q1", question: "Gambar 📸 (Foto) dimulai dari huruf...", options: ["F", "G", "H"], correctIndex: 0 },
                { id: "q2", question: "Huruf apakah ini? 🐘", options: ["I", "G", "J"], correctIndex: 1 },
                { id: "q3", question: "Helikopter 🚁 dimulai huruf...", options: ["H", "F", "I"], correctIndex: 0 },
                { id: "q4", question: "Ikan 🐟 dimulai huruf...", options: ["I", "J", "G"], correctIndex: 0 },
                { id: "q5", question: "Jerapah 🦒 dimulai huruf...", options: ["J", "H", "F"], correctIndex: 0 },
                { id: "q6", question: "Setelah huruf F adalah huruf...", options: ["G", "H", "I"], correctIndex: 0 },
                { id: "q7", question: "Huruf H ada di antara huruf G dan...", options: ["I", "J", "F"], correctIndex: 0 },
                { id: "q8", question: "Mana huruf yang seperti tiang lurus? 📏", options: ["I", "H", "G"], correctIndex: 0 },
                { id: "q9", question: "Mana huruf yang seperti kail pancing? 🪝", options: ["J", "I", "F"], correctIndex: 0 },
                { id: "q10", question: "Mana huruf yang punya dua garis mendatar seperti tangga? 🪜", options: ["H", "F", "I"], correctIndex: 0 },
                { id: "q11", question: "Gajah (🐘) diawali huruf...", options: ["F", "G", "H"], correctIndex: 1 },
                { id: "q12", question: "Foto (📸) diawali huruf...", options: ["F", "G", "H"], correctIndex: 0 },
                { id: "q13", question: "Ikan (🐟) diawali huruf...", options: ["I", "J", "H"], correctIndex: 0 },
                { id: "q14", question: "Helikopter (🚁) diawali huruf...", options: ["H", "G", "F"], correctIndex: 0 },
                { id: "q15", question: "Jerapah (🦒) diawali huruf...", options: ["I", "J", "G"], correctIndex: 1 }
            ]
        },
        {
            id: "mb1_3",
            title: "Tebak Huruf Campuran A-J",
            icon: "🎲",
            difficulty: "Sedang",
            duration: "10 menit",
            content: `
                <div class="text-center">
                    <span class="text-9xl mb-8 block">🤔</span>
                    <h2 class="text-3xl font-extrabold text-pink-600 mb-4">Mari Kita Ingat Kembali!</h2>
                    <p class="text-xl text-slate-600">Kita sudah belajar huruf A sampai J. Sekarang waktunya menebak campuran huruf-huruf tersebut!</p>
                </div>
            `,
            questions: [
                { id: "q1", question: "Huruf apakah yang paling pertama?", options: ["A", "B", "C"], correctIndex: 0 },
                { id: "q2", question: "Apel dimulai dengan huruf...", options: ["A", "E", "I"], correctIndex: 0 },
                { id: "q3", question: "Gajah dimulai dengan huruf...", options: ["G", "H", "J"], correctIndex: 0 },
                { id: "q4", question: "Donat dimulai dengan huruf...", options: ["B", "D", "F"], correctIndex: 1 },
                { id: "q5", question: "Ikan dimulai dengan huruf...", options: ["I", "J", "A"], correctIndex: 0 },
                { id: "q6", question: "Apa huruf setelah C?", options: ["D", "E", "F"], correctIndex: 0 },
                { id: "q7", question: "Apa huruf sebelum J?", options: ["H", "I", "G"], correctIndex: 1 },
                { id: "q8", question: "Ceri dimulai dengan huruf...", options: ["C", "D", "E"], correctIndex: 0 },
                { id: "q9", question: "Elang dimulai dengan huruf...", options: ["A", "E", "I"], correctIndex: 1 },
                { id: "q10", question: "Bebek dimulai dengan huruf...", options: ["B", "D", "G"], correctIndex: 0 },
                { id: "q11", question: "Helikopter dimulai dengan...", options: ["H", "F", "E"], correctIndex: 0 },
                { id: "q12", question: "Jerapah dimulai dengan...", options: ["J", "G", "H"], correctIndex: 0 },
                { id: "q13", question: "Foto dimulai dengan...", options: ["F", "I", "J"], correctIndex: 0 },
                { id: "q14", question: "Setelah B adalah...", options: ["C", "D", "A"], correctIndex: 0 },
                { id: "q15", question: "Sebelum E adalah...", options: ["D", "C", "F"], correctIndex: 0 }
            ]
        }
    ]
};
