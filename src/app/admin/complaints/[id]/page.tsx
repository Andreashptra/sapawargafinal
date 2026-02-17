'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { FiArrowLeft } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminComplaintDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [complaint, setComplaint] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState('')
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const load = () => {
    fetch(`/api/complaints/${id}`)
      .then(r => r.json())
      .then(d => {
        setComplaint(d)
        setStatus(d.status || '0')
        setResponse(d.response?.response || '')
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, response }),
      })
      if (res.ok) {
        toast.success('Berhasil diperbarui')
        load()
      } else {
        toast.error('Gagal memperbarui')
      }
    } catch {
      toast.error('Terjadi kesalahan')
    }
    setSubmitting(false)
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
  if (!complaint) return <div className="card text-center py-10"><p className="text-gray-400">Tidak ditemukan</p></div>

  const statusBadge = (s: string) => {
    if (s === '0') return <span className="badge-pending">Belum Diproses</span>
    if (s === 'process') return <span className="badge-process">Sedang Diproses</span>
    return <span className="badge-finished">Selesai</span>
  }

  return (
    <div className="max-w-3xl">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary mb-6 transition">
        <FiArrowLeft /> Kembali
      </button>

      {/* Info Pelapor */}
      <div className="card mb-4">
        <h3 className="font-bold text-dark mb-3">Info Pelapor</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-gray-400">Nama:</span> <span className="font-medium text-dark ml-1">{complaint.society?.name || '-'}</span></div>
          <div><span className="text-gray-400">NIK:</span> <span className="font-medium text-dark ml-1">{complaint.society?.nik || '-'}</span></div>
          <div><span className="text-gray-400">No. HP:</span> <span className="font-medium text-dark ml-1">{complaint.society?.phoneNumber || '-'}</span></div>
          <div><span className="text-gray-400">Alamat:</span> <span className="font-medium text-dark ml-1">{complaint.society?.address || '-'}</span></div>
        </div>
      </div>

      {/* Detail Pengaduan */}
      <div className="card mb-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-dark">Detail Pengaduan</h3>
            <p className="text-xs text-gray-400 mt-0.5">#{complaint.id} • {new Date(complaint.dateComplaint).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          {statusBadge(complaint.status)}
        </div>
        <p className="text-dark leading-relaxed whitespace-pre-wrap">{complaint.contentsOfTheReport}</p>
        {complaint.photo && <img src={complaint.photo} alt="Lampiran" className="mt-4 rounded-xl border max-w-full max-h-80 object-contain" />}
      </div>

      {/* Form Tanggapan */}
      <form onSubmit={handleSubmit} className="card border-l-4 border-primary">
        <h3 className="font-bold text-dark mb-4">Beri Tanggapan</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Status</label>
            <select value={status} onChange={e => {
              const newStatus = e.target.value
              setStatus(newStatus)
              // Auto-fill template response based on status
              const templates: Record<string, string> = {
                '0': 'Pengaduan Anda telah kami terima dan sedang menunggu untuk ditinjau.\n\nInformasi Lebih Lanjut Hubungi kami di 081522253312',
                'process': 'Pengaduan Anda sedang dalam proses penanganan oleh petugas kami. Mohon kesabarannya.\n\nInformasi Lebih Lanjut Hubungi kami di 081522253312',
                'finished': 'Pengaduan Anda telah selesai ditangani. Terima kasih atas laporan Anda.\n\nInformasi Lebih Lanjut Hubungi kami di 081522253312',
              }
              if (templates[newStatus]) setResponse(templates[newStatus])
            }} className="input-field">
              <option value="0">Belum Diproses</option>
              <option value="process">Sedang Diproses</option>
              <option value="finished">Selesai</option>
            </select>
          </div>

          {/* Template Cepat */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Template Cepat</label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '📋 Diterima', text: 'Pengaduan Anda telah kami terima dan akan segera kami tindak lanjuti.\n\nInformasi Lebih Lanjut Hubungi kami di 081522253312' },
                { label: '🔍 Sedang Ditinjau', text: 'Pengaduan Anda sedang ditinjau oleh tim kami. Kami akan menginformasikan perkembangan selanjutnya.\n\nInformasi Lebih Lanjut Hubungi kami di 081522253312' },
                { label: '🔧 Sedang Ditangani', text: 'Pengaduan Anda sedang dalam proses penanganan di lapangan. Mohon menunggu informasi selanjutnya.\n\nInformasi Lebih Lanjut Hubungi kami di 081522253312' },
                { label: '✅ Selesai', text: 'Pengaduan Anda telah selesai ditangani. Terima kasih telah melapor dan membantu kami meningkatkan pelayanan.\n\nInformasi Lebih Lanjut Hubungi kami di 081522253312' },
                { label: '📞 Butuh Info Tambahan', text: 'Kami memerlukan informasi tambahan terkait pengaduan Anda. Mohon hubungi kami untuk klarifikasi.\n\nInformasi Lebih Lanjut Hubungi kami di 081522253312' },
              ].map((t, i) => (
                <button key={i} type="button" onClick={() => setResponse(t.text)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary transition">
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Tanggapan</label>
            <textarea value={response} onChange={e => setResponse(e.target.value)} rows={5} className="input-field resize-none" placeholder="Tulis tanggapan atau pilih template di atas..." />
            <p className="text-[11px] text-gray-400 mt-1">Template otomatis menyertakan info kontak. Anda bisa mengedit sebelum menyimpan.</p>
          </div>
          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
            {submitting ? 'Menyimpan...' : 'Simpan Tanggapan'}
          </button>
        </div>
      </form>
    </div>
  )
}
