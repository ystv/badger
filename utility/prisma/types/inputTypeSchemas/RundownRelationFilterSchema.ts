import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownWhereInputSchema } from './RundownWhereInputSchema';

export const RundownRelationFilterSchema: z.ZodType<Prisma.RundownRelationFilter> = z.object({
  is: z.lazy(() => RundownWhereInputSchema).optional(),
  isNot: z.lazy(() => RundownWhereInputSchema).optional()
}).strict();

export default RundownRelationFilterSchema;
