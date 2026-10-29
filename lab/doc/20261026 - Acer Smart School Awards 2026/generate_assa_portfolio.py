# -*- coding: utf-8 -*-
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn
import os
import re

def set_cell_background(cell, fill_hex):
    tcPr = cell._element.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=140, bottom=140, left=180, right=180):
    tcPr = cell._element.get_or_add_tcPr()
    tcMar = parse_xml(f'''
        <w:tcMar {nsdecls("w")}>
            <w:top w:w="{top}" w:type="dxa"/>
            <w:bottom w:w="{bottom}" w:type="dxa"/>
            <w:left w:w="{left}" w:type="dxa"/>
            <w:right w:w="{right}" w:type="dxa"/>
        </w:tcMar>
    ''')
    tcPr.append(tcMar)

def set_table_borders(table, color="D1D5DB", sz="4", val="single"):
    tblPr = table._element.xpath('w:tblPr')
    if tblPr:
        borders = parse_xml(f'''
            <w:tblBorders {nsdecls("w")}>
                <w:top w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
                <w:bottom w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
                <w:insideH w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
                <w:insideV w:val="none"/>
                <w:left w:val="none"/>
                <w:right w:val="none"/>
            </w:tblBorders>
        ''')
        tblPr[0].append(borders)

def add_callout(doc, title, text, border_color="0A6C58", bg_color="F0FDF4"):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    cell = tbl.cell(0, 0)
    cell.width = Inches(6.5)
    set_cell_background(cell, bg_color)
    set_cell_margins(cell, top=160, bottom=160, left=220, right=200)
    
    tcPr = cell._element.get_or_add_tcPr()
    borders = parse_xml(f'''
        <w:tcBorders {nsdecls("w")}>
            <w:top w:val="none"/>
            <w:left w:val="single" w:sz="24" w:space="0" w:color="{border_color}"/>
            <w:bottom w:val="none"/>
            <w:right w:val="none"/>
        </w:tcBorders>
    ''')
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(4)
    run_t = p.add_run(title)
    run_t.bold = True
    run_t.font.name = "Calibri"
    run_t.font.size = Pt(11)
    run_t.font.color.rgb = RGBColor(10, 108, 88)
    
    p2 = cell.add_paragraph()
    p2.paragraph_format.space_before = Pt(0)
    p2.paragraph_format.space_after = Pt(0)
    p2.paragraph_format.line_spacing = 1.15
    run_b = p2.add_run(text)
    run_b.font.name = "Calibri"
    run_b.font.size = Pt(10)
    run_b.font.color.rgb = RGBColor(55, 65, 81)
    
    doc.add_paragraph().paragraph_format.space_after = Pt(6)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(BASE_DIR, "..", "..", ".."))
IMG_01 = os.path.join(REPO_ROOT, "lab", "doc", "20260930 - Apresiasi GTK 2026", "bahan_video", "01_masalah_lab_komputer_16x9.jpg")
IMG_02 = os.path.join(REPO_ROOT, "lab", "doc", "20260930 - Apresiasi GTK 2026", "bahan_video", "02_guru_vibe_coding_16x9.jpg")
IMG_03 = os.path.join(REPO_ROOT, "lab", "doc", "20260930 - Apresiasi GTK 2026", "bahan_video", "03_simulator_pc_interaktif_16x9.jpg")
IMG_04 = os.path.join(REPO_ROOT, "lab", "doc", "20260930 - Apresiasi GTK 2026", "bahan_video", "04_chart_lonjakan_nilai_16x9.png")
IMG_THUMB = os.path.join(BASE_DIR, "thumbnail_youtube_assa2026.jpg")

