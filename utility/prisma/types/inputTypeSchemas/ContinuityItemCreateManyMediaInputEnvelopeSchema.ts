import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemCreateManyMediaInputSchema } from './ContinuityItemCreateManyMediaInputSchema';

export const ContinuityItemCreateManyMediaInputEnvelopeSchema: z.ZodType<Prisma.ContinuityItemCreateManyMediaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ContinuityItemCreateManyMediaInputSchema),z.lazy(() => ContinuityItemCreateManyMediaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ContinuityItemCreateManyMediaInputEnvelopeSchema;
