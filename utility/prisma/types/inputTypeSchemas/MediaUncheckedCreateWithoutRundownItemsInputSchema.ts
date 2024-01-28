import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaStateSchema } from "./MediaStateSchema";
import { ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema } from "./ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema";
import { MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema } from "./MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema";
import { ProcessMediaJobUncheckedCreateNestedManyWithoutMediaInputSchema } from "./ProcessMediaJobUncheckedCreateNestedManyWithoutMediaInputSchema";
import { AssetUncheckedCreateNestedManyWithoutMediaInputSchema } from "./AssetUncheckedCreateNestedManyWithoutMediaInputSchema";

export const MediaUncheckedCreateWithoutRundownItemsInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutRundownItemsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      continuityItems: z
        .lazy(
          () => ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema,
        )
        .optional(),
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
      assets: z
        .lazy(() => AssetUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export default MediaUncheckedCreateWithoutRundownItemsInputSchema;
