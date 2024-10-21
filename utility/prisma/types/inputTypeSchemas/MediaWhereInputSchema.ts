import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumMediaStateFilterSchema } from './EnumMediaStateFilterSchema';
import { MediaStateSchema } from './MediaStateSchema';
import { RundownItemListRelationFilterSchema } from './RundownItemListRelationFilterSchema';
import { ContinuityItemListRelationFilterSchema } from './ContinuityItemListRelationFilterSchema';
import { MediaProcessingTaskListRelationFilterSchema } from './MediaProcessingTaskListRelationFilterSchema';
import { AssetListRelationFilterSchema } from './AssetListRelationFilterSchema';
import { MetadataListRelationFilterSchema } from './MetadataListRelationFilterSchema';

export const MediaWhereInputSchema: z.ZodType<Prisma.MediaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaWhereInputSchema),z.lazy(() => MediaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rawPath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  path: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  durationSeconds: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  state: z.union([ z.lazy(() => EnumMediaStateFilterSchema),z.lazy(() => MediaStateSchema) ]).optional(),
  rundownItems: z.lazy(() => RundownItemListRelationFilterSchema).optional(),
  continuityItems: z.lazy(() => ContinuityItemListRelationFilterSchema).optional(),
  tasks: z.lazy(() => MediaProcessingTaskListRelationFilterSchema).optional(),
  assets: z.lazy(() => AssetListRelationFilterSchema).optional(),
  metadata: z.lazy(() => MetadataListRelationFilterSchema).optional()
}).strict();

export default MediaWhereInputSchema;
