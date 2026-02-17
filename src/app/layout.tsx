import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/components/AuthProvider'

export const metadata: Metadata = {
  title: 'Sapa Warga - Pengaduan Masyarakat Kecamatan Kebonagung',
  description: 'Sistem Pengaduan Masyarakat Kecamatan Kebonagung, Kabupaten Demak',
  icons: { icon: '/demak.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
