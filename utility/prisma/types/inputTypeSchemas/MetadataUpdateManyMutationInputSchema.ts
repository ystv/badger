import type { Prisma } from '../../client';

import { z } from 'zod';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const MetadataUpdateManyMutationInputSchema: z.ZodType<Prisma.MetadataUpdateManyMutationInput> = z.object({
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export default MetadataUpdateManyMutationInputSchema;
