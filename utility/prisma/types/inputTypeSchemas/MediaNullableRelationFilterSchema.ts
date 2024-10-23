import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';

export const MediaNullableRelationFilterSchema: z.ZodType<Prisma.MediaNullableRelationFilter> = z.object({
  is: z.lazy(() => MediaWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MediaWhereInputSchema).optional().nullable()
}).strict();

export default MediaNullableRelationFilterSchema;
