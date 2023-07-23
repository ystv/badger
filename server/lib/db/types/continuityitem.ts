import * as z from "zod"

export const ContinuityItemModel = z.object({
  id: z.number().int(),
  name: z.string(),
  order: z.number().int(),
  showId: z.number().int(),
  durationSeconds: z.number().int(),
})
