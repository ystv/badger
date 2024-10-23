import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemCreateWithoutShowInputSchema } from './ContinuityItemCreateWithoutShowInputSchema';
import { ContinuityItemUncheckedCreateWithoutShowInputSchema } from './ContinuityItemUncheckedCreateWithoutShowInputSchema';
import { ContinuityItemCreateOrConnectWithoutShowInputSchema } from './ContinuityItemCreateOrConnectWithoutShowInputSchema';
import { ContinuityItemCreateManyShowInputEnvelopeSchema } from './ContinuityItemCreateManyShowInputEnvelopeSchema';
import { ContinuityItemWhereUniqueInputSchema } from './ContinuityItemWhereUniqueInputSchema';

export const ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => ContinuityItemCreateWithoutShowInputSchema),z.lazy(() => ContinuityItemCreateWithoutShowInputSchema).array(),z.lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema),z.lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContinuityItemCreateOrConnectWithoutShowInputSchema),z.lazy(() => ContinuityItemCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContinuityItemCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContinuityItemWhereUniqueInputSchema),z.lazy(() => ContinuityItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ContinuityItemUncheckedCreateNestedManyWithoutShowInputSchema;
