import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';
import { ShowUpdateWithoutMetadataInputSchema } from './ShowUpdateWithoutMetadataInputSchema';
import { ShowUncheckedUpdateWithoutMetadataInputSchema } from './ShowUncheckedUpdateWithoutMetadataInputSchema';

export const ShowUpdateToOneWithWhereWithoutMetadataInputSchema: z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutMetadataInput> = z.object({
  where: z.lazy(() => ShowWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShowUpdateWithoutMetadataInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutMetadataInputSchema) ]),
}).strict();

export default ShowUpdateToOneWithWhereWithoutMetadataInputSchema;
