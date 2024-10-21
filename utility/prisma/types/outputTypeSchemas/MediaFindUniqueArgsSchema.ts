import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaWhereUniqueInputSchema } from '../inputTypeSchemas/MediaWhereUniqueInputSchema'

export const MediaFindUniqueArgsSchema: z.ZodType<Omit<Prisma.MediaFindUniqueArgs, "select" | "include">> = z.object({
  where: MediaWhereUniqueInputSchema,
}).strict() ;

export default MediaFindUniqueArgsSchema;
