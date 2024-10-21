import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';
import { ShowCreateWithoutRundownsInputSchema } from './ShowCreateWithoutRundownsInputSchema';
import { ShowUncheckedCreateWithoutRundownsInputSchema } from './ShowUncheckedCreateWithoutRundownsInputSchema';

export const ShowCreateOrConnectWithoutRundownsInputSchema: z.ZodType<Prisma.ShowCreateOrConnectWithoutRundownsInput> = z.object({
  where: z.lazy(() => ShowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ShowCreateWithoutRundownsInputSchema),z.lazy(() => ShowUncheckedCreateWithoutRundownsInputSchema) ]),
}).strict();

export default ShowCreateOrConnectWithoutRundownsInputSchema;
