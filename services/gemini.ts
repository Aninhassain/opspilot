import { GoogleGenerativeAI } from "@google/generative-ai"

// List of supported Gemini models in order of preference
const SUPPORTED_MODELS = [
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-pro",
] as const

type SupportedModel = typeof SUPPORTED_MODELS[number]

export class GeminiService {
  private apiKey: string
  private genAI: GoogleGenerativeAI

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("Gemini API key is required")
    }
    this.apiKey = apiKey
    this.genAI = new GoogleGenerativeAI(apiKey)
  }

  /**
   * Try to get a working model from the supported list
   */
  private async getWorkingModel(): Promise<SupportedModel> {
    for (const modelName of SUPPORTED_MODELS) {
      try {
        const model = this.genAI.getGenerativeModel({ model: modelName })
        // Test if the model is available by making a minimal request
        await model.generateContent("test")
        return modelName
      } catch (error) {
        console.warn(`Model ${modelName} not available, trying next...`)
        continue
      }
    }
    throw new Error("No supported Gemini models are available")
  }

  /**
   * Generate content with automatic model fallback
   */
  async generateContent(prompt: string): Promise<string> {
    try {
      const modelName = await this.getWorkingModel()
      const model = this.genAI.getGenerativeModel({ model: modelName })
      
      const result = await model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          throw new Error("Invalid Gemini API key")
        }
        if (error.message.includes("quota") || error.message.includes("rate limit")) {
          throw new Error("Gemini API rate limit exceeded")
        }
        if (error.message.includes("network") || error.message.includes("fetch")) {
          throw new Error("Network error connecting to Gemini API")
        }
      }
      throw new Error(`Gemini API error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
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
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set")
  }

  if (!geminiService) {
    geminiService = new GeminiService(apiKey)
  }

  return geminiService
}

/**
 * Reset the Gemini service (useful for testing or when API key changes)
 */
export function resetGeminiService(): void {
  geminiService = null
}
