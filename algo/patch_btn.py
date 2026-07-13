with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old = '''            if (step === "summary") {
                nextBtn.textContent = "Selesai! 🏁";
            } else if (step === "quiz") {
                nextBtn.textContent = "Kumpulkan Jawaban 📝";
            } else {
                nextBtn.textContent = "Lanjut ke Kuis! ➡️";
            }'''

new = '''            if (step === "summary") {
                nextBtn.textContent = "Selesai! 🏁";
            } else if (step === "quiz") {
                nextBtn.textContent = "Kumpulkan & Lihat Nilai 📝";
            } else {
                nextBtn.textContent = "Lanjut ke Kuis! ➡️";
            }'''

if old in content:
    content = content.replace(old, new)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Button label updated!")
else:
    print("Target not found")
