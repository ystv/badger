import { z } from 'zod';
import type { Prisma } from '../../client';
import { IdentitySelectSchema } from '../inputTypeSchemas/IdentitySelectSchema';
import { IdentityIncludeSchema } from '../inputTypeSchemas/IdentityIncludeSchema';

export const IdentityArgsSchema: z.ZodType<Prisma.IdentityDefaultArgs> = z.object({
  select: z.lazy(() => IdentitySelectSchema).optional(),
  include: z.lazy(() => IdentityIncludeSchema).optional(),
}).strict();

export default IdentityArgsSchema;
