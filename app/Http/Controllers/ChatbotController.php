<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    /**
     * Proses pesan chatbot dan berikan jawaban.
     */
    public function send(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:500',
        ]);

        $userMessage = strtolower(trim($request->message));
        $reply = $this->generateReply($userMessage);

        return response()->json([
            'success' => true,
            'reply'   => $reply,
        ]);
    }

    /**
     * Logic dummy untuk memberikan jawaban berdasarkan keyword.
     * Bisa diganti dengan integrasi AI/NLP di kemudian hari.
     */
    private function generateReply(string $message): string
    {
        // Keyword matching sederhana
        $responses = [
            // Salam
            ['keywords' => ['halo', 'hai', 'hello', 'hi', 'hey', 'selamat'],
             'reply'    => "Halo! 👋 Saya SI KUYUNG (Sistem Informasi Kunjungan dan Layanan Warga Terpadu), asisten virtual Kecamatan Kebonagung. Ada yang bisa saya bantu?"],

            // Cara melapor
            ['keywords' => ['cara', 'lapor', 'melapor', 'pengaduan', 'aduan', 'buat laporan'],
             'reply'    => "📝 Untuk membuat pengaduan:\n1. Daftar/Login terlebih dahulu\n2. Klik tombol \"Buat Pengaduan\"\n3. Isi detail laporan dan lampirkan foto\n4. Klik Submit\n\nLaporan Anda akan segera kami proses!"],

            // Lacak
            ['keywords' => ['lacak', 'track', 'status', 'cek', 'progres'],
             'reply'    => "🔍 Untuk melacak pengaduan:\n1. Buka menu \"Lacak Pengaduan\"\n2. Masukkan NIK Anda\n3. Klik \"Cari Pengaduan\"\n\nAnda bisa melihat status terkini laporan Anda."],

            // Daftar / Register
            ['keywords' => ['daftar', 'register', 'registrasi', 'buat akun'],
             'reply'    => "📋 Untuk mendaftar:\n1. Klik menu \"Daftar\" di halaman utama\n2. Isi NIK, Nama, Username, Email, No. HP, Alamat\n3. Upload foto profil\n4. Buat password\n5. Klik Register\n\nSetelah itu Anda bisa langsung login!"],

            // Login
            ['keywords' => ['login', 'masuk', 'sign in'],
             'reply'    => "🔐 Untuk login:\n1. Klik menu \"Login\"\n2. Masukkan Username dan Password\n3. Klik tombol Login\n\nJika belum punya akun, silakan daftar terlebih dahulu."],

            // Kontak
            ['keywords' => ['kontak', 'hubungi', 'alamat', 'telepon', 'contact'],
             'reply'    => "📍 Kantor Kecamatan Kebonagung\nKabupaten Demak, Jawa Tengah\n\nAnda juga bisa menghubungi kami melalui media sosial yang tersedia di halaman utama."],

            // Terima kasih
            ['keywords' => ['terima kasih', 'makasih', 'thanks', 'thank you'],
             'reply'    => "Sama-sama! 😊 Senang bisa membantu. Jangan ragu untuk bertanya lagi ya!"],

            // Bantuan
            ['keywords' => ['bantuan', 'help', 'tolong', 'bisa apa'],
             'reply'    => "💡 Saya bisa membantu Anda dengan:\n• Cara membuat pengaduan\n• Cara melacak status pengaduan\n• Informasi pendaftaran akun\n• Cara login\n• Informasi kontak\n\nSilakan ketik pertanyaan Anda!"],
        ];

        foreach ($responses as $item) {
            foreach ($item['keywords'] as $keyword) {
                if (str_contains($message, $keyword)) {
                    return $item['reply'];
                }
            }
        }

        // Default response
        return "🤔 Maaf, saya belum memahami pertanyaan Anda. Coba tanyakan tentang:\n• Cara membuat pengaduan\n• Cara melacak pengaduan\n• Cara mendaftar\n• Cara login\n• Informasi kontak\n\nAtau ketik \"bantuan\" untuk melihat daftar lengkap.";
    }
}
