import { z } from 'zod';
import { MediaFileSourceTypeSchema } from '../inputTypeSchemas/MediaFileSourceTypeSchema'

/////////////////////////////////////////
// LOAD ASSET JOB SCHEMA
/////////////////////////////////////////

export const LoadAssetJobSchema = z.object({
  sourceType: MediaFileSourceTypeSchema,
  id: z.number().int(),
  source: z.string(),
  asset_id: z.number().int(),
  base_job_id: z.number().int(),
})

export type LoadAssetJob = z.infer<typeof LoadAssetJobSchema>

export default LoadAssetJobSchema;
