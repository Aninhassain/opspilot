import { z } from "zod"

export const emailSchema = z.object({
  email: z.string().min(1, "Email content is required").max(10000, "Email is too long"),
  subject: z.string().optional(),
})

export type EmailInput = z.infer<typeof emailSchema>
