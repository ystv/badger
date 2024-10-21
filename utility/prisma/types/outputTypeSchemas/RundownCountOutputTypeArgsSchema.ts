import { z } from 'zod';
import type { Prisma } from '../../client';
import { RundownCountOutputTypeSelectSchema } from './RundownCountOutputTypeSelectSchema';

export const RundownCountOutputTypeArgsSchema: z.ZodType<Prisma.RundownCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RundownCountOutputTypeSelectSchema).nullish(),
}).strict();

export default RundownCountOutputTypeSelectSchema;
