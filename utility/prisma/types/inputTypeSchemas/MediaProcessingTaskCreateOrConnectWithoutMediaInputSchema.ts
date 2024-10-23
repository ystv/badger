import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskWhereUniqueInputSchema } from './MediaProcessingTaskWhereUniqueInputSchema';
import { MediaProcessingTaskCreateWithoutMediaInputSchema } from './MediaProcessingTaskCreateWithoutMediaInputSchema';
import { MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema } from './MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema';

export const MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskCreateOrConnectWithoutMediaInput> = z.object({
  where: z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema),z.lazy(() => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export default MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema;
