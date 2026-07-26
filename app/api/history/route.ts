import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth/lib/options"
import connectDB from "@/lib/mongodb"
import DocumentAnalysis from "@/models/DocumentAnalysis"
import EmailAnalysis from "@/models/EmailAnalysis"
import { guestStorage } from "@/lib/guest-storage"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // "document" | "email" | "all"
    const search = searchParams.get("search") || ""
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    if (session?.user?.id) {
      // Fetch from MongoDB for authenticated users
      await connectDB()

      let documents: unknown[] = []
      let emails: unknown[] = []

      if (type === "document" || type === "all") {
        const docQuery = DocumentAnalysis.find({ userId: session.user.id })
          .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
        
        if (search) {
          docQuery.where({
            $or: [
              { fileName: { $regex: search, $options: "i" } },
              { summary: { $regex: search, $options: "i" } },
            ],
          })
        }
        
        documents = await docQuery.lean()
      }

      if (type === "email" || type === "all") {
        const emailQuery = EmailAnalysis.find({ userId: session.user.id })
          .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
        
        if (search) {
          emailQuery.where({
            $or: [
              { subject: { $regex: search, $options: "i" } },
              { category: { $regex: search, $options: "i" } },
            ],
          })
        }
        
        emails = await emailQuery.lean()
      }

      return NextResponse.json({
        success: true,
        data: {
          documents,
          emails,
        },
      })
    } else {
      // Fetch from localStorage for guest users
      let documents = guestStorage.getDocuments()
      let emails = guestStorage.getEmails()

      if (search) {
        documents = documents.filter(
          (doc) =>
            doc.fileName?.toLowerCase().includes(search.toLowerCase()) ||
            doc.summary.toLowerCase().includes(search.toLowerCase())
        )
        emails = emails.filter(
          (email) =>
            email.subject?.toLowerCase().includes(search.toLowerCase()) ||
            email.category.toLowerCase().includes(search.toLowerCase())
        )
      }

      if (sortBy === "createdAt") {
        documents.sort((a, b) =>
          sortOrder === "desc"
            ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        emails.sort((a, b) =>
          sortOrder === "desc"
            ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      }

      return NextResponse.json({
        success: true,
        data: {
          documents,
          emails,
        },
      })
    }
  } catch (error) {
    console.error("History API error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch history" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const type = searchParams.get("type") // "document" | "email"

    if (!id || !type) {
      return NextResponse.json(
        { success: false, error: "Missing id or type" },
        { status: 400 }
      )
    }

    if (session?.user?.id) {
      // Delete from MongoDB for authenticated users
      await connectDB()

      if (type === "document") {
        await DocumentAnalysis.findOneAndDelete({
          _id: id,
          userId: session.user.id,
        })
      } else if (type === "email") {
        await EmailAnalysis.findOneAndDelete({
          _id: id,
          userId: session.user.id,
        })
      }
    } else {
      // Delete from localStorage for guest users
      if (type === "document") {
        guestStorage.deleteDocument(id)
      } else if (type === "email") {
        guestStorage.deleteEmail(id)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("History delete error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete" },
      { status: 500 }
    )
  }
}
