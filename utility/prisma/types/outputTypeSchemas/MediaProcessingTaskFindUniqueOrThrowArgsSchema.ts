import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaProcessingTaskWhereUniqueInputSchema } from '../inputTypeSchemas/MediaProcessingTaskWhereUniqueInputSchema'

export const MediaProcessingTaskFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.MediaProcessingTaskFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: MediaProcessingTaskWhereUniqueInputSchema,
}).strict() ;

export default MediaProcessingTaskFindUniqueOrThrowArgsSchema;
