'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/ThemeProvider'

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '⌂' },
  { href: '/journey', label: 'Journey', icon: '🗺️' },
  { href: '/todos', label: 'Tasks', icon: '✓' },
  { href: '/dates', label: 'Important Dates', icon: '📌' },
  { href: '/calendar', label: 'Calendar', icon: '📅' },
  { href: '/settings', label: 'Settings', icon: '⚙️' }
]

export default function Navigation() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:flex md:flex-col">
        <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <Link href="/dashboard" className="block">
            <div className="text-lg font-bold text-slate-950 dark:text-white">
              USK Preparation
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              University Preparation
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigationItems.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-[46px] items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <span className="w-6 text-center text-base">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn-secondary w-full"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
          </button>
        </div>
      </aside>

      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pt-2 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
          {navigationItems.slice(0, 5).map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-[52px] flex-col items-center justify-center rounded-xl px-1 text-[11px] font-semibold transition ${
                  active
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="mt-0.5 truncate">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
