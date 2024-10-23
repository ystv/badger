import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowCreateWithoutRundownsInputSchema } from './ShowCreateWithoutRundownsInputSchema';
import { ShowUncheckedCreateWithoutRundownsInputSchema } from './ShowUncheckedCreateWithoutRundownsInputSchema';
import { ShowCreateOrConnectWithoutRundownsInputSchema } from './ShowCreateOrConnectWithoutRundownsInputSchema';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';

export const ShowCreateNestedOneWithoutRundownsInputSchema: z.ZodType<Prisma.ShowCreateNestedOneWithoutRundownsInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutRundownsInputSchema),z.lazy(() => ShowUncheckedCreateWithoutRundownsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutRundownsInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional()
}).strict();

export default ShowCreateNestedOneWithoutRundownsInputSchema;
