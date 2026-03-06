'use client'

import { useEffect, useState } from 'react'
import { FiTrash2, FiPlus, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminSocietyPage() {
  const [society, setSociety] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ nik: '', name: '', username: '', email: '', password: '', phoneNumber: '', address: '' })
  const [submitting, setSubmitting] = useState(false)
  const [nikError, setNikError] = useState('')

  const load = () => {
    setLoading(true)
    fetch('/api/society')
      .then(r => r.json())
      .then(d => { setSociety(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleNikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16)
    setForm(p => ({...p, nik: value}))
    
    if (value.length > 0 && value.length < 16) {
      setNikError('NIK harus 16 karakter')
    } else {
      setNikError('')
    }
  }

  const resetForm = () => {
    setForm({ nik: '', name: '', username: '', email: '', password: '', phoneNumber: '', address: '' })
    setNikError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (form.nik.length !== 16) {
      setNikError('NIK harus 16 karakter')
      return
    }
    
    setSubmitting(true)
    try {
      const res = await fetch('/api/society', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        toast.success('Masyarakat ditambahkan')
        setShowModal(false)
        resetForm()
        load()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Gagal menambah')
      }
      }
    } catch {
      toast.error('Terjadi kesalahan')
    }
    setSubmitting(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus data masyarakat ini?')) return
    const res = await fetch(`/api/society/${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Dihapus'); load() } else toast.error('Gagal menghapus')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-dark">Data Masyarakat</h2>
          <p className="text-sm text-gray-400 mt-0.5">{society.length} masyarakat terdaftar</p>
        </div>
        <button onClick={() => {setShowModal(true); resetForm()}} className="btn-primary text-sm flex items-center gap-1.5"><FiPlus /> Tambah</button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="card h-16 animate-pulse bg-gray-100" />)}</div>
      ) : (
        <div className="card !p-0 overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-gray-400 font-medium">NIK</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Nama</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Username</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">No. HP</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Alamat</th>
                <th className="text-right px-5 py-3 text-gray-400 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {society.map((s: any) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-3 text-gray-500 font-mono text-xs">{s.nik}</td>
                  <td className="px-5 py-3 font-medium text-dark">{s.name}</td>
                  <td className="px-5 py-3 text-gray-500">{s.username}</td>
                  <td className="px-5 py-3 text-gray-500">{s.phoneNumber || '-'}</td>
                  <td className="px-5 py-3 text-gray-500 truncate max-w-[200px]">{s.address || '-'}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => handleDelete(s.id)} className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => {setShowModal(false); resetForm()}}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-dark text-lg">Tambah Masyarakat</h3>
              <button onClick={() => {setShowModal(false); resetForm()}} className="text-gray-400 hover:text-dark"><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input 
                  value={form.nik} 
                  onChange={handleNikChange} 
                  required 
                  className={`input-field ${nikError ? 'border-red-500' : form.nik.length === 16 ? 'border-green-500' : ''}`}
                  placeholder="NIK" 
                  maxLength={16}
                />
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-red-500">{nikError}</span>
                  <span className={`${form.nik.length === 16 ? 'text-green-500' : 'text-gray-400'}`}>
                    {form.nik.length}/16
                  </span>
                </div>
              </div>
              <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} required className="input-field" placeholder="Nama Lengkap" />
              <input value={form.username} onChange={e => setForm(p => ({...p, username: e.target.value}))} required className="input-field" placeholder="Username" />
              <input type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} className="input-field" placeholder="Email" />
              <input value={form.phoneNumber} onChange={e => setForm(p => ({...p, phoneNumber: e.target.value}))} className="input-field" placeholder="No. HP" />
              <input value={form.address} onChange={e => setForm(p => ({...p, address: e.target.value}))} className="input-field" placeholder="Alamat" />
              <input type="password" value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))} required className="input-field" placeholder="Password" />
              <button type="submit" disabled={submitting || form.nik.length !== 16} className="btn-primary w-full disabled:opacity-50">{submitting ? 'Menyimpan...' : 'Simpan'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
