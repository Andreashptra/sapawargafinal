import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Admin routes protection
    if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
      if (token?.type !== 'admin') {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }
    }

    // User/society routes protection
    if (path.startsWith('/dashboard')) {
      if (token?.type !== 'society') {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname
        if (path.startsWith('/admin') && !path.startsWith('/admin/login')) return !!token
        if (path.startsWith('/dashboard')) return !!token
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
