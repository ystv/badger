import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaCountOutputTypeSelectSchema } from './MediaCountOutputTypeSelectSchema';

export const MediaCountOutputTypeArgsSchema: z.ZodType<Prisma.MediaCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MediaCountOutputTypeSelectSchema).nullish(),
}).strict();

export default MediaCountOutputTypeSelectSchema;
