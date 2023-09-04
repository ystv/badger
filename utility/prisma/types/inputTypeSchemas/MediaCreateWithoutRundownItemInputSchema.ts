import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaStateSchema } from "./MediaStateSchema";
import { ContinuityItemCreateNestedOneWithoutMediaInputSchema } from "./ContinuityItemCreateNestedOneWithoutMediaInputSchema";
import { MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema } from "./MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema";
import { ProcessMediaJobCreateNestedManyWithoutMediaInputSchema } from "./ProcessMediaJobCreateNestedManyWithoutMediaInputSchema";
import { AssetCreateNestedOneWithoutMediaInputSchema } from "./AssetCreateNestedOneWithoutMediaInputSchema";

export const MediaCreateWithoutRundownItemInputSchema: z.ZodType<Prisma.MediaCreateWithoutRundownItemInput> =
  z
    .object({
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      continuityItem: z
        .lazy(() => ContinuityItemCreateNestedOneWithoutMediaInputSchema)
        .optional(),
      tasks: z
        .lazy(() => MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      process_jobs: z
        .lazy(() => ProcessMediaJobCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      asset: z
        .lazy(() => AssetCreateNestedOneWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export default MediaCreateWithoutRundownItemInputSchema;
