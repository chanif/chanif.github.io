import fitz  # PyMuPDF
import sys

# Fix encoding for Windows console
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

output = []

for pdf_file in ["ref/Soal TK TIPE B.pdf", "ref/TIPE B FINPROV JSO 2026.pdf"]:
    output.append(f"\n{'='*80}")
    output.append(f"FILE: {pdf_file}")
    output.append(f"{'='*80}")
    doc = fitz.open(pdf_file)
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()
        output.append(f"\n--- PAGE {page_num + 1} ---")
        output.append(text)
    doc.close()

with open("extract_output.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(output))

print("Done! Output saved to extract_output.txt")
