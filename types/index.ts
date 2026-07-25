export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
}

export interface Document {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  summary?: DocumentSummary
  content?: string
}

export interface DocumentSummary {
  summary: string
  keyPoints: string[]
  actionItems: string[]
  keywords: string[]
  estimatedReadingTime: number
}

export interface EmailAnalysis {
  id: string
  category: string
  priority: string
  sentiment: string
  suggestedReply: string
  spamDetection: {
    isSpam: boolean
    confidence: number
  }
  actionItems: string[]
}

export interface Analytics {
  documentsProcessed: number
  emailsAnalyzed: number
  categories: Record<string, number>
  monthlyUsage: number[]
  responseTimes: number[]
}

export interface Activity {
  id: string
  type: "document" | "email" | "search"
  description: string
  timestamp: Date
}

export interface Settings {
  theme: "light" | "dark" | "system"
  notifications: boolean
  geminiApiKey: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
