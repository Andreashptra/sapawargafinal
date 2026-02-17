'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await signIn('society-login', { username, password, redirect: false })
    setLoading(false)

    if (res?.ok) {
      toast.success('Login berhasil!')
      router.push('/dashboard')
    } else {
      toast.error('Username atau password salah')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-emerald-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/demak.png" alt="Logo" className="w-16 h-16 mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Masuk Akun</h1>
          <p className="text-white/60 text-sm mt-1">Sapa Warga - Kecamatan Kebonagung</p>
        </div>
        <form onSubmit={handleSubmit} className="card !p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="input-field" placeholder="Masukkan username" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="input-field" placeholder="Masukkan password" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full !py-3 disabled:opacity-50">
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
          <p className="text-center text-sm text-gray-500">
            Belum punya akun? <Link href="/register" className="text-primary font-semibold hover:underline">Daftar</Link>
          </p>
        </form>
        <div className="text-center mt-4">
          <Link href="/" className="text-white/60 text-sm hover:text-white transition">← Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  )
}
