import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaCreateWithoutContinuityItemsInputSchema } from './MediaCreateWithoutContinuityItemsInputSchema';
import { MediaUncheckedCreateWithoutContinuityItemsInputSchema } from './MediaUncheckedCreateWithoutContinuityItemsInputSchema';
import { MediaCreateOrConnectWithoutContinuityItemsInputSchema } from './MediaCreateOrConnectWithoutContinuityItemsInputSchema';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';

export const MediaCreateNestedOneWithoutContinuityItemsInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutContinuityItemsInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutContinuityItemsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutContinuityItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutContinuityItemsInputSchema).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional()
}).strict();

export default MediaCreateNestedOneWithoutContinuityItemsInputSchema;
