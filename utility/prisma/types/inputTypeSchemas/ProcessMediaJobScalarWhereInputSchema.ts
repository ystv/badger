import type { Prisma } from "../../client";
import { z } from "zod";
import { IntFilterSchema } from "./IntFilterSchema";
import { EnumMediaFileSourceTypeFilterSchema } from "./EnumMediaFileSourceTypeFilterSchema";
import { MediaFileSourceTypeSchema } from "./MediaFileSourceTypeSchema";
import { StringFilterSchema } from "./StringFilterSchema";

export const ProcessMediaJobScalarWhereInputSchema: z.ZodType<Prisma.ProcessMediaJobScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ProcessMediaJobScalarWhereInputSchema),
          z.lazy(() => ProcessMediaJobScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ProcessMediaJobScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ProcessMediaJobScalarWhereInputSchema),
          z.lazy(() => ProcessMediaJobScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      mediaId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      sourceType: z
        .union([
          z.lazy(() => EnumMediaFileSourceTypeFilterSchema),
          z.lazy(() => MediaFileSourceTypeSchema),
        ])
        .optional(),
      source: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      base_job_id: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export default ProcessMediaJobScalarWhereInputSchema;
