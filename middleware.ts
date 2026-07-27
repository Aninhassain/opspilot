import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware((auth, req) => {
  // Protect specific routes
  if (req.nextUrl.pathname.startsWith('/dashboard/profile')) {
    auth().protect()
  }
  if (req.nextUrl.pathname.startsWith('/dashboard/history')) {
    auth().protect()
  }
  if (req.nextUrl.pathname.startsWith('/dashboard/favorites')) {
    auth().protect()
  }
  if (req.nextUrl.pathname.startsWith('/dashboard/settings')) {
    auth().protect()
  }
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
