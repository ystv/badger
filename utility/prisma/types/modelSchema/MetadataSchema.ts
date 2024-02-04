import { z } from "zod";
import { InputJsonValue } from "../inputTypeSchemas/InputJsonValue";

/////////////////////////////////////////
// METADATA SCHEMA
/////////////////////////////////////////

export const MetadataSchema = z.object({
  id: z.number().int(),
  value: InputJsonValue,
  fieldId: z.number().int(),
  showId: z.number().int().nullable(),
  rundownId: z.number().int().nullable(),
  mediaId: z.number().int().nullable(),
});

export type Metadata = z.infer<typeof MetadataSchema>;

export default MetadataSchema;
