import { z } from "zod";
import type { Prisma } from "../../client";

export const MediaCountOutputTypeSelectSchema: z.ZodType<Prisma.MediaCountOutputTypeSelect> =
  z
    .object({
      tasks: z.boolean().optional(),
      process_jobs: z.boolean().optional(),
    })
    .strict();

export default MediaCountOutputTypeSelectSchema;
