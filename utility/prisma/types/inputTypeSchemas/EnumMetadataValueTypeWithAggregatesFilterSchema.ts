import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataValueTypeSchema } from './MetadataValueTypeSchema';
import { NestedEnumMetadataValueTypeWithAggregatesFilterSchema } from './NestedEnumMetadataValueTypeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumMetadataValueTypeFilterSchema } from './NestedEnumMetadataValueTypeFilterSchema';

export const EnumMetadataValueTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMetadataValueTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MetadataValueTypeSchema).optional(),
  in: z.lazy(() => MetadataValueTypeSchema).array().optional(),
  notIn: z.lazy(() => MetadataValueTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MetadataValueTypeSchema),z.lazy(() => NestedEnumMetadataValueTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMetadataValueTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMetadataValueTypeFilterSchema).optional()
}).strict();

export default EnumMetadataValueTypeWithAggregatesFilterSchema;
