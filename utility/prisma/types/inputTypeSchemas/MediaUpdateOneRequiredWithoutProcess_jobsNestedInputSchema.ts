import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaCreateWithoutProcess_jobsInputSchema } from "./MediaCreateWithoutProcess_jobsInputSchema";
import { MediaUncheckedCreateWithoutProcess_jobsInputSchema } from "./MediaUncheckedCreateWithoutProcess_jobsInputSchema";
import { MediaCreateOrConnectWithoutProcess_jobsInputSchema } from "./MediaCreateOrConnectWithoutProcess_jobsInputSchema";
import { MediaUpsertWithoutProcess_jobsInputSchema } from "./MediaUpsertWithoutProcess_jobsInputSchema";
import { MediaWhereUniqueInputSchema } from "./MediaWhereUniqueInputSchema";
import { MediaUpdateToOneWithWhereWithoutProcess_jobsInputSchema } from "./MediaUpdateToOneWithWhereWithoutProcess_jobsInputSchema";
import { MediaUpdateWithoutProcess_jobsInputSchema } from "./MediaUpdateWithoutProcess_jobsInputSchema";
import { MediaUncheckedUpdateWithoutProcess_jobsInputSchema } from "./MediaUncheckedUpdateWithoutProcess_jobsInputSchema";

export const MediaUpdateOneRequiredWithoutProcess_jobsNestedInputSchema: z.ZodType<Prisma.MediaUpdateOneRequiredWithoutProcess_jobsNestedInput> =
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
      upsert: z
        .lazy(() => MediaUpsertWithoutProcess_jobsInputSchema)
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => MediaUpdateToOneWithWhereWithoutProcess_jobsInputSchema),
          z.lazy(() => MediaUpdateWithoutProcess_jobsInputSchema),
          z.lazy(() => MediaUncheckedUpdateWithoutProcess_jobsInputSchema),
        ])
        .optional(),
    })
    .strict();

export default MediaUpdateOneRequiredWithoutProcess_jobsNestedInputSchema;
