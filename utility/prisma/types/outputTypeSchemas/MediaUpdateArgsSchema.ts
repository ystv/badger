import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaUpdateInputSchema } from '../inputTypeSchemas/MediaUpdateInputSchema'
import { MediaUncheckedUpdateInputSchema } from '../inputTypeSchemas/MediaUncheckedUpdateInputSchema'
import { MediaWhereUniqueInputSchema } from '../inputTypeSchemas/MediaWhereUniqueInputSchema'

export const MediaUpdateArgsSchema: z.ZodType<Omit<Prisma.MediaUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ MediaUpdateInputSchema,MediaUncheckedUpdateInputSchema ]),
  where: MediaWhereUniqueInputSchema,
}).strict() ;

export default MediaUpdateArgsSchema;
