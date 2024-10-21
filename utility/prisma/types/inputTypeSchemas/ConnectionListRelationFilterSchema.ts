import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionWhereInputSchema } from './ConnectionWhereInputSchema';

export const ConnectionListRelationFilterSchema: z.ZodType<Prisma.ConnectionListRelationFilter> = z.object({
  every: z.lazy(() => ConnectionWhereInputSchema).optional(),
  some: z.lazy(() => ConnectionWhereInputSchema).optional(),
  none: z.lazy(() => ConnectionWhereInputSchema).optional()
}).strict();

export default ConnectionListRelationFilterSchema;
