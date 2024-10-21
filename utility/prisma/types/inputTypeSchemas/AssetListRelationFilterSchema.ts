import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetWhereInputSchema } from './AssetWhereInputSchema';

export const AssetListRelationFilterSchema: z.ZodType<Prisma.AssetListRelationFilter> = z.object({
  every: z.lazy(() => AssetWhereInputSchema).optional(),
  some: z.lazy(() => AssetWhereInputSchema).optional(),
  none: z.lazy(() => AssetWhereInputSchema).optional()
}).strict();

export default AssetListRelationFilterSchema;
