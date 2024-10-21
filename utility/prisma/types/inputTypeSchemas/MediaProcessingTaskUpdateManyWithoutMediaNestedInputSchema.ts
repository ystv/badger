import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaProcessingTaskCreateWithoutMediaInputSchema } from './MediaProcessingTaskCreateWithoutMediaInputSchema';
import { MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema } from './MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema';
import { MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema } from './MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema';
import { MediaProcessingTaskUpsertWithWhereUniqueWithoutMediaInputSchema } from './MediaProcessingTaskUpsertWithWhereUniqueWithoutMediaInputSchema';
import { MediaProcessingTaskCreateManyMediaInputEnvelopeSchema } from './MediaProcessingTaskCreateManyMediaInputEnvelopeSchema';
import { MediaProcessingTaskWhereUniqueInputSchema } from './MediaProcessingTaskWhereUniqueInputSchema';
import { MediaProcessingTaskUpdateWithWhereUniqueWithoutMediaInputSchema } from './MediaProcessingTaskUpdateWithWhereUniqueWithoutMediaInputSchema';
import { MediaProcessingTaskUpdateManyWithWhereWithoutMediaInputSchema } from './MediaProcessingTaskUpdateManyWithWhereWithoutMediaInputSchema';
import { MediaProcessingTaskScalarWhereInputSchema } from './MediaProcessingTaskScalarWhereInputSchema';

export const MediaProcessingTaskUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.MediaProcessingTaskUpdateManyWithoutMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema),z.lazy(() => MediaProcessingTaskCreateWithoutMediaInputSchema).array(),z.lazy(() => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema),z.lazy(() => MediaProcessingTaskUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema),z.lazy(() => MediaProcessingTaskCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MediaProcessingTaskUpsertWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => MediaProcessingTaskUpsertWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MediaProcessingTaskCreateManyMediaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema),z.lazy(() => MediaProcessingTaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MediaProcessingTaskUpdateWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => MediaProcessingTaskUpdateWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MediaProcessingTaskUpdateManyWithWhereWithoutMediaInputSchema),z.lazy(() => MediaProcessingTaskUpdateManyWithWhereWithoutMediaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MediaProcessingTaskScalarWhereInputSchema),z.lazy(() => MediaProcessingTaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default MediaProcessingTaskUpdateManyWithoutMediaNestedInputSchema;
