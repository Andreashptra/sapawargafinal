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
  const users = await prisma.user.findMany({ include: { level: true }, orderBy: { id: 'desc' } })
  return NextResponse.json(users)
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
    const user = await prisma.user.create({
      data: {
        officerName,
        username,
        email,
        password: hashedPw,
        phoneNumber,
        levelId: parseInt(levelId),
        photo: photo || '',
      },
    })

    return NextResponse.json({ success: true, id: user.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
