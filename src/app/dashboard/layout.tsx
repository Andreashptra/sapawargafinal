'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiHome, FiFileText, FiPlusCircle, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { useIOSSafeArea } from '@/hooks/useIOSSafeArea'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerRef = useIOSSafeArea<HTMLElement>()
  const sidebarRef = useIOSSafeArea<HTMLElement>()

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
    { href: '/dashboard/complaints', label: 'Pengaduan Saya', icon: <FiFileText /> },
    { href: '/dashboard/complaints/add', label: 'Buat Pengaduan', icon: <FiPlusCircle /> },
  ]

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar overlay mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside ref={sidebarRef} className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <img src="/sapa-warga_logo_keckebonagung.svg" alt="Logo" className="w-10 h-10" />
            <div>
              <h2 className="font-bold text-dark text-sm">Sapa Warga</h2>
              <p className="text-[10px] text-gray-400">Kec. Kebonagung</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${pathname === link.href ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-primary/5 hover:text-primary'}`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {session?.user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-dark truncate">{session?.user?.name || 'User'}</p>
              <p className="text-[10px] text-gray-400">Masyarakat</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 w-full px-4 py-2 rounded-xl transition">
            <FiLogOut /> Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header ref={headerRef} className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-dark text-xl"><FiMenu /></button>
          <h1 className="text-lg font-bold text-dark">Dashboard Masyarakat</h1>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
