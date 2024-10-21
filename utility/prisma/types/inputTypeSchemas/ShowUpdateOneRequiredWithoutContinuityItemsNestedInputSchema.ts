import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowCreateWithoutContinuityItemsInputSchema } from './ShowCreateWithoutContinuityItemsInputSchema';
import { ShowUncheckedCreateWithoutContinuityItemsInputSchema } from './ShowUncheckedCreateWithoutContinuityItemsInputSchema';
import { ShowCreateOrConnectWithoutContinuityItemsInputSchema } from './ShowCreateOrConnectWithoutContinuityItemsInputSchema';
import { ShowUpsertWithoutContinuityItemsInputSchema } from './ShowUpsertWithoutContinuityItemsInputSchema';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';
import { ShowUpdateToOneWithWhereWithoutContinuityItemsInputSchema } from './ShowUpdateToOneWithWhereWithoutContinuityItemsInputSchema';
import { ShowUpdateWithoutContinuityItemsInputSchema } from './ShowUpdateWithoutContinuityItemsInputSchema';
import { ShowUncheckedUpdateWithoutContinuityItemsInputSchema } from './ShowUncheckedUpdateWithoutContinuityItemsInputSchema';

export const ShowUpdateOneRequiredWithoutContinuityItemsNestedInputSchema: z.ZodType<Prisma.ShowUpdateOneRequiredWithoutContinuityItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutContinuityItemsInputSchema),z.lazy(() => ShowUncheckedCreateWithoutContinuityItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutContinuityItemsInputSchema).optional(),
  upsert: z.lazy(() => ShowUpsertWithoutContinuityItemsInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShowUpdateToOneWithWhereWithoutContinuityItemsInputSchema),z.lazy(() => ShowUpdateWithoutContinuityItemsInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutContinuityItemsInputSchema) ]).optional(),
}).strict();

export default ShowUpdateOneRequiredWithoutContinuityItemsNestedInputSchema;
