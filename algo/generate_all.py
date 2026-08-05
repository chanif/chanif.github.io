import os
import json

base_dir = r"d:\Belajar\chanif.github.io\algo\data"

def write_js(filename, var_name, data):
    content = f"window.{var_name} = {json.dumps(data, ensure_ascii=False, indent=4)};"
    with open(os.path.join(base_dir, filename), 'w', encoding='utf-8') as f:
        f.write(content)

# ========================================================
# HELPER: card for PAUD visual content
# ========================================================
def paud_card(emoji, label, color):
    return f"""
    <div class='flex flex-col items-center justify-center bg-{color}-50 border-4 border-{color}-200 rounded-3xl p-6 cursor-pointer hover:scale-105 transition-transform' style='min-height:180px'>
        <span class='text-8xl mb-3 block'>{emoji}</span>
        <span class='text-4xl font-black text-{color}-700 tracking-widest'>{label}</span>
    </div>"""

# ========================================================
# MEMBACA 1 — Huruf A-Z (PAUD, full visual)
# ========================================================
huruf_data = [
    ("A","🍎","Apel","pink"),("B","🦆","Bebek","orange"),("C","🍒","Ceri","red"),
    ("D","🍩","Donat","yellow"),("E","🦅","Elang","blue"),("F","🐸","Katak","green"),
    ("G","🐘","Gajah","purple"),("H","🚁","Helikopter","indigo"),("I","🐟","Ikan","cyan"),
    ("J","🦒","Jerapah","amber"),("K","🐱","Kucing","pink"),("L","🦁","Singa","orange"),
    ("M","🐒","Monyet","yellow"),("N","🍍","Nanas","green"),("O","🦦","Berang-berang","blue"),
    ("P","🦜","Papagei","emerald"),("Q","👑","Mahkota","purple"),("R","🦝","Rakun","red"),
    ("S","⭐","Bintang","yellow"),("T","🐯","Harimau","orange"),
    ("U","🦄","Unicorn","pink"),("V","🎻","Biola","indigo"),
    ("W","🐋","Paus","blue"),("X","❌","Silang","red"),
    ("Y","🪁","Ketapel","green"),("Z","🦓","Zebra","gray")
]

def make_huruf_cards(huruf_list):
    cards = "".join([paud_card(e, h, c) for h,e,_,c in huruf_list])
    return f"<div class='grid grid-cols-2 sm:grid-cols-3 gap-4'>{cards}</div>"

def make_huruf_quiz(huruf_list):
    """Generate unique, non-redundant quiz from a list of (huruf, emoji, kata, color)"""
    import random
    pool = list(huruf_list)
    random.shuffle(pool)
    qs = []
    used = set()
    # Type A: "Emoji ini diawali huruf apa?"
    for h, e, k, c in pool[:5]:
        wrong = [x[0] for x in huruf_list if x[0] != h]
        random.shuffle(wrong)
        opts = [h, wrong[0], wrong[1]]
        random.shuffle(opts)
        qs.append({"id": f"q{len(qs)}", "question": f"Gambar {e} ({k}) — diawali huruf apa?", "options": opts, "correctIndex": opts.index(h)})
    # Type B: "Mana gambar yang diawali huruf X?"
    for h, e, k, c in pool[5:10]:
        wrong_items = [x for x in huruf_list if x[0] != h]
        random.shuffle(wrong_items)
        opts = [f"{e} {k}", f"{wrong_items[0][1]} {wrong_items[0][2]}", f"{wrong_items[1][1]} {wrong_items[1][2]}"]
        random.shuffle(opts)
        qs.append({"id": f"q{len(qs)}", "question": f"Mana gambar yang diawali huruf {h}?", "options": opts, "correctIndex": opts.index(f"{e} {k}")})
    # Type C: urutan abjad
    for h, e, k, c in pool[10:15]:
        idx = [x[0] for x in huruf_data].index(h)
        if idx < len(huruf_data) - 1:
            next_h = huruf_data[idx+1][0]
            wrong_letters = [x[0] for x in huruf_data if x[0] != next_h and x[0] != h]
            random.shuffle(wrong_letters)
            opts = [next_h, wrong_letters[0], wrong_letters[1]]
            random.shuffle(opts)
            qs.append({"id": f"q{len(qs)}", "question": f"Huruf apa yang datang setelah {h}?", "options": opts, "correctIndex": opts.index(next_h)})
        else:
            prev_h = huruf_data[idx-1][0]
            wrong_letters = [x[0] for x in huruf_data if x[0] != prev_h and x[0] != h]
            random.shuffle(wrong_letters)
            opts = [prev_h, wrong_letters[0], wrong_letters[1]]
            random.shuffle(opts)
            qs.append({"id": f"q{len(qs)}", "question": f"Huruf apa yang datang sebelum {h}?", "options": opts, "correctIndex": opts.index(prev_h)})
    return qs[:15]

mb1_lessons = [
    {
        "id": "mb1_1", "title": "", "icon": "🔤", "difficulty": "", "duration": "",
        "content": make_huruf_cards(huruf_data[0:9]),
        "questions": make_huruf_quiz(huruf_data[0:9])
    },
    {
        "id": "mb1_2", "title": "", "icon": "🔡", "difficulty": "", "duration": "",
        "content": make_huruf_cards(huruf_data[9:18]),
        "questions": make_huruf_quiz(huruf_data[9:18])
    },
    {
        "id": "mb1_3", "title": "", "icon": "🎲", "difficulty": "", "duration": "",
        "content": make_huruf_cards(huruf_data[18:26]),
        "questions": make_huruf_quiz(huruf_data[18:26])
    }
]
write_js("membaca-1.js", "membaca1", {
    "id": "membaca-1",    "title": "",
    "description": "",
    "icon": "🔤",
    "badge": "PAUD",
    "lessons": mb1_lessons
})
print("membaca-1.js done")

# ========================================================
# MEMBACA 2 — Vokal & Konsonan (PAUD, visual)
# ========================================================
vokal_data = [
    ("A","🍎","Apel","pink"),("I","🐟","Ikan","cyan"),("U","🦄","Unicorn","purple"),
    ("E","🦅","Elang","blue"),("O","🍊","Jeruk","orange")
]

def vokal_card(h, e, k, c):
    return f"""
    <div class='flex flex-col items-center justify-center bg-{c}-50 border-4 border-{c}-200 rounded-3xl p-8 hover:scale-105 transition-transform'>
        <span class='text-9xl mb-4 block'>{e}</span>
        <span class='text-5xl font-black text-{c}-700 mb-2'>{h}</span>
        <span class='text-2xl text-{c}-500 font-bold'>{k}</span>
    </div>"""

vokal_content = "<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>" + "".join([vokal_card(*v) for v in vokal_data]) + "</div>"
vokal_content += "<div class='mt-6 text-center text-2xl font-bold text-slate-500'>Huruf Vokal = A I U E O 🎵</div>"

konsonan_sample = [("B","🦆","Bebek","orange"),("C","🍒","Ceri","red"),("D","🍩","Donat","yellow"),
                   ("F","🐸","Katak","green"),("G","🐘","Gajah","purple"),("H","🚁","Helikopter","indigo")]
konsonan_content = "<div class='mb-4 text-center text-2xl font-black text-blue-600'>Huruf Konsonan (B-Z, bukan AIUEO)</div>"
konsonan_content += "<div class='grid grid-cols-2 sm:grid-cols-3 gap-4'>" + "".join([paud_card(e, h, c) for h,e,_,c in konsonan_sample]) + "</div>"
konsonan_content += "<div class='mt-4 text-center text-xl text-slate-500 font-bold'>dan masih banyak lagi... B C D F G H J K L M N P Q R S T V W X Y Z 🎯</div>"

def vokal_quiz():
    import random
    qs = [
        {"id":"q0","question":"Manakah huruf VOKAL? 🅰️","options":["A","B","C"],"correctIndex":0},
        {"id":"q1","question":"Manakah huruf VOKAL? 🔵","options":["D","I","K"],"correctIndex":1},
        {"id":"q2","question":"Manakah huruf VOKAL? 🔴","options":["F","G","U"],"correctIndex":2},
        {"id":"q3","question":"Manakah huruf VOKAL? 🟢","options":["E","H","J"],"correctIndex":0},
        {"id":"q4","question":"Manakah huruf VOKAL? 🟡","options":["L","M","O"],"correctIndex":2},
        {"id":"q5","question":"Berapa banyak huruf vokal? 🤔","options":["5","6","4"],"correctIndex":0},
        {"id":"q6","question":"🍎 Apel — huruf pertamanya adalah vokal atau konsonan?","options":["Vokal","Konsonan","Bukan keduanya"],"correctIndex":0},
        {"id":"q7","question":"🦆 Bebek — huruf pertamanya adalah vokal atau konsonan?","options":["Vokal","Konsonan","Bukan keduanya"],"correctIndex":1},
        {"id":"q8","question":"🐟 Ikan — huruf pertamanya adalah...","options":["Vokal (I)","Konsonan (I)","Bukan huruf"],"correctIndex":0},
        {"id":"q9","question":"🦅 Elang — huruf pertamanya adalah...","options":["Vokal (E)","Konsonan (E)","Nomor"],"correctIndex":0},
        {"id":"q10","question":"Manakah yang BUKAN huruf vokal?","options":["B","A","I"],"correctIndex":0},
        {"id":"q11","question":"Manakah yang BUKAN huruf vokal?","options":["U","E","C"],"correctIndex":2},
        {"id":"q12","question":"Sebutkan vokal ke-3! 🥉","options":["E","U","O"],"correctIndex":1},
        {"id":"q13","question":"Sebutkan vokal ke-1! 🥇","options":["I","A","U"],"correctIndex":1},
        {"id":"q14","question":"Sebutkan vokal ke-5! 🏆","options":["O","A","E"],"correctIndex":0},
    ]
    return qs

mb2_lessons = [
    {"id":"mb2_1","title":"Huruf Vokal A I U E O","icon":"🎵","difficulty":"Mudah","duration":"10 menit",
     "content": vokal_content, "questions": vokal_quiz()},
    {"id":"mb2_2","title":"Huruf Konsonan","icon":"🔡","difficulty":"Mudah","duration":"10 menit",
     "content": konsonan_content,
     "questions": [
        {"id":"q0","question":"Huruf B — konsonan atau vokal?","options":["Konsonan","Vokal","Keduanya"],"correctIndex":0},
        {"id":"q1","question":"Huruf C — konsonan atau vokal?","options":["Konsonan","Vokal","Keduanya"],"correctIndex":0},
        {"id":"q2","question":"Huruf D — konsonan atau vokal?","options":["Konsonan","Vokal","Angka"],"correctIndex":0},
        {"id":"q3","question":"Huruf A — konsonan atau vokal?","options":["Vokal","Konsonan","Angka"],"correctIndex":0},
        {"id":"q4","question":"Huruf O — konsonan atau vokal?","options":["Vokal","Konsonan","Simbol"],"correctIndex":0},
        {"id":"q5","question":"🦆 Bebek — diawali huruf konsonan apa?","options":["B","D","G"],"correctIndex":0},
        {"id":"q6","question":"🍒 Ceri — diawali huruf konsonan apa?","options":["C","B","D"],"correctIndex":0},
        {"id":"q7","question":"🐘 Gajah — diawali huruf konsonan apa?","options":["F","G","H"],"correctIndex":1},
        {"id":"q8","question":"🚁 Helikopter — diawali huruf konsonan apa?","options":["H","I","J"],"correctIndex":0},
        {"id":"q9","question":"Manakah yang KONSONAN?","options":["K","A","E"],"correctIndex":0},
        {"id":"q10","question":"Manakah yang KONSONAN?","options":["I","L","U"],"correctIndex":1},
        {"id":"q11","question":"Manakah yang KONSONAN?","options":["O","E","M"],"correctIndex":2},
        {"id":"q12","question":"Ada berapa huruf alfabet total?","options":["26","25","27"],"correctIndex":0},
        {"id":"q13","question":"Ada berapa huruf KONSONAN?","options":["21","20","22"],"correctIndex":0},
        {"id":"q14","question":"Ada berapa huruf VOKAL?","options":["5","6","4"],"correctIndex":0},
     ]},
    {"id":"mb2_3","title":"Latihan Vokal & Konsonan","icon":"🏆","difficulty":"Sedang","duration":"10 menit",
     "content": "<div class='text-center space-y-6'><span class='text-8xl block'>🎯</span><h2 class='text-3xl font-extrabold text-pink-600'>Waktunya Latihan!</h2><div class='grid grid-cols-2 gap-4 mt-6'>" +
                "".join([f"<div class='bg-pink-50 border-4 border-pink-200 rounded-2xl p-4 text-center'><span class='text-5xl font-black text-pink-600'>{v}</span><p class='text-pink-500 font-bold mt-2'>VOKAL</p></div>" for v in ["A","I","U","E","O"]]) + "</div></div>",
     "questions": [
        {"id":"q0","question":"Kata 'IKU' — huruf vokalnya ada berapa?","options":["2","3","1"],"correctIndex":1},
        {"id":"q1","question":"Kata 'BOLA' — huruf vokalnya adalah...","options":["O dan A","B dan L","O dan L"],"correctIndex":0},
        {"id":"q2","question":"Kata 'SUSU' — ada berapa huruf vokal?","options":["2","1","3"],"correctIndex":0},
        {"id":"q3","question":"Huruf 'A' termasuk...","options":["Vokal","Konsonan","Angka"],"correctIndex":0},
        {"id":"q4","question":"Huruf 'Z' termasuk...","options":["Konsonan","Vokal","Simbol"],"correctIndex":0},
        {"id":"q5","question":"Kata 'MATA' — huruf konsonannya adalah...","options":["M dan T","A dan A","M dan A"],"correctIndex":0},
        {"id":"q6","question":"Dalam kata 'KAKI', ada berapa vokal?","options":["2","3","1"],"correctIndex":0},
        {"id":"q7","question":"Dalam kata 'ELANG', huruf pertamanya adalah...","options":["Vokal (E)","Konsonan (E)","Angka"],"correctIndex":0},
        {"id":"q8","question":"Dalam kata 'GIGI', ada berapa konsonan?","options":["2","3","1"],"correctIndex":0},
        {"id":"q9","question":"Manakah kata yang DIAWALI vokal?","options":["Apel","Bola","Ceri"],"correctIndex":0},
        {"id":"q10","question":"Manakah kata yang DIAWALI konsonan?","options":["Ikan","Pisang","Elang"],"correctIndex":1},
        {"id":"q11","question":"Manakah kata yang DIAWALI vokal?","options":["Domba","Ular","Sapi"],"correctIndex":1},
        {"id":"q12","question":"Huruf kelima dari abjad adalah...","options":["E","F","D"],"correctIndex":0},
        {"id":"q13","question":"Huruf ke-10 dari abjad adalah...","options":["J","I","K"],"correctIndex":0},
        {"id":"q14","question":"Huruf terakhir abjad adalah...","options":["Z","Y","X"],"correctIndex":0},
     ]},
]
write_js("membaca-2.js", "membaca2", {
    "id":"membaca-2","title":"Level 2: Vokal & Konsonan","badge":"PAUD",
    "icon":"🎵","description":"Belajar membedakan huruf vokal (AIUEO) dan huruf konsonan dengan gambar.",
    "lessons": mb2_lessons
})
print("membaca-2.js done")

# ========================================================
# MEMBACA 3 — Suku Kata Terbuka BA BI BU BE BO (PAUD, visual)
# ========================================================
suku_visual = {
    "BA": "🦇", "BI": "🐝", "BU": "🌸", "BE": "🐻", "BO": "💡",
    "CA": "🦀", "CI": "💧", "CU": "🌤️", "CE": "🍒", "CO": "🍫",
    "DA": "🍃", "DI": "📍", "DU": "🌵", "DE": "💎", "DO": "🍩",
}

def suku_grid(items):
    html = "<div class='grid grid-cols-2 sm:grid-cols-3 gap-4'>"
    for s, e in items.items():
        html += f"<div class='flex flex-col items-center bg-pink-50 border-4 border-pink-200 rounded-3xl p-6 hover:scale-105 transition-transform'><span class='text-6xl mb-3'>{e}</span><span class='text-4xl font-black text-pink-700 tracking-widest'>{s}</span></div>"
    html += "</div>"
    return html

