import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowWithDurationWhereInputSchema } from './ShowWithDurationWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const ShowWithDurationWhereUniqueInputSchema: z.ZodType<Prisma.ShowWithDurationWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ShowWithDurationWhereInputSchema),z.lazy(() => ShowWithDurationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowWithDurationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowWithDurationWhereInputSchema),z.lazy(() => ShowWithDurationWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  start: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  durationSeconds: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  end: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  version: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  ytStreamID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ytBroadcastID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export default ShowWithDurationWhereUniqueInputSchema;
