import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemCreateWithoutMediaInputSchema } from './RundownItemCreateWithoutMediaInputSchema';
import { RundownItemUncheckedCreateWithoutMediaInputSchema } from './RundownItemUncheckedCreateWithoutMediaInputSchema';
import { RundownItemCreateOrConnectWithoutMediaInputSchema } from './RundownItemCreateOrConnectWithoutMediaInputSchema';
import { RundownItemCreateManyMediaInputEnvelopeSchema } from './RundownItemCreateManyMediaInputEnvelopeSchema';
import { RundownItemWhereUniqueInputSchema } from './RundownItemWhereUniqueInputSchema';

export const RundownItemCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemCreateNestedManyWithoutMediaInput> = z.object({
  create: z.union([ z.lazy(() => RundownItemCreateWithoutMediaInputSchema),z.lazy(() => RundownItemCreateWithoutMediaInputSchema).array(),z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema),z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema),z.lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RundownItemCreateManyMediaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RundownItemWhereUniqueInputSchema),z.lazy(() => RundownItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default RundownItemCreateNestedManyWithoutMediaInputSchema;
