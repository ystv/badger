import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownItemSelectSchema } from '../inputTypeSchemas/RundownItemSelectSchema';
import { RundownItemIncludeSchema } from '../inputTypeSchemas/RundownItemIncludeSchema';

export const RundownItemArgsSchema: z.ZodType<Prisma.RundownItemDefaultArgs> = z.object({
  select: z.lazy(() => RundownItemSelectSchema).optional(),
  include: z.lazy(() => RundownItemIncludeSchema).optional(),
}).strict();

export default RundownItemArgsSchema;
