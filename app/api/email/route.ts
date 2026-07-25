import { NextRequest, NextResponse } from "next/server"
import { getGeminiService } from "@/services/gemini"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid email input" },
        { status: 400 }
      )
    }

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
${email}
`

    const responseText = await gemini.generateContent(prompt)
    const analysis = gemini.parseJSONResponse(responseText)

    return NextResponse.json({
      success: true,
      data: analysis,
    })
  } catch (error) {
    console.error("Email API error:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to analyze email" 
      },
      { status: 500 }
    )
  }
}
