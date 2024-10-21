import { z } from 'zod';

/////////////////////////////////////////
// ASSET SCHEMA
/////////////////////////////////////////

export const AssetSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  category: z.string(),
  order: z.number().int(),
  rundownId: z.number().int(),
  mediaId: z.number().int(),
})

export type Asset = z.infer<typeof AssetSchema>

export default AssetSchema;
