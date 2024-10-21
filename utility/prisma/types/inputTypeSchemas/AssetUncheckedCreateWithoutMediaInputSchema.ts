import type { Prisma } from '../../client';

import { z } from 'zod';

export const AssetUncheckedCreateWithoutMediaInputSchema: z.ZodType<Prisma.AssetUncheckedCreateWithoutMediaInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  category: z.string(),
  order: z.number().int(),
  rundownId: z.number().int()
}).strict();

export default AssetUncheckedCreateWithoutMediaInputSchema;
