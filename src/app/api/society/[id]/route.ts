import { NextRequest, NextResponse } from 'next/server'
import { supabase, transformKeys } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { hash } from 'bcryptjs'

// GET society data by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    
    // Verify user can only access their own data or admin access
    if (!session || (session.user.id !== params.id && session.user.type !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: society, error } = await supabase
      .from('society')
      .select(`
        *,
        complaints:complaint(
          id,
          status,
          date_complaint,
          contents_of_the_report
        )
      `)
      .eq('id', parseInt(params.id))
      .single()

    if (error || !society) {
      return NextResponse.json({ error: 'Society not found' }, { status: 404 })
    }

    return NextResponse.json(transformKeys(society))
  } catch (error: any) {
    console.error('Error fetching society:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.type !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase.from('society').delete().eq('id', parseInt(params.id))
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  
  // Allow both admin and user to update their own data
  if (!session || (session.user.type !== 'admin' && session.user.id !== params.id)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const body = await req.json()
    
    // If admin is updating - allow all fields
    if (session.user.type === 'admin') {
      const data: any = {
        nik: body.nik,
        name: body.name,
        username: body.username,
        email: body.email,
        phone_number: body.phoneNumber,
        address: body.address,
      }
      if (body.password) data.password = await hash(body.password, 12)
      if (body.photo) data.photo = body.photo

      const { error } = await supabase.from('society').update(data).eq('id', parseInt(params.id))
      if (error) throw error
    } else {
      // If user is updating their own data - limited fields only
      const { name, email, phoneNumber, address } = body
      
      if (!name || !phoneNumber || !address) {
        return NextResponse.json({ 
          error: 'Name, phone number, and address are required' 
        }, { status: 400 })
      }

      const { error } = await supabase
        .from('society')
        .update({
          name,
          email: email || '',
          phone_number: phoneNumber,
          address,
          updated_at: new Date().toISOString()
        })
        .eq('id', parseInt(params.id))

      if (error) throw error
    }
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating society:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
