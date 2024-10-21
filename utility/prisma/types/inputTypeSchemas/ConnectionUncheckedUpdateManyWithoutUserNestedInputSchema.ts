import type { Prisma } from '../../client';

import { z } from 'zod';
import { ConnectionCreateWithoutUserInputSchema } from './ConnectionCreateWithoutUserInputSchema';
import { ConnectionUncheckedCreateWithoutUserInputSchema } from './ConnectionUncheckedCreateWithoutUserInputSchema';
import { ConnectionCreateOrConnectWithoutUserInputSchema } from './ConnectionCreateOrConnectWithoutUserInputSchema';
import { ConnectionUpsertWithWhereUniqueWithoutUserInputSchema } from './ConnectionUpsertWithWhereUniqueWithoutUserInputSchema';
import { ConnectionCreateManyUserInputEnvelopeSchema } from './ConnectionCreateManyUserInputEnvelopeSchema';
import { ConnectionWhereUniqueInputSchema } from './ConnectionWhereUniqueInputSchema';
import { ConnectionUpdateWithWhereUniqueWithoutUserInputSchema } from './ConnectionUpdateWithWhereUniqueWithoutUserInputSchema';
import { ConnectionUpdateManyWithWhereWithoutUserInputSchema } from './ConnectionUpdateManyWithWhereWithoutUserInputSchema';
import { ConnectionScalarWhereInputSchema } from './ConnectionScalarWhereInputSchema';

export const ConnectionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ConnectionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConnectionCreateWithoutUserInputSchema),z.lazy(() => ConnectionCreateWithoutUserInputSchema).array(),z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConnectionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConnectionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConnectionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConnectionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConnectionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConnectionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConnectionWhereUniqueInputSchema),z.lazy(() => ConnectionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConnectionWhereUniqueInputSchema),z.lazy(() => ConnectionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConnectionWhereUniqueInputSchema),z.lazy(() => ConnectionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConnectionWhereUniqueInputSchema),z.lazy(() => ConnectionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConnectionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConnectionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConnectionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ConnectionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConnectionScalarWhereInputSchema),z.lazy(() => ConnectionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ConnectionUncheckedUpdateManyWithoutUserNestedInputSchema;
