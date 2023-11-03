import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { JsonFilterSchema } from "./JsonFilterSchema";
import { IntNullableFilterSchema } from "./IntNullableFilterSchema";
import { MetadataFieldRelationFilterSchema } from "./MetadataFieldRelationFilterSchema";
import { MetadataFieldWhereInputSchema } from "./MetadataFieldWhereInputSchema";
import { ShowNullableRelationFilterSchema } from "./ShowNullableRelationFilterSchema";
import { ShowWhereInputSchema } from "./ShowWhereInputSchema";
import { RundownNullableRelationFilterSchema } from "./RundownNullableRelationFilterSchema";
import { RundownWhereInputSchema } from "./RundownWhereInputSchema";

export const MetadataWhereInputSchema: z.ZodType<Prisma.MetadataWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => MetadataWhereInputSchema),
        z.lazy(() => MetadataWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MetadataWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MetadataWhereInputSchema),
        z.lazy(() => MetadataWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    value: z.lazy(() => JsonFilterSchema).optional(),
    fieldId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    showId: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    rundownId: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    field: z
      .union([
        z.lazy(() => MetadataFieldRelationFilterSchema),
        z.lazy(() => MetadataFieldWhereInputSchema),
      ])
      .optional(),
    show: z
      .union([
        z.lazy(() => ShowNullableRelationFilterSchema),
        z.lazy(() => ShowWhereInputSchema),
      ])
      .optional()
      .nullable(),
    rundown: z
      .union([
        z.lazy(() => RundownNullableRelationFilterSchema),
        z.lazy(() => RundownWhereInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export default MetadataWhereInputSchema;
