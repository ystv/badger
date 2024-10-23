import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionCreateWithoutUserInputSchema } from './ConnectionCreateWithoutUserInputSchema';
import { ConnectionUncheckedCreateWithoutUserInputSchema } from './ConnectionUncheckedCreateWithoutUserInputSchema';
import { ConnectionCreateOrConnectWithoutUserInputSchema } from './ConnectionCreateOrConnectWithoutUserInputSchema';
import { ConnectionCreateManyUserInputEnvelopeSchema } from './ConnectionCreateManyUserInputEnvelopeSchema';
import { ConnectionWhereUniqueInputSchema } from './ConnectionWhereUniqueInputSchema';

export const ConnectionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ConnectionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ConnectionCreateWithoutUserInputSchema),z.lazy(() => ConnectionCreateWithoutUserInputSchema).array(),z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConnectionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConnectionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConnectionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConnectionWhereUniqueInputSchema),z.lazy(() => ConnectionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ConnectionCreateNestedManyWithoutUserInputSchema;
