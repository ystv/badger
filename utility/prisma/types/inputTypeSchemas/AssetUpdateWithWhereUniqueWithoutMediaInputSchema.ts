import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetWhereUniqueInputSchema } from './AssetWhereUniqueInputSchema';
import { AssetUpdateWithoutMediaInputSchema } from './AssetUpdateWithoutMediaInputSchema';
import { AssetUncheckedUpdateWithoutMediaInputSchema } from './AssetUncheckedUpdateWithoutMediaInputSchema';

export const AssetUpdateWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.AssetUpdateWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => AssetWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AssetUpdateWithoutMediaInputSchema),z.lazy(() => AssetUncheckedUpdateWithoutMediaInputSchema) ]),
}).strict();

export default AssetUpdateWithWhereUniqueWithoutMediaInputSchema;
