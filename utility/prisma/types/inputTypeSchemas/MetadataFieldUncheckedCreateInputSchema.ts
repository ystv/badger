import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataValueTypeSchema } from './MetadataValueTypeSchema';
import { MetadataTargetTypeSchema } from './MetadataTargetTypeSchema';
import { MetadataUncheckedCreateNestedManyWithoutFieldInputSchema } from './MetadataUncheckedCreateNestedManyWithoutFieldInputSchema';

export const MetadataFieldUncheckedCreateInputSchema: z.ZodType<Prisma.MetadataFieldUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  type: z.lazy(() => MetadataValueTypeSchema),
  target: z.lazy(() => MetadataTargetTypeSchema),
  archived: z.boolean().optional(),
  default: z.boolean().optional(),
  values: z.lazy(() => MetadataUncheckedCreateNestedManyWithoutFieldInputSchema).optional()
}).strict();

export default MetadataFieldUncheckedCreateInputSchema;
