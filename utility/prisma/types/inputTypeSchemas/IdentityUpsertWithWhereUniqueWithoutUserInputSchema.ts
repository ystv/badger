import type { Prisma } from '../../client';

import { z } from 'zod';
import { IdentityWhereUniqueInputSchema } from './IdentityWhereUniqueInputSchema';
import { IdentityUpdateWithoutUserInputSchema } from './IdentityUpdateWithoutUserInputSchema';
import { IdentityUncheckedUpdateWithoutUserInputSchema } from './IdentityUncheckedUpdateWithoutUserInputSchema';
import { IdentityCreateWithoutUserInputSchema } from './IdentityCreateWithoutUserInputSchema';
import { IdentityUncheckedCreateWithoutUserInputSchema } from './IdentityUncheckedCreateWithoutUserInputSchema';

export const IdentityUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.IdentityUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => IdentityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IdentityUpdateWithoutUserInputSchema),z.lazy(() => IdentityUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => IdentityCreateWithoutUserInputSchema),z.lazy(() => IdentityUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default IdentityUpsertWithWhereUniqueWithoutUserInputSchema;
