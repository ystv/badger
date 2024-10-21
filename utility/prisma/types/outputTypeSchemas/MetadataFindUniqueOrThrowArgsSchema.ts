import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataWhereUniqueInputSchema'

export const MetadataFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.MetadataFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: MetadataWhereUniqueInputSchema,
}).strict() ;

export default MetadataFindUniqueOrThrowArgsSchema;
