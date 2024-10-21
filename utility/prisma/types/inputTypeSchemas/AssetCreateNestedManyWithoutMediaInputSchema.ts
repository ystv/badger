import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetCreateWithoutMediaInputSchema } from './AssetCreateWithoutMediaInputSchema';
import { AssetUncheckedCreateWithoutMediaInputSchema } from './AssetUncheckedCreateWithoutMediaInputSchema';
import { AssetCreateOrConnectWithoutMediaInputSchema } from './AssetCreateOrConnectWithoutMediaInputSchema';
import { AssetCreateManyMediaInputEnvelopeSchema } from './AssetCreateManyMediaInputEnvelopeSchema';
import { AssetWhereUniqueInputSchema } from './AssetWhereUniqueInputSchema';

export const AssetCreateNestedManyWithoutMediaInputSchema: z.ZodType<Prisma.AssetCreateNestedManyWithoutMediaInput> = z.object({
  create: z.union([ z.lazy(() => AssetCreateWithoutMediaInputSchema),z.lazy(() => AssetCreateWithoutMediaInputSchema).array(),z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema),z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AssetCreateOrConnectWithoutMediaInputSchema),z.lazy(() => AssetCreateOrConnectWithoutMediaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AssetCreateManyMediaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AssetWhereUniqueInputSchema),z.lazy(() => AssetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default AssetCreateNestedManyWithoutMediaInputSchema;
