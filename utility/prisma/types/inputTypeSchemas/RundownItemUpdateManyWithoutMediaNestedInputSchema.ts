import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemCreateWithoutMediaInputSchema } from './RundownItemCreateWithoutMediaInputSchema';
import { RundownItemUncheckedCreateWithoutMediaInputSchema } from './RundownItemUncheckedCreateWithoutMediaInputSchema';
import { RundownItemCreateOrConnectWithoutMediaInputSchema } from './RundownItemCreateOrConnectWithoutMediaInputSchema';
import { RundownItemUpsertWithWhereUniqueWithoutMediaInputSchema } from './RundownItemUpsertWithWhereUniqueWithoutMediaInputSchema';
import { RundownItemCreateManyMediaInputEnvelopeSchema } from './RundownItemCreateManyMediaInputEnvelopeSchema';
import { RundownItemWhereUniqueInputSchema } from './RundownItemWhereUniqueInputSchema';
import { RundownItemUpdateWithWhereUniqueWithoutMediaInputSchema } from './RundownItemUpdateWithWhereUniqueWithoutMediaInputSchema';
import { RundownItemUpdateManyWithWhereWithoutMediaInputSchema } from './RundownItemUpdateManyWithWhereWithoutMediaInputSchema';
import { RundownItemScalarWhereInputSchema } from './RundownItemScalarWhereInputSchema';

export const RundownItemUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.RundownItemUpdateManyWithoutMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => RundownItemCreateWithoutMediaInputSchema),z.lazy(() => RundownItemCreateWithoutMediaInputSchema).array(),z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema),z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema),z.lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RundownItemUpsertWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => RundownItemUpsertWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RundownItemCreateManyMediaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RundownItemWhereUniqueInputSchema),z.lazy(() => RundownItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RundownItemWhereUniqueInputSchema),z.lazy(() => RundownItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RundownItemWhereUniqueInputSchema),z.lazy(() => RundownItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RundownItemWhereUniqueInputSchema),z.lazy(() => RundownItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RundownItemUpdateWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => RundownItemUpdateWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RundownItemUpdateManyWithWhereWithoutMediaInputSchema),z.lazy(() => RundownItemUpdateManyWithWhereWithoutMediaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RundownItemScalarWhereInputSchema),z.lazy(() => RundownItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default RundownItemUpdateManyWithoutMediaNestedInputSchema;
