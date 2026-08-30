# Pemanfaatan dan Pengembangan Kecerdasan Artifisial

## Deskripsi
Elemen keempat KKA yang fokus pada praktik langsung: menggunakan tools AI untuk menyelesaikan masalah nyata, bereksperimen dengan generative AI, melatih model AI sederhana, dan merancang solusi berbasis AI. Siswa menjadi pengguna AI yang aktif dan produktif.

## Capaian Pembelajaran (CP) — BSKAP No. 046/H/KR/2025
- Menggunakan generative AI untuk berbagai tugas kreatif dan produktif
- Menerapkan teknik prompt engineering yang efektif
- Memanfaatkan AI untuk menghasilkan teks, gambar, dan multimedia
- Melatih model AI sederhana menggunakan platform visual (Teachable Machine)
- Merancang dan mengimplementasikan solusi berbasis AI untuk masalah nyata

---

## Daftar Sub-Materi

### 01. Mengenal Generative AI
- **Tujuan Pembelajaran**: Siswa memahami apa itu generative AI, cara kerjanya, dan perbedaannya dengan AI klasik.
- **Materi Pokok**:
  - Apa itu Generative AI?
    - AI yang bisa MEMBUAT konten baru (teks, gambar, audio, video, kode)
    - Beda dengan AI klasik: klasik = klasifikasi/prediksi, generative = kreasi
  - Cara kerja (konsep sederhana):
    - Large Language Models (LLM): dilatih dari triliunan kata di internet
    - Diffusion models: untuk gambar (dari noise → gambar)
    - Token-based generation: memprediksi kata berikutnya
  - Platform Generative AI populer:
    - Teks: ChatGPT, Gemini, Claude, Copilot
    - Gambar: DALL-E, Midjourney, Stable Diffusion, Canva AI
    - Audio: ElevenLabs, Suno AI
    - Video: Runway, Pika, Sora
    - Kode: GitHub Copilot, Cursor
  - Kemampuan dan keterbatasan:
    - Bisa: menulis esai, membuat gambar, menerjemahkan, coding
    - Tidak bisa: berpikir, memahami, memiliki opini, menjamin kebenaran
    - Hallucination: AI bisa "mengarang" informasi yang tidak benar
  - Generative AI ≠ copy-paste: AI sebagai starting point, bukan hasil akhir
- **Aktivitas**:
  - [ ] Plugged: Eksplorasi 3 platform generative AI berbeda — buat konten dengan masing-masing
  - [ ] Plugged: Bandingkan hasil dari ChatGPT vs Gemini untuk pertanyaan yang sama
  - [ ] Plugged: Identifikasi hallucination — minta AI tentang topik yang kamu kuasai, cek kebenarannya
- **Evaluasi / Quiz**:
  - [ ] Quiz: Konsep generative AI, kemampuan, dan keterbatasan (10 soal)
  - [ ] Essay: "Generative AI mengubah cara kita berkreasi — setuju atau tidak? Jelaskan."
- **Referensi & Link**:
  - Halaman interaktif: `01-mengenal-generative-ai/index.html` (sudah ada)

