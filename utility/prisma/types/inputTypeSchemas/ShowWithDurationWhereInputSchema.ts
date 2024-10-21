import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const ShowWithDurationWhereInputSchema: z.ZodType<Prisma.ShowWithDurationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShowWithDurationWhereInputSchema),z.lazy(() => ShowWithDurationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowWithDurationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowWithDurationWhereInputSchema),z.lazy(() => ShowWithDurationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  start: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  durationSeconds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  end: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  version: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ytStreamID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ytBroadcastID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default ShowWithDurationWhereInputSchema;
