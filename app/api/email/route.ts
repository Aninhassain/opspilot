import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import connectDB from "@/lib/mongodb"
import EmailAnalysis from "@/models/EmailAnalysis"
import User from "@/models/User"
import { emailSchema } from "@/lib/validations/email"
import { guestStorage } from "@/lib/guest-storage"
import { getGeminiService, generateSimulatedResponse } from "@/services/gemini"
import { isEmailAnalysis } from "@/types/analysis"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const body = await request.json()
    const validatedData = emailSchema.parse(body)

    const gemini = getGeminiService()

    const prompt = `
Analyze the following email and provide:
1. Category (Work, Personal, Promotional, Spam, Urgent, Newsletter)
2. Priority (Low, Medium, High, Critical)
3. Sentiment (Positive, Neutral, Negative)
4. A suggested reply (professional and appropriate)
5. Spam detection (isSpam: boolean, confidence: number 0-100)
6. 2-3 action items if applicable

Format your response as JSON with this structure:
{
  "category": "string",
  "priority": "string",
  "sentiment": "string",
  "suggestedReply": "string",
  "spamDetection": {
    "isSpam": boolean,
    "confidence": number
  },
  "actionItems": ["string"]
}

Email to analyze:
${validatedData.email}
`

    const responseText = await gemini.generateContent(prompt)
    const analysis = gemini.parseJSONResponse(responseText)

    if (!isEmailAnalysis(analysis)) {
      throw new Error("Invalid analysis response from AI")
    }

    // Type assertion after validation
    const validatedAnalysis: import("@/types/analysis").EmailAnalysis = analysis

    if (session?.userId) {
      // Save to MongoDB for authenticated users
      await connectDB()

      // Ensure user exists
      let user = await User.findById(session.userId)
      if (!user) {
        user = await User.create({
          name: "User",
          email: "",
          image: undefined,
          provider: "clerk",
        })
      }

      const emailAnalysis = await EmailAnalysis.create({
        userId: session.userId,
        subject: validatedData.subject,
        emailContent: validatedData.email,
        category: validatedAnalysis.category,
        priority: validatedAnalysis.priority,
        sentiment: validatedAnalysis.sentiment,
        suggestedReply: validatedAnalysis.suggestedReply,
        spamProbability: validatedAnalysis.spamDetection.confidence,
        isSpam: validatedAnalysis.spamDetection.isSpam,
        actionItems: validatedAnalysis.actionItems,
      })

      return NextResponse.json({
        success: true,
        data: {
          ...validatedAnalysis,
          id: emailAnalysis._id.toString(),
        },
      })
    } else {
      // Save to localStorage for guest users
      const guestEmail = guestStorage.addEmail({
        subject: validatedData.subject,
        emailContent: validatedData.email,
        category: validatedAnalysis.category,
        priority: validatedAnalysis.priority,
        sentiment: validatedAnalysis.sentiment,
        suggestedReply: validatedAnalysis.suggestedReply,
        spamProbability: validatedAnalysis.spamDetection.confidence,
        isSpam: validatedAnalysis.spamDetection.isSpam,
        actionItems: validatedAnalysis.actionItems,
      })

      return NextResponse.json({
        success: true,
        data: {
          ...validatedAnalysis,
          id: guestEmail.id,
          isGuest: true,
        },
      })
    }
  } catch (error) {
    console.error("Email API error:", error)

    // Fallback to simulated response
    const body = await request.json()
    const simulatedData = generateSimulatedResponse("email", body.email)

    return NextResponse.json({
      success: true,
      data: simulatedData,
      usingFallback: true,
    })
  }
}
