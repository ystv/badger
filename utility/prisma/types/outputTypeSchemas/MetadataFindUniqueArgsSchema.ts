import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataWhereUniqueInputSchema'

export const MetadataFindUniqueArgsSchema: z.ZodType<Omit<Prisma.MetadataFindUniqueArgs, "select" | "include">> = z.object({
  where: MetadataWhereUniqueInputSchema,
}).strict() ;

export default MetadataFindUniqueArgsSchema;
