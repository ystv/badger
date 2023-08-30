import { z } from "zod";
import type { Prisma } from "../../client";
import { LoadAssetJobSelectSchema } from "../inputTypeSchemas/LoadAssetJobSelectSchema";
import { LoadAssetJobIncludeSchema } from "../inputTypeSchemas/LoadAssetJobIncludeSchema";

export const LoadAssetJobArgsSchema: z.ZodType<Prisma.LoadAssetJobDefaultArgs> =
  z
    .object({
      select: z.lazy(() => LoadAssetJobSelectSchema).optional(),
      include: z.lazy(() => LoadAssetJobIncludeSchema).optional(),
    })
    .strict();

export default LoadAssetJobArgsSchema;
