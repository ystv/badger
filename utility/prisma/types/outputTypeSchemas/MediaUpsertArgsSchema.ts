import { z } from 'zod';
import type { Prisma } from '../../client';
import { MediaWhereUniqueInputSchema } from '../inputTypeSchemas/MediaWhereUniqueInputSchema'
import { MediaCreateInputSchema } from '../inputTypeSchemas/MediaCreateInputSchema'
import { MediaUncheckedCreateInputSchema } from '../inputTypeSchemas/MediaUncheckedCreateInputSchema'
import { MediaUpdateInputSchema } from '../inputTypeSchemas/MediaUpdateInputSchema'
import { MediaUncheckedUpdateInputSchema } from '../inputTypeSchemas/MediaUncheckedUpdateInputSchema'

export const MediaUpsertArgsSchema: z.ZodType<Omit<Prisma.MediaUpsertArgs, "select" | "include">> = z.object({
  where: MediaWhereUniqueInputSchema,
  create: z.union([ MediaCreateInputSchema,MediaUncheckedCreateInputSchema ]),
  update: z.union([ MediaUpdateInputSchema,MediaUncheckedUpdateInputSchema ]),
}).strict() ;

export default MediaUpsertArgsSchema;
