import 'next-auth'

declare module 'next-auth' {
  interface User {
    type?: string
    role?: string
    nik?: string
    photo?: string
  }
  interface Session {
    user: {
      id: string
      name: string
      email: string
      type: string
      role?: string
      nik?: string
      photo?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    type: string
    role?: string
    nik?: string
    photo?: string
  }
}
