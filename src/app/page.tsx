import Navbar from '@/components/Navbar'
import Chatbot from '@/components/Chatbot'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-dark to-emerald-900 pt-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-sm">Layanan Pengaduan Online 24 Jam</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Sapa Warga<br />
              <span className="text-yellow-400">Kecamatan Kebonagung</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Sampaikan aspirasi dan pengaduan Anda secara online. Kami siap mendengarkan dan menindaklanjuti setiap laporan masyarakat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-white text-primary font-bold py-3.5 px-8 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-sm">
                Buat Pengaduan
              </Link>
              <Link href="/track-complaint" className="border-2 border-white/30 text-white font-bold py-3.5 px-8 rounded-full hover:bg-white/10 transition-all text-sm">
                Lacak Pengaduan
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface to-transparent" />
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-surface">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '📋', label: 'Total Pengaduan', value: '500+' },
              { icon: '⏳', label: 'Diproses', value: '95%' },
              { icon: '✅', label: 'Selesai', value: '450+' },
              { icon: '👥', label: 'Warga Terdaftar', value: '1000+' },
            ].map((s, i) => (
              <div key={i} className="card text-center group hover:-translate-y-1">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-2xl font-bold text-dark">{s.value}</div>
                <div className="text-gray-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Prosedur */}
        <section id="prosedur" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full">Prosedur</span>
              <h2 className="text-3xl font-bold text-dark mt-4">Langkah Pengaduan</h2>
              <p className="text-gray-400 mt-2 max-w-xl mx-auto">Proses pengaduan yang mudah dan transparan</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', icon: '📝', title: 'Tulis Laporan', desc: 'Isi form pengaduan dengan detail permasalahan yang Anda alami.' },
                { step: '02', icon: '🔍', title: 'Verifikasi', desc: 'Tim kami akan memverifikasi dan mengkategorikan laporan Anda.' },
                { step: '03', icon: '⚙️', title: 'Proses', desc: 'Pengaduan ditindaklanjuti oleh petugas yang berwenang.' },
                { step: '04', icon: '✅', title: 'Selesai', desc: 'Laporan pengaduan telah ditindaklanjuti dan diselesaikan.' },
              ].map((item, i) => (
                <div key={i} className="card text-center group hover:-translate-y-2 relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">{item.step}</div>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:bg-primary/20 transition">{item.icon}</div>
                  <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-dark">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Punya Keluhan?</h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">Jangan ragu untuk menyampaikan aspirasi Anda. Setiap laporan akan kami tindaklanjuti dengan serius.</p>
            <Link href="/register" className="bg-white text-primary font-bold py-3.5 px-8 rounded-full hover:bg-gray-100 transition-all shadow-lg inline-flex items-center gap-2 text-sm">
              Daftar Sekarang <span>→</span>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white pt-16 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-10 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src="/sapa-warga_logo_keckebonagung.svg" alt="Logo" className="w-10 h-10" />
                  <span className="text-lg font-bold">Sapa Warga</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">Sistem Pengaduan Masyarakat Online Kecamatan Kebonagung, Kabupaten Demak, Jawa Tengah.</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Menu</h4>
                <div className="space-y-2">
                  <Link href="/" className="block text-gray-400 text-sm hover:text-white transition">Beranda</Link>
                  <Link href="/track-complaint" className="block text-gray-400 text-sm hover:text-white transition">Lacak Pengaduan</Link>
                  <Link href="/login" className="block text-gray-400 text-sm hover:text-white transition">Masuk</Link>
                  <Link href="/register" className="block text-gray-400 text-sm hover:text-white transition">Daftar</Link>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-4">Kontak</h4>
                <div className="space-y-2 text-gray-400 text-sm">
                  <p>📍 Kecamatan Kebonagung, Kabupaten Demak</p>
                  <p>📞 (024) XXXXXXX</p>
                  <p>✉️ kebonagung@demakkab.go.id</p>
                </div>
                <div className="flex gap-3 mt-4">
                  <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500 transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.53.02C13.84 0 15.14.01 16.44.06c1.33.06 2.49.27 3.4.57.94.31 1.74.76 2.53 1.55.8.79 1.24 1.59 1.56 2.53.3.91.51 2.07.56 3.4.06 1.33.07 1.76.07 5.15v.64c0 3.4-.01 3.82-.07 5.15-.06 1.33-.27 2.49-.57 3.4a6.87 6.87 0 01-1.56 2.53 6.87 6.87 0 01-2.53 1.55c-.91.3-2.07.51-3.4.57-1.33.06-1.76.07-5.15.07h-.65c-3.39 0-3.82-.01-5.15-.07-1.33-.06-2.49-.27-3.4-.57a6.87 6.87 0 01-2.53-1.55A6.87 6.87 0 01.55 20.5c-.3-.91-.51-2.07-.57-3.4C-.08 15.76-.09 15.33-.09 11.94v-.64c0-3.39.01-3.82.07-5.15.06-1.33.27-2.49.57-3.4A6.87 6.87 0 012.1 1.22 6.87 6.87 0 014.63-.33c.91-.3 2.07-.51 3.4-.57C9.36-.96 9.78-.97 13.17-.97h-.64z" /></svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Sapa Warga — Kecamatan Kebonagung, Kabupaten Demak. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
      <Chatbot />
    </>
  )
}
