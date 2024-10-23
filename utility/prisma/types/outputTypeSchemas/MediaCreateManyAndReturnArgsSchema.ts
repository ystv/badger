import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaCreateManyInputSchema } from '../inputTypeSchemas/MediaCreateManyInputSchema'

export const MediaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MediaCreateManyAndReturnArgs> = z.object({
  data: z.union([ MediaCreateManyInputSchema,MediaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default MediaCreateManyAndReturnArgsSchema;
