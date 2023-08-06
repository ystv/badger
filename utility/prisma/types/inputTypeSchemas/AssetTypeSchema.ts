import { z } from 'zod';

export const AssetTypeSchema = z.enum(['Still','Graphic','SoundEffect','Music']);

export type AssetTypeType = `${z.infer<typeof AssetTypeSchema>}`

export default AssetTypeSchema;
