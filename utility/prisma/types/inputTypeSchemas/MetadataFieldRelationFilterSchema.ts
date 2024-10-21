import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataFieldWhereInputSchema } from './MetadataFieldWhereInputSchema';

export const MetadataFieldRelationFilterSchema: z.ZodType<Prisma.MetadataFieldRelationFilter> = z.object({
  is: z.lazy(() => MetadataFieldWhereInputSchema).optional(),
  isNot: z.lazy(() => MetadataFieldWhereInputSchema).optional()
}).strict();

export default MetadataFieldRelationFilterSchema;
