export interface DocumentAnalysis {
  summary: string
  keyPoints: string[]
  actionItems: string[]
  keywords: string[]
  estimatedReadingTime: number
  tone: string
  language: string
}

export interface EmailAnalysis {
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

export type AnalysisResponse = DocumentAnalysis | EmailAnalysis

export function isDocumentAnalysis(data: unknown): data is DocumentAnalysis {
  if (typeof data !== 'object' || data === null) {
    return false
  }
  const d = data as Record<string, unknown>
  return (
    typeof d.summary === 'string' &&
    Array.isArray(d.keyPoints) &&
    d.keyPoints.every((kp: unknown) => typeof kp === 'string') &&
    Array.isArray(d.actionItems) &&
    d.actionItems.every((ai: unknown) => typeof ai === 'string') &&
    Array.isArray(d.keywords) &&
    d.keywords.every((kw: unknown) => typeof kw === 'string') &&
    typeof d.estimatedReadingTime === 'number' &&
    typeof d.tone === 'string' &&
    typeof d.language === 'string'
  )
}

export function isEmailAnalysis(data: unknown): data is EmailAnalysis {
  if (typeof data !== 'object' || data === null) {
    return false
  }
  const d = data as Record<string, unknown>
  return (
    typeof d.category === 'string' &&
    typeof d.priority === 'string' &&
    typeof d.sentiment === 'string' &&
    typeof d.suggestedReply === 'string' &&
    typeof d.spamDetection === 'object' &&
    d.spamDetection !== null &&
    typeof (d.spamDetection as Record<string, unknown>).isSpam === 'boolean' &&
    typeof (d.spamDetection as Record<string, unknown>).confidence === 'number' &&
    Array.isArray(d.actionItems) &&
    d.actionItems.every((ai: unknown) => typeof ai === 'string')
  )
}
