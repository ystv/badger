import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownCreateWithoutAssetsInputSchema } from './RundownCreateWithoutAssetsInputSchema';
import { RundownUncheckedCreateWithoutAssetsInputSchema } from './RundownUncheckedCreateWithoutAssetsInputSchema';
import { RundownCreateOrConnectWithoutAssetsInputSchema } from './RundownCreateOrConnectWithoutAssetsInputSchema';
import { RundownUpsertWithoutAssetsInputSchema } from './RundownUpsertWithoutAssetsInputSchema';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';
import { RundownUpdateToOneWithWhereWithoutAssetsInputSchema } from './RundownUpdateToOneWithWhereWithoutAssetsInputSchema';
import { RundownUpdateWithoutAssetsInputSchema } from './RundownUpdateWithoutAssetsInputSchema';
import { RundownUncheckedUpdateWithoutAssetsInputSchema } from './RundownUncheckedUpdateWithoutAssetsInputSchema';

export const RundownUpdateOneRequiredWithoutAssetsNestedInputSchema: z.ZodType<Prisma.RundownUpdateOneRequiredWithoutAssetsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RundownCreateWithoutAssetsInputSchema),z.lazy(() => RundownUncheckedCreateWithoutAssetsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RundownCreateOrConnectWithoutAssetsInputSchema).optional(),
  upsert: z.lazy(() => RundownUpsertWithoutAssetsInputSchema).optional(),
  connect: z.lazy(() => RundownWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RundownUpdateToOneWithWhereWithoutAssetsInputSchema),z.lazy(() => RundownUpdateWithoutAssetsInputSchema),z.lazy(() => RundownUncheckedUpdateWithoutAssetsInputSchema) ]).optional(),
}).strict();

export default RundownUpdateOneRequiredWithoutAssetsNestedInputSchema;
