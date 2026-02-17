import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET: List complaints (admin) or user's complaints
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const nik = searchParams.get('nik')

  let complaints
  if (session.user.type === 'admin') {
    complaints = await prisma.complaint.findMany({
      include: { society: true, response: { include: { user: true } } },
      orderBy: { id: 'desc' },
    })
  } else {
    complaints = await prisma.complaint.findMany({
      where: { societyId: parseInt(session.user.id) },
      include: { society: true, response: { include: { user: true } } },
      orderBy: { id: 'desc' },
    })
  }

  return NextResponse.json(complaints)
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

    const complaint = await prisma.complaint.create({
      data: {
        dateComplaint: new Date(),
        nik: session.user.nik!,
        contentsOfTheReport,
        photo: photo || '',
        status: '0',
        societyId: parseInt(session.user.id),
      },
    })

    // Create empty response entry
    await prisma.response.create({
      data: { complaintId: complaint.id },
    })

    return NextResponse.json({ success: true, id: complaint.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
