import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowUpdateWithoutRundownsInputSchema } from './ShowUpdateWithoutRundownsInputSchema';
import { ShowUncheckedUpdateWithoutRundownsInputSchema } from './ShowUncheckedUpdateWithoutRundownsInputSchema';
import { ShowCreateWithoutRundownsInputSchema } from './ShowCreateWithoutRundownsInputSchema';
import { ShowUncheckedCreateWithoutRundownsInputSchema } from './ShowUncheckedCreateWithoutRundownsInputSchema';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';

export const ShowUpsertWithoutRundownsInputSchema: z.ZodType<Prisma.ShowUpsertWithoutRundownsInput> = z.object({
  update: z.union([ z.lazy(() => ShowUpdateWithoutRundownsInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutRundownsInputSchema) ]),
  create: z.union([ z.lazy(() => ShowCreateWithoutRundownsInputSchema),z.lazy(() => ShowUncheckedCreateWithoutRundownsInputSchema) ]),
  where: z.lazy(() => ShowWhereInputSchema).optional()
}).strict();

export default ShowUpsertWithoutRundownsInputSchema;
