import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaCreateWithoutProcess_jobsInputSchema } from "./MediaCreateWithoutProcess_jobsInputSchema";
import { MediaUncheckedCreateWithoutProcess_jobsInputSchema } from "./MediaUncheckedCreateWithoutProcess_jobsInputSchema";
import { MediaCreateOrConnectWithoutProcess_jobsInputSchema } from "./MediaCreateOrConnectWithoutProcess_jobsInputSchema";
import { MediaWhereUniqueInputSchema } from "./MediaWhereUniqueInputSchema";

export const MediaCreateNestedOneWithoutProcess_jobsInputSchema: z.ZodType<Prisma.MediaCreateNestedOneWithoutProcess_jobsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutProcess_jobsInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutProcess_jobsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutProcess_jobsInputSchema)
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
    })
    .strict();

export default MediaCreateNestedOneWithoutProcess_jobsInputSchema;
