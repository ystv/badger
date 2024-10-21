import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownCreateWithoutShowInputSchema } from './RundownCreateWithoutShowInputSchema';
import { RundownUncheckedCreateWithoutShowInputSchema } from './RundownUncheckedCreateWithoutShowInputSchema';
import { RundownCreateOrConnectWithoutShowInputSchema } from './RundownCreateOrConnectWithoutShowInputSchema';
import { RundownUpsertWithWhereUniqueWithoutShowInputSchema } from './RundownUpsertWithWhereUniqueWithoutShowInputSchema';
import { RundownCreateManyShowInputEnvelopeSchema } from './RundownCreateManyShowInputEnvelopeSchema';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';
import { RundownUpdateWithWhereUniqueWithoutShowInputSchema } from './RundownUpdateWithWhereUniqueWithoutShowInputSchema';
import { RundownUpdateManyWithWhereWithoutShowInputSchema } from './RundownUpdateManyWithWhereWithoutShowInputSchema';
import { RundownScalarWhereInputSchema } from './RundownScalarWhereInputSchema';

export const RundownUncheckedUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.RundownUncheckedUpdateManyWithoutShowNestedInput> = z.object({
  create: z.union([ z.lazy(() => RundownCreateWithoutShowInputSchema),z.lazy(() => RundownCreateWithoutShowInputSchema).array(),z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema),z.lazy(() => RundownUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RundownCreateOrConnectWithoutShowInputSchema),z.lazy(() => RundownCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RundownUpsertWithWhereUniqueWithoutShowInputSchema),z.lazy(() => RundownUpsertWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RundownCreateManyShowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RundownWhereUniqueInputSchema),z.lazy(() => RundownWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RundownWhereUniqueInputSchema),z.lazy(() => RundownWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RundownWhereUniqueInputSchema),z.lazy(() => RundownWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RundownWhereUniqueInputSchema),z.lazy(() => RundownWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RundownUpdateWithWhereUniqueWithoutShowInputSchema),z.lazy(() => RundownUpdateWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RundownUpdateManyWithWhereWithoutShowInputSchema),z.lazy(() => RundownUpdateManyWithWhereWithoutShowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RundownScalarWhereInputSchema),z.lazy(() => RundownScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default RundownUncheckedUpdateManyWithoutShowNestedInputSchema;
