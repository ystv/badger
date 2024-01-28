import { z } from "zod";
import type { Prisma } from "../../client";
import { SettingWhereInputSchema } from "../inputTypeSchemas/SettingWhereInputSchema";

export const SettingDeleteManyArgsSchema: z.ZodType<Prisma.SettingDeleteManyArgs> =
  z
    .object({
      where: SettingWhereInputSchema.optional(),
    })
    .strict();

export default SettingDeleteManyArgsSchema;
