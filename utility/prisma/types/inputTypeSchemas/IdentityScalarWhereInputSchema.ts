import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';

export const IdentityScalarWhereInputSchema: z.ZodType<Prisma.IdentityScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IdentityScalarWhereInputSchema),z.lazy(() => IdentityScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IdentityScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IdentityScalarWhereInputSchema),z.lazy(() => IdentityScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identityID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userID: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export default IdentityScalarWhereInputSchema;
