import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaCreateWithoutTasksInputSchema } from './MediaCreateWithoutTasksInputSchema';
import { MediaUncheckedCreateWithoutTasksInputSchema } from './MediaUncheckedCreateWithoutTasksInputSchema';
import { MediaCreateOrConnectWithoutTasksInputSchema } from './MediaCreateOrConnectWithoutTasksInputSchema';
import { MediaUpsertWithoutTasksInputSchema } from './MediaUpsertWithoutTasksInputSchema';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';
import { MediaUpdateToOneWithWhereWithoutTasksInputSchema } from './MediaUpdateToOneWithWhereWithoutTasksInputSchema';
import { MediaUpdateWithoutTasksInputSchema } from './MediaUpdateWithoutTasksInputSchema';
import { MediaUncheckedUpdateWithoutTasksInputSchema } from './MediaUncheckedUpdateWithoutTasksInputSchema';

export const MediaUpdateOneRequiredWithoutTasksNestedInputSchema: z.ZodType<Prisma.MediaUpdateOneRequiredWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutTasksInputSchema),z.lazy(() => MediaUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => MediaUpsertWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MediaUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => MediaUpdateWithoutTasksInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export default MediaUpdateOneRequiredWithoutTasksNestedInputSchema;