mb3_lessons = [
    {"id":"mb3_1","title":"Suku Kata BA BI BU BE BO","icon":"🐝","difficulty":"Mudah","duration":"10 menit",
     "content": suku_grid({"BA":"🦇","BI":"🐝","BU":"🌸","BE":"🐻","BO":"💡",
                            "BA":"🍌","BI":"🐝","BU":"🌹","BE":"🐻","BO":"⛵"}),
     "questions": [
        {"id":"q0","question":"🐝 = BI... apa bacaan gambar ini? (BI + ...)","options":["BIRU","BOLA","BUKU"],"correctIndex":0},
        {"id":"q1","question":"Gambar 🦇 berbunyi...","options":["BA","BI","BU"],"correctIndex":0},
        {"id":"q2","question":"🌸 berbunyi...","options":["BU","BO","BE"],"correctIndex":0},
        {"id":"q3","question":"Suku kata BE seperti bunyi di kata...","options":["Bebek","Buku","Bola"],"correctIndex":0},
        {"id":"q4","question":"Suku kata BO seperti bunyi di kata...","options":["Bola","Buku","Bebek"],"correctIndex":0},
        {"id":"q5","question":"BA + BI dibaca...","options":["BABI","BIBI","BABA"],"correctIndex":0},
        {"id":"q6","question":"BO + LA dibaca...","options":["BOLA","LABO","BABO"],"correctIndex":0},
        {"id":"q7","question":"BU + KU dibaca...","options":["BUKU","KUBU","BUBU"],"correctIndex":0},
        {"id":"q8","question":"BE + BE + K dibaca...","options":["BEBEK","BEKBE","BEBE"],"correctIndex":0},
        {"id":"q9","question":"BI + RU dibaca...","options":["BIRU","RUBI","BIBI"],"correctIndex":0},
        {"id":"q10","question":"Suku pertama kata BUMI adalah...","options":["BU","MI","BI"],"correctIndex":0},
        {"id":"q11","question":"Suku pertama kata BAJU adalah...","options":["BA","JU","BI"],"correctIndex":0},
        {"id":"q12","question":"Kata BOLA punya berapa suku?","options":["2","3","1"],"correctIndex":0},
        {"id":"q13","question":"Kata BUKU punya berapa suku?","options":["2","3","1"],"correctIndex":0},
        {"id":"q14","question":"BI + SA dibaca...","options":["BISA","SABI","BISI"],"correctIndex":0},
     ]},
    {"id":"mb3_2","title":"Suku Kata CA CI CU CE CO / DA DI DU","icon":"🦀","difficulty":"Mudah","duration":"10 menit",
     "content": suku_grid({"CA":"🦀","CI":"💧","CU":"☁️","CE":"🍒","CO":"🍫","DA":"🍃","DI":"📍","DU":"🌵"}),
     "questions": [
        {"id":"q0","question":"🦀 berbunyi...","options":["CA","CE","CO"],"correctIndex":0},
        {"id":"q1","question":"💧 berbunyi...","options":["CI","CA","CU"],"correctIndex":0},
        {"id":"q2","question":"CA + CA dibaca...","options":["CACA","ACAC","CAAC"],"correctIndex":0},
        {"id":"q3","question":"CO + LA + K dibaca...","options":["COLAK","LACOL","COLOK"],"correctIndex":0},
        {"id":"q4","question":"CA + BI dibaca...","options":["CABI","BICA","CIBA"],"correctIndex":0},
        {"id":"q5","question":"DA + DA + H dibaca...","options":["DADAH","HADAD","DAHDA"],"correctIndex":0},
        {"id":"q6","question":"DI + A dibaca...","options":["DIA","AID","IDA"],"correctIndex":0},
        {"id":"q7","question":"DU + RI + AN dibaca...","options":["DURIAN","RIANDU","ANDURI"],"correctIndex":0},
        {"id":"q8","question":"Suku pertama kata CACING adalah...","options":["CA","CI","CACI"],"correctIndex":0},
        {"id":"q9","question":"Suku pertama kata DUIT adalah...","options":["DU","IT","DI"],"correctIndex":0},
        {"id":"q10","question":"CA + IR dibaca...","options":["CAIR","IRCA","CAIRI"],"correctIndex":0},
        {"id":"q11","question":"CE + LA + NA dibaca...","options":["CELANA","NACELA","LACENA"],"correctIndex":0},
        {"id":"q12","question":"🍩 (Donat) suku pertamanya...","options":["DO","DA","DE"],"correctIndex":0},
        {"id":"q13","question":"Kata DAUN punya berapa suku?","options":["2","3","1"],"correctIndex":0},
        {"id":"q14","question":"CO + KO + LAT dibaca...","options":["COKLAT","LATCOK","COKOLA"],"correctIndex":0},
     ]},
    {"id":"mb3_3","title":"Gabungan Suku Kata Jadi Kata","icon":"🏆","difficulty":"Sedang","duration":"10 menit",
     "content": "<div class='space-y-4'>" +
                "<div class='text-center'><span class='text-7xl'>🧩</span><h2 class='text-3xl font-black text-pink-600 mt-3'>Suku Kata jadi Kata!</h2></div>" +
                "".join([f"<div class='flex items-center justify-center gap-4 bg-pink-50 border-4 border-pink-200 rounded-2xl p-4'><span class='text-3xl font-black text-pink-600'>{a}</span><span class='text-3xl text-slate-400'>+</span><span class='text-3xl font-black text-blue-600'>{b}</span><span class='text-3xl text-slate-400'>=</span><span class='text-3xl font-black text-emerald-600'>{kata}</span><span class='text-3xl ml-2'>{e}</span></div>"
                         for a,b,kata,e in [("BA","BU","BABU","👶"),("BI","RU","BIRU","💙"),("CA","CA","CACA","😄"),
                                             ("DA","DA","DADA","👐"),("BO","LA","BOLA","⚽"),("BU","KU","BUKU","📚")]]) + "</div>",
     "questions": [
        {"id":"q0","question":"BA + BU = ?","options":["BABU","BUBA","BAAB"],"correctIndex":0},
        {"id":"q1","question":"BI + RU = ?","options":["BIRU","RUBI","BIUR"],"correctIndex":0},
        {"id":"q2","question":"BO + LA = ?","options":["BOLA","LABO","BALO"],"correctIndex":0},
        {"id":"q3","question":"BU + KU = ?","options":["BUKU","KUBU","BUKKU"],"correctIndex":0},
        {"id":"q4","question":"CA + CA = ?","options":["CACA","ACCA","CAAC"],"correctIndex":0},
        {"id":"q5","question":"DA + DA = ?","options":["DADA","ADAD","DADA"],"correctIndex":0},
        {"id":"q6","question":"BOLA terdiri dari suku...","options":["BO + LA","BAL + A","B + OLA"],"correctIndex":0},
        {"id":"q7","question":"BUKU terdiri dari suku...","options":["BU + KU","BUK + U","B + UKU"],"correctIndex":0},
        {"id":"q8","question":"BIRU terdiri dari suku...","options":["BI + RU","BIR + U","B + IRU"],"correctIndex":0},
        {"id":"q9","question":"BE + BE + K = ?","options":["BEBEK","BEKBE","BEEK"],"correctIndex":0},
        {"id":"q10","question":"CA + CIN + G = ?","options":["CACING","GINCI","CACIG"],"correctIndex":0},
        {"id":"q11","question":"DU + RI + AN = ?","options":["DURIAN","RIANDU","ANDURI"],"correctIndex":0},
        {"id":"q12","question":"BI + SA dibaca...","options":["BISA","SABI","BIIS"],"correctIndex":0},
        {"id":"q13","question":"CO + BA dibaca...","options":["COBA","BACO","COAB"],"correctIndex":0},
        {"id":"q14","question":"DA + PUR dibaca...","options":["DAPUR","PURDA","DADPU"],"correctIndex":0},
     ]},
]
write_js("membaca-3.js", "membaca3", {
    "id":"membaca-3","title":"Level 3: Suku Kata Terbuka","badge":"PAUD-TK",
    "icon":"🐝","description":"Belajar suku kata BA BI BU BE BO, CA CI CU, dan seterusnya dengan gambar.",
    "lessons": mb3_lessons
})
print("membaca-3.js done")

# ========================================================
# MEMBACA 4 — Suku Kata Tertutup + Kata Sederhana
# ========================================================
kata_list = [
    ("BUKU","BU-KU","📚","benda"), ("MEJA","ME-JA","🪑","benda"), ("BOLA","BO-LA","⚽","benda"),
    ("TOPI","TO-PI","🎩","benda"), ("SUSU","SU-SU","🥛","makanan"), ("GULA","GU-LA","🍬","makanan"),
    ("PENA","PE-NA","✏️","benda"), ("KAKI","KA-KI","🦶","tubuh"), ("MATA","MA-TA","👁️","tubuh"),
    ("GIGI","GI-GI","🦷","tubuh"), ("RUSA","RU-SA","🦌","hewan"), ("SAPI","SA-PI","🐄","hewan"),
    ("PADI","PA-DI","🌾","alam"), ("SAPU","SA-PU","🧹","benda"), ("KADO","KA-DO","🎁","benda"),
]

def kata_card(kata, ejaan, emoji, _):
    return f"<div class='flex flex-col items-center bg-blue-50 border-4 border-blue-200 rounded-3xl p-5 hover:scale-105 transition-transform'><span class='text-6xl mb-2'>{emoji}</span><span class='text-2xl font-black text-blue-700'>{kata}</span><span class='text-lg text-blue-400 font-bold'>{ejaan}</span></div>"

import random

def kata_quiz(kata_pool):
    random.shuffle(kata_pool)
    qs = []
    # Tipe A: pilih ejaan dari kata
    for k, ej, e, _ in kata_pool[:5]:
        wrong_ej = [x[1] for x in kata_pool if x[1] != ej]
        random.shuffle(wrong_ej)
        opts = [ej, wrong_ej[0], wrong_ej[1]]
        random.shuffle(opts)
        qs.append({"id":f"q{len(qs)}","question":f"Bagaimana ejaan kata {e} {k}?","options":opts,"correctIndex":opts.index(ej)})
    # Tipe B: pilih kata dari ejaan
    for k, ej, e, _ in kata_pool[5:10]:
        wrong_k = [x[0] for x in kata_pool if x[0] != k]
        random.shuffle(wrong_k)
        opts = [k, wrong_k[0], wrong_k[1]]
        random.shuffle(opts)
        qs.append({"id":f"q{len(qs)}","question":f"Apa bacaan dari ejaan '{ej}'?","options":opts,"correctIndex":opts.index(k)})
    # Tipe C: emoji ke kata
    for k, ej, e, _ in kata_pool[10:15]:
        wrong_k = [x[0] for x in kata_pool if x[0] != k]
        random.shuffle(wrong_k)
        opts = [k, wrong_k[0], wrong_k[1]]
        random.shuffle(opts)
        qs.append({"id":f"q{len(qs)}","question":f"Gambar {e} ini dinamakan...","options":opts,"correctIndex":opts.index(k)})
    return qs[:15]

mb4_group1 = kata_list[:8]
mb4_group2 = kata_list[7:]

mb4_lessons = [
    {"id":"mb4_1","title":"Kata Benda Sehari-hari","icon":"📚","difficulty":"Mudah","duration":"12 menit",
     "content":"<div class='grid grid-cols-2 sm:grid-cols-3 gap-4'>"+"".join([kata_card(*k) for k in mb4_group1])+"</div>",
     "questions": kata_quiz(mb4_group1 + kata_list[2:5])},
    {"id":"mb4_2","title":"Kata Alam & Hewan","icon":"🦌","difficulty":"Mudah","duration":"12 menit",
     "content":"<div class='grid grid-cols-2 sm:grid-cols-3 gap-4'>"+"".join([kata_card(*k) for k in mb4_group2])+"</div>",
     "questions": kata_quiz(mb4_group2 + kata_list[:3])},
    {"id":"mb4_3","title":"Latihan Membaca Kata","icon":"🏆","difficulty":"Sedang","duration":"15 menit",
     "content": "<div class='space-y-4'><div class='text-center'><span class='text-7xl'>📖</span><h2 class='text-3xl font-black text-pink-600 mt-3'>Baca & Pilih!</h2><p class='text-slate-500 text-lg mt-2'>Baca kata-kata di bawah, lalu jawab kuisnya!</p></div><div class='grid grid-cols-3 gap-3 mt-4'>"+"".join([f"<div class='text-center bg-pink-50 rounded-2xl p-3 border-2 border-pink-100'><span class='text-4xl'>{e}</span><span class='block font-black text-pink-700 text-xl mt-1'>{k}</span></div>" for k,_,e,_ in kata_list])+"</div></div>",
     "questions": kata_quiz(kata_list)},
]
write_js("membaca-4.js", "membaca4", {
    "id":"membaca-4","title":"Level 4: Membaca Kata","badge":"TK-Kelas 1",
    "icon":"📖","description":"Membaca dan mengenal kata-kata sederhana 2 suku kata dari kehidupan sehari-hari.",
    "lessons": mb4_lessons
})
print("membaca-4.js done")

# ========================================================
# MEMBACA 5 — Kata Berakhiran Konsonan
# ========================================================
kata_tertutup = [
    ("BANTAL","BAN-TAL","🛏️"),("PENSIL","PEN-SIL","✏️"),("KANTOR","KAN-TOR","🏢"),
    ("PINTU","PIN-TU","🚪"),("LAMPU","LAM-PU","💡"),("BINTANG","BIN-TANG","⭐"),
    ("DOMBA","DOM-BA","🐑"),("RUMPUT","RUM-PUT","🌿"),("BAMBU","BAM-BU","🎋"),
    ("LANTAI","LAN-TAI","🏠"),("KUCING","KU-CING","🐱"),("ANJING","AN-JING","🐶"),
    ("TANGAN","TA-NGAN","🤚"),("MANGGA","MANG-GA","🥭"),("RAMBUT","RAM-BUT","💇"),
]

def kt_card(k, ej, e):
    return f"<div class='flex flex-col items-center bg-emerald-50 border-4 border-emerald-200 rounded-2xl p-4 hover:scale-105 transition-transform'><span class='text-5xl mb-2'>{e}</span><span class='text-xl font-black text-emerald-700'>{k}</span><span class='text-sm text-emerald-400 font-bold'>{ej}</span></div>"

def kt_quiz(pool):
    random.shuffle(pool)
    qs = []
    for k, ej, e in pool[:5]:
        wrong = [x[1] for x in pool if x[1] != ej]; random.shuffle(wrong)
        opts = [ej, wrong[0], wrong[1]]; random.shuffle(opts)
        qs.append({"id":f"q{len(qs)}","question":f"Ejaan kata {e} {k} adalah...","options":opts,"correctIndex":opts.index(ej)})
    for k, ej, e in pool[5:10]:
        wrong = [x[0] for x in pool if x[0] != k]; random.shuffle(wrong)
        opts = [k, wrong[0], wrong[1]]; random.shuffle(opts)
        qs.append({"id":f"q{len(qs)}","question":f"Bacaan dari ejaan '{ej}' adalah...","options":opts,"correctIndex":opts.index(k)})
    for k, ej, e in pool[10:15]:
        wrong = [x[0] for x in pool if x[0] != k]; random.shuffle(wrong)
        opts = [k, wrong[0], wrong[1]]; random.shuffle(opts)
        qs.append({"id":f"q{len(qs)}","question":f"Gambar {e} ini bernama...","options":opts,"correctIndex":opts.index(k)})
    return qs[:15]

