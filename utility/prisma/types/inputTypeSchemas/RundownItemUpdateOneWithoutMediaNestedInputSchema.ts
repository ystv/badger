import type { Prisma } from "../../client";
import { z } from "zod";
import { RundownItemCreateWithoutMediaInputSchema } from "./RundownItemCreateWithoutMediaInputSchema";
import { RundownItemUncheckedCreateWithoutMediaInputSchema } from "./RundownItemUncheckedCreateWithoutMediaInputSchema";
import { RundownItemCreateOrConnectWithoutMediaInputSchema } from "./RundownItemCreateOrConnectWithoutMediaInputSchema";
import { RundownItemUpsertWithoutMediaInputSchema } from "./RundownItemUpsertWithoutMediaInputSchema";
import { RundownItemWhereInputSchema } from "./RundownItemWhereInputSchema";
import { RundownItemWhereUniqueInputSchema } from "./RundownItemWhereUniqueInputSchema";
import { RundownItemUpdateToOneWithWhereWithoutMediaInputSchema } from "./RundownItemUpdateToOneWithWhereWithoutMediaInputSchema";
import { RundownItemUpdateWithoutMediaInputSchema } from "./RundownItemUpdateWithoutMediaInputSchema";
import { RundownItemUncheckedUpdateWithoutMediaInputSchema } from "./RundownItemUncheckedUpdateWithoutMediaInputSchema";

export const RundownItemUpdateOneWithoutMediaNestedInputSchema: z.ZodType<Prisma.RundownItemUpdateOneWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RundownItemCreateWithoutMediaInputSchema),
          z.lazy(() => RundownItemUncheckedCreateWithoutMediaInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RundownItemCreateOrConnectWithoutMediaInputSchema)
        .optional(),
      upsert: z.lazy(() => RundownItemUpsertWithoutMediaInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => RundownItemWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => RundownItemWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => RundownItemWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => RundownItemUpdateToOneWithWhereWithoutMediaInputSchema),
          z.lazy(() => RundownItemUpdateWithoutMediaInputSchema),
          z.lazy(() => RundownItemUncheckedUpdateWithoutMediaInputSchema),
        ])
        .optional(),
    })
    .strict();

export default RundownItemUpdateOneWithoutMediaNestedInputSchema;
