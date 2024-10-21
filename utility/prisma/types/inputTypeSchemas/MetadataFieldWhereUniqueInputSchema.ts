import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataFieldWhereInputSchema } from './MetadataFieldWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumMetadataValueTypeFilterSchema } from './EnumMetadataValueTypeFilterSchema';
import { MetadataValueTypeSchema } from './MetadataValueTypeSchema';
import { EnumMetadataTargetTypeFilterSchema } from './EnumMetadataTargetTypeFilterSchema';
import { MetadataTargetTypeSchema } from './MetadataTargetTypeSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { MetadataListRelationFilterSchema } from './MetadataListRelationFilterSchema';

export const MetadataFieldWhereUniqueInputSchema: z.ZodType<Prisma.MetadataFieldWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => MetadataFieldWhereInputSchema),z.lazy(() => MetadataFieldWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MetadataFieldWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MetadataFieldWhereInputSchema),z.lazy(() => MetadataFieldWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumMetadataValueTypeFilterSchema),z.lazy(() => MetadataValueTypeSchema) ]).optional(),
  target: z.union([ z.lazy(() => EnumMetadataTargetTypeFilterSchema),z.lazy(() => MetadataTargetTypeSchema) ]).optional(),
  archived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  default: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  values: z.lazy(() => MetadataListRelationFilterSchema).optional()
}).strict());

export default MetadataFieldWhereUniqueInputSchema;
