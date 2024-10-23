import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { IntNullableWithAggregatesFilterSchema } from './IntNullableWithAggregatesFilterSchema';

export const ContinuityItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContinuityItemScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ContinuityItemScalarWhereWithAggregatesInputSchema),z.lazy(() => ContinuityItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContinuityItemScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContinuityItemScalarWhereWithAggregatesInputSchema),z.lazy(() => ContinuityItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  showId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  durationSeconds: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ytBroadcastID: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  mediaId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export default ContinuityItemScalarWhereWithAggregatesInputSchema;
