import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFieldCreateManyInputSchema } from '../inputTypeSchemas/MetadataFieldCreateManyInputSchema'

export const MetadataFieldCreateManyArgsSchema: z.ZodType<Prisma.MetadataFieldCreateManyArgs> = z.object({
  data: z.union([ MetadataFieldCreateManyInputSchema,MetadataFieldCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default MetadataFieldCreateManyArgsSchema;
