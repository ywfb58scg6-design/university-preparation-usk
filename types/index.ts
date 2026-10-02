export interface Profile {
  id: string
  full_name: string | null
  university: string | null
  faculty: string | null
  target_university: string | null
  target_faculty: string | null
  start_date: string | null
  target_date: string | null
  created_at: string
  updated_at: string
}

export interface Todo {
  id: string
  user_id: string
  title: string
  description: string | null
  completed: boolean
  due_date: string | null
  priority: 'low' | 'medium' | 'high'
  created_at: string
  updated_at: string
}

export interface ImportantDate {
  id: string
  user_id: string
  title: string
  description: string | null
  date: string
  category: 'exam' | 'application' | 'admission' | 'event' | 'other'
  created_at: string
  updated_at: string
}

export interface JourneyEvent {
  id: string
  user_id: string
  title: string
  description: string | null
  event_date: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface DashboardStats {
  totalTodos: number
  completedTodos: number
  pendingTodos: number
  upcomingDates: number
  journeyProgress: number
}

export interface CountdownTarget {
  title: string
  targetDate: string
}
