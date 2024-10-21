import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemCreateManyRundownInputSchema } from './RundownItemCreateManyRundownInputSchema';

export const RundownItemCreateManyRundownInputEnvelopeSchema: z.ZodType<Prisma.RundownItemCreateManyRundownInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RundownItemCreateManyRundownInputSchema),z.lazy(() => RundownItemCreateManyRundownInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default RundownItemCreateManyRundownInputEnvelopeSchema;
