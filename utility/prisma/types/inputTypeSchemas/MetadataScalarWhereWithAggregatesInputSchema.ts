import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { JsonWithAggregatesFilterSchema } from './JsonWithAggregatesFilterSchema';
import { IntNullableWithAggregatesFilterSchema } from './IntNullableWithAggregatesFilterSchema';

export const MetadataScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MetadataScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MetadataScalarWhereWithAggregatesInputSchema),z.lazy(() => MetadataScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MetadataScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MetadataScalarWhereWithAggregatesInputSchema),z.lazy(() => MetadataScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  value: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  fieldId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  showId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  rundownId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  mediaId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export default MetadataScalarWhereWithAggregatesInputSchema;
