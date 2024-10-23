import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownCreateManyShowInputSchema } from './RundownCreateManyShowInputSchema';

export const RundownCreateManyShowInputEnvelopeSchema: z.ZodType<Prisma.RundownCreateManyShowInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RundownCreateManyShowInputSchema),z.lazy(() => RundownCreateManyShowInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default RundownCreateManyShowInputEnvelopeSchema;
