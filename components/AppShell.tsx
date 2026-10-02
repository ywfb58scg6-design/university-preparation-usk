'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Navigation from '@/components/Navigation'

interface AppShellProps {
  children: ReactNode
}

const applicationRoutes = [
  '/dashboard',
  '/journey',
  '/todos',
  '/dates',
  '/calendar',
  '/settings'
]

function isApplicationRoute(pathname: string): boolean {
  return applicationRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const showNavigation = isApplicationRoute(pathname)

  if (!showNavigation) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-slate-50 transition-colors dark:bg-slate-950">
      <Navigation />
      <main className="app-content min-h-screen md:pl-72">{children}</main>
    </div>
  )
}
