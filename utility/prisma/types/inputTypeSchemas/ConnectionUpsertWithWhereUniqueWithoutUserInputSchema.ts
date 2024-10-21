import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionWhereUniqueInputSchema } from './ConnectionWhereUniqueInputSchema';
import { ConnectionUpdateWithoutUserInputSchema } from './ConnectionUpdateWithoutUserInputSchema';
import { ConnectionUncheckedUpdateWithoutUserInputSchema } from './ConnectionUncheckedUpdateWithoutUserInputSchema';
import { ConnectionCreateWithoutUserInputSchema } from './ConnectionCreateWithoutUserInputSchema';
import { ConnectionUncheckedCreateWithoutUserInputSchema } from './ConnectionUncheckedCreateWithoutUserInputSchema';

export const ConnectionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ConnectionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ConnectionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ConnectionUpdateWithoutUserInputSchema),z.lazy(() => ConnectionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ConnectionCreateWithoutUserInputSchema),z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default ConnectionUpsertWithWhereUniqueWithoutUserInputSchema;
