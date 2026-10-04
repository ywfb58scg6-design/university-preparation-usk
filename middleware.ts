import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

type CookieToSet = {
  name: string
  value: string
  options?: Record<string, unknown>
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return response
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },

        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })

          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(
              name,
              value,
              options as Parameters<typeof response.cookies.set>[2]
            )
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  const protectedRoutes = [
    '/dashboard',
    '/journey',
    '/todos',
    '/dates',
    '/calendar',
    '/settings',
    '/setup',
  ]

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  )

  const authRoutes = ['/login', '/register']

  const isAuthRoute = authRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  )

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()

    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)

    return NextResponse.redirect(url)
  }

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone()

    url.pathname = '/dashboard'
    url.search = ''

    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/journey/:path*',
    '/todos/:path*',
    '/dates/:path*',
    '/calendar/:path*',
    '/settings/:path*',
    '/setup/:path*',
    '/login/:path*',
    '/register/:path*',
  ],
}
