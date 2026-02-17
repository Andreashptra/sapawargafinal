'use client'

import { useEffect, useState } from 'react'
import { FiDownload, FiFilter, FiFileText } from 'react-icons/fi'

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

  const statusLabel = (s: string) => {
    if (s === '0') return 'Pending'
    if (s === 'process') return 'Proses'
    if (s === 'finished') return 'Selesai'
    return s
  }

  const exportCSV = () => {
    const headers = ['No', 'Tanggal', 'Pelapor', 'NIK', 'Isi Laporan', 'Status', 'Tanggapan', 'Bukti Penanganan']
    const rows = filtered.map((c: any, i: number) => [
      i + 1,
      new Date(c.dateComplaint).toLocaleDateString('id-ID'),
      c.society?.name || '-',
      c.society?.nik || '-',
      `"${(c.contentsOfTheReport || '').replace(/"/g, '""')}"`,
      statusLabel(c.status),
      `"${(c.response?.response || '-').replace(/"/g, '""')}"`,
      c.response?.evidencePhoto || '-',
    ])

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `laporan-pengaduan-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportExcel = () => {
    const statusLbl = (s: string) => statusLabel(s)
    let html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"><style>td,th{border:1px solid #ccc;padding:6px 10px;font-family:Arial;font-size:12px}th{background:#16a34a;color:#fff;font-weight:bold}tr:nth-child(even){background:#f9f9f9}</style></head><body>'
    html += '<h2 style="font-family:Arial">Laporan Pengaduan Masyarakat - Kecamatan Kebonagung</h2>'
    html += `<p style="font-family:Arial;font-size:12px">Dicetak: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} | Total: ${filtered.length} data</p>`
    html += '<table><thead><tr><th>No</th><th>Tanggal</th><th>Pelapor</th><th>NIK</th><th>Isi Laporan</th><th>Status</th><th>Tanggapan</th><th>Bukti Penanganan</th></tr></thead><tbody>'
    filtered.forEach((c: any, i: number) => {
      const evidenceImg = c.response?.evidencePhoto
        ? `<img src="${c.response.evidencePhoto}" width="100" />`
        : '-'
      html += `<tr><td>${i + 1}</td><td>${new Date(c.dateComplaint).toLocaleDateString('id-ID')}</td><td>${c.society?.name || '-'}</td><td>${c.society?.nik || '-'}</td><td>${c.contentsOfTheReport || '-'}</td><td>${statusLbl(c.status)}</td><td>${c.response?.response || '-'}</td><td>${evidenceImg}</td></tr>`
    })
    html += '</tbody></table></body></html>'

    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `laporan-pengaduan-${new Date().toISOString().slice(0, 10)}.xls`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-dark">Laporan Pengaduan</h2>
          <p className="text-sm text-gray-400 mt-0.5">Ringkasan dan laporan data pengaduan</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="btn-outline text-sm flex items-center gap-1.5"><FiFileText /> CSV</button>
          <button onClick={exportExcel} className="btn-outline text-sm flex items-center gap-1.5"><FiDownload /> Excel</button>
          <button onClick={handlePrint} className="btn-primary text-sm flex items-center gap-1.5"><FiDownload /> Cetak</button>
        </div>
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
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-gray-400 font-medium">No</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Tanggal</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Pelapor</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">NIK</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Isi Laporan</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Status</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Tanggapan</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Bukti</th>
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
                  <td className="px-5 py-3">
                    {c.response?.evidencePhoto ? (
                      <img src={c.response.evidencePhoto} alt="Bukti" className="w-12 h-12 object-cover rounded-lg border cursor-pointer" onClick={() => window.open(c.response.evidencePhoto, '_blank')} />
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
