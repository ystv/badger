import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaSelectSchema } from '../inputTypeSchemas/MediaSelectSchema';
import { MediaIncludeSchema } from '../inputTypeSchemas/MediaIncludeSchema';

export const MediaArgsSchema: z.ZodType<Prisma.MediaDefaultArgs> = z.object({
  select: z.lazy(() => MediaSelectSchema).optional(),
  include: z.lazy(() => MediaIncludeSchema).optional(),
}).strict();

export default MediaArgsSchema;
