import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemWhereUniqueInputSchema } from './RundownItemWhereUniqueInputSchema';
import { RundownItemCreateWithoutRundownInputSchema } from './RundownItemCreateWithoutRundownInputSchema';
import { RundownItemUncheckedCreateWithoutRundownInputSchema } from './RundownItemUncheckedCreateWithoutRundownInputSchema';

export const RundownItemCreateOrConnectWithoutRundownInputSchema: z.ZodType<Prisma.RundownItemCreateOrConnectWithoutRundownInput> = z.object({
  where: z.lazy(() => RundownItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RundownItemCreateWithoutRundownInputSchema),z.lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema) ]),
}).strict();

export default RundownItemCreateOrConnectWithoutRundownInputSchema;
