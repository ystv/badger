import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataValueTypeSchema } from './MetadataValueTypeSchema';

export const NestedEnumMetadataValueTypeFilterSchema: z.ZodType<Prisma.NestedEnumMetadataValueTypeFilter> = z.object({
  equals: z.lazy(() => MetadataValueTypeSchema).optional(),
  in: z.lazy(() => MetadataValueTypeSchema).array().optional(),
  notIn: z.lazy(() => MetadataValueTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MetadataValueTypeSchema),z.lazy(() => NestedEnumMetadataValueTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumMetadataValueTypeFilterSchema;
