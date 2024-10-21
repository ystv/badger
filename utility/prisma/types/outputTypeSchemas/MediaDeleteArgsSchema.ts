import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaWhereUniqueInputSchema } from '../inputTypeSchemas/MediaWhereUniqueInputSchema'

export const MediaDeleteArgsSchema: z.ZodType<Omit<Prisma.MediaDeleteArgs, "select" | "include">> = z.object({
  where: MediaWhereUniqueInputSchema,
}).strict() ;

export default MediaDeleteArgsSchema;
