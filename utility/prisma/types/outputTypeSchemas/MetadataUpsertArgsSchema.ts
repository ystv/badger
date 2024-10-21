import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataWhereUniqueInputSchema'
import { MetadataCreateInputSchema } from '../inputTypeSchemas/MetadataCreateInputSchema'
import { MetadataUncheckedCreateInputSchema } from '../inputTypeSchemas/MetadataUncheckedCreateInputSchema'
import { MetadataUpdateInputSchema } from '../inputTypeSchemas/MetadataUpdateInputSchema'
import { MetadataUncheckedUpdateInputSchema } from '../inputTypeSchemas/MetadataUncheckedUpdateInputSchema'

export const MetadataUpsertArgsSchema: z.ZodType<Omit<Prisma.MetadataUpsertArgs, "select" | "include">> = z.object({
  where: MetadataWhereUniqueInputSchema,
  create: z.union([ MetadataCreateInputSchema,MetadataUncheckedCreateInputSchema ]),
  update: z.union([ MetadataUpdateInputSchema,MetadataUncheckedUpdateInputSchema ]),
}).strict() ;

export default MetadataUpsertArgsSchema;
