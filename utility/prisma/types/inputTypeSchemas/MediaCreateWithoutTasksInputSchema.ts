import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaStateSchema } from "./MediaStateSchema";
import { RundownItemCreateNestedOneWithoutMediaInputSchema } from "./RundownItemCreateNestedOneWithoutMediaInputSchema";
import { ContinuityItemCreateNestedOneWithoutMediaInputSchema } from "./ContinuityItemCreateNestedOneWithoutMediaInputSchema";
import { ProcessMediaJobCreateNestedManyWithoutMediaInputSchema } from "./ProcessMediaJobCreateNestedManyWithoutMediaInputSchema";
import { AssetCreateNestedOneWithoutMediaInputSchema } from "./AssetCreateNestedOneWithoutMediaInputSchema";

export const MediaCreateWithoutTasksInputSchema: z.ZodType<Prisma.MediaCreateWithoutTasksInput> =
  z
    .object({
      name: z.string(),
      rawPath: z.string(),
      path: z.string().optional().nullable(),
      durationSeconds: z.number().int(),
      state: z.lazy(() => MediaStateSchema).optional(),
      rundownItem: z
        .lazy(() => RundownItemCreateNestedOneWithoutMediaInputSchema)
        .optional(),
      continuityItem: z
        .lazy(() => ContinuityItemCreateNestedOneWithoutMediaInputSchema)
        .optional(),
      process_jobs: z
        .lazy(() => ProcessMediaJobCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      asset: z
        .lazy(() => AssetCreateNestedOneWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export default MediaCreateWithoutTasksInputSchema;
