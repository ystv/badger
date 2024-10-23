import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaCreateInputSchema } from '../inputTypeSchemas/MediaCreateInputSchema'
import { MediaUncheckedCreateInputSchema } from '../inputTypeSchemas/MediaUncheckedCreateInputSchema'

export const MediaCreateArgsSchema: z.ZodType<Omit<Prisma.MediaCreateArgs, "select" | "include">> = z.object({
  data: z.union([ MediaCreateInputSchema,MediaUncheckedCreateInputSchema ]),
}).strict() ;

export default MediaCreateArgsSchema;
