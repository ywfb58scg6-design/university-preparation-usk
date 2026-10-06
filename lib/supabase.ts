'use client'

import { createBrowserClient } from '@supabase/ssr'

let supabaseClient:
  ReturnType<typeof createBrowserClient> | undefined

export function createClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase environment variables.'
    )
  }

  supabaseClient = createBrowserClient(
    supabaseUrl,
    supabaseKey
  )

  return supabaseClient
}
