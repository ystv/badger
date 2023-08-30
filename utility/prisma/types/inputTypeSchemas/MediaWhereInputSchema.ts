import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { StringNullableFilterSchema } from "./StringNullableFilterSchema";
import { EnumMediaStateFilterSchema } from "./EnumMediaStateFilterSchema";
import { MediaStateSchema } from "./MediaStateSchema";
import { IntNullableFilterSchema } from "./IntNullableFilterSchema";
import { RundownItemNullableRelationFilterSchema } from "./RundownItemNullableRelationFilterSchema";
import { RundownItemWhereInputSchema } from "./RundownItemWhereInputSchema";
import { ContinuityItemNullableRelationFilterSchema } from "./ContinuityItemNullableRelationFilterSchema";
import { ContinuityItemWhereInputSchema } from "./ContinuityItemWhereInputSchema";
import { MediaProcessingTaskListRelationFilterSchema } from "./MediaProcessingTaskListRelationFilterSchema";
import { ProcessMediaJobListRelationFilterSchema } from "./ProcessMediaJobListRelationFilterSchema";
import { AssetNullableRelationFilterSchema } from "./AssetNullableRelationFilterSchema";
import { AssetWhereInputSchema } from "./AssetWhereInputSchema";

export const MediaWhereInputSchema: z.ZodType<Prisma.MediaWhereInput> = z
  .object({
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
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    rawPath: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
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
    rundownItemID: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    continuityItemID: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
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
    tasks: z.lazy(() => MediaProcessingTaskListRelationFilterSchema).optional(),
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
  .strict();

export default MediaWhereInputSchema;
