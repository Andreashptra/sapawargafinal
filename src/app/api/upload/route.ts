import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // On Vercel, filesystem is read-only. Use base64 data URL instead.
    const isVercel = process.env.VERCEL === '1'

    if (isVercel) {
      // Convert to base64 data URL for storage in database
      const base64 = buffer.toString('base64')
      const mimeType = file.type || 'image/png'
      const dataUrl = `data:${mimeType};base64,${base64}`
      return NextResponse.json({ success: true, url: dataUrl })
    } else {
      // Local development: save to filesystem
      const uploadsDir = join(process.cwd(), 'public', 'uploads')
      if (!existsSync(uploadsDir)) await mkdir(uploadsDir, { recursive: true })
      const filename = `${Date.now()}_${file.name.replace(/\s/g, '_')}`
      const path = join(uploadsDir, filename)
      await writeFile(path, buffer)
      return NextResponse.json({ success: true, url: `/uploads/${filename}` })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
