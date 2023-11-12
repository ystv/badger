import { z } from "zod";
import type { Prisma } from "../../client";
import { SettingUpdateManyMutationInputSchema } from "../inputTypeSchemas/SettingUpdateManyMutationInputSchema";
import { SettingUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/SettingUncheckedUpdateManyInputSchema";
import { SettingWhereInputSchema } from "../inputTypeSchemas/SettingWhereInputSchema";

export const SettingUpdateManyArgsSchema: z.ZodType<Prisma.SettingUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SettingUpdateManyMutationInputSchema,
        SettingUncheckedUpdateManyInputSchema,
      ]),
      where: SettingWhereInputSchema.optional(),
    })
    .strict();

export default SettingUpdateManyArgsSchema;
