import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataUpdateInputSchema } from '../inputTypeSchemas/MetadataUpdateInputSchema'
import { MetadataUncheckedUpdateInputSchema } from '../inputTypeSchemas/MetadataUncheckedUpdateInputSchema'
import { MetadataWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataWhereUniqueInputSchema'

export const MetadataUpdateArgsSchema: z.ZodType<Omit<Prisma.MetadataUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ MetadataUpdateInputSchema,MetadataUncheckedUpdateInputSchema ]),
  where: MetadataWhereUniqueInputSchema,
}).strict() ;

export default MetadataUpdateArgsSchema;
