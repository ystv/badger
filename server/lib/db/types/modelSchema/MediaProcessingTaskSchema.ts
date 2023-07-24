import { z } from 'zod';
import { MediaProcessingTaskStateSchema } from '../inputTypeSchemas/MediaProcessingTaskStateSchema'

/////////////////////////////////////////
// MEDIA PROCESSING TASK SCHEMA
/////////////////////////////////////////

export const MediaProcessingTaskSchema = z.object({
  state: MediaProcessingTaskStateSchema,
  id: z.number().int(),
  media_id: z.number().int(),
  description: z.string(),
  additionalInfo: z.string(),
})

export type MediaProcessingTask = z.infer<typeof MediaProcessingTaskSchema>

export default MediaProcessingTaskSchema;
