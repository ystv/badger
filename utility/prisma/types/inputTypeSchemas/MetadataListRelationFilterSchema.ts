import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataWhereInputSchema } from './MetadataWhereInputSchema';

export const MetadataListRelationFilterSchema: z.ZodType<Prisma.MetadataListRelationFilter> = z.object({
  every: z.lazy(() => MetadataWhereInputSchema).optional(),
  some: z.lazy(() => MetadataWhereInputSchema).optional(),
  none: z.lazy(() => MetadataWhereInputSchema).optional()
}).strict();

export default MetadataListRelationFilterSchema;
