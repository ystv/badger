import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataCreateManyMediaInputSchema } from './MetadataCreateManyMediaInputSchema';

export const MetadataCreateManyMediaInputEnvelopeSchema: z.ZodType<Prisma.MetadataCreateManyMediaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MetadataCreateManyMediaInputSchema),z.lazy(() => MetadataCreateManyMediaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default MetadataCreateManyMediaInputEnvelopeSchema;
