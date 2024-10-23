import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataCreateManyFieldInputSchema } from './MetadataCreateManyFieldInputSchema';

export const MetadataCreateManyFieldInputEnvelopeSchema: z.ZodType<Prisma.MetadataCreateManyFieldInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MetadataCreateManyFieldInputSchema),z.lazy(() => MetadataCreateManyFieldInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default MetadataCreateManyFieldInputEnvelopeSchema;
