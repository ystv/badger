import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemCreateWithoutMediaInputSchema } from './ContinuityItemCreateWithoutMediaInputSchema';
import { ContinuityItemUncheckedCreateWithoutMediaInputSchema } from './ContinuityItemUncheckedCreateWithoutMediaInputSchema';
import { ContinuityItemCreateOrConnectWithoutMediaInputSchema } from './ContinuityItemCreateOrConnectWithoutMediaInputSchema';
import { ContinuityItemCreateManyMediaInputEnvelopeSchema } from './ContinuityItemCreateManyMediaInputEnvelopeSchema';
import { ContinuityItemWhereUniqueInputSchema } from './ContinuityItemWhereUniqueInputSchema';

export const ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedCreateNestedManyWithoutMediaInput> = z.object({
  create: z.union([ z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema),z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema).array(),z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema),z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema),z.lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContinuityItemCreateManyMediaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContinuityItemWhereUniqueInputSchema),z.lazy(() => ContinuityItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema;
