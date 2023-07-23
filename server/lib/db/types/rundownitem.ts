import * as z from "zod"
import { RundownItemType } from "@prisma/client"

export const RundownItemModel = z.object({
  id: z.number().int(),
  name: z.string(),
  rundownId: z.number().int(),
  order: z.number().int(),
  durationSeconds: z.number().int(),
  type: z.nativeEnum(RundownItemType),
  notes: z.string(),
})
