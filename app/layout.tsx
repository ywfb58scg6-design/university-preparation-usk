import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import AppShell from '@/components/AppShell'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'University Preparation of USK',
    template: '%s | USK Preparation'
  },
  description:
    'Plan your university preparation, track important dates, complete tasks, and follow your journey toward university.',
  applicationName: 'USK Preparation',
  keywords: [
    'university preparation',
    'study planner',
    'countdown',
    'student dashboard',
    'USK'
  ],
  authors: [
    {
      name: 'USK Preparation'
    }
  ],
  robots: {
    index: true,
    follow: true
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#f8fafc'
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#020617'
    }
  ]
}

interface RootLayoutProps {
  children: ReactNode
}

const themeInitializationScript = `
(function () {
  try {
    var storedTheme = localStorage.getItem('usk-theme');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : systemDark
          ? 'dark'
          : 'light';

    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (error) {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }
})();
`

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitializationScript
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
