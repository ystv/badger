import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownCreateWithoutMetadataInputSchema } from './RundownCreateWithoutMetadataInputSchema';
import { RundownUncheckedCreateWithoutMetadataInputSchema } from './RundownUncheckedCreateWithoutMetadataInputSchema';
import { RundownCreateOrConnectWithoutMetadataInputSchema } from './RundownCreateOrConnectWithoutMetadataInputSchema';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';

export const RundownCreateNestedOneWithoutMetadataInputSchema: z.ZodType<Prisma.RundownCreateNestedOneWithoutMetadataInput> = z.object({
  create: z.union([ z.lazy(() => RundownCreateWithoutMetadataInputSchema),z.lazy(() => RundownUncheckedCreateWithoutMetadataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RundownCreateOrConnectWithoutMetadataInputSchema).optional(),
  connect: z.lazy(() => RundownWhereUniqueInputSchema).optional()
}).strict();

export default RundownCreateNestedOneWithoutMetadataInputSchema;
