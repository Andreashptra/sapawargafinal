import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET single complaint
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const complaint = await prisma.complaint.findUnique({
    where: { id: parseInt(params.id) },
    include: { society: true, response: { include: { user: true } } },
  })
  if (!complaint) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(complaint)
}

// PUT: Update complaint status & response (admin)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.type !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { status, response: responseText } = body
    const complaintId = parseInt(params.id)

    await prisma.complaint.update({
      where: { id: complaintId },
      data: { status },
    })

    await prisma.response.upsert({
      where: { complaintId },
      update: {
        responseDate: new Date(),
        response: responseText,
        userId: parseInt(session.user.id),
      },
      create: {
        complaintId,
        responseDate: new Date(),
        response: responseText,
        userId: parseInt(session.user.id),
      },
    })

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

  await prisma.complaint.delete({ where: { id: parseInt(params.id) } })
  return NextResponse.json({ success: true })
}
