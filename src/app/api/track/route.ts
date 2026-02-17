import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { nik } = await req.json()
    if (!nik) return NextResponse.json({ error: 'NIK wajib diisi' }, { status: 400 })

    const complaints = await prisma.complaint.findMany({
      where: { nik },
      include: { society: true, response: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(complaints)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
