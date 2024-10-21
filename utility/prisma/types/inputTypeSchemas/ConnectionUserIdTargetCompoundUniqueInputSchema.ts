import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionTargetSchema } from './ConnectionTargetSchema';

export const ConnectionUserIdTargetCompoundUniqueInputSchema: z.ZodType<Prisma.ConnectionUserIdTargetCompoundUniqueInput> = z.object({
  userId: z.number(),
  target: z.lazy(() => ConnectionTargetSchema)
}).strict();

export default ConnectionUserIdTargetCompoundUniqueInputSchema;
