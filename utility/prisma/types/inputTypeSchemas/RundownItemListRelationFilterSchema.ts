import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemWhereInputSchema } from './RundownItemWhereInputSchema';

export const RundownItemListRelationFilterSchema: z.ZodType<Prisma.RundownItemListRelationFilter> = z.object({
  every: z.lazy(() => RundownItemWhereInputSchema).optional(),
  some: z.lazy(() => RundownItemWhereInputSchema).optional(),
  none: z.lazy(() => RundownItemWhereInputSchema).optional()
}).strict();

export default RundownItemListRelationFilterSchema;
