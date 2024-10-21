import type { Prisma } from '../../client';

import { z } from 'zod';
import { AssetScalarWhereInputSchema } from './AssetScalarWhereInputSchema';
import { AssetUpdateManyMutationInputSchema } from './AssetUpdateManyMutationInputSchema';
import { AssetUncheckedUpdateManyWithoutRundownInputSchema } from './AssetUncheckedUpdateManyWithoutRundownInputSchema';

export const AssetUpdateManyWithWhereWithoutRundownInputSchema: z.ZodType<Prisma.AssetUpdateManyWithWhereWithoutRundownInput> = z.object({
  where: z.lazy(() => AssetScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AssetUpdateManyMutationInputSchema),z.lazy(() => AssetUncheckedUpdateManyWithoutRundownInputSchema) ]),
}).strict();

export default AssetUpdateManyWithWhereWithoutRundownInputSchema;
