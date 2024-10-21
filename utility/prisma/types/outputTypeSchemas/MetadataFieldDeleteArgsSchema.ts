import { z } from 'zod';
import type { Prisma } from '../../client';
import { MetadataFieldWhereUniqueInputSchema } from '../inputTypeSchemas/MetadataFieldWhereUniqueInputSchema'

export const MetadataFieldDeleteArgsSchema: z.ZodType<Omit<Prisma.MetadataFieldDeleteArgs, "select" | "include">> = z.object({
  where: MetadataFieldWhereUniqueInputSchema,
}).strict() ;

export default MetadataFieldDeleteArgsSchema;
