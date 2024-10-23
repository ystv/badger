import { z } from 'zod';
import type { Prisma } from '../../client';
import { ShowCountOutputTypeSelectSchema } from './ShowCountOutputTypeSelectSchema';

export const ShowCountOutputTypeArgsSchema: z.ZodType<Prisma.ShowCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ShowCountOutputTypeSelectSchema).nullish(),
}).strict();

export default ShowCountOutputTypeSelectSchema;
