import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFieldCreateManyInputSchema } from '../inputTypeSchemas/MetadataFieldCreateManyInputSchema'

export const MetadataFieldCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MetadataFieldCreateManyAndReturnArgs> = z.object({
  data: z.union([ MetadataFieldCreateManyInputSchema,MetadataFieldCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default MetadataFieldCreateManyAndReturnArgsSchema;
