import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";
import { MediaUpdateWithoutProcess_jobsInputSchema } from "./MediaUpdateWithoutProcess_jobsInputSchema";
import { MediaUncheckedUpdateWithoutProcess_jobsInputSchema } from "./MediaUncheckedUpdateWithoutProcess_jobsInputSchema";

export const MediaUpdateToOneWithWhereWithoutProcess_jobsInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutProcess_jobsInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => MediaUpdateWithoutProcess_jobsInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutProcess_jobsInputSchema),
      ]),
    })
    .strict();

export default MediaUpdateToOneWithWhereWithoutProcess_jobsInputSchema;
