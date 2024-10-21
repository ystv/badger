import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';
import { MediaUpdateWithoutRundownItemsInputSchema } from './MediaUpdateWithoutRundownItemsInputSchema';
import { MediaUncheckedUpdateWithoutRundownItemsInputSchema } from './MediaUncheckedUpdateWithoutRundownItemsInputSchema';

export const MediaUpdateToOneWithWhereWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutRundownItemsInput> = z.object({
  where: z.lazy(() => MediaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MediaUpdateWithoutRundownItemsInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutRundownItemsInputSchema) ]),
}).strict();

export default MediaUpdateToOneWithWhereWithoutRundownItemsInputSchema;
