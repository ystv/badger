import { z } from 'zod';
import type { Prisma } from '../../client';
import { AssetSelectSchema } from '../inputTypeSchemas/AssetSelectSchema';
import { AssetIncludeSchema } from '../inputTypeSchemas/AssetIncludeSchema';

export const AssetArgsSchema: z.ZodType<Prisma.AssetDefaultArgs> = z.object({
  select: z.lazy(() => AssetSelectSchema).optional(),
  include: z.lazy(() => AssetIncludeSchema).optional(),
}).strict();

export default AssetArgsSchema;
