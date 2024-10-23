import type { Prisma } from '../../client';

import { z } from 'zod';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const MetadataCreateManyMediaInputSchema: z.ZodType<Prisma.MetadataCreateManyMediaInput> = z.object({
  id: z.number().int().optional(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  fieldId: z.number().int(),
  showId: z.number().int().optional().nullable(),
  rundownId: z.number().int().optional().nullable()
}).strict();

export default MetadataCreateManyMediaInputSchema;
