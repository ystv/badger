import * as z from "zod"
import { MediaState } from "@prisma/client"

export const MediaModel = z.object({
  id: z.number().int(),
  name: z.string(),
  rawPath: z.string(),
  path: z.string().nullish(),
  durationSeconds: z.number().int(),
  state: z.nativeEnum(MediaState),
  rundownItemID: z.number().int().nullish(),
  continuityItemID: z.number().int().nullish(),
})