mb5_lessons = [
    {"id":"mb5_1","title":"Kata Berakhiran Konsonan","icon":"🛏️","difficulty":"Mudah","duration":"12 menit",
     "content":"<div class='space-y-3'><h3 class='text-xl font-black text-emerald-700 mb-4'>Kata Tertutup = berakhir huruf konsonan</h3><div class='grid grid-cols-2 sm:grid-cols-3 gap-3'>"+"".join([kt_card(*k) for k in kata_tertutup[:9]])+"</div></div>",
     "questions": kt_quiz(kata_tertutup)},
    {"id":"mb5_2","title":"Latihan Kata Tertutup","icon":"⭐","difficulty":"Sedang","duration":"15 menit",
     "content":"<div class='space-y-3'><div class='bg-amber-50 border-4 border-amber-200 rounded-2xl p-4 mb-4'><p class='text-amber-700 font-bold text-lg'>💡 Tips: Kata tertutup berakhiran konsonan seperti N, L, R, T, K, NG, NY, dsb.</p></div><div class='grid grid-cols-2 sm:grid-cols-3 gap-3'>"+"".join([kt_card(*k) for k in kata_tertutup[5:]])+"</div></div>",
     "questions": kt_quiz(kata_tertutup[::-1])},
    {"id":"mb5_3","title":"Kuis Kata Terbuka vs Tertutup","icon":"🏆","difficulty":"Sulit","duration":"15 menit",
     "content":"<div class='text-center space-y-4'><span class='text-7xl block'>🎯</span><h2 class='text-3xl font-black text-emerald-600'>Terbuka vs Tertutup</h2><div class='grid grid-cols-2 gap-6 mt-6'><div class='bg-blue-50 border-4 border-blue-200 rounded-2xl p-4'><h3 class='text-lg font-black text-blue-600 mb-2'>Terbuka</h3><p class='text-blue-500'>Berakhiran vokal</p><p class='font-black text-2xl'>BUKU, BOLA</p></div><div class='bg-emerald-50 border-4 border-emerald-200 rounded-2xl p-4'><h3 class='text-lg font-black text-emerald-600 mb-2'>Tertutup</h3><p class='text-emerald-500'>Berakhiran konsonan</p><p class='font-black text-2xl'>BANTAL, PENSIL</p></div></div></div>",
     "questions": [
        {"id":"q0","question":"BUKU — kata terbuka atau tertutup?","options":["Terbuka (berakhir U)","Tertutup","Bukan keduanya"],"correctIndex":0},
        {"id":"q1","question":"BANTAL — kata terbuka atau tertutup?","options":["Tertutup (berakhir L)","Terbuka","Bukan keduanya"],"correctIndex":0},
        {"id":"q2","question":"PENSIL — berakhiran huruf apa?","options":["L","I","N"],"correctIndex":0},
        {"id":"q3","question":"BINTANG — berakhiran huruf apa?","options":["G","N","A"],"correctIndex":0},
        {"id":"q4","question":"MEJA — kata terbuka atau tertutup?","options":["Terbuka (berakhir A)","Tertutup","Tidak tahu"],"correctIndex":0},
        {"id":"q5","question":"LAMPU — berakhiran huruf apa?","options":["U","P","M"],"correctIndex":0},
        {"id":"q6","question":"KANTOR — berakhiran huruf apa?","options":["R","O","N"],"correctIndex":0},
        {"id":"q7","question":"PINTU — kata terbuka atau tertutup?","options":["Terbuka (berakhir U)","Tertutup","Bukan keduanya"],"correctIndex":0},
        {"id":"q8","question":"RUMPUT — berakhiran huruf apa?","options":["T","U","P"],"correctIndex":0},
        {"id":"q9","question":"DOMBA — kata terbuka atau tertutup?","options":["Terbuka (berakhir A)","Tertutup","Tidak tahu"],"correctIndex":0},
        {"id":"q10","question":"TANGAN — berakhiran huruf apa?","options":["N","A","G"],"correctIndex":0},
        {"id":"q11","question":"MANGGA — kata terbuka atau tertutup?","options":["Terbuka (berakhir A)","Tertutup","Tidak tahu"],"correctIndex":0},
        {"id":"q12","question":"RAMBUT — berakhiran huruf apa?","options":["T","U","B"],"correctIndex":0},
        {"id":"q13","question":"ANJING — berakhiran huruf apa?","options":["G","N","I"],"correctIndex":0},
        {"id":"q14","question":"KUCING — berakhiran huruf apa?","options":["G","N","I"],"correctIndex":0},
     ]},
]
write_js("membaca-5.js", "membaca5", {
    "id":"membaca-5","title":"Level 5: Kata Berakhiran Konsonan","badge":"Kelas 1",
    "icon":"🛏️","description":"Membaca kata-kata yang berakhiran konsonan seperti BANTAL, PENSIL, BINTANG.",
    "lessons": mb5_lessons
})
print("membaca-5.js done")

# ========================================================
# MEMBACA 6 — Kalimat Pendek
# ========================================================
kalimat_data = [
    ("Ibu memasak nasi.","Ibu","memasak","nasi","👩‍🍳"),
    ("Ayah pergi ke kantor.","Ayah","pergi","kantor","👨‍💼"),
    ("Budi main bola di lapangan.","Budi","main","bola","⚽"),
    ("Adik minum susu setiap pagi.","Adik","minum","susu","🥛"),
    ("Kucing tidur di atas bantal.","Kucing","tidur","bantal","🐱"),
    ("Burung terbang tinggi di langit.","Burung","terbang","langit","🐦"),
    ("Ikan berenang di dalam kolam.","Ikan","berenang","kolam","🐟"),
    ("Sita beli buku baru di toko.","Sita","beli","buku","📚"),
    ("Ani suka makan buah apel.","Ani","makan","apel","🍎"),
    ("Rudi naik sepeda ke sekolah.","Rudi","naik","sepeda","🚲"),
]

def kal_content(kalimat_pool):
    html = "<div class='space-y-3'>"
    for kal, subj, verb, obj, e in kalimat_pool:
        html += f"<div class='bg-pink-50 border-l-8 border-pink-400 rounded-xl p-4 flex items-center gap-4'><span class='text-4xl'>{e}</span><p class='text-xl font-bold text-slate-700'>{kal}</p></div>"
    html += "</div>"
    return html

def kal_quiz(kalimat_pool):
    qs = []
    for kal, subj, verb, obj, e in kalimat_pool[:5]:
        opts = [subj, verb, obj]; random.shuffle(opts)
        qs.append({"id":f"q{len(qs)}","question":f"'{kal}' — siapa yang melakukan kegiatan?","options":opts,"correctIndex":opts.index(subj)})
    for kal, subj, verb, obj, e in kalimat_pool[3:8]:
        opts = [verb, subj, obj]; random.shuffle(opts)
        qs.append({"id":f"q{len(qs)}","question":f"'{kal}' — apa yang dilakukan?","options":opts,"correctIndex":opts.index(verb)})
    for kal, subj, verb, obj, e in kalimat_pool[5:]:
        opts = [obj, subj, verb]; random.shuffle(opts)
        qs.append({"id":f"q{len(qs)}","question":f"'{kal}' — apa objeknya?","options":opts,"correctIndex":opts.index(obj)})
    return qs[:15]

mb6_lessons = [
    {"id":"mb6_1","title":"Kalimat Sederhana","icon":"📝","difficulty":"Mudah","duration":"15 menit",
     "content": kal_content(kalimat_data[:5]), "questions": kal_quiz(kalimat_data[:8])},
    {"id":"mb6_2","title":"Siapa, Apa, Di mana?","icon":"🤔","difficulty":"Sedang","duration":"15 menit",
     "content": "<div class='space-y-4'><div class='grid grid-cols-3 gap-3 mb-4'><div class='bg-blue-50 border-2 border-blue-200 rounded-xl p-3 text-center'><span class='text-3xl block'>🙋</span><span class='font-black text-blue-600'>SIAPA?</span><span class='text-sm text-blue-400 block'>pelaku</span></div><div class='bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3 text-center'><span class='text-3xl block'>🏃</span><span class='font-black text-emerald-600'>APA?</span><span class='text-sm text-emerald-400 block'>kegiatan</span></div><div class='bg-pink-50 border-2 border-pink-200 rounded-xl p-3 text-center'><span class='text-3xl block'>📍</span><span class='font-black text-pink-600'>DI MANA?</span><span class='text-sm text-pink-400 block'>tempat</span></div></div>" + kal_content(kalimat_data[5:]), "questions": kal_quiz(kalimat_data)},
    {"id":"mb6_3","title":"Melengkapi Kalimat","icon":"✏️","difficulty":"Sulit","duration":"15 menit",
     "content": "<div class='space-y-3'><h3 class='text-2xl font-black text-pink-600'>Lengkapi kalimat di bawah ini!</h3>" + kal_content(kalimat_data) + "</div>",
     "questions": [
        {"id":"q0","question":"Ibu ___ nasi di dapur.","options":["memasak","berenang","terbang"],"correctIndex":0},
        {"id":"q1","question":"___ main bola di lapangan.","options":["Budi","Ikan","Burung"],"correctIndex":0},
        {"id":"q2","question":"Adik minum ___ setiap pagi.","options":["susu","bola","buku"],"correctIndex":0},
        {"id":"q3","question":"Kucing tidur di atas ___.","options":["bantal","pohon","kolam"],"correctIndex":0},
        {"id":"q4","question":"Burung terbang tinggi di ___.","options":["langit","kolam","dapur"],"correctIndex":0},
        {"id":"q5","question":"Ikan berenang di dalam ___.","options":["kolam","langit","kantor"],"correctIndex":0},
        {"id":"q6","question":"Sita beli ___ baru di toko.","options":["buku","bola","pensil"],"correctIndex":0},
        {"id":"q7","question":"Rudi naik ___ ke sekolah.","options":["sepeda","mobil","kapal"],"correctIndex":0},
        {"id":"q8","question":"Ani suka makan buah ___.","options":["apel","bantal","susu"],"correctIndex":0},
        {"id":"q9","question":"Ayah pergi ke ___.","options":["kantor","kolam","sekolah"],"correctIndex":0},
        {"id":"q10","question":"Kata tanya untuk menanyakan pelaku adalah...","options":["Siapa","Di mana","Kapan"],"correctIndex":0},
        {"id":"q11","question":"Kata tanya untuk menanyakan tempat adalah...","options":["Di mana","Siapa","Apa"],"correctIndex":0},
        {"id":"q12","question":"Kata tanya untuk menanyakan kegiatan adalah...","options":["Apa","Siapa","Di mana"],"correctIndex":0},
        {"id":"q13","question":"Kalimat yang baik memiliki...","options":["Subjek dan predikat","Hanya kata benda","Hanya angka"],"correctIndex":0},
        {"id":"q14","question":"'Adik minum susu.' — kata 'minum' termasuk...","options":["Kata kerja","Kata benda","Kata sifat"],"correctIndex":0},
     ]},
]
write_js("membaca-6.js", "membaca6", {
    "id":"membaca-6","title":"Level 6: Kalimat Pendek","badge":"Kelas 1-2",
    "icon":"📝","description":"Membaca dan memahami kalimat pendek sehari-hari: Siapa, Apa, Di mana.",
    "lessons": mb6_lessons
})
print("membaca-6.js done")

# ========================================================
# MEMBACA 7-10 — Level lanjut (rich content)
# ========================================================
# Level 7: Cerita Pendek + Teks Narasi
# Level 8: Membaca Paragraf
# Level 9: Jenis Teks
# Level 10: Membaca Kritis