def add_figure(doc, img_path, caption_text, width=Inches(5.4)):
    if os.path.exists(img_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(8)
        p_img.paragraph_format.space_after = Pt(2)
        p_img.paragraph_format.keep_with_next = True
        run_img = p_img.add_run()
        run_img.add_picture(img_path, width=width)
        
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(0)
        p_cap.paragraph_format.space_after = Pt(10)
        r_cap = p_cap.add_run(caption_text)
        r_cap.font.name = "Calibri"
        r_cap.font.size = Pt(8.5)
        r_cap.font.italic = True
        r_cap.font.color.rgb = RGBColor(107, 114, 128)

def generate_portfolio():
    doc = docx.Document()
    
    # Margin 1 inch (2.54 cm)
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        
        # Header & Footer setup
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("Acer Smart School Awards 2026 | Kategori Guru Kreatif Jenjang SMP")
        hrun.font.name = "Calibri"
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGBColor(156, 163, 175)
        
        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("SMP Negeri 2 Lamongan — Menyelam ke Dalam Mesin Digital")
        frun.font.name = "Calibri"
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = RGBColor(156, 163, 175)

    PRIMARY_COLOR = RGBColor(10, 108, 88)     # Acer Teal / Dark Green
    SECONDARY_COLOR = RGBColor(31, 41, 55)   # Slate 800
    MUTED_COLOR = RGBColor(107, 114, 128)    # Slate 500

    def add_h1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(8)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.bold = True
        run.font.name = "Calibri"
        run.font.size = Pt(15)
        run.font.color.rgb = PRIMARY_COLOR
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.bold = True
        run.font.name = "Calibri"
        run.font.size = Pt(12)
        run.font.color.rgb = SECONDARY_COLOR
        return p

    def add_p(text, bold_prefix="", italic=False):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.15
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        if bold_prefix:
            clean_prefix = bold_prefix.replace("*", "")
            r_b = p.add_run(clean_prefix)
            r_b.bold = True
            r_b.font.name = "Calibri"
            r_b.font.size = Pt(11)
            r_b.font.color.rgb = SECONDARY_COLOR
            
        tokens = re.split(r'(\*\*.*?\*\*|\*.*?\*)', text)
        for token in tokens:
            if not token:
                continue
            if token.startswith("**") and token.endswith("**") and len(token) >= 4:
                content = token[2:-2].replace("*", "")
                r = p.add_run(content)
                r.bold = True
                r.italic = italic
            elif token.startswith("*") and token.endswith("*") and len(token) >= 2:
                content = token[1:-1].replace("*", "")
                r = p.add_run(content)
                r.italic = True
            else:
                content = token.replace("*", "")
                r = p.add_run(content)
                r.italic = italic
            r.font.name = "Calibri"
            r.font.size = Pt(11)
            r.font.color.rgb = RGBColor(31, 41, 55)
        return p

    # ==================== COVER / JUDUL ====================
    p_kicker = doc.add_paragraph()
    p_kicker.paragraph_format.space_before = Pt(10)
    p_kicker.paragraph_format.space_after = Pt(4)
    r_kicker = p_kicker.add_run("PORTOFOLIO INOVASI PEMBELAJARAN GURU KREATIF ASSA 2026")
    r_kicker.bold = True
    r_kicker.font.name = "Calibri"
    r_kicker.font.size = Pt(10)
    r_kicker.font.color.rgb = PRIMARY_COLOR

    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(8)
    r_title = p_title.add_run("Menyelam ke Dalam Mesin Digital: Transformasi Pembelajaran Sistem Komputer Menjadi Pengalaman Imersif Bebas Risiko")
    r_title.bold = True
    r_title.font.name = "Calibri"
    r_title.font.size = Pt(18)
    r_title.font.color.rgb = SECONDARY_COLOR

    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(16)
    r_sub = p_sub.add_run("Laboratorium Virtual Berbasis Web Mandiri Melalui Pendekatan Vibe Coding dan Kecerdasan Artifisial Beretika di SMP Negeri 2 Lamongan")
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(12)
    r_sub.font.italic = True
    r_sub.font.color.rgb = MUTED_COLOR

    # Tabel Identitas Singkat
    t_id = doc.add_table(rows=7, cols=2)
    t_id.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_id.autofit = False
    set_table_borders(t_id, color="E5E7EB", sz="4")
    
    id_data = [
        ("Nama Lengkap Peserta", "Ach. Chanifuddin Fanani, S.Pd."),
        ("NIP / NUPTK", "19910826 202012 1 007 / 9158 7696 7013 0183"),
        ("Satuan Pendidikan", "SMP Negeri 2 Lamongan (Kabupaten Lamongan, Jawa Timur)"),
        ("Mata Pelajaran & Fase", "Informatika / Fase D (Kelas IX)"),
        ("Kategori Lomba", "Guru Kreatif (Jenjang SMP / MTs)"),
        ("Tautan Media Live Demo", "https://fanani.my.id/lab/mpi/sistem-komputer/"),
        ("Tautan Repositori Kode", "https://github.com/chanif/chanif.github.io")
    ]
    for row_idx, (k, v) in enumerate(id_data):
        row = t_id.rows[row_idx]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.2)
        c1.width = Inches(4.3)
        set_cell_margins(c0, top=90, bottom=90, left=120, right=120)
        set_cell_margins(c1, top=90, bottom=90, left=120, right=120)
        if row_idx % 2 == 0:
            set_cell_background(c0, "F9FAFB")
            set_cell_background(c1, "F9FAFB")
        
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(k)
        r0.font.name = "Calibri"
        r0.font.size = Pt(9.5)
        r0.bold = True
        r0.font.color.rgb = SECONDARY_COLOR
        
        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(v)
        r1.font.name = "Calibri"
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = RGBColor(55, 65, 81)

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    add_callout(
        doc,
        "Ringkasan Eksekutif (Executive Summary)",
        "Praktik baik ini mengatasi ironi ruang kelas di mana murid fasih mengoperasikan gawai namun buta terhadap proses komputasi internal di baliknya. Melalui pendekatan vibe coding bersama kecerdasan artifisial (Google Antigravity), guru menciptakan laboratorium virtual web native 'Menyelam ke Dalam Mesin Digital' yang memvisualisasikan anatomi motherboard, siklus CPU Von Neumann, dan simulator perakitan PC bergamifikasi. Hasil implementasi di kelas IX SMPN 2 Lamongan mendongkrak ketuntasan belajar dari 37,1% menjadi 91,4%, menghapus kecemasan merusak alat, mendorong kemandirian belajar mandiri di rumah (71,4% murid), serta sukses diimbaskan kepada 160 guru se-Kabupaten Lamongan."
    )

    # ==================== BAB 1 ====================
    add_h1("1. Sampul dan Identitas Sekolah / Madrasah")
    add_p("SMP Negeri 2 Lamongan merupakan salah satu sekolah rujukan digital di Kabupaten Lamongan, Jawa Timur, yang berkomitmen mengintegrasikan teknologi informasi dalam memperkuat nalar kritis peserta didik. Dalam konteks Kurikulum Merdeka Fase D, mata pelajaran Informatika memiliki peran strategis membentuk kompetensi komputasi dan literasi digital siswa.")
    add_p("Inovasi 'Menyelam ke Dalam Mesin Digital' dirancang dan diimplementasikan secara langsung oleh Ach. Chanifuddin Fanani, S.Pd., guru pengampu Informatika kelas IX yang memiliki rekam jejak lebih dari 12 tahun sebagai praktisi full-stack web developer. Program ini telah memperoleh persetujuan dan dukungan penuh dari Kepala SMP Negeri 2 Lamongan, Sujarno, S.Pd., M.Pd., sebagai bagian integral dari akselerasi transformasi pembelajaran digital sekolah.")

    # ==================== BAB 2 ====================
    add_h1("2. Strategi Inovasi dan Transformasi Digital")
    add_h2("2.1 Latar Belakang Masalah dan Kesenjangan Pembelajaran")
    add_p("Setiap hari, murid generasi z dan alpha sangat lincah mengoperasikan layar sentuh telepon pintar dan laptop. Namun, ketika memasuki elemen Sistem Komputer pada kelas IX, muncul fenomena 'paradoks digital': mereka mahir sebagai pengguna luar (konsumen), namun buta dan bingung membayangkan aliran data biner serta mekanisme fisik perangkat keras yang bekerja di dalam mesin.")
    add_p("Materi Sistem Komputer—mulai dari Segitiga Emas (Hardware, Software, Brainware), interkoneksi komponen motherboard, siklus mesin CPU (Fetch-Decode-Execute-Store), hingga peran manajemen sistem operasi—bersifat sangat abstrak dan mikroskopis. Pembelajaran konvensional yang mengandalkan gambar statis buku paket atau slide presentasi membuat murid pasif, cepat bosan, dan sekadar menghafal istilah teknis tanpa pemahaman konseptual yang mendalam.")

    add_h2("2.2 Keterbatasan Sarana dan Hambatan Psikologis Murid")
    add_p("Kondisi tersebut diperberat oleh keterbatasan fasilitas laboratorium sekolah. Laboratorium komputer kami hanya memiliki satu unit CPU terbuka untuk didemonstrasikan kepada 35 murid dalam satu kelas (rasio 1:35). Praktik merakit komputer fisik satu per satu bagi setiap murid mustahil diwujudkan karena keterbatasan jam pelajaran serta tingginya risiko biaya. Selain itu, muncul hambatan psikologis: murid merasa cemas, takut merusak komponen mahal jika salah colok soket, atau takut tersengat listrik statis.")
    add_figure(doc, IMG_01, "Gambar 1: Situasi laboratorium komputer dengan keterbatasan sarana fisik (rasio alat 1:35) dan hambatan psikologis rasa cemas murid.", width=Inches(5.4))

    add_h2("2.3 Terobosan Transformasi Digital: Vibe Coding dan Media Web Mandiri")
    add_p("Menjawab kesenjangan tersebut, guru merumuskan strategi inovasi laboratorium virtual berbasis web terbuka (*open web standards*) yang dapat diakses dari panel layar interaktif kelas (Interactive Flat Panel / IFP), komputer lab, laptop, maupun gawai di rumah tanpa biaya. Strategi pengembangannya mengadopsi pendekatan Vibe Coding, yaitu proses perancangan perangkat lunak melalui dialog terstruktur dan iteratif dengan asisten kecerdasan artifisial (*AI-assisted software engineering*) menggunakan Google Antigravity.")
    add_p("Pendekatan ini memungkinkan guru mewujudkan logika rekayasa perangkat lunak yang kompleks—seperti kalkulasi koordinat penataan komponen secara real-time (*bounding box collision detection*), penanganan sentuhan multitouch pada IFP, simulasi audio beep BIOS, dan visualisasi interaktif alur CPU—secara cepat, presisi, dan 100% selaras dengan kebutuhan pedagogis murid SMP.")
    add_figure(doc, IMG_02, "Gambar 2: Proses interaksi rekayasa Vibe Coding — Guru berdialog terstruktur bersama AI (Google Antigravity) dalam membangun modul web interaktif.", width=Inches(5.4))

    # ==================== BAB 3 ====================
    add_h1("3. Tahapan Implementasi, Waktu, Sumber Daya, dan Kolaborasi")
    add_h2("3.1 Tahapan Pengembangan dengan Model ADDIE")
    add_p("Inovasi ini dikembangkan dan diterapkan secara sistematis menggunakan kerangka kerja ADDIE (Analysis, Design, Development, Implementation, Evaluation) yang dipadukan dengan pendekatan inkuiri terbimbing (*guided inquiry*):")
    
    add_p(" Mengkaji Capaian Pembelajaran (CP) Informatika Fase D dan menganalisis data diagnostik awal murid kelas 9A s.d. 9H. Ditemukan bahwa konsep siklus CPU dan kompatibilitas hardware menjadi materi paling sulit dipahami.", bold_prefix="1. Tahap Analisis (Juli 2026):")
    add_p(" Merancang storyboard arsitektur media 21 halaman modular dengan rasio visual lanskap 16:9. Antarmuka dilengkapi 'Quick Controls Card' (fitur zoom in/out dan tombol A-/A+ ukuran font) agar keterbacaan materi tetap optimal dari bangku belakang kelas.", bold_prefix="2. Tahap Desain (Agustus 2026):")
    add_p(" Membangun kode program menggunakan HTML5, CSS3, dan JavaScript murni tanpa ketergantungan library pihak ketiga yang berat. Guru menggunakan Google Antigravity untuk merekayasa algoritma drag-and-drop simulator, Google Vids untuk aset video siklus CPU, serta menyusun halaman transparansi prompt AI.", bold_prefix="3. Tahap Pengembangan (Agustus - September 2026):")
    add_p(" Mengunggah media ke GitHub Pages (https://fanani.my.id/lab/mpi/sistem-komputer/) dan menerapkannya dalam pembelajaran riil di kelas sampel IX-A (35 murid), kemudian diekspansi ke rombel IX-B sampai IX-H.", bold_prefix="4. Tahap Implementasi (September 2026):")
    add_p(" Mengumpulkan data hasil evaluasi formatif, respons kualitatif murid, dan umpan balik observasi kelas untuk menyempurnakan performa media secara berkelanjutan.", bold_prefix="5. Tahap Evaluasi (Akhir September - Oktober 2026):")

    add_h2("3.2 Skenario Pembelajaran Berdampak di Ruang Kelas")
    add_p("Pelaksanaan pembelajaran berlangsung dalam tiga fase yang memfasilitasi keterlibatan aktif (*active learning*):")
    add_p(" Guru menampilkan tayangan gawai yang sedang menyala di layar IFP depan kelas, lalu memantik rasa penasaran murid melalui pertanyaan pemantik: 'Ketika tombol daya ditekan, siapa yang sebenarnya bekerja pertama kali di dalam mesin?' Murid diajak membuka media 'Menyelam ke Dalam Mesin Digital'.", bold_prefix="• Kegiatan Pembuka (15 Menit):")
    add_p(" Murid mengeksplorasi media secara kolaboratif dalam kelompok kecil. Melalui panel interaktif dan PC lab, murid membedah motherboard interaktif, menyaksikan animasi alur data bus CPU, dan menjalankan 'Misi Teknisi Komputer': merakit prosesor, RAM, SSD NVMe, GPU, dan PSU ke motherboard. Ketika komponen salah dipasang (misal RAM DDR2 jadul ke motherboard modern), sistem memberikan peringatan diagnostik merah yang mendidik. Jika perakitan benar, indikator hijau menyala diiringi suara beep POST BIOS yang sukses. Guru berperan aktif sebagai fasilitator dan mentor inkuiri.", bold_prefix="• Kegiatan Inti (50 Menit):")
    add_p(" Murid menuntaskan kuis evaluasi 4 format interaktif (Pilihan Ganda HOTS, Benar-Salah, Menjodohkan, dan Pengurutan Proses Booting), merefleksikan proses belajar pada lembar refleksi digital, dan merangkum konsep bersama guru.", bold_prefix="• Kegiatan Penutup (15 Menit):")
    add_figure(doc, IMG_03, "Gambar 3: Antarmuka Laboratorium Maya Perakitan PC dengan sistem drag-and-drop komponen, validasi soket, dan respons suara beep BIOS.", width=Inches(5.4))

    add_h2("3.3 Kolaborasi dan Pemanfaatan Sumber Daya")
    add_p("Inovasi ini terwujud berkat sinergi berbagai pihak dan pemanfaatan sumber daya yang efisien:")
    add_p(" Menyediakan sarana panel layar sentuh IFP kelas, laboratorium komputer, dan memberikan izin resmi penerapan inovasi.", bold_prefix="• Kepala Satuan Pendidikan:")
    add_p(" 35 murid kelas sampel 9A sebagai subjek eksplorasi awal, disusul 245 murid kelas 9B–9H sebagai rombel ekspansi.", bold_prefix="• Peserta Didik:")
    add_p(" Guru informatika paralel (kelas 9I dan 9J) yang turut mengamati observasi kelas dan mereplikasi media di kelas masing-masing.", bold_prefix="• Rekan Sejawat:")
    add_p(" Mendampingi dan mendukung keterlibatan putra-putrinya yang secara mandiri mengulang simulasi di rumah menggunakan laptop/HP keluarga.", bold_prefix="• Orang Tua Murid:")
    add_p(" Memberikan panggung diseminasi resmi tingkat kabupaten pada Sosialisasi Pembelajaran Mendalam serta Koding & Kecerdasan Artifisial (15 September 2026).", bold_prefix="• Dinas Pendidikan Kab. Lamongan:")

    # ==================== BAB 4 ====================
    add_h1("4. Hasil, Dampak, dan Perbandingan terhadap Kondisi Awal")
    add_h2("4.1 Lonjakan Kuantitatif Hasil Belajar Murid")
    add_p("Efektivitas inovasi dievaluasi melalui perbandingan asesmen diagnostik awal (*pre-test*) dengan asesmen sumatif modul (*post-test*) pada kelas sampel IX-A (35 murid). Hasilnya menunjukkan peningkatan performa akademik yang sangat signifikan:")

    # Tabel Data Kuantitatif
    t_stat = doc.add_table(rows=5, cols=4)
    t_stat.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_stat.autofit = False
    set_table_borders(t_stat, color="D1D5DB", sz="6")
    
    stat_headers = ["Indikator Penilaian", "Kondisi Awal (Pre-Test)", "Kondisi Akhir (Post-Test)", "Pertumbuhan / Kenaikan"]
    for i, h in enumerate(stat_headers):
        cell = t_stat.rows[0].cells[i]
        set_cell_background(cell, "0A6C58")
        set_cell_margins(cell, top=100, bottom=100, left=100, right=100)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.size = Pt(9.5)
        r.font.color.rgb = RGBColor(255, 255, 255)

    stat_rows = [
        ("Nilai Rata-Rata Kelas", "58,40 (Kategori Kurang)", "86,80 (Kategori Sangat Baik)", "+28,40 Poin (+48,6%)"),
        ("Jumlah Murid Tuntas (KKTP >= 75)", "13 Murid", "32 Murid", "+19 Murid (+146,1%)"),
        ("Persentase Ketuntasan Klasikal", "37,1%", "91,4%", "+54,3% Lonjakan"),
        ("Tingkat Kelulusan Soal HOTS CPU", "22,8% (8 murid)", "88,6% (31 murid)", "+65,8% Penguasaan Nalar")
    ]
    for row_idx, row_data in enumerate(stat_rows, start=1):
        row = t_stat.rows[row_idx]
        for col_idx, val in enumerate(row_data):
            cell = row.cells[col_idx]
            set_cell_margins(cell, top=80, bottom=80, left=90, right=90)
            if row_idx % 2 == 1:
                set_cell_background(cell, "F9FAFB")
            p = cell.paragraphs[0]
            if col_idx > 0:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(val)
            r.font.name = "Calibri"
            r.font.size = Pt(9.5)
            if col_idx == 3:
                r.bold = True
                r.font.color.rgb = PRIMARY_COLOR
            else:
                r.font.color.rgb = SECONDARY_COLOR

    doc.add_paragraph().paragraph_format.space_after = Pt(8)
    add_figure(doc, IMG_04, "Gambar 4: Grafik perbandingan capaian ketuntasan belajar murid kelas IX-A (Pre-test vs Post-test) yang meningkat dari 37,1% ke 91,4%.", width=Inches(5.4))

    add_h2("4.2 Dampak Kualitatif: Terciptanya Ruang Belajar Bebas Risiko")
    add_p("Secara kualitatif, terjadi transformasi atmosfer kelas yang luar biasa. Rasa cemas dan takut merusak alat elektronik fisik berganti menjadi antusiasme eksperimen yang tinggi. Murid berani mencoba memasang komponen yang salah demi melihat respon diagnostik sistem dan mendengar bunyi peringatan sistem, lalu berdiskusi memecahkan solusinya. Media virtual ini memberikan 'psychological safety' (keamanan psikologis) bagi murid untuk berani salah dan belajar dari kesalahan.")

    add_h2("4.3 Kemandirian Belajar dan Resonansi di Rumah")
    add_p("Dampak media ini meluas melampaui jam tatap muka di sekolah. Berdasarkan data analitik dan lembar refleksi, sebanyak 25 dari 35 murid (71,4%) secara sukarela mengakses kembali media ini dari rumah untuk mengulang simulasi perakitan PC dan memainkan kuis pemantapan. Banyak orang tua murid memberikan respons positif karena anak-anak mereka antusias menceritakan cara kerja prosesor dan motherboard saat di rumah.")

    add_h2("4.4 Dampak Pengimbasan Daerah (Diseminasi 160 Guru SMP)")
    add_p("Keberhasilan inovasi ini diakui secara luas di tingkat daerah. Dinas Pendidikan Kabupaten Lamongan menunjuk Ach. Chanifuddin Fanani, S.Pd. sebagai narasumber tunggal pada forum 'Sosialisasi Pembelajaran Mendalam serta Koding & Kecerdasan Artifisial Tahun Pelajaran 2026/2027' pada tanggal 15 September 2026. Di hadapan 160 guru perwakilan SMP negeri dan swasta se-Kabupaten Lamongan, guru melatih rekan sejawat menyusun media pembelajaran interaktif berbasis web melalui pendekatan vibe coding dan mempublikasikannya secara mandiri di GitHub Pages.")

    # ==================== BAB 5 ====================
    add_h1("5. Hambatan, Pembelajaran, Evaluasi, dan Perbaikan")
    add_h2("5.1 Hambatan Teknis dan Solusi Rekayasa")
    add_p(" Respon area sentuh komponen (*touch target*) pada layar besar IFP (Interactive Flat Panel) awalnya memiliki sedikit pergeseran offset koordinat dibandingkan saat menggunakan mouse desktop. Solusinya, guru mengkalibrasi ulang fungsi getBoundingClientRect() dan menambahkan event listener terpadu Pointer Events (pointerdown, pointermove, pointerup) sehingga presisi sentuhan menjadi sempurna di berbagai resolusi layar.", bold_prefix="• Hambatan Kalibrasi Layar Sentuh:")
    add_p(" Animasi resolusi tinggi berisiko membebani memori RAM komputer lab generasi lawas. Solusinya, seluruh aset visual dioptimalkan ke format WebP terkompresi dan animasi disusun murni dengan CSS Hardware-Accelerated (transform: translate3d) sehingga waktu muat halaman (load time) terpangkas hingga di bawah 1,8 detik.", bold_prefix="• Optimalisasi Beban Memori:")

    add_h2("5.2 Hambatan Pedagogis dan Diferensiasi Pembelajaran")
    add_p("Meskipun 32 murid berhasil mencapai ketuntasan, masih terdapat 3 murid yang membutuhkan waktu lebih lama dalam memahami alur booting dan konversi bilangan biner. Evaluasi ini menyadarkan guru bahwa media digital tidak boleh menggantikan sentuhan manusia. Terhadap 3 murid tersebut, guru memberikan intervensi personal (*scaffolding*) dengan bimbingan analogi langsung dan pendampingan sebaya (*peer tutoring*).")

    add_h2("5.3 Refleksi Pemanfaatan AI: Guru sebagai Arsitek Pedagogi")
    add_p("Pemanfaatan AI melalui Vibe Coding membuktikan bahwa AI bukanlah ancaman orisinalitas guru, melainkan mitra rekayasa yang sangat kuat. AI berperan mempercepat penulisan baris kode dan perakitan komponen antarmuka, namun visi pembelajaran, rancangan skenario pedagogis, dan nilai-nilai etika sepenuhnya berada di bawah kendali guru. Guru tetap menjadi arsitek utama pembelajaran.")

    # ==================== BAB 6 ====================
    add_h1("6. Rencana Keberlanjutan, Pengembangan, dan Replikasi")
    add_h2("6.1 Prinsip Keberlanjutan dan Green EdTech (Zero E-Waste)")
    add_p("Inovasi 'Menyelam ke Dalam Mesin Digital' menganut prinsip keberlanjutan lingkungan dan efisiensi biaya (*sustainable education*):")
    add_p(" Media ini meniadakan kebutuhan pengadaan puluhan unit komponen PC fisik yang rentan rusak dan berpotensi menjadi limbah elektronik (*electronic waste / e-waste*).", bold_prefix="1. Pencegahan Limbah Elektronik:")
    add_p(" Dibangun dengan standar web terbuka tanpa dependensi framework berat, media ini dapat dijalankan dengan mulus di perangkat berspesifikasi hemat energi seperti laptop Chromebook, laptop Acer Aspire standar, maupun PC lama sekolah tanpa butuh kartu grafis mahal.", bold_prefix="2. Efisiensi Sumber Daya Komputasi:")
    add_p(" LKPD interaktif dan kuis formatif terintegrasi penuh secara digital sehingga mengeliminasi pemborosan kertas (*paperless learning*).", bold_prefix="3. Pengurangan Kertas:")

    add_h2("6.2 Peta Jalan Pengembangan (Roadmap)")
    add_p(" Ke depannya, media ini akan didaftarkan service worker untuk menjadi PWA penuh, memungkinkan akses 100% offline tanpa membutuhkan koneksi internet sama sekali setelah pemuatan pertama.", bold_prefix="• Fase 1 (Q4 2026) - Konversi ke Progressive Web App (PWA):")
    add_p(" Memperluas cakupan simulasi ke materi Jaringan Komputer & Internet (topologi jaringan, routing paket data, dan konfigurasi IP address virtual).", bold_prefix="• Fase 2 (Semester Genap 2027) - Ekspansi Elemen JKI:")
    add_p(" Meluncurkan simulator logika algoritma visual interaktif untuk memperkuat fondasi berpikir komputasional (*computational thinking*) murid SMP sejalan dengan kerangka Intel Skills for Innovation.", bold_prefix="• Fase 3 (Tahun Ajaran 2027/2028) - Modul Algoritma & Pemrograman:")

    add_h2("6.3 Skalabilitas dan Rencana Replikasi Nasional")
    add_p("Seluruh kode sumber inovasi ini dibuka secara transparan (*open source*) di GitHub (https://github.com/chanif/chanif.github.io). Dengan lisensi terbuka ini, guru informatika di seluruh Indonesia dapat mengkloning, memodifikasi, dan mengadaptasi media ini sesuai konteks lokal sekolah masing-masing tanpa biaya lisensi sepeser pun.")

    # ==================== BAB 7 ====================
    add_h1("7. Daftar Evidence yang Terhubung dengan Klaim Portofolio")
    add_p("Berikut adalah matriks validasi bukti digital (*digital evidence*) yang dapat diuji dan diakses langsung oleh Dewan Juri Acer Smart School Awards 2026:")

    # Tabel Matriks Evidence
    t_ev = doc.add_table(rows=8, cols=3)
    t_ev.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_ev.autofit = False
    set_table_borders(t_ev, color="D1D5DB", sz="6")
    
    ev_headers = ["Klaim Inovasi / Portofolio", "Jenis Bukti (Evidence)", "Tautan Akses Digital (Aktif)"]
    for i, h in enumerate(ev_headers):
        cell = t_ev.rows[0].cells[i]
        set_cell_background(cell, "0A6C58")
        set_cell_margins(cell, top=100, bottom=100, left=90, right=90)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.size = Pt(9.5)
        r.font.color.rgb = RGBColor(255, 255, 255)

    ev_data = [
        ("Produk Media Pembelajaran Interaktif (MPI)", "Aplikasi Web Native Interaktif (21 Halaman, Simulator PC, Diagnostik)", "https://fanani.my.id/lab/mpi/sistem-komputer/"),
        ("Laboratorium Maya Perakitan PC", "Simulator Drag-and-Drop Motherboard, Logic Gates & LKPD Digital", "https://fanani.my.id/lab/lab-maya/perakitan-komputer/index.html"),
        ("Ekosistem Portofolio Laboratorium Maya", "Kompilasi 5 Media Interaktif & Gim Edukasi Guru", "https://fanani.my.id/lab/"),
        ("Kode Sumber Terbuka (Open Source Code)", "Repositori GitHub Publik & Riwayat Komit Pengembangan", "https://github.com/chanif/chanif.github.io"),
        ("Video Narasi Praktik Baik Pembelajaran", "Video Profil YouTube (Durasi 04:48 Menit, Resolusi Full HD, Takarir Indonesia)", "https://www.youtube.com/watch?v=p-auk5ULNFo"),
        ("Pengimbasan 160 Guru SMP Tingkat Daerah", "Dokumentasi & Modul Workshop Dinas Pendidikan Kab. Lamongan", "https://fanani.my.id/edu/workshop/2026-09-workshop-kka-dinas-pendidikan/index.html"),
        ("Transparansi Prompt AI & Etika Akademik", "Halaman Dokumentasi Prompt AI Terbuka & Atribusi Aset", "Tersedia di Menu 'Prompt AI' pada aplikasi Live Demo")
    ]
    for row_idx, (k, b, u) in enumerate(ev_data, start=1):
        row = t_ev.rows[row_idx]
        c0, c1, c2 = row.cells[0], row.cells[1], row.cells[2]
        c0.width = Inches(2.2)
        c1.width = Inches(2.3)
        c2.width = Inches(2.0)
        set_cell_margins(c0, top=70, bottom=70, left=80, right=80)
        set_cell_margins(c1, top=70, bottom=70, left=80, right=80)
        set_cell_margins(c2, top=70, bottom=70, left=80, right=80)
        if row_idx % 2 == 1:
            set_cell_background(c0, "F9FAFB")
            set_cell_background(c1, "F9FAFB")
            set_cell_background(c2, "F9FAFB")
            
        p0 = c0.paragraphs[0]; p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(k); r0.font.name = "Calibri"; r0.font.size = Pt(9); r0.bold = True; r0.font.color.rgb = SECONDARY_COLOR
        
        p1 = c1.paragraphs[0]; p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(b); r1.font.name = "Calibri"; r1.font.size = Pt(8.5); r1.font.color.rgb = RGBColor(75, 85, 99)
        
        p2 = c2.paragraphs[0]; p2.paragraph_format.space_after = Pt(0)
        r2 = p2.add_run(u); r2.font.name = "Calibri"; r2.font.size = Pt(8.5); r2.font.color.rgb = PRIMARY_COLOR; r2.font.underline = True

    doc.add_paragraph().paragraph_format.space_after = Pt(10)
    add_figure(doc, IMG_THUMB, "Gambar 5: Dokumentasi Video Narasi Praktik Baik Pembelajaran (04:48 Menit, Full HD, Takarir Indonesia) pada kanal YouTube: https://www.youtube.com/watch?v=p-auk5ULNFo", width=Inches(5.4))
    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # Tanda tangan
    p_sign_date = doc.add_paragraph()
    p_sign_date.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_sign_date.paragraph_format.space_after = Pt(2)
    r_sd = p_sign_date.add_run("Lamongan, 26 Oktober 2026\nPendidik Peserta Guru Kreatif ASSA 2026,")
    r_sd.font.name = "Calibri"
    r_sd.font.size = Pt(10.5)

    doc.add_paragraph().paragraph_format.space_after = Pt(40)

    p_sign_name = doc.add_paragraph()
    p_sign_name.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_sign_name.paragraph_format.space_after = Pt(0)
    r_sn = p_sign_name.add_run("ACH. CHANIFUDDIN FANANI, S.Pd.\n")
    r_sn.bold = True
    r_sn.font.name = "Calibri"
    r_sn.font.size = Pt(11)
    r_sn2 = p_sign_name.add_run("NIP. 19910826 202012 1 007 | NUPTK. 9158 7696 7013 0183\nSMP Negeri 2 Lamongan")
    r_sn2.font.name = "Calibri"
    r_sn2.font.size = Pt(9.5)
    r_sn2.font.color.rgb = MUTED_COLOR

    out_path = r"d:\Belajar\vibecoding\chanif.github.io\lab\doc\20261026 - Acer Smart School Awards 2026\Guru Kreatif_Ach Chanifuddin Fanani_Menyelam Mesin Digital_Portofolio.docx"
    doc.save(out_path)
    print("Portfolio saved successfully to:", out_path)

if __name__ == "__main__":
    generate_portfolio()
