import { z } from "zod";
import type { Prisma } from "../../client";
import { ShowWithDurationWhereInputSchema } from "../inputTypeSchemas/ShowWithDurationWhereInputSchema";

export const ShowWithDurationDeleteManyArgsSchema: z.ZodType<Prisma.ShowWithDurationDeleteManyArgs> =
  z
    .object({
      where: ShowWithDurationWhereInputSchema.optional(),
    })
    .strict();

export default ShowWithDurationDeleteManyArgsSchema;
