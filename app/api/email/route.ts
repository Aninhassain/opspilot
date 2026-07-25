import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid email input" },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Gemini API key not configured" },
        { status: 500 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

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

    const result = await model.generateContent(prompt)
    const response = await result.response
    const responseText = response.text()

    // Parse the JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response")
    }

    const analysis = JSON.parse(jsonMatch[0])

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
