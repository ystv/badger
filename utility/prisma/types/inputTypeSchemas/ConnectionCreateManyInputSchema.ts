import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionTargetSchema } from './ConnectionTargetSchema';

export const ConnectionCreateManyInputSchema: z.ZodType<Prisma.ConnectionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  target: z.lazy(() => ConnectionTargetSchema),
  refreshToken: z.string()
}).strict();

export default ConnectionCreateManyInputSchema;
