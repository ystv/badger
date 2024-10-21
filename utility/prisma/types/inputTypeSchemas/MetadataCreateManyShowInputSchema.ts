import type { Prisma } from '../../client';

import { z } from 'zod';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const MetadataCreateManyShowInputSchema: z.ZodType<Prisma.MetadataCreateManyShowInput> = z.object({
  id: z.number().int().optional(),
  value: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  fieldId: z.number().int(),
  rundownId: z.number().int().optional().nullable(),
  mediaId: z.number().int().optional().nullable()
}).strict();

export default MetadataCreateManyShowInputSchema;
