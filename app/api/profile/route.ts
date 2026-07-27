import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import DocumentAnalysis from "@/models/DocumentAnalysis"
import EmailAnalysis from "@/models/EmailAnalysis"
import Favorite from "@/models/Favorite"
import { guestStorage } from "@/lib/guest-storage"

export async function GET() {
  try {
    const session = await auth()

    if (session?.userId) {
      // Fetch from MongoDB for authenticated users
      await connectDB()

      const user = await User.findById(session.userId).lean()
      const documentCount = await DocumentAnalysis.countDocuments({
        userId: session.userId,
      })
      const emailCount = await EmailAnalysis.countDocuments({
        userId: session.userId,
      })
      const favoriteCount = await Favorite.countDocuments({
        userId: session.userId,
      })

      return NextResponse.json({
        success: true,
        data: {
          user: {
            name: user?.name,
            email: user?.email,
            image: user?.image,
            provider: user?.provider,
            createdAt: user?.createdAt,
          },
          stats: {
            documentsProcessed: documentCount,
            emailsAnalyzed: emailCount,
            favorites: favoriteCount,
          },
        },
      })
    } else {
      // Return guest stats from localStorage
      const documents = guestStorage.getDocuments()
      const emails = guestStorage.getEmails()
      const favorites = guestStorage.getFavorites()

      return NextResponse.json({
        success: true,
        data: {
          user: {
            name: "Guest User",
            email: null,
            image: null,
            provider: "guest",
            createdAt: null,
          },
          stats: {
            documentsProcessed: documents.length,
            emailsAnalyzed: emails.length,
            favorites: favorites.length,
          },
        },
      })
    }
  } catch (error) {
    console.error("Profile API error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch profile" },
      { status: 500 }
    )
  }
}
