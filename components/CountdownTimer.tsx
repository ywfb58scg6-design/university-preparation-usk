'use client'

import { useEffect, useMemo, useState } from 'react'

interface CountdownTimerProps {
  targetDateTime: string | Date
  title?: string
  showSeconds?: boolean
}

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  completed: boolean
}

function calculateRemaining(target: string | Date): TimeRemaining {
  const targetTime = new Date(target).getTime()
  const difference = targetTime - Date.now()

  if (!Number.isFinite(targetTime) || difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      completed: true
    }
  }

  const totalSeconds = Math.floor(difference / 1000)

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    completed: false
  }
}

function TimeBlock({
  value,
  label
}: {
  value: number
  label: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-5">
      <div className="text-2xl font-bold tabular-nums text-slate-950 dark:text-white sm:text-4xl">
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>
    </div>
  )
}

export default function CountdownTimer({
  targetDateTime,
  title = 'Time remaining',
  showSeconds = true
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    calculateRemaining(targetDateTime)
  )

  useEffect(() => {
    const update = () => {
      setRemaining(calculateRemaining(targetDateTime))
    }

    update()

    const interval = window.setInterval(update, 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [targetDateTime])

  const formattedDate = useMemo(() => {
    const date = new Date(targetDateTime)

    if (!Number.isFinite(date.getTime())) {
      return null
    }

    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date)
  }, [targetDateTime])

  if (remaining.completed) {
    return (
      <section className="card">
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="mt-3 text-3xl font-bold text-brand-600 dark:text-brand-400">
            Time is up
          </p>

          {formattedDate && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {formattedDate}
            </p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="card">
      <div className="mb-5 text-center">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {title}
        </p>

        {formattedDate && (
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Target: {formattedDate}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <TimeBlock value={remaining.days} label="Days" />
        <TimeBlock value={remaining.hours} label="Hours" />
        <TimeBlock value={remaining.minutes} label="Minutes" />

        {showSeconds && (
          <TimeBlock value={remaining.seconds} label="Seconds" />
        )}
      </div>
    </section>
  )
}
