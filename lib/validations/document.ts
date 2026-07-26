import { z } from "zod"

export const documentSchema = z.object({
  text: z.string().min(1, "Text is required").max(10000, "Text is too long"),
  fileName: z.string().optional(),
})

export type DocumentInput = z.infer<typeof documentSchema>
