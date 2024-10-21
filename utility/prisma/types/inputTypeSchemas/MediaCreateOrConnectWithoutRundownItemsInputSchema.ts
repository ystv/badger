import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaWhereUniqueInputSchema } from './MediaWhereUniqueInputSchema';
import { MediaCreateWithoutRundownItemsInputSchema } from './MediaCreateWithoutRundownItemsInputSchema';
import { MediaUncheckedCreateWithoutRundownItemsInputSchema } from './MediaUncheckedCreateWithoutRundownItemsInputSchema';

export const MediaCreateOrConnectWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutRundownItemsInput> = z.object({
  where: z.lazy(() => MediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaCreateWithoutRundownItemsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutRundownItemsInputSchema) ]),
}).strict();

export default MediaCreateOrConnectWithoutRundownItemsInputSchema;
