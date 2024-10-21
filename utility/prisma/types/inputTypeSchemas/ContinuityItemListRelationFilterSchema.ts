import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemWhereInputSchema } from './ContinuityItemWhereInputSchema';

export const ContinuityItemListRelationFilterSchema: z.ZodType<Prisma.ContinuityItemListRelationFilter> = z.object({
  every: z.lazy(() => ContinuityItemWhereInputSchema).optional(),
  some: z.lazy(() => ContinuityItemWhereInputSchema).optional(),
  none: z.lazy(() => ContinuityItemWhereInputSchema).optional()
}).strict();

export default ContinuityItemListRelationFilterSchema;
