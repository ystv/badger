import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';
import { ShowCreateWithoutMetadataInputSchema } from './ShowCreateWithoutMetadataInputSchema';
import { ShowUncheckedCreateWithoutMetadataInputSchema } from './ShowUncheckedCreateWithoutMetadataInputSchema';

export const ShowCreateOrConnectWithoutMetadataInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutMetadataInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutMetadataInputSchema),z.lazy(() => ShowUncheckedCreateWithoutMetadataInputSchema) ]),
}).strict();

export default ShowCreateOrConnectWithoutMetadataInputSchema;
