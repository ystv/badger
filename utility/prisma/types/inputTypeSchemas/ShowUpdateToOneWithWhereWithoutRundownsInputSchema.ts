import type { Prisma } from '../../client';

import { z } from 'zod';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';
import { ShowUpdateWithoutRundownsInputSchema } from './ShowUpdateWithoutRundownsInputSchema';
import { ShowUncheckedUpdateWithoutRundownsInputSchema } from './ShowUncheckedUpdateWithoutRundownsInputSchema';

export const ShowUpdateToOneWithWhereWithoutRundownsInputSchema: z.ZodType<Prisma.ShowUpdateToOneWithWhereWithoutRundownsInput> = z.object({
  where: z.lazy(() => ShowWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ShowUpdateWithoutRundownsInputSchema),z.lazy(() => ShowUncheckedUpdateWithoutRundownsInputSchema) ]),
}).strict();

export default ShowUpdateToOneWithWhereWithoutRundownsInputSchema;
