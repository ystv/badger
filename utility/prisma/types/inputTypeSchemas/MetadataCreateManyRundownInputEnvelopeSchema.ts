import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataCreateManyRundownInputSchema } from './MetadataCreateManyRundownInputSchema';

export const MetadataCreateManyRundownInputEnvelopeSchema: z.ZodType<Prisma.MetadataCreateManyRundownInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MetadataCreateManyRundownInputSchema),z.lazy(() => MetadataCreateManyRundownInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default MetadataCreateManyRundownInputEnvelopeSchema;
