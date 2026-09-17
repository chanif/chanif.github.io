# Jaringan Komputer dan Internet

## Deskripsi
Modul yang membahas bagaimana komputer-komputer saling terhubung membentuk jaringan, bagaimana internet bekerja, dan layanan-layanan yang tersedia di internet. Dilengkapi dengan simulator interaktif untuk memvisualisasikan konsep jaringan.

## Capaian Pembelajaran (CP)
- Menjelaskan konsep dasar jaringan komputer (LAN, WAN, Internet)
- Mengidentifikasi topologi jaringan dan perangkat jaringan
- Memahami cara kerja protokol TCP/IP, IP address, dan DNS
- Menjelaskan perjalanan paket data dari pengirim ke penerima
- Menggunakan layanan internet secara produktif dan aman
- Menerapkan prinsip keamanan jaringan dasar

---

## Daftar Sub-Materi

### 01. Pengenalan Jaringan Komputer
- **Tujuan Pembelajaran**: Siswa memahami konsep dasar jaringan komputer dan mengapa jaringan diperlukan.
- **Materi Pokok**:
  - Apa itu jaringan komputer? Analogi: jalan raya untuk data
  - Manfaat jaringan: berbagi sumber daya, komunikasi, akses informasi
  - Jenis jaringan berdasarkan jangkauan:
    - PAN (Personal Area Network): Bluetooth, hotspot HP
    - LAN (Local Area Network): jaringan sekolah, warnet
    - MAN (Metropolitan Area Network): jaringan kota
    - WAN (Wide Area Network): antar kota/negara
    - Internet: jaringan terbesar di dunia
  - Model client-server vs peer-to-peer
  - Media transmisi: kabel (UTP, fiber optic) vs nirkabel (WiFi, 4G/5G)
  - Bandwidth dan throughput: kecepatan internet
- **Aktivitas**:
  - [ ] Unplugged: "Jaringan Manusia" — siswa berperan sebagai komputer, saling kirim pesan lewat "kabel" (tali rafia)
  - [ ] Plugged: Identifikasi jaringan di sekolah — berapa access point? Tipe kabel apa?
  - [ ] Plugged: Speed test internet sekolah (speedtest.net)
- **Evaluasi / Quiz**:
  - [ ] Quiz: Klasifikasi jaringan berdasarkan jangkauan (10 soal)
  - [ ] Quiz: Identifikasi media transmisi dan kegunaannya
- **Referensi & Link**:
  - Halaman interaktif: `01-pengenalan-jaringan/index.html` (sudah dibuat)
  - Video MPI: Pengenalan Jaringan

### 02. Topologi dan Perangkat Jaringan
- **Tujuan Pembelajaran**: Siswa mengenali berbagai topologi jaringan dan perangkat yang digunakan.
- **Materi Pokok**:
  - Topologi jaringan:
    - Star: semua terhubung ke switch/hub pusat (paling umum)
    - Bus: satu kabel utama, semua terhubung ke kabel itu
    - Ring: membentuk lingkaran tertutup
    - Mesh: setiap node terhubung ke semua node lain
    - Tree: gabungan star dan bus (hierarki)
  - Kelebihan dan kekurangan masing-masing topologi
  - Perangkat jaringan:
    - NIC (Network Interface Card): kartu jaringan di komputer
    - Switch: menghubungkan perangkat dalam LAN
    - Router: menghubungkan jaringan berbeda, routing paket data
    - Access Point: memberikan koneksi WiFi
    - Modem: mengubah sinyal analog ↔ digital
    - Firewall: melindungi jaringan dari ancaman
  - Kabel jaringan: UTP (Cat 5e, Cat 6), fiber optic, coaxial
  - Cara crimping kabel UTP (straight vs crossover)
