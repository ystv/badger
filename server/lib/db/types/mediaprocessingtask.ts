import * as z from "zod"
import { MediaProcessingTaskState } from "@prisma/client"

export const MediaProcessingTaskModel = z.object({
  id: z.number().int(),
  media_id: z.number().int(),
  description: z.string(),
  additionalInfo: z.string(),
  state: z.nativeEnum(MediaProcessingTaskState),
})
