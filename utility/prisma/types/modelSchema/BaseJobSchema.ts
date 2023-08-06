import { z } from 'zod';
import { JobStateSchema } from '../inputTypeSchemas/JobStateSchema'

/////////////////////////////////////////
// BASE JOB SCHEMA
/////////////////////////////////////////

export const BaseJobSchema = z.object({
  state: JobStateSchema,
  id: z.number().int(),
  workerId: z.string().nullable(),
  startedAt: z.coerce.date().nullable(),
  completedAt: z.coerce.date().nullable(),
})

export type BaseJob = z.infer<typeof BaseJobSchema>

export default BaseJobSchema;
