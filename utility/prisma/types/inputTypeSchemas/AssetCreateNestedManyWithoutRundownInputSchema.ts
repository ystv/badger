import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetCreateWithoutRundownInputSchema } from './AssetCreateWithoutRundownInputSchema';
import { AssetUncheckedCreateWithoutRundownInputSchema } from './AssetUncheckedCreateWithoutRundownInputSchema';
import { AssetCreateOrConnectWithoutRundownInputSchema } from './AssetCreateOrConnectWithoutRundownInputSchema';
import { AssetCreateManyRundownInputEnvelopeSchema } from './AssetCreateManyRundownInputEnvelopeSchema';
import { AssetWhereUniqueInputSchema } from './AssetWhereUniqueInputSchema';

export const AssetCreateNestedManyWithoutRundownInputSchema: z.ZodType<Prisma.AssetCreateNestedManyWithoutRundownInput> = z.object({
  create: z.union([ z.lazy(() => AssetCreateWithoutRundownInputSchema),z.lazy(() => AssetCreateWithoutRundownInputSchema).array(),z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema),z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssetCreateOrConnectWithoutRundownInputSchema),z.lazy(() => AssetCreateOrConnectWithoutRundownInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssetCreateManyRundownInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AssetWhereUniqueInputSchema),z.lazy(() => AssetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default AssetCreateNestedManyWithoutRundownInputSchema;
