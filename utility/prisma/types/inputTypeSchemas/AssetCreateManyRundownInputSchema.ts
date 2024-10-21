import type { Prisma } from '../../client';

import { z } from 'zod';

export const AssetCreateManyRundownInputSchema: z.ZodType<Prisma.AssetCreateManyRundownInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  category: z.string(),
  order: z.number().int(),
  mediaId: z.number().int()
}).strict();

export default AssetCreateManyRundownInputSchema;
