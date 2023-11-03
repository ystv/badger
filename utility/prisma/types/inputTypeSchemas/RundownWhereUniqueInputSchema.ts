import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownWhereInputSchema } from "./RundownWhereInputSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { IntFilterSchema } from "./IntFilterSchema";
import { ShowRelationFilterSchema } from "./ShowRelationFilterSchema";
import { ShowWhereInputSchema } from "./ShowWhereInputSchema";
import { RundownItemListRelationFilterSchema } from "./RundownItemListRelationFilterSchema";
import { AssetListRelationFilterSchema } from "./AssetListRelationFilterSchema";
import { MetadataListRelationFilterSchema } from "./MetadataListRelationFilterSchema";

export const RundownWhereUniqueInputSchema: z.ZodType<Prisma.RundownWhereUniqueInput> =
  z
    .object({
      id: z.number(),
    })
    .and(
      z
        .object({
          id: z.number().optional(),
          AND: z
            .union([
              z.lazy(() => RundownWhereInputSchema),
              z.lazy(() => RundownWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => RundownWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => RundownWhereInputSchema),
              z.lazy(() => RundownWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          showId: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          order: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          show: z
            .union([
              z.lazy(() => ShowRelationFilterSchema),
              z.lazy(() => ShowWhereInputSchema),
            ])
            .optional(),
          items: z.lazy(() => RundownItemListRelationFilterSchema).optional(),
          assets: z.lazy(() => AssetListRelationFilterSchema).optional(),
          metadata: z.lazy(() => MetadataListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export default RundownWhereUniqueInputSchema;
