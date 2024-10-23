import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'

/////////////////////////////////////////
// METADATA SCHEMA
/////////////////////////////////////////

export const MetadataSchema = z.object({
  id: z.number().int(),
  /**
   * The metadata value. The type depends on the field value type:
   * Text, LongText, URL: String
   * Media: object - see the type definition
   * [MetadataValue]
   */
  value: JsonValueSchema,
  fieldId: z.number().int(),
  showId: z.number().int().nullable(),
  rundownId: z.number().int().nullable(),
  mediaId: z.number().int().nullable(),
})

export type Metadata = z.infer<typeof MetadataSchema>

export default MetadataSchema;
