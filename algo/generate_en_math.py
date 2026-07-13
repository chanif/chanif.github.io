import os
import json
import random

base_dir = r"d:\Belajar\chanif.github.io\algo\data"

def write_js(filename, var_name, data):
    content = f"window.{var_name} = {json.dumps(data, ensure_ascii=False, indent=4)};"
    with open(os.path.join(base_dir, filename), 'w', encoding='utf-8') as f:
        f.write(content)

# ============================================================
# MATH 17-25: Geometry & Advanced (fix infinite loop issue)
# ============================================================

def rich_math_content(title, explanation, examples, tips=""):
    ex_html = "".join([
        f"<div class='flex items-center gap-4 bg-white border-2 border-slate-100 rounded-xl p-3'>"
        f"<span class='text-2xl font-black text-blue-600 font-mono'>{e[0]}</span>"
        f"<span class='text-slate-400 text-xl'>→</span>"
        f"<span class='text-xl font-black text-emerald-600'>{e[1]}</span></div>"
        for e in examples
    ])
    tips_html = f"<div class='bg-amber-50 border-4 border-amber-200 rounded-2xl p-4'><p class='text-amber-700 font-bold'>💡 Tips: {tips}</p></div>" if tips else ""
    return f"""<div class='space-y-4'>
    <div class='bg-blue-50 border-4 border-blue-200 rounded-2xl p-5'>
        <h3 class='text-xl font-black text-blue-600 mb-2'>{title}</h3>
        <p class='text-slate-700 text-lg'>{explanation}</p>
    </div>
    <div class='space-y-3'><h4 class='font-black text-slate-600'>Contoh:</h4>{ex_html}</div>
    {tips_html}
    </div>"""