### 02. Prompt Engineering
- **Tujuan Pembelajaran**: Siswa mampu menyusun prompt yang efektif untuk mendapatkan output AI yang berkualitas.
- **Materi Pokok**:
  - Apa itu prompt? Instruksi yang kita berikan ke AI
  - Mengapa prompt penting? "Garbage in, garbage out"
  - Anatomi prompt yang baik:
    - Jelas dan spesifik (bukan ambigu)
    - Berikan konteks yang cukup
    - Tentukan format output yang diinginkan
    - Berikan contoh (few-shot prompting)
  - Teknik prompt engineering:
    - Zero-shot: langsung bertanya tanpa contoh
    - Few-shot: berikan beberapa contoh terlebih dahulu
    - Chain-of-thought: minta AI berpikir step-by-step
    - Role prompting: "Kamu adalah seorang guru fisika SMP..."
    - Constraint prompting: "Jawab dalam 3 poin, masing-masing max 2 kalimat"
    - Iterative refinement: perbaiki prompt berdasarkan hasil sebelumnya
  - Prompt untuk berbagai kebutuhan:
    - Menulis: "Buatkan esai argumentatif tentang... dengan struktur..."
    - Coding: "Buat fungsi Python yang... dengan error handling..."
    - Analisis: "Analisis data berikut... fokus pada tren..."
    - Kreatif: "Buat cerita pendek bergenre... dengan karakter..."
    - Belajar: "Jelaskan konsep... seolah-olah kepada anak usia 12 tahun"
  - Prompt yang harus dihindari:
    - Terlalu singkat: "jelaskan AI"
    - Terlalu panjang dan bertumpuk
    - Ambigu: bisa diartikan banyak hal
  - Evaluasi output AI:
    - Cek fakta: verifikasi informasi penting
    - Cek bias: apakah ada sudut pandang yang hilang?
    - Cek relevansi: apakah menjawab pertanyaan?
    - Cek kualitas: apakah bahasa dan logikanya baik?
- **Aktivitas**:
  - [ ] Plugged: "Prompt Battle" — siswa berlomba membuat prompt terbaik untuk tugas yang sama
  - [ ] Plugged: Iterasi prompt: mulai dari prompt sederhana, perbaiki 5 kali, bandingkan hasilnya
  - [ ] Plugged: Buat "prompt library" — kumpulan prompt efektif untuk berbagai kebutuhan belajar
  - [ ] Plugged: Eksperimen role prompting — bandingkan jawaban AI sebagai "guru", "teman", dan "ilmuwan"
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi prompt yang baik vs buruk (10 soal)
  - [ ] Praktik: Diberikan tugas, buat prompt terbaik dan evaluasi hasilnya
  - [ ] Proyek: Buat "Prompt Playbook" — panduan prompt engineering untuk pelajar
- **Referensi & Link**:
  - Halaman interaktif: `02-prompt-engineering/index.html` (sudah ada)

### 03. AI untuk Teks dan Tulisan
- **Tujuan Pembelajaran**: Siswa mampu memanfaatkan AI untuk membantu proses menulis secara produktif dan etis.
- **Materi Pokok**:
  - AI sebagai asisten menulis (bukan pengganti!):
    - Brainstorming ide dan outline
    - Drafting dan ekspansi tulisan
    - Editing: grammar, style, tone
    - Summarization: meringkas teks panjang
    - Terjemahan dan lokalisasi
  - Tools AI untuk menulis:
    - ChatGPT / Gemini: general purpose
    - Grammarly: grammar dan style check
    - QuillBot: parafrase
    - DeepL: terjemahan berkualitas tinggi
    - NotebookLM: analisis dokumen
  - Workflow menulis dengan AI:
    1. Brainstorm: minta AI bantu ideasi
    2. Outline: minta AI buat kerangka tulisan
    3. Draft: tulis sendiri, minta AI review
    4. Edit: gunakan AI untuk cek grammar dan flow
    5. Finalize: sentuhan akhir oleh manusia
  - Etika menulis dengan AI:
    - Transparansi: akui penggunaan AI jika diperlukan
    - Tidak 100% copy output AI
    - Verifikasi fakta yang dihasilkan AI
    - Tambahkan pemikiran dan sudut pandang sendiri
  - AI untuk bahasa Indonesia:
    - Kemampuan dan keterbatasan AI dalam bahasa Indonesia
    - Koreksi tata bahasa Indonesia
    - Pembuatan konten dalam bahasa Indonesia
- **Aktivitas**:
  - [ ] Plugged: Gunakan AI untuk brainstorm topik esai, buat outline, lalu tulis sendiri
  - [ ] Plugged: "AI Editor" — tulis esai, lalu minta AI review dan perbaiki
  - [ ] Plugged: Bandingkan terjemahan Google Translate vs DeepL vs AI generatif
  - [ ] Plugged: Ringkas artikel 1000 kata menjadi 200 kata menggunakan AI, evaluasi kualitasnya
