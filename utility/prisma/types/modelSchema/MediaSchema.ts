import { z } from 'zod';
import { MediaStateSchema } from '../inputTypeSchemas/MediaStateSchema'

/////////////////////////////////////////
// MEDIA SCHEMA
/////////////////////////////////////////

export const MediaSchema = z.object({
  state: MediaStateSchema,
  id: z.number().int(),
  name: z.string(),
  rawPath: z.string(),
  path: z.string().nullable(),
  durationSeconds: z.number().int(),
})

export type Media = z.infer<typeof MediaSchema>

export default MediaSchema;
