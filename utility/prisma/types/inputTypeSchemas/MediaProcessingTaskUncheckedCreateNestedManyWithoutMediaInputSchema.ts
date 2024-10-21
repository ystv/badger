import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskCreateWithoutMediaInputSchema } from './MediaProcessingTaskCreateWithoutMediaInputSchema';
import { MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema } from './MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema';
import { MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema } from './MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema';
import { MediaProcessingTaskCreateManyMediaInputEnvelopeSchema } from './MediaProcessingTaskCreateManyMediaInputEnvelopeSchema';
import { MediaProcessingTaskWhereUniqueInputSchema } from './MediaProcessingTaskWhereUniqueInputSchema';

export const MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInput> = z.object({
  create: z.union([ z.lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema),z.lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema).array(),z.lazy(() => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema),z.lazy(() => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema),z.lazy(() => MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaProcessingTaskCreateManyMediaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema;
