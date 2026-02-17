import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.type !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [totalComplaints, pending, process, finished, totalUsers, totalSociety] = await Promise.all([
    prisma.complaint.count(),
    prisma.complaint.count({ where: { status: '0' } }),
    prisma.complaint.count({ where: { status: 'process' } }),
    prisma.complaint.count({ where: { status: 'finished' } }),
    prisma.user.count(),
    prisma.society.count(),
  ])

  return NextResponse.json({
    totalComplaints,
    pending,
    process,
    finished,
    totalUsers,
    totalSociety,
  })
}
