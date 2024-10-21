import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionCreateManyUserInputSchema } from './ConnectionCreateManyUserInputSchema';

export const ConnectionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ConnectionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ConnectionCreateManyUserInputSchema),z.lazy(() => ConnectionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ConnectionCreateManyUserInputEnvelopeSchema;
