import { NextRequest, NextResponse } from "next/server"
import { documentSchema } from "@/lib/validations/document"
import { getGeminiService, generateSimulatedResponse } from "@/services/gemini"
import { isDocumentAnalysis } from "@/types/analysis"

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
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
    const analysis = gemini.parseJSONResponse(await gemini.generateContent(prompt))

    if (!isDocumentAnalysis(analysis)) {
      throw new Error("Invalid analysis response from AI")
    }

    return NextResponse.json({
      success: true,
      data: { ...analysis, id: crypto.randomUUID() },
    })
  } catch (error) {
    console.error("Document API error:", error)
    return NextResponse.json({
      success: true,
      data: generateSimulatedResponse("summarize", body.text),
      usingFallback: true,
    })
  }
}
