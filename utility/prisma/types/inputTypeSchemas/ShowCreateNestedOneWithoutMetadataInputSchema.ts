import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowCreateWithoutMetadataInputSchema } from './ShowCreateWithoutMetadataInputSchema';
import { ShowUncheckedCreateWithoutMetadataInputSchema } from './ShowUncheckedCreateWithoutMetadataInputSchema';
import { ShowCreateOrConnectWithoutMetadataInputSchema } from './ShowCreateOrConnectWithoutMetadataInputSchema';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';

export const ShowCreateNestedOneWithoutMetadataInputSchema: z.ZodType<Prisma.ShowCreateNestedOneWithoutMetadataInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutMetadataInputSchema),z.lazy(() => ShowUncheckedCreateWithoutMetadataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutMetadataInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional()
}).strict();

export default ShowCreateNestedOneWithoutMetadataInputSchema;
