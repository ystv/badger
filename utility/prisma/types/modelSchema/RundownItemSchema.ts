import { z } from 'zod';
import { RundownItemTypeSchema } from '../inputTypeSchemas/RundownItemTypeSchema'

/////////////////////////////////////////
// RUNDOWN ITEM SCHEMA
/////////////////////////////////////////

export const RundownItemSchema = z.object({
  type: RundownItemTypeSchema,
  id: z.number().int(),
  name: z.string(),
  rundownId: z.number().int(),
  order: z.number().int(),
  durationSeconds: z.number().int(),
  notes: z.string(),
  mediaId: z.number().int().nullable(),
})

export type RundownItem = z.infer<typeof RundownItemSchema>

export default RundownItemSchema;
