import { NextRequest, NextResponse } from 'next/server'
import { supabase, transformKeys } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { hash } from 'bcryptjs'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.type !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('society')
    .select('*')
    .order('id', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(transformKeys(data))
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.type !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const hashedPw = await hash(body.password, 12)
    const { data: society, error } = await supabase
      .from('society')
      .insert({
        nik: body.nik,
        name: body.name,
        username: body.username,
        email: body.email || '',
        phone_number: body.phoneNumber,
        address: body.address,
        password: hashedPw,
        photo: body.photo || '',
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, id: society.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
