import type { Prisma } from "../../client";
import { z } from "zod";
import { ProcessMediaJobWhereInputSchema } from "./ProcessMediaJobWhereInputSchema";
import { IntFilterSchema } from "./IntFilterSchema";
import { EnumMediaFileSourceTypeFilterSchema } from "./EnumMediaFileSourceTypeFilterSchema";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { MediaRelationFilterSchema } from "./MediaRelationFilterSchema";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";
import { BaseJobRelationFilterSchema } from "./BaseJobRelationFilterSchema";
import { BaseJobWhereInputSchema } from "./BaseJobWhereInputSchema";

export const ProcessMediaJobWhereUniqueInputSchema: z.ZodType<Prisma.ProcessMediaJobWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number(),
        base_job_id: z.number(),
      }),
      z.object({
        id: z.number(),
      }),
      z.object({
        base_job_id: z.number(),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().optional(),
          base_job_id: z.number().optional(),
          AND: z
            .union([
              z.lazy(() => ProcessMediaJobWhereInputSchema),
              z.lazy(() => ProcessMediaJobWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ProcessMediaJobWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ProcessMediaJobWhereInputSchema),
              z.lazy(() => ProcessMediaJobWhereInputSchema).array(),
            ])
            .optional(),
          mediaId: z
            .union([z.lazy(() => IntFilterSchema), z.number()])
            .optional(),
          sourceType: z
            .union([
              z.lazy(() => EnumMediaFileSourceTypeFilterSchema),
              z.lazy(() => MediaFileSourceTypeSchema),
            ])
            .optional(),
          source: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          media: z
            .union([
              z.lazy(() => MediaRelationFilterSchema),
              z.lazy(() => MediaWhereInputSchema),
            ])
            .optional(),
          base_job: z
            .union([
              z.lazy(() => BaseJobRelationFilterSchema),
              z.lazy(() => BaseJobWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export default ProcessMediaJobWhereUniqueInputSchema;
