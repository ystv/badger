import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionWhereUniqueInputSchema } from './ConnectionWhereUniqueInputSchema';
import { ConnectionCreateWithoutUserInputSchema } from './ConnectionCreateWithoutUserInputSchema';
import { ConnectionUncheckedCreateWithoutUserInputSchema } from './ConnectionUncheckedCreateWithoutUserInputSchema';

export const ConnectionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ConnectionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ConnectionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConnectionCreateWithoutUserInputSchema),z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ConnectionCreateOrConnectWithoutUserInputSchema;
