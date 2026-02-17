'use client'

import { useEffect, useState } from 'react'
import { FiFileText, FiUsers, FiUserCheck, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {[1,2,3,4,5,6].map(i => <div key={i} className="card h-28 animate-pulse bg-gray-100" />)}
    </div>
  )

  const cards = [
    { label: 'Total Pengaduan', val: stats?.totalComplaints || 0, icon: <FiFileText />, color: 'bg-primary/10 text-primary' },
    { label: 'Belum Diproses', val: stats?.pending || 0, icon: <FiAlertCircle />, color: 'bg-amber-50 text-amber-500' },
    { label: 'Sedang Diproses', val: stats?.process || 0, icon: <FiClock />, color: 'bg-blue-50 text-blue-500' },
    { label: 'Selesai', val: stats?.finished || 0, icon: <FiCheckCircle />, color: 'bg-emerald-50 text-emerald-500' },
    { label: 'Total Masyarakat', val: stats?.totalSociety || 0, icon: <FiUserCheck />, color: 'bg-purple-50 text-purple-500' },
    { label: 'Total Petugas', val: stats?.totalUsers || 0, icon: <FiUsers />, color: 'bg-indigo-50 text-indigo-500' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark">Dashboard</h2>
        <p className="text-gray-400 text-sm mt-1">Ringkasan data pengaduan masyarakat</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${c.color}`}>{c.icon}</div>
            <div>
              <p className="text-2xl font-bold text-dark">{c.val}</p>
              <p className="text-xs text-gray-400">{c.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
