import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumMetadataValueTypeFilterSchema } from './EnumMetadataValueTypeFilterSchema';
import { MetadataValueTypeSchema } from './MetadataValueTypeSchema';
import { EnumMetadataTargetTypeFilterSchema } from './EnumMetadataTargetTypeFilterSchema';
import { MetadataTargetTypeSchema } from './MetadataTargetTypeSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { MetadataListRelationFilterSchema } from './MetadataListRelationFilterSchema';

export const MetadataFieldWhereInputSchema: z.ZodType<Prisma.MetadataFieldWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MetadataFieldWhereInputSchema),z.lazy(() => MetadataFieldWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MetadataFieldWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MetadataFieldWhereInputSchema),z.lazy(() => MetadataFieldWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumMetadataValueTypeFilterSchema),z.lazy(() => MetadataValueTypeSchema) ]).optional(),
  target: z.union([ z.lazy(() => EnumMetadataTargetTypeFilterSchema),z.lazy(() => MetadataTargetTypeSchema) ]).optional(),
  archived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  default: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  values: z.lazy(() => MetadataListRelationFilterSchema).optional()
}).strict();

export default MetadataFieldWhereInputSchema;
