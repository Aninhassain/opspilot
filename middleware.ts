import { NextResponse } from "next/server"

export function middleware(request: Request) {
  const url = new URL(request.url)
  const pathname = url.pathname

  // Protect these routes - require authentication
  const protectedRoutes = ["/dashboard/profile", "/dashboard/history", "/dashboard/favorites", "/dashboard/settings"]

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // For now, allow access - we'll handle auth in the pages themselves
    // This avoids MongoDB loading in edge runtime
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
