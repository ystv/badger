import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemCreateManyShowInputSchema } from './ContinuityItemCreateManyShowInputSchema';

export const ContinuityItemCreateManyShowInputEnvelopeSchema: z.ZodType<Prisma.ContinuityItemCreateManyShowInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ContinuityItemCreateManyShowInputSchema),z.lazy(() => ContinuityItemCreateManyShowInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ContinuityItemCreateManyShowInputEnvelopeSchema;
