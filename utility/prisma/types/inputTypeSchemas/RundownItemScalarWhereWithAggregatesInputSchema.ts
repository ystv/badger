import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumRundownItemTypeWithAggregatesFilterSchema } from './EnumRundownItemTypeWithAggregatesFilterSchema';
import { RundownItemTypeSchema } from './RundownItemTypeSchema';
import { IntNullableWithAggregatesFilterSchema } from './IntNullableWithAggregatesFilterSchema';

export const RundownItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RundownItemScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RundownItemScalarWhereWithAggregatesInputSchema),z.lazy(() => RundownItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RundownItemScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RundownItemScalarWhereWithAggregatesInputSchema),z.lazy(() => RundownItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rundownId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  durationSeconds: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumRundownItemTypeWithAggregatesFilterSchema),z.lazy(() => RundownItemTypeSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  mediaId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export default RundownItemScalarWhereWithAggregatesInputSchema;
