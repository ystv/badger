import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';

export const ShowScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShowScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ShowScalarWhereWithAggregatesInputSchema),z.lazy(() => ShowScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowScalarWhereWithAggregatesInputSchema),z.lazy(() => ShowScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  start: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  version: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ytStreamID: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ytBroadcastID: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default ShowScalarWhereWithAggregatesInputSchema;
