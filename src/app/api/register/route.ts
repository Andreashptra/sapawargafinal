import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { hash } from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nik, name, username, email, phoneNumber, address, password, photo } = body

    if (!nik || !name || !username || !password || !phoneNumber || !address) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
    }

    const { data: existing } = await supabase
      .from('society')
      .select('id')
      .eq('username', username)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Username sudah digunakan' }, { status: 400 })
    }

    const hashedPw = await hash(password, 12)
    const { data: society, error } = await supabase
      .from('society')
      .insert({
        nik,
        name,
        username,
        email: email || '',
        phone_number: phoneNumber,
        address,
        password: hashedPw,
        photo: photo || '',
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, id: society.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
