import os
import random
import json

base_dir = r"d:\Belajar\chanif.github.io\algo\data"

def write_file(filename, content):
    with open(os.path.join(base_dir, filename), 'w', encoding='utf-8') as f:
        f.write(content)

# ==========================================
# GENERATE MEMBACA (Levels 4 - 10)
# ==========================================
suku_kata = ['BA', 'CA', 'DA', 'FA', 'GA', 'HA', 'JA', 'KA', 'LA', 'MA', 'NA', 'PA', 'QA', 'RA', 'SA', 'TA', 'VA', 'WA', 'XA', 'YA', 'ZA',
             'BI', 'CI', 'DI', 'FI', 'GI', 'HI', 'JI', 'KI', 'LI', 'MI', 'NI', 'PI', 'QI', 'RI', 'SI', 'TI', 'VI', 'WI', 'XI', 'YI', 'ZI',
             'BU', 'CU', 'DU', 'FU', 'GU', 'HU', 'JU', 'KU', 'LU', 'MU', 'NU', 'PU', 'QU', 'RU', 'SU', 'TU', 'VU', 'WU', 'XU', 'YU', 'ZU',
             'BE', 'CE', 'DE', 'FE', 'GE', 'HE', 'JE', 'KE', 'LE', 'ME', 'NE', 'PE', 'QE', 'RE', 'SE', 'TE', 'VE', 'WE', 'XE', 'YE', 'ZE',
             'BO', 'CO', 'DO', 'FO', 'GO', 'HO', 'JO', 'KO', 'LO', 'MO', 'NO', 'PO', 'QO', 'RO', 'SO', 'TO', 'VO', 'WO', 'XO', 'YO', 'ZO']

kata_sederhana = [("BUKU", "BU-KU"), ("BOLA", "BO-LA"), ("MEJA", "ME-JA"), ("TOPI", "TO-PI"), ("SAPI", "SA-PI"),
                  ("GIGI", "GI-GI"), ("MATA", "MA-TA"), ("KAKI", "KA-KI"), ("RUSA", "RU-SA"), ("PALU", "PA-LU"),
                  ("SUDU", "SU-DU"), ("SAPU", "SA-PU"), ("GULA", "GU-LA"), ("KADO", "KA-DO"), ("BATA", "BA-TA"),
                  ("RUDU", "RU-DU"), ("SUSU", "SU-SU"), ("PENA", "PE-NA"), ("RANI", "RA-NI"), ("PADI", "PA-DI")]

kata_tertutup = [("BANTAL", "BAN-TAL"), ("PENSIL", "PEN-SIL"), ("KARTU", "KAR-TU"), ("PINTU", "PIN-TU"), 
                 ("LAMPU", "LAM-PU"), ("BINTANG", "BIN-TANG"), ("DOMBA", "DOM-BA"), ("RUMPUT", "RUM-PUT"),
                 ("KANTOR", "KAN-TOR"), ("BAMBU", "BAM-BU")]

kalimat_pendek = ["Ibu pergi ke pasar", "Ayah baca koran", "Budi main bola", "Adik minum susu", "Kucing tidur di kursi",
                  "Burung terbang tinggi", "Ikan berenang di kolam", "Sita beli buku baru", "Ani suka buah apel", "Rudi naik sepeda"]

