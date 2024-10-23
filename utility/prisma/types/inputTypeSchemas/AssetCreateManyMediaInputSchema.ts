import type { Prisma } from '../../client';

import { z } from 'zod';

export const AssetCreateManyMediaInputSchema: z.ZodType<Prisma.AssetCreateManyMediaInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  category: z.string(),
  order: z.number().int(),
  rundownId: z.number().int()
}).strict();

export default AssetCreateManyMediaInputSchema;
