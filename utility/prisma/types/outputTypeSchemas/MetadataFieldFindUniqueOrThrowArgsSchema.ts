import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFieldWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataFieldWhereUniqueInputSchema'

export const MetadataFieldFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.MetadataFieldFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: MetadataFieldWhereUniqueInputSchema,
}).strict() ;

export default MetadataFieldFindUniqueOrThrowArgsSchema;
