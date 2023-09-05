import type { Prisma } from "../../client";
import { z } from "zod";
import { MediaWhereUniqueInputSchema } from "./MediaWhereUniqueInputSchema";
import { MediaCreateWithoutRundownItemInputSchema } from "./MediaCreateWithoutRundownItemInputSchema";
import { MediaUncheckedCreateWithoutRundownItemInputSchema } from "./MediaUncheckedCreateWithoutRundownItemInputSchema";

export const MediaCreateOrConnectWithoutRundownItemInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutRundownItemInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MediaCreateWithoutRundownItemInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutRundownItemInputSchema),
      ]),
    })
    .strict();

export default MediaCreateOrConnectWithoutRundownItemInputSchema;
