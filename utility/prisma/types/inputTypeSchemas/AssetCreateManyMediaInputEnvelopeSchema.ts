import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetCreateManyMediaInputSchema } from './AssetCreateManyMediaInputSchema';

export const AssetCreateManyMediaInputEnvelopeSchema: z.ZodType<Prisma.AssetCreateManyMediaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AssetCreateManyMediaInputSchema),z.lazy(() => AssetCreateManyMediaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default AssetCreateManyMediaInputEnvelopeSchema;