def gen_membaca_questions(level_type, count=15):
    qs = []
    for i in range(count):
        if level_type == 'suku_kata':
            target = random.choice(suku_kata)
            wrong1, wrong2 = random.sample([s for s in suku_kata if s != target], 2)
            options = [target, wrong1, wrong2]
            random.shuffle(options)
            qs.append({
                "id": f"q{i}",
                "question": f"Huruf apa yang membentuk suku kata '{target}'?",
                "options": options,
                "correctIndex": options.index(target)
            })
        elif level_type == 'kata':
            target, ejaan = random.choice(kata_sederhana)
            w1, _ = random.choice([k for k in kata_sederhana if k[0] != target])
            w2, _ = random.choice([k for k in kata_sederhana if k[0] != target and k[0] != w1])
            options = [target, w1, w2]
            random.shuffle(options)
            qs.append({
                "id": f"q{i}",
                "question": f"Apa bacaan dari ejaan '{ejaan}'?",
                "options": options,
                "correctIndex": options.index(target)
            })
        elif level_type == 'tertutup':
            target, ejaan = random.choice(kata_tertutup)
            w1, _ = random.choice([k for k in kata_tertutup if k[0] != target])
            w2, _ = random.choice([k for k in kata_tertutup if k[0] != target and k[0] != w1])
            options = [target, w1, w2]
            random.shuffle(options)
            qs.append({
                "id": f"q{i}",
                "question": f"Apa bacaan dari ejaan '{ejaan}'?",
                "options": options,
                "correctIndex": options.index(target)
            })
        else:
            target = random.choice(kalimat_pendek)
            kata_target = target.split()[0]
            w1 = random.choice(["Ibu", "Ayah", "Kucing", "Adik", "Budi", "Ani", "Burung", "Ikan"])
            w2 = random.choice(["Sita", "Rudi", "Paman", "Kakek", "Nenek", "Tikus"])
            if w1 == kata_target: w1 = "Paman"
            if w2 == kata_target: w2 = "Tikus"
            options = [kata_target, w1, w2]
            random.shuffle(options)
            qs.append({
                "id": f"q{i}",
                "question": f"Kalimat: '{target}'. Kata pertamanya adalah...",
                "options": options,
                "correctIndex": options.index(kata_target)
            })
    return qs

membaca_levels = [
    (4, "Suku Kata Terbuka", "TK", "Belajar membaca BA-BI-BU", "suku_kata"),
    (5, "Suku Kata Tertutup", "Kelas 1", "Belajar membaca kata berakhiran konsonan", "tertutup"),
    (6, "Membaca Kata Sederhana", "Kelas 1", "Membaca BUKU, MEJA, TOPI", "kata"),
    (7, "Membaca Kalimat Pendek", "Kelas 2", "Ibu pergi ke pasar", "kalimat"),
    (8, "Membaca Cerita Pendek", "Kelas 3", "Membaca paragraf", "kalimat"),
    (9, "Jenis Teks", "Kelas 4", "Narasi, Deskripsi", "kalimat"),
    (10, "Membaca Kritis", "SMP", "Membaca analitis", "kalimat")
]

for lvl, title, badge, desc, q_type in membaca_levels:
    lessons = []
    for l in range(3):
        lessons.append({
            "id": f"mb{lvl}_{l+1}",
            "title": f"Bagian {l+1}",
            "icon": "📖",
            "difficulty": "Sedang",
            "duration": "15 menit",
            "content": f"<div class='text-center'><h2 class='text-3xl text-pink-600 font-bold'>{title} - Bagian {l+1}</h2><p class='mt-4'>Mari kita berlatih membaca dengan cermat dan teliti!</p></div>",
            "questions": gen_membaca_questions(q_type, 15)
        })
    js_content = f"window.membaca{lvl} = {json.dumps({'id': f'membaca-{lvl}', 'title': f'Level {lvl}: {title}', 'badge': badge, 'icon': '📚', 'description': desc, 'lessons': lessons}, indent=4)};"
    write_file(f"membaca-{lvl}.js", js_content)


# ==========================================
# GENERATE MATEMATIKA (Levels 4 - 25)
# ==========================================
def gen_math_questions(lvl, count=15):
    qs = []
    for i in range(count):
        if lvl <= 5: # Penjumlahan < 20
            a, b = random.randint(1, 10), random.randint(1, 10)
            op = '+'
            ans = a + b
        elif lvl <= 7: # Penjumlahan & Pengurangan < 50
            op = random.choice(['+', '-'])
            if op == '+':
                a, b = random.randint(10, 30), random.randint(10, 20)
                ans = a + b
            else:
                a, b = random.randint(20, 50), random.randint(1, 19)
                ans = a - b
        elif lvl <= 10: # Perkalian 1-5
            a, b = random.randint(1, 5), random.randint(1, 10)
            op = '×'
            ans = a * b
        elif lvl <= 13: # Perkalian 6-10 & Pembagian
            op = random.choice(['×', '÷'])
            if op == '×':
                a, b = random.randint(6, 10), random.randint(1, 10)
                ans = a * b
            else:
                b = random.randint(2, 10)
                ans = random.randint(2, 10)
                a = b * ans
        elif lvl <= 17: # Operasi campuran
            a, b = random.randint(10, 100), random.randint(10, 100)
            op = random.choice(['+', '-'])
            ans = a + b if op == '+' else (a - b if a > b else b - a)
            if a < b and op == '-': a, b = b, a
        else: # Lanjut
            a, b = random.randint(10, 50), random.randint(2, 10)
            op = '×'
            ans = a * b

        wrong1 = ans + random.randint(1, 5)
        wrong2 = ans - random.randint(1, 5)
        if wrong1 == wrong2: wrong2 -= 1
        options = [str(ans), str(wrong1), str(wrong2)]
        random.shuffle(options)
        qs.append({
            "id": f"q{i}",
            "question": f"Berapa hasil dari {a} {op} {b}?",
            "options": options,
            "correctIndex": options.index(str(ans))
        })
    return qs

