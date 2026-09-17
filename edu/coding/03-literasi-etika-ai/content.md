# Literasi dan Etika Kecerdasan Artifisial

## Deskripsi
Elemen ketiga KKA yang memberikan pemahaman mendasar tentang bagaimana AI bekerja, jenis-jenisnya, bias yang mungkin terjadi, dan etika penggunaannya. Siswa belajar menjadi pengguna AI yang kritis dan bertanggung jawab.

## Capaian Pembelajaran (CP) — BSKAP No. 046/H/KR/2025
- Menjelaskan definisi, sejarah, dan cara kerja dasar AI
- Mengidentifikasi jenis-jenis AI dan penerapannya
- Memahami konsep machine learning dan cara mesin "belajar" dari data
- Menganalisis bias dan keadilan dalam sistem AI
- Mengenali deepfake dan misinformasi berbasis AI
- Menerapkan prinsip etika dalam penggunaan AI

---

## Daftar Sub-Materi

### 01. Apa Itu Kecerdasan Artifisial?
- **Tujuan Pembelajaran**: Siswa memahami definisi AI, sejarahnya, dan bagaimana AI hadir di kehidupan sehari-hari.
- **Materi Pokok**:
  - Definisi AI: mesin yang dapat melakukan tugas yang biasanya memerlukan kecerdasan manusia
  - Sejarah singkat AI:
    - 1950: Alan Turing — "Turing Test"
    - 1956: Dartmouth Conference — istilah "AI" pertama kali
    - 1997: Deep Blue mengalahkan Kasparov di catur
    - 2011: IBM Watson memenangkan Jeopardy!
    - 2016: AlphaGo mengalahkan juara Go
    - 2022: ChatGPT — revolusi generative AI
  - AI di kehidupan sehari-hari:
    - Asisten virtual: Siri, Google Assistant, Alexa
    - Rekomendasi: Netflix, YouTube, Spotify, TikTok
    - Navigasi: Google Maps (prediksi traffic)
    - Pengenalan wajah: Face ID, Instagram filter
    - Autocorrect dan predictive text
    - Spam filter email
    - Autonomous vehicles (mobil otonom)
  - AI vs kecerdasan manusia:
    - AI unggul: kecepatan, volume data, konsistensi
    - Manusia unggul: kreativitas, empati, common sense, adaptasi
  - AI bukan magic: AI = data + algoritma + komputasi
- **Aktivitas**:
  - [ ] Plugged: Eksplorasi 5 produk AI yang digunakan sehari-hari — analisis "apa yang AI lakukan di sini?"
  - [ ] Plugged: Coba Google Quick Draw (quickdraw.withgoogle.com) — AI menebak gambar kamu
  - [ ] Unplugged: Debat: "Apakah AI bisa menjadi sepenuhnya cerdas seperti manusia?"
- **Evaluasi / Quiz**:
  - [ ] Quiz: Definisi, sejarah, dan contoh AI (12 soal)
  - [ ] Essay: "Sebutkan 5 AI yang kamu gunakan hari ini dan jelaskan cara kerjanya secara sederhana"
- **Referensi & Link**:
  - Halaman interaktif: `01-apa-itu-kecerdasan-artifisial/index.html` (sudah ada)

### 02. Cara Kerja Machine Learning
- **Tujuan Pembelajaran**: Siswa memahami konsep dasar bagaimana mesin "belajar" dari data.
- **Materi Pokok**:
  - Apa itu Machine Learning? Sub-bidang AI di mana komputer belajar dari data
  - Analogi: belajar membedakan kucing dan anjing
    - Manusia: belajar dari contoh berulang-ulang
    - Mesin: sama — diberi ribuan foto, belajar pola
  - Jenis machine learning:
    - Supervised learning: belajar dari data yang sudah dilabeli
      - Contoh: email spam (berlabel spam/tidak spam)
      - Contoh: klasifikasi gambar (berlabel kucing/anjing)
    - Unsupervised learning: menemukan pola tanpa label
      - Contoh: segmentasi pelanggan
      - Contoh: clustering berita serupa
    - Reinforcement learning: belajar dari reward/punishment
      - Contoh: AI bermain game
      - Contoh: robot belajar berjalan
  - Proses machine learning:
    1. Kumpulkan data
    2. Bersihkan dan siapkan data
    3. Pilih model/algoritma
    4. Latih model (training)
    5. Evaluasi model (testing)
    6. Deploy model
  - Konsep penting:
    - Training data vs testing data
    - Overfitting: terlalu hafal training data
    - Underfitting: belum cukup belajar
    - Accuracy: seberapa sering model benar
  - Neural network (sangat dasar): terinspirasi dari otak manusia