membaca_lanjut = [
    (7, "Cerita Pendek", "Kelas 2-3", "📖",
     "<div class='space-y-4'><div class='bg-pink-50 border-4 border-pink-200 rounded-2xl p-6'><h3 class='text-xl font-black text-pink-600 mb-3'>🐱 Kisah Si Kucing</h3><p class='text-lg text-slate-700 leading-relaxed'>Si Mimi adalah seekor kucing kecil yang tinggal di rumah Pak Budi. Setiap pagi, Mimi bermain di taman. Ia suka mengejar kupu-kupu dan daun yang jatuh. Ketika lapar, Mimi mengeong memanggil Pak Budi untuk diberi makan.</p></div><div class='bg-blue-50 border-4 border-blue-200 rounded-2xl p-6'><h3 class='text-xl font-black text-blue-600 mb-3'>🌳 Pohon Mangga</h3><p class='text-lg text-slate-700 leading-relaxed'>Di halaman rumah Ani terdapat sebuah pohon mangga. Setiap musim panas, pohon itu berbuah lebat. Ani dan teman-temannya sering bermain di bawah pohon itu. Mereka memakan mangga yang manis dan segar bersama-sama.</p></div></div>",
     [{"id":"q0","question":"Siapa nama kucing dalam cerita?","options":["Mimi","Budi","Ani"],"correctIndex":0},
      {"id":"q1","question":"Di mana Mimi bermain setiap pagi?","options":["Di taman","Di kolam","Di sekolah"],"correctIndex":0},
      {"id":"q2","question":"Apa yang dikejar Mimi di taman?","options":["Kupu-kupu dan daun","Ikan dan bola","Buku dan pensil"],"correctIndex":0},
      {"id":"q3","question":"Apa yang dilakukan Mimi saat lapar?","options":["Mengeong","Berlari","Tidur"],"correctIndex":0},
      {"id":"q4","question":"Pohon apa yang ada di halaman Ani?","options":["Mangga","Apel","Pisang"],"correctIndex":0},
      {"id":"q5","question":"Kapan pohon mangga berbuah?","options":["Musim panas","Musim hujan","Musim dingin"],"correctIndex":0},
      {"id":"q6","question":"Apa yang dilakukan Ani di bawah pohon?","options":["Bermain bersama teman","Belajar sendirian","Tidur siang"],"correctIndex":0},
      {"id":"q7","question":"Bagaimana rasa mangga dalam cerita?","options":["Manis dan segar","Asam dan pahit","Asin dan pedas"],"correctIndex":0},
      {"id":"q8","question":"Cerita tentang Mimi termasuk jenis cerita...","options":["Hewan (fabel)","Sejarah","Ilmu pengetahuan"],"correctIndex":0},
      {"id":"q9","question":"Ide pokok cerita Si Kucing adalah...","options":["Keseharian kucing bernama Mimi","Cara memberi makan kucing","Jenis-jenis hewan peliharaan"],"correctIndex":0},
      {"id":"q10","question":"Kata 'bermain' termasuk jenis kata...","options":["Kata kerja","Kata benda","Kata sifat"],"correctIndex":0},
      {"id":"q11","question":"Kata 'manis' termasuk jenis kata...","options":["Kata sifat","Kata kerja","Kata benda"],"correctIndex":0},
      {"id":"q12","question":"Kata 'halaman' dalam cerita bermakna...","options":["Pekarangan rumah","Halaman buku","Nomor halaman"],"correctIndex":0},
      {"id":"q13","question":"Kalimat 'Mimi mengeong memanggil Pak Budi' artinya...","options":["Mimi minta makan","Mimi sedang bermain","Mimi sedang tidur"],"correctIndex":0},
      {"id":"q14","question":"Apa perbedaan antara dua cerita di atas?","options":["Tokoh dan tempatnya berbeda","Sama persis","Tidak ada perbedaan"],"correctIndex":0}]),
    (8, "Membaca Paragraf", "Kelas 3", "📄",
     "<div class='space-y-4'><div class='bg-emerald-50 border-4 border-emerald-200 rounded-2xl p-6'><h3 class='text-xl font-black text-emerald-600 mb-3'>Struktur Paragraf</h3><div class='space-y-2'><div class='flex gap-2 items-start'><span class='bg-emerald-500 text-white font-black px-2 py-1 rounded text-sm flex-shrink-0'>1</span><p><b>Kalimat Utama</b> — kalimat yang memuat ide pokok, biasanya di awal atau akhir paragraf.</p></div><div class='flex gap-2 items-start'><span class='bg-blue-500 text-white font-black px-2 py-1 rounded text-sm flex-shrink-0'>2</span><p><b>Kalimat Penjelas</b> — kalimat yang menjelaskan kalimat utama lebih detail.</p></div></div></div><div class='bg-blue-50 border-4 border-blue-200 rounded-2xl p-6'><h3 class='text-xl font-black text-blue-600 mb-3'>📖 Contoh</h3><p class='text-lg text-slate-700 leading-relaxed'><span class='bg-emerald-200 rounded px-1'>Lingkungan sekolah harus dijaga kebersihannya.</span> Sampah harus dibuang pada tempatnya. Lantai perlu disapu setiap hari. Taman sekolah disiram agar tanaman tetap segar. <span class='bg-blue-200 rounded px-1'>Dengan lingkungan bersih, kita bisa belajar dengan nyaman.</span></p></div></div>",
     [{"id":"q0","question":"Kalimat utama adalah...","options":["Kalimat yang berisi ide pokok","Kalimat yang paling panjang","Kalimat pertanyaan"],"correctIndex":0},
      {"id":"q1","question":"Dalam paragraf, kalimat utama biasanya ada di...","options":["Awal atau akhir","Tengah saja","Tidak tertentu posisinya"],"correctIndex":0},
      {"id":"q2","question":"Ide pokok paragraf adalah...","options":["Gagasan utama yang ingin disampaikan","Nama pengarang","Judul cerita"],"correctIndex":0},
      {"id":"q3","question":"Dalam contoh paragraf, ide pokoknya adalah...","options":["Lingkungan sekolah harus bersih","Sampah harus dibuang","Lantai perlu disapu"],"correctIndex":0},
      {"id":"q4","question":"Kalimat 'Sampah harus dibuang pada tempatnya' termasuk...","options":["Kalimat penjelas","Kalimat utama","Kalimat pertanyaan"],"correctIndex":0},
      {"id":"q5","question":"Paragraf berisi minimal berapa kalimat?","options":["3 kalimat","1 kalimat","10 kalimat"],"correctIndex":0},
      {"id":"q6","question":"Kata 'kebersihan' berasal dari kata dasar...","options":["bersih","bersih-bersihan","membersihkan"],"correctIndex":0},
      {"id":"q7","question":"'Taman sekolah disiram agar tanaman tetap segar.' Tujuan disiram adalah...","options":["Agar tanaman tetap segar","Agar tanaman mati","Agar taman basah"],"correctIndex":0},
      {"id":"q8","question":"Sinonim kata 'nyaman' adalah...","options":["enak","susah","kotor"],"correctIndex":0},
      {"id":"q9","question":"Antonym kata 'bersih' adalah...","options":["kotor","rapi","indah"],"correctIndex":0},
      {"id":"q10","question":"Kata 'lingkungan' artinya...","options":["Sekitar tempat tinggal","Nama orang","Jenis makanan"],"correctIndex":0},
      {"id":"q11","question":"Mengapa lantai perlu disapu setiap hari?","options":["Agar bersih dan nyaman","Agar menjadi basah","Agar rusak"],"correctIndex":0},
      {"id":"q12","question":"Kata 'sekolah' termasuk kata...","options":["Benda (tempat)","Kerja","Sifat"],"correctIndex":0},
      {"id":"q13","question":"Berapa kalimat penjelas dalam paragraf contoh?","options":["3","1","5"],"correctIndex":0},
      {"id":"q14","question":"Paragraf yang baik harus memiliki...","options":["Ide pokok yang jelas","Banyak kata asing","Kalimat yang sangat panjang"],"correctIndex":0}]),
    (9, "Jenis-Jenis Teks", "Kelas 4-5", "📑",
     "<div class='space-y-4'><div class='grid grid-cols-1 sm:grid-cols-2 gap-4'><div class='bg-blue-50 border-4 border-blue-200 rounded-2xl p-5'><h3 class='font-black text-blue-600 text-lg mb-2'>📖 Narasi</h3><p class='text-slate-600'>Menceritakan urutan peristiwa. Ada tokoh, alur, dan latar. <i>Contoh: Dongeng, cerpen</i></p></div><div class='bg-emerald-50 border-4 border-emerald-200 rounded-2xl p-5'><h3 class='font-black text-emerald-600 text-lg mb-2'>🎨 Deskripsi</h3><p class='text-slate-600'>Menggambarkan suatu objek secara detail. <i>Contoh: Mendeskripsikan suasana alam</i></p></div><div class='bg-orange-50 border-4 border-orange-200 rounded-2xl p-5'><h3 class='font-black text-orange-600 text-lg mb-2'>💡 Eksposisi</h3><p class='text-slate-600'>Memaparkan informasi atau pengetahuan. <i>Contoh: Artikel, ensiklopedia</i></p></div><div class='bg-pink-50 border-4 border-pink-200 rounded-2xl p-5'><h3 class='font-black text-pink-600 text-lg mb-2'>🗣️ Persuasi</h3><p class='text-slate-600'>Mengajak atau membujuk pembaca. <i>Contoh: Iklan, poster ajakan</i></p></div></div></div>",
     [{"id":"q0","question":"Teks narasi bertujuan untuk...","options":["Menceritakan urutan peristiwa","Menjelaskan cara kerja","Mengajak pembaca"],"correctIndex":0},
      {"id":"q1","question":"Dongeng termasuk jenis teks...","options":["Narasi","Deskripsi","Eksposisi"],"correctIndex":0},
      {"id":"q2","question":"Teks deskripsi bertujuan untuk...","options":["Menggambarkan objek secara detail","Menceritakan cerita","Mengajak pembaca"],"correctIndex":0},
      {"id":"q3","question":"Artikel ilmiah termasuk jenis teks...","options":["Eksposisi","Narasi","Persuasi"],"correctIndex":0},
      {"id":"q4","question":"Iklan termasuk jenis teks...","options":["Persuasi","Narasi","Deskripsi"],"correctIndex":0},
      {"id":"q5","question":"Teks yang mengajak pembaca disebut...","options":["Persuasi","Eksposisi","Narasi"],"correctIndex":0},
      {"id":"q6","question":"'Bunga mawar itu berwarna merah dengan kelopak halus.' Ini contoh teks...","options":["Deskripsi","Narasi","Persuasi"],"correctIndex":0},
      {"id":"q7","question":"'Pada suatu hari, Budi pergi ke hutan.' Ini teks...","options":["Narasi","Deskripsi","Eksposisi"],"correctIndex":0},
      {"id":"q8","question":"'Ayo hemat listrik demi masa depan!' Ini teks...","options":["Persuasi","Narasi","Deskripsi"],"correctIndex":0},
      {"id":"q9","question":"Unsur utama teks narasi adalah...","options":["Tokoh, alur, latar","Fakta dan data","Ajakan dan bujukan"],"correctIndex":0},
      {"id":"q10","question":"Ensiklopedia termasuk jenis teks...","options":["Eksposisi","Narasi","Deskripsi"],"correctIndex":0},
      {"id":"q11","question":"Poster 'Jangan Buang Sampah Sembarangan!' termasuk...","options":["Persuasi","Narasi","Eksposisi"],"correctIndex":0},
      {"id":"q12","question":"Cerpen adalah singkatan dari...","options":["Cerita Pendek","Cerita Penting","Cerita Pengantar"],"correctIndex":0},
      {"id":"q13","question":"Ciri teks deskripsi adalah...","options":["Banyak kata sifat dan perbandingan","Banyak kata kerja","Banyak angka dan data"],"correctIndex":0},
      {"id":"q14","question":"'Gula itu manis dan berwarna putih.' Ini teks...","options":["Deskripsi","Narasi","Persuasi"],"correctIndex":0}]),
    (10, "Membaca Kritis", "SMP", "🔍",
     "<div class='space-y-4'><div class='bg-indigo-50 border-4 border-indigo-200 rounded-2xl p-6'><h3 class='text-xl font-black text-indigo-600 mb-3'>Apa itu Membaca Kritis?</h3><p class='text-slate-700 text-lg'>Membaca kritis berarti tidak hanya memahami isi teks, tetapi juga <b>menganalisis</b>, <b>mengevaluasi</b>, dan <b>menilai kebenaran</b> informasi yang disampaikan.</p></div><div class='grid grid-cols-1 sm:grid-cols-2 gap-4'><div class='bg-amber-50 border-4 border-amber-200 rounded-2xl p-4'><h3 class='font-black text-amber-600'>💭 Strategi</h3><ul class='text-slate-600 list-disc list-inside space-y-1 mt-2'><li>Temukan fakta vs. opini</li><li>Cari tujuan penulis</li><li>Pertanyakan asumsi</li><li>Cari bukti pendukung</li></ul></div><div class='bg-rose-50 border-4 border-rose-200 rounded-2xl p-4'><h3 class='font-black text-rose-600'>⚠️ Waspada!</h3><ul class='text-slate-600 list-disc list-inside space-y-1 mt-2'><li>Informasi yang menyesatkan</li><li>Hoaks / berita palsu</li><li>Sumber yang tidak jelas</li><li>Generalisasi berlebihan</li></ul></div></div></div>",
     [{"id":"q0","question":"Membaca kritis artinya...","options":["Menganalisis dan mengevaluasi teks","Membaca dengan cepat","Membaca sambil menulis"],"correctIndex":0},
      {"id":"q1","question":"'Fakta' adalah...","options":["Pernyataan yang bisa dibuktikan kebenarannya","Pendapat seseorang","Dugaan tanpa bukti"],"correctIndex":0},
      {"id":"q2","question":"'Opini' adalah...","options":["Pendapat atau pandangan seseorang","Hal yang sudah terbukti","Angka statistik resmi"],"correctIndex":0},
      {"id":"q3","question":"'Jakarta adalah ibu kota Indonesia.' Ini termasuk...","options":["Fakta","Opini","Dugaan"],"correctIndex":0},
      {"id":"q4","question":"'Film itu sangat bagus.' Ini termasuk...","options":["Opini","Fakta","Data"],"correctIndex":0},
      {"id":"q5","question":"Cara mengecek kebenaran berita adalah...","options":["Cek sumber, cari berita lain yang sama","Langsung percaya","Sebarkan tanpa cek"],"correctIndex":0},
      {"id":"q6","question":"Hoaks adalah...","options":["Informasi palsu yang disebarkan","Berita resmi dari pemerintah","Artikel ilmiah"],"correctIndex":0},
      {"id":"q7","question":"Mengapa perlu membaca kritis?","options":["Agar tidak mudah tertipu informasi palsu","Agar bisa membaca cepat","Agar nilai ujian bagus"],"correctIndex":0},
      {"id":"q8","question":"'Semua orang pasti suka makan pedas.' Ini adalah...","options":["Generalisasi berlebihan","Fakta ilmiah","Data statistik"],"correctIndex":0},
      {"id":"q9","question":"Sebelum mempercayai informasi, kita harus...","options":["Mengecek sumbernya","Langsung menyebarkan","Mengabaikannya"],"correctIndex":0},
      {"id":"q10","question":"Sumber terpercaya untuk informasi adalah...","options":["Lembaga resmi, jurnal ilmiah","Gosip","Obrolan warung"],"correctIndex":0},
      {"id":"q11","question":"Tujuan penulis bisa diketahui dari...","options":["Pilihan kata, struktur teks, dan konteks","Warna tulisan","Ukuran font"],"correctIndex":0},
      {"id":"q12","question":"Teks persuasi sering menggunakan kata...","options":["Ayo, mari, harap, jangan","Itu, ini, sana, sini","Dan, atau, tetapi"],"correctIndex":0},
      {"id":"q13","question":"Cara mendeteksi berita palsu...","options":["Cek tanggal, sumber, dan foto","Lihat judul saja","Percaya teman yang kirim"],"correctIndex":0},
      {"id":"q14","question":"Inferensi dalam membaca berarti...","options":["Menyimpulkan sesuatu yang tidak tertulis langsung","Membaca dengan keras","Mencatat semua kata"],"correctIndex":0}]),
]

