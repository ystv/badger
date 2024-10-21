import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaUpdateWithoutRundownItemsInputSchema } from './MediaUpdateWithoutRundownItemsInputSchema';
import { MediaUncheckedUpdateWithoutRundownItemsInputSchema } from './MediaUncheckedUpdateWithoutRundownItemsInputSchema';
import { MediaCreateWithoutRundownItemsInputSchema } from './MediaCreateWithoutRundownItemsInputSchema';
import { MediaUncheckedCreateWithoutRundownItemsInputSchema } from './MediaUncheckedCreateWithoutRundownItemsInputSchema';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';

export const MediaUpsertWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaUpsertWithoutRundownItemsInput> = z.object({
  update: z.union([ z.lazy(() => MediaUpdateWithoutRundownItemsInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutRundownItemsInputSchema) ]),
  create: z.union([ z.lazy(() => MediaCreateWithoutRundownItemsInputSchema),z.lazy(() => MediaUncheckedCreateWithoutRundownItemsInputSchema) ]),
  where: z.lazy(() => MediaWhereInputSchema).optional()
}).strict();

export default MediaUpsertWithoutRundownItemsInputSchema;
