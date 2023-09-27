import type { Prisma } from "../../client";
import { z } from "zod";

export const MetadataFieldIdShowIdRundownIdCompoundUniqueInputSchema: z.ZodType<Prisma.MetadataFieldIdShowIdRundownIdCompoundUniqueInput> =
  z
    .object({
      fieldId: z.number(),
      showId: z.number(),
      rundownId: z.number(),
    })
    .strict();

export default MetadataFieldIdShowIdRundownIdCompoundUniqueInputSchema;
