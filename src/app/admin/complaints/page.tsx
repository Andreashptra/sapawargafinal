'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiEye, FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const load = () => {
    setLoading(true)
    fetch('/api/complaints')
      .then(r => r.json())
      .then(d => { setComplaints(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const filtered = filter === 'all' ? complaints : complaints.filter(c => c.status === filter)

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus pengaduan ini?')) return
    const res = await fetch(`/api/complaints/${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Dihapus'); load() } else toast.error('Gagal menghapus')
  }

  const statusBadge = (s: string) => {
    if (s === '0') return <span className="badge-pending">Pending</span>
    if (s === 'process') return <span className="badge-process">Proses</span>
    return <span className="badge-finished">Selesai</span>
  }

  const filters = [
    { val: 'all', label: 'Semua' },
    { val: '0', label: 'Pending' },
    { val: 'process', label: 'Proses' },
    { val: 'finished', label: 'Selesai' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-dark">Data Pengaduan</h2>
          <p className="text-sm text-gray-400 mt-0.5">{filtered.length} pengaduan</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {filters.map(f => (
            <button key={f.val} onClick={() => setFilter(f.val)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === f.val ? 'bg-white shadow text-dark' : 'text-gray-400 hover:text-dark'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="card h-20 animate-pulse bg-gray-100" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-10"><p className="text-gray-400">Tidak ada pengaduan</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c: any) => (
            <div key={c.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400">#{c.id}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{new Date(c.dateComplaint).toLocaleDateString('id-ID')}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs font-medium text-primary">{c.society?.name || '-'}</span>
                  </div>
                  <p className="text-sm text-dark line-clamp-2">{c.contentsOfTheReport}</p>
                </div>
                <div className="flex items-center gap-2">
                  {statusBadge(c.status)}
                  <Link href={`/admin/complaints/${c.id}`} className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition"><FiEye /></Link>
                  <button onClick={() => handleDelete(c.id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"><FiTrash2 /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
