import type { Prisma } from '../../client';

import { z } from 'zod';

export const AssetUncheckedCreateWithoutRundownInputSchema: z.ZodType<Prisma.AssetUncheckedCreateWithoutRundownInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  category: z.string(),
  order: z.number().int(),
  mediaId: z.number().int()
}).strict();

export default AssetUncheckedCreateWithoutRundownInputSchema;
