import type { Prisma } from '../../client';

import { z } from 'zod';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const MetadataCreateManyFieldInputSchema: z.ZodType<Prisma.MetadataCreateManyFieldInput> = z.object({
  id: z.number().int().optional(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  showId: z.number().int().optional().nullable(),
  rundownId: z.number().int().optional().nullable(),
  mediaId: z.number().int().optional().nullable()
}).strict();

export default MetadataCreateManyFieldInputSchema;
