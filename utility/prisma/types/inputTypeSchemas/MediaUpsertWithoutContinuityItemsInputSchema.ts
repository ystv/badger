import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaUpdateWithoutContinuityItemsInputSchema } from './MediaUpdateWithoutContinuityItemsInputSchema';
import { MediaUncheckedUpdateWithoutContinuityItemsInputSchema } from './MediaUncheckedUpdateWithoutContinuityItemsInputSchema';
import { MediaCreateWithoutContinuityItemsInputSchema } from './MediaCreateWithoutContinuityItemsInputSchema';
import { MediaUncheckedCreateWithoutContinuityItemsInputSchema } from './MediaUncheckedCreateWithoutContinuityItemsInputSchema';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';

export const MediaUpsertWithoutContinuityItemsInputSchema: z.ZodType<Prisma.MediaUpsertWithoutContinuityItemsInput> = z.object({
  update: z.union([ z.lazy(() => MediaUpdateWithoutContinuityItemsInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutContinuityItemsInputSchema) ]),
  create: z.union([ z.lazy(() => MediaCreateWithoutContinuityItemsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutContinuityItemsInputSchema) ]),
  where: z.lazy(() => MediaWhereInputSchema).optional()
}).strict();

export default MediaUpsertWithoutContinuityItemsInputSchema;
