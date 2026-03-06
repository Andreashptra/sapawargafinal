import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { compare, hash } from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.type !== 'society') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { currentPassword, newPassword } = await req.json()
    
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Password saat ini dan password baru diperlukan' }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password baru minimal 6 karakter' }, { status: 400 })
    }

    // Ambil data user dari database
    const { data: society, error: fetchError } = await supabase
      .from('society')
      .select('password')
      .eq('id', session.user.id)
      .single()

    if (fetchError || !society) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 })
    }

    // Verifikasi password saat ini
    const isCurrentPasswordValid = await compare(currentPassword, society.password)
    
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: 'Password saat ini tidak benar' }, { status: 400 })
    }

    // Hash password baru
    const hashedNewPassword = await hash(newPassword, 12)

    // Update password di database
    const { error: updateError } = await supabase
      .from('society')
      .update({ password: hashedNewPassword })
      .eq('id', session.user.id)

    if (updateError) {
      return NextResponse.json({ error: 'Gagal mengubah password' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Password berhasil diubah' 
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}