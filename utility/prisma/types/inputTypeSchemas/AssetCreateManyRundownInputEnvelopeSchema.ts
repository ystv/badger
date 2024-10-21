import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetCreateManyRundownInputSchema } from './AssetCreateManyRundownInputSchema';

export const AssetCreateManyRundownInputEnvelopeSchema: z.ZodType<Prisma.AssetCreateManyRundownInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AssetCreateManyRundownInputSchema),z.lazy(() => AssetCreateManyRundownInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default AssetCreateManyRundownInputEnvelopeSchema;
