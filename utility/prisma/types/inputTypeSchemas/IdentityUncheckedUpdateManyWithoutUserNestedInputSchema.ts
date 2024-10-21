import type { Prisma } from '../../client';

import { z } from 'zod';
import { IdentityCreateWithoutUserInputSchema } from './IdentityCreateWithoutUserInputSchema';
import { IdentityUncheckedCreateWithoutUserInputSchema } from './IdentityUncheckedCreateWithoutUserInputSchema';
import { IdentityCreateOrConnectWithoutUserInputSchema } from './IdentityCreateOrConnectWithoutUserInputSchema';
import { IdentityUpsertWithWhereUniqueWithoutUserInputSchema } from './IdentityUpsertWithWhereUniqueWithoutUserInputSchema';
import { IdentityCreateManyUserInputEnvelopeSchema } from './IdentityCreateManyUserInputEnvelopeSchema';
import { IdentityWhereUniqueInputSchema } from './IdentityWhereUniqueInputSchema';
import { IdentityUpdateWithWhereUniqueWithoutUserInputSchema } from './IdentityUpdateWithWhereUniqueWithoutUserInputSchema';
import { IdentityUpdateManyWithWhereWithoutUserInputSchema } from './IdentityUpdateManyWithWhereWithoutUserInputSchema';
import { IdentityScalarWhereInputSchema } from './IdentityScalarWhereInputSchema';

export const IdentityUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.IdentityUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => IdentityCreateWithoutUserInputSchema),z.lazy(() => IdentityCreateWithoutUserInputSchema).array(),z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema),z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IdentityCreateOrConnectWithoutUserInputSchema),z.lazy(() => IdentityCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IdentityUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => IdentityUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IdentityCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IdentityWhereUniqueInputSchema),z.lazy(() => IdentityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IdentityWhereUniqueInputSchema),z.lazy(() => IdentityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IdentityWhereUniqueInputSchema),z.lazy(() => IdentityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IdentityWhereUniqueInputSchema),z.lazy(() => IdentityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IdentityUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => IdentityUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IdentityUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => IdentityUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IdentityScalarWhereInputSchema),z.lazy(() => IdentityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default IdentityUncheckedUpdateManyWithoutUserNestedInputSchema;