- **Aktivitas**:
  - [ ] Plugged: Teachable Machine (teachablemachine.withgoogle.com) — latih model untuk mengenali gesture tangan
  - [ ] Plugged: Machine Learning for Kids (machinelearningforkids.co.uk) — buat classifier teks
  - [ ] Unplugged: "ML tanpa komputer" — siswa jadi classifier, belajar dari contoh yang diberikan guru
- **Evaluasi / Quiz**:
  - [ ] Quiz: Konsep ML, jenis, dan proses (10 soal)
  - [ ] Quiz: Identifikasi jenis ML yang tepat untuk skenario tertentu
- **Referensi & Link**:
  - Halaman interaktif: `02-cara-kerja-machine-learning/index.html` (sudah ada)

### 03. Jenis-Jenis AI
- **Tujuan Pembelajaran**: Siswa mengenal berbagai jenis dan kategori AI.
- **Materi Pokok**:
  - Berdasarkan kemampuan:
    - Narrow AI (ANI): AI untuk satu tugas spesifik (yang ada sekarang)
    - General AI (AGI): AI dengan kemampuan setara manusia (belum ada)
    - Super AI (ASI): AI yang melampaui kecerdasan manusia (teori)
  - Berdasarkan fungsi:
    - Reactive machines: hanya merespons, tanpa memori (contoh: Deep Blue)
    - Limited memory: bisa belajar dari data masa lalu (contoh: self-driving car)
    - Theory of mind: memahami emosi/niat manusia (belum tercapai)
    - Self-aware: kesadaran diri (fiksi ilmiah)
  - Cabang-cabang AI:
    - Computer Vision: AI "melihat" (pengenalan wajah, deteksi objek)
    - Natural Language Processing (NLP): AI "membaca dan menulis" (ChatGPT, Google Translate)
    - Speech Recognition: AI "mendengar" (speech-to-text, voice assistant)
    - Robotics: AI "bergerak" (robot industri, drone)
    - Generative AI: AI "berkreasi" (DALL-E, Midjourney, ChatGPT)
    - Recommendation Systems: AI "menyarankan" (Netflix, YouTube)
  - AI di berbagai industri:
    - Kesehatan: diagnosis penyakit, drug discovery
    - Pendidikan: adaptive learning, tutor AI
    - Pertanian: precision farming, drone penyemprot
    - Transportasi: self-driving, traffic optimization
    - Hiburan: game AI, deepfake, virtual influencer
- **Aktivitas**:
  - [ ] Plugged: Eksplorasi 5 jenis AI berbeda — coba demo online (Google Vision, ChatGPT, TTS)
  - [ ] Plugged: Buat mind map "AI di Berbagai Industri"
  - [ ] Unplugged: Klasifikasi 15 produk AI ke dalam kategori yang tepat
- **Evaluasi / Quiz**:
  - [ ] Quiz: Klasifikasi AI berdasarkan kemampuan dan fungsi (12 soal)
  - [ ] Quiz: Cocokkan cabang AI dengan contoh aplikasinya

