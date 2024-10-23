import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataTargetTypeSchema } from './MetadataTargetTypeSchema';
import { NestedEnumMetadataTargetTypeFilterSchema } from './NestedEnumMetadataTargetTypeFilterSchema';

export const EnumMetadataTargetTypeFilterSchema: z.ZodType<Prisma.EnumMetadataTargetTypeFilter> = z.object({
  equals: z.lazy(() => MetadataTargetTypeSchema).optional(),
  in: z.lazy(() => MetadataTargetTypeSchema).array().optional(),
  notIn: z.lazy(() => MetadataTargetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => MetadataTargetTypeSchema),z.lazy(() => NestedEnumMetadataTargetTypeFilterSchema) ]).optional(),
}).strict();

export default EnumMetadataTargetTypeFilterSchema;
