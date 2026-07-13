with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the renderSummary function
old_func = '''        function renderSummary(container) {
            const isPassed = quizScore >= MIN_PASSING_SCORE || quizQuestions.length === 0;
            const colorClass = subjectsData[activeSubject].color;

            let iconHtml = "";
            let titleText = "";
            let descText = "";

            if (isPassed) {
                iconHtml = `<div class="text-8xl mb-6 animate-bounce">🌟</div>`;
                titleText = "Hebat Sekali!";
                descText = `Kamu berhasil menyelesaikan materi ini!`;
            } else {
                iconHtml = `<div class="text-8xl mb-6">💪</div>`;
                titleText = "Hampir Saja!";
                descText = `Coba lagi ya, kamu pasti bisa! Minimal skor adalah ${MIN_PASSING_SCORE}.`;
            }

            let scoreSection = "";
            if(quizQuestions.length > 0) {
                scoreSection = `
                    <div class="mt-8 bg-${colorClass}-50 p-6 rounded-2xl border-2 border-${colorClass}-200 inline-block min-w-[200px]">
                        <span class="block text-sm font-bold text-${colorClass}-500 uppercase mb-2">Skor Kamu</span>
                        <span class="block text-5xl font-black font-heading text-${colorClass}-600">${quizScore}</span>
                    </div>
                `;
            }

            container.innerHTML = `
                <div class="text-center py-10">
                    ${iconHtml}
                    <h2 class="font-heading font-extrabold text-4xl text-slate-800 mb-2">${titleText}</h2>
                    <p class="text-slate-500 font-medium text-lg">${descText}</p>
                    ${scoreSection}
                </div>
            `;

            const userProgress = getUserProgress();
            const record = userProgress[`${activeLevelData.id}_${activeLessonData.id}`];
            const wasCompleted = record && record.completed;

            const progressData = {
                completed: wasCompleted || isPassed,
                score: Math.max(quizScore, (record && record.score) ? record.score : 0),
                timestamp: new Date().toISOString()
            };
            saveUserProgress(activeLevelData.id, activeLessonData.id, progressData);
        }'''

new_func = '''        function renderSummary(container) {
            const isPassed = quizScore >= MIN_PASSING_SCORE || quizQuestions.length === 0;
            const colorClass = subjectsData[activeSubject].color;

            let iconHtml = "";
            let titleText = "";
            let descText = "";

            if (isPassed) {
                iconHtml = `<div class="text-8xl mb-6 animate-bounce">🌟</div>`;
                titleText = "Hebat Sekali!";
                descText = `Kamu berhasil menyelesaikan materi ini!`;
            } else {
                iconHtml = `<div class="text-8xl mb-6">💪</div>`;
                titleText = "Hampir Saja!";
                descText = `Coba lagi ya, kamu pasti bisa! Minimal skor adalah ${MIN_PASSING_SCORE}.`;
            }

            let scoreSection = "";
            if(quizQuestions.length > 0) {
                const correctCount = quizQuestions.filter((q, idx) => Number(userAnswers[idx]) === q.correctIndex).length;
                scoreSection = `
                    <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div class="bg-${colorClass}-50 p-6 rounded-2xl border-2 border-${colorClass}-200 min-w-[160px] text-center">
                            <span class="block text-sm font-bold text-${colorClass}-500 uppercase mb-2">Skor Kamu</span>
                            <span class="block text-5xl font-black font-heading text-${colorClass}-600">${quizScore}</span>
                        </div>
                        <div class="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-200 min-w-[160px] text-center">
                            <span class="block text-sm font-bold text-emerald-500 uppercase mb-2">Benar ✅</span>
                            <span class="block text-5xl font-black font-heading text-emerald-600">${correctCount}</span>
                        </div>
                        <div class="bg-rose-50 p-6 rounded-2xl border-2 border-rose-200 min-w-[160px] text-center">
                            <span class="block text-sm font-bold text-rose-500 uppercase mb-2">Salah ❌</span>
                            <span class="block text-5xl font-black font-heading text-rose-600">${quizQuestions.length - correctCount}</span>
                        </div>
                    </div>
                `;
            }

            // Build quiz review HTML
            let reviewHtml = "";
            if (quizQuestions.length > 0) {
                const reviewItems = quizQuestions.map((q, idx) => {
                    const userAns = Number(userAnswers[idx]);
                    const isCorrect = userAns === q.correctIndex;
                    const statusIcon = isCorrect ? "✅" : "❌";
                    const statusColor = isCorrect ? "emerald" : "rose";
                    const optionsHtml = q.options.map((opt, optIdx) => {
                        let bg = "bg-slate-50 border-slate-200 text-slate-600";
                        if (optIdx === q.correctIndex) bg = "bg-emerald-50 border-emerald-400 text-emerald-700 font-bold";
                        if (optIdx === userAns && !isCorrect) bg = "bg-rose-50 border-rose-400 text-rose-700 font-bold";
                        const prefix = optIdx === q.correctIndex ? "✅ " : (optIdx === userAns && !isCorrect ? "❌ " : "○ ");
                        return `<span class="block px-3 py-2 rounded-lg border text-sm ${bg}">${prefix}${opt}</span>`;
                    }).join("");
                    return `
                        <div class="bg-white border-2 border-${statusColor}-200 rounded-2xl p-4 space-y-2">
                            <div class="flex items-start gap-2">
                                <span class="text-xl flex-shrink-0">${statusIcon}</span>
                                <p class="font-bold text-slate-700 text-sm">${idx+1}. ${q.question}</p>
                            </div>
                            <div class="grid gap-2 pl-7">${optionsHtml}</div>
                        </div>
                    `;
                }).join("");

                reviewHtml = `
                    <div class="mt-8 text-left w-full">
                        <h3 class="text-lg font-black text-slate-700 mb-4 flex items-center gap-2">
                            <span>📋</span> Review Jawaban Kuis
                        </h3>
                        <div class="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                            ${reviewItems}
                        </div>
                    </div>
                `;
            }

            container.innerHTML = `
                <div class="text-center py-6">
                    ${iconHtml}
                    <h2 class="font-heading font-extrabold text-4xl text-slate-800 mb-2">${titleText}</h2>
                    <p class="text-slate-500 font-medium text-lg">${descText}</p>
                    ${scoreSection}
                </div>
                ${reviewHtml}
            `;

            const userProgress = getUserProgress();
            const record = userProgress[`${activeLevelData.id}_${activeLessonData.id}`];
            const wasCompleted = record && record.completed;

            const progressData = {
                completed: wasCompleted || isPassed,
                score: Math.max(quizScore, (record && record.score) ? record.score : 0),
                timestamp: new Date().toISOString()
            };
            saveUserProgress(activeLevelData.id, activeLessonData.id, progressData);
        }'''

if old_func in content:
    content = content.replace(old_func, new_func)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("renderSummary updated successfully!")
else:
    print("Could not find target function. Searching for key markers...")
    # Find partial match
    start_marker = "function renderSummary(container) {"
    end_marker = "        }\n\n        function handleNextStep()"
    if start_marker in content:
        print("Found start marker at index:", content.index(start_marker))
    if end_marker in content:
        print("Found end marker at index:", content.index(end_marker))
