import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemCreateWithoutShowInputSchema } from './ContinuityItemCreateWithoutShowInputSchema';
import { ContinuityItemUncheckedCreateWithoutShowInputSchema } from './ContinuityItemUncheckedCreateWithoutShowInputSchema';
import { ContinuityItemCreateOrConnectWithoutShowInputSchema } from './ContinuityItemCreateOrConnectWithoutShowInputSchema';
import { ContinuityItemUpsertWithWhereUniqueWithoutShowInputSchema } from './ContinuityItemUpsertWithWhereUniqueWithoutShowInputSchema';
import { ContinuityItemCreateManyShowInputEnvelopeSchema } from './ContinuityItemCreateManyShowInputEnvelopeSchema';
import { ContinuityItemWhereUniqueInputSchema } from './ContinuityItemWhereUniqueInputSchema';
import { ContinuityItemUpdateWithWhereUniqueWithoutShowInputSchema } from './ContinuityItemUpdateWithWhereUniqueWithoutShowInputSchema';
import { ContinuityItemUpdateManyWithWhereWithoutShowInputSchema } from './ContinuityItemUpdateManyWithWhereWithoutShowInputSchema';
import { ContinuityItemScalarWhereInputSchema } from './ContinuityItemScalarWhereInputSchema';

export const ContinuityItemUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.ContinuityItemUpdateManyWithoutShowNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContinuityItemCreateWithoutShowInputSchema),z.lazy(() => ContinuityItemCreateWithoutShowInputSchema).array(),z.lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema),z.lazy(() => ContinuityItemUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContinuityItemCreateOrConnectWithoutShowInputSchema),z.lazy(() => ContinuityItemCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContinuityItemUpsertWithWhereUniqueWithoutShowInputSchema),z.lazy(() => ContinuityItemUpsertWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContinuityItemCreateManyShowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContinuityItemWhereUniqueInputSchema),z.lazy(() => ContinuityItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContinuityItemWhereUniqueInputSchema),z.lazy(() => ContinuityItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContinuityItemWhereUniqueInputSchema),z.lazy(() => ContinuityItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContinuityItemWhereUniqueInputSchema),z.lazy(() => ContinuityItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContinuityItemUpdateWithWhereUniqueWithoutShowInputSchema),z.lazy(() => ContinuityItemUpdateWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContinuityItemUpdateManyWithWhereWithoutShowInputSchema),z.lazy(() => ContinuityItemUpdateManyWithWhereWithoutShowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContinuityItemScalarWhereInputSchema),z.lazy(() => ContinuityItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ContinuityItemUpdateManyWithoutShowNestedInputSchema;
