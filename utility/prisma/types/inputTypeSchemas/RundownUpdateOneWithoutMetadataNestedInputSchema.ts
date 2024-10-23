import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownCreateWithoutMetadataInputSchema } from './RundownCreateWithoutMetadataInputSchema';
import { RundownUncheckedCreateWithoutMetadataInputSchema } from './RundownUncheckedCreateWithoutMetadataInputSchema';
import { RundownCreateOrConnectWithoutMetadataInputSchema } from './RundownCreateOrConnectWithoutMetadataInputSchema';
import { RundownUpsertWithoutMetadataInputSchema } from './RundownUpsertWithoutMetadataInputSchema';
import { RundownWhereInputSchema } from './RundownWhereInputSchema';
import { RundownWhereUniqueInputSchema } from './RundownWhereUniqueInputSchema';
import { RundownUpdateToOneWithWhereWithoutMetadataInputSchema } from './RundownUpdateToOneWithWhereWithoutMetadataInputSchema';
import { RundownUpdateWithoutMetadataInputSchema } from './RundownUpdateWithoutMetadataInputSchema';
import { RundownUncheckedUpdateWithoutMetadataInputSchema } from './RundownUncheckedUpdateWithoutMetadataInputSchema';

export const RundownUpdateOneWithoutMetadataNestedInputSchema: z.ZodType<Prisma.RundownUpdateOneWithoutMetadataNestedInput> = z.object({
  create: z.union([ z.lazy(() => RundownCreateWithoutMetadataInputSchema),z.lazy(() => RundownUncheckedCreateWithoutMetadataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RundownCreateOrConnectWithoutMetadataInputSchema).optional(),
  upsert: z.lazy(() => RundownUpsertWithoutMetadataInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RundownWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RundownWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RundownWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RundownUpdateToOneWithWhereWithoutMetadataInputSchema),z.lazy(() => RundownUpdateWithoutMetadataInputSchema),z.lazy(() => RundownUncheckedUpdateWithoutMetadataInputSchema) ]).optional(),
}).strict();

export default RundownUpdateOneWithoutMetadataNestedInputSchema;
