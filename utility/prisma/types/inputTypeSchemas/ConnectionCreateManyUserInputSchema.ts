import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionTargetSchema } from './ConnectionTargetSchema';

export const ConnectionCreateManyUserInputSchema: z.ZodType<Prisma.ConnectionCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  target: z.lazy(() => ConnectionTargetSchema),
  refreshToken: z.string()
}).strict();

export default ConnectionCreateManyUserInputSchema;
