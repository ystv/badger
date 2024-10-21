import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaUpdateWithoutTasksInputSchema } from './MediaUpdateWithoutTasksInputSchema';
import { MediaUncheckedUpdateWithoutTasksInputSchema } from './MediaUncheckedUpdateWithoutTasksInputSchema';
import { MediaCreateWithoutTasksInputSchema } from './MediaCreateWithoutTasksInputSchema';
import { MediaUncheckedCreateWithoutTasksInputSchema } from './MediaUncheckedCreateWithoutTasksInputSchema';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';

export const MediaUpsertWithoutTasksInputSchema: z.ZodType<Prisma.MediaUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => MediaUpdateWithoutTasksInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => MediaCreateWithoutTasksInputSchema),z.lazy(() => MediaUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => MediaWhereInputSchema).optional()
}).strict();

export default MediaUpsertWithoutTasksInputSchema;