math_levels = [
    (4, "Angka 21-100", "Kelas 1", "Puluhan, satuan, pola bilangan"),
    (5, "Membandingkan Angka", "Kelas 1", "Lebih besar/kecil, sama dengan"),
    (6, "Penjumlahan 1 Digit", "Kelas 1", "1+1, 2+3"),
    (7, "Penjumlahan 2 Digit", "Kelas 2", "12+15, menyimpan"),
    (8, "Pengurangan 1 Digit", "Kelas 1", "5-2, 9-3"),
    (9, "Pengurangan 2 Digit", "Kelas 2", "25-13, meminjam"),
    (10, "Perkalian 1-5", "Kelas 2", "Tabel perkalian 1-5"),
    (11, "Perkalian 6-10", "Kelas 3", "Tabel perkalian 6-10"),
    (12, "Pembagian Dasar", "Kelas 3", "10÷2, 15÷3"),
    (13, "Operasi Campuran", "Kelas 3-4", "+, -, ×, ÷ dalam satu soal"),
    (14, "Pecahan Sederhana", "Kelas 3-4", "½, ⅓, ¼"),
    (15, "Pecahan & Desimal", "Kelas 4", "0.5 = ½"),
    (16, "Persen", "Kelas 4-5", "50%, diskon"),
    (17, "Bangun Datar", "Kelas 4", "Segitiga, persegi, lingkaran"),
    (18, "Keliling & Luas", "Kelas 5", "Rumus keliling & luas"),
    (19, "Bangun Ruang", "Kelas 5", "Kubus, balok, volume"),
    (20, "Bilangan Bulat", "Kelas 5-6", "Bilangan negatif"),
    (21, "KPK & FPB", "Kelas 5-6", "Kelipatan, faktor"),
    (22, "Perbandingan", "Kelas 6", "Rasio, skala"),
    (23, "Statistika", "SMP", "Mean, median, modus"),
    (24, "Aljabar Dasar", "SMP", "Variabel x, y"),
    (25, "Persamaan Linear", "SMP", "ax + b = c")
]

for lvl, title, badge, desc in math_levels:
    lessons = []
    for l in range(3):
        lessons.append({
            "id": f"mth{lvl}_{l+1}",
            "title": f"Bagian {l+1}",
            "icon": "🔢",
            "difficulty": "Sedang",
            "duration": "15 menit",
            "content": f"<div class='text-center'><h2 class='text-3xl text-blue-600 font-bold'>{title} - Bagian {l+1}</h2><p class='mt-4'>Ayo kita berlatih berhitung agar makin jago!</p></div>",
            "questions": gen_math_questions(lvl, 15)
        })
    js_content = f"window.math{lvl} = {json.dumps({'id': f'math-{lvl}', 'title': f'Level {lvl}: {title}', 'badge': badge, 'icon': '🧮', 'description': desc, 'lessons': lessons}, indent=4)};"
    write_file(f"math-{lvl}.js", js_content)


# ==========================================
# GENERATE ENGLISH (Levels 4 - 25)
# ==========================================
vocab = {
    'colors': [("Red", "Merah"), ("Blue", "Biru"), ("Green", "Hijau"), ("Yellow", "Kuning"), ("Black", "Hitam"), ("White", "Putih")],
    'animals': [("Cat", "Kucing"), ("Dog", "Anjing"), ("Bird", "Burung"), ("Fish", "Ikan"), ("Elephant", "Gajah"), ("Tiger", "Harimau")],
    'fruits': [("Apple", "Apel"), ("Banana", "Pisang"), ("Orange", "Jeruk"), ("Grape", "Anggur"), ("Mango", "Mangga")],
    'body': [("Head", "Kepala"), ("Hand", "Tangan"), ("Leg", "Kaki"), ("Eye", "Mata"), ("Ear", "Telinga"), ("Nose", "Hidung")],
    'family': [("Mother", "Ibu"), ("Father", "Ayah"), ("Brother", "Saudara Laki-laki"), ("Sister", "Saudara Perempuan")],
    'verbs': [("Run", "Lari"), ("Walk", "Jalan"), ("Eat", "Makan"), ("Drink", "Minum"), ("Sleep", "Tidur"), ("Read", "Membaca")]
}

