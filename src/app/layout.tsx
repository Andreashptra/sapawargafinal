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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
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
