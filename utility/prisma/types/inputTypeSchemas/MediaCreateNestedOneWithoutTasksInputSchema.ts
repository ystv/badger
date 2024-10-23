import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaCreateWithoutTasksInputSchema } from './MediaCreateWithoutTasksInputSchema';
import { MediaUncheckedCreateWithoutTasksInputSchema } from './MediaUncheckedCreateWithoutTasksInputSchema';
import { MediaCreateOrConnectWithoutTasksInputSchema } from './MediaCreateOrConnectWithoutTasksInputSchema';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';

export const MediaCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutTasksInputSchema),z.lazy(() => MediaUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional()
}).strict();

export default MediaCreateNestedOneWithoutTasksInputSchema;
