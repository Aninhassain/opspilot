import { NextResponse } from "next/server"

// Analyses are intentionally not persisted. Clerk provides authentication only.
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      documents: [],
      emails: [],
    },
  })
}

export async function DELETE() {
  return NextResponse.json({ success: true })
}
