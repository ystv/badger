import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetWhereUniqueInputSchema } from './AssetWhereUniqueInputSchema';
import { AssetUpdateWithoutMediaInputSchema } from './AssetUpdateWithoutMediaInputSchema';
import { AssetUncheckedUpdateWithoutMediaInputSchema } from './AssetUncheckedUpdateWithoutMediaInputSchema';
import { AssetCreateWithoutMediaInputSchema } from './AssetCreateWithoutMediaInputSchema';
import { AssetUncheckedCreateWithoutMediaInputSchema } from './AssetUncheckedCreateWithoutMediaInputSchema';

export const AssetUpsertWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.AssetUpsertWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => AssetWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AssetUpdateWithoutMediaInputSchema),z.lazy(() => AssetUncheckedUpdateWithoutMediaInputSchema) ]),
  create: z.union([ z.lazy(() => AssetCreateWithoutMediaInputSchema),z.lazy(() => AssetUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export default AssetUpsertWithWhereUniqueWithoutMediaInputSchema;