def gen_english_questions(lvl, count=15):
    qs = []
    category = random.choice(list(vocab.keys()))
    if lvl <= 6: category = random.choice(['colors', 'animals'])
    elif lvl <= 10: category = random.choice(['fruits', 'body', 'family'])
    else: category = random.choice(['verbs', 'animals', 'body'])

    for i in range(count):
        target_en, target_id = random.choice(vocab[category])
        w1_en, w1_id = random.choice([v for v in vocab[category] if v[0] != target_en])
        w2_en, w2_id = random.choice([v for v in vocab[category] if v[0] != target_en and v[0] != w1_en])
        
        q_type = random.randint(0, 1)
        if q_type == 0:
            options = [target_id, w1_id, w2_id]
            random.shuffle(options)
            qs.append({
                "id": f"q{i}",
                "question": f"What is the meaning of '{target_en}'?",
                "options": options,
                "correctIndex": options.index(target_id)
            })
        else:
            options = [target_en, w1_en, w2_en]
            random.shuffle(options)
            qs.append({
                "id": f"q{i}",
                "question": f"Apa bahasa Inggris dari '{target_id}'?",
                "options": options,
                "correctIndex": options.index(target_en)
            })
    return qs

english_levels = [
    (4, "Numbers 1-20", "TK", "One, Two, Three... Twenty"),
    (5, "Colors & Shapes", "Kelas 1", "Red, Blue, Circle, Square"),
    (6, "Animals", "Kelas 1", "Cat, Dog, Bird, Fish"),
    (7, "Fruits & Vegetables", "Kelas 1-2", "Apple, Banana, Carrot"),
    (8, "Body Parts & Family", "Kelas 2", "Head, Hand, Mother, Father"),
    (9, "Classroom & School", "Kelas 2", "Book, Pen, Teacher, Student"),
    (10, "Greetings", "Kelas 2-3", "Hello! My name is..."),
    (11, "Days & Months", "Kelas 3", "Monday, January"),
    (12, "Simple Sentences", "Kelas 3", "I have a cat"),
    (13, "Verbs & Actions", "Kelas 3-4", "Run, Jump, Eat"),
    (14, "Adjectives", "Kelas 4", "Big, Small, Beautiful"),
    (15, "Present Tense", "Kelas 4", "I eat, She eats"),
    (16, "Past Tense", "Kelas 4-5", "I ate, She played"),
    (17, "Future Tense", "Kelas 5", "I will go"),
    (18, "Prepositions", "Kelas 5", "In, On, Under"),
    (19, "Reading Short Stories", "Kelas 5-6", "Cerita pendek"),
    (20, "Question Words", "Kelas 5-6", "What, Where, When"),
    (21, "Comparative", "Kelas 6", "Bigger, Biggest"),
    (22, "Modal Verbs", "Kelas 6", "Can, Could, Should"),
    (23, "Reading Comprehension", "SMP", "Teks panjang"),
    (24, "Writing", "SMP", "Paragraph writing"),
    (25, "Idioms", "SMP", "Break a leg")
]

for lvl, title, badge, desc in english_levels:
    lessons = []
    for l in range(3):
        lessons.append({
            "id": f"eng{lvl}_{l+1}",
            "title": f"Part {l+1}",
            "icon": "🇬🇧",
            "difficulty": "Sedang",
            "duration": "15 menit",
            "content": f"<div class='text-center'><h2 class='text-3xl text-emerald-600 font-bold'>{title} - Part {l+1}</h2><p class='mt-4'>Let's learn English together!</p></div>",
            "questions": gen_english_questions(lvl, 15)
        })
    js_content = f"window.english{lvl} = {json.dumps({'id': f'english-{lvl}', 'title': f'Level {lvl}: {title}', 'badge': badge, 'icon': '🌍', 'description': desc, 'lessons': lessons}, indent=4)};"
    write_file(f"english-{lvl}.js", js_content)

print("All files generated successfully!")
