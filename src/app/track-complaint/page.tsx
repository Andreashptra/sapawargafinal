'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Chatbot from '@/components/Chatbot'
import Link from 'next/link'

type Complaint = {
  id: number
  dateComplaint: string
  contentsOfTheReport: string
  status: string
  society?: { name: string; nik: string }
  response?: { response: string | null; responseDate: string | null; user: { officerName: string } | null } | null
}

export default function TrackComplaintPage() {
  const [nik, setNik] = useState('')
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nik.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nik }),
      })
      const data = await res.json()
      setComplaints(Array.isArray(data) ? data : [])
    } catch {
      setComplaints([])
    }
    setSearched(true)
    setLoading(false)
  }

  const statusBadge = (s: string) => {
    if (s === '0') return <span className="badge-pending">Belum Diproses</span>
    if (s === 'process') return <span className="badge-process">Sedang Diproses</span>
    return <span className="badge-finished">Selesai</span>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-dark">Lacak Pengaduan</h1>
            <p className="text-gray-400 mt-2">Masukkan NIK Anda untuk melihat status pengaduan</p>
          </div>

          <form onSubmit={handleSearch} className="card flex gap-3 !p-4 mb-8">
            <input
              value={nik}
              onChange={e => setNik(e.target.value)}
              placeholder="Masukkan NIK Anda..."
              className="input-field flex-1"
              required
            />
            <button type="submit" disabled={loading} className="btn-primary whitespace-nowrap disabled:opacity-50">
              {loading ? 'Mencari...' : '🔍 Cari'}
            </button>
          </form>

          {searched && complaints.length === 0 && (
            <div className="card text-center py-10">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-semibold text-dark">Tidak Ditemukan</h3>
              <p className="text-gray-400 text-sm mt-1">Tidak ada pengaduan dengan NIK tersebut.</p>
            </div>
          )}

          {complaints.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Ditemukan <strong>{complaints.length}</strong> pengaduan untuk NIK: <strong>{nik}</strong></p>
              {complaints.map((c) => (
                <div key={c.id} className="card hover:-translate-y-0.5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs text-gray-400">#{c.id} • {new Date(c.dateComplaint).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <h3 className="font-semibold text-dark mt-1">{c.society?.name || '-'}</h3>
                    </div>
                    {statusBadge(c.status)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.contentsOfTheReport}</p>
                  {c.response?.response && (
                    <div className="mt-3 p-3 bg-primary/5 rounded-xl border border-primary/10">
                      <p className="text-xs font-semibold text-primary mb-1">Tanggapan Petugas:</p>
                      <p className="text-sm text-gray-700">{c.response.response}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Chatbot />
    </>
  )
}
