import { z } from 'zod';
import type { Prisma } from '../../client';
import { ContinuityItemSelectSchema } from '../inputTypeSchemas/ContinuityItemSelectSchema';
import { ContinuityItemIncludeSchema } from '../inputTypeSchemas/ContinuityItemIncludeSchema';

export const ContinuityItemArgsSchema: z.ZodType<Prisma.ContinuityItemDefaultArgs> = z.object({
  select: z.lazy(() => ContinuityItemSelectSchema).optional(),
  include: z.lazy(() => ContinuityItemIncludeSchema).optional(),
}).strict();

export default ContinuityItemArgsSchema;
