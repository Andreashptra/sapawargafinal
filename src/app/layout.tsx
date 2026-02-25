import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/components/AuthProvider'
import LoadingScreen from '@/components/LoadingScreen'

export const metadata: Metadata = {
  title: 'Sapa Warga - Pengaduan Masyarakat Kecamatan Kebonagung',
  description: 'Sistem Pengaduan Masyarakat Kecamatan Kebonagung, Kabupaten Demak',
  icons: { icon: '/demak.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <LoadingScreen />
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
