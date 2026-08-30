# Koding Kreatif Lanjutan

## Deskripsi
Modul ekstensi untuk siswa yang ingin memperdalam koding dan AI ke level lanjutan. Materi mencakup Python untuk machine learning, NLP, computer vision, pembuatan chatbot, robotika simulasi, dan proyek capstone. Bersifat opsional untuk siswa berprestasi atau yang berminat melanjutkan ke jenjang SMA/universitas di bidang CS/AI.

## Capaian Pembelajaran (CP)
- Menerapkan Python untuk machine learning dasar
- Memahami konsep Natural Language Processing
- Memahami konsep Computer Vision dan penerapannya
- Membuat chatbot sederhana berbasis AI
- Memahami konsep robotika dan simulasi
- Melaksanakan proyek capstone AI yang integratif

---

## Daftar Sub-Materi

### 01. Python untuk Machine Learning
- **Tujuan Pembelajaran**: Siswa mampu menggunakan library Python untuk membuat model ML sederhana.
- **Materi Pokok**:
  - Review Python essentials: list, dict, function, loop
  - Library penting:
    - NumPy: array dan operasi matematika
      - np.array(), np.mean(), np.std()
      - Array operations: reshape, slicing
    - Pandas: manipulasi data tabular
      - DataFrame: membuat, membaca CSV, mengakses data
      - df.head(), df.describe(), df.info()
      - Filtering, sorting, grouping
    - Matplotlib: visualisasi data
      - plt.plot(), plt.bar(), plt.scatter(), plt.pie()
      - Labels, titles, legends
      - plt.savefig()
  - Scikit-learn (pengenalan):
    - Workflow: load data → split → train → predict → evaluate
    - Classification: Decision Tree, KNN (konsep)
    - Regression: Linear Regression (konsep)
    - Train/test split: dari sklearn.model_selection
    - Accuracy score
  - Mini project: prediksi sederhana
    - Prediksi jenis iris flower (dataset klasik)
    - Prediksi harga rumah (linear regression sederhana)
- **Aktivitas**:
  - [ ] Plugged: Tutorial NumPy dan Pandas di Google Colab
  - [ ] Plugged: Analisis dataset Titanic — siapa yang survive? (Pandas + Matplotlib)
  - [ ] Plugged: Buat model klasifikasi Iris dengan scikit-learn
- **Evaluasi / Quiz**:
  - [ ] Quiz: Syntax NumPy, Pandas, Matplotlib (12 soal)
  - [ ] Proyek: Buat model ML untuk prediksi sederhana dari dataset pilihan

### 02. Natural Language Processing (NLP)
- **Tujuan Pembelajaran**: Siswa memahami bagaimana komputer memproses bahasa manusia.
- **Materi Pokok**:
  - Apa itu NLP? AI yang memahami bahasa manusia
  - Teknik NLP dasar:
    - Tokenization: memecah teks jadi kata/kalimat
    - Stop words removal: menghilangkan kata umum (dan, yang, di)
    - Stemming/lemmatization: mengembalikan kata ke bentuk dasar
    - Bag of Words: representasi teks sebagai frekuensi kata
    - TF-IDF: mengukur pentingnya kata dalam dokumen
  - Aplikasi NLP:
    - Sentiment analysis: positif, negatif, netral
    - Text classification: spam detection, topic categorization
    - Named Entity Recognition (NER): mengenali nama, lokasi, tanggal
    - Machine translation: Google Translate
    - Text summarization: meringkas dokumen
    - Chatbot: percakapan berbasis AI
  - NLP di Python (pengenalan):
    - NLTK library: tokenize, stopwords
    - Sentiment analysis sederhana
  - Large Language Models:
    - GPT, BERT, LLaMA — cara kerja (sangat sederhana)
    - Kenapa LLM bisa "menulis"? Token prediction
    - Batasan: hallucination, bias, cutoff date
- **Aktivitas**:
  - [ ] Plugged: Sentiment analysis — analisis review produk (positif/negatif) menggunakan Python
  - [ ] Plugged: Word cloud generator — visualisasi kata populer dalam teks
  - [ ] Plugged: Eksperimen prompt → analisis bagaimana LLM merespons prompt berbeda
- **Evaluasi / Quiz**:
  - [ ] Quiz: Konsep NLP dan teknik dasar (10 soal)
  - [ ] Proyek: Buat sentiment analyzer untuk review di media sosial

