import { NextRequest, NextResponse } from 'next/server'
import { supabase, transformKeys } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET: List complaints (admin) or user's complaints
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let query = supabase
    .from('complaint')
    .select('*, society(*), response(*, user:users(*))')
    .order('id', { ascending: false })

  if (session.user.type !== 'admin') {
    query = query.eq('society_id', parseInt(session.user.id))
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(transformKeys(data))
}

// POST: Create complaint
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.type !== 'society') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { contentsOfTheReport, photo } = body

    if (!contentsOfTheReport) {
      return NextResponse.json({ error: 'Isi laporan wajib diisi' }, { status: 400 })
    }

    const { data: complaint, error } = await supabase
      .from('complaint')
      .insert({
        date_complaint: new Date().toISOString(),
        nik: session.user.nik!,
        contents_of_the_report: contentsOfTheReport,
        photo: photo || '',
        status: '0',
        society_id: parseInt(session.user.id),
      })
      .select()
      .single()

    if (error) throw error

    // Create empty response entry
    await supabase.from('response').insert({ complaint_id: complaint.id })

    return NextResponse.json({ success: true, id: complaint.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
