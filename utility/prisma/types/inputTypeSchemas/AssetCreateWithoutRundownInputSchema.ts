import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaCreateNestedOneWithoutAssetsInputSchema } from './MediaCreateNestedOneWithoutAssetsInputSchema';

export const AssetCreateWithoutRundownInputSchema: z.ZodType<Prisma.AssetCreateWithoutRundownInput> = z.object({
  name: z.string(),
  category: z.string(),
  order: z.number().int(),
  media: z.lazy(() => MediaCreateNestedOneWithoutAssetsInputSchema)
}).strict();

export default AssetCreateWithoutRundownInputSchema;
