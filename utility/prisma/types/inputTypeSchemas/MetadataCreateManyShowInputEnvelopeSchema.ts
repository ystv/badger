import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataCreateManyShowInputSchema } from './MetadataCreateManyShowInputSchema';

export const MetadataCreateManyShowInputEnvelopeSchema: z.ZodType<Prisma.MetadataCreateManyShowInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MetadataCreateManyShowInputSchema),z.lazy(() => MetadataCreateManyShowInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default MetadataCreateManyShowInputEnvelopeSchema;
