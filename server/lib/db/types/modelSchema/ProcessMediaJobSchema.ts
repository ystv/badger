import { z } from 'zod';
import { MediaFileSourceTypeSchema } from '../inputTypeSchemas/MediaFileSourceTypeSchema'

/////////////////////////////////////////
// PROCESS MEDIA JOB SCHEMA
/////////////////////////////////////////

export const ProcessMediaJobSchema = z.object({
  sourceType: MediaFileSourceTypeSchema,
  id: z.number().int(),
  mediaId: z.number().int(),
  source: z.string(),
  base_job_id: z.number().int(),
})

export type ProcessMediaJob = z.infer<typeof ProcessMediaJobSchema>

export default ProcessMediaJobSchema;
