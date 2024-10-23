import type { Prisma } from '../../client';

import { z } from 'zod';
import { IdentityCreateManyUserInputSchema } from './IdentityCreateManyUserInputSchema';

export const IdentityCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.IdentityCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IdentityCreateManyUserInputSchema),z.lazy(() => IdentityCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default IdentityCreateManyUserInputEnvelopeSchema;
