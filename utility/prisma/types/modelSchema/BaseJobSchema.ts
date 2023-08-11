import { z } from 'zod';
import { JobStateSchema } from '../inputTypeSchemas/JobStateSchema'

/////////////////////////////////////////
// BASE JOB SCHEMA
/////////////////////////////////////////

export const BaseJobSchema = z.object({
  state: JobStateSchema,
  id: z.number().int(),
  workerId: z.string().nullable(),
  createdAt: z.coerce.date(),
  startedAt: z.coerce.date().nullable(),
  completedAt: z.coerce.date().nullable(),
  externalJobProvider: z.string().nullable(),
  /**
   * The ID of the job in the external job execution system (e.g. Nomad)
   */
  externalJobID: z.string().nullable(),
})

export type BaseJob = z.infer<typeof BaseJobSchema>

export default BaseJobSchema;
