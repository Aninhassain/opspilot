import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth/lib/options"
import connectDB from "@/lib/mongodb"
import DocumentAnalysis from "@/models/DocumentAnalysis"
import User from "@/models/User"
import { documentSchema } from "@/lib/validations/document"
import { guestStorage } from "@/lib/guest-storage"
import { getGeminiService, generateSimulatedResponse } from "@/services/gemini"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const body = await request.json()
    const validatedData = documentSchema.parse(body)

    const gemini = getGeminiService()

    const prompt = `
Analyze the following text and provide:
1. A concise summary (2-3 sentences)
2. 3-5 key points
3. 2-3 action items
4. 5-7 relevant keywords
5. Estimated reading time in minutes
6. Tone of the document (e.g., Professional, Casual, Formal, Friendly, Urgent)
7. Language of the document (e.g., English, Spanish, French, German)

Format your response as JSON with this structure:
{
  "summary": "string",
  "keyPoints": ["string"],
  "actionItems": ["string"],
  "keywords": ["string"],
  "estimatedReadingTime": number,
  "tone": "string",
  "language": "string"
}

Text to analyze:
${validatedData.text}
`

    const responseText = await gemini.generateContent(prompt)
    const analysis = gemini.parseJSONResponse(responseText)

    if (session?.user?.id) {
      // Save to MongoDB for authenticated users
      await connectDB()

      // Ensure user exists
      let user = await User.findById(session.user.id)
      if (!user) {
        user = await User.create({
          name: session.user.name || "User",
          email: session.user.email || "",
          image: session.user.image || undefined,
          provider: "google",
        })
      }

      const documentAnalysis = await DocumentAnalysis.create({
        userId: session.user.id,
        fileName: validatedData.fileName,
        originalText: validatedData.text,
        summary: analysis.summary,
        keyPoints: analysis.keyPoints,
        actionItems: analysis.actionItems,
        keywords: analysis.keywords,
        readingTime: analysis.estimatedReadingTime,
        tone: analysis.tone,
        language: analysis.language,
      })

      return NextResponse.json({
        success: true,
        data: {
          ...analysis,
          id: documentAnalysis._id.toString(),
        },
      })
    } else {
      // Save to localStorage for guest users
      const guestDoc = guestStorage.addDocument({
        fileName: validatedData.fileName,
        originalText: validatedData.text,
        summary: analysis.summary,
        keyPoints: analysis.keyPoints,
        actionItems: analysis.actionItems,
        keywords: analysis.keywords,
        readingTime: analysis.estimatedReadingTime,
        tone: analysis.tone,
        language: analysis.language,
      })

      return NextResponse.json({
        success: true,
        data: {
          ...analysis,
          id: guestDoc.id,
          isGuest: true,
        },
      })
    }
  } catch (error) {
    console.error("Document API error:", error)

    // Fallback to simulated response
    const body = await request.json()
    const simulatedData = generateSimulatedResponse("summarize", body.text)

    return NextResponse.json({
      success: true,
      data: simulatedData,
      usingFallback: true,
    })
  }
}
