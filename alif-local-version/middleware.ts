import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("auth-token") // Replace with your actual auth check
  const isAppRoute = request.nextUrl.pathname.startsWith("/app")
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth")

  // If user is authenticated and tries to access auth pages, redirect to app
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/app", request.url))
  }

  // If user is not authenticated and tries to access app pages, redirect to login
  if (!isAuthenticated && isAppRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/app/:path*", "/auth/:path*"],
}

