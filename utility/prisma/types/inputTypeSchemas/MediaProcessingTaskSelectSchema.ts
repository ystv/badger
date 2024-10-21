import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaArgsSchema } from "../outputTypeSchemas/MediaArgsSchema"

export const MediaProcessingTaskSelectSchema: z.ZodType<Prisma.MediaProcessingTaskSelect> = z.object({
  id: z.boolean().optional(),
  media_id: z.boolean().optional(),
  description: z.boolean().optional(),
  additionalInfo: z.boolean().optional(),
  state: z.boolean().optional(),
  media: z.union([z.boolean(),z.lazy(() => MediaArgsSchema)]).optional(),
}).strict()

export default MediaProcessingTaskSelectSchema;
