import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataValueTypeSchema } from './MetadataValueTypeSchema';
import { MetadataTargetTypeSchema } from './MetadataTargetTypeSchema';

export const MetadataFieldCreateWithoutValuesInputSchema: z.ZodType<Prisma.MetadataFieldCreateWithoutValuesInput> = z.object({
  name: z.string(),
  type: z.lazy(() => MetadataValueTypeSchema),
  target: z.lazy(() => MetadataTargetTypeSchema),
  archived: z.boolean().optional(),
  default: z.boolean().optional()
}).strict();

export default MetadataFieldCreateWithoutValuesInputSchema;
