import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';

export const ContinuityItemScalarWhereInputSchema: z.ZodType<Prisma.ContinuityItemScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContinuityItemScalarWhereInputSchema),z.lazy(() => ContinuityItemScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContinuityItemScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContinuityItemScalarWhereInputSchema),z.lazy(() => ContinuityItemScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  showId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  durationSeconds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ytBroadcastID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mediaId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export default ContinuityItemScalarWhereInputSchema;
