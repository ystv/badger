import * as z from "zod"

export const ShowModel = z.object({
  id: z.number().int(),
  name: z.string(),
  start: z.date(),
})
