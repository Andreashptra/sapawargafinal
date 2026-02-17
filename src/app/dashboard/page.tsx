'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiFileText, FiPlusCircle, FiClock, FiCheckCircle } from 'react-icons/fi'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [complaints, setComplaints] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/complaints?mine=true')
      .then(r => r.json())
      .then(d => { setComplaints(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const total = complaints.length
  const pending = complaints.filter(c => c.status === '0').length
  const process = complaints.filter(c => c.status === 'process').length
  const finished = complaints.filter(c => c.status === 'finished').length

  const cards = [
    { label: 'Total Pengaduan', val: total, icon: <FiFileText />, color: 'bg-primary/10 text-primary' },
    { label: 'Belum Diproses', val: pending, icon: <FiClock />, color: 'bg-amber-50 text-amber-500' },
    { label: 'Diproses', val: process, icon: <FiClock />, color: 'bg-blue-50 text-blue-500' },
    { label: 'Selesai', val: finished, icon: <FiCheckCircle />, color: 'bg-emerald-50 text-emerald-500' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark">Selamat datang, {session?.user?.name || 'Pengguna'} 👋</h2>
        <p className="text-gray-400 text-sm mt-1">Kelola pengaduan Anda dengan mudah</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="card h-24 animate-pulse bg-gray-100" />)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-dark">Pengaduan Terbaru</h3>
            <Link href="/dashboard/complaints/add" className="btn-primary text-sm flex items-center gap-1.5"><FiPlusCircle /> Buat Pengaduan</Link>
          </div>

          {complaints.length === 0 ? (
            <div className="card text-center py-10">
              <div className="text-5xl mb-3">📭</div>
              <h3 className="font-semibold text-dark">Belum Ada Pengaduan</h3>
              <p className="text-sm text-gray-400 mt-1">Buat pengaduan pertama Anda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {complaints.slice(0, 5).map((c: any) => (
                <Link key={c.id} href={`/dashboard/complaints/${c.id}`} className="card block hover:-translate-y-0.5">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400">#{c.id} • {new Date(c.dateComplaint).toLocaleDateString('id-ID')}</p>
                      <p className="text-sm font-medium text-dark mt-1 line-clamp-1">{c.contentsOfTheReport}</p>
                    </div>
                    {c.status === '0' && <span className="badge-pending ml-3">Pending</span>}
                    {c.status === 'process' && <span className="badge-process ml-3">Proses</span>}
                    {c.status === 'finished' && <span className="badge-finished ml-3">Selesai</span>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
