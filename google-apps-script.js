/**
 * PANDUAN SETUP GOOGLE APPS SCRIPT UNTUK RSVP
 * 
 * 1. Buka Google Sheets (sheets.new)
 * 2. Buat kolom di baris pertama: Timestamp, Nama, Kehadiran, Jumlah Tamu, Pesan
 * 3. Klik menu: Extensions (Ekstensi) > Apps Script
 * 4. Hapus semua kode yang ada, lalu paste kode di bawah ini.
 * 5. Ganti nilai "EMAIL_ANDA@gmail.com" dengan email Anda.
 * 6. Klik tombol "Deploy" (Terapkan) > "New deployment" (Penerapan baru)
 * 7. Pilih tipe: "Web app" (Aplikasi web)
 * 8. Execute as (Jalankan sebagai): "Me" (Saya)
 * 9. Who has access (Siapa yang memiliki akses): "Anyone" (Siapa saja)
 * 10. Klik "Deploy", beri izin otorisasi (Authorize access).
 * 11. Copy "Web app URL", lalu paste di file `main.js` pada variabel `GOOGLE_SCRIPT_URL`.
 */

const TO_EMAIL = "EMAIL_ANDA@gmail.com"; // GANTI EMAIL INI

function doPost(e) {
  try {
    // Membuka sheet aktif
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Mengambil data dari form
    var nama = e.parameter.name || "";
    var kehadiran = e.parameter.attendance || "";
    var jumlahTamu = e.parameter.guests || "";
    var pesan = e.parameter.message || "";
    var timestamp = new Date();
    
    // Menyimpan data ke baris baru di sheet
    sheet.appendRow([timestamp, nama, kehadiran, jumlahTamu, pesan]);
    
    // Mengirim email notifikasi
    var subject = "RSVP Baru: " + nama;
    var body = "Ada RSVP baru untuk pernikahan Anda!\n\n" +
               "Nama: " + nama + "\n" +
               "Kehadiran: " + kehadiran + "\n" +
               "Jumlah Tamu: " + jumlahTamu + "\n" +
               "Pesan: " + pesan;
               
    MailApp.sendEmail(TO_EMAIL, subject, body);
    
    // Mengembalikan response sukses
    return ContentService.createTextOutput(JSON.stringify({"result":"success", "data": JSON.stringify(e.parameter)}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
