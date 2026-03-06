'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FiUser, FiPhone, FiMail, FiMapPin, FiCreditCard, FiEdit, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function BiodataPage() {
  const { data: session } = useSession()
  const [biodata, setBiodata] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [passwordLoading, setPasswordLoading] = useState(false)

  useEffect(() => {
    if (session?.user?.id) {
      loadBiodata()
    }
  }, [session])

  const loadBiodata = async () => {
    try {
      const res = await fetch(`/api/society/${session?.user?.id}`)
      const data = await res.json()
      if (data) {
        setBiodata(data)
        setEditForm({
          name: data.name || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          address: data.address || ''
        })
      }
    } catch (error) {
      console.error('Error loading biodata:', error)
      toast.error('Gagal memuat biodata')
    }
    setLoading(false)
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/society/${session?.user?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })

      if (res.ok) {
        toast.success('Biodata berhasil diperbarui')
        setIsEditing(false)
        loadBiodata()
      } else {
        toast.error('Gagal memperbarui biodata')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan')
    }
  }

  const resetPasswordForm = () => {
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setShowPasswords({
      current: false,
      new: false,
      confirm: false
    })
  }

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password baru minimal 6 karakter')
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Konfirmasi password tidak cocok')
      return
    }

    setPasswordLoading(true)
    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Password berhasil diubah')
        setIsEditingPassword(false)
        resetPasswordForm()
      } else {
        toast.error(data.error || 'Gagal mengubah password')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan')
    } finally {
      setPasswordLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark">Biodata Saya</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola informasi pribadi Anda</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            <FiEdit size={16} />
            Edit Biodata
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            >
              Simpan
            </button>
          </div>
        )}
      </div>

      {/* Biodata Card */}
      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
            {biodata?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h3 className="text-xl font-bold text-dark">{biodata?.name || 'Nama Belum Diisi'}</h3>
            <p className="text-gray-500">Masyarakat Kecamatan Kebonagung</p>
          </div>
        </div>

        <div className="grid gap-4">
          {/* NIK - Read Only */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
              <FiCreditCard size={18} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">NIK</label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-500 font-mono">
                {biodata?.nik || '-'}
              </div>
              <p className="text-xs text-gray-400 mt-1">NIK tidak dapat diubah</p>
            </div>
          </div>

          {/* Nama Lengkap */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
              <FiUser size={18} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Nama Lengkap</label>
              {isEditing ? (
                <input 
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  placeholder="Masukkan nama lengkap"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                  {biodata?.name || '-'}
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
              <FiMail size={18} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              {isEditing ? (
                <input 
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field"
                  placeholder="Masukkan email"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                  {biodata?.email || '-'}
                </div>
              )}
            </div>
          </div>

          {/* No. HP */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
              <FiPhone size={18} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">No. HP</label>
              {isEditing ? (
                <input 
                  type="tel"
                  value={editForm.phoneNumber}
                  onChange={(e) => setEditForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className="input-field"
                  placeholder="Masukkan nomor HP"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                  {biodata?.phoneNumber || '-'}
                </div>
              )}
            </div>
          </div>

          {/* Alamat */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
              <FiMapPin size={18} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Alamat</label>
              {isEditing ? (
                <textarea 
                  value={editForm.address}
                  onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Masukkan alamat lengkap"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700 min-h-[60px]">
                  {biodata?.address || '-'}
                </div>
              )}
            </div>
          </div>

          {/* Username - Read Only */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
              <FiUser size={18} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-500">
                {biodata?.username || '-'}
              </div>
              <p className="text-xs text-gray-400 mt-1">Username tidak dapat diubah</p>
            </div>
          </div>
        </div>

        {/* Info */}
        {!isEditing && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>Info:</strong> Pastikan data biodata Anda selalu terkini dan akurat untuk memudahkan proses penanganan pengaduan.
            </p>
          </div>
        )}

        {/* Statistik Akun */}
        {!isEditing && !isEditingPassword && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-medium text-gray-700 mb-3">Informasi Akun</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-primary">{biodata?.complaints?.length || 0}</div>
                <div className="text-xs text-gray-500">Total Pengaduan</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">
                  {biodata?.complaints?.filter((c: any) => c.status === 'finished').length || 0}
                </div>
                <div className="text-xs text-gray-500">Pengaduan Selesai</div>
              </div>
            </div>
          </div>
        )}

        {/* Keamanan Akun */}
        {!isEditing && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700">Keamanan Akun</h4>
              {!isEditingPassword ? (
                <button 
                  onClick={() => {setIsEditingPassword(true); resetPasswordForm()}}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                >
                  <FiLock size={14} />
                  Ubah Password
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={() => {setIsEditingPassword(false); resetPasswordForm()}}
                    className="px-3 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={handlePasswordChange}
                    disabled={passwordLoading}
                    className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
                  >
                    {passwordLoading ? 'Mengubah...' : 'Simpan'}
                  </button>
                </div>
              )}
            </div>

            {isEditingPassword ? (
              <div className="space-y-4">
                {/* Password Saat Ini */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Password Saat Ini
                  </label>
                  <div className="relative">
                    <input 
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="input-field pr-12"
                      placeholder="Masukkan password saat ini"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.current ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Password Baru */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Password Baru
                  </label>
                  <div className="relative">
                    <input 
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      className={`input-field pr-12 ${
                        passwordForm.newPassword.length > 0 
                          ? passwordForm.newPassword.length >= 6 
                            ? 'border-green-300' 
                            : 'border-red-300'
                          : ''
                      }`}
                      placeholder="Masukkan password baru"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.new ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  <div className="mt-1 text-xs">
                    <span className={passwordForm.newPassword.length >= 6 ? 'text-green-500' : 'text-red-500'}>
                      Minimal 6 karakter
                    </span>
                    <span className="text-gray-400 float-right">
                      {passwordForm.newPassword.length}/∞
                    </span>
                  </div>
                </div>

                {/* Konfirmasi Password Baru */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Konfirmasi Password Baru
                  </label>
                  <div className="relative">
                    <input 
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className={`input-field pr-12 ${
                        passwordForm.confirmPassword.length > 0 
                          ? passwordForm.newPassword === passwordForm.confirmPassword 
                            ? 'border-green-300' 
                            : 'border-red-300'
                          : ''
                      }`}
                      placeholder="Ulangi password baru"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.confirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  {passwordForm.confirmPassword.length > 0 && passwordForm.newPassword !== passwordForm.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      Password tidak cocok
                    </p>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-700 text-sm">
                    <strong>⚠️ Perhatian:</strong> Setelah password diubah, Anda perlu login ulang dengan password yang baru.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                  <FiLock size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Password Akun</p>
                  <p className="text-xs text-gray-500">Terakhir diubah: Tidak diketahui</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}