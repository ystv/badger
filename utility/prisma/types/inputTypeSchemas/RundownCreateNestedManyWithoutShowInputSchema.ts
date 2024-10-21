import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownCreateWithoutShowInputSchema } from './RundownCreateWithoutShowInputSchema';
import { RundownUncheckedCreateWithoutShowInputSchema } from './RundownUncheckedCreateWithoutShowInputSchema';
import { RundownCreateOrConnectWithoutShowInputSchema } from './RundownCreateOrConnectWithoutShowInputSchema';
import { RundownCreateManyShowInputEnvelopeSchema } from './RundownCreateManyShowInputEnvelopeSchema';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';

export const RundownCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.RundownCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => RundownCreateWithoutShowInputSchema),z.lazy(() => RundownCreateWithoutShowInputSchema).array(),z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema),z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RundownCreateOrConnectWithoutShowInputSchema),z.lazy(() => RundownCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RundownCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RundownWhereUniqueInputSchema),z.lazy(() => RundownWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default RundownCreateNestedManyWithoutShowInputSchema;
