'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function DashboardPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/login')
        return
      }

      setEmail(user.email ?? '')
      setLoading(false)
    }

    loadUser()
  }, [router])

  async function handleLogout() {
    const supabase = createClient()

    await supabase.auth.signOut()

    router.replace('/login')
    router.refresh()
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-slate-500">Loading...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">
        <div className="card">
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">
            University Preparation of USK
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Welcome to your preparation dashboard.
          </p>

          <div className="mt-6 rounded-xl bg-slate-100 p-4 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Signed in as
            </p>

            <p className="mt-1 font-semibold text-slate-900 dark:text-white">
              {email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="btn-primary mt-6"
          >
            Sign out
          </button>
        </div>
      </div>
    </main>
  )
}