### 04. Bias dan Keadilan dalam AI
- **Tujuan Pembelajaran**: Siswa memahami bahwa AI bisa berpihak (bias) dan pentingnya keadilan dalam sistem AI.
- **Materi Pokok**:
  - Apa itu bias AI? AI mencerminkan bias dalam data pelatihan
  - Contoh bias AI nyata:
    - Facial recognition yang kurang akurat untuk kulit gelap
    - AI rekrutmen Amazon yang bias terhadap perempuan
    - Chatbot yang menghasilkan konten rasis/seksist
    - Algoritma kredit yang merugikan minoritas
  - Sumber bias:
    - Data bias: data pelatihan tidak representatif
    - Algorithmic bias: desain algoritma yang bermasalah
    - Interaction bias: pengguna mengajarkan hal buruk ke AI
    - Confirmation bias: AI memperkuat prasangka yang sudah ada
  - Dampak bias AI:
    - Diskriminasi dalam pekerjaan, pinjaman, hukum
    - Memperkuat stereotip sosial
    - Erosi kepercayaan terhadap teknologi
  - Upaya keadilan (AI fairness):
    - Diversity dalam data training
    - Audit dan testing untuk bias
    - Transparency: jelaskan bagaimana AI membuat keputusan
    - Human-in-the-loop: manusia tetap terlibat dalam keputusan penting
    - Regulasi dan standar etika AI
  - Data privasi dan AI:
    - AI butuh banyak data — dari mana datanya?
    - Consent: apakah pengguna tahu datanya dipakai?
    - Data anonymization
- **Aktivitas**:
  - [ ] Plugged: Eksperimen bias — uji AI image generator dengan prompt yang berbeda ras/gender, bandingkan hasilnya
  - [ ] Plugged: Analisis dataset — identifikasi potensi bias (misal: data pelamar kerja)
  - [ ] Unplugged: Roleplay "AI Ethics Board" — review kasus bias AI, buat rekomendasi
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi jenis dan sumber bias (10 soal)
  - [ ] Essay: "Bagaimana cara membuat AI yang lebih adil?"
- **Referensi & Link**:
  - Halaman interaktif: `04-bias-dan-keadilan-ai/index.html` (sudah ada)

### 05. Deepfake dan Misinformasi AI
- **Tujuan Pembelajaran**: Siswa mampu mengenali konten deepfake dan memahami ancaman misinformasi berbasis AI.
- **Materi Pokok**:
  - Apa itu deepfake?
    - Video/audio/gambar palsu yang sangat realistis
    - Teknologi di baliknya: GAN (Generative Adversarial Network)
  - Jenis deepfake:
    - Face swap: mengganti wajah seseorang
    - Voice cloning: meniru suara seseorang
    - Lip sync: menyinkronkan bibir dengan audio baru
    - Full body deepfake
  - Contoh deepfake berbahaya:
    - Video politik palsu
    - Penipuan suara (voice phishing)
    - Pornografi deepfake (pelecehan)
    - Manipulasi bukti
  - Cara mendeteksi deepfake:
    - Perhatikan gerakan mata yang tidak natural
    - Batas wajah yang blur atau flickering
    - Pencahayaan dan bayangan yang tidak konsisten
    - Audio yang tidak sinkron sempurna
    - Tools: Deepware Scanner, InVID, FotoForensics
  - AI-generated text:
    - ChatGPT, Gemini, Claude — kemampuan dan keterbatasan
    - Hallucination: AI membuat fakta palsu yang terdengar meyakinkan
    - Cara mendeteksi: inkonsistensi, fakta yang tidak bisa diverifikasi
  - Hukum dan etika:
    - Banyak negara mulai meregulasi deepfake
    - Tanggung jawab platform vs pembuat
- **Aktivitas**:
  - [ ] Plugged: "Real or Fake?" — identifikasi 10 gambar/video, mana yang deepfake?
  - [ ] Plugged: Coba AI text detector — apakah teks ini ditulis AI?
  - [ ] Plugged: Buat deepfake sederhana yang tidak berbahaya (face filter, dll) — pahami prosesnya
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi deepfake dan teknik deteksi (10 soal)
  - [ ] Essay: "Apa bahaya deepfake untuk demokrasi dan bagaimana mencegahnya?"

