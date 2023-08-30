import { z } from "zod";
import type { Prisma } from "../../client";
import { MediaUpdateManyMutationInputSchema } from "../inputTypeSchemas/MediaUpdateManyMutationInputSchema";
import { MediaUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/MediaUncheckedUpdateManyInputSchema";
import { MediaWhereInputSchema } from "../inputTypeSchemas/MediaWhereInputSchema";

export const MediaUpdateManyArgsSchema: z.ZodType<Prisma.MediaUpdateManyArgs> =
  z
    .object({
      data: z.union([
        MediaUpdateManyMutationInputSchema,
        MediaUncheckedUpdateManyInputSchema,
      ]),
      where: MediaWhereInputSchema.optional(),
    })
    .strict();

export default MediaUpdateManyArgsSchema;
