'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AddComplaintPage() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return toast.error('Isi laporan tidak boleh kosong')

    setLoading(true)
    try {
      let photoUrl = ''
      if (photo) {
        const fd = new FormData()
        fd.append('file', photo)
        const upRes = await fetch('/api/upload', { method: 'POST', body: fd })
        const upData = await upRes.json()
        if (upData.url) photoUrl = upData.url
      }

      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentsOfTheReport: content, photo: photoUrl }),
      })

      const data = await res.json()
      if (data.id) {
        toast.success('Pengaduan berhasil dikirim!')
        router.push('/dashboard/complaints')
      } else {
        toast.error(data.error || 'Gagal mengirim pengaduan')
      }
    } catch {
      toast.error('Terjadi kesalahan')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-dark">Buat Pengaduan</h2>
        <p className="text-sm text-gray-400 mt-0.5">Sampaikan keluhan atau aspirasi Anda</p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Isi Laporan *</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            required
            className="input-field resize-none"
            placeholder="Jelaskan pengaduan Anda secara detail..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Foto Pendukung (Opsional)</label>
          <input type="file" accept="image/*" onChange={handlePhoto} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition" />
          {preview && <img src={preview} alt="Preview" className="mt-3 w-40 h-40 object-cover rounded-xl border" />}
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
            {loading ? 'Mengirim...' : 'Kirim Pengaduan'}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-outline">Batal</button>
        </div>
      </form>
    </div>
  )
}
