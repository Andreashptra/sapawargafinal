'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export default function ComplaintDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [complaint, setComplaint] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/complaints/${id}`)
      .then(r => r.json())
      .then(d => { setComplaint(d); setLoading(false) })
      .catch(() => { setLoading(false) })
  }, [id])

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
  if (!complaint) return <div className="card text-center py-10"><p className="text-gray-400">Pengaduan tidak ditemukan</p></div>

  const statusBadge = (s: string) => {
    if (s === '0') return <span className="badge-pending">Belum Diproses</span>
    if (s === 'process') return <span className="badge-process">Sedang Diproses</span>
    return <span className="badge-finished">Selesai</span>
  }

  return (
    <div className="max-w-2xl">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary mb-6 transition">
        <FiArrowLeft /> Kembali
      </button>

      <div className="card mb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400">Pengaduan #{complaint.id}</p>
            <p className="text-xs text-gray-400 mt-0.5">{new Date(complaint.dateComplaint).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          {statusBadge(complaint.status)}
        </div>
        <p className="text-dark leading-relaxed whitespace-pre-wrap">{complaint.contentsOfTheReport}</p>
        {complaint.photo && (
          <img src={complaint.photo} alt="Lampiran" className="mt-4 rounded-xl border max-w-full max-h-80 object-contain" />
        )}
      </div>

      {complaint.response && (
        <div className="card border-l-4 border-primary">
          <h3 className="font-bold text-dark mb-2">Tanggapan Petugas</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{complaint.response.response || '-'}</p>
          {complaint.response.evidencePhoto && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-1.5">Bukti Penanganan:</p>
              <img src={complaint.response.evidencePhoto} alt="Bukti Penanganan" className="rounded-xl border max-w-full max-h-60 object-contain cursor-pointer" onClick={() => window.open(complaint.response.evidencePhoto, '_blank')} />
            </div>
          )}
          {complaint.response.responseDate && (
            <p className="text-xs text-gray-400 mt-3">
              Ditanggapi pada {new Date(complaint.response.responseDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              {complaint.response.user && <> oleh <strong>{complaint.response.user.officerName}</strong></>}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
