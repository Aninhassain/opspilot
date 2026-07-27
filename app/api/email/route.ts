import { NextRequest, NextResponse } from "next/server"
import { emailSchema } from "@/lib/validations/email"
import { getGeminiService, generateSimulatedResponse } from "@/services/gemini"
import { isEmailAnalysis } from "@/types/analysis"

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
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
  "spamDetection": { "isSpam": boolean, "confidence": number },
  "actionItems": ["string"]
}

Email to analyze:
${validatedData.email}
`
    const analysis = gemini.parseJSONResponse(await gemini.generateContent(prompt))

    if (!isEmailAnalysis(analysis)) {
      throw new Error("Invalid analysis response from AI")
    }

    return NextResponse.json({
      success: true,
      data: { ...analysis, id: crypto.randomUUID() },
    })
  } catch (error) {
    console.error("Email API error:", error)
    return NextResponse.json({
      success: true,
      data: generateSimulatedResponse("email", body.email),
      usingFallback: true,
    })
  }
}