def gen_math_qs_fixed(lvl, count=15):
    """Generate math questions with NO infinite loops - fixed version"""
    qs = []

    if lvl == 17:  # Bangun Datar
        pool = [
            ("Segitiga", 3, "3 sudut, jumlah sudut 180°", "3 sisi"),
            ("Persegi", 4, "4 sisi sama panjang, 4 sudut 90°", "4 sisi sama"),
            ("Persegi Panjang", 4, "sisi berlawanan sama panjang", "4 sisi, beda panjang"),
            ("Lingkaran", 0, "tidak punya sudut, keliling = 2πr", "tidak bersisi"),
            ("Segienam", 6, "6 sisi sama panjang, 6 sudut", "6 sisi"),
            ("Segitiga Sama Sisi", 3, "3 sisi sama panjang, sudut 60° semua", "3 sisi sama"),
        ]
        templates = []
        for sh, sisi, ciri, singkat in pool:
            others = [x for x in pool if x[0] != sh]
            random.shuffle(others)
            o1, o2 = others[0], others[1]
            # Q: berapa sisi?
            opts = [str(sisi), str(o1[1]), str(o2[1])]; random.shuffle(opts)
            templates.append({"question": f"Bangun {sh} memiliki berapa sisi?", "opts": opts, "ans": str(sisi)})
            # Q: ciri
            opts2 = [ciri, o1[2], o2[2]]; random.shuffle(opts2)
            templates.append({"question": f"Ciri-ciri bangun {sh} adalah...", "opts": opts2, "ans": ciri})
            # Q: nama dari sisi
            opts3 = [sh, o1[0], o2[0]]; random.shuffle(opts3)
            templates.append({"question": f"Bangun yang memiliki {sisi} sisi disebut...", "opts": opts3, "ans": sh})

        random.shuffle(templates)
        for i, t in enumerate(templates[:count]):
            qs.append({"id": f"q{i}", "question": t["question"], "options": t["opts"], "correctIndex": t["opts"].index(t["ans"])})

    elif lvl == 18:  # Keliling & Luas
        templates = []
        for _ in range(20):
            q_type = random.choice(["keliling_persegi", "luas_persegi", "keliling_pp", "luas_pp", "luas_segitiga"])
            if q_type == "keliling_persegi":
                s = random.randint(2, 15)
                ans = 4 * s
                w = [ans + 4, ans - 4]
                opts = [str(ans), str(max(1, w[0])), str(max(1, w[1]))]
                random.shuffle(opts)
                templates.append({"question": f"Keliling persegi dengan sisi {s} cm = ... cm", "opts": opts, "ans": str(ans)})
            elif q_type == "luas_persegi":
                s = random.randint(2, 12)
                ans = s * s
                w = [ans + s, max(1, ans - s)]
                opts = [str(ans), str(w[0]), str(w[1])]
                random.shuffle(opts)
                templates.append({"question": f"Luas persegi dengan sisi {s} cm = ... cm²", "opts": opts, "ans": str(ans)})
            elif q_type == "keliling_pp":
                p, l = random.randint(3, 15), random.randint(2, 10)
                ans = 2 * (p + l)
                w = [ans + 2, max(1, ans - 2)]
                opts = [str(ans), str(w[0]), str(w[1])]
                random.shuffle(opts)
                templates.append({"question": f"Keliling persegi panjang {p}×{l} cm = ... cm", "opts": opts, "ans": str(ans)})
            elif q_type == "luas_pp":
                p, l = random.randint(3, 12), random.randint(2, 8)
                ans = p * l
                w = [ans + l, max(1, ans - l)]
                opts = [str(ans), str(w[0]), str(w[1])]
                random.shuffle(opts)
                templates.append({"question": f"Luas persegi panjang {p}×{l} cm = ... cm²", "opts": opts, "ans": str(ans)})
            else:
                a, t = random.randint(4, 12), random.randint(3, 10)
                ans = a * t // 2
                w = [ans + a, max(1, ans - a)]
                opts = [str(ans), str(w[0]), str(w[1])]
                random.shuffle(opts)
                templates.append({"question": f"Luas segitiga alas {a} cm tinggi {t} cm = ... cm²", "opts": opts, "ans": str(ans)})

        seen = set()
        for t in templates:
            if t["question"] not in seen and len(qs) < count:
                seen.add(t["question"])
                qs.append({"id": f"q{len(qs)}", "question": t["question"], "options": t["opts"], "correctIndex": t["opts"].index(t["ans"])})

    elif lvl == 19:  # Bangun Ruang
        pool3d = [
            ("Kubus", "6", "8", "12", "s³"),
            ("Balok", "6", "8", "12", "p×l×t"),
            ("Bola", "1", "0", "0", "4/3πr³"),
            ("Tabung", "3", "2", "2", "πr²×t"),
            ("Kerucut", "2", "1", "1", "1/3πr²×t"),
            ("Limas Segi Empat", "5", "5", "8", "1/3×alas×t"),
        ]
        templates = []
        for sh, sisi, titik, rusuk, vol in pool3d:
            others = [x for x in pool3d if x[0] != sh]
            random.shuffle(others)
            o1, o2 = others[0], others[1]
            opts1 = [sisi, o1[1], o2[1]]; random.shuffle(opts1)
            templates.append({"question": f"{sh} memiliki berapa sisi (bidang)?", "opts": opts1, "ans": sisi})
            opts2 = [rusuk, o1[3], o2[3]]; random.shuffle(opts2)
            templates.append({"question": f"{sh} memiliki berapa rusuk?", "opts": opts2, "ans": rusuk})
            opts3 = [sh, o1[0], o2[0]]; random.shuffle(opts3)
            templates.append({"question": f"Bangun ruang yang memiliki {sisi} sisi disebut...", "opts": opts3, "ans": sh})

        random.shuffle(templates)
        for i, t in enumerate(templates[:count]):
            qs.append({"id": f"q{i}", "question": t["question"], "options": t["opts"], "correctIndex": t["opts"].index(t["ans"])})

    elif lvl == 20:  # Bilangan Bulat
        pairs = []
        used_qs = set()
        while len(pairs) < 30:
            a = random.randint(-10, 10)
            b = random.randint(-10, 10)
            op = random.choice(['+', '-'])
            ans = a + b if op == '+' else a - b
            q = f"({a}) {op} ({b}) = ?"
            if q not in used_qs:
                used_qs.add(q)
                w = [ans + 1, ans - 1]
                opts = [str(ans), str(w[0]), str(w[1])]
                random.shuffle(opts)
                pairs.append({"question": q, "opts": opts, "ans": str(ans)})
        for i, p in enumerate(pairs[:count]):
            qs.append({"id": f"q{i}", "question": p["question"], "options": p["opts"], "correctIndex": p["opts"].index(p["ans"])})

    elif lvl == 21:  # KPK FPB
        def gcd(x, y): return x if y == 0 else gcd(y, x % y)
        def lcm(x, y): return x * y // gcd(x, y)
        number_pairs = [(2,4),(2,6),(3,6),(4,6),(3,9),(4,8),(5,10),(6,9),(4,12),(6,8),(3,12),(6,10),(4,10),(2,8),(5,15),(3,15),(6,12),(8,12),(4,16),(6,18)]
        templates = []
        for a, b in number_pairs:
            g = gcd(a, b); l = lcm(a, b)
            wo1, wo2 = [g + 1, max(1, g - 1)]
            opts_fpb = [str(g), str(wo1), str(wo2)]; random.shuffle(opts_fpb)
            templates.append({"question": f"FPB dari {a} dan {b} adalah...", "opts": opts_fpb, "ans": str(g)})
            wl1, wl2 = l + a, max(1, l - b)
            opts_kpk = [str(l), str(wl1), str(wl2)]; random.shuffle(opts_kpk)
            templates.append({"question": f"KPK dari {a} dan {b} adalah...", "opts": opts_kpk, "ans": str(l)})
        random.shuffle(templates)
        for i, t in enumerate(templates[:count]):
            qs.append({"id": f"q{i}", "question": t["question"], "options": t["opts"], "correctIndex": t["opts"].index(t["ans"])})

    elif lvl == 22:  # Perbandingan
        scenarios = []
        for a in range(1, 5):
            for b in range(1, 5):
                if a != b:
                    total = (a + b) * random.choice([2, 3, 4])
                    share_a = total * a // (a + b)
                    share_b = total * b // (a + b)
                    w1 = share_a + a; w2 = max(0, share_a - a)
                    opts = [str(share_a), str(w1), str(w2)]; random.shuffle(opts)
                    scenarios.append({"question": f"Bagi {total} dengan perbandingan {a}:{b}. Bagian pertama = ...", "opts": opts, "ans": str(share_a)})
                    opts2 = [str(share_b), str(w1), str(w2)]; random.shuffle(opts2)
                    scenarios.append({"question": f"Bagi {total} dengan perbandingan {a}:{b}. Bagian kedua = ...", "opts": opts2, "ans": str(share_b)})
        random.shuffle(scenarios)
        for i, s in enumerate(scenarios[:count]):
            qs.append({"id": f"q{i}", "question": s["question"], "options": s["opts"], "correctIndex": s["opts"].index(s["ans"])})

    elif lvl == 23:  # Statistika
        datasets = [
            [2, 4, 4, 6, 9], [3, 5, 5, 7, 10], [1, 3, 6, 6, 9], [4, 4, 5, 8, 12],
            [2, 2, 5, 7, 9], [1, 4, 7, 7, 11], [3, 3, 6, 8, 10], [5, 6, 6, 9, 14],
        ]
        templates = []
        for data in datasets:
            total = sum(data); n = len(data)
            mean = total / n
            mean_str = str(int(mean)) if mean == int(mean) else str(round(mean, 1))
            median = sorted(data)[n // 2]
            modus = max(set(data), key=data.count)

            w_mean = [round(mean + 1, 1), max(0, round(mean - 1, 1))]
            opts_m = [mean_str, str(w_mean[0]), str(w_mean[1])]; random.shuffle(opts_m)
            templates.append({"question": f"Data: {', '.join(map(str,data))}. Mean = ...", "opts": opts_m, "ans": mean_str})

            w_med = [median + 1, max(0, median - 1)]
            opts_med = [str(median), str(w_med[0]), str(w_med[1])]; random.shuffle(opts_med)
            templates.append({"question": f"Data: {', '.join(map(str,data))}. Median = ...", "opts": opts_med, "ans": str(median)})

            w_mod = [x for x in data if x != modus]
            opts_mod = [str(modus), str(random.choice(w_mod) if w_mod else modus+1), str(random.choice(w_mod) if w_mod else modus+2)]
            random.shuffle(opts_mod)
            templates.append({"question": f"Data: {', '.join(map(str,data))}. Modus = ...", "opts": opts_mod, "ans": str(modus)})

        random.shuffle(templates)
        for i, t in enumerate(templates[:count]):
            qs.append({"id": f"q{i}", "question": t["question"], "options": t["opts"], "correctIndex": t["opts"].index(t["ans"])})

    elif lvl == 24:  # Aljabar
        templates = []
        for a in range(2, 6):
            for b in range(1, 8):
                for x in range(1, 8):
                    ans = a * x + b
                    w = [ans + a, max(0, ans - a)]
                    opts = [str(ans), str(w[0]), str(w[1])]; random.shuffle(opts)
                    templates.append({"question": f"Jika x = {x}, nilai dari {a}x + {b} = ...", "opts": opts, "ans": str(ans)})
                    # Solve for x
                    c = a * x + b
                    w2 = [x + 1, max(0, x - 1)]
                    opts2 = [str(x), str(w2[0]), str(w2[1])]; random.shuffle(opts2)
                    templates.append({"question": f"Selesaikan: {a}x + {b} = {c}. Nilai x = ...", "opts": opts2, "ans": str(x)})
        random.shuffle(templates)
        seen = set()
        for t in templates:
            if t["question"] not in seen and len(qs) < count:
                seen.add(t["question"])
                qs.append({"id": f"q{len(qs)}", "question": t["question"], "options": t["opts"], "correctIndex": t["opts"].index(t["ans"])})

    elif lvl == 25:  # Persamaan Linear
        templates = []
        for a in range(2, 6):
            for x in range(1, 10):
                for b in range(1, 10):
                    c = a * x + b
                    w = [x + 1, max(0, x - 1)]
                    opts = [str(x), str(w[0]), str(w[1])]; random.shuffle(opts)
                    templates.append({"question": f"{a}x + {b} = {c}. Nilai x = ...", "opts": opts, "ans": str(x)})
                if len(templates) > 60: break
            if len(templates) > 60: break
        random.shuffle(templates)
        seen = set()
        for t in templates:
            if t["question"] not in seen and len(qs) < count:
                seen.add(t["question"])
                qs.append({"id": f"q{len(qs)}", "question": t["question"], "options": t["opts"], "correctIndex": t["opts"].index(t["ans"])})

    # Fallback
    while len(qs) < count:
        a, b = random.randint(1, 20), random.randint(1, 20)
        ans = a + b
        opts = [str(ans), str(ans + 1), str(max(0, ans - 1))]; random.shuffle(opts)
        qs.append({"id": f"q{len(qs)}", "question": f"Berapa {a} + {b}?", "options": opts, "correctIndex": opts.index(str(ans))})

    return qs[:count]


math_levels_advanced = [
    (17, "Bangun Datar", "Kelas 4", "📐",
     rich_math_content("Bangun Datar", "Bangun datar adalah bentuk 2 dimensi. Contoh: segitiga, persegi, lingkaran.",
                       [("Segitiga", "3 sisi, 3 sudut, jumlah sudut = 180°"), ("Persegi", "4 sisi sama panjang, 4 sudut siku-siku"), ("Lingkaran", "Tidak punya sudut, keliling = 2πr")],
                       "Sudut siku-siku = 90°, lancip < 90°, tumpul > 90°")),
    (18, "Keliling & Luas", "Kelas 5", "📏",
     rich_math_content("Keliling dan Luas", "Keliling = jarak mengelilingi bangun. Luas = besar permukaan bangun.",
                       [("Persegi sisi s", "Keliling = 4s, Luas = s×s"), ("Persegi Panjang p×l", "Keliling = 2(p+l), Luas = p×l"), ("Segitiga alas a tinggi t", "Luas = ½×a×t")],
                       "Keliling dalam cm/m, luas dalam cm²/m²")),
    (19, "Bangun Ruang", "Kelas 5", "📦",
     rich_math_content("Bangun Ruang", "Bangun ruang adalah bentuk 3 dimensi yang memiliki volume.",
                       [("Kubus", "6 sisi, 8 titik sudut, 12 rusuk, Volume = s³"), ("Balok", "6 sisi, Volume = p×l×t"), ("Tabung", "2 lingkaran + 1 sisi lengkung, Volume = πr²×t")],
                       "Volume kubus = s³, Volume balok = panjang × lebar × tinggi")),
    (20, "Bilangan Bulat Negatif", "Kelas 5-6", "🔢",
     rich_math_content("Bilangan Bulat Negatif", "Bilangan bulat mencakup negatif, nol, dan positif: ...-3,-2,-1,0,1,2,3...",
                       [("(-3) + 5 = 2", "Mulai dari -3, maju 5 langkah = 2"), ("(-4) - (-2) = -2", "Mengurangi negatif = menambah positif"), ("(-2) × 3 = -6", "Negatif × positif = negatif")],
                       "Di garis bilangan: kiri = negatif, kanan = positif")),
    (21, "KPK & FPB", "Kelas 5-6", "🔢",
     rich_math_content("KPK dan FPB", "FPB = Faktor Persekutuan Terbesar. KPK = Kelipatan Persekutuan Terkecil.",
                       [("FPB(12,8) = 4", "Faktor 12: 1,2,3,4,6,12. Faktor 8: 1,2,4,8. Terbesar sama = 4"), ("KPK(4,6) = 12", "Kelipatan 4: 4,8,12. Kelipatan 6: 6,12. Terkecil sama = 12")],
                       "FPB untuk menyederhanakan pecahan, KPK untuk menyamakan penyebut")),
    (22, "Perbandingan & Skala", "Kelas 6", "⚖️",
     rich_math_content("Perbandingan dan Skala", "Perbandingan a:b berarti untuk setiap a bagian pertama, ada b bagian kedua.",
                       [("Perbandingan 2:3, total 10", "A = 2/5×10 = 4, B = 3/5×10 = 6"), ("Skala 1:100", "1 cm di peta = 100 cm di nyata"), ("Rasio 3:1", "Tiga kali lebih banyak")],
                       "Bagian = (rasio bagian / jumlah total rasio) × total keseluruhan")),
    (23, "Statistika Dasar", "SMP", "📊",
     rich_math_content("Mean, Median, Modus", "Tiga ukuran pemusatan data yang penting.",
                       [("Mean", "Rata-rata: jumlah semua data ÷ banyak data"), ("Median", "Nilai tengah setelah data diurutkan"), ("Modus", "Nilai yang paling sering muncul")],
                       "Data: 3,5,5,7,8 → Mean=5.6, Median=5, Modus=5")),
    (24, "Aljabar Dasar", "SMP", "🔣",
     rich_math_content("Aljabar: Variabel & Ekspresi", "Variabel adalah simbol (x, y) yang mewakili bilangan yang belum diketahui.",
                       [("2x + 3, x=4", "2(4)+3 = 8+3 = 11"), ("3y - 5, y=3", "3(3)-5 = 9-5 = 4"), ("Selesaikan: 2x+1=7", "2x = 7-1 = 6, x = 3")],
                       "Substitusi: ganti variabel dengan nilainya lalu hitung!")),
    (25, "Persamaan Linear", "SMP", "📐",
     rich_math_content("Persamaan Linear Satu Variabel", "ax + b = c. Selesaikan dengan memindahkan bilangan.",
                       [("2x + 3 = 11", "2x = 11-3 = 8, x = 4"), ("3x - 5 = 10", "3x = 10+5 = 15, x = 5"), ("5x = 25", "x = 25÷5 = 5")],
                       "Apa yang dilakukan di satu sisi, lakukan juga di sisi lain!")),
]

for lvl, title, badge, icon, content in math_levels_advanced:
    questions = gen_math_qs_fixed(lvl, 15)
    lessons = [
        {"id": f"mth{lvl}_{n}", "title": f"Bagian {n}", "icon": icon,
         "difficulty": "Mudah" if n == 1 else ("Sedang" if n == 2 else "Sulit"),
         "duration": "15 menit", "content": content, "questions": questions}
        for n in range(1, 4)
    ]
    write_js(f"math-{lvl}.js", f"math{lvl}", {
        "id": f"math-{lvl}", "title": f"Level {lvl}: {title}", "badge": badge,
        "icon": icon, "description": title, "lessons": lessons
    })
    print(f"math-{lvl}.js done")

print("\n=== MATH 17-25 DONE ===\n")

# ============================================================
# ENGLISH 1-25: Complete rewrite with better content & unique quizzes
# ============================================================

def paud_vocab_content(pairs, color="blue"):
    cards = "".join([
        f"<div class='flex flex-col items-center justify-center bg-{color}-50 border-4 border-{color}-200 rounded-3xl p-6 hover:scale-105 transition-transform cursor-default' style='min-height:160px'>"
        f"<span class='text-7xl mb-3 block'>{e}</span>"
        f"<span class='text-2xl font-black text-{color}-700 mb-1'>{en}</span>"
        f"<span class='text-base text-{color}-400 font-bold'>{id}</span>"
        f"</div>"
        for en, id, e in pairs
    ])
    return f"<div class='grid grid-cols-2 sm:grid-cols-3 gap-4'>{cards}</div>"

def rich_vocab_content(pairs, grammar_tip="", extra_html="", color="emerald"):
    cards = "".join([
        f"<div class='bg-{color}-50 border-2 border-{color}-200 rounded-2xl p-4 flex flex-col items-center gap-1 text-center'>"
        f"<span class='text-4xl'>{e}</span>"
        f"<span class='font-black text-{color}-700 text-base'>{en}</span>"
        f"<span class='text-{color}-400 text-xs font-bold'>{id}</span>"
        f"</div>"
        for en, id, e in pairs
    ])
    tip_html = f"<div class='bg-amber-50 border-4 border-amber-200 rounded-2xl p-4'><p class='font-black text-amber-600 mb-1'>📝 Grammar Tip:</p><p class='text-amber-700'>{grammar_tip}</p></div>" if grammar_tip else ""
    return (
        f"<div class='space-y-4'>"
        f"<div class='grid grid-cols-2 sm:grid-cols-3 gap-3'>{cards}</div>"
        f"{tip_html}{extra_html}"
        f"</div>"
    )

def make_unique_quiz(vocab_items, count=15, pool=None):
    """Generate non-redundant quiz: each question targets a different vocab item and uses 3 different question types"""
    all_pool = list(vocab_items) + (pool or [])
    # Remove duplicates by first element
    seen_en = set()
    deduped_pool = []
    for item in all_pool:
        if item[0] not in seen_en:
            seen_en.add(item[0])
            deduped_pool.append(item)

    qs = []
    used_questions = set()

    # Distribute 3 question types evenly
    type_cycle = [0, 1, 2] * 10  # type 0: en->id, type 1: id->en, type 2: emoji->en

    shuffled = list(vocab_items) * 3
    random.shuffle(shuffled)

    for i, (q_type, target) in enumerate(zip(type_cycle, shuffled)):
        if len(qs) >= count:
            break
        wrong_pool = [x for x in deduped_pool if x[0] != target[0]]
        if len(wrong_pool) < 2:
            continue
        w1, w2 = random.sample(wrong_pool, 2)

        if q_type == 0:
            q_text = f"What is the meaning of '{target[0]}'? 🇬🇧→🇮🇩"
            correct = target[1]
            opts = [target[1], w1[1], w2[1]]
        elif q_type == 1:
            q_text = f"Bahasa Inggris dari '{target[1]}' adalah... 🇮🇩→🇬🇧"
            correct = target[0]
            opts = [target[0], w1[0], w2[0]]
        else:
            q_text = f"Gambar {target[2]} ini dalam bahasa Inggris disebut..."
            correct = target[0]
            opts = [target[0], w1[0], w2[0]]

        if q_text not in used_questions:
            used_questions.add(q_text)
            random.shuffle(opts)
            qs.append({"id": f"q{len(qs)}", "question": q_text, "options": opts, "correctIndex": opts.index(correct)})

    return qs[:count]


def make_grammar_quiz(grammar_items, count=15):
    """Grammar-focused quiz for advanced levels"""
    qs = []
    used = set()
    for item in grammar_items * 3:
        if len(qs) >= count:
            break
        q, opts, correct = item
        if q not in used:
            used.add(q)
            qs.append({"id": f"q{len(qs)}", "question": q, "options": opts, "correctIndex": opts.index(correct)})
    random.shuffle(qs)
    return qs[:count]


# --- LEVEL DATA ---

# EN-1: Colors & Numbers (PAUD)
en1_colors = [
    ("Red","Merah","🔴"),("Blue","Biru","🔵"),("Green","Hijau","🟢"),
    ("Yellow","Kuning","🟡"),("Orange","Oranye","🟠"),("Purple","Ungu","🟣"),
    ("White","Putih","⬜"),("Black","Hitam","⬛"),("Pink","Merah Muda","🩷"),("Brown","Coklat","🟫")
]
en1_numbers = [
    ("One","Satu","1️⃣"),("Two","Dua","2️⃣"),("Three","Tiga","3️⃣"),("Four","Empat","4️⃣"),
    ("Five","Lima","5️⃣"),("Six","Enam","6️⃣"),("Seven","Tujuh","7️⃣"),("Eight","Delapan","8️⃣"),
    ("Nine","Sembilan","9️⃣"),("Ten","Sepuluh","🔟")
]
write_js("english-1.js", "english1", {
    "id":"english-1","title":"Level 1: Colors & Numbers","badge":"PAUD","icon":"🎨",
    "description":"Learn colors and numbers in English with fun emoji pictures.",
    "lessons": [
        {"id":"eng1_1","title":"Colors (Warna)","icon":"🎨","difficulty":"Mudah","duration":"10 menit",
         "content": paud_vocab_content(en1_colors, "indigo"), "questions": make_unique_quiz(en1_colors)},
        {"id":"eng1_2","title":"Numbers 1-10","icon":"🔢","difficulty":"Mudah","duration":"10 menit",
         "content": paud_vocab_content(en1_numbers, "emerald"), "questions": make_unique_quiz(en1_numbers)},
        {"id":"eng1_3","title":"Colors & Numbers Mixed","icon":"🏆","difficulty":"Sedang","duration":"10 menit",
         "content": paud_vocab_content(en1_colors[:5]+en1_numbers[:5], "pink"),
         "questions": make_unique_quiz(en1_colors[:5]+en1_numbers[:5], pool=en1_colors+en1_numbers)},
    ]
})
print("english-1.js done")

# EN-2: Animals & Shapes (PAUD)
en2_animals = [
    ("Cat","Kucing","🐱"),("Dog","Anjing","🐶"),("Bird","Burung","🐦"),("Fish","Ikan","🐟"),
    ("Elephant","Gajah","🐘"),("Lion","Singa","🦁"),("Tiger","Harimau","🐯"),("Monkey","Monyet","🐒"),
    ("Rabbit","Kelinci","🐰"),("Duck","Bebek","🦆")
]
en2_shapes = [
    ("Circle","Lingkaran","⭕"),("Square","Persegi","🟥"),("Triangle","Segitiga","🔺"),
    ("Star","Bintang","⭐"),("Heart","Hati","❤️"),("Diamond","Berlian","💎"),
    ("Rectangle","Persegi Panjang","▬"),("Oval","Oval","🥚")
]
write_js("english-2.js", "english2", {
    "id":"english-2","title":"Level 2: Animals & Shapes","badge":"PAUD","icon":"🐱",
    "description":"Learn animal and shape names in English through colorful emoji cards.",
    "lessons": [
        {"id":"eng2_1","title":"Animals (Hewan)","icon":"🐱","difficulty":"Mudah","duration":"10 menit",
         "content": paud_vocab_content(en2_animals, "amber"), "questions": make_unique_quiz(en2_animals)},
        {"id":"eng2_2","title":"Shapes (Bentuk)","icon":"⭕","difficulty":"Mudah","duration":"10 menit",
         "content": paud_vocab_content(en2_shapes, "blue"), "questions": make_unique_quiz(en2_shapes)},
        {"id":"eng2_3","title":"Animals & Shapes Mixed","icon":"🏆","difficulty":"Sedang","duration":"10 menit",
         "content": paud_vocab_content(en2_animals[:5]+en2_shapes[:5], "emerald"),
         "questions": make_unique_quiz(en2_animals[:5]+en2_shapes[:5], pool=en2_animals+en2_shapes)},
    ]
})
print("english-2.js done")

# EN-3: Body & Family (PAUD)
en3_body = [
    ("Head","Kepala","🗣️"),("Eye","Mata","👁️"),("Ear","Telinga","👂"),("Nose","Hidung","👃"),
    ("Mouth","Mulut","👄"),("Hand","Tangan","🤚"),("Leg","Kaki","🦵"),("Foot","Telapak Kaki","🦶"),
    ("Arm","Lengan","💪"),("Finger","Jari","☝️")
]
en3_family = [
    ("Mother","Ibu","👩"),("Father","Ayah","👨"),("Baby","Bayi","👶"),("Sister","Kakak/Adik Perempuan","👧"),
    ("Brother","Kakak/Adik Laki-laki","👦"),("Grandmother","Nenek","👵"),("Grandfather","Kakek","👴"),
    ("Uncle","Paman","👨"),("Aunt","Bibi","👩"),("Family","Keluarga","👨‍👩‍👧‍👦")
]
write_js("english-3.js", "english3", {
    "id":"english-3","title":"Level 3: Body & Family","badge":"PAUD-TK","icon":"👨‍👩‍👧‍👦",
    "description":"Learn body parts and family member names in English.",
    "lessons": [
        {"id":"eng3_1","title":"Body Parts (Anggota Tubuh)","icon":"🗣️","difficulty":"Mudah","duration":"10 menit",
         "content": paud_vocab_content(en3_body, "rose"), "questions": make_unique_quiz(en3_body)},
        {"id":"eng3_2","title":"Family (Keluarga)","icon":"👨‍👩‍👧‍👦","difficulty":"Mudah","duration":"10 menit",
         "content": paud_vocab_content(en3_family, "indigo"), "questions": make_unique_quiz(en3_family)},
        {"id":"eng3_3","title":"Body & Family Mixed","icon":"🏆","difficulty":"Sedang","duration":"10 menit",
         "content": paud_vocab_content(en3_body[:5]+en3_family[:5], "purple"),
         "questions": make_unique_quiz(en3_body[:5]+en3_family[:5], pool=en3_body+en3_family)},
    ]
})
print("english-3.js done")

# EN-4: Fruits & Vegetables
en4_vocab = [
    ("Apple","Apel","🍎"),("Banana","Pisang","🍌"),("Orange","Jeruk","🍊"),("Grape","Anggur","🍇"),
    ("Mango","Mangga","🥭"),("Carrot","Wortel","🥕"),("Tomato","Tomat","🍅"),("Corn","Jagung","🌽"),
    ("Potato","Kentang","🥔"),("Strawberry","Stroberi","🍓"),("Watermelon","Semangka","🍉"),
    ("Pineapple","Nanas","🍍"),("Spinach","Bayam","🥬"),("Cucumber","Mentimun","🥒")
]
write_js("english-4.js", "english4", {
    "id":"english-4","title":"Level 4: Fruits & Vegetables","badge":"Kelas 1","icon":"🍎",
    "description":"Learn names of fruits and vegetables in English.",
    "lessons": [
        {"id":"eng4_1","title":"Fruits (Buah-buahan)","icon":"🍎","difficulty":"Mudah","duration":"12 menit",
         "content": rich_vocab_content(en4_vocab[:7], "Fruits are usually sweet! Example: Apple is sweet, Lemon is sour."),
         "questions": make_unique_quiz(en4_vocab[:7], pool=en4_vocab)},
        {"id":"eng4_2","title":"Vegetables (Sayuran)","icon":"🥕","difficulty":"Mudah","duration":"12 menit",
         "content": rich_vocab_content(en4_vocab[5:], "Vegetables are good for your health! Eat them every day."),
         "questions": make_unique_quiz(en4_vocab[5:], pool=en4_vocab)},
        {"id":"eng4_3","title":"Fruits & Veggies Mixed","icon":"🏆","difficulty":"Sedang","duration":"15 menit",
         "content": rich_vocab_content(en4_vocab, "I like... / I don't like... (suka / tidak suka)"),
         "questions": make_unique_quiz(en4_vocab)},
    ]
})
print("english-4.js done")

# EN-5: Food & Drinks
en5_vocab = [
    ("Rice","Nasi","🍚"),("Bread","Roti","🍞"),("Egg","Telur","🥚"),("Milk","Susu","🥛"),
    ("Water","Air","💧"),("Juice","Jus","🥤"),("Cake","Kue","🎂"),("Soup","Sup","🍲"),
    ("Noodle","Mie","🍜"),("Cookie","Biskuit","🍪"),("Chicken","Ayam","🍗"),("Ice Cream","Es Krim","🍦"),
    ("Pizza","Pizza","🍕"),("Sandwich","Roti Lapis","🥪")
]
write_js("english-5.js", "english5", {
    "id":"english-5","title":"Level 5: Food & Drinks","badge":"Kelas 1","icon":"🍽️",
    "description":"Learn names of food and drinks in English.",
    "lessons": [
        {"id":"eng5_1","title":"Food (Makanan)","icon":"🍽️","difficulty":"Mudah","duration":"12 menit",
         "content": rich_vocab_content(en5_vocab[:8], "I eat... every day. (Saya makan... setiap hari.)"),
         "questions": make_unique_quiz(en5_vocab[:8], pool=en5_vocab)},
        {"id":"eng5_2","title":"Drinks (Minuman)","icon":"🥤","difficulty":"Mudah","duration":"12 menit",
         "content": rich_vocab_content(en5_vocab[3:10], "I drink... (Saya minum...) / I am thirsty. (Saya haus.)"),
         "questions": make_unique_quiz(en5_vocab[3:10], pool=en5_vocab)},
        {"id":"eng5_3","title":"Food & Drinks Mixed","icon":"🏆","difficulty":"Sedang","duration":"15 menit",
         "content": rich_vocab_content(en5_vocab, "I am hungry! / I am thirsty! (Saya lapar! / Saya haus!)"),
         "questions": make_unique_quiz(en5_vocab)},
    ]
})
print("english-5.js done")

# EN-6: Classroom Objects
en6_vocab = [
    ("Book","Buku","📚"),("Pen","Pena","🖊️"),("Pencil","Pensil","✏️"),("Ruler","Penggaris","📏"),
    ("Eraser","Penghapus","🧹"),("Bag","Tas","🎒"),("Chair","Kursi","🪑"),("Table","Meja","🪑"),
    ("Board","Papan Tulis","📋"),("Scissors","Gunting","✂️"),("Glue","Lem","🫙"),("Notebook","Buku Tulis","📓"),
    ("Calculator","Kalkulator","🔢"),("Crayon","Krayon","🖍️")
]
write_js("english-6.js", "english6", {
    "id":"english-6","title":"Level 6: Classroom Objects","badge":"Kelas 2","icon":"🏫",
    "description":"Learn names of things in the classroom in English.",
    "lessons": [
        {"id":"eng6_1","title":"School Things","icon":"📚","difficulty":"Mudah","duration":"12 menit",
         "content": rich_vocab_content(en6_vocab[:8], "I need a pencil. Can I borrow your eraser? (Boleh pinjam penghapus?)"),
         "questions": make_unique_quiz(en6_vocab[:8], pool=en6_vocab)},
        {"id":"eng6_2","title":"More School Things","icon":"✂️","difficulty":"Mudah","duration":"12 menit",
         "content": rich_vocab_content(en6_vocab[6:], "Open your book! Close your bag! (Perintah di kelas.)"),
         "questions": make_unique_quiz(en6_vocab[6:], pool=en6_vocab)},
        {"id":"eng6_3","title":"Classroom Full Review","icon":"🏆","difficulty":"Sedang","duration":"15 menit",
         "content": rich_vocab_content(en6_vocab, "This is a... / That is a... (Ini adalah... / Itu adalah...)"),
         "questions": make_unique_quiz(en6_vocab)},
    ]
})
print("english-6.js done")

# EN-7: Days of the Week
en7_vocab = [
    ("Monday","Senin","🌙"),("Tuesday","Selasa","🔥"),("Wednesday","Rabu","💧"),
    ("Thursday","Kamis","🌩️"),("Friday","Jumat","🌤️"),("Saturday","Sabtu","🎉"),("Sunday","Minggu","☀️"),
    ("Weekday","Hari Kerja","💼"),("Weekend","Akhir Pekan","🏖️"),("Holiday","Hari Libur","🎊")
]
en7_grammar = [
    ("Today is ___. (Mengisi hari ini)","Monday","Tuesday","Wednesday","Monday"),
    ("What day comes after Friday?","Saturday","Sunday","Thursday","Saturday"),
    ("What day comes before Monday?","Sunday","Saturday","Tuesday","Sunday"),
    ("How many days in a week?","7","5","6","7"),
    ("The first day of the week (in English calendar) is...","Sunday","Monday","Saturday","Sunday"),
    ("School days are usually...","Monday to Friday","Saturday to Sunday","Only Monday","Monday to Friday"),
    ("On ___ we rest and play (Islamic countries).","Friday","Wednesday","Monday","Friday"),
    ("What is the last day of the week?","Saturday","Friday","Sunday","Saturday"),
    ("What day comes after Wednesday?","Thursday","Friday","Tuesday","Thursday"),
    ("Monday is the ___ day of the week.","Second","First","Third","Second"),
]
# Re-format grammar quiz
en7_grammar_formatted = [
    (q, [opts[0],opts[1],opts[2]], ans) for q,*opts,ans in [
        ("Today is ___. Tomorrow will be Tuesday. Today is...","Monday","Sunday","Wednesday","Monday"),
        ("What day comes after Friday?","Saturday","Sunday","Thursday","Saturday"),
        ("What day comes before Monday?","Sunday","Saturday","Tuesday","Sunday"),
        ("How many days are there in a week?","7","5","6","7"),
        ("School days are usually...","Monday to Friday","Saturday to Sunday","Only Monday","Monday to Friday"),
        ("The day after Thursday is...","Friday","Wednesday","Saturday","Friday"),
        ("The day before Wednesday is...","Tuesday","Monday","Thursday","Tuesday"),
        ("Saturday and Sunday are called...","Weekend","Weekday","Holiday","Weekend"),
        ("Monday is a...","Weekday","Weekend","Holiday","Weekday"),
        ("If today is Sunday, yesterday was...","Saturday","Friday","Monday","Saturday"),
        ("How many weekdays are there?","5","7","2","5"),
        ("Which day comes right after Saturday?","Sunday","Monday","Friday","Sunday"),
        ("Wednesday is in the ___ of the week.","Middle","Beginning","End","Middle"),
        ("Which day starts with 'T'?","Tuesday","Monday","Saturday","Tuesday"),
        ("Which two days start with 'S'?","Saturday and Sunday","Sunday and Monday","Friday and Saturday","Saturday and Sunday"),
    ]
]
write_js("english-7.js", "english7", {
    "id":"english-7","title":"Level 7: Days of the Week","badge":"Kelas 2","icon":"📅",
    "description":"Learn the 7 days of the week in English.",
    "lessons": [
        {"id":"eng7_1","title":"Days of the Week","icon":"📅","difficulty":"Mudah","duration":"12 menit",
         "content": rich_vocab_content(en7_vocab[:7], "There are 7 days in a week: Mon, Tue, Wed, Thu, Fri, Sat, Sun"),
         "questions": make_unique_quiz(en7_vocab[:7], pool=en7_vocab)},
        {"id":"eng7_2","title":"Weekday vs Weekend","icon":"🎉","difficulty":"Mudah","duration":"12 menit",
         "content": rich_vocab_content(en7_vocab, "Weekday = Senin-Jumat (hari kerja). Weekend = Sabtu-Minggu (akhir pekan)."),
         "questions": make_unique_quiz(en7_vocab, pool=en7_vocab)},
        {"id":"eng7_3","title":"Days Quiz","icon":"🏆","difficulty":"Sedang","duration":"15 menit",
         "content": rich_vocab_content(en7_vocab[:7], "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday — hafal urutan ini!"),
         "questions": make_grammar_quiz(en7_grammar_formatted)},
    ]
})
print("english-7.js done")

# EN-8: Months of the Year
en8_vocab = [
    ("January","Januari","❄️"),("February","Februari","❤️"),("March","Maret","🌸"),
    ("April","April","🌧️"),("May","Mei","🌺"),("June","Juni","☀️"),("July","Juli","🏖️"),
    ("August","Agustus","🏅"),("September","September","🍂"),("October","Oktober","🎃"),
    ("November","November","🍁"),("December","Desember","🎄")
]
en8_grammar = [
    ("How many months are there in a year?",["12","10","11"],"12"),
    ("Which month comes after March?",["April","May","February"],"April"),
    ("Which month comes before July?",["June","August","May"],"June"),
    ("The first month of the year is...",["January","February","December"],"January"),
    ("The last month of the year is...",["December","November","January"],"December"),
    ("Which month has Valentine's Day?",["February","January","March"],"February"),
    ("Christmas is in...",["December","November","January"],"December"),
    ("Independence Day of Indonesia is in...",["August","July","September"],"August"),
    ("Which month comes after October?",["November","December","September"],"November"),
    ("Which month comes before April?",["March","May","February"],"March"),
    ("June is the ___ month of the year.",["6th","5th","7th"],"6th"),
    ("September, October, November are in which season (in some countries)?",["Autumn/Fall","Spring","Summer"],"Autumn/Fall"),
    ("Which month has 28 or 29 days?",["February","January","March"],"February"),
    ("July and August are usually...",["Summer months","Winter months","Spring months"],"Summer months"),
    ("Which months start with the letter 'J'?",["January, June, July","January, February, March","June, July, August"],"January, June, July"),
]
write_js("english-8.js", "english8", {
    "id":"english-8","title":"Level 8: Months of the Year","badge":"Kelas 3","icon":"🗓️",
    "description":"Learn the 12 months of the year in English.",
    "lessons": [
        {"id":"eng8_1","title":"Months 1-6","icon":"❄️","difficulty":"Mudah","duration":"12 menit",
         "content": rich_vocab_content(en8_vocab[:6], "The year starts with January and ends with December!"),
         "questions": make_unique_quiz(en8_vocab[:6], pool=en8_vocab)},
        {"id":"eng8_2","title":"Months 7-12","icon":"🍂","difficulty":"Mudah","duration":"12 menit",
         "content": rich_vocab_content(en8_vocab[6:], "July (Ke-7) sampai December (Ke-12)."),
         "questions": make_unique_quiz(en8_vocab[6:], pool=en8_vocab)},
        {"id":"eng8_3","title":"Months Quiz","icon":"🏆","difficulty":"Sedang","duration":"15 menit",
         "content": rich_vocab_content(en8_vocab, "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec"),
         "questions": make_grammar_quiz(en8_grammar)},
    ]
})
print("english-8.js done")

# EN-9: Greetings
en9_vocab = [
    ("Hello","Halo","👋"),("Good morning","Selamat pagi","🌅"),("Good afternoon","Selamat siang","☀️"),
    ("Good evening","Selamat sore","🌆"),("Good night","Selamat malam","🌙"),("Goodbye","Sampai jumpa","👋"),
    ("Thank you","Terima kasih","🙏"),("You're welcome","Sama-sama","😊"),("Please","Tolong/Silakan","🤲"),
    ("Sorry","Maaf","😔"),("Excuse me","Permisi","🙋"),("How are you?","Apa kabar?","❓"),
    ("I'm fine","Saya baik-baik saja","😊"),("Nice to meet you","Senang bertemu denganmu","🤝")
]
en9_grammar = [
    ("You meet your teacher in the morning. What do you say?",["Good morning!","Good night!","Goodbye!"],"Good morning!"),
    ("Your friend helps you. What do you say?",["Thank you!","Sorry!","Excuse me!"],"Thank you!"),
    ("Someone says 'Thank you' to you. You reply...",["You're welcome!","Good morning!","Sorry!"],"You're welcome!"),
    ("You accidentally bump into someone. What do you say?",["Sorry! / Excuse me!","Thank you!","Good morning!"],"Sorry! / Excuse me!"),
    ("You want to leave. What do you say?",["Goodbye!","Hello!","Good morning!"],"Goodbye!"),
    ("You meet a new friend. You say...",["Nice to meet you!","Goodbye!","Thank you!"],"Nice to meet you!"),
    ("Someone asks 'How are you?' You reply...",["I'm fine, thank you!","Good morning!","Goodbye!"],"I'm fine, thank you!"),
    ("You greet someone at 7 PM (malam). You say...",["Good evening!","Good morning!","Good afternoon!"],"Good evening!"),
    ("You want someone to pass the salt. You say...",["Please pass the salt.","Sorry!","Goodbye!"],"Please pass the salt."),
    ("You are leaving school. You say...",["Goodbye! See you tomorrow!","Good morning!","Thank you!"],"Goodbye! See you tomorrow!"),
    ("'Hello' in Indonesian is...",["Halo","Selamat tinggal","Terima kasih"],"Halo"),
    ("'Selamat pagi' in English is...",["Good morning","Good night","Good evening"],"Good morning"),
    ("'Terima kasih' in English is...",["Thank you","Sorry","Please"],"Thank you"),
    ("'Maaf' in English is...",["Sorry","Hello","Goodbye"],"Sorry"),
    ("To get someone's attention politely, you say...",["Excuse me!","Goodbye!","Thank you!"],"Excuse me!"),
]
write_js("english-9.js", "english9", {
    "id":"english-9","title":"Level 9: Greetings & Expressions","badge":"Kelas 2-3","icon":"👋",
    "description":"Learn how to greet people and express feelings in English.",
    "lessons": [
        {"id":"eng9_1","title":"Greetings (Salam)","icon":"👋","difficulty":"Mudah","duration":"12 menit",
         "content": rich_vocab_content(en9_vocab[:7], "Use greetings based on the time of day! Morning, afternoon, or evening."),
         "questions": make_unique_quiz(en9_vocab[:7], pool=en9_vocab)},
        {"id":"eng9_2","title":"Polite Expressions","icon":"🙏","difficulty":"Mudah","duration":"12 menit",
         "content": rich_vocab_content(en9_vocab[6:], "Being polite is very important! Always say please, thank you, and sorry."),
         "questions": make_unique_quiz(en9_vocab[6:], pool=en9_vocab)},
        {"id":"eng9_3","title":"Greetings in Context","icon":"🏆","difficulty":"Sedang","duration":"15 menit",
         "content": rich_vocab_content(en9_vocab, "Practice using these phrases in real conversations!"),
         "questions": make_grammar_quiz(en9_grammar)},
    ]
})
print("english-9.js done")

# EN-10: Pronouns & To Be
en10_vocab = [
    ("I am","Saya adalah","👤"),("You are","Kamu adalah","👉"),("He is","Dia (L) adalah","👨"),
    ("She is","Dia (P) adalah","👩"),("We are","Kami/Kita adalah","👥"),("They are","Mereka adalah","👫"),
    ("It is","Itu adalah","🔹"),("I have","Saya punya","✋"),("He has","Dia (L) punya","👨"),("She has","Dia (P) punya","👩"),
]
en10_grammar = [
    ("'Saya adalah seorang siswa.' In English: I ___ a student.",["am","is","are"],"am"),
    ("'Dia (perempuan) adalah guru.' In English: She ___ a teacher.",["is","am","are"],"is"),
    ("'Kami adalah teman.' In English: We ___ friends.",["are","is","am"],"are"),
    ("'Mereka adalah dokter.' In English: They ___ doctors.",["are","is","am"],"are"),
    ("'Kamu adalah pintar.' In English: You ___ smart.",["are","is","am"],"are"),
    ("'Itu adalah kucing.' In English: It ___ a cat.",["is","am","are"],"is"),
    ("'Dia (laki) adalah ayahku.' In English: He ___ my father.",["is","am","are"],"is"),
    ("I use ___ for 'I'.",["am","is","are"],"am"),
    ("He/She/It uses ___ .",["is","am","are"],"is"),
    ("You/We/They use ___ .",["are","am","is"],"are"),
    ("'I have a dog.' Artinya...",["Saya punya anjing","Saya adalah anjing","Anjing saya"],"Saya punya anjing"),
    ("'She has a book.' Artinya...",["Dia punya buku","Dia adalah buku","Buku dia"],"Dia punya buku"),
    ("'He has' digunakan untuk...",["Dia (laki-laki)","Saya","Kamu"],"Dia (laki-laki)"),
    ("Pilih kalimat yang benar!",["She is my sister.","She am my sister.","She are my sister."],"She is my sister."),
    ("Pilih kalimat yang benar!",["They are my friends.","They is my friends.","They am my friends."],"They are my friends."),
]
write_js("english-10.js", "english10", {
    "id":"english-10","title":"Level 10: Pronouns & To Be","badge":"Kelas 3","icon":"🔤",
    "description":"Learn personal pronouns and to be verbs (am, is, are) in English.",
    "lessons": [
        {"id":"eng10_1","title":"Personal Pronouns","icon":"👤","difficulty":"Mudah","duration":"12 menit",
         "content": rich_vocab_content(en10_vocab[:6],
             "I → am | He/She/It → is | You/We/They → are",
             "<div class='bg-blue-50 border-4 border-blue-200 rounded-2xl p-4 mt-2'>"
             "<div class='grid grid-cols-3 gap-2 text-center font-bold'>"
             "<div class='bg-pink-100 rounded-xl p-2'>I → <b>am</b></div>"
             "<div class='bg-blue-100 rounded-xl p-2'>He/She/It → <b>is</b></div>"
             "<div class='bg-emerald-100 rounded-xl p-2'>You/We/They → <b>are</b></div>"
             "</div></div>"),
         "questions": make_unique_quiz(en10_vocab[:6], pool=en10_vocab)},
        {"id":"eng10_2","title":"To Be: am, is, are","icon":"🔤","difficulty":"Sedang","duration":"15 menit",
         "content": rich_vocab_content(en10_vocab, "Rumus: Subjek + to be + keterangan"),
         "questions": make_unique_quiz(en10_vocab, pool=en10_vocab)},
        {"id":"eng10_3","title":"Pronouns & To Be Quiz","icon":"🏆","difficulty":"Sulit","duration":"15 menit",
         "content": rich_vocab_content(en10_vocab, "Practice: I am... / She is... / They are..."),
         "questions": make_grammar_quiz(en10_grammar)},
    ]
})
print("english-10.js done")

# EN-11 to EN-25: Advanced levels
advanced_en_levels = [
    (11, "Simple Sentences", "Kelas 3", "💬",
     [("I eat rice","Saya makan nasi","🍚"),("She drinks milk","Dia minum susu","🥛"),
      ("He reads a book","Dia membaca buku","📚"),("We play ball","Kami main bola","⚽"),
      ("They run fast","Mereka lari cepat","🏃"),("I like cats","Saya suka kucing","🐱"),
      ("She has a dog","Dia punya anjing","🐶"),("He goes to school","Dia pergi ke sekolah","🏫"),
      ("We eat together","Kami makan bersama","🍽️"),("I love my family","Saya cinta keluargaku","❤️"),
      ("The bird flies","Burung itu terbang","🐦"),("Fish swim in water","Ikan berenang di air","🐟"),
      ("My mother cooks","Ibuku memasak","👩‍🍳"),("We live in a house","Kami tinggal di rumah","🏠")],
     "Subject + Verb + Object = Simple sentence! (Subjek + Kata Kerja + Objek)",
     [("Subject of 'I eat rice' is...",["I","eat","rice"],"I"),
      ("Verb of 'She drinks milk' is...",["drinks","She","milk"],"drinks"),
      ("Object of 'He reads a book' is...",["a book","He","reads"],"a book"),
      ("'Saya suka kucing.' In English:",["I like cats.","I am cats.","Cats like I."],"I like cats."),
      ("'Mereka berlari cepat.' In English:",["They run fast.","They runs fast.","Fast they run."],"They run fast."),
      ("'Dia membaca buku.' In English:",["He reads a book.","He read a book.","He reading a book."],"He reads a book."),
      ("'Kami bermain bola.' In English:",["We play ball.","We plays ball.","Ball we play."],"We play ball."),
      ("'Ibuku memasak.' In English:",["My mother cooks.","My mother cook.","Mother my cooks."],"My mother cooks."),
      ("Choose the correct sentence:",["I eat dinner.","I eats dinner.","I eating dinner."],"I eat dinner."),
      ("Choose the correct sentence:",["She likes dogs.","She like dogs.","She liking dogs."],"She likes dogs."),
      ("'Ikan berenang di air.' In English:",["Fish swim in water.","Fish swims in water.","Fish swimming water."],"Fish swim in water."),
      ("'Kami tinggal di rumah.' In English:",["We live in a house.","We lives in a house.","House we live."],"We live in a house."),
      ("The verb in 'Burung itu terbang' (The bird flies) is:",["flies","bird","The"],"flies"),
      ("'I love my family.' Artinya:",["Saya cinta keluargaku","Keluargaku cinta saya","Saya benci keluargaku"],"Saya cinta keluargaku"),
      ("A simple sentence needs at least...",["Subject and Verb","Only a verb","Only a noun"],"Subject and Verb"),
     ]),
    (12, "Verbs - Action Words", "Kelas 3-4", "🏃",
     [("Run","Berlari","🏃"),("Jump","Melompat","🤸"),("Eat","Makan","🍽️"),("Drink","Minum","🥤"),
      ("Sleep","Tidur","😴"),("Read","Membaca","📖"),("Write","Menulis","✍️"),("Swim","Berenang","🏊"),
      ("Fly","Terbang","🦅"),("Sing","Bernyanyi","🎵"),("Dance","Menari","💃"),("Draw","Menggambar","🎨"),
      ("Cook","Memasak","👩‍🍳"),("Play","Bermain","🎮")],
     "Action verbs describe what people or animals DO!",
     [("'Berlari' in English is...",["Run","Jump","Fly"],"Run"),
      ("'Berenang' in English is...",["Swim","Dance","Sleep"],"Swim"),
      ("'Menyanyi' in English is...",["Sing","Read","Write"],"Sing"),
      ("'Melompat' in English is...",["Jump","Run","Cook"],"Jump"),
      ("'Menari' in English is...",["Dance","Fly","Eat"],"Dance"),
      ("'Menggambar' in English is...",["Draw","Write","Read"],"Draw"),
      ("'Memasak' in English is...",["Cook","Eat","Drink"],"Cook"),
      ("She ___ (menari) at the party.",["dances","dance","dancing"],"dances"),
      ("They ___ (berlari) every morning.",["run","runs","running"],"run"),
      ("He ___ (memasak) dinner every night.",["cooks","cook","cooked"],"cooks"),
      ("Birds ___ (terbang) in the sky.",["fly","flies","flying"],"fly"),
      ("I ___ (menggambar) a picture.",["draw","draws","drew"],"draw"),
      ("She ___ (membaca) a book every day.",["reads","read","reading"],"reads"),
      ("We ___ (bermain) in the park.",["play","plays","played"],"play"),
      ("Fish ___ (berenang) in the ocean.",["swim","swims","swimming"],"swim"),
     ]),
    (13, "Adjectives", "Kelas 4", "✨",
     [("Big","Besar","🐘"),("Small","Kecil","🐭"),("Hot","Panas","🔥"),("Cold","Dingin","❄️"),
      ("Fast","Cepat","⚡"),("Slow","Lambat","🐢"),("Beautiful","Cantik/Indah","🌸"),("Ugly","Jelek","💀"),
      ("Happy","Senang","😊"),("Sad","Sedih","😢"),("Smart","Pintar","🧠"),("Strong","Kuat","💪"),
      ("Tall","Tinggi","📏"),("Short","Pendek","📏")],
     "Adjectives describe NOUNS (kata sifat menjelaskan kata benda). The BIG dog. The SMALL cat.",
     [("'Besar' in English is...",["Big","Small","Fast"],"Big"),
      ("'Dingin' in English is...",["Cold","Hot","Slow"],"Cold"),
      ("'Cantik/Indah' in English is...",["Beautiful","Ugly","Sad"],"Beautiful"),
      ("'Pintar' in English is...",["Smart","Strong","Happy"],"Smart"),
      ("Lawan kata 'Big' adalah...",["Small","Tall","Hot"],"Small"),
      ("Lawan kata 'Hot' adalah...",["Cold","Slow","Sad"],"Cold"),
      ("Lawan kata 'Happy' adalah...",["Sad","Ugly","Small"],"Sad"),
      ("'The ___ elephant.' (adjective yang cocok untuk gajah)",["Big","Small","Tiny"],"Big"),
      ("'The ___ cheetah.' (hewan tercepat)",["Fast","Slow","Cold"],"Fast"),
      ("Kalimat yang menggunakan adjective dengan benar:",["She is beautiful.","She is beauty.","She is beautify."],"She is beautiful."),
      ("'Tinggi' in English is...",["Tall","Short","Big"],"Tall"),
      ("'Kuat' in English is...",["Strong","Smart","Slow"],"Strong"),
      ("'Sedih' in English is...",["Sad","Happy","Ugly"],"Sad"),
      ("'Lambat' in English is...",["Slow","Fast","Cold"],"Slow"),
      ("Adjective describes a...",["Noun","Verb","Pronoun"],"Noun"),
     ]),
    (14, "Present Tense", "Kelas 4", "📝",
     [("I play","Saya bermain","🎮"),("She plays","Dia bermain","🎮"),("He eats","Dia makan","🍽️"),
      ("They eat","Mereka makan","🍽️"),("We study","Kami belajar","📚"),("She studies","Dia belajar","📚"),
      ("He works","Dia bekerja","💼"),("I go to school","Saya pergi ke sekolah","🏫"),
      ("She goes to school","Dia pergi ke sekolah","🏫"),("They live in Jakarta","Mereka tinggal di Jakarta","🏙️"),
      ("It runs","Itu berlari","🏃"),("We love music","Kami suka musik","🎵"),
      ("He reads","Dia membaca","📖"),("I wake up early","Saya bangun pagi","⏰")],
     "He/She/It + verb + S or ES | I/You/We/They + base verb (tanpa S)",
     [("I ___ (play) football every Sunday.",["play","plays","playing"],"play"),
      ("She ___ (play) football every Sunday.",["plays","play","playing"],"plays"),
      ("He ___ (eat) rice for lunch.",["eats","eat","eating"],"eats"),
      ("They ___ (eat) rice for lunch.",["eat","eats","eating"],"eat"),
      ("We ___ (study) English every day.",["study","studies","studying"],"study"),
      ("She ___ (study) English every day.",["studies","study","studying"],"studies"),
      ("He ___ (go) to school by bus.",["goes","go","going"],"goes"),
      ("I ___ (go) to school by bus.",["go","goes","going"],"go"),
      ("It ___ (run) very fast.",["runs","run","running"],"runs"),
      ("The rule: He/She/It + verb + ___",["s or es","ing","ed"],"s or es"),
      ("Choose the correct form:",["She reads books.","She read books.","She reading books."],"She reads books."),
      ("Choose the correct form:",["They play games.","They plays games.","They playing games."],"They play games."),
      ("'Dia (L) belajar bahasa Inggris.' In English:",["He studies English.","He study English.","He studying English."],"He studies English."),
      ("'Kami tinggal di Jakarta.' In English:",["We live in Jakarta.","We lives in Jakarta.","We living Jakarta."],"We live in Jakarta."),
      ("Which sentence is CORRECT?",["I wake up early.","I wakes up early.","I waking up early."],"I wake up early."),
     ]),
    (15, "Past Tense", "Kelas 4-5", "⏮️",
     [("I went","Saya pergi (dulu)","⏮️"),("She ate","Dia makan (dulu)","🍽️"),("He played","Dia bermain (dulu)","🎮"),
      ("We studied","Kami belajar (dulu)","📚"),("They ran","Mereka berlari (dulu)","🏃"),
      ("I bought","Saya membeli (dulu)","🛒"),("She wrote","Dia menulis (dulu)","✍️"),
      ("He swam","Dia berenang (dulu)","🏊"),("We saw","Kami melihat (dulu)","👀"),
      ("I made","Saya membuat (dulu)","🔨"),("They had","Mereka punya (dulu)","👐"),
      ("She read","Dia membaca (dulu)","📖"),("He came","Dia datang (dulu)","🚶"),
      ("We went","Kami pergi (dulu)","🚶")],
     "Regular: tambah -ED (played, studied). Irregular: ganti kata (go→went, eat→ate, run→ran).",
     [("Yesterday, I ___ (go) to the market.",["went","go","goes"],"went"),
      ("She ___ (eat) pizza for dinner last night.",["ate","eat","eats"],"ate"),
      ("He ___ (play) football yesterday.",["played","play","plays"],"played"),
      ("They ___ (run) in the park this morning.",["ran","run","runs"],"ran"),
      ("We ___ (study) for the exam last week.",["studied","study","studies"],"studied"),
      ("I ___ (buy) a new book yesterday.",["bought","buy","buys"],"bought"),
      ("She ___ (write) a letter to her friend.",["wrote","write","writes"],"wrote"),
      ("He ___ (swim) in the pool yesterday.",["swam","swim","swims"],"swam"),
      ("Kata lampau dari 'go' adalah...",["went","goes","going"],"went"),
      ("Kata lampau dari 'eat' adalah...",["ate","eats","eating"],"ate"),
      ("Kata lampau dari 'run' adalah...",["ran","runs","running"],"ran"),
      ("Kata lampau dari 'make' adalah...",["made","makes","making"],"made"),
      ("Regular verb past tense dibentuk dengan...",["Tambah -ed","Ganti kata","Tambah -s"],"Tambah -ed"),
      ("'Played' adalah past tense dari...",["play","plays","playing"],"play"),
      ("Which sentence is PAST TENSE?",["She ate dinner.","She eats dinner.","She eating dinner."],"She ate dinner."),
     ]),
    (16, "Future Tense", "Kelas 5", "⏩",
     [("I will go","Saya akan pergi","⏩"),("She will eat","Dia akan makan","🍽️"),("He will play","Dia akan bermain","🎮"),
      ("We will study","Kami akan belajar","📚"),("They will run","Mereka akan berlari","🏃"),
      ("It will rain","Akan hujan","🌧️"),("I will buy","Saya akan membeli","🛒"),
      ("She will write","Dia akan menulis","✍️"),("We will travel","Kami akan bepergian","✈️"),
      ("They will win","Mereka akan menang","🏆"),("I will be a doctor","Saya akan jadi dokter","👨‍⚕️"),
      ("He will come","Dia akan datang","🚶"),("We will cook","Kami akan memasak","👨‍🍳"),
      ("She will sing","Dia akan bernyanyi","🎵")],
     "Future tense: WILL + base verb (kata dasar, tanpa -s, -ed, -ing).",
     [("Tomorrow, I ___ (go) to school.",["will go","went","go"],"will go"),
      ("She ___ (eat) dinner at 7 PM.",["will eat","ate","eats"],"will eat"),
      ("They ___ (win) the game tomorrow.",["will win","won","wins"],"will win"),
      ("It ___ (rain) this afternoon.",["will rain","rained","rains"],"will rain"),
      ("We ___ (travel) to Bali next month.",["will travel","traveled","travels"],"will travel"),
      ("Rumus future tense adalah...",["will + base verb","is/am/are + verb","verb + ed"],"will + base verb"),
      ("'Dia akan bermain.' In English:",["He will play.","He played.","He plays."],"He will play."),
      ("'Kami akan belajar besok.' In English:",["We will study tomorrow.","We studied tomorrow.","We study tomorrow."],"We will study tomorrow."),
      ("'Will' diikuti oleh...",["Base verb (kata dasar)","Verb + s","Verb + ed"],"Base verb (kata dasar)"),
      ("Choose the correct future sentence:",["I will be a doctor.","I will am a doctor.","I will being a doctor."],"I will be a doctor."),
      ("'She will sing.' Artinya...",["Dia akan bernyanyi","Dia bernyanyi","Dia sudah bernyanyi"],"Dia akan bernyanyi"),
      ("'I will buy a book.' Artinya...",["Saya akan membeli buku","Saya membeli buku","Saya sudah membeli buku"],"Saya akan membeli buku"),
      ("Which word shows FUTURE?",["will","went","am"],"will"),
      ("'Saya akan jadi dokter.' In English:",["I will be a doctor.","I am a doctor.","I was a doctor."],"I will be a doctor."),
      ("Which sentence is FUTURE TENSE?",["He will come tomorrow.","He came yesterday.","He comes every day."],"He will come tomorrow."),
     ]),
    (17, "Prepositions", "Kelas 5", "📍",
     [("In","Di dalam","📦"),("On","Di atas (permukaan)","📋"),("Under","Di bawah","⬇️"),
      ("Behind","Di belakang","↩️"),("In front of","Di depan","⬆️"),("Next to","Di sebelah","↔️"),
      ("Between","Di antara","↕️"),("Above","Di atas (jauh)","🆙"),("Below","Di bawah (jauh)","⬇️"),
      ("Near","Dekat","📍"),("Far from","Jauh dari","🗺️"),("Inside","Di dalam","📦"),
      ("Outside","Di luar","🌳"),("Beside","Di samping","↔️")],
     "Prepositions show WHERE something is: in (di dalam), on (di atas permukaan), under (di bawah).",
     [("The book is ___ the table. (di atas meja)",["on","in","under"],"on"),
      ("The cat is ___ the box. (di dalam kotak)",["in","on","above"],"in"),
      ("The ball is ___ the chair. (di bawah kursi)",["under","on","in"],"under"),
      ("The school is ___ my house. (di depan rumah)",["in front of","behind","next to"],"in front of"),
      ("My bag is ___ the door. (di belakang pintu)",["behind","in front of","above"],"behind"),
      ("The park is ___ the library. (di sebelah perpustakaan)",["next to","under","above"],"next to"),
      ("'Di antara' in English is...",["between","next to","behind"],"between"),
      ("'Di samping' in English is...",["beside","in","on"],"beside"),
      ("'Dekat' in English is...",["near","far from","above"],"near"),
      ("The lamp is ___ the ceiling. (di atas, jauh)",["above","on","under"],"above"),
      ("'In' digunakan untuk...",["Di dalam (tertutup)","Di atas permukaan","Di bawah"],"Di dalam (tertutup)"),
      ("'On' digunakan untuk...",["Di atas permukaan","Di dalam","Di bawah"],"Di atas permukaan"),
      ("The fish is ___ the water. (di dalam air)",["in","on","above"],"in"),
      ("The bird is ___ the tree. (di atas pohon, jauh)",["above","on","under"],"above"),
      ("'Di luar' in English is...",["outside","inside","beside"],"outside"),
     ]),
    (18, "Question Words", "Kelas 5", "❓",
     [("What","Apa","❓"),("Where","Di mana","📍"),("When","Kapan","📅"),("Who","Siapa","🙋"),
      ("Why","Mengapa","💭"),("How","Bagaimana","🤔"),("Which","Yang mana","🔀"),
      ("How many","Berapa banyak (bisa dihitung)","🔢"),("How much","Berapa banyak/harganya","💰"),
      ("How long","Berapa lama","⏱️"),("How often","Seberapa sering","📆"),
      ("How old","Berapa umur","🎂"),("Whose","Milik siapa","👤"),("What time","Jam berapa","⏰")],
     "Question words diletakkan di AWAL kalimat tanya! What is this? Where do you live?",
     [("___ is your name? (Siapa namamu?)",["What","Where","When"],"What"),
      ("___ do you live? (Di mana kamu tinggal?)",["Where","When","Who"],"Where"),
      ("___ is your birthday? (Kapan ulang tahunmu?)",["When","What","Why"],"When"),
      ("___ is your teacher? (Siapa gurumu?)",["Who","What","Where"],"Who"),
      ("___ do you study English? (Mengapa kamu belajar bahasa Inggris?)",["Why","How","Which"],"Why"),
      ("___ do you go to school? (Bagaimana kamu pergi ke sekolah?)",["How","What","Where"],"How"),
      ("___ apples do you want? (Berapa banyak apel?)",["How many","How much","How long"],"How many"),
      ("___ is this bag? (Berapa harga tas ini?)",["How much","How many","How long"],"How much"),
      ("___ old are you? (Berapa umurmu?)",["How","What","Where"],"How"),
      ("___ color do you like? (Warna mana yang kamu suka?)",["Which","What","Where"],"Which"),
      ("'Siapa' in English is...",["Who","What","Where"],"Who"),
      ("'Mengapa' in English is...",["Why","How","What"],"Why"),
      ("'Kapan' in English is...",["When","Where","Who"],"When"),
      ("'Bagaimana' in English is...",["How","Why","What"],"How"),
      ("'Milik siapa' in English is...",["Whose","Who","Which"],"Whose"),
     ]),
    (19, "Short Dialogues", "Kelas 5-6", "💬",
     [("What is your name?","Siapa namamu?","🙋"),("My name is Alin.","Namaku Alin.","😊"),
      ("How are you?","Apa kabar?","👋"),("I am fine, thank you.","Saya baik-baik saja, terima kasih.","😊"),
      ("Where do you live?","Di mana kamu tinggal?","🏠"),("I live in Jakarta.","Saya tinggal di Jakarta.","📍"),
      ("How old are you?","Berapa umurmu?","🎂"),("I am 8 years old.","Saya berumur 8 tahun.","🎈"),
      ("What do you like?","Apa yang kamu suka?","❤️"),("I like drawing.","Saya suka menggambar.","🎨"),
      ("Do you have a pet?","Apakah kamu punya hewan peliharaan?","🐾"),("Yes, I have a cat.","Ya, saya punya kucing.","🐱"),
      ("What is your hobby?","Apa hobimu?","🎯"),("My hobby is reading.","Hobiku membaca.","📚")],
     "Dialogue = percakapan! Practice speaking with a friend using these phrases.",
     [("A: 'What is your name?' B: '___'",["My name is Alin.","I am fine.","I live in Jakarta."],"My name is Alin."),
      ("A: 'How are you?' B: '___'",["I am fine, thank you!","My name is Budi.","I am 10 years old."],"I am fine, thank you!"),
      ("A: 'Where do you live?' B: '___'",["I live in Bandung.","I am fine.","I like soccer."],"I live in Bandung."),
      ("A: 'How old are you?' B: '___'",["I am 9 years old.","I live in Jakarta.","Yes, I have a cat."],"I am 9 years old."),
      ("A: 'What do you like?' B: '___'",["I like reading.","I am 10 years old.","I live in Surabaya."],"I like reading."),
      ("A: 'Do you have a pet?' B: '___'",["Yes, I have a dog.","I am fine.","My name is Ani."],"Yes, I have a dog."),
      ("A: 'What is your hobby?' B: '___'",["My hobby is drawing.","I am 8 years old.","I live in Bali."],"My hobby is drawing."),
      ("'Siapa namamu?' in English is...",["What is your name?","How old are you?","Where do you live?"],"What is your name?"),
      ("'Apa kabar?' in English is...",["How are you?","Who are you?","What is your name?"],"How are you?"),
      ("'Berapa umurmu?' in English is...",["How old are you?","How are you?","Where do you live?"],"How old are you?"),
      ("'Apa hobimu?' in English is...",["What is your hobby?","What do you like?","Do you have a pet?"],"What is your hobby?"),
      ("Response to 'How are you?' is...",["I am fine!","My name is...","I live in..."],"I am fine!"),
      ("'Di mana kamu tinggal?' in English is...",["Where do you live?","How are you?","Who are you?"],"Where do you live?"),
      ("'Saya suka membaca.' in English is...",["I like reading.","I am reading.","I read yesterday."],"I like reading."),
      ("'Saya berumur 10 tahun.' in English is...",["I am 10 years old.","I have 10 years.","My age is 10 years."],"I am 10 years old."),
     ]),
    (20, "Comparative", "Kelas 6", "📊",
     [("Bigger","Lebih besar","🐘"),("Smaller","Lebih kecil","🐭"),("Faster","Lebih cepat","⚡"),
      ("Slower","Lebih lambat","🐢"),("Better","Lebih baik","👍"),("Worse","Lebih buruk","👎"),
      ("Taller","Lebih tinggi","📏"),("Shorter","Lebih pendek","📏"),("Smarter","Lebih pintar","🧠"),
      ("Heavier","Lebih berat","⚖️"),("Lighter","Lebih ringan","🪶"),("Older","Lebih tua","👴"),
      ("Younger","Lebih muda","👶"),("More beautiful","Lebih cantik","🌹")],
     "Comparative: adj + -er + THAN (big→bigger, tall→taller) OR more + adj + than (beautiful→more beautiful than).",
     [("An elephant is ___ than a mouse.",["bigger","smaller","faster"],"bigger"),
      ("A cheetah is ___ than a turtle.",["faster","slower","heavier"],"faster"),
      ("This book is ___ than that book. (lebih baik)",["better","worse","older"],"better"),
      ("My sister is ___ than me. (lebih muda)",["younger","older","shorter"],"younger"),
      ("A feather is ___ than a rock. (lebih ringan)",["lighter","heavier","slower"],"lighter"),
      ("Cara bentuk comparative dari 'big' adalah...",["bigger","more big","bigest"],"bigger"),
      ("Cara bentuk comparative dari 'beautiful' adalah...",["more beautiful","beautifuler","most beautiful"],"more beautiful"),
      ("'Lebih cepat' in English is...",["faster","slower","fastest"],"faster"),
      ("'Lebih tua' in English is...",["older","younger","oldest"],"older"),
      ("Dalam comparative, kita menggunakan kata...",["than","the","is"],"than"),
      ("'She is taller than me.' Artinya...",["Dia lebih tinggi dari saya","Saya lebih tinggi dari dia","Dia yang tertinggi"],"Dia lebih tinggi dari saya"),
      ("Comparative dari 'good' adalah... (tidak beraturan!)",["better","gooder","more good"],"better"),
      ("Comparative dari 'bad' adalah... (tidak beraturan!)",["worse","badder","more bad"],"worse"),
      ("'This car is faster than that car.' Artinya...",["Mobil ini lebih cepat dari mobil itu","Mobil itu lebih cepat","Kedua mobil sama cepatnya"],"Mobil ini lebih cepat dari mobil itu"),
      ("Kata 'than' digunakan dalam...",["Comparative (perbandingan)","Superlative","Biasa saja"],"Comparative (perbandingan)"),
     ]),
    (21, "Superlative", "Kelas 6", "🏆",
     [("The biggest","Yang terbesar","🏆"),("The smallest","Yang terkecil","🥇"),("The fastest","Yang tercepat","⚡"),
      ("The slowest","Yang terlambat","🐢"),("The best","Yang terbaik","🥇"),("The worst","Yang terburuk","💔"),
      ("The oldest","Yang tertua","👴"),("The youngest","Yang termuda","👶"),("The tallest","Yang tertinggi","📏"),
      ("The most beautiful","Yang tercantik","🌹"),("The most popular","Yang terpopuler","⭐"),
      ("The most expensive","Yang termahal","💎"),("The happiest","Yang paling bahagia","😊"),
      ("The most intelligent","Yang paling cerdas","🧠")],
     "Superlative: THE + adj + -EST (biggest, tallest) OR THE MOST + adj (most beautiful). Digunakan untuk SATU yang paling!",
     [("Mount Everest is ___ mountain in the world.",["the tallest","taller","tall"],"the tallest"),
      ("The cheetah is ___ animal on land.",["the fastest","faster","fast"],"the fastest"),
      ("This is ___ book I have ever read. (terbaik)",["the best","the better","the most good"],"the best"),
      ("She is ___ student in the class. (tercerdas)",["the most intelligent","more intelligent","intelligent"],"the most intelligent"),
      ("Superlative dari 'big' adalah...",["the biggest","the bigger","the most big"],"the biggest"),
      ("Superlative dari 'beautiful' adalah...",["the most beautiful","the beautifullest","the more beautiful"],"the most beautiful"),
      ("Superlative dari 'good' adalah...",["the best","the better","the goodest"],"the best"),
      ("Superlative dari 'bad' adalah...",["the worst","the baddest","the most bad"],"the worst"),
      ("'The most popular' berarti...",["Yang terpopuler","Yang lebih populer","Populer"],"Yang terpopuler"),
      ("Superlative selalu menggunakan kata...",["the","a","an"],"the"),
      ("'Yang termuda' in English is...",["the youngest","the younger","youngest"],"the youngest"),
      ("'Yang termahal' in English is...",["the most expensive","the more expensive","expensivest"],"the most expensive"),
      ("Perbedaan comparative dan superlative:",["Comparative: 2 benda. Superlative: 3+ benda","Sama saja","Superlative: 2 benda"],"Comparative: 2 benda. Superlative: 3+ benda"),
      ("'She is the happiest person.' Artinya...",["Dia orang yang paling bahagia","Dia lebih bahagia","Dia bahagia"],"Dia orang yang paling bahagia"),
      ("Which is SUPERLATIVE?",["The most expensive","More expensive","Expensive"],"The most expensive"),
     ]),
    (22, "Modal Verbs", "Kelas 6", "🔤",
     [("Can","Bisa/Dapat","✅"),("Cannot / Can't","Tidak bisa","❌"),("Must","Harus","⚠️"),
      ("Should","Seharusnya","💡"),("May","Boleh (izin)","🟢"),("Might","Mungkin","🤔"),
      ("Would","Akan (sopan/kondisional)","😊"),("Could","Bisa (lampau/permintaan sopan)","🔹"),
      ("Shall","Akan (formal/saran)","🔷"),("Need","Perlu","📌"),
      ("Must not","Dilarang","🚫"),("Should not","Sebaiknya tidak","⚠️"),
      ("Would like","Ingin (sopan)","😊"),("Could you...?","Bisakah kamu...? (sopan)","🙏")],
     "Modal verbs: can, could, may, might, must, should, will, would. Selalu diikuti BASE VERB (kata dasar)!",
     [("I ___ swim. (bisa berenang)",["can","cans","am can"],"can"),
      ("You ___ eat here. (tidak boleh = dilarang)",["must not","should","can"],"must not"),
      ("You ___ study hard. (seharusnya belajar keras)",["should","can","must not"],"should"),
      ("It ___ rain today. (mungkin akan hujan)",["might","must","can"],"might"),
      ("___ I use your pen? (Boleh saya pakai penamu?)",["May","Must","Should"],"May"),
      ("You ___ wear a seatbelt. (harus pakai sabuk)",["must","might","should"],"must"),
      ("She ___ speak three languages. (bisa)",["can","must","might"],"can"),
      ("___ you help me? (Bisakah kamu bantu saya? - sopan)",["Could","Must","Should"],"Could"),
      ("I ___ like some water. (ingin air - sopan)",["would","must","can"],"would"),
      ("'Might' berarti...",["Mungkin","Harus","Bisa"],"Mungkin"),
      ("'Must' berarti...",["Harus","Boleh","Mungkin"],"Harus"),
      ("'Should' berarti...",["Seharusnya","Harus","Tidak bisa"],"Seharusnya"),
      ("Modal verb diikuti oleh...",["Base verb (kata dasar)","Verb + s","Verb + ing"],"Base verb (kata dasar)"),
      ("'Can' menunjukkan...",["Kemampuan (ability)","Kewajiban","Larangan"],"Kemampuan (ability)"),
      ("Kalimat yang benar...",["She can sing beautifully.","She cans sing.","She can sings."],"She can sing beautifully."),
     ]),
    (23, "Reading Comprehension", "SMP", "📖",
     [("Main idea","Ide pokok","💡"),("Supporting detail","Rincian pendukung","📋"),("Inference","Kesimpulan tersirat","💭"),
      ("Vocabulary in context","Kosakata dalam konteks","📖"),("Author's purpose","Tujuan penulis","✏️"),
      ("Fact","Fakta (bisa dibuktikan)","✅"),("Opinion","Opini (pendapat)","💭"),
      ("Synonym","Sinonim (persamaan kata)","🔄"),("Antonym","Antonim (lawan kata)","↔️"),
      ("Sequence","Urutan kejadian","📊"),("Setting","Latar tempat/waktu","📍"),("Theme","Tema cerita","🎯"),
      ("Character","Tokoh","🎭"),("Conclusion","Kesimpulan","🏁")],
     "Read carefully! Look for the MAIN IDEA first, then supporting details. Always read the question before the text.",
     [("'Main idea' artinya...",["Ide pokok paragraf","Rincian kecil","Nama pengarang"],"Ide pokok paragraf"),
      ("'Jakarta is the capital of Indonesia.' This is a...",["Fact","Opinion","Inference"],"Fact"),
      ("'This book is very interesting.' This is an...",["Opinion","Fact","Main idea"],"Opinion"),
      ("Synonym of 'big' is...",["large","small","tiny"],"large"),
      ("Antonym of 'happy' is...",["sad","glad","joyful"],"sad"),
      ("'Setting' dalam cerita berarti...",["Latar tempat dan waktu","Nama tokoh","Tema cerita"],"Latar tempat dan waktu"),
      ("'Author's purpose' to entertain means...",["Menghibur pembaca","Memberi informasi","Membujuk pembaca"],"Menghibur pembaca"),
      ("'Inference' artinya...",["Menyimpulkan hal yang tidak tertulis langsung","Membaca cepat","Mencatat kata-kata"],"Menyimpulkan hal yang tidak tertulis langsung"),
      ("'Character' dalam cerita adalah...",["Tokoh dalam cerita","Tempat cerita","Waktu cerita"],"Tokoh dalam cerita"),
      ("Cara menemukan main idea:",["Cari kalimat yang merangkum paragraf","Baca kalimat terakhir saja","Hitung jumlah kata"],"Cari kalimat yang merangkum paragraf"),
      ("'Sequence' means...",["Order of events","Main character","Place of story"],"Order of events"),
      ("'Theme' adalah...",["Pesan atau nilai utama cerita","Nama tokoh utama","Tempat cerita"],"Pesan atau nilai utama cerita"),
      ("'Conclusion' artinya...",["Kesimpulan akhir","Awal cerita","Tokoh cerita"],"Kesimpulan akhir"),
      ("Synonym of 'fast' is...",["quick","slow","lazy"],"quick"),
      ("Antonym of 'old' is...",["young","ancient","elderly"],"young"),
     ]),
    (24, "Writing Skills", "SMP", "✍️",
     [("Introduction","Pendahuluan","📝"),("Body paragraph","Paragraf isi","📄"),("Conclusion","Kesimpulan","🏁"),
      ("Topic sentence","Kalimat topik","💡"),("Supporting detail","Rincian pendukung","📋"),
      ("Transition word","Kata penghubung","🔗"),("First","Pertama","1️⃣"),("Furthermore","Selain itu/Lebih lanjut","➕"),
      ("However","Namun/Tetapi","↩️"),("In conclusion","Sebagai kesimpulan","🏁"),
      ("Paragraph","Paragraf","📄"),("Essay","Esai","📝"),("Draft","Draf","✏️"),("Revise","Merevisi","🔄")],
     "A good paragraph: 1) Topic sentence | 2) 3 supporting details | 3) Concluding sentence.",
     [("Bagian pertama dari sebuah teks/esai disebut...",["Introduction","Conclusion","Body"],"Introduction"),
      ("'Topic sentence' adalah...",["Kalimat utama yang memperkenalkan topik","Kalimat penutup","Rincian pendukung"],"Kalimat utama yang memperkenalkan topik"),
      ("'Furthermore' digunakan untuk...",["Menambah informasi","Menyimpulkan","Memberi kontras"],"Menambah informasi"),
      ("'However' digunakan untuk...",["Memberi kontras/pertentangan","Menambah informasi","Menyimpulkan"],"Memberi kontras/pertentangan"),
      ("'In conclusion' digunakan di...",["Akhir paragraf/esai","Awal paragraf","Tengah paragraf"],"Akhir paragraf/esai"),
      ("Urutan yang benar dalam esai:",["Introduction → Body → Conclusion","Body → Introduction → Conclusion","Conclusion → Body → Introduction"],"Introduction → Body → Conclusion"),
      ("'First' adalah transition word untuk...",["Menyebutkan hal pertama","Memberi kontras","Menyimpulkan"],"Menyebutkan hal pertama"),
      ("'Draft' artinya...",["Tulisan pertama yang belum sempurna","Tulisan akhir","Judul esai"],"Tulisan pertama yang belum sempurna"),
      ("'Revise' artinya...",["Memperbaiki tulisan","Menulis ulang dari awal","Menghapus tulisan"],"Memperbaiki tulisan"),
      ("Sebuah paragraf yang baik memiliki...",["Kalimat topik + rincian + penutup","Hanya kalimat panjang","Hanya kalimat pendek"],"Kalimat topik + rincian + penutup"),
      ("'Essay' adalah...",["Tulisan panjang berisi argumen/penjelasan","Satu kalimat saja","Daftar kata-kata"],"Tulisan panjang berisi argumen/penjelasan"),
      ("'Supporting detail' adalah...",["Rincian yang mendukung kalimat topik","Kalimat pembuka","Kesimpulan"],"Rincian yang mendukung kalimat topik"),
      ("Transition word untuk menyimpulkan:",["In conclusion / Therefore","First / Second","However / But"],"In conclusion / Therefore"),
      ("Berapa banyak kalimat dalam satu paragraf minimal?",["3 kalimat","1 kalimat","10 kalimat"],"3 kalimat"),
      ("'Body paragraph' berisi...",["Rincian dan penjelasan utama","Pembuka esai","Penutup esai"],"Rincian dan penjelasan utama"),
     ]),
    (25, "Idioms & Expressions", "SMP", "💬",
     [("Break a leg!","Semoga berhasil!","🦵"),("Hit the books","Belajar sungguh-sungguh","📚"),
      ("Under the weather","Merasa kurang sehat","🌧️"),("Piece of cake","Sangat mudah","🎂"),
      ("Cost an arm and a leg","Sangat mahal","💰"),("Let the cat out of the bag","Bocorkan rahasia","🐱"),
      ("Bite the bullet","Tabah hadapi situasi sulit","💪"),("Hit the nail on the head","Tepat sasaran/benar","🔨"),
      ("Spill the beans","Bocorkan rahasia","🫘"),("Once in a blue moon","Sangat jarang terjadi","🌙"),
      ("It's raining cats and dogs","Hujan lebat","🌧️"),("The ball is in your court","Terserah kamu","⚽"),
      ("Bite off more than you can chew","Mengambil lebih dari kemampuan","😬"),("Beat around the bush","Tidak langsung ke inti","🌳")],
     "Idioms = ekspresi yang artinya BUKAN arti kata per kata! 'Break a leg' bukan 'Patahkan kakimu' tapi 'Semoga berhasil!'",
     [("'Break a leg!' means...",["Good luck!","Break your leg!","Run fast!"],"Good luck!"),
      ("'Hit the books' means...",["Study hard","Hit something","Read a book once"],"Study hard"),
      ("'Under the weather' means...",["Feeling sick","Raining outside","Standing outside"],"Feeling sick"),
      ("'Piece of cake' means...",["Very easy","A piece of cake (food)","Very tasty"],"Very easy"),
      ("'Cost an arm and a leg' means...",["Very expensive","Need surgery","A type of price tag"],"Very expensive"),
      ("'Let the cat out of the bag' means...",["Reveal a secret","Release a cat","Open a bag"],"Reveal a secret"),
      ("'Spill the beans' means...",["Reveal a secret","Drop some beans","Cook beans"],"Reveal a secret"),
      ("'Once in a blue moon' means...",["Very rarely","Once a month","When the moon is blue"],"Very rarely"),
      ("'Hit the nail on the head' means...",["Be exactly right","Hit something with a hammer","Build something"],"Be exactly right"),
      ("'Bite the bullet' means...",["Endure a difficult situation","Bite something hard","Shoot a gun"],"Endure a difficult situation"),
      ("'It's raining cats and dogs' means...",["Heavy rain","Animals are falling","It's very windy"],"Heavy rain"),
      ("'The ball is in your court' means...",["It's your decision/turn","Play basketball","Go to the court"],"It's your decision/turn"),
      ("Idiom berbeda dari kalimat biasa karena...",["Artinya tidak bisa diterjemahkan kata per kata","Menggunakan bahasa formal","Hanya digunakan dalam tulisan"],"Artinya tidak bisa diterjemahkan kata per kata"),
      ("'Bite off more than you can chew' artinya...",["Mengambil tugas melebihi kemampuan","Makan terlalu banyak","Menggigit dengan kuat"],"Mengambil tugas melebihi kemampuan"),
      ("'Beat around the bush' artinya...",["Tidak langsung ke inti pembicaraan","Memukul semak-semak","Bermain di taman"],"Tidak langsung ke inti pembicaraan"),
     ]),
]

for lvl, title, badge, icon, vocab, tip, grammar_qs in advanced_en_levels:
    chunk = max(1, len(vocab) // 3)
    lessons = []
    for n in range(3):
        vocab_slice = vocab[n*chunk:(n+1)*chunk] if n < 2 else vocab[n*chunk:]
        if not vocab_slice: vocab_slice = vocab[:chunk]
        content = rich_vocab_content(vocab_slice, tip if n == 0 else "")
        if n < 2:
            qs = make_unique_quiz(vocab_slice, count=15, pool=vocab)
        else:
            qs = make_grammar_quiz(grammar_qs, 15)
        lessons.append({
            "id": f"eng{lvl}_{n+1}", "title": f"Part {n+1}", "icon": icon,
            "difficulty": "Mudah" if n == 0 else ("Sedang" if n == 1 else "Sulit"),
            "duration": "15 menit", "content": content, "questions": qs
        })
    write_js(f"english-{lvl}.js", f"english{lvl}", {
        "id": f"english-{lvl}", "title": f"Level {lvl}: {title}", "badge": badge,
        "icon": icon, "description": title, "lessons": lessons
    })
    print(f"english-{lvl}.js done")

print("\n=== ALL ENGLISH & MATH DONE! ===")
