import * as z from "zod"
import { JobState } from "@prisma/client"

export const BaseJobModel = z.object({
  id: z.number().int(),
  workerId: z.string().nullish(),
  state: z.nativeEnum(JobState),
  startedAt: z.date().nullish(),
  completedAt: z.date().nullish(),
})
