'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/demak.png" alt="Logo" className="w-9 h-9" />
            <span className="text-lg font-bold text-primary">Sapa Warga</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">Beranda</Link>
            <Link href="/#prosedur" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">Prosedur</Link>
            <Link href="/track-complaint" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">Lacak Pengaduan</Link>

            {session?.user?.type === 'society' ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-primary">Dashboard</Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="btn-outline text-sm !py-2 !px-4">Keluar</button>
              </div>
            ) : session?.user?.type === 'admin' ? (
              <Link href="/admin" className="btn-primary text-sm !py-2 !px-4">Admin Panel</Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-primary">Masuk</Link>
                <Link href="/register" className="btn-primary text-sm !py-2 !px-4">Daftar</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Beranda</Link>
            <Link href="/#prosedur" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Prosedur</Link>
            <Link href="/track-complaint" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Lacak Pengaduan</Link>
            {session?.user?.type === 'society' ? (
              <>
                <Link href="/dashboard" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Dashboard</Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">Keluar</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Masuk</Link>
                <Link href="/register" className="block px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/5">Daftar</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
