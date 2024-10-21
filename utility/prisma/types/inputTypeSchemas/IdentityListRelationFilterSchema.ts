import type { Prisma } from '../../client';

import { z } from 'zod';
import { IdentityWhereInputSchema } from './IdentityWhereInputSchema';

export const IdentityListRelationFilterSchema: z.ZodType<Prisma.IdentityListRelationFilter> = z.object({
  every: z.lazy(() => IdentityWhereInputSchema).optional(),
  some: z.lazy(() => IdentityWhereInputSchema).optional(),
  none: z.lazy(() => IdentityWhereInputSchema).optional()
}).strict();

export default IdentityListRelationFilterSchema;
