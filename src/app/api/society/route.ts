import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { hash } from 'bcryptjs'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.type !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const society = await prisma.society.findMany({ orderBy: { id: 'desc' } })
  return NextResponse.json(society)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.type !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const hashedPw = await hash(body.password, 12)
    const society = await prisma.society.create({
      data: {
        nik: body.nik,
        name: body.name,
        username: body.username,
        email: body.email || '',
        phoneNumber: body.phoneNumber,
        address: body.address,
        password: hashedPw,
        photo: body.photo || '',
      },
    })
    return NextResponse.json({ success: true, id: society.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
