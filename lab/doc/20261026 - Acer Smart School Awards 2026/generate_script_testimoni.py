# -*- coding: utf-8 -*-
"""Generator dokumen naskah video testimoni Juara 3 ASSA 2026."""

import os
import re
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls


PRIMARY_COLOR = RGBColor(10, 108, 88)     # Acer Teal (#0A6C58)
SECONDARY_COLOR = RGBColor(31, 41, 55)   # Slate 800 (#1F2937)
MUTED_COLOR = RGBColor(107, 114, 128)    # Slate 500 (#6B7280)


def set_cell_background(cell, fill_hex):
    tc_pr = cell._element.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tc_pr.append(shd)


def set_cell_margins(cell, top=100, bottom=100, left=140, right=140):
    tc_pr = cell._element.get_or_add_tcPr()
    tc_mar = parse_xml(f'''
        <w:tcMar {nsdecls("w")}>
            <w:top w:w="{top}" w:type="dxa"/>
            <w:bottom w:w="{bottom}" w:type="dxa"/>
            <w:left w:w="{left}" w:type="dxa"/>
            <w:right w:w="{right}" w:type="dxa"/>
        </w:tcMar>
    ''')
    tc_pr.append(tc_mar)


def set_table_borders(table, color="D1D5DB", sz="4", val="single", include_vertical=False):
    tbl_pr = table._element.xpath('w:tblPr')
    if tbl_pr:
        v_val = val if include_vertical else "none"
        borders = parse_xml(f'''
            <w:tblBorders {nsdecls("w")}>
                <w:top w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
                <w:bottom w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
                <w:insideH w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
                <w:insideV w:val="{v_val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
                <w:left w:val="{v_val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
                <w:right w:val="{v_val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
            </w:tblBorders>
        ''')
        tbl_pr[0].append(borders)


def add_rich_runs(paragraph, text, font_size=10.5, color=SECONDARY_COLOR, default_italic=False):
    tokens = re.split(r'(\*\*.*?\*\*|\*.*?\*)', text)
    for token in tokens:
        if not token:
            continue
        if token.startswith("**") and token.endswith("**") and len(token) >= 4:
            r = paragraph.add_run(token[2:-2])
            r.bold = True
            r.italic = default_italic
        elif token.startswith("*") and token.endswith("*") and len(token) >= 2:
            r = paragraph.add_run(token[1:-1])
            r.italic = True
        else:
            r = paragraph.add_run(token)
            r.italic = default_italic
        r.font.name = "Calibri"
        r.font.size = Pt(font_size)
        r.font.color.rgb = color


