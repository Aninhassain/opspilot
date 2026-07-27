import mongoose, { Schema, Model } from "mongoose"

export interface IUser {
  name: string
  email: string
  image?: string
  provider: "google" | "github" | "credentials" | "clerk"
  createdAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["google", "github", "credentials", "clerk"],
      default: "credentials",
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

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User
