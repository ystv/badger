import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaWhereUniqueInputSchema } from "./MediaWhereUniqueInputSchema";
import { MediaCreateWithoutContinuityItemInputSchema } from "./MediaCreateWithoutContinuityItemInputSchema";
import { MediaUncheckedCreateWithoutContinuityItemInputSchema } from "./MediaUncheckedCreateWithoutContinuityItemInputSchema";

export const MediaCreateOrConnectWithoutContinuityItemInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutContinuityItemInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MediaCreateWithoutContinuityItemInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutContinuityItemInputSchema),
      ]),
    })
    .strict();

export default MediaCreateOrConnectWithoutContinuityItemInputSchema;
