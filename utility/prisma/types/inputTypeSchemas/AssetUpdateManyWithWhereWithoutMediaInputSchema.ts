import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetScalarWhereInputSchema } from './AssetScalarWhereInputSchema';
import { AssetUpdateManyMutationInputSchema } from './AssetUpdateManyMutationInputSchema';
import { AssetUncheckedUpdateManyWithoutMediaInputSchema } from './AssetUncheckedUpdateManyWithoutMediaInputSchema';

export const AssetUpdateManyWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.AssetUpdateManyWithWhereWithoutMediaInput> = z.object({
  where: z.lazy(() => AssetScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AssetUpdateManyMutationInputSchema),z.lazy(() => AssetUncheckedUpdateManyWithoutMediaInputSchema) ]),
}).strict();

export default AssetUpdateManyWithWhereWithoutMediaInputSchema;
