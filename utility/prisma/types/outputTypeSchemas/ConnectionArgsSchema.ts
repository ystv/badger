import { z } from 'zod';
import type { Prisma } from '../../client';
import { ConnectionSelectSchema } from '../inputTypeSchemas/ConnectionSelectSchema';
import { ConnectionIncludeSchema } from '../inputTypeSchemas/ConnectionIncludeSchema';

export const ConnectionArgsSchema: z.ZodType<Prisma.ConnectionDefaultArgs> = z.object({
  select: z.lazy(() => ConnectionSelectSchema).optional(),
  include: z.lazy(() => ConnectionIncludeSchema).optional(),
}).strict();

export default ConnectionArgsSchema;
