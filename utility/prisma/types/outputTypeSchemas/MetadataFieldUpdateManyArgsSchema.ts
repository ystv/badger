import { z } from "zod";
import type { Prisma } from "../../client";
import { MetadataFieldUpdateManyMutationInputSchema } from "../inputTypeSchemas/MetadataFieldUpdateManyMutationInputSchema";
import { MetadataFieldUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/MetadataFieldUncheckedUpdateManyInputSchema";
import { MetadataFieldWhereInputSchema } from "../inputTypeSchemas/MetadataFieldWhereInputSchema";

export const MetadataFieldUpdateManyArgsSchema: z.ZodType<Prisma.MetadataFieldUpdateManyArgs> =
  z
    .object({
      data: z.union([
        MetadataFieldUpdateManyMutationInputSchema,
        MetadataFieldUncheckedUpdateManyInputSchema,
      ]),
      where: MetadataFieldWhereInputSchema.optional(),
    })
    .strict();

export default MetadataFieldUpdateManyArgsSchema;
