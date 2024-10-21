import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFieldWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataFieldWhereUniqueInputSchema'

export const MetadataFieldFindUniqueArgsSchema: z.ZodType<Omit<Prisma.MetadataFieldFindUniqueArgs, "select" | "include">> = z.object({
  where: MetadataFieldWhereUniqueInputSchema,
}).strict() ;

export default MetadataFieldFindUniqueArgsSchema;
