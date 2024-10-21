import { z } from 'zod';
import { MetadataValueTypeSchema } from '../inputTypeSchemas/MetadataValueTypeSchema'
import { MetadataTargetTypeSchema } from '../inputTypeSchemas/MetadataTargetTypeSchema'

/////////////////////////////////////////
// METADATA FIELD SCHEMA
/////////////////////////////////////////

export const MetadataFieldSchema = z.object({
  type: MetadataValueTypeSchema,
  target: MetadataTargetTypeSchema,
  id: z.number().int(),
  name: z.string(),
  archived: z.boolean(),
  default: z.boolean(),
})

export type MetadataField = z.infer<typeof MetadataFieldSchema>

export default MetadataFieldSchema;
