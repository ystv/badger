import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskWhereUniqueInputSchema } from './MediaProcessingTaskWhereUniqueInputSchema';
import { MediaProcessingTaskUpdateWithoutMediaInputSchema } from './MediaProcessingTaskUpdateWithoutMediaInputSchema';
import { MediaProcessingTaskUncheckedUpdateWithoutMediaInputSchema } from './MediaProcessingTaskUncheckedUpdateWithoutMediaInputSchema';
import { MediaProcessingTaskCreateWithoutMediaInputSchema } from './MediaProcessingTaskCreateWithoutMediaInputSchema';
import { MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema } from './MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema';

export const MediaProcessingTaskUpsertWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskUpsertWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MediaProcessingTaskUpdateWithoutMediaInputSchema),z.lazy(() => MediaProcessingTaskUncheckedUpdateWithoutMediaInputSchema) ]),
  create: z.union([ z.lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema),z.lazy(() => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export default MediaProcessingTaskUpsertWithWhereUniqueWithoutMediaInputSchema;
