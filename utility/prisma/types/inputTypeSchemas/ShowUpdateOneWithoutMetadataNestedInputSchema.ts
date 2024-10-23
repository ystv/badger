import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowCreateWithoutMetadataInputSchema } from './ShowCreateWithoutMetadataInputSchema';
import { ShowUncheckedCreateWithoutMetadataInputSchema } from './ShowUncheckedCreateWithoutMetadataInputSchema';
import { ShowCreateOrConnectWithoutMetadataInputSchema } from './ShowCreateOrConnectWithoutMetadataInputSchema';
import { ShowUpsertWithoutMetadataInputSchema } from './ShowUpsertWithoutMetadataInputSchema';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';
import { ShowUpdateToOneWithWhereWithoutMetadataInputSchema } from './ShowUpdateToOneWithWhereWithoutMetadataInputSchema';
import { ShowUpdateWithoutMetadataInputSchema } from './ShowUpdateWithoutMetadataInputSchema';
import { ShowUncheckedUpdateWithoutMetadataInputSchema } from './ShowUncheckedUpdateWithoutMetadataInputSchema';

export const ShowUpdateOneWithoutMetadataNestedInputSchema: z.ZodType<Prisma.ShowUpdateOneWithoutMetadataNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutMetadataInputSchema),z.lazy(() => ShowUncheckedCreateWithoutMetadataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutMetadataInputSchema).optional(),
  upsert: z.lazy(() => ShowUpsertWithoutMetadataInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ShowWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ShowWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShowUpdateToOneWithWhereWithoutMetadataInputSchema),z.lazy(() => ShowUpdateWithoutMetadataInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutMetadataInputSchema) ]).optional(),
}).strict();

export default ShowUpdateOneWithoutMetadataNestedInputSchema;
