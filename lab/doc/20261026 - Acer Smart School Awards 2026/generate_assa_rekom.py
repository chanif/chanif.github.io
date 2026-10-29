# -*- coding: utf-8 -*-
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def set_cell_margins(cell, top=100, bottom=100, left=120, right=120):
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

def generate_rekom():
    doc = docx.Document()
    
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # KOP SURAT
    p_kop1 = doc.add_paragraph()
    p_kop1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_kop1.paragraph_format.space_before = Pt(0)
    p_kop1.paragraph_format.space_after = Pt(1)
    r1 = p_kop1.add_run("PEMERINTAH KABUPATEN LAMONGAN\nDINAS PENDIDIKAN\n")
    r1.font.name = "Calibri"
    r1.font.size = Pt(12)
    r1.bold = True
    
    r2 = p_kop1.add_run("SMP NEGERI 2 LAMONGAN\n")
    r2.font.name = "Calibri"
    r2.font.size = Pt(15)
    r2.bold = True
    
    p_kop2 = doc.add_paragraph()
    p_kop2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_kop2.paragraph_format.space_before = Pt(0)
    p_kop2.paragraph_format.space_after = Pt(6)
    r3 = p_kop2.add_run("Jl. Veteran No. 3, Kel. Banjarmendalan, Kec. Lamongan, Kab. Lamongan, Jawa Timur 62212\nLaman: smpn2lamongan.sch.id | Surel: info@smpn2lamongan.sch.id")
    r3.font.name = "Calibri"
    r3.font.size = Pt(9)
    r3.font.italic = True
    r3.font.color.rgb = RGBColor(107, 114, 128)

    # Garis Pembatas Kop
    p_line = doc.add_paragraph()
    p_line.paragraph_format.space_before = Pt(0)
    p_line.paragraph_format.space_after = Pt(14)
    p_line_border = parse_xml(f'''
        <w:pBdr {nsdecls("w")}>
            <w:bottom w:val="double" w:sz="18" w:space="1" w:color="000000"/>
        </w:pBdr>
    ''')
    p_line._element.get_or_add_pPr().append(p_line_border)

    # JUDUL SURAT
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2)
    r_t = p_title.add_run("SURAT KETERANGAN AKTIF BERTUGAS DAN REKOMENDASI KEPALA SEKOLAH")
    r_t.font.name = "Calibri"
    r_t.font.size = Pt(12)
    r_t.bold = True
    r_t.underline = True

    p_no = doc.add_paragraph()
    p_no.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_no.paragraph_format.space_before = Pt(0)
    p_no.paragraph_format.space_after = Pt(14)
    r_n = p_no.add_run("Nomor: 800 /       / 413.101. SMP.02 / 2026")
    r_n.font.name = "Calibri"
    r_n.font.size = Pt(10.5)

    def add_p(text, bold_prefix=""):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.15
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        if bold_prefix:
            rb = p.add_run(bold_prefix)
            rb.font.name = "Calibri"
            rb.font.size = Pt(11)
            rb.bold = True
        r = p.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(11)
        return p

    add_p("Yang bertanda tangan di bawah ini:")

    # Data Kepala Sekolah
    t_ks = doc.add_table(rows=4, cols=2)
    t_ks.alignment = WD_TABLE_ALIGNMENT.CENTER
    ks_data = [
        ("Nama Lengkap", ": SUJARNO, S.Pd., M.Pd."),
        ("NIP", ": 19670320 199003 1 010"),
        ("Pangkat / Golongan", ": Pembina Utama Muda / IVc"),
        ("Jabatan", ": Kepala SMP Negeri 2 Lamongan")
    ]
    for idx, (k, v) in enumerate(ks_data):
        c0, c1 = t_ks.rows[idx].cells[0], t_ks.rows[idx].cells[1]
        c0.width = Inches(2.2); c1.width = Inches(4.3)
        set_cell_margins(c0, 40, 40, 80, 80); set_cell_margins(c1, 40, 40, 80, 80)
        p0 = c0.paragraphs[0]; p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(k); r0.font.name = "Calibri"; r0.font.size = Pt(10.5); r0.bold = True
        p1 = c1.paragraphs[0]; p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(v); r1.font.name = "Calibri"; r1.font.size = Pt(10.5)

    doc.add_paragraph().paragraph_format.space_after = Pt(4)
    add_p("Dengan ini menerangkan dengan sesungguhnya bahwa:")

    # Data Guru
    t_gr = doc.add_table(rows=5, cols=2)
    t_gr.alignment = WD_TABLE_ALIGNMENT.CENTER
    gr_data = [
        ("Nama Lengkap", ": ACH. CHANIFUDDIN FANANI, S.Pd."),
        ("NIP", ": 19910826 202012 1 007"),
        ("NUPTK", ": 9158 7696 7013 0183"),
        ("Pangkat / Golongan", ": Penata Muda / IX"),
        ("Jabatan / Tugas", ": Guru Mata Pelajaran Informatika (Kelas IX)")
    ]
    for idx, (k, v) in enumerate(gr_data):
        c0, c1 = t_gr.rows[idx].cells[0], t_gr.rows[idx].cells[1]
        c0.width = Inches(2.2); c1.width = Inches(4.3)
        set_cell_margins(c0, 40, 40, 80, 80); set_cell_margins(c1, 40, 40, 80, 80)
        p0 = c0.paragraphs[0]; p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(k); r0.font.name = "Calibri"; r0.font.size = Pt(10.5); r0.bold = True
        p1 = c1.paragraphs[0]; p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(v); r1.font.name = "Calibri"; r1.font.size = Pt(10.5)

    doc.add_paragraph().paragraph_format.space_after = Pt(4)
    add_p("Adalah benar-benar guru aktif yang bertugas di SMP Negeri 2 Lamongan dan telah mengimplementasikan karya inovasi pembelajaran berjudul:")

    # Kotak Judul Project
    p_box = doc.add_paragraph()
    p_box.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_box.paragraph_format.space_before = Pt(4)
    p_box.paragraph_format.space_after = Pt(6)
    r_box = p_box.add_run("“Menyelam ke Dalam Mesin Digital: Transformasi Pembelajaran Sistem Komputer Menjadi Pengalaman Imersif Bebas Risiko”")
    r_box.bold = True
    r_box.font.name = "Calibri"
    r_box.font.size = Pt(11)
    r_box.font.color.rgb = RGBColor(10, 108, 88)

    add_p("Karya inovasi tersebut secara nyata telah diterapkan dalam pembelajaran Informatika siswa kelas IX SMP Negeri 2 Lamongan pada Tahun Ajaran 2026/2027 dan terbukti memberikan dampak signifikan terhadap peningkatan pemahaman konsep serta keterampilan berpikir komputasional peserta didik.")
    add_p("Sehubungan dengan hal tersebut, pihak sekolah memberikan REKOMENDASI DAN DUKUNGAN PENUH kepada yang bersangkutan untuk berpartisipasi dalam:")

    p_lomba = doc.add_paragraph()
    p_lomba.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_lomba.paragraph_format.space_before = Pt(4)
    p_lomba.paragraph_format.space_after = Pt(8)
    r_lm = p_lomba.add_run("ACER SMART SCHOOL AWARDS 2026\nKategori: Guru Kreatif (Jenjang SMP / MTs)")
    r_lm.bold = True
    r_lm.font.name = "Calibri"
    r_lm.font.size = Pt(11.5)

    add_p("Demikian surat keterangan dan rekomendasi ini dibuat dengan sebenar-benarnya untuk digunakan sebagai kelengkapan berkas pendaftaran dan seleksi sebagaimana mestinya.")

    # Tanda Tangan
    doc.add_paragraph().paragraph_format.space_after = Pt(10)
    p_ttd = doc.add_paragraph()
    p_ttd.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_ttd.paragraph_format.space_after = Pt(45)
    r_ttd1 = p_ttd.add_run("Lamongan, 26 Oktober 2026\nKepala SMP Negeri 2 Lamongan,\n\n\n\n")
    r_ttd1.font.name = "Calibri"
    r_ttd1.font.size = Pt(10.5)

    p_ks_name = doc.add_paragraph()
    p_ks_name.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_ks_name.paragraph_format.space_after = Pt(0)
    r_ks_n = p_ks_name.add_run("SUJARNO, S.Pd., M.Pd.\n")
    r_ks_n.bold = True
    r_ks_n.underline = True
    r_ks_n.font.name = "Calibri"
    r_ks_n.font.size = Pt(11)
    
    r_ks_nip = p_ks_name.add_run("Pembina Utama Muda / IVc\nNIP. 19670320 199003 1 010")
    r_ks_nip.font.name = "Calibri"
    r_ks_nip.font.size = Pt(9.5)
    r_ks_nip.font.color.rgb = RGBColor(107, 114, 128)

    out_path = r"d:\Belajar\vibecoding\chanif.github.io\lab\doc\20261026 - Acer Smart School Awards 2026\Surat Rekomendasi Kepala Sekolah - ASSA 2026.docx"
    doc.save(out_path)
    print("Surat Rekomendasi saved successfully to:", out_path)

if __name__ == "__main__":
    generate_rekom()
