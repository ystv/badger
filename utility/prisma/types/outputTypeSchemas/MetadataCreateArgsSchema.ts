import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataCreateInputSchema } from '../inputTypeSchemas/MetadataCreateInputSchema'
import { MetadataUncheckedCreateInputSchema } from '../inputTypeSchemas/MetadataUncheckedCreateInputSchema'

export const MetadataCreateArgsSchema: z.ZodType<Omit<Prisma.MetadataCreateArgs, "select" | "include">> = z.object({
  data: z.union([ MetadataCreateInputSchema,MetadataUncheckedCreateInputSchema ]),
}).strict() ;

export default MetadataCreateArgsSchema;
