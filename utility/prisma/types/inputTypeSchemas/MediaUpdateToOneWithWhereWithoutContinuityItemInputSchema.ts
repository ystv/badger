import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";
import { MediaUpdateWithoutContinuityItemInputSchema } from "./MediaUpdateWithoutContinuityItemInputSchema";
import { MediaUncheckedUpdateWithoutContinuityItemInputSchema } from "./MediaUncheckedUpdateWithoutContinuityItemInputSchema";

export const MediaUpdateToOneWithWhereWithoutContinuityItemInputSchema: z.ZodType<Prisma.MediaUpdateToOneWithWhereWithoutContinuityItemInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => MediaUpdateWithoutContinuityItemInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutContinuityItemInputSchema),
      ]),
    })
    .strict();

export default MediaUpdateToOneWithWhereWithoutContinuityItemInputSchema;
