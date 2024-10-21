import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaProcessingTaskWhereUniqueInputSchema } from '../inputTypeSchemas/MediaProcessingTaskWhereUniqueInputSchema'

export const MediaProcessingTaskDeleteArgsSchema: z.ZodType<Omit<Prisma.MediaProcessingTaskDeleteArgs, "select" | "include">> = z.object({
  where: MediaProcessingTaskWhereUniqueInputSchema,
}).strict() ;

export default MediaProcessingTaskDeleteArgsSchema;
