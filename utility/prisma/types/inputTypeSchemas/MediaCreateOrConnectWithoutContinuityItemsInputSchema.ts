import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';
import { MediaCreateWithoutContinuityItemsInputSchema } from './MediaCreateWithoutContinuityItemsInputSchema';
import { MediaUncheckedCreateWithoutContinuityItemsInputSchema } from './MediaUncheckedCreateWithoutContinuityItemsInputSchema';

export const MediaCreateOrConnectWithoutContinuityItemsInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutContinuityItemsInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaCreateWithoutContinuityItemsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutContinuityItemsInputSchema) ]),
}).strict();

export default MediaCreateOrConnectWithoutContinuityItemsInputSchema;