for lvl, title, badge, icon, content, questions in membaca_lanjut:
    def make_lesson(n, content, qs):
        portions = max(1, len(qs) // 3)
        return {
            "id": f"mb{lvl}_{n}", "title": f"Bagian {n}", "icon": icon,
            "difficulty": "Mudah" if n == 1 else ("Sedang" if n == 2 else "Sulit"),
            "duration": "15 menit",
            "content": content,
            "questions": qs
        }
    lessons = [
        make_lesson(1, content, questions),
        make_lesson(2, content, questions),
        make_lesson(3, content, questions),
    ]
    write_js(f"membaca-{lvl}.js", f"membaca{lvl}", {
        "id": f"membaca-{lvl}", "title": f"Level {lvl}: {title}", "badge": badge,
        "icon": icon, "description": title,
        "lessons": lessons
    })
    print(f"membaca-{lvl}.js done")

print("\n=== MEMBACA DONE ===\n")

# ========================================================
# MATEMATIKA 1-3: PAUD — Full Visual
# ========================================================

def num_grid_paud(nums):
    """Show numbers 1-10 with emoji dots"""
    dot_emojis = ["","⭐","⭐⭐","⭐⭐⭐","⭐⭐⭐⭐","⭐⭐⭐⭐⭐",
                  "🌟🌟🌟🌟🌟🌟","🌟🌟🌟🌟🌟🌟🌟","🌟🌟🌟🌟🌟🌟🌟🌟","🌟🌟🌟🌟🌟🌟🌟🌟🌟","🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟"]
    colors = ["pink","orange","yellow","green","blue","indigo","purple","red","emerald","amber"]
    html = "<div class='grid grid-cols-2 sm:grid-cols-3 gap-4'>"
    for n in nums:
        c = colors[(n-1) % len(colors)]
        html += f"<div class='flex flex-col items-center bg-{c}-50 border-4 border-{c}-200 rounded-3xl p-5 hover:scale-105 transition-transform'><span class='text-7xl font-black text-{c}-600 mb-2'>{n}</span><div class='text-2xl leading-tight text-center'>{dot_emojis[n]}</div></div>"
    html += "</div>"
    return html

def num_quiz_paud(max_n, count=15):
    qs = []
    nums = list(range(1, max_n+1))
    
    # Type A: Count dots, pick number
    for i in range(5):
        n = random.choice(nums)
        dots = "⭐" * n
        wrong = random.sample([x for x in nums if x != n], 2)
        opts = [str(n), str(wrong[0]), str(wrong[1])]; random.shuffle(opts)
        qs.append({"id":f"q{len(qs)}","question":f"Ada berapa bintang? {dots}","options":opts,"correctIndex":opts.index(str(n))})
    
    # Type B: Number to emoji count
    for i in range(5):
        n = random.choice(nums)
        wrong = random.sample([x for x in nums if x != n], 2)
        emojis_correct = "🍎" * n; emojis_w1 = "🍎" * wrong[0]; emojis_w2 = "🍎" * wrong[1]
        opts = [emojis_correct, emojis_w1, emojis_w2]; random.shuffle(opts)
        qs.append({"id":f"q{len(qs)}","question":f"Gambar mana yang menunjukkan angka {n}?","options":opts,"correctIndex":opts.index(emojis_correct)})
    
    # Type C: Which comes next
    for i in range(5):
        n = random.choice([x for x in nums if x < max_n])
        wrong = random.sample([x for x in nums if x != n+1], 2)
        opts = [str(n+1), str(wrong[0]), str(wrong[1])]; random.shuffle(opts)
        qs.append({"id":f"q{len(qs)}","question":f"Angka setelah {n} adalah...","options":opts,"correctIndex":opts.index(str(n+1))})
    
    return qs[:count]

math1_lessons = [
    {"id":"mth1_1","title":"Angka 1 - 5","icon":"1️⃣","difficulty":"Mudah","duration":"10 menit",
     "content": num_grid_paud([1,2,3,4,5]), "questions": num_quiz_paud(5)},
    {"id":"mth1_2","title":"Angka 6 - 10","icon":"6️⃣","difficulty":"Mudah","duration":"10 menit",
     "content": num_grid_paud([6,7,8,9,10]), "questions": num_quiz_paud(10)},
    {"id":"mth1_3","title":"Latihan 1-10","icon":"🏆","difficulty":"Sedang","duration":"10 menit",
     "content": num_grid_paud(list(range(1,11))), "questions": num_quiz_paud(10)},
]
write_js("math-1.js", "math1", {
    "id":"math-1","title":"Level 1: Mengenal Angka 1-10","badge":"PAUD",
    "icon":"🔢","description":"Belajar mengenal angka 1 sampai 10 dengan gambar bintang dan emoji yang menarik.",
    "lessons": math1_lessons
})
print("math-1.js done")

# MATH 2: Berhitung Awal (PAUD)
def count_quiz_paud(count=15):
    qs = []
    items = ["🍎","🐱","🌟","🌸","🐶","🦋","🍊","🐟","🎈","🏀"]
    
    for i in range(count):
        n = random.randint(1, 5)
        item = random.choice(items)
        display = item * n
        wrong = random.sample([x for x in range(1,8) if x != n], 2)
        opts = [str(n), str(wrong[0]), str(wrong[1])]; random.shuffle(opts)
        qs.append({"id":f"q{i}","question":f"Hitung: {display}","options":opts,"correctIndex":opts.index(str(n))})
    return qs

count_content = "<div class='space-y-4'><div class='text-center'><span class='text-8xl block mb-4'>🧮</span><h2 class='text-3xl font-black text-blue-600'>Mari Berhitung!</h2></div>"
count_content += "<div class='grid grid-cols-2 gap-4'>"
count_examples = [("🍎🍎🍎","3"),("🌟🌟","2"),("🐱🐱🐱🐱","4"),("🎈","1"),("🐶🐶🐶🐶🐶","5")]
for emojis, num in count_examples:
    count_content += f"<div class='flex flex-col items-center bg-blue-50 border-4 border-blue-200 rounded-2xl p-4'><span class='text-5xl'>{emojis}</span><span class='text-4xl font-black text-blue-700 mt-3'>{num}</span></div>"
count_content += "</div></div>"

math2_lessons = [
    {"id":"mth2_1","title":"Menghitung 1-3","icon":"🔢","difficulty":"Mudah","duration":"10 menit",
     "content": count_content, "questions": count_quiz_paud()},
    {"id":"mth2_2","title":"Menghitung 1-5","icon":"🖐️","difficulty":"Mudah","duration":"10 menit",
     "content": count_content, "questions": count_quiz_paud()},
    {"id":"mth2_3","title":"Menghitung 1-10","icon":"🏆","difficulty":"Sedang","duration":"10 menit",
     "content": num_grid_paud(list(range(1,11))), "questions": [
        {"id":f"q{i}","question":f"Berapa? {'⭐'*n}","options":o,"correctIndex":oi}
        for i,(n,o,oi) in enumerate([
            (3, ["3","2","4"], 0),(5, ["4","5","6"], 1),(2, ["1","2","3"], 1),
            (7, ["7","8","6"], 0),(4, ["3","4","5"], 1),(1, ["1","2","3"], 0),
            (6, ["5","6","7"], 1),(8, ["7","8","9"], 1),(9, ["8","9","10"], 1),
            (10, ["9","10","11"], 1),(3, ["2","4","3"], 2),(5, ["5","4","6"], 0),
            (7, ["6","8","7"], 2),(2, ["2","3","1"], 0),(9, ["9","8","10"], 0),
        ])
     ]},
]
write_js("math-2.js", "math2", {
    "id":"math-2","title":"Level 2: Menghitung Benda","badge":"PAUD",
    "icon":"🧮","description":"Latihan menghitung jumlah benda 1-10 menggunakan gambar emoji yang menyenangkan.",
    "lessons": math2_lessons
})
print("math-2.js done")

# MATH 3: Lebih Besar / Lebih Kecil (PAUD)
def compare_quiz_paud(count=15):
    qs = []
    emojis_map = {1:"🍎",2:"🍊🍊",3:"🍇🍇🍇",4:"🍓🍓🍓🍓",5:"🍑🍑🍑🍑🍑",
                  6:"🥝🥝🥝🥝🥝🥝",7:"🍍🍍🍍🍍🍍🍍🍍",8:"🍒🍒🍒🍒🍒🍒🍒🍒",9:"🥭🥭🥭🥭🥭🥭🥭🥭🥭",10:"🫐🫐🫐🫐🫐🫐🫐🫐🫐🫐"}
    
    pairs_used = set()
    while len(qs) < count:
        a = random.randint(1,9); b = random.randint(1,10)
        if a == b or (a,b) in pairs_used: continue
        pairs_used.add((a,b))
        bigger = max(a,b); smaller = min(a,b)
        q_type = random.randint(0,1)
        if q_type == 0:
            opts = [str(bigger), str(smaller), str(bigger+1)]
            random.shuffle(opts)
            qs.append({"id":f"q{len(qs)}","question":f"{emojis_map[a]} vs {emojis_map[b]} — mana yang LEBIH BANYAK?","options":opts,"correctIndex":opts.index(str(bigger))})
        else:
            opts = [str(smaller), str(bigger), str(max(1,smaller-1))]
            random.shuffle(opts)
            qs.append({"id":f"q{len(qs)}","question":f"{emojis_map[a]} vs {emojis_map[b]} — mana yang LEBIH SEDIKIT?","options":opts,"correctIndex":opts.index(str(smaller))})
    return qs[:count]

compare_content = "<div class='space-y-4'>"
compare_content += "<div class='text-center mb-4'><span class='text-7xl block'>⚖️</span><h2 class='text-3xl font-black text-blue-600'>Lebih Besar atau Lebih Kecil?</h2></div>"
compare_content += "<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>"
compare_examples = [(3,5,"<",("🍎🍎🍎","🍊🍊🍊🍊🍊")),(7,4,">",("🌟🌟🌟🌟🌟🌟🌟","⭐⭐⭐⭐")),(2,2,"=",("🐱🐱","🐶🐶"))]
for a,b,sym,(ea,eb) in compare_examples:
    color = "blue" if sym == "<" else ("red" if sym == ">" else "emerald")
    compare_content += f"<div class='flex items-center justify-center gap-2 bg-{color}-50 border-4 border-{color}-200 rounded-2xl p-4'><div class='text-center'><span class='text-3xl block'>{ea}</span><span class='text-2xl font-black text-{color}-700'>{a}</span></div><span class='text-4xl font-black text-{color}-600'>{sym}</span><div class='text-center'><span class='text-3xl block'>{eb}</span><span class='text-2xl font-black text-{color}-700'>{b}</span></div></div>"
compare_content += "</div></div>"

math3_lessons = [
    {"id":"mth3_1","title":"Lebih Banyak atau Lebih Sedikit?","icon":"⚖️","difficulty":"Mudah","duration":"10 menit",
     "content": compare_content, "questions": compare_quiz_paud()},
    {"id":"mth3_2","title":"Simbol > < =","icon":"🔍","difficulty":"Sedang","duration":"12 menit",
     "content": "<div class='space-y-4'><div class='text-center mb-4'><span class='text-7xl block'>🔍</span><h2 class='text-3xl font-black text-blue-600'>Simbol Perbandingan</h2></div><div class='grid grid-cols-3 gap-4'><div class='flex flex-col items-center bg-red-50 border-4 border-red-200 rounded-3xl p-6'><span class='text-8xl font-black text-red-600'>&gt;</span><p class='text-xl font-bold text-red-500 mt-2'>Lebih Besar</p><p class='text-red-400'>5 &gt; 3</p></div><div class='flex flex-col items-center bg-blue-50 border-4 border-blue-200 rounded-3xl p-6'><span class='text-8xl font-black text-blue-600'>&lt;</span><p class='text-xl font-bold text-blue-500 mt-2'>Lebih Kecil</p><p class='text-blue-400'>3 &lt; 5</p></div><div class='flex flex-col items-center bg-emerald-50 border-4 border-emerald-200 rounded-3xl p-6'><span class='text-8xl font-black text-emerald-600'>=</span><p class='text-xl font-bold text-emerald-500 mt-2'>Sama Dengan</p><p class='text-emerald-400'>4 = 4</p></div></div></div>",
     "questions": [
        {"id":"q0","question":"5 ___ 3","options":[">","<","="],"correctIndex":0},
        {"id":"q1","question":"2 ___ 7","options":["<",">","="],"correctIndex":0},
        {"id":"q2","question":"4 ___ 4","options":["=",">","<"],"correctIndex":0},
        {"id":"q3","question":"9 ___ 1","options":[">","<","="],"correctIndex":0},
        {"id":"q4","question":"1 ___ 10","options":["<",">","="],"correctIndex":0},
        {"id":"q5","question":"🍎🍎🍎 ___ 🍊🍊","options":[">","<","="],"correctIndex":0},
        {"id":"q6","question":"⭐ ___ 🌟🌟🌟🌟","options":["<",">","="],"correctIndex":0},
        {"id":"q7","question":"🐱🐱 ___ 🐶🐶","options":["=",">","<"],"correctIndex":0},
        {"id":"q8","question":"6 ___ 8","options":["<",">","="],"correctIndex":0},
        {"id":"q9","question":"10 ___ 7","options":[">","<","="],"correctIndex":0},
        {"id":"q10","question":"Tanda '>' artinya...","options":["Lebih besar","Lebih kecil","Sama dengan"],"correctIndex":0},
        {"id":"q11","question":"Tanda '<' artinya...","options":["Lebih kecil","Lebih besar","Sama dengan"],"correctIndex":0},
        {"id":"q12","question":"Tanda '=' artinya...","options":["Sama dengan","Lebih besar","Lebih kecil"],"correctIndex":0},
        {"id":"q13","question":"3 ___ 3","options":["=",">","<"],"correctIndex":0},
        {"id":"q14","question":"7 ___ 6","options":[">","<","="],"correctIndex":0},
     ]},
    {"id":"mth3_3","title":"Urutan Angka","icon":"📊","difficulty":"Sedang","duration":"12 menit",
     "content": "<div class='space-y-4'><div class='text-center mb-4'><span class='text-7xl block'>📊</span><h2 class='text-3xl font-black text-blue-600'>Urutkan Angka!</h2></div><div class='flex flex-wrap justify-center gap-3'>" + "".join([f"<div class='w-14 h-14 flex items-center justify-center bg-blue-{100+i*100 if i < 8 else 800} border-4 border-blue-300 rounded-2xl text-2xl font-black text-blue-700'>{n}</div>" for i,n in enumerate(range(1,11))]) + "</div></div>",
     "questions": [
        {"id":"q0","question":"1, 2, 3, ___, 5","options":["4","6","3"],"correctIndex":0},
        {"id":"q1","question":"5, 6, ___, 8, 9","options":["7","5","9"],"correctIndex":0},
        {"id":"q2","question":"8, 9, ___","options":["10","7","11"],"correctIndex":0},
        {"id":"q3","question":"___, 2, 3, 4","options":["1","0","5"],"correctIndex":0},
        {"id":"q4","question":"3, ___, 5, 6","options":["4","2","6"],"correctIndex":0},
        {"id":"q5","question":"Urutan terkecil ke terbesar: 5, 2, 8, 1","options":["1,2,5,8","2,1,5,8","5,2,8,1"],"correctIndex":0},
        {"id":"q6","question":"Urutan terbesar ke terkecil: 3, 7, 1, 9","options":["9,7,3,1","1,3,7,9","7,9,3,1"],"correctIndex":0},
        {"id":"q7","question":"Angka genap: 2, ___, 6, 8","options":["4","3","5"],"correctIndex":0},
        {"id":"q8","question":"Angka ganjil: 1, 3, ___, 7","options":["5","4","6"],"correctIndex":0},
        {"id":"q9","question":"Angka di antara 4 dan 6 adalah...","options":["5","3","7"],"correctIndex":0},
        {"id":"q10","question":"Angka terkecil dari: 8, 3, 5, 1","options":["1","3","5"],"correctIndex":0},
        {"id":"q11","question":"Angka terbesar dari: 4, 7, 2, 9","options":["9","7","4"],"correctIndex":0},
        {"id":"q12","question":"6, 5, 4, ___","options":["3","7","2"],"correctIndex":0},
        {"id":"q13","question":"Angka genap antara 1 dan 10 ada berapa?","options":["5","4","6"],"correctIndex":0},
        {"id":"q14","question":"Angka ganjil antara 1 dan 10 ada berapa?","options":["5","4","6"],"correctIndex":0},
     ]},
]
write_js("math-3.js", "math3", {
    "id":"math-3","title":"Level 3: Lebih Besar & Lebih Kecil","badge":"PAUD-TK",
    "icon":"⚖️","description":"Membandingkan angka dan jumlah benda: lebih banyak, lebih sedikit, atau sama.",
    "lessons": math3_lessons
})
print("math-3.js done")

# ========================================================
# MATEMATIKA 4-25: Level Lanjut
# ========================================================
def rich_math_content(title, explanation, examples, tips=""):
    ex_html = "".join([f"<div class='flex items-center gap-4 bg-white border-2 border-slate-100 rounded-xl p-3'><span class='text-2xl font-black text-blue-600 font-mono'>{e[0]}</span><span class='text-slate-400 text-xl'>→</span><span class='text-xl font-black text-emerald-600'>{e[1]}</span></div>" for e in examples])
    tips_html = f"<div class='bg-amber-50 border-4 border-amber-200 rounded-2xl p-4'><p class='text-amber-700 font-bold'>💡 Tips: {tips}</p></div>" if tips else ""
    return f"""<div class='space-y-4'>
    <div class='bg-blue-50 border-4 border-blue-200 rounded-2xl p-5'>
        <h3 class='text-xl font-black text-blue-600 mb-2'>{title}</h3>
        <p class='text-slate-700 text-lg'>{explanation}</p>
    </div>
    <div class='space-y-3'>
        <h4 class='font-black text-slate-600'>Contoh:</h4>
        {ex_html}
    </div>
    {tips_html}
    </div>"""

def gen_math_qs_rich(lvl, count=15):
    qs = []
    used_questions = set()
    
    def add_q(question, opts, correct_idx):
        if question not in used_questions:
            used_questions.add(question)
            qs.append({"id":f"q{len(qs)}","question":question,"options":opts,"correctIndex":correct_idx})
    
    if lvl == 4:  # Angka 11-100
        while len(qs) < count:
            n = random.randint(11, 100)
            puluhan, satuan = n // 10, n % 10
            q_type = random.randint(0,2)
            if q_type == 0:
                w = [n+random.randint(1,5), n-random.randint(1,5)]
                opts = [str(n), str(w[0]), str(w[1])]; random.shuffle(opts)
                add_q(f"Berapa angka ini? {puluhan} puluhan {satuan} satuan", opts, opts.index(str(n)))
            elif q_type == 1:
                w = [puluhan+1, puluhan-1]
                opts = [str(puluhan), str(max(1,w[0])), str(max(1,w[1]))]
                random.shuffle(opts)
                add_q(f"Angka {n} memiliki berapa puluhan?", opts, opts.index(str(puluhan)))
            else:
                w = [satuan+1, satuan-1]
                opts = [str(satuan), str(max(0,w[0])), str(max(0,w[1]))]
                random.shuffle(opts)
                add_q(f"Angka {n} memiliki berapa satuan?", opts, opts.index(str(satuan)))
    elif lvl == 5:  # Membandingkan
        nums = random.sample(range(1,101), 30)
        for i in range(0, min(45, len(nums)-1), 3):
            a, b = nums[i], nums[i+1]
            if a == b: continue
            bigger = max(a,b)
            q_type = random.randint(0,1)
            if q_type == 0:
                opts = [">","<","="]; correct = 0 if a > b else 1
                add_q(f"{a} ___ {b}", opts, correct)
            else:
                wrong = [x for x in nums if x != bigger and x != a and x != b]
                opts = [str(bigger), str(min(a,b)), str(random.choice(wrong) if wrong else bigger+1)]
                random.shuffle(opts)
                add_q(f"Mana yang lebih besar: {a} atau {b}?", opts, opts.index(str(bigger)))
            if len(qs) >= count: break
    elif lvl == 6:  # Penjumlahan 1 digit
        while len(qs) < count:
            a, b = random.randint(1,9), random.randint(1,9)
            ans = a + b
            w = [ans+random.randint(1,3), ans-random.randint(1,3)]
            opts = [str(ans), str(max(1,w[0])), str(max(1,w[1]))]
            random.shuffle(opts)
            add_q(f"Berapa {a} + {b}?", opts, opts.index(str(ans)))
    elif lvl == 7:  # Penjumlahan 2 digit
        while len(qs) < count:
            a, b = random.randint(10,50), random.randint(10,40)
            ans = a + b
            w = [ans+random.randint(1,10), ans-random.randint(1,10)]
            opts = [str(ans), str(max(11,w[0])), str(max(11,w[1]))]
            random.shuffle(opts)
            add_q(f"Berapa {a} + {b}?", opts, opts.index(str(ans)))
    elif lvl == 8:  # Pengurangan 1 digit
        while len(qs) < count:
            b, ans = random.randint(1,8), random.randint(1,9)
            a = b + ans
            w = [ans+random.randint(1,3), ans-random.randint(1,3)]
            opts = [str(ans), str(max(0,w[0])), str(max(0,w[1]))]
            random.shuffle(opts)
            add_q(f"Berapa {a} - {b}?", opts, opts.index(str(ans)))
    elif lvl == 9:  # Pengurangan 2 digit
        while len(qs) < count:
            b = random.randint(5, 30)
            ans = random.randint(5, 50)
            a = b + ans
            w = [ans+random.randint(1,5), ans-random.randint(1,5)]
            opts = [str(ans), str(max(0,w[0])), str(max(0,w[1]))]
            random.shuffle(opts)
            add_q(f"Berapa {a} - {b}?", opts, opts.index(str(ans)))
    elif lvl == 10:  # Perkalian 1-5
        while len(qs) < count:
            a, b = random.randint(1,5), random.randint(1,10)
            ans = a * b
            w = [ans+random.randint(1,4), ans-random.randint(1,4)]
            opts = [str(ans), str(max(1,w[0])), str(max(1,w[1]))]
            random.shuffle(opts)
            q_type = random.randint(0,1)
            if q_type == 0:
                add_q(f"Berapa {a} × {b}?", opts, opts.index(str(ans)))
            else:
                add_q(f"{b} + {b} + ... ({a} kali) = ?", opts, opts.index(str(ans)))
    elif lvl == 11:  # Perkalian 6-10
        while len(qs) < count:
            a, b = random.randint(6,10), random.randint(1,10)
            ans = a * b
            w = [ans+random.randint(1,5), ans-random.randint(1,5)]
            opts = [str(ans), str(max(1,w[0])), str(max(1,w[1]))]
            random.shuffle(opts)
            add_q(f"Berapa {a} × {b}?", opts, opts.index(str(ans)))
    elif lvl == 12:  # Pembagian
        while len(qs) < count:
            b = random.randint(2, 10)
            ans = random.randint(1, 10)
            a = b * ans
            w = [ans+random.randint(1,3), ans-random.randint(1,3)]
            opts = [str(ans), str(max(1,w[0])), str(max(1,w[1]))]
            random.shuffle(opts)
            q_type = random.randint(0,1)
            if q_type == 0:
                add_q(f"Berapa {a} ÷ {b}?", opts, opts.index(str(ans)))
            else:
                add_q(f"{a} : {b} = ?", opts, opts.index(str(ans)))
    elif lvl == 13:  # Operasi campuran
        while len(qs) < count:
            op1, op2 = random.choice(['+','-']), random.choice(['×','÷'])
            a, b, c = random.randint(2,10), random.randint(2,5), random.randint(2,4)
            if op2 == '×':
                part2 = b * c
            else:
                part2 = b  # b already result of division
                b = b * c; c = b // c if c else 1
            if op1 == '+':
                ans = a + b * c if op2 == '×' else a + b // c
            else:
                mid = b * c if op2 == '×' else b
                ans = a - mid if a > mid else mid - a
            w = [ans+2, ans-2]
            opts = [str(ans), str(max(0,w[0])), str(max(0,w[1]))]
            random.shuffle(opts)
            add_q(f"Berapa {a} {op1} {b} {op2} {c}?", opts, opts.index(str(ans)))
    elif lvl == 14:  # Pecahan
        fracs = [("1/2","½",50),("1/3","⅓",33),("1/4","¼",25),("3/4","¾",75),("2/3","⅔",67),("1/5","⅕",20)]
        while len(qs) < count:
            f = random.choice(fracs)
            wrong = [x for x in fracs if x[0] != f[0]]
            random.shuffle(wrong)
            q_type = random.randint(0,2)
            if q_type == 0:
                opts = [f[1], wrong[0][1], wrong[1][1]]; random.shuffle(opts)
                add_q(f"Simbol pecahan dari '{f[0]}' adalah...", opts, opts.index(f[1]))
            elif q_type == 1:
                opts = [str(f[2])+"%", str(wrong[0][2])+"%", str(wrong[1][2])+"%"]; random.shuffle(opts)
                add_q(f"{f[0]} sama dengan berapa persen?", opts, opts.index(str(f[2])+"%"))
            else:
                target_frac = f[0]
                opts = [target_frac, wrong[0][0], wrong[1][0]]; random.shuffle(opts)
                add_q(f"Pecahan {target_frac} artinya 1 bagian dari {f[0].split('/')[1]} bagian sama. Siapa yang benar?", opts, opts.index(target_frac))
    elif lvl == 15:  # Pecahan & Desimal
        pairs = [("1/2","0.5"),("1/4","0.25"),("3/4","0.75"),("1/5","0.2"),("2/5","0.4"),("1/10","0.1"),("3/10","0.3"),("7/10","0.7")]
        while len(qs) < count:
            p = random.choice(pairs)
            wrong = [x for x in pairs if x[0] != p[0]]
            random.shuffle(wrong)
            q_type = random.randint(0,1)
            if q_type == 0:
                opts = [p[1], wrong[0][1], wrong[1][1]]; random.shuffle(opts)
                add_q(f"Pecahan {p[0]} dalam bentuk desimal adalah...", opts, opts.index(p[1]))
            else:
                opts = [p[0], wrong[0][0], wrong[1][0]]; random.shuffle(opts)
                add_q(f"Desimal {p[1]} dalam bentuk pecahan adalah...", opts, opts.index(p[0]))
    elif lvl == 16:  # Persen
        pct_problems = []
        while len(pct_problems) < 30:
            total = random.choice([10,20,50,100,200])
            pct = random.choice([10,20,25,50,75])
            result = total * pct // 100
            pct_problems.append((total, pct, result))
        seen = set()
        for total, pct, result in pct_problems:
            q = f"{pct}% dari {total} adalah..."
            if q in seen: continue
            seen.add(q)
            w = [result+5, result-5]
            opts = [str(result), str(max(0,w[0])), str(max(0,w[1]))]
            random.shuffle(opts)
            qs.append({"id":f"q{len(qs)}","question":q,"options":opts,"correctIndex":opts.index(str(result))})
            if len(qs) >= count: break
    elif lvl in [17,18,19]:  # Geometri
        shapes = {
            "Segitiga": {"sisi":3,"sudut":180,"info":"3 sisi, 3 sudut"},
            "Persegi": {"sisi":4,"sudut":360,"info":"4 sisi sama panjang"},
            "Persegi Panjang": {"sisi":4,"sudut":360,"info":"sisi berlawanan sama panjang"},
            "Lingkaran": {"sisi":0,"sudut":0,"info":"tidak punya sudut, keliling = 2πr"},
            "Segienam": {"sisi":6,"sudut":720,"info":"6 sisi sama panjang"},
        }
        shape_list = list(shapes.items())
        if lvl == 17:
            while len(qs) < count:
                sh, info = random.choice(shape_list)
                wrong = [x[0] for x in shape_list if x[0] != sh]
                random.shuffle(wrong)
                q_type = random.randint(0,2)
                if q_type == 0:
                    opts = [str(info["sisi"]), str(info["sisi"]+1), str(info["sisi"]-1)]; random.shuffle(opts)
                    add_q(f"Bangun {sh} memiliki berapa sisi?", opts, opts.index(str(info["sisi"])))
                elif q_type == 1:
                    opts = [sh, wrong[0], wrong[1]]; random.shuffle(opts)
                    add_q(f"Bangun yang memiliki {info['sisi']} sisi adalah...", opts, opts.index(sh))
                else:
                    opts = [info["info"], shapes[wrong[0]]["info"], shapes[wrong[1]]["info"]]; random.shuffle(opts)
                    add_q(f"Ciri-ciri bangun {sh} adalah...", opts, opts.index(info["info"]))
        elif lvl == 18:  # Keliling & Luas
            while len(qs) < count:
                q_type = random.randint(0,2)
                if q_type == 0:  # Keliling persegi
                    s = random.randint(2,15)
                    ans = 4*s; w = [ans+4, ans-4]
                    opts = [str(ans), str(max(1,w[0])), str(max(1,w[1]))]
                    random.shuffle(opts)
                    add_q(f"Keliling persegi dengan sisi {s} cm adalah... cm", opts, opts.index(str(ans)))
                elif q_type == 1:  # Luas persegi
                    s = random.randint(2,12)
                    ans = s*s; w = [ans+s, ans-s]
                    opts = [str(ans), str(max(1,w[0])), str(max(1,w[1]))]
                    random.shuffle(opts)
                    add_q(f"Luas persegi dengan sisi {s} cm adalah... cm²", opts, opts.index(str(ans)))
                else:  # Keliling persegi panjang
                    p, l = random.randint(3,15), random.randint(2,10)
                    ans = 2*(p+l); w = [ans+2, ans-2]
                    opts = [str(ans), str(max(1,w[0])), str(max(1,w[1]))]
                    random.shuffle(opts)
                    add_q(f"Keliling persegi panjang {p}×{l} cm adalah... cm", opts, opts.index(str(ans)))
        else:  # lvl 19: Bangun ruang
            shapes3d = [("Kubus","6","8","12"),("Balok","6","8","12"),("Bola","0","0","0"),("Tabung","3","0","2"),("Kerucut","2","1","1")]
            while len(qs) < count:
                sh, sisi, sudut, rusuk = random.choice(shapes3d)
                wrong = [x[0] for x in shapes3d if x[0] != sh]
                random.shuffle(wrong)
                q_type = random.randint(0,1)
                if q_type == 0:
                    opts = [sisi, str(int(sisi)+2 if sisi!="0" else 2), str(max(0,int(sisi)-2 if sisi!="0" else 0))]
                    random.shuffle(opts)
                    add_q(f"Bangun ruang {sh} memiliki berapa sisi?", opts, opts.index(sisi))
                else:
                    opts = [sh, wrong[0], wrong[1]]; random.shuffle(opts)
                    add_q(f"Bangun ruang yang memiliki sisi sebanyak {sisi} adalah...", opts, opts.index(sh))
    elif lvl == 20:  # Bilangan bulat negatif
        while len(qs) < count:
            a = random.randint(-10, 10)
            b = random.randint(-10, 10)
            op = random.choice(['+','-'])
            ans = a+b if op == '+' else a-b
            w = [ans+1, ans-1]
            opts = [str(ans), str(w[0]), str(w[1])]; random.shuffle(opts)
            add_q(f"Berapa ({a}) {op} ({b})?", opts, opts.index(str(ans)))
    elif lvl == 21:  # KPK FPB
        while len(qs) < count:
            a, b = random.choice([2,3,4,5,6]), random.choice([3,4,6,8,9,10,12])
            # FPB
            def gcd(x,y): return x if y==0 else gcd(y,x%y)
            def lcm(x,y): return x*y//gcd(x,y)
            g = gcd(a,b); l = lcm(a,b)
            q_type = random.randint(0,1)
            if q_type == 0:
                w = [g+1, g-1 if g>1 else g+2]
                opts = [str(g), str(max(1,w[0])), str(max(1,w[1]))]; random.shuffle(opts)
                add_q(f"FPB dari {a} dan {b} adalah...", opts, opts.index(str(g)))
            else:
                w = [l+a, l-b if l>b else l+b]
                opts = [str(l), str(max(1,w[0])), str(max(1,w[1]))]; random.shuffle(opts)
                add_q(f"KPK dari {a} dan {b} adalah...", opts, opts.index(str(l)))
    elif lvl == 22:  # Perbandingan
        while len(qs) < count:
            a, b = random.randint(2,10), random.randint(2,10)
            total = (a+b) * random.randint(2,5)
            share_a = total * a // (a+b)
            w = [share_a+a, share_a-a]
            opts = [str(share_a), str(max(0,w[0])), str(max(0,w[1]))]
            random.shuffle(opts)
            add_q(f"Bagi {total} dengan perbandingan {a}:{b}. Bagian pertama adalah...", opts, opts.index(str(share_a)))
    elif lvl == 23:  # Statistika
        while len(qs) < count:
            data = sorted([random.randint(1,20) for _ in range(5)])
            total = sum(data)
            mean = total / len(data)
            median = data[len(data)//2]
            q_type = random.randint(0,2)
            if q_type == 0:
                opts = [str(mean if mean == int(mean) else round(mean,1)), str(round(mean,1)+1), str(max(0,round(mean,1)-1))]
                random.shuffle(opts)
                add_q(f"Data: {', '.join(map(str,data))}. Mean-nya adalah...", opts, opts.index(str(mean if mean == int(mean) else round(mean,1))))
            elif q_type == 1:
                w = [median+1, median-1]
                opts = [str(median), str(max(0,w[0])), str(max(0,w[1]))]
                random.shuffle(opts)
                add_q(f"Data: {', '.join(map(str,data))}. Median-nya adalah...", opts, opts.index(str(median)))
            else:
                modus_data = [random.randint(1,10)]*3 + [random.randint(1,10), random.randint(1,10)]
                modus_val = modus_data[0]
                w = [x for x in modus_data if x != modus_val]
                opts = [str(modus_val), str(random.choice(w)), str(random.choice(w)+1)]
                random.shuffle(opts)
                add_q(f"Data: {', '.join(map(str,modus_data))}. Modus-nya adalah...", opts, opts.index(str(modus_val)))
    elif lvl == 24:  # Aljabar
        while len(qs) < count:
            a = random.randint(2,10)
            b = random.randint(1,20)
            x = random.randint(1,10)
            ans = a*x + b
            q_type = random.randint(0,1)
            if q_type == 0:
                w = [ans+a, ans-a]
                opts = [str(ans), str(max(0,w[0])), str(max(0,w[1]))]
                random.shuffle(opts)
                add_q(f"Jika x = {x}, berapa nilai {a}x + {b}?", opts, opts.index(str(ans)))
            else:
                # Solve for x: ax + b = c
                c = a*x + b
                w = [x+1, x-1]
                opts = [str(x), str(max(0,w[0])), str(max(0,w[1]))]
                random.shuffle(opts)
                add_q(f"Selesaikan: {a}x + {b} = {c}. Nilai x adalah...", opts, opts.index(str(x)))
    elif lvl == 25:  # Persamaan linear
        while len(qs) < count:
            a = random.randint(2,5)
            x = random.randint(1,10)
            b = random.randint(1,15)
            c = a*x + b
            q_type = random.randint(0,1)
            if q_type == 0:
                w = [x+1, x-1]
                opts = [str(x), str(max(0,w[0])), str(max(0,w[1]))]
                random.shuffle(opts)
                add_q(f"{a}x + {b} = {c}. Nilai x = ...", opts, opts.index(str(x)))
            else:
                # Substitution check
                wrong_x = x + random.randint(1,3)
                correct_val = a*x+b
                wrong_val = a*wrong_x+b
                add_q(f"Jika {a}x + {b} = {c}, apakah x = {x} benar?", ["Ya, benar","Tidak, x = "+str(x+1),"Tidak, x = "+str(x-1)], 0)
    
    # Fallback if not enough questions
    while len(qs) < count:
        a, b = random.randint(1,20), random.randint(1,20)
        ans = a+b
        w = [ans+1,ans-1]
        opts = [str(ans), str(w[0]), str(max(0,w[1]))]
        random.shuffle(opts)
        qs.append({"id":f"q{len(qs)}","question":f"Berapa {a} + {b}?","options":opts,"correctIndex":opts.index(str(ans))})
    
    return qs[:count]

math_levels = [
    (4,"Angka 11-100","Kelas 1","📊",rich_math_content("Angka 11 sampai 100","Angka 11-100 terdiri dari puluhan dan satuan. Contoh: 45 = 4 puluhan + 5 satuan.",[("45","4 puluhan 5 satuan"),("73","7 puluhan 3 satuan"),("28","2 puluhan 8 satuan")],"Puluhan = angka pertama × 10, Satuan = angka kedua")),
    (5,"Membandingkan Angka","Kelas 1","🔍",rich_math_content("Membandingkan Angka","Gunakan simbol > (lebih dari), < (kurang dari), = (sama dengan) untuk membandingkan angka.",[("5 > 3","Lima lebih dari tiga"),("2 < 8","Dua kurang dari delapan"),("4 = 4","Empat sama dengan empat")],"Ujung terbuka simbol < dan > selalu menghadap ke angka yang lebih kecil")),
    (6,"Penjumlahan 1 Digit","Kelas 1","➕",rich_math_content("Penjumlahan 1 Angka","Menjumlahkan dua angka yang masing-masing kurang dari 10.",[("3 + 4 = 7","3 apel + 4 apel = 7 apel"),("6 + 2 = 8","6 bola + 2 bola = 8 bola"),("5 + 5 = 10","5 + 5 = 10")],"Gunakan jari tangan untuk membantu menghitung!")),
    (7,"Penjumlahan 2 Digit","Kelas 2","➕",rich_math_content("Penjumlahan 2 Angka","Menjumlahkan dua angka puluhan. Jumlahkan satuan dulu, lalu puluhannya.",[("23 + 15 = 38","3+5=8, 2+1=3, jadi 38"),("47 + 26 = 73","7+6=13 (simpan 1), 4+2+1=7, jadi 73"),("35 + 48 = 83","5+8=13, 3+4+1=8, jadi 83")],"Jika jumlah satuan ≥ 10, simpan 1 ke kolom puluhan!")),
    (8,"Pengurangan 1 Digit","Kelas 1","➖",rich_math_content("Pengurangan 1 Angka","Mengurangkan dua angka kecil. Mulai dari angka yang besar, kurangi angka yang kecil.",[("9 - 4 = 5","9 bola dikurangi 4 bola = 5 bola"),("7 - 3 = 4","7 - 3 = 4"),("5 - 5 = 0","5 dikurangi 5 = 0")],"Pengurangan adalah kebalikan dari penjumlahan: 5-3=2 berarti 2+3=5")),
    (9,"Pengurangan 2 Digit","Kelas 2","➖",rich_math_content("Pengurangan 2 Angka","Mengurangkan angka puluhan. Jika satuan tidak cukup, pinjam dari puluhan.",[("58 - 23 = 35","8-3=5, 5-2=3, jadi 35"),("74 - 38 = 36","4<8, pinjam: 14-8=6, 7-1-3=3, jadi 36"),("90 - 45 = 45","0<5, pinjam: 10-5=5, 9-1-4=4, jadi 45")],"Jika angka atas < angka bawah (satuan), pinjam 1 dari puluhan!")),
    (10,"Perkalian 1-5","Kelas 2","✖️",rich_math_content("Tabel Perkalian 1-5","Perkalian adalah penjumlahan berulang. 3 × 4 berarti 4+4+4 = 12.",[("2 × 5 = 10","5 + 5 = 10"),("3 × 4 = 12","4 + 4 + 4 = 12"),("5 × 6 = 30","6 × 5 kali = 30")],"Hafalkan tabel perkalian 1-5, itu fondasi matematika!")),
    (11,"Perkalian 6-10","Kelas 3","✖️",rich_math_content("Tabel Perkalian 6-10","Lanjutan tabel perkalian untuk angka 6 sampai 10.",[("6 × 7 = 42","6 × 7 = 42"),("8 × 9 = 72","8 × 9 = 72"),("10 × 10 = 100","10 × 10 = 100")],"Perkalian 10 mudah! Tinggal tambahkan 0 di belakang.")),
    (12,"Pembagian Dasar","Kelas 3","➗",rich_math_content("Pembagian Dasar","Pembagian adalah kebalikan perkalian. 12 ÷ 3 = 4 karena 4 × 3 = 12.",[("12 ÷ 3 = 4","4 × 3 = 12"),("20 ÷ 5 = 4","4 × 5 = 20"),("36 ÷ 6 = 6","6 × 6 = 36")],"Gunakan tabel perkalian untuk membantu pembagian!")),
    (13,"Operasi Campuran","Kelas 3-4","🔢",rich_math_content("Operasi Campuran","Urutan operasi: Kurung → Kali/Bagi → Tambah/Kurang (BKKT).",[("2 + 3 × 4 = 14","Kali dulu: 3×4=12, baru tambah 2"),("(5+3) × 2 = 16","Kurung dulu: 5+3=8, baru kali 2"),("10 - 6 ÷ 2 = 7","Bagi dulu: 6÷2=3, baru kurang")],"Ingat: Kali/Bagi diselesaikan SEBELUM Tambah/Kurang!")),
    (14,"Pecahan Sederhana","Kelas 3-4","🍕",rich_math_content("Mengenal Pecahan","Pecahan a/b berarti membagi sesuatu menjadi b bagian yang sama, dan mengambil a bagian.",[("1/2","Setengah - satu dari dua bagian sama"),("1/4","Seperempat - satu dari empat bagian sama"),("3/4","Tiga perempat - tiga dari empat bagian sama")],"Semakin besar penyebut (angka bawah), semakin kecil setiap bagiannya!")),
    (15,"Pecahan & Desimal","Kelas 4","🔢",rich_math_content("Pecahan dan Desimal","Pecahan bisa diubah ke desimal dengan membagi pembilang dengan penyebut.",[("1/2 = 0.5","1 ÷ 2 = 0.5"),("1/4 = 0.25","1 ÷ 4 = 0.25"),("3/4 = 0.75","3 ÷ 4 = 0.75")],"Hafal: 1/2=0.5, 1/4=0.25, 1/5=0.2, 1/10=0.1")),
    (16,"Persen","Kelas 4-5","💯",rich_math_content("Mengenal Persen","Persen (%) berarti per-seratus. 50% = 50/100 = 0.5.",[("50% dari 100 = 50","100 × 50/100 = 50"),("25% dari 200 = 50","200 × 25/100 = 50"),("10% dari 80 = 8","80 × 10/100 = 8")],"Cara cepat: 10% = bagi 10, 50% = bagi 2, 25% = bagi 4")),
    (17,"Bangun Datar","Kelas 4","📐",rich_math_content("Mengenal Bangun Datar","Bangun datar adalah bentuk 2 dimensi. Contoh: segitiga, persegi, lingkaran.",[("Segitiga","3 sisi, 3 sudut, jumlah sudut 180°"),("Persegi","4 sisi sama panjang, 4 sudut siku-siku 90°"),("Lingkaran","Tidak punya sudut, keliling = 2πr")],"Sudut siku-siku = 90°, sudut lancip < 90°, sudut tumpul > 90°")),
    (18,"Keliling & Luas","Kelas 5","📏",rich_math_content("Keliling dan Luas","Keliling = jarak mengelilingi bangun. Luas = besar permukaan bangun.",[("Persegi sisi s","Keliling = 4s, Luas = s×s"),("Persegi Panjang p×l","Keliling = 2(p+l), Luas = p×l"),("Segitiga alas a tinggi t","Luas = ½×a×t")],"Keliling diukur dalam cm/m, luas dalam cm²/m²")),
    (19,"Bangun Ruang","Kelas 5","📦",rich_math_content("Mengenal Bangun Ruang","Bangun ruang adalah bentuk 3 dimensi yang memiliki volume.",[("Kubus","6 sisi, 8 titik sudut, 12 rusuk"),("Balok","6 sisi, 8 titik sudut, panjang berbeda"),("Tabung","2 sisi lingkaran + 1 sisi lengkung")],"Volume kubus = s³, Volume balok = p×l×t")),
    (20,"Bilangan Bulat","Kelas 5-6","🔢",rich_math_content("Bilangan Bulat Negatif","Bilangan bulat mencakup negatif, nol, dan positif: ...-3,-2,-1,0,1,2,3...",[("(-3) + 5 = 2","Mulai dari -3, maju 5 langkah = 2"),("(-4) - (-2) = -2","Mengurangi negatif = menambah positif"),("(-2) × 3 = -6","Negatif × positif = negatif")],"Di garis bilangan: kiri = negatif, kanan = positif")),
    (21,"KPK & FPB","Kelas 5-6","🔢",rich_math_content("KPK dan FPB","FPB = Faktor Persekutuan Terbesar. KPK = Kelipatan Persekutuan Terkecil.",[("FPB(12,8)=4","Faktor 12: 1,2,3,4,6,12. Faktor 8: 1,2,4,8. Terbesar sama = 4"),("KPK(4,6)=12","Kelipatan 4: 4,8,12. Kelipatan 6: 6,12. Terkecil sama = 12"),("FPB dan KPK","Digunakan dalam pecahan dan pembagian")],"FPB untuk menyederhanakan pecahan, KPK untuk menyamakan penyebut")),
    (22,"Perbandingan","Kelas 6","⚖️",rich_math_content("Perbandingan dan Skala","Perbandingan a:b berarti untuk setiap a bagian pertama, ada b bagian kedua.",[("Perbandingan 2:3","Dari 10 total: bagian A = 2/5×10 = 4, B = 3/5×10 = 6"),("Skala 1:100","1 cm di peta = 100 cm di dunia nyata"),("Rasio 3:1","Tiga kali lebih banyak")],"Untuk membagi dengan perbandingan: total ÷ jumlah rasio × masing-masing bagian")),
    (23,"Statistika Dasar","SMP","📊",rich_math_content("Mean, Median, Modus","Tiga ukuran pemusatan data yang penting dalam statistika.",[("Mean","Rata-rata: jumlah semua data ÷ banyak data"),("Median","Nilai tengah setelah data diurutkan"),("Modus","Nilai yang paling sering muncul")],"Data: 3,5,5,7,8 → Mean=5.6, Median=5, Modus=5")),
    (24,"Aljabar Dasar","SMP","🔣",rich_math_content("Aljabar: Variabel & Ekspresi","Variabel adalah simbol (x, y) yang mewakili bilangan yang belum diketahui.",[("2x + 3, jika x=4","2(4)+3 = 8+3 = 11"),("3y - 5, jika y=3","3(3)-5 = 9-5 = 4"),("x² + 2x, jika x=3","9+6 = 15")],"Substitusi: ganti variabel dengan nilainya, lalu hitung!")),
    (25,"Persamaan Linear","SMP","📐",rich_math_content("Persamaan Linear Satu Variabel","ax + b = c. Selesaikan dengan memindahkan bilangan ke sisi yang berlawanan.",[("2x + 3 = 11","2x = 11-3 = 8, x = 8÷2 = 4"),("3x - 5 = 10","3x = 10+5 = 15, x = 15÷3 = 5"),("5x = 25","x = 25÷5 = 5")],"Apa yang dilakukan di satu sisi, lakukan juga di sisi lain!")),
]

for item in math_levels:
    lvl, title, badge, icon, content = item
    questions = gen_math_qs_rich(lvl, 15)
    lessons = [
        {"id":f"mth{lvl}_{n}","title":f"Bagian {n}","icon":icon,
         "difficulty":"Mudah" if n==1 else ("Sedang" if n==2 else "Sulit"),
         "duration":"15 menit","content":content,"questions":questions}
        for n in range(1,4)
    ]
    write_js(f"math-{lvl}.js", f"math{lvl}", {
        "id":f"math-{lvl}","title":f"Level {lvl}: {title}","badge":badge,
        "icon":icon,"description":title,"lessons":lessons
    })
    print(f"math-{lvl}.js done")

print("\n=== MATH DONE ===\n")

# ========================================================
# ENGLISH 1-3: PAUD — Full Visual
# ========================================================

def en_paud_content(title, pairs, color="blue"):
    cards = "".join([f"<div class='flex flex-col items-center bg-{color}-50 border-4 border-{color}-200 rounded-3xl p-5 hover:scale-105 transition-transform'><span class='text-7xl mb-3 block'>{e}</span><span class='text-3xl font-black text-{color}-700'>{en}</span><span class='text-lg text-{color}-400 font-bold mt-1'>{id}</span></div>" for en,id,e in pairs])
    return f"<div class='grid grid-cols-2 sm:grid-cols-3 gap-4'>{cards}</div>"

def en_paud_quiz(pairs, count=15):
    qs = []
    used = set()
    full_pairs = list(pairs)
    
    while len(qs) < count:
        target = random.choice(full_pairs)
        wrong_pool = [x for x in full_pairs if x[0] != target[0]]
        if len(wrong_pool) < 2: break
        w1, w2 = random.sample(wrong_pool, 2)
        q_type = len(qs) % 3
        
        if q_type == 0:  # Emoji -> English
            q = f"Gambar {target[2]} ini dalam bahasa Inggris disebut..."
            opts = [target[0], w1[0], w2[0]]; random.shuffle(opts)
        elif q_type == 1:  # English -> Indonesian
            q = f"Apa arti kata '{target[0]}' dalam bahasa Indonesia?"
            opts = [target[1], w1[1], w2[1]]; random.shuffle(opts)
        else:  # Indonesian -> English
            q = f"Apa bahasa Inggris dari '{target[1]}'?"
            opts = [target[0], w1[0], w2[0]]; random.shuffle(opts)
        
        if q not in used:
            used.add(q)
            correct = opts.index(opts[0]) if opts[0] == (target[0] if q_type in [0,2] else target[1]) else (opts.index(opts[1]) if opts[1] == (target[0] if q_type in [0,2] else target[1]) else 2)
            # Find correct answer properly
            correct_ans = target[0] if q_type in [0,2] else target[1]
            qs.append({"id":f"q{len(qs)}","question":q,"options":opts,"correctIndex":opts.index(correct_ans)})
    
    return qs[:count]

en1_colors = [("Red","Merah","🔴"),("Blue","Biru","🔵"),("Green","Hijau","🟢"),("Yellow","Kuning","🟡"),
              ("Orange","Oranye","🟠"),("Purple","Ungu","🟣"),("White","Putih","⬜"),("Black","Hitam","⬛"),("Pink","Merah Muda","🩷")]

en1_numbers = [("One","Satu","1️⃣"),("Two","Dua","2️⃣"),("Three","Tiga","3️⃣"),("Four","Empat","4️⃣"),
               ("Five","Lima","5️⃣"),("Six","Enam","6️⃣"),("Seven","Tujuh","7️⃣"),("Eight","Delapan","8️⃣"),
               ("Nine","Sembilan","9️⃣"),("Ten","Sepuluh","🔟")]

en1_lessons = [
    {"id":"eng1_1","title":"Colors (Warna)","icon":"🎨","difficulty":"Mudah","duration":"10 menit",
     "content": en_paud_content("Warna-Warna", en1_colors, "indigo"),
     "questions": en_paud_quiz(en1_colors)},
    {"id":"eng1_2","title":"Numbers 1-10","icon":"🔢","difficulty":"Mudah","duration":"10 menit",
     "content": en_paud_content("Angka 1-10", en1_numbers, "emerald"),
     "questions": en_paud_quiz(en1_numbers)},
    {"id":"eng1_3","title":"Colors & Numbers Mixed","icon":"🏆","difficulty":"Sedang","duration":"10 menit",
     "content": en_paud_content("Campuran!", en1_colors[:5]+en1_numbers[:5], "pink"),
     "questions": en_paud_quiz(en1_colors[:5]+en1_numbers[:5])},
]
write_js("english-1.js", "english1", {
    "id":"english-1","title":"Level 1: Colors & Numbers","badge":"PAUD",
    "icon":"🎨","description":"Learn colors and numbers in English with fun emoji pictures.",
    "lessons": en1_lessons
})
print("english-1.js done")

# English 2: Animals & Shapes (PAUD visual)
en2_animals = [("Cat","Kucing","🐱"),("Dog","Anjing","🐶"),("Bird","Burung","🐦"),("Fish","Ikan","🐟"),
               ("Elephant","Gajah","🐘"),("Lion","Singa","🦁"),("Tiger","Harimau","🐯"),("Monkey","Monyet","🐒"),
               ("Rabbit","Kelinci","🐰"),("Duck","Bebek","🦆")]

en2_shapes = [("Circle","Lingkaran","⭕"),("Square","Persegi","🟥"),("Triangle","Segitiga","🔺"),
              ("Star","Bintang","⭐"),("Heart","Hati","❤️"),("Diamond","Berlian","💎")]

en2_lessons = [
    {"id":"eng2_1","title":"Animals (Hewan)","icon":"🐱","difficulty":"Mudah","duration":"10 menit",
     "content": en_paud_content("Hewan-Hewan", en2_animals, "amber"),
     "questions": en_paud_quiz(en2_animals)},
    {"id":"eng2_2","title":"Shapes (Bentuk)","icon":"⭕","difficulty":"Mudah","duration":"10 menit",
     "content": en_paud_content("Bentuk-Bentuk", en2_shapes, "blue"),
     "questions": en_paud_quiz(en2_shapes)},
    {"id":"eng2_3","title":"Animals & Shapes Mixed","icon":"🏆","difficulty":"Sedang","duration":"10 menit",
     "content": en_paud_content("Campuran!", en2_animals[:6]+en2_shapes[:5], "emerald"),
     "questions": en_paud_quiz(en2_animals[:6]+en2_shapes[:5])},
]
write_js("english-2.js", "english2", {
    "id":"english-2","title":"Level 2: Animals & Shapes","badge":"PAUD",
    "icon":"🐱","description":"Learn animal and shape names in English through colorful emoji cards.",
    "lessons": en2_lessons
})
print("english-2.js done")

# English 3: Body Parts & Family (PAUD visual)
en3_body = [("Head","Kepala","🗣️"),("Eye","Mata","👁️"),("Ear","Telinga","👂"),("Nose","Hidung","👃"),
            ("Mouth","Mulut","👄"),("Hand","Tangan","🤚"),("Leg","Kaki","🦵"),("Foot","Telapak Kaki","🦶")]

en3_family = [("Mother","Ibu","👩"),("Father","Ayah","👨"),("Baby","Bayi","👶"),("Sister","Kakak/Adik Perempuan","👧"),
              ("Brother","Kakak/Adik Laki-laki","👦"),("Grandmother","Nenek","👵"),("Grandfather","Kakek","👴")]

en3_lessons = [
    {"id":"eng3_1","title":"Body Parts (Anggota Tubuh)","icon":"🗣️","difficulty":"Mudah","duration":"10 menit",
     "content": en_paud_content("Anggota Tubuh", en3_body, "rose"),
     "questions": en_paud_quiz(en3_body)},
    {"id":"eng3_2","title":"Family (Keluarga)","icon":"👨‍👩‍👧‍👦","difficulty":"Mudah","duration":"10 menit",
     "content": en_paud_content("Keluargaku", en3_family, "indigo"),
     "questions": en_paud_quiz(en3_family)},
    {"id":"eng3_3","title":"Body & Family Mixed","icon":"🏆","difficulty":"Sedang","duration":"10 menit",
     "content": en_paud_content("Campuran!", en3_body[:5]+en3_family[:6], "purple"),
     "questions": en_paud_quiz(en3_body[:5]+en3_family[:6])},
]
write_js("english-3.js", "english3", {
    "id":"english-3","title":"Level 3: Body & Family","badge":"PAUD-TK",
    "icon":"👨‍👩‍👧‍👦","description":"Learn body parts and family member names in English.",
    "lessons": en3_lessons
})
print("english-3.js done")

# ========================================================
# ENGLISH 4-25: Level lanjut
# ========================================================
def en_rich_content(title, vocab_items, grammar_tip="", color="emerald"):
    cards = "".join([f"<div class='bg-{color}-50 border-2 border-{color}-200 rounded-2xl p-4 flex flex-col items-center gap-2'><span class='text-4xl'>{e}</span><span class='font-black text-{color}-700 text-lg'>{en}</span><span class='text-{color}-400 text-sm font-bold'>{id}</span></div>" for en,id,e in vocab_items])
    tip_html = f"<div class='bg-amber-50 border-4 border-amber-200 rounded-2xl p-4'><p class='font-black text-amber-600 mb-1'>📝 Grammar Tip:</p><p class='text-amber-700'>{grammar_tip}</p></div>" if grammar_tip else ""
    return f"<div class='space-y-4'><div class='grid grid-cols-2 sm:grid-cols-3 gap-3'>{cards}</div>{tip_html}</div>"

def en_vocab_quiz(vocab_items, count=15, extra_items=None):
    pool = list(vocab_items) + (extra_items or [])
    qs = []
    used = set()
    attempts = 0
    while len(qs) < count and attempts < 100:
        attempts += 1
        target = random.choice(vocab_items)
        wrong_pool = [x for x in pool if x[0] != target[0]]
        if len(wrong_pool) < 2: continue
        w1, w2 = random.sample(wrong_pool, 2)
        q_type = len(qs) % 3
        
        if q_type == 0:
            q = f"What is the meaning of '{target[0]}'?"
            correct = target[1]
            opts = [target[1], w1[1], w2[1]]
        elif q_type == 1:
            q = f"Apa bahasa Inggris dari '{target[1]}'?"
            correct = target[0]
            opts = [target[0], w1[0], w2[0]]
        else:
            q = f"Gambar {target[2]} disebut... dalam bahasa Inggris"
            correct = target[0]
            opts = [target[0], w1[0], w2[0]]
        
        if q not in used:
            used.add(q)
            random.shuffle(opts)
            qs.append({"id":f"q{len(qs)}","question":q,"options":opts,"correctIndex":opts.index(correct)})
    return qs[:count]

en_levels = [
    (4,"Fruits & Vegetables","Kelas 1","🍎",[("Apple","Apel","🍎"),("Banana","Pisang","🍌"),("Orange","Jeruk","🍊"),
     ("Grape","Anggur","🍇"),("Mango","Mangga","🥭"),("Carrot","Wortel","🥕"),("Tomato","Tomat","🍅"),("Corn","Jagung","🌽"),
     ("Potato","Kentang","🥔"),("Strawberry","Stroberi","🍓")],"Fruits are often sweet, vegetables are savory!"),
    (5,"Food & Drinks","Kelas 1","🍽️",[("Rice","Nasi","🍚"),("Bread","Roti","🍞"),("Egg","Telur","🥚"),
     ("Milk","Susu","🥛"),("Water","Air","💧"),("Juice","Jus","🥤"),("Cake","Kue","🎂"),("Soup","Sup","🍲"),
     ("Noodle","Mie","🍜"),("Cookie","Biskuit","🍪")],"I eat... / I drink... (makan/minum dalam bahasa Inggris)"),
    (6,"Classroom Objects","Kelas 2","🏫",[("Book","Buku","📚"),("Pen","Pena","🖊️"),("Pencil","Pensil","✏️"),
     ("Ruler","Penggaris","📏"),("Eraser","Penghapus","🗑️"),("Bag","Tas","🎒"),("Chair","Kursi","🪑"),("Table","Meja","🪑"),
     ("Board","Papan Tulis","📋"),("Scissors","Gunting","✂️")],"At school, we use these objects every day!"),
    (7,"Days of the Week","Kelas 2","📅",[("Monday","Senin","📅"),("Tuesday","Selasa","📅"),("Wednesday","Rabu","📅"),
     ("Thursday","Kamis","📅"),("Friday","Jumat","📅"),("Saturday","Sabtu","🎉"),("Sunday","Minggu","☀️"),
     ("Today","Hari ini","📆"),("Tomorrow","Besok","⏩"),("Yesterday","Kemarin","⏪")],"There are 7 days in a week!"),
    (8,"Months of the Year","Kelas 3","🗓️",[("January","Januari","❄️"),("February","Februari","❤️"),("March","Maret","🌸"),
     ("April","April","🌧️"),("May","Mei","🌺"),("June","Juni","☀️"),("July","Juli","🏖️"),("August","Agustus","🏅"),
     ("September","September","🍂"),("October","Oktober","🎃"),("November","November","🍁"),("December","Desember","🎄")],"There are 12 months in a year!"),
    (9,"Greetings","Kelas 2-3","👋",[("Hello","Halo","👋"),("Good morning","Selamat pagi","🌅"),("Good afternoon","Selamat siang","☀️"),
     ("Good evening","Selamat sore","🌆"),("Good night","Selamat malam","🌙"),("Goodbye","Sampai jumpa","👋"),
     ("Thank you","Terima kasih","🙏"),("Please","Tolong/Silakan","🤲"),("Sorry","Maaf","😔"),("Welcome","Selamat datang","🎉")],"Greetings make people feel happy!"),
    (10,"Pronouns & To Be","Kelas 3","🔤",[("I am","Saya adalah","👤"),("You are","Kamu adalah","👉"),("He is","Dia (L) adalah","👨"),
     ("She is","Dia (P) adalah","👩"),("We are","Kami/Kita adalah","👥"),("They are","Mereka adalah","👫"),
     ("It is","Itu adalah","🔹"),("I have","Saya punya","✋"),("You have","Kamu punya","👐"),("He has","Dia punya","👐")],"I/You/We/They + ARE | He/She/It + IS"),
    (11,"Simple Sentences","Kelas 3","💬",[("I eat rice","Saya makan nasi","🍚"),("She drinks milk","Dia minum susu","🥛"),
     ("He reads a book","Dia membaca buku","📚"),("We play ball","Kami main bola","⚽"),("They run fast","Mereka lari cepat","🏃"),
     ("I like cats","Saya suka kucing","🐱"),("She has a dog","Dia punya anjing","🐶"),("He goes to school","Dia pergi ke sekolah","🏫"),
     ("I love my family","Saya cinta keluargaku","❤️"),("We eat together","Kami makan bersama","🍽️")],"Subject + Verb + Object = Simple sentence!"),
    (12,"Verbs (Kata Kerja)","Kelas 3-4","🏃",[("Run","Berlari","🏃"),("Jump","Melompat","🤸"),("Eat","Makan","🍽️"),
     ("Drink","Minum","🥤"),("Sleep","Tidur","😴"),("Read","Membaca","📖"),("Write","Menulis","✍️"),
     ("Swim","Berenang","🏊"),("Fly","Terbang","🦅"),("Sing","Bernyanyi","🎵")],"Action verbs describe what we do!"),
    (13,"Adjectives","Kelas 4","✨",[("Big","Besar","🐘"),("Small","Kecil","🐭"),("Hot","Panas","🔥"),
     ("Cold","Dingin","❄️"),("Fast","Cepat","⚡"),("Slow","Lambat","🐢"),("Beautiful","Cantik","🌸"),
     ("Ugly","Jelek","💀"),("Happy","Senang","😊"),("Sad","Sedih","😢")],"Adjectives describe nouns!"),
    (14,"Present Tense","Kelas 4","📝",[("I play","Saya bermain","🎮"),("She plays","Dia bermain","🎮"),
     ("He eats","Dia makan","🍽️"),("They eat","Mereka makan","🍽️"),("We study","Kami belajar","📚"),
     ("She studies","Dia belajar","📚"),("It runs","Dia (benda) berlari","🏃"),("I go","Saya pergi","🚶"),
     ("He goes","Dia pergi","🚶"),("They live","Mereka tinggal","🏠")],"He/She/It + verb + s/es in simple present!"),
    (15,"Past Tense","Kelas 4-5","⏮️",[("I went","Saya pergi (dulu)","⏮️"),("She ate","Dia makan (dulu)","🍽️"),
     ("He played","Dia bermain (dulu)","🎮"),("We studied","Kami belajar (dulu)","📚"),("They ran","Mereka berlari (dulu)","🏃"),
     ("I bought","Saya membeli (dulu)","🛒"),("She wrote","Dia menulis (dulu)","✍️"),("He swam","Dia berenang (dulu)","🏊"),
     ("We saw","Kami melihat (dulu)","👀"),("I made","Saya membuat (dulu)","🔨")],"Past tense: tambah -ed (regular) atau ganti kata (irregular)"),
    (16,"Future Tense","Kelas 5","⏩",[("I will go","Saya akan pergi","⏩"),("She will eat","Dia akan makan","🍽️"),
     ("He will play","Dia akan bermain","🎮"),("We will study","Kami akan belajar","📚"),("They will run","Mereka akan berlari","🏃"),
     ("I will buy","Saya akan membeli","🛒"),("She will write","Dia akan menulis","✍️"),("He will swim","Dia akan berenang","🏊"),
     ("It will rain","Akan turun hujan","🌧️"),("We will travel","Kami akan bepergian","✈️")],"Future tense: will + base verb"),
    (17,"Prepositions","Kelas 5","📍",[("In","Di dalam","📦"),("On","Di atas","📋"),("Under","Di bawah","⬇️"),
     ("Behind","Di belakang","↩️"),("In front of","Di depan","⬆️"),("Next to","Di sebelah","↔️"),
     ("Between","Di antara","↕️"),("Above","Di atas (jauh)","⬆️"),("Below","Di bawah (jauh)","⬇️"),
     ("Near","Dekat","📍")],"Prepositions show WHERE something is!"),
    (18,"Question Words","Kelas 5","❓",[("What","Apa","❓"),("Where","Di mana","📍"),("When","Kapan","📅"),
     ("Who","Siapa","🙋"),("Why","Mengapa","💭"),("How","Bagaimana","🤔"),("Which","Yang mana","🔀"),
     ("How many","Berapa banyak","🔢"),("How much","Berapa harganya","💰"),("How long","Berapa lama","⏱️")],"Question words help you ask questions in English!"),
    (19,"Short Dialogues","Kelas 5-6","💬",[("What is your name?","Siapa namamu?","🙋"),("My name is...","Namaku...","😊"),
     ("How are you?","Apa kabar?","👋"),("I am fine, thank you","Saya baik, terima kasih","😊"),
     ("Where do you live?","Di mana kamu tinggal?","🏠"),("I live in...","Saya tinggal di...","📍"),
     ("How old are you?","Berapa umurmu?","🎂"),("I am ... years old","Saya berumur ...","🎈"),
     ("What do you like?","Apa yang kamu suka?","❤️"),("I like...","Saya suka...","😍")],"Practice these dialogues with friends!"),
    (20,"Comparative","Kelas 6","📊",[("Bigger","Lebih besar","🐘"),("Smaller","Lebih kecil","🐭"),("Faster","Lebih cepat","⚡"),
     ("Slower","Lebih lambat","🐢"),("Better","Lebih baik","👍"),("Worse","Lebih buruk","👎"),
     ("Older","Lebih tua","👵"),("Younger","Lebih muda","👶"),("Taller","Lebih tinggi","📏"),("Shorter","Lebih pendek","📏")],"Comparative: adjective + -er (big→bigger) or more + adjective"),
    (21,"Superlative","Kelas 6","🏆",[("The biggest","Yang terbesar","🏆"),("The smallest","Yang terkecil","🥇"),
     ("The fastest","Yang tercepat","⚡"),("The slowest","Yang terlambat","🐢"),("The best","Yang terbaik","🥇"),
     ("The worst","Yang terburuk","💔"),("The oldest","Yang tertua","👴"),("The youngest","Yang termuda","👶"),
     ("The tallest","Yang tertinggi","📏"),("The most beautiful","Yang tercantik","🌹")],"Superlative: the + adjective + -est or the most + adjective"),
    (22,"Modal Verbs","Kelas 6","🔤",[("Can","Bisa/Dapat","✅"),("Cannot","Tidak bisa","❌"),("Must","Harus","⚠️"),
     ("Should","Seharusnya","💡"),("May","Boleh","🟢"),("Might","Mungkin","🤔"),("Would","Akan (sopan)","😊"),
     ("Could","Bisa (lampau/sopan)","🔹"),("Shall","Akan (formal)","🔷"),("Need","Perlu","📌")],"Modal verbs express ability, permission, obligation!"),
    (23,"Reading Comprehension","SMP","📖",[("Main idea","Ide pokok","💡"),("Detail","Rincian","📋"),("Inference","Kesimpulan","💭"),
     ("Vocabulary in context","Kosakata dalam konteks","📖"),("Author's purpose","Tujuan penulis","✏️"),
     ("Fact","Fakta","✅"),("Opinion","Opini","💭"),("Summary","Ringkasan","📝"),("Theme","Tema","🎯"),("Setting","Latar","📍")],"Read carefully and look for clues in the text!"),
    (24,"Writing Skills","SMP","✍️",[("Introduction","Pendahuluan","📝"),("Body paragraph","Paragraf isi","📄"),
     ("Conclusion","Kesimpulan","🏁"),("Topic sentence","Kalimat topik","💡"),("Supporting detail","Rincian pendukung","📋"),
     ("Transition word","Kata penghubung","🔗"),("First","Pertama","1️⃣"),("Furthermore","Selain itu","➕"),
     ("However","Namun","↩️"),("In conclusion","Sebagai kesimpulan","🏁")],"A good paragraph has topic sentence + 3 details + conclusion!"),
    (25,"Idioms & Expressions","SMP","💬",[("Break a leg","Semoga berhasil!","🦵"),("Hit the books","Belajar sungguh-sungguh","📚"),
     ("Under the weather","Merasa kurang sehat","🌧️"),("Piece of cake","Sangat mudah","🎂"),
     ("Cost an arm and a leg","Sangat mahal","💰"),("Let the cat out of the bag","Bocorkan rahasia","🐱"),
     ("Bite the bullet","Tabah hadapi situasi sulit","💪"),("Hit the nail on the head","Tepat sasaran","🔨"),
     ("Spill the beans","Bocorkan rahasia","🫘"),("Once in a blue moon","Sangat jarang terjadi","🌙")],"Idioms are fun expressions — their meaning is not literal!"),
]

for lvl, title, badge, icon, vocab, tip in en_levels:
    lessons = []
    chunk = len(vocab) // 3
    for n in range(3):
        vocab_chunk = vocab[n*chunk:(n+1)*chunk] if n < 2 else vocab[n*chunk:]
        if not vocab_chunk: vocab_chunk = vocab
        content = en_rich_content(title, vocab_chunk, tip if n == 0 else "", "emerald")
        qs = en_vocab_quiz(vocab_chunk, 15, vocab)
        lessons.append({
            "id": f"eng{lvl}_{n+1}", "title": f"Part {n+1}", "icon": icon,
            "difficulty": "Mudah" if n==0 else ("Sedang" if n==1 else "Sulit"),
            "duration": "15 menit", "content": content, "questions": qs
        })
    write_js(f"english-{lvl}.js", f"english{lvl}", {
        "id": f"english-{lvl}", "title": f"Level {lvl}: {title}", "badge": badge,
        "icon": icon, "description": title, "lessons": lessons
    })
    print(f"english-{lvl}.js done")

print("\n=== ENGLISH DONE ===\n")
print("=== ALL FILES GENERATED! ===")
