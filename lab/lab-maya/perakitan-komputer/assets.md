# 🔬 Dokumentasi & Panduan Aset Visual — Lab Perakitan Komputer

Dokumen resmi pencatatan aset visual AI-generated untuk pemenuhan **Ketentuan Juknis Festival Biru Putih 2026** (*"Aset AI-generated harus dituliskan keterangan + dokumen prompting"*).

---

## Informasi Umum Desain

- **Gaya Visual:** Clean Flat Tech Vector & Semi-Realistic Cyber-Lab, presisi teknis namun ramah edukasi SMP
- **Palet Warna:** Dark Cyber-Lab (Deep Navy `#0A0E17`, Neon Cyan `#00F0FF`, Neon Green `#10B981`, Purple `#8B5CF6`, Electric Gold `#F59E0B`)
- **Rasio Layar:** 16:9 Landscape (Sesuai Ketentuan Juknis Lomba)
- **Target Pengguna:** Peserta Didik SMP / Fase D (Kelas VII–IX) — Elemen Sistem Komputer (SK)

---

## 1. Background Utama Laboratorium Maya (16:9 Landscape)

- **File:** `assets/images/cyber-lab-bg.jpg`
- **Resolusi:** 1920×1080 (16:9)
- **Status:** Dirender via CSS Cyber-Lab Gradients & Canvas Patterns (Fallback gambar siap pasang)
- **Prompt:**
  ```text
  A futuristic computer science laboratory interior, dark navy blue and charcoal ambient lighting with subtle glowing cyan and electric purple circuit traces, clean high-tech workbench with dual monitors displaying system diagnostic telemetry, server racks with gentle blinking LEDs in the background, sleek glass panels, high quality digital illustration, cinematic depth of field, 16:9 aspect ratio, no human, clean educational aesthetic
  ```

---

## 2. Komponen Perangkat Keras Komputer (Simulasi Rakit PC)

### 2a. Motherboard (Papan Induk Top-Down View)
- **File:** `assets/images/components/motherboard.png`
- **Resolusi:** 1024×1024 (1:1) / SVG Blueprint
- **Prompt:**
  ```text
  Top-down overhead view of a modern computer motherboard, dark matte black PCB board with crisp white and cyan silk-screen circuit lines, central empty LGA CPU socket with lever, two DDR4/DDR5 RAM DIMM slots on the right, PCIe x16 expansion slot with release clip below, M.2 NVMe slot with small screw standoff, SATA data connectors on side, 24-pin ATX power socket, clean vector illustration, isolated on plain transparent background
  ```

### 2b. CPU (Central Processing Unit / Otak Komputer)
- **File:** `assets/images/components/cpu.png`
- **Resolusi:** 512×512 (1:1)
- **Prompt:**
  ```text
  Close-up angled view of a modern computer CPU processor chip, metallic silver integrated heat spreader (IHS) with subtle laser-etched microchip typography, golden corner triangle alignment indicator, dark green substrate base with microscopic golden contact pads, tech hardware product render, clean sharp lighting, isolated on transparent background
  ```

### 2c. RAM (Random Access Memory / Memori Kerja)
- **File:** `assets/images/components/ram.png`
- **Resolusi:** 512×512 (1:1)
- **Prompt:**
  ```text
  Modern desktop computer DDR4 RAM memory stick module, sleek black aluminum heat spreader with diagonal geometric vents, matte black PCB along bottom showing golden contact pins and distinct off-center alignment notch, memory chip silhouette, clean vector tech illustration, isolated on transparent background
  ```

### 2d. Storage SSD (Solid State Drive / Media Simpan)
- **File:** `assets/images/components/ssd.png`
- **Resolusi:** 512×512 (1:1)
- **Prompt:**
  ```text
  An M.2 NVMe solid state drive (SSD), slender compact rectangular printed circuit board, dark metallic finish heat sink plate with subtle circuit pattern, visible NAND flash memory chips and gold connector pins at one end, semi-circular mounting screw notch at the opposite end, sharp product rendering, isolated on transparent background
  ```

### 2e. GPU (VGA Card / Kartu Grafis)
- **File:** `assets/images/components/gpu.png`
- **Resolusi:** 512×512 (1:1)
- **Prompt:**
  ```text
  Modern dedicated desktop computer graphics card (GPU), dual cooling fans with sleek aerodynamic blades, dark charcoal shroud with glowing cyan accent stripe, rear silver metal PCIe expansion bracket with HDMI and DisplayPort output ports, gold-plated PCIe x16 bottom connector, clean isometric angle, isolated on transparent background
  ```

### 2f. PSU (Power Supply Unit / Catu Daya)
- **File:** `assets/images/components/psu.png`
- **Resolusi:** 512×512 (1:1)
- **Prompt:**
  ```text
  Desktop ATX computer power supply unit (PSU), robust matte black metallic enclosure box, honeycomb ventilation exhaust grille with rocker power switch and AC power socket, internal black cooling fan with metallic center badge, multi-colored braided modular power cables emerging neatly from side, clean 3D isometric vector, isolated on transparent background
  ```

---

## 3. Logo & Identitas Resmi

| Nama Berkas | Sumber / Keterangan | Lisensi |
|-------------|---------------------|---------|
| `assets/Logo Tutwuri Kemendikdasmen.png` | Kemendikdasmen RI Resmi | Domain Publik / Instansi |
| `assets/Logo-Sobat-SMP-2025.png` | Direktorat SMP Kemendikbudristek | Hak Cipta Kemendikdasmen |
| `assets/Logo Pendidikan Bermutu.png` | Gerakan Pendidikan Bermutu untuk Semua | Kemendikdasmen |
| `assets/Logo Ramah.png` | Program Sekolah Ramah Anak | Kemendikdasmen |
| `assets/fanani.jpg` | Foto Profil Pengembang (Ach. Chanifuddin Fanani, S.Pd.) | Pribadi (Hak Cipta Pengembang) |

---

## 4. Tipografi & Fon Lokal (Offline 100%)

Semua berkas fon disimpan secara lokal di `assets/fonts/` dengan format `.woff2` dan didefinisikan dalam `fonts.css`:
- **Fredoka (Semi-Bold & Bold):** Heading & nomor digit neon
- **Nunito (Regular & Bold):** Teks badan, instruksi prosedur, & deskripsi komponen
- **Poppins (Medium & Bold):** Label tombol, badge status, & navigasi lab
- **Monospace (Consolas / Courier New):** CRT Monitor POST Boot Sequence & Kode Biner
