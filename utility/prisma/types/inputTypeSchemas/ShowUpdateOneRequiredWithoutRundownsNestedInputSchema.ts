import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowCreateWithoutRundownsInputSchema } from './ShowCreateWithoutRundownsInputSchema';
import { ShowUncheckedCreateWithoutRundownsInputSchema } from './ShowUncheckedCreateWithoutRundownsInputSchema';
import { ShowCreateOrConnectWithoutRundownsInputSchema } from './ShowCreateOrConnectWithoutRundownsInputSchema';
import { ShowUpsertWithoutRundownsInputSchema } from './ShowUpsertWithoutRundownsInputSchema';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';
import { ShowUpdateToOneWithWhereWithoutRundownsInputSchema } from './ShowUpdateToOneWithWhereWithoutRundownsInputSchema';
import { ShowUpdateWithoutRundownsInputSchema } from './ShowUpdateWithoutRundownsInputSchema';
import { ShowUncheckedUpdateWithoutRundownsInputSchema } from './ShowUncheckedUpdateWithoutRundownsInputSchema';

export const ShowUpdateOneRequiredWithoutRundownsNestedInputSchema: z.ZodType<Prisma.ShowUpdateOneRequiredWithoutRundownsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutRundownsInputSchema),z.lazy(() => ShowUncheckedCreateWithoutRundownsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ShowCreateOrConnectWithoutRundownsInputSchema).optional(),
  upsert: z.lazy(() => ShowUpsertWithoutRundownsInputSchema).optional(),
  connect: z.lazy(() => ShowWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ShowUpdateToOneWithWhereWithoutRundownsInputSchema),z.lazy(() => ShowUpdateWithoutRundownsInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutRundownsInputSchema) ]).optional(),
}).strict();

export default ShowUpdateOneRequiredWithoutRundownsNestedInputSchema;
