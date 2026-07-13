window.english3 = {
    id: "english-3",
    title: "Phonics & Sounds",
    badge: "TK",
    icon: "🗣️",
    description: "Learn how the letters sound and how to read simple words!",
    lessons: [
        {
            id: "eng3_1",
            title: "The Sound of A",
            icon: "🅰️",
            difficulty: "Sedang",
            duration: "10 menit",
            content: `
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-extrabold text-emerald-600 mb-4">The "A" Sound!</h2>
                    <p class="text-xl text-slate-600">Letter A makes the sound "Ah" like in 🍎 <strong>A</strong>pple.</p>
                </div>
                <div class="flex flex-col items-center gap-4">
                    <div class="bg-red-50 p-6 rounded-2xl border-4 border-red-200 text-center w-full max-w-sm transform transition hover:scale-105">
                        <span class="text-6xl block mb-2">🍎</span>
                        <p class="text-3xl font-black text-red-600 uppercase tracking-widest">A-pple</p>
                    </div>
                    <div class="bg-amber-50 p-6 rounded-2xl border-4 border-amber-200 text-center w-full max-w-sm transform transition hover:scale-105">
                        <span class="text-6xl block mb-2">🐜</span>
                        <p class="text-3xl font-black text-amber-600 uppercase tracking-widest">A-nt</p>
                    </div>
                    <div class="bg-green-50 p-6 rounded-2xl border-4 border-green-200 text-center w-full max-w-sm transform transition hover:scale-105">
                        <span class="text-6xl block mb-2">🐊</span>
                        <p class="text-3xl font-black text-green-600 uppercase tracking-widest">A-lligator</p>
                    </div>
                </div>
            `,
            questions: [
                { id: "q1", question: "What makes the 'Ah' sound?", options: ["Letter A", "Letter B", "Letter C"], correctIndex: 0 },
                { id: "q2", question: "Which word starts with the 'Ah' sound?", options: ["Apple 🍎", "Dog 🐶", "Cat 🐱"], correctIndex: 0 },
                { id: "q3", question: "Which word starts with the 'Ah' sound?", options: ["Ant 🐜", "Bear 🐻", "Fish 🐟"], correctIndex: 0 },
                { id: "q4", question: "Which word starts with the 'Ah' sound?", options: ["Alligator 🐊", "Elephant 🐘", "Frog 🐸"], correctIndex: 0 },
                { id: "q5", question: "What is the first letter of Apple?", options: ["A", "E", "I"], correctIndex: 0 },
                { id: "q6", question: "What is the first letter of Ant?", options: ["A", "O", "U"], correctIndex: 0 },
                { id: "q7", question: "What is the first letter of Alligator?", options: ["A", "E", "O"], correctIndex: 0 },
                { id: "q8", question: "A is for...", options: ["Apple 🍎", "Banana 🍌", "Cherry 🍒"], correctIndex: 0 },
                { id: "q9", question: "A is for...", options: ["Ant 🐜", "Bee 🐝", "Bug 🐛"], correctIndex: 0 },
                { id: "q10", question: "A is for...", options: ["Alligator 🐊", "Bear 🐻", "Camel 🐪"], correctIndex: 0 },
                { id: "q11", question: "Does 'Apple' start with A?", options: ["Yes", "No", "Maybe"], correctIndex: 0 },
                { id: "q12", question: "Does 'Ant' start with A?", options: ["Yes", "No", "Maybe"], correctIndex: 0 },
                { id: "q13", question: "Does 'Alligator' start with A?", options: ["Yes", "No", "Maybe"], correctIndex: 0 },
                { id: "q14", question: "Does 'Bear' start with A?", options: ["No", "Yes", "Maybe"], correctIndex: 0 },
                { id: "q15", question: "Does 'Cat' start with A?", options: ["No", "Yes", "Maybe"], correctIndex: 0 }
            ]
        },
        {
            id: "eng3_2",
            title: "Reading C-A-T",
            icon: "🐱",
            difficulty: "Sedang",
            duration: "10 menit",
            content: `
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-extrabold text-blue-600 mb-4">Let's Read!</h2>
                    <p class="text-xl text-slate-600">Let's put the sounds together to read a word.</p>
                </div>
                <div class="flex flex-col items-center gap-6">
                    <div class="flex justify-center gap-4">
                        <div class="bg-orange-100 p-4 rounded-xl border-4 border-orange-300 text-center">
                            <span class="text-5xl font-black text-orange-600">C</span>
                            <p class="text-sm font-bold text-orange-800 mt-2">"Kuh"</p>
                        </div>
                        <div class="text-4xl self-center font-black text-slate-400">+</div>
                        <div class="bg-red-100 p-4 rounded-xl border-4 border-red-300 text-center">
                            <span class="text-5xl font-black text-red-600">A</span>
                            <p class="text-sm font-bold text-red-800 mt-2">"Ah"</p>
                        </div>
                        <div class="text-4xl self-center font-black text-slate-400">+</div>
                        <div class="bg-blue-100 p-4 rounded-xl border-4 border-blue-300 text-center">
                            <span class="text-5xl font-black text-blue-600">T</span>
                            <p class="text-sm font-bold text-blue-800 mt-2">"Tuh"</p>
                        </div>
                    </div>
                    
                    <div class="text-4xl font-black text-slate-400">👇</div>
                    
                    <div class="bg-white p-8 rounded-3xl border-4 border-slate-800 text-center w-full max-w-sm shadow-xl transform transition hover:scale-105">
                        <span class="text-8xl block mb-2">🐱</span>
                        <p class="text-5xl font-black text-slate-800 uppercase tracking-widest">CAT</p>
                    </div>
                </div>
            `,
            questions: [
                { id: "q1", question: "What word did we read?", options: ["Cat 🐱", "Dog 🐶", "Bat 🦇"], correctIndex: 0 },
                { id: "q2", question: "What is the first letter of Cat?", options: ["C", "A", "T"], correctIndex: 0 },
                { id: "q3", question: "What is the middle letter of Cat?", options: ["A", "C", "T"], correctIndex: 0 },
                { id: "q4", question: "What is the last letter of Cat?", options: ["T", "C", "A"], correctIndex: 0 },
                { id: "q5", question: "C + A + T makes...", options: ["Cat", "Bat", "Hat"], correctIndex: 0 },
                { id: "q6", question: "What sound does C make?", options: ["Kuh", "Ah", "Tuh"], correctIndex: 0 },
                { id: "q7", question: "What sound does A make?", options: ["Ah", "Kuh", "Tuh"], correctIndex: 0 },
                { id: "q8", question: "What sound does T make?", options: ["Tuh", "Kuh", "Ah"], correctIndex: 0 },
                { id: "q9", question: "How many letters in CAT?", options: ["3", "2", "4"], correctIndex: 0 },
                { id: "q10", question: "Does CAT start with C?", options: ["Yes", "No", "Maybe"], correctIndex: 0 },
                { id: "q11", question: "Does CAT end with T?", options: ["Yes", "No", "Maybe"], correctIndex: 0 },
                { id: "q12", question: "Is CAT an animal?", options: ["Yes", "No", "Maybe"], correctIndex: 0 },
                { id: "q13", question: "Does CAT have the letter A?", options: ["Yes", "No", "Maybe"], correctIndex: 0 },
                { id: "q14", question: "Does CAT have the letter B?", options: ["No", "Yes", "Maybe"], correctIndex: 0 },
                { id: "q15", question: "Does CAT have the letter D?", options: ["No", "Yes", "Maybe"], correctIndex: 0 }
            ]
        },
        {
            id: "eng3_3",
            title: "Reading D-O-G",
            icon: "🐶",
            difficulty: "Sedang",
            duration: "10 menit",
            content: `
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-extrabold text-blue-600 mb-4">Let's Read Another Word!</h2>
                </div>
                <div class="flex flex-col items-center gap-6">
                    <div class="flex justify-center gap-4">
                        <div class="bg-stone-100 p-4 rounded-xl border-4 border-stone-300 text-center">
                            <span class="text-5xl font-black text-stone-600">D</span>
                            <p class="text-sm font-bold text-stone-800 mt-2">"Duh"</p>
                        </div>
                        <div class="text-4xl self-center font-black text-slate-400">+</div>
                        <div class="bg-orange-100 p-4 rounded-xl border-4 border-orange-300 text-center">
                            <span class="text-5xl font-black text-orange-600">O</span>
                            <p class="text-sm font-bold text-orange-800 mt-2">"Oh"</p>
                        </div>
                        <div class="text-4xl self-center font-black text-slate-400">+</div>
                        <div class="bg-green-100 p-4 rounded-xl border-4 border-green-300 text-center">
                            <span class="text-5xl font-black text-green-600">G</span>
                            <p class="text-sm font-bold text-green-800 mt-2">"Guh"</p>
                        </div>
                    </div>
                    
                    <div class="text-4xl font-black text-slate-400">👇</div>
                    
                    <div class="bg-white p-8 rounded-3xl border-4 border-slate-800 text-center w-full max-w-sm shadow-xl transform transition hover:scale-105">
                        <span class="text-8xl block mb-2">🐶</span>
                        <p class="text-5xl font-black text-slate-800 uppercase tracking-widest">DOG</p>
                    </div>
                </div>
            `,
            questions: [
                { id: "q1", question: "What word did we read?", options: ["Dog 🐶", "Cat 🐱", "Log 🪵"], correctIndex: 0 },
                { id: "q2", question: "What is the first letter of Dog?", options: ["D", "O", "G"], correctIndex: 0 },
                { id: "q3", question: "What is the middle letter of Dog?", options: ["O", "D", "G"], correctIndex: 0 },
                { id: "q4", question: "What is the last letter of Dog?", options: ["G", "D", "O"], correctIndex: 0 },
                { id: "q5", question: "D + O + G makes...", options: ["Dog", "Log", "Frog"], correctIndex: 0 },
                { id: "q6", question: "What sound does D make?", options: ["Duh", "Oh", "Guh"], correctIndex: 0 },
                { id: "q7", question: "What sound does O make?", options: ["Oh", "Duh", "Guh"], correctIndex: 0 },
                { id: "q8", question: "What sound does G make?", options: ["Guh", "Duh", "Oh"], correctIndex: 0 },
                { id: "q9", question: "How many letters in DOG?", options: ["3", "2", "4"], correctIndex: 0 },
                { id: "q10", question: "Does DOG start with D?", options: ["Yes", "No", "Maybe"], correctIndex: 0 },
                { id: "q11", question: "Does DOG end with G?", options: ["Yes", "No", "Maybe"], correctIndex: 0 },
                { id: "q12", question: "Is DOG an animal?", options: ["Yes", "No", "Maybe"], correctIndex: 0 },
                { id: "q13", question: "Does DOG have the letter O?", options: ["Yes", "No", "Maybe"], correctIndex: 0 },
                { id: "q14", question: "Does DOG have the letter A?", options: ["No", "Yes", "Maybe"], correctIndex: 0 },
                { id: "q15", question: "Does DOG have the letter C?", options: ["No", "Yes", "Maybe"], correctIndex: 0 }
            ]
        }
    ]
};
