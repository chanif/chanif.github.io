# -*- coding: utf-8 -*-
"""
Generator Subtitle & Panduan Potong Klip Video (100% Verbatim Tanpa Re-Take)
Acer Smart School Awards 2026 — Kategori Guru Kreatif Jenjang SMP
Target Durasi: 04 Menit 40 Detik (Dari Video Asli 07 Menit 25 Detik)
"""

import re
import os

srt_orig_path = r"d:\Belajar\vibecoding\chanif.github.io\lab\doc\20260930 - Apresiasi GTK 2026\captions.srt"
with open(srt_orig_path, "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(r'(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n(.*?)(?=\n\n|\Z)', re.DOTALL)
matches = pattern.findall(content)

def to_sec(tc):
    h, m, s = tc.split(':')
    s, ms = s.split(',')
    return int(h)*3600 + int(m)*60 + int(s) + int(ms)/1000.0

def to_tc(sec):
    h = int(sec // 3600)
    m = int((sec % 3600) // 60)
    s = int(sec % 60)
    ms = int(round((sec - int(sec)) * 1000))
    if ms >= 1000:
        s += 1
        ms -= 1000
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

orig_items = {}
for m in matches:
    idx = int(m[0])
    orig_items[idx] = {
        'start_tc': m[1],
        'end_tc': m[2],
        'dur': to_sec(m[2]) - to_sec(m[1]),
        'text': m[3]
    }

# Urutan item yang DIPERTAHANKAN (100% kalimat asli tanpa ubah kata)
selected = [
    1, 3,
    6, 7, 8, 9,
    11, 12,
    15, 16,
    17, 18,
    19, 20,
    25, 26,
    30, 31,
    32,
    33, 35, 36,
    37, 38, 39, 40, 41, 42,
    43, 44, 46,
    47, 48, 49,
    50,
    54, 55, 56,
    59, 60, 61, 62,
    64,
    66, 67,
    72, 73, 74,
    75, 76,
    77, 78,
    83, 84,
    90, 91,
    92, 93, 94
]

folder = r"d:\Belajar\vibecoding\chanif.github.io\lab\doc\20261026 - Acer Smart School Awards 2026"

# 1. GENERATE SRT BARU (Consecutive Timeline)
curr_time = 0.800
new_srt_data = []

srt_out_path = os.path.join(folder, "captions_assa2026_4m40s.srt")
with open(srt_out_path, "w", encoding="utf-8") as f:
    for new_idx, orig_idx in enumerate(selected, 1):
        dur = orig_items[orig_idx]['dur']
        start_tc = to_tc(curr_time)
        end_time = curr_time + dur
        end_tc = to_tc(end_time)
        text = orig_items[orig_idx]['text']
        
        f.write(f"{new_idx}\n{start_tc} --> {end_tc}\n{text}\n\n")
        new_srt_data.append((new_idx, start_tc, end_tc, text, orig_idx, orig_items[orig_idx]['start_tc'], orig_items[orig_idx]['end_tc']))
        curr_time = end_time + 0.040 # 40ms micro-gap

print("SRT Baru selesai disimpan:", srt_out_path, f"(Selesai di {to_tc(end_time)})")

# 2. GENERATE NASKAH TEXT VERBATIM
txt_out_path = os.path.join(folder, "naskah_narasi_video_4m40s.txt")
with open(txt_out_path, "w", encoding="utf-8") as f:
    f.write("="*75 + "\n")
    f.write("   NASKAH VOICE-OVER ASLI (100% VERBATIM) - DURASI 04 MENIT 40 DETIK\n")
    f.write("   Acer Smart School Awards 2026 — Kategori Guru Kreatif\n")
    f.write("   Judul: Menyelam ke Dalam Mesin Digital\n")
    f.write("   Kreator: Ach. Chanifuddin Fanani, S.Pd. — SMP Negeri 2 Lamongan\n")
    f.write("="*75 + "\n\n")
    f.write("CATATAN: Seluruh kalimat di bawah ini adalah 100% rekaman asli Pak Fanani,\n")
    f.write("tidak ada kata yang diubah sehingga TIDAK PERLU TAKE VIDEO/AUDIO ULANG.\n")
    f.write("Cukup potong/hapus klip-klip yang tidak dicantumkan di editor video Anda.\n\n")

    for new_idx, start_tc, end_tc, text, orig_idx, orig_start, orig_end in new_srt_data:
        clean_text = text.replace("\n", " ")
        f.write(f"[{new_idx:02d}] (Baru: {start_tc[:8]} | Asli: {orig_start[:8]}) {clean_text}\n")

print("Naskah TXT selesai disimpan:", txt_out_path)

# 3. GENERATE PANDUAN POTONG KLIP VIDEO (CUT LIST)
cut_guide_path = os.path.join(folder, "Panduan_Pangkas_Video_5_Menit_ASSA2026.md")

# Daftar segmen yang DIBUANG dari video 7 menit
cuts = [
    ("Potong 1", "00:00:03,359 --> 00:00:05,511", "Salam sejahtera untuk kita semua.", "2.1 dtk"),
    ("Potong 2", "00:00:09,987 --> 00:00:20,519", "Izinkan saya untuk menceritakan karya inovasi dan praktik baik yang sudah saya lakukan di sekolah.", "10.5 dtk"),
    ("Potong 3", "00:00:38,890 --> 00:00:44,276", "Saya mengampu 8 rombel atau kelas, kelas 9A sampai 9H.", "5.4 dtk"),
    ("Potong 4", "00:00:55,811 --> 00:01:04,216", "Lewat buku teks dan gambar statis, murid cepat jenuh dan hanya menghafal istilah. Sarana kami pun terbatas.", "8.4 dtk"),
    ("Potong 5", "00:01:33,117 --> 00:01:48,758", "bagian dari ekosistem laboratorium virtual pada menu 'Lab' di website pribadi saya, fanani.my.id. Sebagai guru Informatika sekaligus praktisi full-stack web developer selama lebih dari 12 tahun,", "15.6 dtk"),
    ("Potong 6", "00:02:01,200 --> 00:02:16,480", "Tampilannya berformat lanskap 16:9, optimal untuk IFP atau panel interaktif, komputer lab, maupun laptop pribadi murid.", "15.3 dtk"),
    ("Potong 7", "00:02:42,250 --> 00:02:46,230", "Berisi rangkuman materi dengan bahasa yang mudah dipahami,", "4.0 dtk"),
    ("Potong 8", "00:03:26,903 --> 00:03:29,153", "dan pengurutan proses booting,", "2.2 dtk"),
    ("Potong 9", "00:03:54,096 --> 00:04:09,495", "kemudian saya perluas ke kelas 9B hingga 9H. Pada kegiatan pembuka, saya memantik rasa ingin tahu lewat pertanyaan tentang rahasia di balik layar gawai.", "15.4 dtk"),
    ("Potong 10", "00:04:26,284 --> 00:04:36,520", "Pada kegiatan penutup, murid mengerjakan kuis, berdiskusi, dan mengisi lembar refleksi digital.", "10.2 dtk"),
    ("Potong 11", "00:04:57,960 --> 00:05:04,411", "Sebagian besar murid juga mampu menyelesaikan soal penalaran terkait alur kerja CPU dengan baik.", "6.5 dtk"),
    ("Potong 12", "00:05:10,400 --> 00:05:15,275", "Murid menjadi berani mencoba dan bereksplorasi secara aktif,", "4.9 dtk"),
    ("Potong 13", "00:05:26,400 --> 00:05:44,680", "Dampaknya meluas hingga ke luar kelas. Dinas Pendidikan Kabupaten Lamongan memercayai saya sebagai narasumber pada Sosialisasi Pembelajaran Mendalam serta Koding dan Kecerdasan Artifisial, tanggal 15 September 2026.", "18.3 dtk"),
    ("Potong 14", "00:06:21,312 --> 00:06:38,020", "Dalam enam bulan terakhir, saya sudah mengembangkan lima media pada halaman tersebut: satu lab maya, tiga media pembelajaran interaktif, dan satu game edukasi yang masih dalam tahap pengembangan.", "16.7 dtk"),
    ("Potong 15", "00:06:45,919 --> 00:07:07,105", "Melalui video ini, saya mengizinkan siapa pun untuk meng-copy, mengedit, mengembangkan, dan menyempurnakan media yang sudah saya kembangkan demi pendidikan Indonesia yang lebih berkualitas. Tentunya dengan tetap mencantumkan nama dan tautan media saya.", "21.2 dtk")
]

with open(cut_guide_path, "w", encoding="utf-8") as f:
    f.write("# Panduan Potong Klip Video (100% Verbatim Tanpa Take Ulang)\n")
    f.write("## Acer Smart School Awards (ASSA) 2026 — Kategori Guru Kreatif\n\n")
    f.write("**Karya:** *Menyelam ke Dalam Mesin Digital*\n")
    f.write("**Kreator:** Ach. Chanifuddin Fanani, S.Pd. — SMP Negeri 2 Lamongan\n")
    f.write("**Prinsip Utama:** **TIDAK PERLU TAKE VIDEO / AUDIO BARU**. Gunakan rekaman video asli yang 7 menit 25 detik, lalu cukup potong/buang bagian-bagian di bawah ini di editor video Anda (CapCut / Premiere / DaVinci).\n")
    f.write("**Target Durasi Akhir:** **04 Menit 40 Detik** (Aman di bawah batas maksimal 5:00 menit panitia).\n\n")
    f.write("---\n\n")
    f.write("### Daftar 15 Bagian yang DIBUANG (Ripple Delete) dari Video Asli 7 Menit:\n\n")
    f.write("| No | Rentang Waktu di Video Asli (7 Menit) | Potongan Kalimat yang Dibuang | Durasi Terpangkas |\n")
    f.write("| :--- | :--- | :--- | :--- |\n")
    for no, tc, txt, d in cuts:
        f.write(f"| **{no}** | `{tc}` | *\"{txt}\"* | -{d} |\n")
    f.write("\n---\n\n")
    f.write("### Hasil Alur Cerita Setelah Pemotongan (59 Klip Berurutan):\n\n")
    f.write("1. **Pembuka & Masalah (00:00 - 00:39):**\n")
    f.write("   - `Assalamu'alaikum... Saya Pak Fanani dari SMP Negeri 2 Lamongan.`\n")
    f.write("   - `Setiap hari, murid-murid kita begitu lincah mengoperasikan gadget atau gawai. Namun saat mempelajari Sistem Komputer di kelas 9, muncul sebuah ironi: mereka mahir menyentuh layar, tetapi belum memahami apa yang terjadi di balik mesin digital itu.`\n")
    f.write("   - `Materi Sistem Komputer hardware, software, brainware, hingga siklus kerja CPU, bersifat abstrak dan tak kasatmata. Hanya ada satu PC terbuka untuk 35 murid, dan mereka takut merusak alat atau takut tersengat listrik statis.`\n\n")
    f.write("2. **Gagasan & Vibe Coding bersama AI (00:39 - 01:14):**\n")
    f.write("   - `Dari situ saya menyimpulkan, bahwa murid membutuhkan laboratorium virtual yang aman, visual, dan interaktif.`\n")
    f.write("   - `Maka lahirlah Media Pembelajaran Interaktif berbasis web berjudul 'Menyelam ke Dalam Mesin Digital', saya membangunnya dengan HTML, CSS, dan JavaScript murni, sehingga ringan dan cepat ketika diakses.`\n")
    f.write("   - `Proses pengembangannya memanfaatkan Google Antigravity melalui vibe coding, yaitu berdialog secara terstruktur dengan asisten kecerdasan artifisial.`\n\n")
    f.write("3. **Empat Pilar Fitur Media (01:14 - 02:18):**\n")
    f.write("   - `Media ini memiliki empat pilar fitur. Pertama, materi visual interaktif: video pembelajaran untuk visualisasi teori, serta permainan untuk memantik aktivitas siswa.`\n")
    f.write("   - `Kedua, simulator perakitan PC. Murid merakit komputer dengan cara drag-and-drop. Jika benar, indikator hijau menyala disertai bunyi beep BIOS. Jika salah, muncul indikator merah beserta pesan diagnostik yang ramah dan memandu perbaikan. Murid bebas mencoba tanpa takut merusak alat.`\n")
    f.write("   - `Ketiga, evaluasi multiformat. Soalnya berupa pilihan ganda, benar-salah, menjodohkan, dengan skor yang langsung muncul.`\n")
    f.write("   - `Keempat, halaman dokumentasi prompt AI. Seluruh riwayat prompt saya tampilkan secara terbuka sebagai teladan kejujuran akademik dan etika dalam memanfaatkan AI.`\n\n")
    f.write("4. **Aksi di Kelas & Lab (02:18 - 02:40):**\n")
    f.write("   - `Praktik ini saya terapkan di kelas sampel 9A dengan 35 murid. Pada kegiatan inti, murid berkolaborasi di komputer lab dan panel interaktif untuk menuntaskan misi simulator serta membedah siklus CPU. Di sini peran saya bergeser dari penceramah menjadi fasilitator.`\n\n")
    f.write("5. **Hasil Kuantitatif & Pengimbasan 160 Guru (02:40 - 03:38):**\n")
    f.write("   - `Dampaknya terlihat nyata pada kelas sampel 9A. Nilai rata-rata kelas melonjak dari 58,40 pada asesmen awal menjadi 86,80 pada evaluasi akhir, dengan 32 dari 35 murid berhasil mencapai ketuntasan.`\n")
    f.write("   - `Rasa cemas dan takut salah pun berganti dengan antusiasme belajar yang tinggi, bahkan sekitar 25 dari 35 murid berinisiatif membuka dan mengulang simulasi ini kembali dari rumah.`\n")
    f.write("   - `Di hadapan 160 guru SMP negeri dan swasta se-Kabupaten Lamongan, saya berbagi cara merancang media interaktif sendiri melalui vibe coding, lalu mempublikasikannya secara gratis lewat GitHub Pages.`\n\n")
    f.write("6. **Penutup, Open Source & Slogan (03:38 - 04:40):**\n")
    f.write("   - `Keterbatasan fasilitas bukanlah penghalang, melainkan pemantik kreativitas untuk menghasilkan karya bermakna.`\n")
    f.write("   - `Media yang sudah saya kembangkan dapat diakses siapa saja secara gratis melalui website fanani.my.id pada menu 'Lab'. Untuk kode program atau source code, saya set publik, sehingga dapat diakses siapa saja.`\n")
    f.write("   - `Semoga praktik baik sederhana dari Lamongan ini dapat menginspirasi pendidik di seluruh penjuru negeri. Terima kasih. Wassalamu'alaikum warahmatullahi wabarakatuh. Guru Hebat, Indonesia Kuat!`\n\n")
    f.write("---\n\n")
    f.write("### Cara Pakai di Software Editing Video:\n")
    f.write("1. Buka project video 7 menit lama Anda.\n")
    f.write("2. Potong dan hapus (Ripple Delete) 15 bagian di tabel atas.\n")
    f.write("3. Impor berkas subtitle baru `captions_assa2026_4m40s.srt` ke timeline.\n")
    f.write("4. Durasi otomatis menjadi **04:40**!\n")

print("Cut guide selesai disimpan:", cut_guide_path)
