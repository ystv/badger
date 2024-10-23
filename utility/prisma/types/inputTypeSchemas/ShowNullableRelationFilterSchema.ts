import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';

export const ShowNullableRelationFilterSchema: z.ZodType<Prisma.ShowNullableRelationFilter> = z.object({
  is: z.lazy(() => ShowWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ShowWhereInputSchema).optional().nullable()
}).strict();

export default ShowNullableRelationFilterSchema;
