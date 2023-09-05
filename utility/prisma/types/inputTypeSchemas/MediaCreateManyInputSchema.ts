import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaStateSchema } from "./MediaStateSchema";

export const MediaCreateManyInputSchema: z.ZodType<Prisma.MediaCreateManyInput> =
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
    })
    .strict();

export default MediaCreateManyInputSchema;
