import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaWhereUniqueInputSchema } from '../inputTypeSchemas/MediaWhereUniqueInputSchema'

export const MediaFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.MediaFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: MediaWhereUniqueInputSchema,
}).strict() ;

export default MediaFindUniqueOrThrowArgsSchema;
