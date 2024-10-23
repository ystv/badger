import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetWhereUniqueInputSchema } from './AssetWhereUniqueInputSchema';
import { AssetCreateWithoutMediaInputSchema } from './AssetCreateWithoutMediaInputSchema';
import { AssetUncheckedCreateWithoutMediaInputSchema } from './AssetUncheckedCreateWithoutMediaInputSchema';

export const AssetCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.AssetCreateOrConnectWithoutMediaInput> = z.object({
  where: z.lazy(() => AssetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AssetCreateWithoutMediaInputSchema),z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export default AssetCreateOrConnectWithoutMediaInputSchema;
