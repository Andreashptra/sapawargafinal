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
    .from('users')
    .select('*, level(*)')
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
    const { officerName, username, email, password, phoneNumber, levelId, photo } = body

    const hashedPw = await hash(password, 12)
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        officer_name: officerName,
        username,
        email,
        password: hashedPw,
        phone_number: phoneNumber,
        level_id: parseInt(levelId),
        photo: photo || '',
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, id: user.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
