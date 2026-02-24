'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiHome, FiUsers, FiFileText, FiBarChart2, FiLogOut, FiMenu, FiX, FiUserCheck } from 'react-icons/fi'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (pathname === '/admin/login') return <>{children}</>

  const links = [
    { href: '/admin', label: 'Dashboard', icon: <FiHome /> },
    { href: '/admin/complaints', label: 'Pengaduan', icon: <FiFileText /> },
    { href: '/admin/society', label: 'Masyarakat', icon: <FiUserCheck /> },
    { href: '/admin/users', label: 'Petugas', icon: <FiUsers /> },
    { href: '/admin/reports', label: 'Laporan', icon: <FiBarChart2 /> },
  ]

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1a1a2e] flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <img src="/sapa-warga_logo_keckebonagung.svg" alt="Logo" className="w-10 h-10" />
            <div>
              <h2 className="font-bold text-white text-sm">Sapa Warga</h2>
              <p className="text-[10px] text-white/40">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive(link.href) ? 'bg-primary text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full bg-primary/30 flex items-center justify-center text-primary font-bold text-sm">
              {session?.user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{session?.user?.name || 'Admin'}</p>
              <p className="text-[10px] text-white/40 capitalize">{(session?.user as any)?.role || 'Admin'}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-400 hover:bg-red-500/10 w-full px-4 py-2 rounded-xl transition">
            <FiLogOut /> Keluar
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-dark text-xl"><FiMenu /></button>
          <h1 className="text-lg font-bold text-dark">Admin Panel</h1>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
