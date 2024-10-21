import type { Prisma } from '../../client';

import { z } from 'zod';
import { RundownItemWhereUniqueInputSchema } from './RundownItemWhereUniqueInputSchema';
import { RundownItemUpdateWithoutMediaInputSchema } from './RundownItemUpdateWithoutMediaInputSchema';
import { RundownItemUncheckedUpdateWithoutMediaInputSchema } from './RundownItemUncheckedUpdateWithoutMediaInputSchema';
import { RundownItemCreateWithoutMediaInputSchema } from './RundownItemCreateWithoutMediaInputSchema';
import { RundownItemUncheckedCreateWithoutMediaInputSchema } from './RundownItemUncheckedCreateWithoutMediaInputSchema';

export const RundownItemUpsertWithWhereUniqueWithoutMediaInputSchema: z.ZodType<Prisma.RundownItemUpsertWithWhereUniqueWithoutMediaInput> = z.object({
  where: z.lazy(() => RundownItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RundownItemUpdateWithoutMediaInputSchema),z.lazy(() => RundownItemUncheckedUpdateWithoutMediaInputSchema) ]),
  create: z.union([ z.lazy(() => RundownItemCreateWithoutMediaInputSchema),z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema) ]),
}).strict();

export default RundownItemUpsertWithWhereUniqueWithoutMediaInputSchema;
