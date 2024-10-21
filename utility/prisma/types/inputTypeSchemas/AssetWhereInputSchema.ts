import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { MediaRelationFilterSchema } from './MediaRelationFilterSchema';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';
import { RundownRelationFilterSchema } from './RundownRelationFilterSchema';
import { RundownWhereInputSchema } from './RundownWhereInputSchema';

export const AssetWhereInputSchema: z.ZodType<Prisma.AssetWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AssetWhereInputSchema),z.lazy(() => AssetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AssetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AssetWhereInputSchema),z.lazy(() => AssetWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rundownId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  mediaId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  media: z.union([ z.lazy(() => MediaRelationFilterSchema),z.lazy(() => MediaWhereInputSchema) ]).optional(),
  rundown: z.union([ z.lazy(() => RundownRelationFilterSchema),z.lazy(() => RundownWhereInputSchema) ]).optional(),
}).strict();

export default AssetWhereInputSchema;
