'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function SetupPage() {
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [university, setUniversity] = useState('')
  const [faculty, setFaculty] = useState('')
  const [targetUniversity, setTargetUniversity] = useState('')
  const [targetFaculty, setTargetFaculty] = useState('')
  const [startDate, setStartDate] = useState('')
  const [targetDate, setTargetDate] = useState('')

  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProfile() {
      try {
        const supabase = createClient()

        const {
          data: { user }
        } = await supabase.auth.getUser()

        if (!user) {
          router.replace('/login')
          return
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle()

        if (profile) {
          setFullName(profile.full_name ?? '')
          setUniversity(profile.university ?? '')
          setFaculty(profile.faculty ?? '')
          setTargetUniversity(profile.target_university ?? '')
          setTargetFaculty(profile.target_faculty ?? '')
          setStartDate(profile.start_date ?? '')
          setTargetDate(profile.target_date ?? '')
        }
      } catch {
        setError('Unable to load your profile.')
      } finally {
        setChecking(false)
      }
    }

    loadProfile()
  }, [router])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const supabase = createClient()

      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/login')
        return
      }

      const { error: saveError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName.trim() || null,
          university: university.trim() || null,
          faculty: faculty.trim() || null,
          target_university: targetUniversity.trim() || null,
          target_faculty: targetFaculty.trim() || null,
          start_date: startDate || null,
          target_date: targetDate || null,
          updated_at: new Date().toISOString()
        })

      if (saveError) {
        setError(saveError.message)
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="text-center">
          <div className="skeleton mx-auto h-12 w-12 rounded-2xl" />
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Loading your setup...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:py-12">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white shadow-glow">
            U
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">
            Set up your preparation
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
            Tell us about your university goal so your preparation dashboard
            can be personalized for you.
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                About you
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Basic information for your profile.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="label">
                  Full name
                </label>

                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Your name"
                  className="field"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="university" className="label">
                  Current school / university
                </label>

                <input
                  id="university"
                  type="text"
                  value={university}
                  onChange={(event) => setUniversity(event.target.value)}
                  placeholder="Your current school"
                  className="field"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="faculty" className="label">
                  Current faculty
                </label>

                <input
                  id="faculty"
                  type="text"
                  value={faculty}
                  onChange={(event) => setFaculty(event.target.value)}
                  placeholder="Optional"
                  className="field"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                Your target
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Where are you preparing to go?
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="targetUniversity" className="label">
                  Target university
                </label>

                <input
                  id="targetUniversity"
                  type="text"
                  required
                  value={targetUniversity}
                  onChange={(event) =>
                    setTargetUniversity(event.target.value)
                  }
                  placeholder="e.g. University of ..."
                  className="field"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="targetFaculty" className="label">
                  Target faculty
                </label>

                <input
                  id="targetFaculty"
                  type="text"
                  required
                  value={targetFaculty}
                  onChange={(event) =>
                    setTargetFaculty(event.target.value)
                  }
                  placeholder="e.g. Medicine"
                  className="field"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="startDate" className="label">
                  Preparation start date
                </label>

                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="field"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="targetDate" className="label">
                  Target date
                </label>

                <input
                  id="targetDate"
                  type="date"
                  required
                  value={targetDate}
                  min={startDate || undefined}
                  onChange={(event) => setTargetDate(event.target.value)}
                  className="field"
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="alert-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save and continue'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
