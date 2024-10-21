import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataSelectSchema } from '../inputTypeSchemas/MetadataSelectSchema';
import { MetadataIncludeSchema } from '../inputTypeSchemas/MetadataIncludeSchema';

export const MetadataArgsSchema: z.ZodType<Prisma.MetadataDefaultArgs> = z.object({
  select: z.lazy(() => MetadataSelectSchema).optional(),
  include: z.lazy(() => MetadataIncludeSchema).optional(),
}).strict();

export default MetadataArgsSchema;
