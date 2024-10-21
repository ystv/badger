import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const AssetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AssetScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AssetScalarWhereWithAggregatesInputSchema),z.lazy(() => AssetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AssetScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AssetScalarWhereWithAggregatesInputSchema),z.lazy(() => AssetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  rundownId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  mediaId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export default AssetScalarWhereWithAggregatesInputSchema;
