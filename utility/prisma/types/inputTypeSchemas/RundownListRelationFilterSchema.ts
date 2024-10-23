import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownWhereInputSchema } from './RundownWhereInputSchema';

export const RundownListRelationFilterSchema: z.ZodType<Prisma.RundownListRelationFilter> = z.object({
  every: z.lazy(() => RundownWhereInputSchema).optional(),
  some: z.lazy(() => RundownWhereInputSchema).optional(),
  none: z.lazy(() => RundownWhereInputSchema).optional()
}).strict();

export default RundownListRelationFilterSchema;
