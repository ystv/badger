import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemWhereUniqueInputSchema } from './RundownItemWhereUniqueInputSchema';
import { RundownItemCreateWithoutMediaInputSchema } from './RundownItemCreateWithoutMediaInputSchema';
import { RundownItemUncheckedCreateWithoutMediaInputSchema } from './RundownItemUncheckedCreateWithoutMediaInputSchema';

export const RundownItemCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemCreateOrConnectWithoutMediaInput> = z.object({
  where: z.lazy(() => RundownItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RundownItemCreateWithoutMediaInputSchema),z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export default RundownItemCreateOrConnectWithoutMediaInputSchema;
