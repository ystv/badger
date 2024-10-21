import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFieldUpdateInputSchema } from '../inputTypeSchemas/MetadataFieldUpdateInputSchema'
import { MetadataFieldUncheckedUpdateInputSchema } from '../inputTypeSchemas/MetadataFieldUncheckedUpdateInputSchema'
import { MetadataFieldWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataFieldWhereUniqueInputSchema'

export const MetadataFieldUpdateArgsSchema: z.ZodType<Omit<Prisma.MetadataFieldUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ MetadataFieldUpdateInputSchema,MetadataFieldUncheckedUpdateInputSchema ]),
  where: MetadataFieldWhereUniqueInputSchema,
}).strict() ;

export default MetadataFieldUpdateArgsSchema;
