import { z } from 'zod';
import { AssetTypeSchema } from '../inputTypeSchemas/AssetTypeSchema'
import { MediaStateSchema } from '../inputTypeSchemas/MediaStateSchema'

/////////////////////////////////////////
// ASSET SCHEMA
/////////////////////////////////////////

export const AssetSchema = z.object({
  type: AssetTypeSchema,
  state: MediaStateSchema,
  id: z.number().int(),
  name: z.string(),
  path: z.string().nullable(),
  rundownId: z.number().int(),
})

export type Asset = z.infer<typeof AssetSchema>

export default AssetSchema;
