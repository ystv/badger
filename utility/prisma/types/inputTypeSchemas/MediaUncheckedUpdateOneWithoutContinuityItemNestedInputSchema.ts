import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaCreateWithoutContinuityItemInputSchema } from "./MediaCreateWithoutContinuityItemInputSchema";
import { MediaUncheckedCreateWithoutContinuityItemInputSchema } from "./MediaUncheckedCreateWithoutContinuityItemInputSchema";
import { MediaCreateOrConnectWithoutContinuityItemInputSchema } from "./MediaCreateOrConnectWithoutContinuityItemInputSchema";
import { MediaUpsertWithoutContinuityItemInputSchema } from "./MediaUpsertWithoutContinuityItemInputSchema";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";
import { MediaWhereUniqueInputSchema } from "./MediaWhereUniqueInputSchema";
import { MediaUpdateToOneWithWhereWithoutContinuityItemInputSchema } from "./MediaUpdateToOneWithWhereWithoutContinuityItemInputSchema";
import { MediaUpdateWithoutContinuityItemInputSchema } from "./MediaUpdateWithoutContinuityItemInputSchema";
import { MediaUncheckedUpdateWithoutContinuityItemInputSchema } from "./MediaUncheckedUpdateWithoutContinuityItemInputSchema";

export const MediaUncheckedUpdateOneWithoutContinuityItemNestedInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateOneWithoutContinuityItemNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutContinuityItemInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutContinuityItemInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MediaCreateOrConnectWithoutContinuityItemInputSchema)
        .optional(),
      upsert: z
        .lazy(() => MediaUpsertWithoutContinuityItemInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => MediaWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => MediaWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => MediaWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => MediaUpdateToOneWithWhereWithoutContinuityItemInputSchema,
          ),
          z.lazy(() => MediaUpdateWithoutContinuityItemInputSchema),
          z.lazy(() => MediaUncheckedUpdateWithoutContinuityItemInputSchema),
        ])
        .optional(),
    })
    .strict();

export default MediaUncheckedUpdateOneWithoutContinuityItemNestedInputSchema;
