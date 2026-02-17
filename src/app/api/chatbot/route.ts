import { NextRequest, NextResponse } from 'next/server'

function generateReply(message: string): string {
  const msg = message.toLowerCase()
  const responses = [
    { keywords: ['halo', 'hai', 'hello', 'hi', 'hey', 'selamat'],
      reply: 'Halo! 👋 Saya SI KUYUNG (Sistem Informasi Kunjungan dan Layanan Warga Terpadu), asisten virtual Kecamatan Kebonagung. Ada yang bisa saya bantu?' },
    { keywords: ['cara', 'lapor', 'melapor', 'pengaduan', 'aduan', 'buat laporan'],
      reply: '📝 Untuk membuat pengaduan:\n1. Daftar/Login terlebih dahulu\n2. Klik tombol "Buat Pengaduan"\n3. Isi detail laporan dan lampirkan foto\n4. Klik Submit\n\nLaporan Anda akan segera kami proses!' },
    { keywords: ['lacak', 'track', 'status', 'cek', 'progres'],
      reply: '🔍 Untuk melacak pengaduan:\n1. Buka menu "Lacak Pengaduan"\n2. Masukkan NIK Anda\n3. Klik "Cari Pengaduan"\n\nAnda bisa melihat status terkini laporan Anda.' },
    { keywords: ['daftar', 'register', 'registrasi', 'buat akun'],
      reply: '📋 Untuk mendaftar:\n1. Klik menu "Daftar" di halaman utama\n2. Isi NIK, Nama, Username, Email, No. HP, Alamat\n3. Buat password\n4. Klik Register\n\nSetelah itu Anda bisa langsung login!' },
    { keywords: ['login', 'masuk', 'sign in'],
      reply: '🔐 Untuk login:\n1. Klik menu "Login"\n2. Masukkan Username dan Password\n3. Klik tombol Login\n\nJika belum punya akun, silakan daftar terlebih dahulu.' },
    { keywords: ['kontak', 'hubungi', 'alamat', 'telepon', 'contact'],
      reply: '📍 Kantor Kecamatan Kebonagung\nKabupaten Demak, Jawa Tengah\n\nAnda juga bisa menghubungi kami melalui media sosial yang tersedia di halaman utama.' },
    { keywords: ['terima kasih', 'makasih', 'thanks', 'thank you'],
      reply: 'Sama-sama! 😊 Senang bisa membantu. Jangan ragu untuk bertanya lagi ya!' },
    { keywords: ['bantuan', 'help', 'tolong', 'bisa apa'],
      reply: '💡 Saya bisa membantu Anda dengan:\n• Cara membuat pengaduan\n• Cara melacak status pengaduan\n• Informasi pendaftaran akun\n• Cara login\n• Informasi kontak\n\nSilakan ketik pertanyaan Anda!' },
  ]

  for (const item of responses) {
    for (const kw of item.keywords) {
      if (msg.includes(kw)) return item.reply
    }
  }

  return '🤔 Maaf, saya belum memahami pertanyaan Anda. Coba tanyakan tentang:\n• Cara membuat pengaduan\n• Cara melacak pengaduan\n• Cara mendaftar\n• Cara login\n• Informasi kontak\n\nAtau ketik "bantuan" untuk melihat daftar lengkap.'
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }
    const reply = generateReply(message.trim())
    return NextResponse.json({ success: true, reply })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
