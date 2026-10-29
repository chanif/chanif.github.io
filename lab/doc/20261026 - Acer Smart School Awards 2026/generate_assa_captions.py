# -*- coding: utf-8 -*-
"""
Script Generator Subtitle & Naskah Narasi Video (Durasi Tepat 04:40)
Untuk Acer Smart School Awards 2026 — Kategori Guru Kreatif
Karya: Menyelam ke Dalam Mesin Digital
Kreator: Ach. Chanifuddin Fanani, S.Pd. — SMP Negeri 2 Lamongan
"""

import os

subtitles = [
    (1, "00:00:00,800", "00:00:03,600", "Assalamu'alaikum warahmatullahi wabarakatuh.\nSalam sejahtera untuk kita semua."),
    (2, "00:00:03,750", "00:00:07,500", "Saya Pak Fanani dari SMP Negeri 2 Lamongan."),
    (3, "00:00:07,650", "00:00:11,800", "Izinkan saya membagikan karya inovasi\ndan praktik baik yang saya lakukan di sekolah."),
    (4, "00:00:12,000", "00:00:16,200", "Setiap hari, murid-murid kita begitu lincah\nmengoperasikan gadget atau gawai."),
    (5, "00:00:16,350", "00:00:20,800", "Namun, saat mempelajari Sistem Komputer di kelas 9,\nmuncul sebuah ironi:"),
    (6, "00:00:20,950", "00:00:25,500", "mereka mahir menyentuh layar, tetapi belum memahami\napa yang terjadi di balik mesin digital itu."),
    (7, "00:00:25,700", "00:00:29,200", "Saya mengampu delapan rombel atau kelas,\nkelas 9A sampai 9H."),
    (8, "00:00:29,350", "00:00:33,800", "Materi Sistem Komputer hardware, software, brainware,\nhingga siklus kerja CPU, bersifat abstrak."),
    (9, "00:00:34,000", "00:00:38,200", "Lewat buku teks dan gambar statis,\nmurid cepat jenuh dan hanya menghafal istilah."),
    (10, "00:00:38,400", "00:00:41,500", "Sarana kami pun terbatas:\nhanya ada satu PC terbuka untuk 35 murid,"),
    (11, "00:00:41,650", "00:00:46,000", "dan mereka takut merusak alat\natau takut tersengat listrik statis."),
    (12, "00:00:46,200", "00:00:51,200", "Dari situ saya menyimpulkan bahwa murid membutuhkan\nlaboratorium virtual yang aman, visual, dan interaktif."),
    (13, "00:00:51,400", "00:00:56,000", "Maka lahirlah Media Pembelajaran Interaktif berbasis web\nberjudul \"Menyelam ke Dalam Mesin Digital\","),
    (14, "00:00:56,150", "00:01:00,500", "bagian dari ekosistem laboratorium virtual\npada menu \"Lab\" di website pribadi saya, fanani.my.id."),
    (15, "00:01:00,700", "00:01:05,200", "Sebagai guru Informatika sekaligus praktisi full-stack\nweb developer selama lebih dari 12 tahun,"),
    (16, "00:01:05,350", "00:01:09,800", "saya membangunnya dengan HTML, CSS, dan JavaScript murni\nsehingga ringan dan cepat ketika diakses."),
    (17, "00:01:10,000", "00:01:14,200", "Tampilannya berformat lanskap 16:9,\noptimal untuk IFP atau panel interaktif,"),
    (18, "00:01:14,350", "00:01:18,500", "komputer lab, maupun laptop pribadi murid."),
    (19, "00:01:18,700", "00:01:23,800", "Proses pengembangannya memanfaatkan Google Antigravity\nmelalui vibe coding,"),
    (20, "00:01:24,000", "00:01:30,000", "yaitu berdialog secara terstruktur\ndengan asisten kecerdasan artifisial."),
    (21, "00:01:30,500", "00:01:33,500", "Media ini memiliki empat pilar fitur."),
    (22, "00:01:33,700", "00:01:38,000", "Pertama, materi visual interaktif: rangkuman konsep,\nvideo simulasi alur siklus CPU Von Neumann,"),
    (23, "00:01:38,150", "00:01:42,500", "serta permainan untuk memantik aktivitas siswa."),
    (24, "00:01:42,700", "00:01:46,500", "Kedua, simulator perakitan PC virtual.\nMurid merakit komputer dengan cara drag-and-drop."),
    (25, "00:01:46,650", "00:01:51,200", "Jika benar, indikator hijau menyala\ndisertai bunyi beep BIOS."),
    (26, "00:01:51,350", "00:01:56,000", "Jika salah, muncul indikator merah beserta pesan diagnostik\nyang ramah dan memandu perbaikan."),
    (27, "00:01:56,150", "00:02:00,500", "Murid bebas mencoba tanpa takut merusak alat."),
    (28, "00:02:00,700", "00:02:04,500", "Ketiga, evaluasi multiformat terpadu:\npilihan ganda, benar-salah, menjodohkan,"),
    (29, "00:02:04,650", "00:02:08,800", "hingga pengurutan proses booting\ndengan skor yang langsung muncul."),
    (30, "00:02:09,000", "00:02:12,800", "Keempat, halaman dokumentasi prompt AI."),
    (31, "00:02:13,000", "00:02:19,500", "Seluruh riwayat prompt saya tampilkan secara terbuka\nsebagai teladan kejujuran akademik dan etika AI."),
    (32, "00:02:20,000", "00:02:25,000", "Praktik ini saya terapkan di kelas sampel 9A\ndengan 35 murid, lalu diperluas ke 9B hingga 9H."),
    (33, "00:02:25,200", "00:02:29,800", "Pada kegiatan pembuka, saya memantik rasa ingin tahu\nlewat pertanyaan rahasia di balik layar gawai."),
    (34, "00:02:30,000", "00:02:35,500", "Pada kegiatan inti, murid berkolaborasi di komputer lab\ndan panel interaktif menuntaskan misi simulator CPU."),
    (35, "00:02:35,700", "00:02:40,500", "Di sini peran saya bergeser\ndari penceramah menjadi fasilitator."),
    (36, "00:02:40,700", "00:02:46,000", "Pada kegiatan penutup, murid mengerjakan kuis,\nberdiskusi, dan mengisi lembar refleksi digital."),
    (37, "00:02:46,500", "00:02:50,000", "Dampaknya terlihat nyata pada kelas sampel 9A."),
    (38, "00:02:50,150", "00:02:55,000", "Nilai rata-rata kelas melonjak dari 58,40 pada asesmen awal\nmenjadi 86,80 pada evaluasi akhir,"),
    (39, "00:02:55,150", "00:03:00,000", "dengan 32 dari 35 murid berhasil mencapai ketuntasan."),
    (40, "00:03:00,150", "00:03:06,000", "Sebagian besar murid juga mampu menyelesaikan soal penalaran\nterkait alur kerja CPU dengan sangat baik."),
    (41, "00:03:06,200", "00:03:11,500", "Rasa cemas dan takut salah berganti\ndengan antusiasme belajar yang tinggi."),
    (42, "00:03:11,650", "00:03:16,500", "Murid menjadi berani mencoba dan bereksplorasi secara aktif,"),
    (43, "00:03:16,650", "00:03:22,500", "bahkan sekitar 25 dari 35 murid berinisiatif membuka\ndan mengulang simulasi ini kembali dari rumah."),
    (44, "00:03:23,000", "00:03:26,500", "Dampaknya meluas hingga ke luar kelas."),
    (45, "00:03:26,650", "00:03:32,000", "Dinas Pendidikan Kabupaten Lamongan memercayai saya\nsebagai narasumber Sosialisasi Pembelajaran Mendalam,"),
    (46, "00:03:32,150", "00:03:36,500", "serta Koding dan Kecerdasan Artifisial,\ntanggal 15 September 2026."),
    (47, "00:03:36,700", "00:03:42,500", "Di hadapan 160 guru SMP se-Kabupaten Lamongan,\nsaya berbagi cara merancang media interaktif via vibe coding,"),
    (48, "00:03:42,650", "00:03:47,500", "lalu mempublikasikannya secara gratis lewat GitHub Pages."),
    (49, "00:03:48,000", "00:03:52,500", "Keterbatasan fasilitas bukanlah penghalang,\nmelainkan pemantik kreativitas untuk melahirkan karya bermakna."),
    (50, "00:03:52,700", "00:03:57,500", "Media yang saya kembangkan dapat diakses gratis\nmelalui fanani.my.id pada menu \"Lab\"."),
    (51, "00:03:57,700", "00:04:03,500", "Dalam enam bulan terakhir, saya mengembangkan lima media:\nsatu lab maya, tiga MPI, dan satu gim edukasi."),
    (52, "00:04:03,700", "00:04:08,500", "Kode programnya terbuka dan dapat diakses siapa saja di GitHub."),
    (53, "00:04:08,700", "00:04:14,500", "Melalui video ini, saya mengizinkan siapa pun mengadaptasi\ndan menyempurnakannya demi pendidikan Indonesia yang berkualitas,"),
    (54, "00:04:14,650", "00:04:18,500", "tentunya dengan tetap mencantumkan atribusi."),
    (55, "00:04:18,700", "00:04:24,500", "Semoga praktik baik sederhana dari Lamongan ini\ndapat menginspirasi pendidik di seluruh penjuru negeri."),
    (56, "00:04:24,800", "00:04:28,500", "Terima kasih.\nWassalamu'alaikum warahmatullahi wabarakatuh."),
    (57, "00:04:29,000", "00:04:39,000", "Guru Hebat, Indonesia Kuat!")
]