### 03. Computer Vision (OpenCV)
- **Tujuan Pembelajaran**: Siswa memahami bagaimana komputer "melihat" dan memproses gambar.
- **Materi Pokok**:
  - Apa itu Computer Vision? AI yang memproses visual
  - Gambar digital di mata komputer:
    - Pixel: elemen terkecil
    - Channel: grayscale (1), RGB (3), RGBA (4)
    - Resolusi: width × height
  - OpenCV (cv2) basics:
    - cv2.imread(): membaca gambar
    - cv2.imshow(): menampilkan gambar
    - cv2.cvtColor(): konversi warna (BGR → RGB, grayscale)
    - cv2.resize(): mengubah ukuran
    - cv2.blur(), cv2.GaussianBlur(): smoothing
    - cv2.Canny(): deteksi tepi (edge detection)
    - cv2.threshold(): binarisasi gambar
  - Face detection:
    - Haar Cascade classifier
    - cv2.CascadeClassifier()
    - Mendeteksi wajah di foto dan webcam
  - Object detection (konsep):
    - YOLO, SSD — mengenali objek dalam gambar
    - Bounding box dan confidence score
  - Aplikasi computer vision:
    - Face unlock di HP
    - OCR: teks dari gambar (Google Lens)
    - Self-driving car: mengenali jalan, rambu, pejalan kaki
    - Pengawasan CCTV cerdas
    - AR filter (Instagram, Snapchat)
- **Aktivitas**:
  - [ ] Plugged: Buat program yang membaca gambar dan menerapkan 5 filter berbeda
  - [ ] Plugged: Buat face detector dari webcam menggunakan Haar Cascade
  - [ ] Plugged: Buat program penghitung objek dalam gambar (contoh: menghitung koin)
- **Evaluasi / Quiz**:
  - [ ] Quiz: Konsep CV dan operasi OpenCV (10 soal)
  - [ ] Proyek: Buat aplikasi CV yang bermanfaat (face counter, color detector, dll)

### 04. Chatbot AI
- **Tujuan Pembelajaran**: Siswa mampu membuat chatbot sederhana berbasis aturan dan AI.
- **Materi Pokok**:
  - Jenis chatbot:
    - Rule-based: if-else, keyword matching
    - ML-based: belajar dari data percakapan
    - LLM-based: menggunakan API GPT/Gemini
  - Chatbot rule-based (Python):
    - Dictionary of responses
    - Keyword matching: if "halo" in user_input
    - Pattern matching sederhana
    - Context/state management dasar
  - Chatbot dengan API AI (konsep):
    - OpenAI API / Google Gemini API
    - Cara membuat request ke API
    - System prompt: mengatur personality chatbot
    - Rate limiting dan API keys
  - Chatbot di web:
    - HTML/CSS untuk UI chat
    - JavaScript untuk interaksi
    - Fetch API untuk komunikasi ke backend
  - Desain percakapan:
    - Greeting dan introduction
    - Intent recognition: apa yang dimaksud user?
    - Fallback response: "Maaf, saya tidak mengerti"
    - Personality: karakter chatbot
  - Proyek: buat chatbot untuk skenario nyata
    - FAQ bot untuk sekolah
    - Study buddy bot
    - Mental health check-in bot (disclaimer: bukan pengganti profesional)
    - Game guide bot
- **Aktivitas**:
  - [ ] Plugged: Buat chatbot rule-based di Python (min. 20 responses)
  - [ ] Plugged: Tambahkan personality ke chatbot (formal, casual, lucu)
  - [ ] Plugged: (Opsional) Buat chatbot menggunakan API Gemini
  - [ ] Plugged: Desain conversation flow diagram untuk chatbot sekolah
- **Evaluasi / Quiz**:
  - [ ] Quiz: Jenis chatbot dan teknik pembuatan (8 soal)
  - [ ] Proyek: Buat chatbot fungsional dengan min. 30 responses dan fallback

