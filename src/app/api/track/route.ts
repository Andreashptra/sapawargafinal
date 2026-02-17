import { NextRequest, NextResponse } from 'next/server'
import { supabase, transformKeys } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { nik } = await req.json()
    if (!nik) return NextResponse.json({ error: 'NIK wajib diisi' }, { status: 400 })

    const { data, error } = await supabase
      .from('complaint')
      .select('*, society(*), response(*, user:users(*))')
      .eq('nik', nik)
      .order('created_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(transformKeys(data))
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
