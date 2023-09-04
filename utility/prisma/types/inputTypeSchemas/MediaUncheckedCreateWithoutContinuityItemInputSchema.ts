import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaStateSchema } from "./MediaStateSchema";
import { MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema } from "./MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema";
import { ProcessMediaJobUncheckedCreateNestedManyWithoutMediaInputSchema } from "./ProcessMediaJobUncheckedCreateNestedManyWithoutMediaInputSchema";
import { AssetUncheckedCreateNestedOneWithoutMediaInputSchema } from "./AssetUncheckedCreateNestedOneWithoutMediaInputSchema";

export const MediaUncheckedCreateWithoutContinuityItemInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutContinuityItemInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      rundownItemID: z.number().int().optional().nullable(),
      tasks: z
        .lazy(
          () =>
            MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema,
        )
        .optional(),
      process_jobs: z
        .lazy(
          () => ProcessMediaJobUncheckedCreateNestedManyWithoutMediaInputSchema,
        )
        .optional(),
      asset: z
        .lazy(() => AssetUncheckedCreateNestedOneWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export default MediaUncheckedCreateWithoutContinuityItemInputSchema;
