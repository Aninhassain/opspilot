import mongoose, { Schema, Model } from "mongoose"

export interface IFavorite {
  userId: string
  analysisId: string
  type: "document" | "email"
  createdAt: Date
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    analysisId: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["document", "email"],
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

FavoriteSchema.index({ userId: 1, analysisId: 1 }, { unique: true })

const Favorite: Model<IFavorite> =
  mongoose.models.Favorite ||
  mongoose.model<IFavorite>("Favorite", FavoriteSchema)

export default Favorite
