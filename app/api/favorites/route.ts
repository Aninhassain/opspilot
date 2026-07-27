import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const favoriteSchema = z.object({
  analysisId: z.string(),
  type: z.enum(["document", "email"]),
})

// Favorites require persistent storage, which this application intentionally does not use.
export async function GET() {
  return NextResponse.json({ success: true, data: [] })
}

export async function POST(request: NextRequest) {
  try {
    const favorite = favoriteSchema.parse(await request.json())
    return NextResponse.json({
      success: true,
      data: { ...favorite, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
    })
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid favorite" },
      { status: 400 }
    )
  }
}

export async function DELETE() {
  return NextResponse.json({ success: true })
}
