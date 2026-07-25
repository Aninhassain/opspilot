import { NextRequest, NextResponse } from "next/server"
import { getGeminiService } from "@/services/gemini"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid text input" },
        { status: 400 }
      )
    }

    const gemini = getGeminiService()

    const prompt = `
Analyze the following text and provide:
1. A concise summary (2-3 sentences)
2. 3-5 key points
3. 2-3 action items
4. 5-7 relevant keywords
5. Estimated reading time in minutes

Format your response as JSON with this structure:
{
  "summary": "string",
  "keyPoints": ["string"],
  "actionItems": ["string"],
  "keywords": ["string"],
  "estimatedReadingTime": number
}

Text to analyze:
${text}
`

    const responseText = await gemini.generateContent(prompt)
    const analysis = gemini.parseJSONResponse(responseText)

    return NextResponse.json({
      success: true,
      data: analysis,
    })
  } catch (error) {
    console.error("Summarize API error:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to summarize text" 
      },
      { status: 500 }
    )
  }
}
