import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetWhereUniqueInputSchema } from './AssetWhereUniqueInputSchema';
import { AssetCreateWithoutRundownInputSchema } from './AssetCreateWithoutRundownInputSchema';
import { AssetUncheckedCreateWithoutRundownInputSchema } from './AssetUncheckedCreateWithoutRundownInputSchema';

export const AssetCreateOrConnectWithoutRundownInputSchema: z.ZodType<Prisma.AssetCreateOrConnectWithoutRundownInput> = z.object({
  where: z.lazy(() => AssetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AssetCreateWithoutRundownInputSchema),z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema) ]),
}).strict();

export default AssetCreateOrConnectWithoutRundownInputSchema;
