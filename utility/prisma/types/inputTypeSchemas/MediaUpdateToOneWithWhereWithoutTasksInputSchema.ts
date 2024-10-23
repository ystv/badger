import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';
import { MediaUpdateWithoutTasksInputSchema } from './MediaUpdateWithoutTasksInputSchema';
import { MediaUncheckedUpdateWithoutTasksInputSchema } from './MediaUncheckedUpdateWithoutTasksInputSchema';

export const MediaUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => MediaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MediaUpdateWithoutTasksInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export default MediaUpdateToOneWithWhereWithoutTasksInputSchema;
