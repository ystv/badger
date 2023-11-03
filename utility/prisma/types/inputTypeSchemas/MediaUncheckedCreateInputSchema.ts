import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaStateSchema } from "./MediaStateSchema";
import { RundownItemUncheckedCreateNestedManyWithoutMediaInputSchema } from "./RundownItemUncheckedCreateNestedManyWithoutMediaInputSchema";
import { ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema } from "./ContinuityItemUncheckedCreateNestedManyWithoutMediaInputSchema";
import { MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema } from "./MediaProcessingTaskUncheckedCreateNestedManyWithoutMediaInputSchema";
import { ProcessMediaJobUncheckedCreateNestedManyWithoutMediaInputSchema } from "./ProcessMediaJobUncheckedCreateNestedManyWithoutMediaInputSchema";
import { AssetUncheckedCreateNestedManyWithoutMediaInputSchema } from "./AssetUncheckedCreateNestedManyWithoutMediaInputSchema";

export const MediaUncheckedCreateInputSchema: z.ZodType<Prisma.MediaUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      rundownItems: z
        .lazy(() => RundownItemUncheckedCreateNestedManyWithoutMediaInputSchema)
        .optional(),
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

export default MediaUncheckedCreateInputSchema;
