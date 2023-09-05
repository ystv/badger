import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaStateSchema } from "./MediaStateSchema";
import { ProcessMediaJobUncheckedCreateNestedManyWithoutMediaInputSchema } from "./ProcessMediaJobUncheckedCreateNestedManyWithoutMediaInputSchema";
import { AssetUncheckedCreateNestedOneWithoutMediaInputSchema } from "./AssetUncheckedCreateNestedOneWithoutMediaInputSchema";

export const MediaUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutTasksInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      rundownItemID: z.number().int().optional().nullable(),
      continuityItemID: z.number().int().optional().nullable(),
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

export default MediaUncheckedCreateWithoutTasksInputSchema;
