import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';
import { MediaCreateWithoutTasksInputSchema } from './MediaCreateWithoutTasksInputSchema';
import { MediaUncheckedCreateWithoutTasksInputSchema } from './MediaUncheckedCreateWithoutTasksInputSchema';

export const MediaCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaCreateWithoutTasksInputSchema),z.lazy(() => MediaUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export default MediaCreateOrConnectWithoutTasksInputSchema;