- **Aktivitas**:
  - [ ] Unplugged: Gambar 5 topologi jaringan, tandai kelebihan/kekurangannya
  - [ ] Plugged: Simulator topologi — buat jaringan sederhana (Packet Tracer / simulator web)
  - [ ] Plugged: Identifikasi perangkat jaringan di lab komputer sekolah
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi topologi dari diagram (8 soal visual)
  - [ ] Quiz: Cocokkan perangkat jaringan dengan fungsinya
  - [ ] Latihan: Desain jaringan untuk sekolah 3 lantai
- **Game Interaktif**:
  - [ ] Network builder: Drag & drop perangkat jaringan untuk membangun LAN yang berfungsi

### 03. Protokol, IP Address, dan DNS
- **Tujuan Pembelajaran**: Siswa memahami cara komputer berkomunikasi melalui protokol standar.
- **Materi Pokok**:
  - Apa itu protokol? Aturan komunikasi antar komputer
  - Model OSI (7 lapisan) — penjelasan sederhana
  - Model TCP/IP (4 lapisan):
    - Application: HTTP, HTTPS, FTP, SMTP, DNS
    - Transport: TCP (reliable) vs UDP (fast)
    - Internet: IP (routing paket)
    - Network Access: Ethernet, WiFi
  - IP Address:
    - IPv4: format xxx.xxx.xxx.xxx (0-255), contoh: 192.168.1.1
    - Kelas IP: A, B, C
    - IP Private vs Public
    - IPv6: format baru (128-bit), mengapa perlu?
    - Subnet mask dan default gateway
  - DNS (Domain Name System):
    - Mengapa perlu DNS? (manusia hafal nama, bukan angka)
    - Cara kerja DNS: domain → IP address
    - Hierarki DNS: root → TLD (.com, .id) → domain → subdomain
  - DHCP: pemberian IP otomatis
- **Aktivitas**:
  - [ ] Plugged: Cek IP address komputer sendiri (ipconfig / ifconfig)
  - [ ] Plugged: Ping dan traceroute ke beberapa website — lihat rute paket data
  - [ ] Plugged: nslookup — cek IP dari domain populer
  - [ ] Unplugged: Roleplay DNS — siswa jadi DNS server, lookup domain → IP
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi protokol dan port (10 soal)
  - [ ] Quiz: Konversi dan klasifikasi IP address
  - [ ] Latihan: Konfigurasi IP address statis pada komputer
- **Referensi & Link**:
  - Video MPI: IP Address dan DNS
  - Halaman interaktif yang sudah ada

### 04. Perjalanan Paket Data
- **Tujuan Pembelajaran**: Siswa memahami bagaimana data dikirim dari satu komputer ke komputer lain melalui internet.
- **Materi Pokok**:
  - Konsep packet switching: data dipecah jadi paket-paket kecil
  - Anatomi paket data:
    - Header: alamat pengirim, alamat tujuan, nomor urut
    - Payload: isi data yang sebenarnya
    - Trailer: checksum untuk deteksi error
  - Proses pengiriman data (step-by-step):
    1. Aplikasi membuat request (HTTP)
    2. Transport layer memecah jadi segmen (TCP) + nomor port
    3. Network layer menambahkan IP address → paket
    4. Data link layer menambahkan MAC address → frame
    5. Physical layer mengirim sebagai sinyal listrik/cahaya
  - Routing: bagaimana router memilih jalur terbaik
  - Encapsulation dan decapsulation
  - Apa yang terjadi saat paket hilang? (retransmission TCP)
- **Aktivitas**:
  - [ ] Unplugged: "Paket Data Manusia" — siswa jadi router, lempar bola kertas (paket) sesuai rute
  - [ ] Plugged: Gunakan simulator perjalanan paket data interaktif (sudah ada)
  - [ ] Plugged: Capture paket data sederhana (Wireshark — demo)
- **Evaluasi / Quiz**:
  - [ ] Quiz: Urutan proses pengiriman paket data (8 soal)
  - [ ] Quiz: Identifikasi komponen paket data
  - [ ] Latihan: Trace rute paket dari "kamu" ke "Google"
