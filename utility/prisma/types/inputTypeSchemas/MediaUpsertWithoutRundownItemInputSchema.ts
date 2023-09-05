import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaUpdateWithoutRundownItemInputSchema } from "./MediaUpdateWithoutRundownItemInputSchema";
import { MediaUncheckedUpdateWithoutRundownItemInputSchema } from "./MediaUncheckedUpdateWithoutRundownItemInputSchema";
import { MediaCreateWithoutRundownItemInputSchema } from "./MediaCreateWithoutRundownItemInputSchema";
import { MediaUncheckedCreateWithoutRundownItemInputSchema } from "./MediaUncheckedCreateWithoutRundownItemInputSchema";
import { MediaWhereInputSchema } from "./MediaWhereInputSchema";

export const MediaUpsertWithoutRundownItemInputSchema: z.ZodType<Prisma.MediaUpsertWithoutRundownItemInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => MediaUpdateWithoutRundownItemInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutRundownItemInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MediaCreateWithoutRundownItemInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutRundownItemInputSchema),
      ]),
      where: z.lazy(() => MediaWhereInputSchema).optional(),
    })
    .strict();

export default MediaUpsertWithoutRundownItemInputSchema;
