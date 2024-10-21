import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaProcessingTaskWhereUniqueInputSchema } from '../inputTypeSchemas/MediaProcessingTaskWhereUniqueInputSchema'

export const MediaProcessingTaskFindUniqueArgsSchema: z.ZodType<Omit<Prisma.MediaProcessingTaskFindUniqueArgs, "select" | "include">> = z.object({
  where: MediaProcessingTaskWhereUniqueInputSchema,
}).strict() ;

export default MediaProcessingTaskFindUniqueArgsSchema;
