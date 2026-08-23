# Prompt Video — Google Flow (Veo 3.1)

Video ini untuk mengisi slot halaman **"(Video)"** pada `spesifikasi.md`, menggantikan placeholder video player yang ada di sana. Video menggabungkan **Scene 1 (pembuka/pemantik)** dan **Scene 2 (animasi konsep paket data & router)** dari storyboard di `materi.md`, menjadi satu video explainer pendek ±30–32 detik.

## Cara pakai
1. Buka **flow.google** (Google Flow), login dengan akun Google.
2. Generate tiap klip di bawah ini satu per satu (Veo membatasi ±8 detik per generate).
3. Gunakan fitur **Scenebuilder / Extend** untuk menyambung klip 1→2→3→4 secara berurutan menjadi satu video utuh.
4. Setelah semua klip jadi, export dengan rasio **16:9**, lalu simpan sebagai file video (mis. `materi-video.mp4`).
5. Tempatkan file hasil export ke slot video di halaman **"(Video)"** pada MPI (lihat instruksi penempatan di bagian bawah).

> Catatan gaya: MPI ini bergaya **flat 2D vector illustration / motion graphic**, BUKAN sinematik fotorealistik. Tambahkan penegasan gaya ini di setiap prompt agar hasil Veo tetap konsisten dengan ilustrasi ruang kelas kartun di `spesifikasi.md`. Jangan biarkan Veo menambahkan dialog/narasi suara sendiri — suara narasi akan ditambahkan terpisah di dalam aplikasi MPI, jadi minta audio hanya berupa efek suara ambient/elektronik ringan, tanpa dialog.

---

## Klip 1 (± 8 detik) — Pembuka: Mengirim Foto

```
Flat 2D vector illustration motion graphic, clean minimalist explainer animation style (NOT photorealistic, NOT cinematic live-action). Two cartoon teenage students, simple flat character design, sitting at a school desk, each holding a smartphone, chatting with each other. Character A taps a "Send" button on the phone screen to send a photo. Soft teal and cyan color palette (#00ACC1, #4DD0E1, #E0F7FA), clean white background with subtle classroom shapes. Camera stays static, medium shot. Gentle upbeat ambient electronic sound effect only, no dialogue, no voice-over, no on-screen text.
```

## Klip 2 (± 8 detik) — Foto Pecah Menjadi Paket Data

```
Flat 2D vector illustration motion graphic, clean minimalist explainer animation style (NOT photorealistic). Close-up on a smartphone screen: a photo icon shrinks and bursts into several small glowing rectangular fragments, each fragment numbered 1, 2, 3, 4, representing data packets. The fragments float into a stream of glowing blue-white light lines representing a network cable/signal. Teal and cyan color palette (#00ACC1, #4DD0E1, #0288D1), soft glowing particle effect. Camera slowly zooms in on the bursting animation. Soft digital "whoosh" and sparkle sound effects only, no dialogue, no voice-over, no on-screen text.
```

## Klip 3 (± 8 detik) — Paket Melewati Router

```
Flat 2D vector illustration motion graphic, clean minimalist explainer animation style (NOT photorealistic). Several small glowing numbered packet icons travel along different curved light-blue path lines on a clean white background, representing a network. The paths cross at a junction where a friendly cartoon router icon, styled like a small robot traffic officer, points each packet toward a different path. Teal, cyan, and blue color palette (#00ACC1, #4DD0E1, #0288D1). Camera follows the packets moving from left to right in a smooth tracking shot. Soft electronic beeping and "swoosh" sound effects only, no dialogue, no voice-over, no on-screen text.
```

## Klip 4 (± 8 detik) — Paket Tersusun Kembali di Penerima

```
Flat 2D vector illustration motion graphic, clean minimalist explainer animation style (NOT photorealistic). The numbered packet fragments from before arrive at a second smartphone screen and snap together in order (1,2,3,4) to reassemble into the original complete photo, with a small sparkle/glow effect when fully assembled. Character B (from the classroom scene) smiles looking at the completed photo notification. Teal and cyan color palette (#00ACC1, #4DD0E1, #E0F7FA), same clean flat classroom background as klip 1. Camera stays static, medium shot. Gentle success chime sound effect only, no dialogue, no voice-over, no on-screen text.
```

---

## Alternatif: Prompt Tunggal Diagram Konsep (jika hanya ingin 1 video pendek, tanpa karakter)

Jika tidak ingin membuat 4 klip cerita, cukup generate **satu klip diagram konsep** ini saja (≈8 detik, bisa di-*loop*):

```
Flat 2D vector infographic motion graphic, clean minimalist whiteboard-explainer style (NOT photorealistic). A simple diagram: on the left, an icon labeled "Komputer Pengirim"; a photo icon breaks into four small glowing numbered packet boxes; the packets travel along three curved blue lines toward a router icon styled as a small traffic-cop robot, which redirects each packet; on the right, the packets arrive at an icon labeled "Komputer Penerima" and reassemble into the original photo. Teal and cyan color palette (#00ACC1, #4DD0E1, #E0F7FA, #0288D1). Static wide shot, smooth step-by-step reveal animation. Soft ambient electronic background sound only, no dialogue, no voice-over.
```

---

## Di Mana Video Ini Disisipkan

- **Halaman utama:** halaman **"(Video)"** pada urutan struktur di `spesifikasi.md` (berada di antara halaman "Tarik Jawaban" dan "Materi 3" dalam rangkaian ber-navigasi ◀▶).
- **Judul halaman:** ganti label placeholder "(Video)" menjadi judul yang sesuai, misalnya **"Video: Perjalanan Paket Data"**.
- **Kotak teks di sebelah video** (sesuai layout Materi/Video pada `spesifikasi.md`): isi dengan poin ringkas dari Scene 2 di `materi.md` — 3 konsep utama (Paket Data, Router, Rute Dinamis) — sebagai keterangan pendamping video.
- **Cara pasang di kode:** letakkan file video (mis. `materi-video.mp4`) di folder aset proyek (mis. `assets/video/`), lalu arahkan elemen `<video>` pada halaman "(Video)" ke path tersebut. Jangan hard-code video dari CDN eksternal, agar MPI tetap bisa berjalan offline.
- File video ini akan **disiapkan/diunggah manual oleh pengguna** — agent pembuat kode MPI cukup menyediakan slot `<video>` yang siap menerima file tersebut, tidak perlu men-generate videonya sendiri.