- **Evaluasi / Quiz**:
  - [ ] Quiz: Etika dan best practices menulis dengan AI (8 soal)
  - [ ] Praktik: Tulis esai dengan AI-assisted workflow, dokumentasikan prosesnya
  - [ ] Proyek: Buat "Before & After" — tulisan original vs setelah AI-assisted editing

### 04. AI untuk Gambar dan Multimedia
- **Tujuan Pembelajaran**: Siswa mampu menggunakan AI untuk membuat dan mengedit konten visual dan multimedia.
- **Materi Pokok**:
  - AI image generation:
    - Cara kerja (konsep): text-to-image, teks → gambar
    - Platform: DALL-E (ChatGPT), Midjourney, Stable Diffusion, Canva AI, Bing Image Creator
    - Prompt untuk gambar: deskripsi detail (subjek, gaya, pencahayaan, komposisi)
    - Style modifiers: "in the style of watercolor", "photorealistic", "pixel art"
  - AI image editing:
    - Inpainting: menghapus/menambah objek di gambar
    - Outpainting: memperluas gambar
    - Style transfer: mengubah gaya gambar
    - Background removal: menghapus background otomatis (remove.bg)
    - Upscaling: meningkatkan resolusi gambar
  - AI untuk audio:
    - Text-to-speech (TTS): teks → suara natural
    - Speech-to-text (STT): suara → teks
    - AI music generation: Suno, AIVA
    - Noise removal: menghilangkan noise dari audio
  - AI untuk video:
    - Text-to-video (konsep): masih dalam tahap awal
    - AI video editing: auto-subtitle, scene detection
    - AI avatar: virtual presenter (HeyGen, Synthesia)
  - Hak cipta konten AI:
    - Siapa pemilik gambar yang dibuat AI? Masih diperdebatkan
    - Tidak boleh digunakan untuk menipu/deepfake
    - Platform masing-masing punya kebijakan berbeda
- **Aktivitas**:
  - [ ] Plugged: Buat 5 gambar berbeda menggunakan AI dengan prompt yang semakin detail
  - [ ] Plugged: "Style Transfer" — ubah foto biasa menjadi gaya lukisan, anime, pixel art
  - [ ] Plugged: Buat podcast singkat menggunakan AI TTS — teks → suara natural
  - [ ] Plugged: Eksperimen Canva AI — buat desain poster dengan AI assistant
- **Evaluasi / Quiz**:
  - [ ] Quiz: Teknik prompt untuk image generation (8 soal)
  - [ ] Proyek: Buat karya multimedia yang menggabungkan AI text + image + audio
- **Referensi & Link**:
  - Halaman interaktif: `04-ai-untuk-gambar-dan-multimedia/index.html` (sudah ada)

### 05. AI sebagai Asisten Belajar
- **Tujuan Pembelajaran**: Siswa mampu memanfaatkan AI sebagai tutor personal untuk meningkatkan proses belajar.
- **Materi Pokok**:
  - AI tutor personal:
    - Bertanya apapun, kapanpun — tanpa malu
    - Meminta penjelasan ulang dengan cara berbeda
    - Menyesuaikan tingkat kesulitan
  - Strategi belajar dengan AI:
    - "Jelaskan seperti saya usia 10 tahun"
    - "Berikan 5 contoh soal tentang [topik] dari mudah ke sulit"
    - "Apa analogi yang bagus untuk memahami [konsep]?"
    - "Saya salah menjawab [ini], jelaskan mengapa jawaban benarnya [itu]"
    - "Buatkan flashcard dari materi berikut"
    - "Quiz saya tentang [topik], 10 soal pilihan ganda"
  - Teknik Feynman + AI:
    1. Pelajari konsep
    2. Jelaskan ke AI dengan kata-kata sendiri
    3. Minta AI mengidentifikasi kesalahpahaman
    4. Perbaiki pemahaman dan ulangi
  - AI untuk mata pelajaran lain:
    - Matematika: step-by-step problem solving
    - Bahasa: latihan percakapan, koreksi grammar
    - Sains: simulasi eksperimen, penjelasan konsep
    - Sejarah: timeline, analisis peristiwa
    - Seni: referensi, teknik, inspirasi
  - Batasan: AI bukan pengganti guru dan proses belajar
    - Jangan 100% bergantung pada AI
    - Tetap berpikir sendiri
    - Verifikasi jawaban AI
