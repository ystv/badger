import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaUpdateWithoutContinuityItemInputSchema } from "./MediaUpdateWithoutContinuityItemInputSchema";
import { MediaUncheckedUpdateWithoutContinuityItemInputSchema } from "./MediaUncheckedUpdateWithoutContinuityItemInputSchema";
import { MediaCreateWithoutContinuityItemInputSchema } from "./MediaCreateWithoutContinuityItemInputSchema";
import { MediaUncheckedCreateWithoutContinuityItemInputSchema } from "./MediaUncheckedCreateWithoutContinuityItemInputSchema";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";

export const MediaUpsertWithoutContinuityItemInputSchema: z.ZodType<Prisma.MediaUpsertWithoutContinuityItemInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => MediaUpdateWithoutContinuityItemInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutContinuityItemInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MediaCreateWithoutContinuityItemInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutContinuityItemInputSchema),
      ]),
      where: z.lazy(() => MediaWhereInputSchema).optional(),
    })
    .strict();

export default MediaUpsertWithoutContinuityItemInputSchema;