folder = r"d:\Belajar\vibecoding\chanif.github.io\lab\doc\20261026 - Acer Smart School Awards 2026"

# 1. Tulis file SRT
srt_path = os.path.join(folder, "captions_assa2026_4m40s.srt")
with open(srt_path, "w", encoding="utf-8") as f:
    for idx, start_t, end_t, text in subtitles:
        f.write(f"{idx}\n{start_t} --> {end_t}\n{text}\n\n")

print("File SRT berhasil dibuat di:", srt_path)

# 2. Tulis Naskah Baca / Voiceover TXT
txt_path = os.path.join(folder, "naskah_narasi_video_4m40s.txt")
with open(txt_path, "w", encoding="utf-8") as f:
    f.write("="*75 + "\n")
    f.write("   NASKAH VOICE-OVER VIDEO PRAKTIK BAIK GURU KREATIF ASSA 2026\n")
    f.write("   Judul: Menyelam ke Dalam Mesin Digital\n")
    f.write("   Kreator: Ach. Chanifuddin Fanani, S.Pd. — SMP Negeri 2 Lamongan\n")
    f.write("   Target Durasi: TEPAT 04 Menit 40 Detik (Maksimal Panitia: 05:00)\n")
    f.write("="*75 + "\n\n")
    
    sections = [
        ("BAGIAN 1: PEMBUKA & MASALAH (00:00 - 00:46 | 46 Detik)", 1, 11),
        ("BAGIAN 2: GAGASAN, TEKNOLOGI & VIBE CODING (00:46 - 01:30 | 44 Detik)", 12, 20),
        ("BAGIAN 3: FITUR UNGGULAN & GAMIFIKASI (01:30 - 02:20 | 50 Detik)", 21, 31),
        ("BAGIAN 4: AKSI NYATA DI KELAS & LAB (02:20 - 02:46 | 26 Detik)", 32, 36),
        ("BAGIAN 5: HASIL, DAMPAK & PENGIMBASAN (02:46 - 03:48 | 62 Detik)", 37, 48),
        ("BAGIAN 6: PENUTUP & INSPIRASI (03:48 - 04:40 | 52 Detik)", 49, 57)
    ]
    
    for title, start_idx, end_idx in sections:
        f.write(f"[{title}]\n")
        for idx, start_t, end_t, text in subtitles:
            if start_idx <= idx <= end_idx:
                clean_text = text.replace("\n", " ")
                f.write(f"• ({start_t[:8]} - {end_t[:8]}) {clean_text}\n")
        f.write("\n")

print("File Naskah TXT berhasil dibuat di:", txt_path)
