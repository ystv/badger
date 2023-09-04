import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaWhereUniqueInputSchema } from "./MediaWhereUniqueInputSchema";
import { MediaCreateWithoutProcess_jobsInputSchema } from "./MediaCreateWithoutProcess_jobsInputSchema";
import { MediaUncheckedCreateWithoutProcess_jobsInputSchema } from "./MediaUncheckedCreateWithoutProcess_jobsInputSchema";

export const MediaCreateOrConnectWithoutProcess_jobsInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutProcess_jobsInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MediaCreateWithoutProcess_jobsInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutProcess_jobsInputSchema),
      ]),
    })
    .strict();

export default MediaCreateOrConnectWithoutProcess_jobsInputSchema;
