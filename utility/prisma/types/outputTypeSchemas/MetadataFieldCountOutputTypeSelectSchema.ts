import { z } from 'zod';
import type { Prisma } from '../../client';

export const MetadataFieldCountOutputTypeSelectSchema: z.ZodType<Prisma.MetadataFieldCountOutputTypeSelect> = z.object({
  values: z.boolean().optional(),
}).strict();

export default MetadataFieldCountOutputTypeSelectSchema;
