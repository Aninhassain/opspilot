import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Document, EmailAnalysis, Activity, Settings } from "@/types"

interface AppState {
  documents: Document[]
  emailAnalyses: EmailAnalysis[]
  activities: Activity[]
  settings: Settings
  
  addDocument: (document: Document) => void
  addEmailAnalysis: (analysis: EmailAnalysis) => void
  addActivity: (activity: Activity) => void
  updateSettings: (settings: Partial<Settings>) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      documents: [],
      emailAnalyses: [],
      activities: [],
      settings: {
        theme: "dark",
        notifications: true,
        geminiApiKey: "",
      },
      
      addDocument: (document) =>
        set((state) => ({
          documents: [...state.documents, document],
        })),
      
      addEmailAnalysis: (analysis) =>
        set((state) => ({
          emailAnalyses: [...state.emailAnalyses, analysis],
        })),
      
      addActivity: (activity) =>
        set((state) => ({
          activities: [...state.activities, activity],
        })),
      
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: "opspilot-storage",
    }
  )
)
