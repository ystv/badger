import type { Prisma } from '../../client';

import { z } from 'zod';
import { MediaWhereInputSchema } from './MediaWhereInputSchema';
import { MediaUpdateWithoutMetadataInputSchema } from './MediaUpdateWithoutMetadataInputSchema';
import { MediaUncheckedUpdateWithoutMetadataInputSchema } from './MediaUncheckedUpdateWithoutMetadataInputSchema';

export const MediaUpdateToOneWithWhereWithoutMetadataInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutMetadataInput> = z.object({
  where: z.lazy(() => MediaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MediaUpdateWithoutMetadataInputSchema),z.lazy(() => MediaUncheckedUpdateWithoutMetadataInputSchema) ]),
}).strict();

export default MediaUpdateToOneWithWhereWithoutMetadataInputSchema;
