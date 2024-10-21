import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { JobStateSchema } from '../inputTypeSchemas/JobStateSchema'
import { JobTypeSchema } from '../inputTypeSchemas/JobTypeSchema'

/////////////////////////////////////////
// BASE JOB SCHEMA
/////////////////////////////////////////

export const BaseJobSchema = z.object({
  state: JobStateSchema,
  jobType: JobTypeSchema,
  id: z.number().int(),
  workerId: z.string().nullable(),
  createdAt: z.coerce.date(),
  startedAt: z.coerce.date().nullable(),
  completedAt: z.coerce.date().nullable(),
  manuallyTriggered: z.boolean(),
  externalJobProvider: z.string().nullable(),
  /**
   * The ID of the job in the external job execution system (e.g. Nomad)
   */
  externalJobID: z.string().nullable(),
  /**
   * [JobPayload]
   */
  jobPayload: JsonValueSchema,
})

export type BaseJob = z.infer<typeof BaseJobSchema>

export default BaseJobSchema;
