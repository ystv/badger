import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataValueTypeSchema } from './MetadataValueTypeSchema';
import { NestedEnumMetadataValueTypeFilterSchema } from './NestedEnumMetadataValueTypeFilterSchema';

export const EnumMetadataValueTypeFilterSchema: z.ZodType<Prisma.EnumMetadataValueTypeFilter> = z.object({
  equals: z.lazy(() => MetadataValueTypeSchema).optional(),
  in: z.lazy(() => MetadataValueTypeSchema).array().optional(),
  notIn: z.lazy(() => MetadataValueTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MetadataValueTypeSchema),z.lazy(() => NestedEnumMetadataValueTypeFilterSchema) ]).optional(),
}).strict();

export default EnumMetadataValueTypeFilterSchema;
