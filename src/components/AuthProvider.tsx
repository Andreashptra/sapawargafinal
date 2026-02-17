'use client'

import { SessionProvider, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

function SessionGuard({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) return

    // Mark that a session is active in this tab
    sessionStorage.setItem('session-active', '1')

    // On page load, check if this is a fresh tab (no sessionStorage = tab was closed)
    // sessionStorage persists across refresh but is cleared when tab closes
  }, [session])

  useEffect(() => {
    // When component first mounts, check if we have a previous session marker
    const wasActive = sessionStorage.getItem('session-active')
    if (!wasActive && session) {
      // Tab was closed and reopened -> sign out
      signOut({ redirect: true, callbackUrl: '/' })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SessionGuard>{children}</SessionGuard>
    </SessionProvider>
  )
}
