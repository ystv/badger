import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFieldCreateInputSchema } from '../inputTypeSchemas/MetadataFieldCreateInputSchema'
import { MetadataFieldUncheckedCreateInputSchema } from '../inputTypeSchemas/MetadataFieldUncheckedCreateInputSchema'

export const MetadataFieldCreateArgsSchema: z.ZodType<Omit<Prisma.MetadataFieldCreateArgs, "select" | "include">> = z.object({
  data: z.union([ MetadataFieldCreateInputSchema,MetadataFieldUncheckedCreateInputSchema ]),
}).strict() ;

export default MetadataFieldCreateArgsSchema;