- **Aktivitas**:
  - [ ] Plugged: Gunakan AI untuk mempelajari topik yang sulit — dokumentasikan prompt dan hasilnya
  - [ ] Plugged: "AI Quiz Master" — minta AI buat kuis dari materi yang sudah dipelajari
  - [ ] Plugged: Teknik Feynman — jelaskan konsep ke AI, minta feedback
  - [ ] Plugged: Buat study plan dengan bantuan AI untuk persiapan ujian
- **Evaluasi / Quiz**:
  - [ ] Quiz: Strategi efektif belajar dengan AI (8 soal)
  - [ ] Proyek: Buat "AI Study Guide" untuk satu mata pelajaran pilihan
- **Referensi & Link**:
  - Halaman interaktif: `05-ai-asisten-belajar/index.html` (sudah ada)

### 06. Teachable Machine — Latih Model AI Sendiri
- **Tujuan Pembelajaran**: Siswa mampu melatih model machine learning sederhana menggunakan platform visual tanpa coding.
- **Materi Pokok**:
  - Google Teachable Machine (teachablemachine.withgoogle.com):
    - Platform gratis, tanpa coding, berbasis browser
    - 3 jenis model: image, audio, pose
  - Melatih image classifier:
    1. Kumpulkan data: foto dari webcam (min. 50 per kelas)
    2. Labeli data: beri nama kelas (misal: "batu", "kertas", "gunting")
    3. Train: klik tombol train — model belajar dari data
    4. Test: uji model dengan gambar baru
    5. Export: download atau deploy model
  - Melatih audio classifier:
    - Rekam sample audio per kelas
    - Contoh: deteksi tepuk tangan vs snap vs diam
  - Melatih pose classifier:
    - Rekam pose tubuh per kelas
    - Contoh: berdiri vs duduk vs melambai
  - Konsep yang dipelajari:
    - Training data vs testing data
    - Overfitting: model terlalu hafal training data
    - Underfitting: data kurang → model buruk
    - Accuracy: persentase prediksi benar
    - Confidence: seberapa yakin model
  - Tips untuk hasil yang baik:
    - Gunakan banyak data (50+ per kelas)
    - Variasi kondisi: pencahayaan, angle, jarak
    - Background yang konsisten atau beragam (tergantung tujuan)
    - Jumlah data per kelas sebaiknya seimbang
- **Aktivitas**:
  - [ ] Plugged: Latih model "Batu Kertas Gunting" — uji dengan teman sekelas
  - [ ] Plugged: Latih model pengenalan emosi wajah (senang, sedih, terkejut)
  - [ ] Plugged: Latih model suara: tepuk vs snap vs siulan
  - [ ] Plugged: Eksperimen: apa yang terjadi jika training data hanya 5 gambar? Bandingkan dengan 100 gambar
- **Evaluasi / Quiz**:
  - [ ] Quiz: Proses training model dan konsep ML (10 soal)
  - [ ] Proyek: Latih model AI untuk menyelesaikan masalah nyata di sekolah
- **Referensi & Link**:
  - Halaman interaktif: `06-teachable-machine/index.html` (sudah ada)

