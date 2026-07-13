window.english1 = {
    id: "english-1",
    title: "English Alphabet A-M",
    badge: "PAUD",
    icon: "🔤",
    description: "Learn the English Alphabet from A to M with fun pictures!",
    lessons: [
        {
            id: "eng1_1",
            title: "Letters A to E",
            icon: "🅰️",
            difficulty: "Mudah",
            duration: "10 menit",
            content: `
                <div class="flex flex-col items-center gap-6">
                    <div class="bg-emerald-100 p-8 rounded-3xl border-4 border-emerald-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-emerald-600 block mb-4">A</span>
                        <span class="text-6xl block">🍎</span>
                        <p class="text-2xl font-bold text-emerald-800 mt-4 uppercase">Apple</p>
                    </div>
                    <div class="bg-amber-100 p-8 rounded-3xl border-4 border-amber-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-amber-600 block mb-4">B</span>
                        <span class="text-6xl block">🐻</span>
                        <p class="text-2xl font-bold text-amber-800 mt-4 uppercase">Bear</p>
                    </div>
                    <div class="bg-orange-100 p-8 rounded-3xl border-4 border-orange-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-orange-600 block mb-4">C</span>
                        <span class="text-6xl block">🐱</span>
                        <p class="text-2xl font-bold text-orange-800 mt-4 uppercase">Cat</p>
                    </div>
                    <div class="bg-stone-100 p-8 rounded-3xl border-4 border-stone-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-stone-600 block mb-4">D</span>
                        <span class="text-6xl block">🐶</span>
                        <p class="text-2xl font-bold text-stone-800 mt-4 uppercase">Dog</p>
                    </div>
                    <div class="bg-blue-100 p-8 rounded-3xl border-4 border-blue-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-blue-600 block mb-4">E</span>
                        <span class="text-6xl block">🐘</span>
                        <p class="text-2xl font-bold text-blue-800 mt-4 uppercase">Elephant</p>
                    </div>
                </div>
            `,
            questions: [
                { id: "q1", question: "Apple (🍎) starts with the letter...", options: ["A", "B", "C"], correctIndex: 0 },
                { id: "q2", question: "Bear (🐻) starts with the letter...", options: ["A", "B", "C"], correctIndex: 1 },
                { id: "q3", question: "Cat (🐱) starts with the letter...", options: ["A", "B", "C"], correctIndex: 2 },
                { id: "q4", question: "Dog (🐶) starts with the letter...", options: ["D", "E", "A"], correctIndex: 0 },
                { id: "q5", question: "Elephant (🐘) starts with the letter...", options: ["E", "D", "B"], correctIndex: 0 },
                { id: "q6", question: "Which letter comes after A?", options: ["B", "C", "D"], correctIndex: 0 },
                { id: "q7", question: "Which letter comes before E?", options: ["D", "C", "B"], correctIndex: 0 },
                { id: "q8", question: "What animal starts with C?", options: ["Cat 🐱", "Dog 🐶", "Bear 🐻"], correctIndex: 0 },
                { id: "q9", question: "What animal starts with D?", options: ["Dog 🐶", "Cat 🐱", "Bear 🐻"], correctIndex: 0 },
                { id: "q10", question: "What animal starts with E?", options: ["Elephant 🐘", "Bear 🐻", "Dog 🐶"], correctIndex: 0 },
                { id: "q11", question: "What fruit starts with A?", options: ["Apple 🍎", "Orange 🍊", "Banana 🍌"], correctIndex: 0 },
                { id: "q12", question: "Find the letter B!", options: ["B", "A", "C"], correctIndex: 0 },
                { id: "q13", question: "Find the letter D!", options: ["D", "E", "C"], correctIndex: 0 },
                { id: "q14", question: "Find the letter E!", options: ["E", "A", "B"], correctIndex: 0 },
                { id: "q15", question: "Which letter comes after D?", options: ["E", "C", "B"], correctIndex: 0 }
            ]
        },
        {
            id: "eng1_2",
            title: "Letters F to I",
            icon: "🅵",
            difficulty: "Mudah",
            duration: "10 menit",
            content: `
                <div class="flex flex-col items-center gap-6">
                    <div class="bg-sky-100 p-8 rounded-3xl border-4 border-sky-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-sky-600 block mb-4">F</span>
                        <span class="text-6xl block">🐸</span>
                        <p class="text-2xl font-bold text-sky-800 mt-4 uppercase">Frog</p>
                    </div>
                    <div class="bg-green-100 p-8 rounded-3xl border-4 border-green-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-green-600 block mb-4">G</span>
                        <span class="text-6xl block">🦒</span>
                        <p class="text-2xl font-bold text-green-800 mt-4 uppercase">Giraffe</p>
                    </div>
                    <div class="bg-pink-100 p-8 rounded-3xl border-4 border-pink-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-pink-600 block mb-4">H</span>
                        <span class="text-6xl block">🐎</span>
                        <p class="text-2xl font-bold text-pink-800 mt-4 uppercase">Horse</p>
                    </div>
                    <div class="bg-indigo-100 p-8 rounded-3xl border-4 border-indigo-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-indigo-600 block mb-4">I</span>
                        <span class="text-6xl block">🍦</span>
                        <p class="text-2xl font-bold text-indigo-800 mt-4 uppercase">Ice Cream</p>
                    </div>
                </div>
            `,
            questions: [
                { id: "q1", question: "Frog (🐸) starts with the letter...", options: ["F", "G", "H"], correctIndex: 0 },
                { id: "q2", question: "Giraffe (🦒) starts with the letter...", options: ["F", "G", "H"], correctIndex: 1 },
                { id: "q3", question: "Horse (🐎) starts with the letter...", options: ["H", "G", "F"], correctIndex: 0 },
                { id: "q4", question: "Ice Cream (🍦) starts with the letter...", options: ["I", "H", "G"], correctIndex: 0 },
                { id: "q5", question: "Which letter comes after F?", options: ["G", "H", "I"], correctIndex: 0 },
                { id: "q6", question: "Which letter comes before I?", options: ["H", "G", "F"], correctIndex: 0 },
                { id: "q7", question: "What animal starts with F?", options: ["Frog 🐸", "Horse 🐎", "Giraffe 🦒"], correctIndex: 0 },
                { id: "q8", question: "What animal starts with H?", options: ["Horse 🐎", "Frog 🐸", "Giraffe 🦒"], correctIndex: 0 },
                { id: "q9", question: "What animal starts with G?", options: ["Giraffe 🦒", "Horse 🐎", "Frog 🐸"], correctIndex: 0 },
                { id: "q10", question: "What sweet treat starts with I?", options: ["Ice Cream 🍦", "Apple 🍎", "Cake 🍰"], correctIndex: 0 },
                { id: "q11", question: "Find the letter G!", options: ["G", "F", "H"], correctIndex: 0 },
                { id: "q12", question: "Find the letter I!", options: ["I", "H", "G"], correctIndex: 0 },
                { id: "q13", question: "Find the letter F!", options: ["F", "I", "G"], correctIndex: 0 },
                { id: "q14", question: "Which letter comes after G?", options: ["H", "I", "F"], correctIndex: 0 },
                { id: "q15", question: "Which letter looks like a straight line?", options: ["I", "H", "G"], correctIndex: 0 }
            ]
        },
        {
            id: "eng1_3",
            title: "Letters J to M",
            icon: "🇯",
            difficulty: "Mudah",
            duration: "10 menit",
            content: `
                <div class="flex flex-col items-center gap-6">
                    <div class="bg-rose-100 p-8 rounded-3xl border-4 border-rose-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-rose-600 block mb-4">J</span>
                        <span class="text-6xl block">🍹</span>
                        <p class="text-2xl font-bold text-rose-800 mt-4 uppercase">Juice</p>
                    </div>
                    <div class="bg-yellow-100 p-8 rounded-3xl border-4 border-yellow-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-yellow-600 block mb-4">K</span>
                        <span class="text-6xl block">🪁</span>
                        <p class="text-2xl font-bold text-yellow-800 mt-4 uppercase">Kite</p>
                    </div>
                    <div class="bg-fuchsia-100 p-8 rounded-3xl border-4 border-fuchsia-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-fuchsia-600 block mb-4">L</span>
                        <span class="text-6xl block">🦁</span>
                        <p class="text-2xl font-bold text-fuchsia-800 mt-4 uppercase">Lion</p>
                    </div>
                    <div class="bg-amber-100 p-8 rounded-3xl border-4 border-amber-200 text-center w-full max-w-md transform transition hover:scale-105">
                        <span class="text-8xl font-black text-amber-600 block mb-4">M</span>
                        <span class="text-6xl block">🐒</span>
                        <p class="text-2xl font-bold text-amber-800 mt-4 uppercase">Monkey</p>
                    </div>
                </div>
            `,
            questions: [
                { id: "q1", question: "Juice (🍹) starts with the letter...", options: ["J", "K", "L"], correctIndex: 0 },
                { id: "q2", question: "Kite (🪁) starts with the letter...", options: ["K", "J", "L"], correctIndex: 0 },
                { id: "q3", question: "Lion (🦁) starts with the letter...", options: ["L", "M", "K"], correctIndex: 0 },
                { id: "q4", question: "Monkey (🐒) starts with the letter...", options: ["M", "L", "K"], correctIndex: 0 },
                { id: "q5", question: "Which letter comes after J?", options: ["K", "L", "M"], correctIndex: 0 },
                { id: "q6", question: "Which letter comes before M?", options: ["L", "K", "J"], correctIndex: 0 },
                { id: "q7", question: "What animal starts with L?", options: ["Lion 🦁", "Monkey 🐒", "Cat 🐱"], correctIndex: 0 },
                { id: "q8", question: "What animal starts with M?", options: ["Monkey 🐒", "Lion 🦁", "Bear 🐻"], correctIndex: 0 },
                { id: "q9", question: "What drink starts with J?", options: ["Juice 🍹", "Milk 🥛", "Water 💧"], correctIndex: 0 },
                { id: "q10", question: "What toy starts with K?", options: ["Kite 🪁", "Car 🚗", "Ball ⚽"], correctIndex: 0 },
                { id: "q11", question: "Find the letter K!", options: ["K", "L", "M"], correctIndex: 0 },
                { id: "q12", question: "Find the letter L!", options: ["L", "J", "K"], correctIndex: 0 },
                { id: "q13", question: "Find the letter M!", options: ["M", "L", "K"], correctIndex: 0 },
                { id: "q14", question: "Find the letter J!", options: ["J", "M", "L"], correctIndex: 0 },
                { id: "q15", question: "Which letter comes after L?", options: ["M", "K", "J"], correctIndex: 0 }
            ]
        }
    ]
};
