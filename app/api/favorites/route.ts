import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import connectDB from "@/lib/mongodb"
import Favorite from "@/models/Favorite"
import { guestStorage } from "@/lib/guest-storage"
import { z } from "zod"

const favoriteSchema = z.object({
  analysisId: z.string(),
  type: z.enum(["document", "email"]),
})

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (session?.userId) {
      // Fetch from MongoDB for authenticated users
      await connectDB()
      const favorites = await Favorite.find({ userId: session.userId })
        .sort({ createdAt: -1 })
        .lean()

      return NextResponse.json({
        success: true,
        data: favorites,
      })
    } else {
      // Fetch from localStorage for guest users
      const favorites = guestStorage.getFavorites()

      return NextResponse.json({
        success: true,
        data: favorites,
      })
    }
  } catch (error) {
    console.error("Favorites API error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch favorites" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const body = await request.json()
    const validatedData = favoriteSchema.parse(body)

    if (session?.userId) {
      // Save to MongoDB for authenticated users
      await connectDB()

      const existingFavorite = await Favorite.findOne({
        userId: session.userId,
        analysisId: validatedData.analysisId,
      })

      if (existingFavorite) {
        return NextResponse.json({
          success: true,
          data: existingFavorite,
          message: "Already favorited",
        })
      }

      const favorite = await Favorite.create({
        userId: session.userId,
        analysisId: validatedData.analysisId,
        type: validatedData.type,
      })

      return NextResponse.json({
        success: true,
        data: favorite,
      })
    } else {
      // Save to localStorage for guest users
      const existing = guestStorage.isFavorite(validatedData.analysisId)

      if (existing) {
        return NextResponse.json({
          success: true,
          message: "Already favorited",
        })
      }

      const favorite = guestStorage.addFavorite(
        validatedData.analysisId,
        validatedData.type
      )

      return NextResponse.json({
        success: true,
        data: favorite,
      })
    }
  } catch (error) {
    console.error("Favorites POST error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to add favorite" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const analysisId = searchParams.get("analysisId")

    if (!analysisId) {
      return NextResponse.json(
        { success: false, error: "Missing analysisId" },
        { status: 400 }
      )
    }

    if (session?.userId) {
      // Delete from MongoDB for authenticated users
      await connectDB()
      await Favorite.findOneAndDelete({
        userId: session.userId,
        analysisId,
      })
    } else {
      // Delete from localStorage for guest users
      guestStorage.removeFavorite(analysisId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Favorites DELETE error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to remove favorite" },
      { status: 500 }
    )
  }
}
