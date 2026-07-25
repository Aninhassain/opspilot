import { GoogleGenerativeAI } from "@google/generative-ai"

// List of supported Gemini models in order of preference (based on user's API key access)
const SUPPORTED_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-2.0-flash",
  "gemini-2.0-flash-001",
  "gemini-2.0-flash-lite",
  "gemini-flash-latest",
  "gemini-pro-latest",
] as const

type SupportedModel = typeof SUPPORTED_MODELS[number]

export class GeminiService {
  private apiKey: string
  private genAI: GoogleGenerativeAI
  private customModel: string | null

  constructor(apiKey: string, customModel: string | null = null) {
    if (!apiKey) {
      throw new Error("Gemini API key is required")
    }
    this.apiKey = apiKey
    this.genAI = new GoogleGenerativeAI(apiKey)
    this.customModel = customModel
  }

  /**
   * Generate content with automatic model fallback
   */
  async generateContent(prompt: string): Promise<string> {
    // If a custom model is specified, use it
    if (this.customModel) {
      try {
        const model = this.genAI.getGenerativeModel({ model: this.customModel })
        const result = await model.generateContent(prompt)
        const response = await result.response
        return response.text()
      } catch (error) {
        console.error(`Custom model ${this.customModel} failed:`, error instanceof Error ? error.message : error)
        throw new Error(`Custom model ${this.customModel} failed. Please check the model name or remove the GEMINI_MODEL environment variable to use auto-detection.`)
      }
    }

    // Try each model in the supported list
    for (const modelName of SUPPORTED_MODELS) {
      try {
        const model = this.genAI.getGenerativeModel({ model: modelName })
        const result = await model.generateContent(prompt)
        const response = await result.response
        console.log(`Successfully used model: ${modelName}`)
        return response.text()
      } catch (error) {
        console.warn(`Model ${modelName} failed, trying next model...`, error instanceof Error ? error.message : error)
        continue
      }
    }
    
    throw new Error(`No supported Gemini models are available. Your API key may not have access to these models. Please check your API key at https://aistudio.google.com/app/apikey and add GEMINI_MODEL=<your-model-name> to your .env.local file to specify a custom model.`)
  }

  /**
   * Parse JSON from AI response
   */
  parseJSONResponse(responseText: string): any {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to parse JSON from AI response")
    }
    return JSON.parse(jsonMatch[0])
  }
}

let geminiService: GeminiService | null = null

/**
 * Get or create the Gemini service singleton
 */
export function getGeminiService(): GeminiService {
  const apiKey = process.env.GEMINI_API_KEY
  const customModel = process.env.GEMINI_MODEL || null
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set")
  }

  if (!geminiService) {
    geminiService = new GeminiService(apiKey, customModel)
  }

  return geminiService
}

/**
 * Reset the Gemini service (useful for testing or when API key changes)
 */
export function resetGeminiService(): void {
  geminiService = null
}

/**
 * Generate simulated response for demo purposes when API fails
 */
export function generateSimulatedResponse(type: 'summarize' | 'email', input: string): any {
  if (type === 'summarize') {
    return {
      summary: "This document discusses key business operations and strategic initiatives. It outlines important priorities and actionable steps for implementation.",
      keyPoints: [
        "Focus on operational efficiency improvements",
        "Implement new AI-powered workflows",
        "Enhance team collaboration and communication",
        "Monitor performance metrics regularly"
      ],
      actionItems: [
        "Review current operational processes",
        "Schedule team training sessions",
        "Set up performance tracking dashboard"
      ],
      keywords: ["operations", "AI", "workflow", "efficiency", "collaboration", "metrics"],
      estimatedReadingTime: Math.ceil(input.split(/\s+/).length / 200),
      tone: "Professional",
      language: "English"
    }
  } else {
    return {
      category: "Work",
      priority: "Medium",
      sentiment: "Neutral",
      suggestedReply: "Thank you for your email. I have received your message and will review it shortly. I'll get back to you with a detailed response by the end of the day.",
      spamDetection: {
        isSpam: false,
        confidence: 95
      },
      actionItems: [
        "Review the email content",
        "Prepare a response",
        "Follow up if needed"
      ]
    }
  }
}
