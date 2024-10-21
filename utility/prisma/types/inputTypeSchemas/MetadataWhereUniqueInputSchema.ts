import type { Prisma } from '../../client';

import { z } from 'zod';
import { MetadataFieldIdShowIdCompoundUniqueInputSchema } from './MetadataFieldIdShowIdCompoundUniqueInputSchema';
import { MetadataFieldIdRundownIdCompoundUniqueInputSchema } from './MetadataFieldIdRundownIdCompoundUniqueInputSchema';
import { MetadataWhereInputSchema } from './MetadataWhereInputSchema';
import { JsonFilterSchema } from './JsonFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';
import { MetadataFieldRelationFilterSchema } from './MetadataFieldRelationFilterSchema';
import { MetadataFieldWhereInputSchema } from './MetadataFieldWhereInputSchema';
import { ShowNullableRelationFilterSchema } from './ShowNullableRelationFilterSchema';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';
import { RundownNullableRelationFilterSchema } from './RundownNullableRelationFilterSchema';
import { RundownWhereInputSchema } from './RundownWhereInputSchema';
import { MediaNullableRelationFilterSchema } from './MediaNullableRelationFilterSchema';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';

export const MetadataWhereUniqueInputSchema: z.ZodType<Prisma.MetadataWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    fieldId_showId: z.lazy(() => MetadataFieldIdShowIdCompoundUniqueInputSchema),
    fieldId_rundownId: z.lazy(() => MetadataFieldIdRundownIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
    fieldId_showId: z.lazy(() => MetadataFieldIdShowIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.number().int(),
    fieldId_rundownId: z.lazy(() => MetadataFieldIdRundownIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    fieldId_showId: z.lazy(() => MetadataFieldIdShowIdCompoundUniqueInputSchema),
    fieldId_rundownId: z.lazy(() => MetadataFieldIdRundownIdCompoundUniqueInputSchema),
  }),
  z.object({
    fieldId_showId: z.lazy(() => MetadataFieldIdShowIdCompoundUniqueInputSchema),
  }),
  z.object({
    fieldId_rundownId: z.lazy(() => MetadataFieldIdRundownIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  fieldId_showId: z.lazy(() => MetadataFieldIdShowIdCompoundUniqueInputSchema).optional(),
  fieldId_rundownId: z.lazy(() => MetadataFieldIdRundownIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => MetadataWhereInputSchema),z.lazy(() => MetadataWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MetadataWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MetadataWhereInputSchema),z.lazy(() => MetadataWhereInputSchema).array() ]).optional(),
  value: z.lazy(() => JsonFilterSchema).optional(),
  fieldId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  showId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  rundownId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  mediaId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  field: z.union([ z.lazy(() => MetadataFieldRelationFilterSchema),z.lazy(() => MetadataFieldWhereInputSchema) ]).optional(),
  show: z.union([ z.lazy(() => ShowNullableRelationFilterSchema),z.lazy(() => ShowWhereInputSchema) ]).optional().nullable(),
  rundown: z.union([ z.lazy(() => RundownNullableRelationFilterSchema),z.lazy(() => RundownWhereInputSchema) ]).optional().nullable(),
  media: z.union([ z.lazy(() => MediaNullableRelationFilterSchema),z.lazy(() => MediaWhereInputSchema) ]).optional().nullable(),
}).strict());

export default MetadataWhereUniqueInputSchema;
