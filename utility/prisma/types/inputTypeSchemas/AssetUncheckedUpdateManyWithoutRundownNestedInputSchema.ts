import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetCreateWithoutRundownInputSchema } from './AssetCreateWithoutRundownInputSchema';
import { AssetUncheckedCreateWithoutRundownInputSchema } from './AssetUncheckedCreateWithoutRundownInputSchema';
import { AssetCreateOrConnectWithoutRundownInputSchema } from './AssetCreateOrConnectWithoutRundownInputSchema';
import { AssetUpsertWithWhereUniqueWithoutRundownInputSchema } from './AssetUpsertWithWhereUniqueWithoutRundownInputSchema';
import { AssetCreateManyRundownInputEnvelopeSchema } from './AssetCreateManyRundownInputEnvelopeSchema';
import { AssetWhereUniqueInputSchema } from './AssetWhereUniqueInputSchema';
import { AssetUpdateWithWhereUniqueWithoutRundownInputSchema } from './AssetUpdateWithWhereUniqueWithoutRundownInputSchema';
import { AssetUpdateManyWithWhereWithoutRundownInputSchema } from './AssetUpdateManyWithWhereWithoutRundownInputSchema';
import { AssetScalarWhereInputSchema } from './AssetScalarWhereInputSchema';

export const AssetUncheckedUpdateManyWithoutRundownNestedInputSchema: z.ZodType<Prisma.AssetUncheckedUpdateManyWithoutRundownNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssetCreateWithoutRundownInputSchema),z.lazy(() => AssetCreateWithoutRundownInputSchema).array(),z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema),z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssetCreateOrConnectWithoutRundownInputSchema),z.lazy(() => AssetCreateOrConnectWithoutRundownInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AssetUpsertWithWhereUniqueWithoutRundownInputSchema),z.lazy(() => AssetUpsertWithWhereUniqueWithoutRundownInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssetCreateManyRundownInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AssetWhereUniqueInputSchema),z.lazy(() => AssetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AssetWhereUniqueInputSchema),z.lazy(() => AssetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AssetWhereUniqueInputSchema),z.lazy(() => AssetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssetWhereUniqueInputSchema),z.lazy(() => AssetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AssetUpdateWithWhereUniqueWithoutRundownInputSchema),z.lazy(() => AssetUpdateWithWhereUniqueWithoutRundownInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AssetUpdateManyWithWhereWithoutRundownInputSchema),z.lazy(() => AssetUpdateManyWithWhereWithoutRundownInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AssetScalarWhereInputSchema),z.lazy(() => AssetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AssetUncheckedUpdateManyWithoutRundownNestedInputSchema;
