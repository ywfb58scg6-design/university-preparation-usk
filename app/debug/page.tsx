'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function DebugPage() {
  const [result, setResult] = useState('Checking...')

  useEffect(() => {
    async function checkSession() {
      const supabase = createClient()

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        setResult(`ERROR: ${error.message}`)
        return
      }

      if (!session) {
        setResult('NO SESSION')
        return
      }

      setResult(`SESSION EXISTS\nUser: ${session.user.email}`)
    }

    checkSession()
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <pre className="whitespace-pre-wrap rounded-xl bg-slate-900 p-6 text-white">
        {result}
      </pre>
    </main>
  )
}
