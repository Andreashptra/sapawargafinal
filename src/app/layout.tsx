import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/components/AuthProvider'
import LoadingScreen from '@/components/LoadingScreen'

export const metadata: Metadata = {
  title: 'Sapa Warga - Pengaduan Masyarakat Kecamatan Kebonagung',
  description: 'Sistem Pengaduan Masyarakat Kecamatan Kebonagung, Kabupaten Demak',
  icons: { icon: '/demak.png' },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
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
