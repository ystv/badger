import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';
import { RundownCreateWithoutMetadataInputSchema } from './RundownCreateWithoutMetadataInputSchema';
import { RundownUncheckedCreateWithoutMetadataInputSchema } from './RundownUncheckedCreateWithoutMetadataInputSchema';

export const RundownCreateOrConnectWithoutMetadataInputSchema: z.ZodType<Prisma.RundownCreateOrConnectWithoutMetadataInput> = z.object({
  where: z.lazy(() => RundownWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RundownCreateWithoutMetadataInputSchema),z.lazy(() => RundownUncheckedCreateWithoutMetadataInputSchema) ]),
}).strict();

export default RundownCreateOrConnectWithoutMetadataInputSchema;
