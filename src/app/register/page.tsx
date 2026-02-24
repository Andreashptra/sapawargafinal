'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ nik: '', name: '', username: '', email: '', phoneNumber: '', address: '', password: '', confirmPassword: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return toast.error('Password tidak cocok')
    if (form.password.length < 6) return toast.error('Password minimal 6 karakter')

    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Registrasi berhasil! Silakan login.')
        router.push('/login')
      } else {
        toast.error(data.error || 'Registrasi gagal')
      }
    } catch {
      toast.error('Terjadi kesalahan')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-emerald-900 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/sapa-warga_logo_keckebonagung.svg" alt="Logo" className="w-16 h-16 mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Daftar Akun</h1>
          <p className="text-white/60 text-sm mt-1">Sapa Warga - Kecamatan Kebonagung</p>
        </div>
        <form onSubmit={handleSubmit} className="card !p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">NIK</label>
              <input name="nik" value={form.nik} onChange={handleChange} required className="input-field" placeholder="NIK" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nama Lengkap</label>
              <input name="name" value={form.name} onChange={handleChange} required className="input-field" placeholder="Nama" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
              <input name="username" value={form.username} onChange={handleChange} required className="input-field" placeholder="Username" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="Email" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">No. HP</label>
              <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required className="input-field" placeholder="08xxxxxxxx" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Alamat</label>
              <input name="address" value={form.address} onChange={handleChange} required className="input-field" placeholder="Alamat" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required className="input-field" placeholder="Min 6 karakter" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Konfirmasi Password</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required className="input-field" placeholder="Ulangi password" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full !py-3 disabled:opacity-50">
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
          <p className="text-center text-sm text-gray-500">
            Sudah punya akun? <Link href="/login" className="text-primary font-semibold hover:underline">Masuk</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
