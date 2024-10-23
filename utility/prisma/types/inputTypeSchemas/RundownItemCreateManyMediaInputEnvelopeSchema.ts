import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemCreateManyMediaInputSchema } from './RundownItemCreateManyMediaInputSchema';

export const RundownItemCreateManyMediaInputEnvelopeSchema: z.ZodType<Prisma.RundownItemCreateManyMediaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RundownItemCreateManyMediaInputSchema),z.lazy(() => RundownItemCreateManyMediaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default RundownItemCreateManyMediaInputEnvelopeSchema;
