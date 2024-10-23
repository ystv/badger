import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataWhereUniqueInputSchema'

export const MetadataDeleteArgsSchema: z.ZodType<Omit<Prisma.MetadataDeleteArgs, "select" | "include">> = z.object({
  where: MetadataWhereUniqueInputSchema,
}).strict() ;

export default MetadataDeleteArgsSchema;
