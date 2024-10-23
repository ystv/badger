import type { Prisma } from '../../client';

import { z } from 'zod';
import { IdentityCreateWithoutUserInputSchema } from './IdentityCreateWithoutUserInputSchema';
import { IdentityUncheckedCreateWithoutUserInputSchema } from './IdentityUncheckedCreateWithoutUserInputSchema';
import { IdentityCreateOrConnectWithoutUserInputSchema } from './IdentityCreateOrConnectWithoutUserInputSchema';
import { IdentityCreateManyUserInputEnvelopeSchema } from './IdentityCreateManyUserInputEnvelopeSchema';
import { IdentityWhereUniqueInputSchema } from './IdentityWhereUniqueInputSchema';

export const IdentityUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.IdentityUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => IdentityCreateWithoutUserInputSchema),z.lazy(() => IdentityCreateWithoutUserInputSchema).array(),z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema),z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IdentityCreateOrConnectWithoutUserInputSchema),z.lazy(() => IdentityCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IdentityCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IdentityWhereUniqueInputSchema),z.lazy(() => IdentityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default IdentityUncheckedCreateNestedManyWithoutUserInputSchema;
