import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetCreateWithoutMediaInputSchema } from './AssetCreateWithoutMediaInputSchema';
import { AssetUncheckedCreateWithoutMediaInputSchema } from './AssetUncheckedCreateWithoutMediaInputSchema';
import { AssetCreateOrConnectWithoutMediaInputSchema } from './AssetCreateOrConnectWithoutMediaInputSchema';
import { AssetUpsertWithWhereUniqueWithoutMediaInputSchema } from './AssetUpsertWithWhereUniqueWithoutMediaInputSchema';
import { AssetCreateManyMediaInputEnvelopeSchema } from './AssetCreateManyMediaInputEnvelopeSchema';
import { AssetWhereUniqueInputSchema } from './AssetWhereUniqueInputSchema';
import { AssetUpdateWithWhereUniqueWithoutMediaInputSchema } from './AssetUpdateWithWhereUniqueWithoutMediaInputSchema';
import { AssetUpdateManyWithWhereWithoutMediaInputSchema } from './AssetUpdateManyWithWhereWithoutMediaInputSchema';
import { AssetScalarWhereInputSchema } from './AssetScalarWhereInputSchema';

export const AssetUncheckedUpdateManyWithoutMediaNestedInputSchema: z.ZodType<Prisma.AssetUncheckedUpdateManyWithoutMediaNestedInput> = z.object({
  create: z.union([ z.lazy(() => AssetCreateWithoutMediaInputSchema),z.lazy(() => AssetCreateWithoutMediaInputSchema).array(),z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema),z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssetCreateOrConnectWithoutMediaInputSchema),z.lazy(() => AssetCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AssetUpsertWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => AssetUpsertWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssetCreateManyMediaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AssetWhereUniqueInputSchema),z.lazy(() => AssetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AssetWhereUniqueInputSchema),z.lazy(() => AssetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AssetWhereUniqueInputSchema),z.lazy(() => AssetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AssetWhereUniqueInputSchema),z.lazy(() => AssetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AssetUpdateWithWhereUniqueWithoutMediaInputSchema),z.lazy(() => AssetUpdateWithWhereUniqueWithoutMediaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AssetUpdateManyWithWhereWithoutMediaInputSchema),z.lazy(() => AssetUpdateManyWithWhereWithoutMediaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AssetScalarWhereInputSchema),z.lazy(() => AssetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AssetUncheckedUpdateManyWithoutMediaNestedInputSchema;
