import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { JsonFilterSchema } from './JsonFilterSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';

export const MetadataScalarWhereInputSchema: z.ZodType<Prisma.MetadataScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MetadataScalarWhereInputSchema),z.lazy(() => MetadataScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MetadataScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MetadataScalarWhereInputSchema),z.lazy(() => MetadataScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  value: z.lazy(() => JsonFilterSchema).optional(),
  fieldId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  showId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  rundownId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  mediaId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export default MetadataScalarWhereInputSchema;
