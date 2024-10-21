import type { Prisma } from '../../client';

import { z } from 'zod';
import { ContinuityItemCreateWithoutMediaInputSchema } from './ContinuityItemCreateWithoutMediaInputSchema';
import { ContinuityItemUncheckedCreateWithoutMediaInputSchema } from './ContinuityItemUncheckedCreateWithoutMediaInputSchema';
import { ContinuityItemCreateOrConnectWithoutMediaInputSchema } from './ContinuityItemCreateOrConnectWithoutMediaInputSchema';
import { ContinuityItemUpsertWithWhereUniqueWithoutMediaInputSchema } from './ContinuityItemUpsertWithWhereUniqueWithoutMediaInputSchema';
import { ContinuityItemCreateManyMediaInputEnvelopeSchema } from './ContinuityItemCreateManyMediaInputEnvelopeSchema';
import { ContinuityItemWhereUniqueInputSchema } from './ContinuityItemWhereUniqueInputSchema';
import { ContinuityItemUpdateWithWhereUniqueWithoutMediaInputSchema } from './ContinuityItemUpdateWithWhereUniqueWithoutMediaInputSchema';
import { ContinuityItemUpdateManyWithWhereWithoutMediaInputSchema } from './ContinuityItemUpdateManyWithWhereWithoutMediaInputSchema';
import { ContinuityItemScalarWhereInputSchema } from './ContinuityItemScalarWhereInputSchema';

export const ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.ContinuityItemUncheckedUpdateManyWithoutMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema),z.lazy(() => ContinuityItemCreateWithoutMediaInputSchema).array(),z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema),z.lazy(() => ContinuityItemUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema),z.lazy(() => ContinuityItemCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContinuityItemUpsertWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => ContinuityItemUpsertWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContinuityItemCreateManyMediaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContinuityItemWhereUniqueInputSchema),z.lazy(() => ContinuityItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContinuityItemWhereUniqueInputSchema),z.lazy(() => ContinuityItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContinuityItemWhereUniqueInputSchema),z.lazy(() => ContinuityItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContinuityItemWhereUniqueInputSchema),z.lazy(() => ContinuityItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContinuityItemUpdateWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => ContinuityItemUpdateWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContinuityItemUpdateManyWithWhereWithoutMediaInputSchema),z.lazy(() => ContinuityItemUpdateManyWithWhereWithoutMediaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContinuityItemScalarWhereInputSchema),z.lazy(() => ContinuityItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ContinuityItemUncheckedUpdateManyWithoutMediaNestedInputSchema;
