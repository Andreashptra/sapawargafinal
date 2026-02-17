'use client'

import { useEffect, useState } from 'react'
import { FiTrash2, FiPlus, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ officerName: '', username: '', email: '', password: '', phoneNumber: '', levelId: '' })
  const [submitting, setSubmitting] = useState(false)

  const load = () => {
    setLoading(true)
    fetch('/api/users')
      .then(r => r.json())
      .then(d => { setUsers(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, levelId: parseInt(form.levelId) }),
      })
      if (res.ok) {
        toast.success('Petugas ditambahkan')
        setShowModal(false)
        setForm({ officerName: '', username: '', email: '', password: '', phoneNumber: '', levelId: '' })
        load()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Gagal menambah')
      }
    } catch {
      toast.error('Terjadi kesalahan')
    }
    setSubmitting(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus petugas ini?')) return
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Dihapus'); load() } else toast.error('Gagal menghapus')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-dark">Data Petugas</h2>
          <p className="text-sm text-gray-400 mt-0.5">{users.length} petugas</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm flex items-center gap-1.5"><FiPlus /> Tambah Petugas</button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="card h-16 animate-pulse bg-gray-100" />)}</div>
      ) : (
        <div className="card !p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Nama</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Username</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Email</th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">Level</th>
                <th className="text-right px-5 py-3 text-gray-400 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any) => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-3 font-medium text-dark">{u.officerName}</td>
                  <td className="px-5 py-3 text-gray-500">{u.username}</td>
                  <td className="px-5 py-3 text-gray-500">{u.email || '-'}</td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary font-medium">{u.level?.name || '-'}</span></td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => handleDelete(u.id)} className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-dark text-lg">Tambah Petugas</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-dark"><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="officerName" value={form.officerName} onChange={e => setForm(p => ({...p, officerName: e.target.value}))} required className="input-field" placeholder="Nama Petugas" />
              <input name="username" value={form.username} onChange={e => setForm(p => ({...p, username: e.target.value}))} required className="input-field" placeholder="Username" />
              <input name="email" type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} className="input-field" placeholder="Email" />
              <input name="phoneNumber" value={form.phoneNumber} onChange={e => setForm(p => ({...p, phoneNumber: e.target.value}))} className="input-field" placeholder="No. HP" />
              <input name="password" type="password" value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))} required className="input-field" placeholder="Password" />
              <select name="levelId" value={form.levelId} onChange={e => setForm(p => ({...p, levelId: e.target.value}))} required className="input-field">
                <option value="">Pilih Level</option>
                <option value="1">Administrator</option>
                <option value="2">Officer</option>
              </select>
              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">{submitting ? 'Menyimpan...' : 'Simpan'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
