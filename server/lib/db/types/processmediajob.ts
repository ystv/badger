import * as z from "zod"
import { MediaFileSourceType } from "@prisma/client"

export const ProcessMediaJobModel = z.object({
  id: z.number().int(),
  mediaId: z.number().int(),
  sourceType: z.nativeEnum(MediaFileSourceType),
  source: z.string(),
  base_job_id: z.number().int(),
})
