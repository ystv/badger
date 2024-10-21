import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowUpdateWithoutMetadataInputSchema } from './ShowUpdateWithoutMetadataInputSchema';
import { ShowUncheckedUpdateWithoutMetadataInputSchema } from './ShowUncheckedUpdateWithoutMetadataInputSchema';
import { ShowCreateWithoutMetadataInputSchema } from './ShowCreateWithoutMetadataInputSchema';
import { ShowUncheckedCreateWithoutMetadataInputSchema } from './ShowUncheckedCreateWithoutMetadataInputSchema';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';

export const ShowUpsertWithoutMetadataInputSchema: z.ZodType<Prisma.ShowUpsertWithoutMetadataInput> = z.object({
  update: z.union([ z.lazy(() => ShowUpdateWithoutMetadataInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutMetadataInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutMetadataInputSchema),z.lazy(() => ShowUncheckedCreateWithoutMetadataInputSchema) ]),
  where: z.lazy(() => ShowWhereInputSchema).optional()
}).strict();

export default ShowUpsertWithoutMetadataInputSchema;
