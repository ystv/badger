import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataTargetTypeSchema } from './MetadataTargetTypeSchema';

export const NestedEnumMetadataTargetTypeFilterSchema: z.ZodType<Prisma.NestedEnumMetadataTargetTypeFilter> = z.object({
  equals: z.lazy(() => MetadataTargetTypeSchema).optional(),
  in: z.lazy(() => MetadataTargetTypeSchema).array().optional(),
  notIn: z.lazy(() => MetadataTargetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MetadataTargetTypeSchema),z.lazy(() => NestedEnumMetadataTargetTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumMetadataTargetTypeFilterSchema;
