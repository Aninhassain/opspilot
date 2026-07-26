export interface GuestDocumentAnalysis {
  id: string
  fileName?: string
  originalText: string
  summary: string
  keyPoints: string[]
  actionItems: string[]
  keywords: string[]
  readingTime: number
  tone: string
  language: string
  createdAt: string
}

export interface GuestEmailAnalysis {
  id: string
  subject?: string
  emailContent: string
  category: string
  priority: string
  sentiment: string
  suggestedReply: string
  spamProbability: number
  isSpam: boolean
  actionItems: string[]
  createdAt: string
}

export interface GuestFavorite {
  id: string
  analysisId: string
  type: "document" | "email"
  createdAt: string
}

const GUEST_DOCUMENTS_KEY = "guest_documents"
const GUEST_EMAILS_KEY = "guest_emails"
const GUEST_FAVORITES_KEY = "guest_favorites"

export const guestStorage = {
  // Document Analysis
  getDocuments: (): GuestDocumentAnalysis[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(GUEST_DOCUMENTS_KEY)
    return data ? JSON.parse(data) : []
  },

  addDocument: (doc: Omit<GuestDocumentAnalysis, "id" | "createdAt">) => {
    const documents = guestStorage.getDocuments()
    const newDoc: GuestDocumentAnalysis = {
      ...doc,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    documents.unshift(newDoc)
    localStorage.setItem(GUEST_DOCUMENTS_KEY, JSON.stringify(documents))
    return newDoc
  },

  deleteDocument: (id: string) => {
    const documents = guestStorage.getDocuments()
    const filtered = documents.filter((doc) => doc.id !== id)
    localStorage.setItem(GUEST_DOCUMENTS_KEY, JSON.stringify(filtered))
  },

  // Email Analysis
  getEmails: (): GuestEmailAnalysis[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(GUEST_EMAILS_KEY)
    return data ? JSON.parse(data) : []
  },

  addEmail: (email: Omit<GuestEmailAnalysis, "id" | "createdAt">) => {
    const emails = guestStorage.getEmails()
    const newEmail: GuestEmailAnalysis = {
      ...email,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    emails.unshift(newEmail)
    localStorage.setItem(GUEST_EMAILS_KEY, JSON.stringify(emails))
    return newEmail
  },

  deleteEmail: (id: string) => {
    const emails = guestStorage.getEmails()
    const filtered = emails.filter((email) => email.id !== id)
    localStorage.setItem(GUEST_EMAILS_KEY, JSON.stringify(filtered))
  },

  // Favorites
  getFavorites: (): GuestFavorite[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(GUEST_FAVORITES_KEY)
    return data ? JSON.parse(data) : []
  },

  addFavorite: (analysisId: string, type: "document" | "email") => {
    const favorites = guestStorage.getFavorites()
    const exists = favorites.some((fav) => fav.analysisId === analysisId)
    if (exists) return

    const newFavorite: GuestFavorite = {
      id: crypto.randomUUID(),
      analysisId,
      type,
      createdAt: new Date().toISOString(),
    }
    favorites.unshift(newFavorite)
    localStorage.setItem(GUEST_FAVORITES_KEY, JSON.stringify(favorites))
    return newFavorite
  },

  removeFavorite: (analysisId: string) => {
    const favorites = guestStorage.getFavorites()
    const filtered = favorites.filter((fav) => fav.analysisId !== analysisId)
    localStorage.setItem(GUEST_FAVORITES_KEY, JSON.stringify(filtered))
  },

  isFavorite: (analysisId: string): boolean => {
    const favorites = guestStorage.getFavorites()
    return favorites.some((fav) => fav.analysisId === analysisId)
  },

  // Clear all guest data
  clearAll: () => {
    localStorage.removeItem(GUEST_DOCUMENTS_KEY)
    localStorage.removeItem(GUEST_EMAILS_KEY)
    localStorage.removeItem(GUEST_FAVORITES_KEY)
  },
}
