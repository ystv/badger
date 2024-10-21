import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFieldSelectSchema } from '../inputTypeSchemas/MetadataFieldSelectSchema';
import { MetadataFieldIncludeSchema } from '../inputTypeSchemas/MetadataFieldIncludeSchema';

export const MetadataFieldArgsSchema: z.ZodType<Prisma.MetadataFieldDefaultArgs> = z.object({
  select: z.lazy(() => MetadataFieldSelectSchema).optional(),
  include: z.lazy(() => MetadataFieldIncludeSchema).optional(),
}).strict();

export default MetadataFieldArgsSchema;
