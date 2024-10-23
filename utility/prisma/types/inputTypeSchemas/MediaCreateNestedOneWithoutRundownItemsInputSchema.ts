import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaCreateWithoutRundownItemsInputSchema } from './MediaCreateWithoutRundownItemsInputSchema';
import { MediaUncheckedCreateWithoutRundownItemsInputSchema } from './MediaUncheckedCreateWithoutRundownItemsInputSchema';
import { MediaCreateOrConnectWithoutRundownItemsInputSchema } from './MediaCreateOrConnectWithoutRundownItemsInputSchema';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';

export const MediaCreateNestedOneWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutRundownItemsInput> = z.object({
  create: z.union([ z.lazy(() => MediaCreateWithoutRundownItemsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutRundownItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaCreateOrConnectWithoutRundownItemsInputSchema).optional(),
  connect: z.lazy(() => MediaWhereUniqueInputSchema).optional()
}).strict();

export default MediaCreateNestedOneWithoutRundownItemsInputSchema;
