import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaStateSchema } from "./MediaStateSchema";
import { RundownItemCreateNestedOneWithoutMediaInputSchema } from "./RundownItemCreateNestedOneWithoutMediaInputSchema";
import { ContinuityItemCreateNestedOneWithoutMediaInputSchema } from "./ContinuityItemCreateNestedOneWithoutMediaInputSchema";
import { MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema } from "./MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema";
import { AssetCreateNestedOneWithoutMediaInputSchema } from "./AssetCreateNestedOneWithoutMediaInputSchema";

export const MediaCreateWithoutProcess_jobsInputSchema: z.ZodType<Prisma.MediaCreateWithoutProcess_jobsInput> =
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
      tasks: z
        .lazy(() => MediaProcessingTaskCreateNestedManyWithoutMediaInputSchema)
        .optional(),
      asset: z
        .lazy(() => AssetCreateNestedOneWithoutMediaInputSchema)
        .optional(),
    })
    .strict();

export default MediaCreateWithoutProcess_jobsInputSchema;