- **Game Interaktif**:
  - [ ] Packet journey simulator (sudah ada — `03-perjalanan-paket-data/index.html`): siswa melihat paket data berjalan melewati router
- **Referensi & Link**:
  - Halaman interaktif: `04-perjalanan-paket-data/index.html` (sudah dibuat, dengan simulator)
  - Video MPI: Perjalanan Paket Data

### 05. Layanan Internet
- **Tujuan Pembelajaran**: Siswa mengenal dan mampu memanfaatkan berbagai layanan internet secara produktif.
- **Materi Pokok**:
  - World Wide Web (WWW):
    - Perbedaan internet vs web
    - URL: protokol://domain/path
    - HTTP vs HTTPS (gembok hijau = aman)
    - Browser: cara kerja, rendering halaman web
  - Email:
    - Cara kerja email: SMTP (kirim), POP3/IMAP (terima)
    - Etika email: subject jelas, formal, tidak spam
  - Search engine:
    - Cara kerja Google: crawling → indexing → ranking
    - Tips pencarian efektif: keyword, operator ("...", site:, filetype:)
  - Media sosial: dampak positif dan negatif
  - Cloud storage: menyimpan data di internet
  - Streaming: cara kerja Netflix, YouTube, Spotify
  - E-commerce: cara kerja belanja online
- **Aktivitas**:
  - [ ] Plugged: Latihan pencarian Google tingkat lanjut — gunakan operator pencarian
  - [ ] Plugged: Kirim email formal ke guru menggunakan format yang benar
  - [ ] Plugged: Analisis URL website — identifikasi protokol, domain, path
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi layanan internet dan cara kerjanya (12 soal)
  - [ ] Praktik: Buat email formal dengan lampiran

### 06. Keamanan Jaringan
- **Tujuan Pembelajaran**: Siswa memahami ancaman keamanan jaringan dan cara melindungi diri.
- **Materi Pokok**:
  - Jenis ancaman:
    - Malware: virus, worm, trojan, ransomware, spyware
    - Phishing: penipuan via email/website palsu
    - Man-in-the-middle attack: menyadap komunikasi
    - DDoS: membanjiri server dengan traffic
    - Social engineering: manipulasi psikologis
  - Cara melindungi diri:
    - Password kuat: panjang, kombinasi karakter, unik per akun
    - Two-factor authentication (2FA)
    - Update software secara rutin
    - Antivirus dan firewall
    - Jangan klik link mencurigakan
    - HTTPS: pastikan website aman
    - VPN: menyembunyikan koneksi
  - Enkripsi:
    - Apa itu enkripsi? Analogi: surat dalam amplop terkunci
    - Enkripsi simetris vs asimetris
    - Contoh: HTTPS menggunakan TLS/SSL
  - Keamanan WiFi: WPA2/WPA3, jangan gunakan WiFi publik untuk transaksi
- **Aktivitas**:
  - [ ] Plugged: Cek kekuatan password sendiri di haveibeenpwned.com
  - [ ] Plugged: Identifikasi email phishing — diberikan 5 email, mana yang asli dan palsu?
  - [ ] Unplugged: "Enkripsi Caesar" — enkripsi dan dekripsi pesan dengan Caesar cipher
- **Evaluasi / Quiz**:
  - [ ] Quiz: Identifikasi jenis ancaman keamanan (12 soal)
  - [ ] Quiz: Best practices keamanan jaringan
  - [ ] Latihan: Buat kebijakan keamanan untuk lab komputer sekolah
- **Game Interaktif**:
  - [ ] Phishing detector: Identifikasi email/website phishing
  - [ ] Caesar cipher encoder/decoder
- **Referensi & Link**:
  - Halaman interaktif: `06-keamanan-jaringan/index.html` (sudah dibuat)
  - Video MPI: Keamanan Jaringan
