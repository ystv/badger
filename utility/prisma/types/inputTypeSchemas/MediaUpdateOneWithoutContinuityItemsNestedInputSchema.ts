import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaCreateWithoutContinuityItemsInputSchema } from './MediaCreateWithoutContinuityItemsInputSchema';
import { MediaUncheckedCreateWithoutContinuityItemsInputSchema } from './MediaUncheckedCreateWithoutContinuityItemsInputSchema';
import { MediaCreateOrConnectWithoutContinuityItemsInputSchema } from './MediaCreateOrConnectWithoutContinuityItemsInputSchema';
import { MediaUpsertWithoutContinuityItemsInputSchema } from './MediaUpsertWithoutContinuityItemsInputSchema';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';
import { MediaUpdateToOneWithWhereWithoutContinuityItemsInputSchema } from './MediaUpdateToOneWithWhereWithoutContinuityItemsInputSchema';
import { MediaUpdateWithoutContinuityItemsInputSchema } from './MediaUpdateWithoutContinuityItemsInputSchema';
import { MediaUncheckedUpdateWithoutContinuityItemsInputSchema } from './MediaUncheckedUpdateWithoutContinuityItemsInputSchema';

export const MediaUpdateOneWithoutContinuityItemsNestedInputSchema: z.ZodType<Prisma.MediaUpdateOneWithoutContinuityItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutContinuityItemsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutContinuityItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutContinuityItemsInputSchema).optional(),
  upsert: z.lazy(() => MediaUpsertWithoutContinuityItemsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MediaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MediaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MediaUpdateToOneWithWhereWithoutContinuityItemsInputSchema),z.lazy(() => MediaUpdateWithoutContinuityItemsInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutContinuityItemsInputSchema) ]).optional(),
}).strict();

export default MediaUpdateOneWithoutContinuityItemsNestedInputSchema;
