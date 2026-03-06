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
  const [nikError, setNikError] = useState('')
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleNikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16)
    setNik(value)
    
    if (value.length === 0) {
      setNikError('')
    } else if (value.length < 16) {
      setNikError('NIK harus 16 karakter')
    } else {
      setNikError('')
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nik.trim()) return
    if (nik.length !== 16) {
      setNikError('NIK harus 16 karakter')
      return
    }
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

          <form onSubmit={handleSearch} className="card !p-4 mb-8">
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  value={nik}
                  onChange={handleNikChange}
                  placeholder="Masukkan 16 digit NIK Anda..."
                  className={`input-field w-full ${
                    nikError ? 'border-red-500' : 
                    nik.length === 16 ? 'border-green-500' : 'border-gray-300'
                  }`}
                  required
                  maxLength={16}
                />
                <div className="flex justify-between items-center mt-1">
                  <div className="text-xs">
                    {nikError && (
                      <span className="text-red-500">{nikError}</span>
                    )}
                    {!nikError && nik.length === 16 && (
                      <span className="text-green-600">NIK valid ✓</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    {nik.length}/16
                  </div>
                </div>
              </div>
              <button type="submit" disabled={loading || nik.length !== 16} className="btn-primary whitespace-nowrap disabled:opacity-50 self-start">
                {loading ? 'Mencari...' : '🔍 Cari'}
              </button>
            </div>
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