### 05. Robotika dan Simulasi
- **Tujuan Pembelajaran**: Siswa memahami konsep dasar robotika dan cara mensimulasikan robot secara digital.
- **Materi Pokok**:
  - Apa itu robotika?
    - Robot: mesin yang dapat melakukan tugas secara otomatis
    - Komponen: sensor (input), controller (proses), aktuator (output)
    - Jenis robot: industrial, service, medical, exploration, social
  - Robotika + AI:
    - Robot cerdas: bisa belajar dan beradaptasi
    - Contoh: robot vacuum (menghafal layout ruangan)
    - Contoh: drone delivery (navigasi otomatis)
    - Contoh: robot bedah (presisi tinggi)
  - Simulasi robot (tanpa hardware):
    - Python Turtle sebagai simulasi robot sederhana
    - Pygame untuk simulasi environment
    - Scratch: simulasi robot bergerak
  - Sensor dan actuator (konsep):
    - Sensor: ultrasonik (jarak), infrared (garis), kamera, gyroscope
    - Aktuator: motor DC, servo motor, LED, buzzer
  - Algoritma robotika dasar:
    - Line following: ikuti garis
    - Obstacle avoidance: hindari rintangan
    - Pathfinding: cari jalur terpendek
    - PID controller (konsep sangat dasar)
  - Microcontroller (pengenalan):
    - Arduino: board + sensor + motor
    - Raspberry Pi: mini komputer
    - micro:bit: untuk pemula
    - Simulasi online: Tinkercad Circuits, Wokwi
- **Aktivitas**:
  - [ ] Plugged: Simulasi robot line follower menggunakan Python Turtle
  - [ ] Plugged: Simulasi obstacle avoidance di Scratch
  - [ ] Plugged: (Opsional) Tinkercad Circuits — simulasi Arduino + LED + sensor
  - [ ] Plugged: Buat simulasi pathfinding (A* algorithm visualization)
- **Evaluasi / Quiz**:
  - [ ] Quiz: Komponen robot, jenis sensor/aktuator (10 soal)
  - [ ] Proyek: Buat simulasi robot yang menyelesaikan maze

### 06. Proyek Capstone AI
- **Tujuan Pembelajaran**: Siswa merancang dan membangun produk AI kreatif sebagai puncak pembelajaran KKA.
- **Materi Pokok**:
  - Proyek capstone = proyek akhir yang menggabungkan semua keterampilan
  - Panduan proyek:
    1. Empathize: identifikasi masalah nyata di sekolah/masyarakat
    2. Define: rumuskan masalah secara spesifik
    3. Ideate: brainstorm solusi berbasis AI/koding
    4. Prototype: bangun MVP (Minimum Viable Product)
    5. Test: uji dengan pengguna nyata
    6. Iterate: perbaiki berdasarkan feedback
    7. Present: pitching dan demo
  - Kategori proyek:
    - **AI Application**: menggunakan AI API (ChatGPT, Vision, TTS)
    - **ML Model**: melatih model sendiri (Teachable Machine, scikit-learn)
    - **Data Product**: analisis data + visualisasi + insight
    - **Creative Coding**: game AI, generative art, interactive story
    - **Social Good**: solusi teknologi untuk masalah sosial/lingkungan
  - Contoh proyek inspiratif:
    - "SortSmart" — klasifikasi sampah menggunakan computer vision
    - "StudyPal" — chatbot tutor AI yang personalized
    - "FakeNews Detector" — cek kredibilitas berita dengan NLP
    - "EmoSense" — deteksi emosi siswa untuk konseling
    - "AgriBot" — simulasi robot pertanian pintar
    - "Music AI" — generator musik berdasarkan mood
    - "Health Check" — analyzer nutrisi makanan dari foto
  - Dokumentasi proyek:
    - README: deskripsi, cara install, cara pakai
    - Technical document: arsitektur, tools yang digunakan
    - User guide: panduan pengguna
    - Demo video: rekaman singkat cara kerja produk
  - Pitching:
    - 5 menit: masalah → solusi → demo → dampak → next steps
    - Slide deck yang menarik
    - Live demo yang bekerja
  - Rubrik penilaian:
    - Inovasi dan orisinalitas: 20%
    - Penguasaan teknis: 25%
    - Dampak dan kegunaan: 20%
    - Kualitas kode dan dokumentasi: 15%
    - Presentasi dan pitching: 10%
    - Kolaborasi tim: 10%
- **Aktivitas**:
  - [ ] Proyek besar (6-8 minggu)
  - [ ] Milestone: proposal → prototype → alpha → beta → final → presentation
  - [ ] Weekly check-in dengan guru mentor
  - [ ] Peer code review session
  - [ ] Demo day / exhibition di sekolah
- **Evaluasi / Quiz**:
  - [ ] Penilaian proyek berdasarkan rubrik
  - [ ] Peer assessment dan visitor voting
  - [ ] Portfolio: dokumentasikan proyek di GitHub/website pribadi
  - [ ] Refleksi akhir: "Bagaimana perjalanan belajar KKA mengubah cara saya melihat teknologi?"

> **Status**: Segera Hadir — content.md sebagai roadmap, sub-materi belum diproduksi.
