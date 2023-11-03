import { z } from "zod";
import type { Prisma } from "../../client";
import { MetadataUpdateManyMutationInputSchema } from "../inputTypeSchemas/MetadataUpdateManyMutationInputSchema";
import { MetadataUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/MetadataUncheckedUpdateManyInputSchema";
import { MetadataWhereInputSchema } from "../inputTypeSchemas/MetadataWhereInputSchema";

export const MetadataUpdateManyArgsSchema: z.ZodType<Prisma.MetadataUpdateManyArgs> =
  z
    .object({
      data: z.union([
        MetadataUpdateManyMutationInputSchema,
        MetadataUncheckedUpdateManyInputSchema,
      ]),
      where: MetadataWhereInputSchema.optional(),
    })
    .strict();

export default MetadataUpdateManyArgsSchema;
