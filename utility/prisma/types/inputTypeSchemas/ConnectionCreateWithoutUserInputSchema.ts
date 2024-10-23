import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionTargetSchema } from './ConnectionTargetSchema';

export const ConnectionCreateWithoutUserInputSchema: z.ZodType<Prisma.ConnectionCreateWithoutUserInput> = z.object({
  target: z.lazy(() => ConnectionTargetSchema),
  refreshToken: z.string()
}).strict();

export default ConnectionCreateWithoutUserInputSchema;
