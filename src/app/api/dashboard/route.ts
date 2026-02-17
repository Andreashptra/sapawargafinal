import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.type !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [
    { count: totalComplaints },
    { count: pending },
    { count: process },
    { count: finished },
    { count: totalUsers },
    { count: totalSociety },
  ] = await Promise.all([
    supabase.from('complaint').select('*', { count: 'exact', head: true }),
    supabase.from('complaint').select('*', { count: 'exact', head: true }).eq('status', '0'),
    supabase.from('complaint').select('*', { count: 'exact', head: true }).eq('status', 'process'),
    supabase.from('complaint').select('*', { count: 'exact', head: true }).eq('status', 'finished'),
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase.from('society').select('*', { count: 'exact', head: true }),
  ])

  return NextResponse.json({
    totalComplaints: totalComplaints || 0,
    pending: pending || 0,
    process: process || 0,
    finished: finished || 0,
    totalUsers: totalUsers || 0,
    totalSociety: totalSociety || 0,
  })
}
