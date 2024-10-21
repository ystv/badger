import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumMetadataValueTypeWithAggregatesFilterSchema } from './EnumMetadataValueTypeWithAggregatesFilterSchema';
import { MetadataValueTypeSchema } from './MetadataValueTypeSchema';
import { EnumMetadataTargetTypeWithAggregatesFilterSchema } from './EnumMetadataTargetTypeWithAggregatesFilterSchema';
import { MetadataTargetTypeSchema } from './MetadataTargetTypeSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';

export const MetadataFieldScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MetadataFieldScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MetadataFieldScalarWhereWithAggregatesInputSchema),z.lazy(() => MetadataFieldScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MetadataFieldScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MetadataFieldScalarWhereWithAggregatesInputSchema),z.lazy(() => MetadataFieldScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumMetadataValueTypeWithAggregatesFilterSchema),z.lazy(() => MetadataValueTypeSchema) ]).optional(),
  target: z.union([ z.lazy(() => EnumMetadataTargetTypeWithAggregatesFilterSchema),z.lazy(() => MetadataTargetTypeSchema) ]).optional(),
  archived: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  default: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export default MetadataFieldScalarWhereWithAggregatesInputSchema;
