# Wedding Invitation - Aldi & Faradila

Aplikasi web undangan pernikahan *single-page* (SPA) yang estetik dan modern, dirancang khusus untuk di-host secara gratis menggunakan **GitHub Pages**. Aplikasi ini dibangun tanpa *backend server* atau *database* berbayar, melainkan memanfaatkan **Google Apps Script** dan **Google Sheets** untuk fitur penyimpanan data (RSVP).

## Fitur Utama

- **Desain Premium & Responsif**: Dibangun dengan *Vanilla HTML, CSS, dan Javascript*. Menggunakan tema *Sage Green*, efek *glassmorphism*, tipografi modern, dan animasi transisi halus yang menyesuaikan dengan baik di perangkat desktop maupun *mobile*.
- **Konfirmasi Kehadiran (RSVP)**: Formulir RSVP terintegrasi langsung dengan Google Sheets menggunakan Google Apps Script tanpa *reload* (menggunakan *fetch API* AJAX).
- **Ucapan & Doa (*Guestbook*)**: Fitur buku tamu sederhana yang akan menampilkan ucapan yang dimasukkan pengunjung ke dalam halaman. Penyimpanan dilakukan secara lokal di *browser* (*localStorage*).
- **Add to Calendar**: Menyediakan opsi penambahan jadwal acara ke *Google Calendar* dan *Outlook Calendar* pengunjung secara dinamis.
- **Navigasi Lokasi**: Menampilkan QR Code interaktif dan tombol pembuka *Google Maps*.
- **Integrasi Ride Hailing**: Tersedia tombol **Book Gojek** dan **Book Grab** yang menggunakan *deep-linking* (*scheme URLs*). Jika dibuka di *handphone*, tombol akan langsung membuka aplikasi terkait menuju titik lokasi pernikahan.

## Teknologi yang Digunakan

- HTML5 (Semantik)
- Vanilla CSS3 (CSS Variables, Flexbox/Grid, Keyframes)
- Vanilla JavaScript (ES6, Fetch API, Local Storage)
- Google Apps Script & Google Sheets (sebagai Backend Webhook)
- GitHub Pages (Hosting)

## Struktur File Utama

- `index.html`: Kerangka dan konten utama *website*.
- `styles.css`: Gaya visual, tema, dan animasi.
- `main.js`: Logika aplikasi (*countdown*, *event listener* formulir, pengelola *local storage*, *handler* Gojek/Grab).
- `google-apps-script.js`: **Kode referensi backend**. File ini berisi instruksi dan kode yang perlu di-*copy-paste* ke dalam Google Apps Script editor.
- Gambar/Aset: `img1.png`, `img2.png`, `img3.jpg` (Galeri), `hero_bg.jpg` (Latar Belakang).

## Panduan Setup (Khusus Pemilik Web)

### 1. Setup Google Apps Script untuk RSVP
Agar formulir RSVP dapat menyimpan data dan Anda mendapatkan notifikasi email:
1. Buka [Google Sheets](https://sheets.new) dan buat *spreadsheet* baru.
2. Beri nama kolom pada baris pertama secara berurutan: **Timestamp**, **Nama**, **Kehadiran**, **Jumlah Tamu**, **Pesan**.
3. Di menu *spreadsheet*, klik **Extensions (Ekstensi)** > **Apps Script**.
4. Hapus kode bawaan yang ada. Buka file `google-apps-script.js` di dalam *repository* ini, lalu *copy* seluruh isinya dan *paste* ke dalam editor Apps Script.
5. Ubah nilai variabel `TO_EMAIL` dengan alamat email Anda untuk menerima notifikasi otomatis setiap ada RSVP masuk.
6. Klik menu **Deploy (Terapkan)** > **New deployment (Penerapan baru)**.
7. Pilih jenis *Deployment*: **Web app**.
8. Atur hak akses:
   - *Execute as*: **Me** (Pilih email Anda)
   - *Who has access*: **Anyone** (Siapa saja)
9. Klik **Deploy** dan setujui izin otorisasi (*Authorize access*).
10. Anda akan mendapatkan URL web app (diakhiri dengan `/exec`). *Copy* URL tersebut.
11. Buka file `main.js`, cari variabel `GOOGLE_SCRIPT_URL` pada baris ke-34, dan ganti *value*-nya dengan URL yang baru saja Anda salin.

### 2. Hosting Gratis Menggunakan GitHub Pages
Web ini siap di-host langsung dari repositori ini.
1. Pastikan seluruh file sudah di-*push* ke cabang (`branch`) `main` atau `master`.
2. Pergi ke halaman *repository* Anda di GitHub, lalu klik **Settings** > **Pages** (di menu sebelah kiri).
3. Di bawah bagian **Build and deployment** (atau *Source*), pilih *branch* utama Anda (misal `main`) dan folder `/ (root)`.
4. Klik **Save**. 
5. Tunggu 1-2 menit, dan *website* undangan Anda akan langsung hidup (*live*) pada tautan yang diberikan oleh GitHub (contoh: `https://aldiwisnu.github.io/mywed/`).

---
*Created with ❤️ by Aldi & Faradila.*
