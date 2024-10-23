import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataTargetTypeSchema } from './MetadataTargetTypeSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumMetadataTargetTypeFilterSchema } from './NestedEnumMetadataTargetTypeFilterSchema';

export const NestedEnumMetadataTargetTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMetadataTargetTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MetadataTargetTypeSchema).optional(),
  in: z.lazy(() => MetadataTargetTypeSchema).array().optional(),
  notIn: z.lazy(() => MetadataTargetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MetadataTargetTypeSchema),z.lazy(() => NestedEnumMetadataTargetTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMetadataTargetTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMetadataTargetTypeFilterSchema).optional()
}).strict();

export default NestedEnumMetadataTargetTypeWithAggregatesFilterSchema;
