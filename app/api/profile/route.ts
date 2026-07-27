import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"

export async function GET() {
  try {
    const user = await currentUser()

    return NextResponse.json({
      success: true,
      data: {
        user: user
          ? {
              name: user.fullName || user.username || "User",
              email: user.primaryEmailAddress?.emailAddress ?? null,
              image: user.imageUrl,
              provider: "clerk",
              createdAt: user.createdAt,
            }
          : {
              name: "Guest User",
              email: null,
              image: null,
              provider: "guest",
              createdAt: null,
            },
        stats: {
          documentsProcessed: 0,
          emailsAnalyzed: 0,
          favorites: 0,
        },
      },
    })
  } catch (error) {
    console.error("Profile API error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch profile" },
      { status: 500 }
    )
  }
}
