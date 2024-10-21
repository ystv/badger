import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';

export const AssetScalarWhereInputSchema: z.ZodType<Prisma.AssetScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AssetScalarWhereInputSchema),z.lazy(() => AssetScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AssetScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AssetScalarWhereInputSchema),z.lazy(() => AssetScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rundownId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  mediaId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export default AssetScalarWhereInputSchema;
