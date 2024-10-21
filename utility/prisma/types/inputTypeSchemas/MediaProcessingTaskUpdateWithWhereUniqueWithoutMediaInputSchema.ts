import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskWhereUniqueInputSchema } from './MediaProcessingTaskWhereUniqueInputSchema';
import { MediaProcessingTaskUpdateWithoutMediaInputSchema } from './MediaProcessingTaskUpdateWithoutMediaInputSchema';
import { MediaProcessingTaskUncheckedUpdateWithoutMediaInputSchema } from './MediaProcessingTaskUncheckedUpdateWithoutMediaInputSchema';

export const MediaProcessingTaskUpdateWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskUpdateWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MediaProcessingTaskUpdateWithoutMediaInputSchema),z.lazy(() => MediaProcessingTaskUncheckedUpdateWithoutMediaInputSchema) ]),
}).strict();

export default MediaProcessingTaskUpdateWithWhereUniqueWithoutMediaInputSchema;
