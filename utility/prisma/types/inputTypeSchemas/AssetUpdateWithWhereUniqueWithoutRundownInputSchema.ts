import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetWhereUniqueInputSchema } from './AssetWhereUniqueInputSchema';
import { AssetUpdateWithoutRundownInputSchema } from './AssetUpdateWithoutRundownInputSchema';
import { AssetUncheckedUpdateWithoutRundownInputSchema } from './AssetUncheckedUpdateWithoutRundownInputSchema';

export const AssetUpdateWithWhereUniqueWithoutRundownInputSchema: z.ZodType<Prisma.AssetUpdateWithWhereUniqueWithoutRundownInput> = z.object({
  where: z.lazy(() => AssetWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AssetUpdateWithoutRundownInputSchema),z.lazy(() => AssetUncheckedUpdateWithoutRundownInputSchema) ]),
}).strict();

export default AssetUpdateWithWhereUniqueWithoutRundownInputSchema;
