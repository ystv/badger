import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFieldWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataFieldWhereUniqueInputSchema'
import { MetadataFieldCreateInputSchema } from '../inputTypeSchemas/MetadataFieldCreateInputSchema'
import { MetadataFieldUncheckedCreateInputSchema } from '../inputTypeSchemas/MetadataFieldUncheckedCreateInputSchema'
import { MetadataFieldUpdateInputSchema } from '../inputTypeSchemas/MetadataFieldUpdateInputSchema'
import { MetadataFieldUncheckedUpdateInputSchema } from '../inputTypeSchemas/MetadataFieldUncheckedUpdateInputSchema'

export const MetadataFieldUpsertArgsSchema: z.ZodType<Omit<Prisma.MetadataFieldUpsertArgs, "select" | "include">> = z.object({
  where: MetadataFieldWhereUniqueInputSchema,
  create: z.union([ MetadataFieldCreateInputSchema,MetadataFieldUncheckedCreateInputSchema ]),
  update: z.union([ MetadataFieldUpdateInputSchema,MetadataFieldUncheckedUpdateInputSchema ]),
}).strict() ;

export default MetadataFieldUpsertArgsSchema;
