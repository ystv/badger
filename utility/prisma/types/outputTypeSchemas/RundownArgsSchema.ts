import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownSelectSchema } from '../inputTypeSchemas/RundownSelectSchema';
import { RundownIncludeSchema } from '../inputTypeSchemas/RundownIncludeSchema';

export const RundownArgsSchema: z.ZodType<Prisma.RundownDefaultArgs> = z.object({
  select: z.lazy(() => RundownSelectSchema).optional(),
  include: z.lazy(() => RundownIncludeSchema).optional(),
}).strict();

export default RundownArgsSchema;
