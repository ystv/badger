import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataWhereInputSchema } from '../inputTypeSchemas/MetadataWhereInputSchema'

export const MetadataDeleteManyArgsSchema: z.ZodType<Prisma.MetadataDeleteManyArgs> = z.object({
  where: MetadataWhereInputSchema.optional(),
}).strict() ;

export default MetadataDeleteManyArgsSchema;
