import type { Prisma } from '../../client';

import { z } from 'zod';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumMediaProcessingTaskStateFilterSchema } from './EnumMediaProcessingTaskStateFilterSchema';
import { MediaProcessingTaskStateSchema } from './MediaProcessingTaskStateSchema';

export const MediaProcessingTaskScalarWhereInputSchema: z.ZodType<Prisma.MediaProcessingTaskScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MediaProcessingTaskScalarWhereInputSchema),z.lazy(() => MediaProcessingTaskScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaProcessingTaskScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaProcessingTaskScalarWhereInputSchema),z.lazy(() => MediaProcessingTaskScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  media_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  additionalInfo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => EnumMediaProcessingTaskStateFilterSchema),z.lazy(() => MediaProcessingTaskStateSchema) ]).optional(),
}).strict();

export default MediaProcessingTaskScalarWhereInputSchema;
