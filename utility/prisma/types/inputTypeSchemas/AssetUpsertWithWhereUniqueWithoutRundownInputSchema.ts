import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetWhereUniqueInputSchema } from './AssetWhereUniqueInputSchema';
import { AssetUpdateWithoutRundownInputSchema } from './AssetUpdateWithoutRundownInputSchema';
import { AssetUncheckedUpdateWithoutRundownInputSchema } from './AssetUncheckedUpdateWithoutRundownInputSchema';
import { AssetCreateWithoutRundownInputSchema } from './AssetCreateWithoutRundownInputSchema';
import { AssetUncheckedCreateWithoutRundownInputSchema } from './AssetUncheckedCreateWithoutRundownInputSchema';

export const AssetUpsertWithWhereUniqueWithoutRundownInputSchema: z.ZodType<Prisma.AssetUpsertWithWhereUniqueWithoutRundownInput> = z.object({
  where: z.lazy(() => AssetWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AssetUpdateWithoutRundownInputSchema),z.lazy(() => AssetUncheckedUpdateWithoutRundownInputSchema) ]),
  create: z.union([ z.lazy(() => AssetCreateWithoutRundownInputSchema),z.lazy(() => AssetUncheckedCreateWithoutRundownInputSchema) ]),
}).strict();

export default AssetUpsertWithWhereUniqueWithoutRundownInputSchema;
