import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { RundownListRelationFilterSchema } from './RundownListRelationFilterSchema';
import { ContinuityItemListRelationFilterSchema } from './ContinuityItemListRelationFilterSchema';
import { MetadataListRelationFilterSchema } from './MetadataListRelationFilterSchema';

export const ShowWhereInputSchema: z.ZodType<Prisma.ShowWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ShowWhereInputSchema),z.lazy(() => ShowWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ShowWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ShowWhereInputSchema),z.lazy(() => ShowWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  start: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  version: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ytStreamID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ytBroadcastID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rundowns: z.lazy(() => RundownListRelationFilterSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemListRelationFilterSchema).optional(),
  metadata: z.lazy(() => MetadataListRelationFilterSchema).optional()
}).strict();

export default ShowWhereInputSchema;
