import mongoose, { Schema, Model } from "mongoose"

export interface IDocumentAnalysis {
  userId: string
  fileName?: string
  originalText: string
  summary: string
  keyPoints: string[]
  actionItems: string[]
  keywords: string[]
  readingTime: number
  tone: string
  language: string
  createdAt: Date
}

const DocumentAnalysisSchema = new Schema<IDocumentAnalysis>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    fileName: {
      type: String,
    },
    originalText: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    keyPoints: {
      type: [String],
      required: true,
    },
    actionItems: {
      type: [String],
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
    readingTime: {
      type: Number,
      required: true,
    },
    tone: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

const DocumentAnalysis: Model<IDocumentAnalysis> =
  mongoose.models.DocumentAnalysis ||
  mongoose.model<IDocumentAnalysis>("DocumentAnalysis", DocumentAnalysisSchema)

export default DocumentAnalysis
