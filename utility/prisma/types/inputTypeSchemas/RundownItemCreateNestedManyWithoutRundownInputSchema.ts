import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemCreateWithoutRundownInputSchema } from './RundownItemCreateWithoutRundownInputSchema';
import { RundownItemUncheckedCreateWithoutRundownInputSchema } from './RundownItemUncheckedCreateWithoutRundownInputSchema';
import { RundownItemCreateOrConnectWithoutRundownInputSchema } from './RundownItemCreateOrConnectWithoutRundownInputSchema';
import { RundownItemCreateManyRundownInputEnvelopeSchema } from './RundownItemCreateManyRundownInputEnvelopeSchema';
import { RundownItemWhereUniqueInputSchema } from './RundownItemWhereUniqueInputSchema';

export const RundownItemCreateNestedManyWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemCreateNestedManyWithoutRundownInput> = z.object({
  create: z.union([ z.lazy(() => RundownItemCreateWithoutRundownInputSchema),z.lazy(() => RundownItemCreateWithoutRundownInputSchema).array(),z.lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema),z.lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RundownItemCreateOrConnectWithoutRundownInputSchema),z.lazy(() => RundownItemCreateOrConnectWithoutRundownInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RundownItemCreateManyRundownInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RundownItemWhereUniqueInputSchema),z.lazy(() => RundownItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default RundownItemCreateNestedManyWithoutRundownInputSchema;
