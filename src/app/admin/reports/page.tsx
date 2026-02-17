'use client'

import { useEffect, useState } from 'react'
import { FiDownload, FiFilter } from 'react-icons/fi'

export default function AdminReportsPage() {
  const [complaints, setComplaints] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('/api/complaints')
      .then(r => r.json())
      .then(d => { setComplaints(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? complaints : complaints.filter(c => c.status === filter)
  const total = complaints.length
  const pending = complaints.filter(c => c.status === '0').length
  const process = complaints.filter(c => c.status === 'process').length
  const finished = complaints.filter(c => c.status === 'finished').length

  const handlePrint = () => { window.print() }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-dark">Laporan Pengaduan</h2>
          <p className="text-sm text-gray-400 mt-0.5">Ringkasan dan laporan data pengaduan</p>
        </div>
        <button onClick={handlePrint} className="btn-primary text-sm flex items-center gap-1.5"><FiDownload /> Cetak</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card text-center">
          <p className="text-2xl font-bold text-dark">{total}</p>
          <p className="text-xs text-gray-400">Total</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-amber-500">{pending}</p>
          <p className="text-xs text-gray-400">Pending</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-blue-500">{process}</p>
          <p className="text-xs text-gray-400">Proses</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-emerald-500">{finished}</p>
          <p className="text-xs text-gray-400">Selesai</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
        {[{ val: 'all', label: 'Semua' }, { val: '0', label: 'Pending' }, { val: 'process', label: 'Proses' }, { val: 'finished', label: 'Selesai' }].map(f => (
          <button key={f.val} onClick={() => setFilter(f.val)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === f.val ? 'bg-white shadow text-dark' : 'text-gray-400 hover:text-dark'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="card h-40 animate-pulse bg-gray-100" />
      ) : (
        <div className="card !p-0 overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-gray-400 font-medium">No</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Tanggal</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Pelapor</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">NIK</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Isi Laporan</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Status</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Tanggapan</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c: any, i: number) => (
                <tr key={c.id} className="border-b border-gray-50">
                  <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{new Date(c.dateComplaint).toLocaleDateString('id-ID')}</td>
                  <td className="px-5 py-3 font-medium text-dark">{c.society?.name || '-'}</td>
                  <td className="px-5 py-3 text-gray-500 font-mono text-xs">{c.society?.nik || '-'}</td>
                  <td className="px-5 py-3 text-gray-500 max-w-[200px] truncate">{c.contentsOfTheReport}</td>
                  <td className="px-5 py-3">
                    {c.status === '0' && <span className="badge-pending">Pending</span>}
                    {c.status === 'process' && <span className="badge-process">Proses</span>}
                    {c.status === 'finished' && <span className="badge-finished">Selesai</span>}
                  </td>
                  <td className="px-5 py-3 text-gray-500 max-w-[200px] truncate">{c.response?.response || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
