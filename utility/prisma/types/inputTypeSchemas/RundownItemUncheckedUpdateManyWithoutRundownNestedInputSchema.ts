import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemCreateWithoutRundownInputSchema } from './RundownItemCreateWithoutRundownInputSchema';
import { RundownItemUncheckedCreateWithoutRundownInputSchema } from './RundownItemUncheckedCreateWithoutRundownInputSchema';
import { RundownItemCreateOrConnectWithoutRundownInputSchema } from './RundownItemCreateOrConnectWithoutRundownInputSchema';
import { RundownItemUpsertWithWhereUniqueWithoutRundownInputSchema } from './RundownItemUpsertWithWhereUniqueWithoutRundownInputSchema';
import { RundownItemCreateManyRundownInputEnvelopeSchema } from './RundownItemCreateManyRundownInputEnvelopeSchema';
import { RundownItemWhereUniqueInputSchema } from './RundownItemWhereUniqueInputSchema';
import { RundownItemUpdateWithWhereUniqueWithoutRundownInputSchema } from './RundownItemUpdateWithWhereUniqueWithoutRundownInputSchema';
import { RundownItemUpdateManyWithWhereWithoutRundownInputSchema } from './RundownItemUpdateManyWithWhereWithoutRundownInputSchema';
import { RundownItemScalarWhereInputSchema } from './RundownItemScalarWhereInputSchema';

export const RundownItemUncheckedUpdateManyWithoutRundownNestedInputSchema: z.ZodType<Prisma.RundownItemUncheckedUpdateManyWithoutRundownNestedInput> = z.object({
  create: z.union([ z.lazy(() => RundownItemCreateWithoutRundownInputSchema),z.lazy(() => RundownItemCreateWithoutRundownInputSchema).array(),z.lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema),z.lazy(() => RundownItemUncheckedCreateWithoutRundownInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RundownItemCreateOrConnectWithoutRundownInputSchema),z.lazy(() => RundownItemCreateOrConnectWithoutRundownInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RundownItemUpsertWithWhereUniqueWithoutRundownInputSchema),z.lazy(() => RundownItemUpsertWithWhereUniqueWithoutRundownInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RundownItemCreateManyRundownInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RundownItemWhereUniqueInputSchema),z.lazy(() => RundownItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RundownItemWhereUniqueInputSchema),z.lazy(() => RundownItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RundownItemWhereUniqueInputSchema),z.lazy(() => RundownItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RundownItemWhereUniqueInputSchema),z.lazy(() => RundownItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RundownItemUpdateWithWhereUniqueWithoutRundownInputSchema),z.lazy(() => RundownItemUpdateWithWhereUniqueWithoutRundownInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RundownItemUpdateManyWithWhereWithoutRundownInputSchema),z.lazy(() => RundownItemUpdateManyWithWhereWithoutRundownInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RundownItemScalarWhereInputSchema),z.lazy(() => RundownItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default RundownItemUncheckedUpdateManyWithoutRundownNestedInputSchema;
