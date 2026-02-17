import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { hash } from 'bcryptjs'

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.type !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  await prisma.user.delete({ where: { id: parseInt(params.id) } })
  return NextResponse.json({ success: true })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.type !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const data: any = {
      officerName: body.officerName,
      username: body.username,
      email: body.email,
      phoneNumber: body.phoneNumber,
      levelId: parseInt(body.levelId),
    }
    if (body.password) data.password = await hash(body.password, 12)
    if (body.photo) data.photo = body.photo

    await prisma.user.update({ where: { id: parseInt(params.id) }, data })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