### 06. Etika dan Tanggung Jawab AI
- **Tujuan Pembelajaran**: Siswa mampu menerapkan prinsip-prinsip etika dalam penggunaan dan pengembangan AI.
- **Materi Pokok**:
  - Prinsip-prinsip etika AI:
    - Transparency: AI harus bisa dijelaskan (explainable AI)
    - Fairness: AI tidak boleh diskriminatif
    - Accountability: ada yang bertanggung jawab atas keputusan AI
    - Privacy: data pengguna harus dilindungi
    - Safety: AI tidak boleh membahayakan manusia
    - Human oversight: manusia tetap punya kontrol
  - Penggunaan AI yang bertanggung jawab:
    - Untuk belajar: AI sebagai tutor, bukan pengganti belajar
    - Untuk bekerja: AI sebagai alat bantu, bukan pengganti thinking
    - Jangan klaim output AI sebagai karya sendiri (transparansi penggunaan AI)
    - Selalu verifikasi output AI
  - Dilema etika AI:
    - Trolley problem versi AI (mobil otonom: menabrak siapa?)
    - AI menggantikan pekerjaan: bagaimana nasib pekerja?
    - AI untuk surveillance: keamanan vs privasi
    - AI senjata otonom: bolehkah mesin membunuh?
  - Regulasi AI:
    - EU AI Act: regulasi AI pertama di dunia
    - Indonesia: kebijakan AI nasional
    - UNESCO: rekomendasi etika AI global
  - Masa depan AI dan manusia:
    - AI sebagai partner, bukan pengganti
    - Keterampilan yang tetap dibutuhkan di era AI: kreativitas, empati, critical thinking
    - Bagaimana mempersiapkan diri untuk era AI
- **Aktivitas**:
  - [ ] Unplugged: Diskusi ethical dilemma — diberikan 5 skenario, tentukan tindakan yang tepat
  - [ ] Plugged: Buat "AI Ethics Guidelines" untuk sekolah — aturan penggunaan AI
  - [ ] Plugged: Tulis esai argumentatif: "Haruskah AI diberikan hak?"
- **Evaluasi / Quiz**:
  - [ ] Quiz: Prinsip etika AI dan penerapannya (10 soal)
  - [ ] Proyek: Presentasi "Panduan Etis Penggunaan AI untuk Pelajar"
- **Referensi & Link**:
  - Halaman interaktif: `06-etika-tanggung-jawab-ai/index.html` (sudah ada)

### 07. AI dan Masa Depan Pekerjaan
- **Tujuan Pembelajaran**: Siswa memahami dampak AI terhadap dunia kerja dan cara mempersiapkan diri.
- **Materi Pokok**:
  - Pekerjaan yang terancam AI:
    - Data entry, kasir, customer service dasar
    - Sopir (autonomous vehicles)
    - Copywriter sederhana, translator dasar
  - Pekerjaan baru karena AI:
    - AI prompt engineer
    - Data labeler / annotator
    - AI trainer dan evaluator
    - AI ethics officer
    - Human-AI collaboration specialist
  - Pekerjaan yang sulit digantikan AI:
    - Pekerjaan yang butuh empati: psikolog, perawat, guru
    - Pekerjaan yang butuh kreativitas tinggi: seniman, penulis
    - Pekerjaan yang butuh keputusan etis kompleks: hakim, dokter
    - Pekerjaan fisik kompleks: tukang listrik, tukang pipa
  - Keterampilan abad 21 di era AI:
    - Critical thinking dan problem solving
    - Kreativitas dan inovasi
    - Kolaborasi dan komunikasi
    - Adaptabilitas dan lifelong learning
    - Literasi digital dan AI
  - Mempersiapkan diri:
    - Belajar bekerja DENGAN AI, bukan melawan AI
    - Fokus pada keterampilan yang melengkapi AI
    - Terus belajar dan beradaptasi
- **Aktivitas**:
  - [ ] Plugged: Riset 5 profesi — analisis seberapa besar kemungkinan tergantikan AI (gunakan willrobotstakemyjob.com)
  - [ ] Plugged: Coba kerjakan tugas menggunakan AI vs tanpa AI — bandingkan kualitas dan prosesnya
  - [ ] Unplugged: Desain "pekerjaan masa depan" yang belum ada saat ini
- **Evaluasi / Quiz**:
  - [ ] Quiz: Dampak AI terhadap dunia kerja (10 soal)
  - [ ] Proyek: Buat rencana karier pribadi di era AI — pekerjaan apa, keterampilan apa yang perlu dibangun
