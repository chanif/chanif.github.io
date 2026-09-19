# Assets Guide — Algorithm Kingdom 🏰
Gim Edukasi Informatika Fase D (SMP Kelas 7–9)
SMP Negeri 2 Lamongan — Festival Biru Putih 2026
Pengembang: **Ach. Chanifuddin Fanani, S.Pd.**

Dokumen ini berisi panduan seluruh kebutuhan aset visual (gambar, ikon, background, dan karakter) untuk gim **Algorithm Kingdom**. Jika ingin melakukan generate asset menggunakan AI Image Generator (seperti Midjourney, Leonardo.ai, Ideogram, atau DALL-E 3), gunakan prompt rekomendasi di bawah.

---

## 🎨 Art Style & Visual Guidelines
- **Gaya Visual**: Stylized 2.5D Fantasy Medieval / Kingdom Builder, clean isometric or flat-vector with subtle 3D shading, vibrant warm kingdom palette (Royal Gold `#F59E0B`, Deep Brown `#1A1210`, Crimson `#EF4444`, Emerald `#10B981`, Sapphire `#3B82F6`).
- **Tone**: Edukatif, ramah anak SMP (Fase D), engaging, seperti game strategi kerajaan casual (Kingdom Rush, Clash of Clans, Townscaper style).
- **Aspek Rasio**: 16:9 untuk game canvas landscape, 1:1 untuk ikon dan karakter portrait.

---

## 📁 Daftar Aset & Lokasi File

### 1. Logo & Identitas (Sudah Tersedia)
| File | Lokasi | Keterangan |
|------|--------|------------|
| `kemendikdasmen-lengkap.png` | `assets/kemendikdasmen-lengkap.png` | Logo resmi Kemendikdasmen RI |
| `sobat-bermutu-ramah.png` | `assets/sobat-bermutu-ramah.png` | Logo Sobat SMP / Sekolah Ramah Anak |
| `fanani.jpg` | `assets/fanani.jpg` | Foto Pengembang (Ach. Chanifuddin Fanani, S.Pd.) |

### 2. Bangunan Kerajaan (Reward Tiap Misi)
Aset ini muncul di Peta Kerajaan setelah pemain menyelesaikan misi:

#### A. Kastil Utama (Misi 1 — Sekuensial)
- **Path**: `assets/buildings/castle.png`
- **Fallback Saat Ini**: Emoji `🏰` dengan drop shadow & ambient glow
- **Prompt AI**:
  > *Isometric 2.5D cute medieval stone castle, grand towers with blue flags, wooden gate, warm cobblestone walls, whimsical fantasy kingdom game art, isolated on transparent background, vibrant colors, clean render, 3D casual game style --no ground --no background*

#### B. Menara Pelindung (Misi 2 — IF-ELSE / Kebijakan)
- **Path**: `assets/buildings/watchtower.png`
- **Fallback Saat Ini**: Emoji `🛡️` & `🗼`
- **Prompt AI**:
  > *Isometric cute fantasy defense watchtower, fortified stone base, archer deck, shield emblems on wall, glowing lantern, mobile strategy game asset, isolated on transparent background, clean 3D render*

#### C. Ladang Panen & Lumbung (Misi 3 — Perulangan / Loop)
- **Path**: `assets/buildings/granary-farm.png`
- **Fallback Saat Ini**: Emoji `🌾` & `🏪`
- **Prompt AI**:
  > *Isometric medieval golden wheat farm with a wooden windmill and grain storehouse, bundles of wheat, warm sunlight, cute cozy kingdom simulator style, transparent background*

#### D. Balai Dewan & Arsip Kerajaan (Misi 4 — Dekomposisi & Paralel)
- **Path**: `assets/buildings/council-hall.png`
- **Fallback Saat Ini**: Emoji `🏛️`
- **Prompt AI**:
  > *Isometric grand medieval council hall, marble pillars, royal banner, stained glass windows, scrolls and maps table inside, fantasy kingdom strategy asset, transparent background*

---

### 3. Karakter & Maskot

#### A. Sang Raja / Maskot Utama (Pemain)
- **Path**: `assets/characters/king-avatar.png`
- **Prompt AI**:
  > *Cute friendly young medieval king avatar, wearing a golden crown with jewels, royal crimson cape with golden embroidery, smiling warmly, approachable educational mascot style for middle school students, upper body portrait, transparent background*

#### B. Tiga Menteri Kerajaan (Misi 4: Krisis Kerajaan)
1. **Menteri Pengairan (Water / Flood Master)**:
   - **Path**: `assets/characters/minister-water.png`
   - **Prompt**: *Cute medieval royal civil engineer and hydro-master, holding a blueprint scroll and measuring compass, blue robes with water wave pattern, friendly chibi character, transparent background*
2. **Menteri Kesehatan (Health / Doctor)**:
   - **Path**: `assets/characters/minister-health.png`
   - **Prompt**: *Cute medieval royal herbalist physician, holding a pouch of healing herbs and potion bottle, green vest and clean white apron, cheerful anime chibi style, transparent background*
3. **Menteri Pertahanan (Defense / Knight Commander)**:
   - **Path**: `assets/characters/minister-defense.png`
   - **Prompt**: *Cute medieval royal knight commander in polished silver armor with gold trim, holding a kite shield, brave and reassuring expression, chibi game character, transparent background*

---

### 4. Background & Lanskap
- **Cover Page Background**: `assets/bg-kingdom-cover.jpg`
  - **Prompt**: *Epic panoramic fantasy medieval kingdom at sunrise, lush green hills, rolling rivers, distant majestic white castle on a mountain cliff, warm golden morning light, soft atmospheric depth, digital fantasy matte painting 16:9*
- **Kingdom Map Background**: `assets/bg-kingdom-map.jpg`
  - **Prompt**: *Top-down slightly tilted 2.5D parchment map of a vibrant medieval realm, showing river valleys, wheat fields, stone road connecting 4 regions, antique kingdom cartography meets modern mobile game UI, 16:9 ratio*

---

### 5. Rekomendasi Format & Optimalisasi
- Gunakan format **PNG dengan transparansi** (atau **WebP**) untuk karakter dan bangunan.
- Ukuran resolusi ideal:
  - Bangunan & Karakter: `512x512` px
  - Ikon & Badges: `256x256` px
  - Background landscape: `1920x1080` px (WebP kompresi ~80%)
- Semua elemen visual dalam game saat ini menggunakan fallback modern CSS glassmorphism, unicode glyphs, dan icon dinamis sehingga **tetap 100% playable, indah, dan interaktif** bahkan sebelum gambar eksternal diunggah.
