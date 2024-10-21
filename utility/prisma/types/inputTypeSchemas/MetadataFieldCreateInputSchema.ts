import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataValueTypeSchema } from './MetadataValueTypeSchema';
import { MetadataTargetTypeSchema } from './MetadataTargetTypeSchema';
import { MetadataCreateNestedManyWithoutFieldInputSchema } from './MetadataCreateNestedManyWithoutFieldInputSchema';

export const MetadataFieldCreateInputSchema: z.ZodType<Prisma.MetadataFieldCreateInput> = z.object({
  name: z.string(),
  type: z.lazy(() => MetadataValueTypeSchema),
  target: z.lazy(() => MetadataTargetTypeSchema),
  archived: z.boolean().optional(),
  default: z.boolean().optional(),
  values: z.lazy(() => MetadataCreateNestedManyWithoutFieldInputSchema).optional()
}).strict();

export default MetadataFieldCreateInputSchema;
