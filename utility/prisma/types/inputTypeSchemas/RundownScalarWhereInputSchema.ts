import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const RundownScalarWhereInputSchema: z.ZodType<Prisma.RundownScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RundownScalarWhereInputSchema),z.lazy(() => RundownScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RundownScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RundownScalarWhereInputSchema),z.lazy(() => RundownScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  showId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ytBroadcastID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default RundownScalarWhereInputSchema;
