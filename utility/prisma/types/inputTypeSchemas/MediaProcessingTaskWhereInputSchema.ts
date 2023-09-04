import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { EnumMediaProcessingTaskStateFilterSchema } from "./EnumMediaProcessingTaskStateFilterSchema";
import { MediaProcessingTaskStateSchema } from "./MediaProcessingTaskStateSchema";
import { MediaRelationFilterSchema } from "./MediaRelationFilterSchema";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";

export const MediaProcessingTaskWhereInputSchema: z.ZodType<Prisma.MediaProcessingTaskWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereInputSchema),
          z.lazy(() => MediaProcessingTaskWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MediaProcessingTaskWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MediaProcessingTaskWhereInputSchema),
          z.lazy(() => MediaProcessingTaskWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      media_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      description: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      additionalInfo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      state: z
        .union([
          z.lazy(() => EnumMediaProcessingTaskStateFilterSchema),
          z.lazy(() => MediaProcessingTaskStateSchema),
        ])
        .optional(),
      media: z
        .union([
          z.lazy(() => MediaRelationFilterSchema),
          z.lazy(() => MediaWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export default MediaProcessingTaskWhereInputSchema;
