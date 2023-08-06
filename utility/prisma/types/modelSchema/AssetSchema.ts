import { z } from 'zod';
import { AssetTypeSchema } from '../inputTypeSchemas/AssetTypeSchema'

/////////////////////////////////////////
// ASSET SCHEMA
/////////////////////////////////////////

export const AssetSchema = z.object({
  type: AssetTypeSchema,
  id: z.number().int(),
  name: z.string(),
  rundownId: z.number().int(),
  mediaId: z.number().int(),
})

export type Asset = z.infer<typeof AssetSchema>

export default AssetSchema;
