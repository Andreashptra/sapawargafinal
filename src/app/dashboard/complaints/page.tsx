'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiPlusCircle, FiEye } from 'react-icons/fi'

export default function MyComplaintsPage() {
  const [complaints, setComplaints] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/complaints?mine=true')
      .then(r => r.json())
      .then(d => { setComplaints(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const statusBadge = (s: string) => {
    if (s === '0') return <span className="badge-pending">Belum Diproses</span>
    if (s === 'process') return <span className="badge-process">Sedang Diproses</span>
    return <span className="badge-finished">Selesai</span>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-dark">Pengaduan Saya</h2>
          <p className="text-sm text-gray-400 mt-0.5">Daftar semua pengaduan yang pernah Anda buat</p>
        </div>
        <Link href="/dashboard/complaints/add" className="btn-primary text-sm flex items-center gap-1.5"><FiPlusCircle /> Buat Baru</Link>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="card h-20 animate-pulse bg-gray-100" />)}</div>
      ) : complaints.length === 0 ? (
        <div className="card text-center py-10">
          <div className="text-5xl mb-3">📭</div>
          <p className="font-semibold text-dark">Belum ada pengaduan</p>
        </div>
      ) : (
        <div className="space-y-3">
          {complaints.map((c: any) => (
            <div key={c.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400">#{c.id}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{new Date(c.dateComplaint).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <p className="text-sm text-dark leading-relaxed line-clamp-2">{c.contentsOfTheReport}</p>
                  {c.photo && <img src={c.photo} alt="" className="w-20 h-20 object-cover rounded-lg mt-2" />}
                </div>
                <div className="flex flex-col items-end gap-2">
                  {statusBadge(c.status)}
                  <Link href={`/dashboard/complaints/${c.id}`} className="text-primary text-xs font-medium flex items-center gap-1 hover:underline"><FiEye /> Detail</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
