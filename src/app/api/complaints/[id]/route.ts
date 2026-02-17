import { NextRequest, NextResponse } from 'next/server'
import { supabase, transformKeys } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET single complaint
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { data: complaint, error } = await supabase
    .from('complaint')
    .select('*, society(*), response(*, user:users(*))')
    .eq('id', parseInt(params.id))
    .single()

  if (error || !complaint) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(transformKeys(complaint))
}

// PUT: Update complaint status & response (admin)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.type !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { status, response: responseText, evidencePhoto } = body
    const complaintId = parseInt(params.id)

    const { error: updateError } = await supabase
      .from('complaint')
      .update({ status })
      .eq('id', complaintId)

    if (updateError) throw updateError

    const responseData: any = {
      complaint_id: complaintId,
      response_date: new Date().toISOString(),
      response: responseText,
      user_id: parseInt(session.user.id),
    }
    if (evidencePhoto) responseData.evidence_photo = evidencePhoto

    const { error: upsertError } = await supabase
      .from('response')
      .upsert(responseData, { onConflict: 'complaint_id' })

    if (upsertError) throw upsertError

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE complaint
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.type !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase.from('complaint').delete().eq('id', parseInt(params.id))
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
