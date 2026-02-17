import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nik, name, username, email, phoneNumber, address, password, photo } = body

    if (!nik || !name || !username || !password || !phoneNumber || !address) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
    }

    const existing = await prisma.society.findFirst({ where: { username } })
    if (existing) {
      return NextResponse.json({ error: 'Username sudah digunakan' }, { status: 400 })
    }

    const hashedPw = await hash(password, 12)
    const society = await prisma.society.create({
      data: {
        nik,
        name,
        username,
        email: email || '',
        phoneNumber,
        address,
        password: hashedPw,
        photo: photo || '',
      },
    })

    return NextResponse.json({ success: true, id: society.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
