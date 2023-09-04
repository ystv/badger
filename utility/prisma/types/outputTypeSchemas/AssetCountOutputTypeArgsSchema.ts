import { z } from "zod";
import type { Prisma } from "../../client";
import { AssetCountOutputTypeSelectSchema } from "./AssetCountOutputTypeSelectSchema";

export const AssetCountOutputTypeArgsSchema: z.ZodType<Prisma.AssetCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => AssetCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export default AssetCountOutputTypeSelectSchema;
