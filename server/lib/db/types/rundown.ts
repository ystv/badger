import * as z from "zod"

export const RundownModel = z.object({
  id: z.number().int(),
  name: z.string(),
  showId: z.number().int(),
  order: z.number().int(),
})
