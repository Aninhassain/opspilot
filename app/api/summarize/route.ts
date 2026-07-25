import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid text input" },
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

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
