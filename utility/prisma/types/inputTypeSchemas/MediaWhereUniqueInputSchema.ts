import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { StringNullableFilterSchema } from "./StringNullableFilterSchema";
import { IntFilterSchema } from "./IntFilterSchema";
import { EnumMediaStateFilterSchema } from "./EnumMediaStateFilterSchema";
import { MediaStateSchema } from "./MediaStateSchema";
import { RundownItemNullableRelationFilterSchema } from "./RundownItemNullableRelationFilterSchema";
import { RundownItemWhereInputSchema } from "./RundownItemWhereInputSchema";
import { ContinuityItemNullableRelationFilterSchema } from "./ContinuityItemNullableRelationFilterSchema";
import { ContinuityItemWhereInputSchema } from "./ContinuityItemWhereInputSchema";
import { MediaProcessingTaskListRelationFilterSchema } from "./MediaProcessingTaskListRelationFilterSchema";
import { ProcessMediaJobListRelationFilterSchema } from "./ProcessMediaJobListRelationFilterSchema";
import { AssetNullableRelationFilterSchema } from "./AssetNullableRelationFilterSchema";
import { AssetWhereInputSchema } from "./AssetWhereInputSchema";

export const MediaWhereUniqueInputSchema: z.ZodType<Prisma.MediaWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number(),
        rundownItemID: z.number(),
        continuityItemID: z.number(),
      }),
      z.object({
        id: z.number(),
        rundownItemID: z.number(),
      }),
      z.object({
        id: z.number(),
        continuityItemID: z.number(),
      }),
      z.object({
        id: z.number(),
      }),
      z.object({
        rundownItemID: z.number(),
        continuityItemID: z.number(),
      }),
      z.object({
        rundownItemID: z.number(),
      }),
      z.object({
        continuityItemID: z.number(),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().optional(),
          rundownItemID: z.number().optional(),
          continuityItemID: z.number().optional(),
          AND: z
            .union([
              z.lazy(() => MediaWhereInputSchema),
              z.lazy(() => MediaWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => MediaWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => MediaWhereInputSchema),
              z.lazy(() => MediaWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          rawPath: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          path: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          durationSeconds: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          state: z
            .union([
              z.lazy(() => EnumMediaStateFilterSchema),
              z.lazy(() => MediaStateSchema),
            ])
            .optional(),
          rundownItem: z
            .union([
              z.lazy(() => RundownItemNullableRelationFilterSchema),
              z.lazy(() => RundownItemWhereInputSchema),
            ])
            .optional()
            .nullable(),
          continuityItem: z
            .union([
              z.lazy(() => ContinuityItemNullableRelationFilterSchema),
              z.lazy(() => ContinuityItemWhereInputSchema),
            ])
            .optional()
            .nullable(),
          tasks: z
            .lazy(() => MediaProcessingTaskListRelationFilterSchema)
            .optional(),
          process_jobs: z
            .lazy(() => ProcessMediaJobListRelationFilterSchema)
            .optional(),
          asset: z
            .union([
              z.lazy(() => AssetNullableRelationFilterSchema),
              z.lazy(() => AssetWhereInputSchema),
            ])
            .optional()
            .nullable(),
        })
        .strict(),
    );

export default MediaWhereUniqueInputSchema;
