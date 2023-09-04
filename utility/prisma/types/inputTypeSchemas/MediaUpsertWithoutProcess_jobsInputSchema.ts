import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaUpdateWithoutProcess_jobsInputSchema } from "./MediaUpdateWithoutProcess_jobsInputSchema";
import { MediaUncheckedUpdateWithoutProcess_jobsInputSchema } from "./MediaUncheckedUpdateWithoutProcess_jobsInputSchema";
import { MediaCreateWithoutProcess_jobsInputSchema } from "./MediaCreateWithoutProcess_jobsInputSchema";
import { MediaUncheckedCreateWithoutProcess_jobsInputSchema } from "./MediaUncheckedCreateWithoutProcess_jobsInputSchema";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";

export const MediaUpsertWithoutProcess_jobsInputSchema: z.ZodType<Prisma.MediaUpsertWithoutProcess_jobsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => MediaUpdateWithoutProcess_jobsInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutProcess_jobsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MediaCreateWithoutProcess_jobsInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutProcess_jobsInputSchema),
      ]),
      where: z.lazy(() => MediaWhereInputSchema).optional(),
    })
    .strict();

export default MediaUpsertWithoutProcess_jobsInputSchema;
