import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskScalarWhereInputSchema } from './MediaProcessingTaskScalarWhereInputSchema';
import { MediaProcessingTaskUpdateManyMutationInputSchema } from './MediaProcessingTaskUpdateManyMutationInputSchema';
import { MediaProcessingTaskUncheckedUpdateManyWithoutMediaInputSchema } from './MediaProcessingTaskUncheckedUpdateManyWithoutMediaInputSchema';

export const MediaProcessingTaskUpdateManyWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskUpdateManyWithWhereWithoutMediaInput> = z.object({
  where: z.lazy(() => MediaProcessingTaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MediaProcessingTaskUpdateManyMutationInputSchema),z.lazy(() => MediaProcessingTaskUncheckedUpdateManyWithoutMediaInputSchema) ]),
}).strict();

export default MediaProcessingTaskUpdateManyWithWhereWithoutMediaInputSchema;