### 07. Proyek Image Classifier
- **Tujuan Pembelajaran**: Siswa membuat proyek klasifikasi gambar end-to-end.
- **Materi Pokok**:
  - Panduan proyek klasifikasi gambar:
    1. Tentukan masalah (apa yang ingin dikenali?)
    2. Kumpulkan dataset (min. 100 gambar per kelas)
    3. Preprocessing: resize, augmentasi sederhana
    4. Training: latih model di Teachable Machine
    5. Testing dan evaluasi: accuracy, confusion matrix (konsep)
    6. Deployment: embed di halaman web atau app
  - Contoh proyek:
    - Pengenalan jenis sampah (organik vs anorganik)
    - Pengenalan huruf isyarat (BISINDO)
    - Pengenalan jenis daun tanaman
    - Deteksi penggunaan masker
    - Pengenalan jenis hewan peliharaan
  - Integrasi model ke halaman web:
    - Export model dari Teachable Machine
    - Embed menggunakan TensorFlow.js
    - Buat UI sederhana dengan HTML/CSS/JS
  - Presentasi proyek: demo live + penjelasan teknis
- **Aktivitas**:
  - [ ] Proyek kelompok (2-3 minggu)
  - [ ] Milestone: proposal → data collection → training → testing → deployment → presentasi
- **Evaluasi / Quiz**:
  - [ ] Penilaian proyek (akurasi model: 25%, kualitas data: 20%, UI: 20%, presentasi: 20%, dokumentasi: 15%)
  - [ ] Demo day dan peer review
- **Referensi & Link**:
  - Halaman interaktif: `07-proyek-image-classifier/index.html` (sudah ada)

### 08. Merancang Solusi Berbasis AI
- **Tujuan Pembelajaran**: Siswa mampu merancang dan mengimplementasikan solusi berbasis AI untuk masalah nyata.
- **Materi Pokok**:
  - Design thinking untuk solusi AI:
    1. Empathize: pahami masalah dari sudut pandang pengguna
    2. Define: definisikan masalah secara spesifik
    3. Ideate: brainstorm solusi berbasis AI
    4. Prototype: buat MVP (Minimum Viable Product)
    5. Test: uji dengan pengguna nyata
  - Pertanyaan kunci sebelum menggunakan AI:
    - Apakah masalah ini PERLU AI? (tidak semua masalah butuh AI)
    - Data apa yang tersedia?
    - Apa risiko jika AI salah prediksi?
    - Apakah ada solusi non-AI yang lebih sederhana?
  - Framework solusi AI:
    - Input: data apa yang masuk?
    - Process: model AI apa yang digunakan?
    - Output: apa yang dihasilkan?
    - Feedback: bagaimana memperbaiki model?
  - Proyek akhir integratif:
    - Gabungkan semua yang dipelajari: BK + literasi digital + etika AI + tools AI
    - Buat solusi nyata yang bermanfaat
  - Contoh proyek:
    - "Study Buddy AI": chatbot yang membantu belajar mata pelajaran tertentu
    - "EcoSort": classifier sampah untuk kantin sekolah
    - "MoodTracker": deteksi emosi untuk konseling
    - "SmartNotes": summarizer materi pelajaran
    - "SafeChat": filter konten negatif di grup kelas
  - Pitch dan presentasi: cara menjual ide
- **Aktivitas**:
  - [ ] Proyek akhir besar (4-6 minggu)
  - [ ] Milestone: empathize → define → ideate → prototype → test → pitch
  - [ ] Mentoring session dengan guru
- **Evaluasi / Quiz**:
  - [ ] Penilaian proyek (inovasi: 25%, teknis: 25%, dampak sosial: 20%, presentasi: 15%, dokumentasi: 15%)
  - [ ] Demo day: presentasi di depan kelas/sekolah
  - [ ] Refleksi akhir: "Apa yang saya pelajari tentang AI dan bagaimana saya akan menggunakannya di masa depan?"
- **Referensi & Link**:
  - Halaman interaktif: `08-merancang-solusi-berbasis-ai/index.html` (sudah ada)
