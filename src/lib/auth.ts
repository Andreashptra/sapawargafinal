import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import { compare } from 'bcryptjs'

// Laravel uses $2y$ prefix, bcryptjs uses $2a$. Convert for compatibility.
function fixLaravelHash(hash: string): string {
  if (hash.startsWith('$2y$')) {
    return '$2a$' + hash.slice(4)
  }
  return hash
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Admin/Officer login
    CredentialsProvider({
      id: 'admin-login',
      name: 'Admin Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: credentials.username },
              { email: credentials.username },
            ],
          },
          include: { level: true },
        })
        if (!user) return null
        const isValid = await compare(credentials.password, fixLaravelHash(user.password))
        if (!isValid) return null
        return {
          id: String(user.id),
          name: user.officerName,
          email: user.email,
          role: user.level?.name || 'Officer',
          type: 'admin',
        }
      },
    }),
    // Society/citizen login
    CredentialsProvider({
      id: 'society-login',
      name: 'Society Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        const society = await prisma.society.findFirst({
          where: { username: credentials.username },
        })
        if (!society) return null
        const isValid = await compare(credentials.password, fixLaravelHash(society.password))
        if (!isValid) return null
        return {
          id: String(society.id),
          name: society.name,
          email: society.email || '',
          nik: society.nik,
          photo: society.photo,
          type: 'society',
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.type = (user as any).type
        token.role = (user as any).role
        token.nik = (user as any).nik
        token.photo = (user as any).photo
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
        ;(session.user as any).type = token.type
        ;(session.user as any).role = token.role
        ;(session.user as any).nik = token.nik
        ;(session.user as any).photo = token.photo
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days - session persists even after refresh
  },
  secret: process.env.NEXTAUTH_SECRET,
}
