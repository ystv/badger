import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionWhereUniqueInputSchema } from './ConnectionWhereUniqueInputSchema';
import { ConnectionUpdateWithoutUserInputSchema } from './ConnectionUpdateWithoutUserInputSchema';
import { ConnectionUncheckedUpdateWithoutUserInputSchema } from './ConnectionUncheckedUpdateWithoutUserInputSchema';

export const ConnectionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ConnectionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ConnectionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ConnectionUpdateWithoutUserInputSchema),z.lazy(() => ConnectionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default ConnectionUpdateWithWhereUniqueWithoutUserInputSchema;
