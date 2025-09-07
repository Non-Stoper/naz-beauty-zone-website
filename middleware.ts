import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only apply middleware to admin routes (except login page)
  if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin") {
    // In a real app, you'd check server-side auth here
    // For now, we'll let the client-side AuthGuard handle it
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
