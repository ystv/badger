import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';

export const ShowWithDurationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ShowWithDurationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ShowWithDurationScalarWhereWithAggregatesInputSchema),z.lazy(() => ShowWithDurationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowWithDurationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowWithDurationScalarWhereWithAggregatesInputSchema),z.lazy(() => ShowWithDurationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  start: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  durationSeconds: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  end: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  version: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ytStreamID: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ytBroadcastID: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default ShowWithDurationScalarWhereWithAggregatesInputSchema;
