import mongoose, { Schema, Model } from "mongoose"

export interface IEmailAnalysis {
  userId: string
  subject?: string
  emailContent: string
  category: string
  priority: string
  sentiment: string
  suggestedReply: string
  spamProbability: number
  isSpam: boolean
  actionItems: string[]
  createdAt: Date
}

const EmailAnalysisSchema = new Schema<IEmailAnalysis>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    subject: {
      type: String,
    },
    emailContent: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    sentiment: {
      type: String,
      required: true,
    },
    suggestedReply: {
      type: String,
      required: true,
    },
    spamProbability: {
      type: Number,
      required: true,
    },
    isSpam: {
      type: Boolean,
      required: true,
    },
    actionItems: {
      type: [String],
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

const EmailAnalysis: Model<IEmailAnalysis> =
  mongoose.models.EmailAnalysis ||
  mongoose.model<IEmailAnalysis>("EmailAnalysis", EmailAnalysisSchema)

export default EmailAnalysis