def add_section_heading(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(text)
    r.bold = True
    r.font.name = "Calibri"
    r.font.size = Pt(13)
    r.font.color.rgb = PRIMARY_COLOR
    return p


def add_styled_box(doc, paragraphs_text, bg_color, border_left_color=None, border_all_color=None,
                   font_size=12.5, line_spacing=1.35, width_inches=6.8):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    cell = tbl.cell(0, 0)
    cell.width = Inches(width_inches)
    set_cell_background(cell, bg_color)
    set_cell_margins(cell, top=160, bottom=160, left=220, right=200)

    tc_pr = cell._element.get_or_add_tcPr()
    if border_left_color:
        borders = parse_xml(f'''
            <w:tcBorders {nsdecls("w")}>
                <w:top w:val="none"/>
                <w:left w:val="single" w:sz="24" w:space="0" w:color="{border_left_color}"/>
                <w:bottom w:val="none"/>
                <w:right w:val="none"/>
            </w:tcBorders>
        ''')
    else:
        b_col = border_all_color or "CBD5E1"
        borders = parse_xml(f'''
            <w:tcBorders {nsdecls("w")}>
                <w:top w:val="single" w:sz="6" w:space="0" w:color="{b_col}"/>
                <w:left w:val="single" w:sz="6" w:space="0" w:color="{b_col}"/>
                <w:bottom w:val="single" w:sz="6" w:space="0" w:color="{b_col}"/>
                <w:right w:val="single" w:sz="6" w:space="0" w:color="{b_col}"/>
            </w:tcBorders>
        ''')
    tc_pr.append(borders)

    for idx, text in enumerate(paragraphs_text):
        p = cell.paragraphs[0] if idx == 0 else cell.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(8 if idx < len(paragraphs_text) - 1 else 0)
        p.paragraph_format.line_spacing = line_spacing
        add_rich_runs(p, text, font_size=font_size, color=SECONDARY_COLOR)

    spacer = doc.add_paragraph()
    spacer.paragraph_format.space_before = Pt(0)
    spacer.paragraph_format.space_after = Pt(4)


def generate_document():
    doc = docx.Document()

    # Margin 0.8 inci agar konten muat rapi dalam ~2 halaman
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("Acer Smart School Awards 2026 | Video Testimoni Juara 3 Guru Kreatif SMP")
        hrun.font.name = "Calibri"
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = MUTED_COLOR

        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("Ach. Chanifuddin Fanani, S.Pd. — SMP Negeri 2 Lamongan")
        frun.font.name = "Calibri"
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = MUTED_COLOR

    # Kicker, Judul & Subjudul
    p_kicker = doc.add_paragraph()
    p_kicker.paragraph_format.space_before = Pt(0)
    p_kicker.paragraph_format.space_after = Pt(2)
    r_kicker = p_kicker.add_run("NASKAH VIDEO TESTIMONI PEMENANG ASSA 2026")
    r_kicker.bold = True
    r_kicker.font.name = "Calibri"
    r_kicker.font.size = Pt(9.5)
    r_kicker.font.color.rgb = PRIMARY_COLOR

    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(4)
    r_title = p_title.add_run("Script Video Testimoni — Juara 3 Kategori Guru Kreatif (Jenjang SMP)")
    r_title.bold = True
    r_title.font.name = "Calibri"
    r_title.font.size = Pt(16)
    r_title.font.color.rgb = SECONDARY_COLOR

    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(10)
    r_sub = p_sub.add_run("Inovasi “Menyelam ke Dalam Mesin Digital” · Format Portrait 9:16 (±1 Menit 30 Detik)")
    r_sub.italic = True
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(11)
    r_sub.font.color.rgb = MUTED_COLOR

    # Tabel Ringkasan Brief & Identitas
    brief_rows = [
        ("Nama Peserta", "Ach. Chanifuddin Fanani, S.Pd."),
        ("Satuan Pendidikan", "SMP Negeri 2 Lamongan, Jawa Timur"),
        ("Capaian & Kategori", "Juara 3 Acer Smart School Awards 2026 — Guru Kreatif (Jenjang SMP)"),
        ("Judul Karya Inovasi", "Menyelam ke Dalam Mesin Digital (MPI Sistem Komputer & Lab Maya)"),
        ("Spesifikasi Video", "Vertikal / Portrait (9:16) · Durasi ±1 menit 30 detik (±205 kata)"),
        ("Latar Belakang Video", "Di dalam kelas / lab komputer dengan suasana pembelajaran (tampilkan MPI / Lab Maya di layar IFP/PC)"),
        ("Jadwal Publikasi", "Instagram hari ini (26 November 2026) pukul 14.00–15.00 WIB · Wajib mention/tag @acerid"),
    ]
    t_brief = doc.add_table(rows=len(brief_rows), cols=2)
    t_brief.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_brief.autofit = False
    set_table_borders(t_brief, color="E5E7EB", sz="4")

    for idx, (label, val) in enumerate(brief_rows):
        row = t_brief.rows[idx]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(1.9)
        c1.width = Inches(4.9)
        set_cell_margins(c0, top=65, bottom=65, left=100, right=100)
        set_cell_margins(c1, top=65, bottom=65, left=100, right=100)
        if idx % 2 == 0:
            set_cell_background(c0, "F9FAFB")
            set_cell_background(c1, "F9FAFB")

        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(label)
        r0.bold = True
        r0.font.name = "Calibri"
        r0.font.size = Pt(9.5)
        r0.font.color.rgb = SECONDARY_COLOR

        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(val)
        r1.font.name = "Calibri"
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = SECONDARY_COLOR

    # Bagian 1 — Tabel Naskah & Arahan Visual (Storyboard)
    add_section_heading(doc, "1. Naskah & Arahan Visual (Storyboard)")

    storyboard = [
        (
            "**1. Pembukaan, Identitas & Pengumuman Pemenang**\n(00:00 – 00:18)",
            "Berdiri atau duduk tegap di depan/samping kelas atau lab komputer. Di latar belakang terlihat suasana kelas/murid belajar, atau layar IFP/monitor menampilkan halaman *MPI Sistem Komputer* / *Lab Maya*. Tersenyum hangat, tatap lensa.",
            "“Assalamu’alaikum warahmatullahi wabarakatuh. Halo Sobat Acer dan rekan pendidik se-Indonesia!\nSaya **Ach. Chanifuddin Fanani**, guru Informatika dari **SMP Negeri 2 Lamongan, Jawa Timur**.\nAlhamdulillah, saya sangat bersyukur dapat meraih **Juara 3 Acer Smart School Awards 2026 kategori Guru Kreatif jenjang SMP**.”"
        ),
        (
            "**2. Pengalaman & Inovasi Pembelajaran**\n(00:18 – 00:52)",
            "Bicara ekspresif dengan gestur tangan natural. *(Opsional jika sempat edit: sisipkan 1–2 klip B-roll singkat 3–4 detik saat murid mencoba simulator PC / Lab Maya di layar sentuh atau komputer lab).*",
            "“Inovasi yang saya kembangkan berjudul **‘Menyelam ke Dalam Mesin Digital’** — sebuah Media Pembelajaran Interaktif dan Laboratorium Maya perakitan komputer berbasis web yang saya rancang secara mandiri dengan memanfaatkan kecerdasan artifisial.\nBerawal dari tantangan nyata di kelas, di mana materi Sistem Komputer terasa abstrak dan perangkat praktikum terbatas, saya ingin murid bisa bebas bereksperimen merakit PC dan memecahkan masalah tanpa takut merusak alat.\nHasilnya luar biasa: murid jauh lebih antusias, berani mencoba, dan pemahaman konsep mereka meningkat signifikan.”"
        ),
        (
            "**3. Kesan & Pesan Mengikuti ASSA 2026**\n(00:52 – 01:15)",
            "Kembali ke kamera utama (*medium close-up*), nada tulus dan apresiatif.",
            "“Menjadi bagian dari **Acer Smart School Awards 2026** adalah pengalaman yang sangat berkesan. Ajang ini bukan sekadar kompetisi, tetapi ruang belajar dan refleksi bagi saya untuk terus bertumbuh bersama pendidik-pendidik inspiratif dari seluruh Indonesia.\nTerima kasih kepada **Acer Indonesia**, dewan juri, serta keluarga besar **SMP Negeri 2 Lamongan** atas dukungannya.”"
        ),
        (
            "**4. Harapan untuk Pendidikan Indonesia & Penutup**\n(01:15 – 01:35)",
            "Nada optimis, akhiri dengan senyum mantap dan gestur semangat saat kalimat penutup.",
            "“Harapan saya, semoga semakin banyak guru Indonesia yang berani berinovasi memanfaatkan teknologi dan AI sebagai kuas di tangan pendidik — untuk menghadirkan pembelajaran yang lebih visual, inklusif, dan bermakna bagi murid-murid kita.\nTerima kasih. Wassalamu’alaikum warahmatullahi wabarakatuh.\n**Guru Hebat, Indonesia Kuat!**”"
        ),
    ]

    t_sb = doc.add_table(rows=len(storyboard) + 1, cols=3)
    t_sb.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_sb.autofit = False
    set_table_borders(t_sb, color="D1D5DB", sz="4", include_vertical=True)

    col_widths = [Inches(1.4), Inches(2.0), Inches(3.4)]
    headers = ["Segmen & Waktu", "Arahan Visual & Ekspresi", "Naskah Bicara"]
    hdr_row = t_sb.rows[0]
    for i, h_text in enumerate(headers):
        cell = hdr_row.cells[i]
        cell.width = col_widths[i]
        set_cell_background(cell, "0A6C58")
        set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(h_text)
        r.bold = True
        r.font.name = "Calibri"
        r.font.size = Pt(9.5)
        r.font.color.rgb = RGBColor(255, 255, 255)

    for r_idx, (seg, vis, script) in enumerate(storyboard, start=1):
        row = t_sb.rows[r_idx]
        tr_pr = row._tr.get_or_add_trPr()
        tr_pr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))
        values = [seg, vis, script]
        for c_idx, val in enumerate(values):
            cell = row.cells[c_idx]
            cell.width = col_widths[c_idx]
            cell.vertical_alignment = WD_ALIGN_VERTICAL.TOP
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            if r_idx % 2 == 0:
                set_cell_background(cell, "F9FAFB")
            lines = val.split("\n")
            for l_idx, line in enumerate(lines):
                p = cell.paragraphs[0] if l_idx == 0 else cell.add_paragraph()
                p.paragraph_format.space_before = Pt(0)
                p.paragraph_format.space_after = Pt(4 if l_idx < len(lines) - 1 else 0)
                p.paragraph_format.line_spacing = 1.15
                color = MUTED_COLOR if c_idx == 1 else SECONDARY_COLOR
                add_rich_runs(p, line, font_size=9.5, color=color)

    # Halaman baru agar bagian Teleprompter, Checklist & Caption utuh
    doc.add_page_break()

    # Bagian 2 — Naskah Utuh Siap Baca (Mode Teleprompter)
    add_section_heading(doc, "2. Naskah Utuh Siap Baca (Mode Teleprompter)")
    teleprompter_paragraphs = [
        "Assalamu’alaikum warahmatullahi wabarakatuh. Halo Sobat Acer dan rekan pendidik se-Indonesia! Saya **Ach. Chanifuddin Fanani**, guru Informatika dari **SMP Negeri 2 Lamongan, Jawa Timur**. Alhamdulillah, saya sangat bersyukur dapat meraih **Juara 3 Acer Smart School Awards 2026 kategori Guru Kreatif jenjang SMP**.",
        "Inovasi yang saya kembangkan berjudul **‘Menyelam ke Dalam Mesin Digital’** — sebuah Media Pembelajaran Interaktif dan Laboratorium Maya perakitan komputer berbasis web yang saya rancang secara mandiri dengan memanfaatkan kecerdasan artifisial.",
        "Berawal dari tantangan nyata di kelas, di mana materi Sistem Komputer terasa abstrak dan perangkat praktikum terbatas, saya ingin murid bisa bebas bereksperimen merakit PC dan memecahkan masalah tanpa takut merusak alat. Hasilnya luar biasa: murid jauh lebih antusias, berani mencoba, dan pemahaman konsep mereka meningkat signifikan.",
        "Menjadi bagian dari **Acer Smart School Awards 2026** adalah pengalaman yang sangat berkesan. Ajang ini bukan sekadar kompetisi, tetapi ruang belajar dan refleksi bagi saya untuk terus bertumbuh bersama pendidik-pendidik inspiratif dari seluruh Indonesia. Terima kasih kepada **Acer Indonesia**, dewan juri, serta keluarga besar **SMP Negeri 2 Lamongan** atas dukungannya.",
        "Harapan saya, semoga semakin banyak guru Indonesia yang berani berinovasi memanfaatkan teknologi dan AI sebagai kuas di tangan pendidik — untuk menghadirkan pembelajaran yang lebih visual, inklusif, dan bermakna bagi murid-murid kita.",
        "Terima kasih. Wassalamu’alaikum warahmatullahi wabarakatuh. **Guru Hebat, Indonesia Kuat!**"
    ]
    add_styled_box(
        doc,
        teleprompter_paragraphs,
        bg_color="F0FDF4",
        border_left_color="0A6C58",
        font_size=12.5,
        line_spacing=1.35,
    )

    # Bagian 3 — Checklist Cepat Pengambilan Video
    add_section_heading(doc, "3. Checklist Cepat Pengambilan Video")
    checklist = [
        "**Orientasi & Framing:** Rekam **vertikal (9:16)**, posisikan kamera sejajar mata (*eye-level*), sisakan sedikit ruang di atas kepala.",
        "**Latar Belakang (Kategori Guru Kreatif):** Ambil di **dalam kelas atau lab komputer** saat ada suasana pembelajaran; nyalakan layar IFP/PC di belakang yang menampilkan MPI atau Lab Maya.",
        "**Cahaya & Suara:** Menghadap sumber cahaya/jendela (jangan membelakangi jendela). Gunakan clip-on mic atau earphone mic jika ada agar suara jernih dan vokal tidak tertutup suara latar.",
        "**Tips Cepat One-Take:** Letakkan HP atau laptop berisi naskah tepat di bawah lensa kamera agar tatapan mata tetap fokus ke audiens.",
    ]
    for item in checklist:
        p = doc.add_paragraph(style="List Bullet")
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.line_spacing = 1.15
        add_rich_runs(p, item, font_size=10, color=SECONDARY_COLOR)

    # Bagian 4 — Draft Caption Instagram (Siap Salin)
    add_section_heading(doc, "4. Draft Caption Instagram (Siap Salin — Upload 14.00–15.00 WIB)")
    caption_paragraphs = [
        "Alhamdulillah, sebuah kehormatan dan kebanggaan tersendiri dapat meraih Juara 3 Acer Smart School Awards 2026 kategori Guru Kreatif jenjang SMP! 🏆✨",
        "Melalui inovasi \"Menyelam ke Dalam Mesin Digital\" (Media Pembelajaran Interaktif & Laboratorium Maya perakitan komputer berbasis web), saya percaya keterbatasan fasilitas di kelas bukanlah penghalang, melainkan pemantik kreativitas untuk menghadirkan pengalaman belajar yang visual, interaktif, dan bebas risiko bagi murid.",
        "Terima kasih @acerid atas ruang apresiasi dan kolaborasi yang luar biasa bagi para pendidik Indonesia, serta terima kasih kepada keluarga besar SMP Negeri 2 Lamongan, rekan sejawat, dan seluruh murid hebat yang selalu menjadi sumber inspirasi.",
        "Mari terus berkarya dan memanfaatkan teknologi secara bermakna. Guru Hebat, Indonesia Kuat! 🚀🇮🇩",
        "@acerid\n#AcerSmartSchoolAwards2026 #ASSA2026 #GuruKreatif #AcerIndonesia #SMPN2Lamongan #InovasiPembelajaran #PendidikanIndonesia",
    ]
    add_styled_box(
        doc,
        caption_paragraphs,
        bg_color="F8FAFC",
        border_all_color="CBD5E1",
        font_size=10,
        line_spacing=1.2,
    )

    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(out_dir, "Script_Video_Testimoni_Juara3_ASSA2026.docx")
    doc.save(out_path)
    print(f"Generated: {out_path}")


if __name__ == "__main__":
    generate_document()
